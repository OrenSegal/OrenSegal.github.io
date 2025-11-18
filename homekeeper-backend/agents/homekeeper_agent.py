"""
HomeKeeper Core Agent
Agentic home maintenance management system using LangGraph
"""

from langgraph.graph import StateGraph, END
from langchain_anthropic import ChatAnthropic
from langchain_core.messages import HumanMessage, SystemMessage
from typing import TypedDict, List, Annotated, Optional
import operator
import json
from datetime import datetime, timedelta
import asyncio
import numpy as np

class HomeKeeperState(TypedDict):
    """Shared state across agent workflow"""
    home_id: str
    current_date: datetime
    appliances: List[dict]
    maintenance_due: List[dict]
    utility_data: List[dict]
    anomalies: List[dict]
    actions: List[dict]
    messages: Annotated[List[dict], operator.add]


class HomeKeeperAgent:
    """Main home maintenance agent with agentic workflows"""

    def __init__(self, api_key: str):
        self.llm = ChatAnthropic(
            model="claude-3-5-sonnet-20241022",
            api_key=api_key,
            temperature=0.3
        )
        self.graph = self._build_graph()

    def _build_graph(self) -> StateGraph:
        """Construct the agentic workflow graph"""
        workflow = StateGraph(HomeKeeperState)

        # Add nodes
        workflow.add_node("check_maintenance_due", self.check_maintenance_due)
        workflow.add_node("analyze_utilities", self.analyze_utility_usage)
        workflow.add_node("check_warranties", self.check_warranty_status)
        workflow.add_node("detect_anomalies", self.detect_anomalies)
        workflow.add_node("generate_recommendations", self.generate_recommendations)
        workflow.add_node("schedule_services", self.schedule_services)

        # Define flow
        workflow.set_entry_point("check_maintenance_due")
        workflow.add_edge("check_maintenance_due", "analyze_utilities")
        workflow.add_edge("analyze_utilities", "check_warranties")
        workflow.add_edge("check_warranties", "detect_anomalies")
        workflow.add_edge("detect_anomalies", "generate_recommendations")

        # Conditional edge
        workflow.add_conditional_edges(
            "generate_recommendations",
            self.should_auto_schedule,
            {
                "schedule": "schedule_services",
                "end": END
            }
        )
        workflow.add_edge("schedule_services", END)

        return workflow.compile()

    async def check_maintenance_due(self, state: HomeKeeperState) -> dict:
        """Check what maintenance is due or overdue"""

        home_id = state["home_id"]
        current_date = state["current_date"]

        # Mock maintenance tasks
        tasks = await self._get_maintenance_tasks(home_id)

        due_soon = []
        overdue = []

        for task in tasks:
            if task["next_due"] < current_date:
                overdue.append(task)
            elif (task["next_due"] - current_date).days <= 30:
                due_soon.append(task)

        return {
            "maintenance_due": {
                "overdue": overdue,
                "due_soon": due_soon
            },
            "messages": [{
                "role": "system",
                "content": f"Found {len(overdue)} overdue and {len(due_soon)} upcoming maintenance tasks"
            }]
        }

    async def analyze_utility_usage(self, state: HomeKeeperState) -> dict:
        """Analyze utility bills for anomalies"""

        home_id = state["home_id"]

        # Get utility data
        bills = await self._get_utility_bills(home_id, months=12)

        # Calculate baselines
        baselines = {}
        for utility_type in ['water', 'electric', 'gas']:
            utility_bills = [b for b in bills if b['utility_type'] == utility_type]
            if utility_bills:
                usage = [b['usage_amount'] for b in utility_bills]
                baselines[utility_type] = {
                    "mean": float(np.mean(usage)),
                    "std": float(np.std(usage)),
                    "current": usage[0] if usage else 0
                }

        return {
            "utility_data": {
                "baselines": baselines,
                "bills": bills[:3]  # Last 3 months
            },
            "messages": [{
                "role": "system",
                "content": f"Analyzed {len(bills)} utility bills"
            }]
        }

    async def check_warranty_status(self, state: HomeKeeperState) -> dict:
        """Check for expiring warranties"""

        home_id = state["home_id"]
        current_date = state["current_date"]

        # Get appliances with warranties
        appliances = await self._get_appliances_with_warranties(home_id)

        expiring_soon = []
        for appliance in appliances:
            if appliance.get("warranty_end"):
                days_remaining = (appliance["warranty_end"] - current_date).days
                if 0 < days_remaining <= 90:  # Within 90 days
                    expiring_soon.append({
                        "appliance": appliance["name"],
                        "expires": appliance["warranty_end"].isoformat(),
                        "days_remaining": days_remaining
                    })

        return {
            "appliances": appliances,
            "warranties_expiring": expiring_soon,
            "messages": [{
                "role": "system",
                "content": f"Found {len(expiring_soon)} warranties expiring soon"
            }]
        }

    async def detect_anomalies(self, state: HomeKeeperState) -> dict:
        """Use LLM to reason about anomalies"""

        utility_data = state.get("utility_data", {})
        maintenance = state.get("maintenance_due", {})
        warranties = state.get("warranties_expiring", [])

        # Prepare context for LLM
        context = {
            "utility_baselines": utility_data.get("baselines", {}),
            "overdue_maintenance": len(maintenance.get("overdue", [])),
            "due_soon_maintenance": len(maintenance.get("due_soon", [])),
            "expiring_warranties": len(warranties)
        }

        # Detect utility anomalies
        anomalies = []
        baselines = utility_data.get("baselines", {})

        for utility_type, data in baselines.items():
            mean = data.get("mean", 0)
            std = data.get("std", 0)
            current = data.get("current", 0)

            if std > 0:
                z_score = (current - mean) / std
                if abs(z_score) > 2:  # 2 standard deviations
                    percent_change = ((current - mean) / mean) * 100
                    anomalies.append({
                        "type": "utility_spike",
                        "utility": utility_type,
                        "current": current,
                        "baseline": mean,
                        "percent_change": round(percent_change, 1),
                        "z_score": round(z_score, 2),
                        "severity": "high" if abs(z_score) > 3 else "medium"
                    })

        # Use LLM for deeper analysis
        if anomalies or maintenance.get("overdue"):
            prompt = f"""Analyze this home maintenance situation:

UTILITY ANOMALIES:
{json.dumps(anomalies, indent=2)}

MAINTENANCE STATUS:
Overdue tasks: {len(maintenance.get('overdue', []))}
Due soon: {len(maintenance.get('due_soon', []))}

EXPIRING WARRANTIES:
{len(warranties)} warranties expiring in next 90 days

For each issue, provide:
1. Likely cause
2. Urgency (low/medium/high/critical)
3. Recommended action
4. Estimated cost of inaction

Return JSON:
{{
    "alerts": [
        {{
            "type": "utility_spike" | "maintenance_neglect" | "warranty_expiring",
            "description": "...",
            "severity": "low" | "medium" | "high" | "critical",
            "likely_cause": "...",
            "recommended_action": "...",
            "urgency_days": 7,
            "cost_of_inaction": "$X/month"
        }}
    ]
}}"""

            messages = [
                SystemMessage(content="You are a home maintenance expert analyzing potential issues."),
                HumanMessage(content=prompt)
            ]

            response = await self.llm.ainvoke(messages)

            try:
                analysis = json.loads(response.content)
                anomalies.extend(analysis.get("alerts", []))
            except json.JSONDecodeError:
                pass

        return {
            "anomalies": anomalies,
            "messages": [{
                "role": "assistant",
                "content": f"Detected {len(anomalies)} anomalies"
            }]
        }

    async def generate_recommendations(self, state: HomeKeeperState) -> dict:
        """Generate actionable recommendations"""

        recommendations = []

        # Overdue maintenance
        for task in state.get("maintenance_due", {}).get("overdue", []):
            recommendations.append({
                "type": "schedule_maintenance",
                "task": task["task_type"],
                "urgency": "high",
                "overdue_days": (state["current_date"] - task["next_due"]).days,
                "estimated_cost": task.get("estimated_cost", 0),
                "auto_schedule": False
            })

        # Anomalies
        for anomaly in state.get("anomalies", []):
            if anomaly.get("severity") in ["high", "critical"]:
                recommendations.append({
                    "type": "investigate_anomaly",
                    "description": anomaly.get("description", f"{anomaly.get('type')} detected"),
                    "action": anomaly.get("recommended_action", "Schedule inspection"),
                    "urgency": anomaly.get("severity", "medium"),
                    "auto_schedule": False
                })

        # Expiring warranties
        for warranty in state.get("warranties_expiring", []):
            if warranty["days_remaining"] <= 30:
                recommendations.append({
                    "type": "use_warranty",
                    "appliance": warranty["appliance"],
                    "expires_days": warranty["days_remaining"],
                    "action": f"Schedule service for {warranty['appliance']} before warranty expires",
                    "urgency": "medium",
                    "auto_schedule": False
                })

        return {
            "actions": recommendations,
            "messages": [{
                "role": "assistant",
                "content": f"Generated {len(recommendations)} recommendations"
            }]
        }

    def should_auto_schedule(self, state: HomeKeeperState) -> str:
        """Decide if services should be auto-scheduled"""

        actions = state.get("actions", [])

        # For now, require user approval for all scheduling
        # In production, could auto-schedule routine maintenance < $200

        auto_schedulable = [
            a for a in actions
            if a.get("auto_schedule", False)
            and a.get("estimated_cost", 999) < 200
        ]

        return "schedule" if auto_schedulable else "end"

    async def schedule_services(self, state: HomeKeeperState) -> dict:
        """Auto-schedule approved services"""

        scheduled = []

        for action in state.get("actions", []):
            if action.get("auto_schedule", False):
                # Mock scheduling
                result = {
                    "action": action["type"],
                    "task": action.get("task", action.get("description")),
                    "scheduled_date": (state["current_date"] + timedelta(days=7)).isoformat(),
                    "provider": "ABC Services",
                    "status": "scheduled"
                }
                scheduled.append(result)

        return {
            "messages": [{
                "role": "system",
                "content": f"Scheduled {len(scheduled)} services"
            }]
        }

    # Helper methods

    async def _get_maintenance_tasks(self, home_id: str) -> List[dict]:
        """Mock: Get maintenance tasks from database"""
        current_date = datetime.now()
        return [
            {
                "id": "task_1",
                "task_type": "HVAC Service",
                "frequency_days": 180,
                "last_completed": current_date - timedelta(days=200),
                "next_due": current_date - timedelta(days=20),  # Overdue
                "estimated_cost": 150
            },
            {
                "id": "task_2",
                "task_type": "Gutter Cleaning",
                "frequency_days": 180,
                "last_completed": current_date - timedelta(days=160),
                "next_due": current_date + timedelta(days=20),  # Due soon
                "estimated_cost": 120
            },
            {
                "id": "task_3",
                "task_type": "AC Filter Change",
                "frequency_days": 90,
                "last_completed": current_date - timedelta(days=60),
                "next_due": current_date + timedelta(days=30),
                "estimated_cost": 25
            }
        ]

    async def _get_utility_bills(self, home_id: str, months: int) -> List[dict]:
        """Mock: Get utility bills from database"""
        bills = []
        current_date = datetime.now()

        # Generate mock data
        for i in range(months):
            month_start = current_date - timedelta(days=30 * i)
            bills.append({
                "utility_type": "water",
                "billing_period_end": month_start,
                "usage_amount": 4000 + (1000 if i == 0 else np.random.randint(-500, 500)),  # Spike in current month
                "cost": 65.0
            })
            bills.append({
                "utility_type": "electric",
                "billing_period_end": month_start,
                "usage_amount": 850 + np.random.randint(-100, 100),
                "cost": 120.0
            })

        return bills

    async def _get_appliances_with_warranties(self, home_id: str) -> List[dict]:
        """Mock: Get appliances with warranty info"""
        current_date = datetime.now()
        return [
            {
                "id": "app_1",
                "name": "Water Heater",
                "type": "water_heater",
                "install_date": current_date - timedelta(days=1800),
                "warranty_end": current_date + timedelta(days=25),  # Expiring soon
                "warranty_type": "manufacturer"
            },
            {
                "id": "app_2",
                "name": "HVAC System",
                "type": "hvac",
                "install_date": current_date - timedelta(days=1000),
                "warranty_end": current_date + timedelta(days=365),
                "warranty_type": "extended"
            }
        ]

    async def run_analysis(self, home_id: str) -> dict:
        """Run the complete home analysis workflow"""

        initial_state = {
            "home_id": home_id,
            "current_date": datetime.now(),
            "appliances": [],
            "maintenance_due": {},
            "utility_data": {},
            "anomalies": [],
            "actions": [],
            "messages": []
        }

        result = await self.graph.ainvoke(initial_state)

        return {
            "home_id": home_id,
            "analysis_timestamp": datetime.now().isoformat(),
            "maintenance_status": result.get("maintenance_due", {}),
            "utility_analysis": result.get("utility_data", {}),
            "anomalies_detected": result.get("anomalies", []),
            "recommendations": result.get("actions", []),
            "workflow_messages": result.get("messages", [])
        }


# Example usage
async def main():
    """Example of running the homekeeper agent"""
    import os

    # Initialize agent
    api_key = os.getenv("ANTHROPIC_API_KEY", "your-key-here")
    agent = HomeKeeperAgent(api_key=api_key)

    # Run analysis for a home
    result = await agent.run_analysis(home_id="home_123")

    print("\n=== HomeKeeper Analysis Results ===\n")
    print(json.dumps(result, indent=2))

    print("\n=== Recommendations ===\n")
    for rec in result.get("recommendations", []):
        print(f"- [{rec['type']}] {rec.get('task', rec.get('description', 'N/A'))} (urgency: {rec['urgency']})")


if __name__ == "__main__":
    asyncio.run(main())
