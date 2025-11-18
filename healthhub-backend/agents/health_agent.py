"""
HealthHub Core Agent
Agentic health management system using LangGraph
"""

from langgraph.graph import StateGraph, END
from langchain_core.messages import HumanMessage, SystemMessage
from typing import TypedDict, List, Annotated, Optional
import operator
import json
from datetime import datetime, timedelta
import asyncio
import os
import sys

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from services.llm_provider import get_llm, get_provider_info

class HealthHubState(TypedDict):
    """Shared state across agent workflow"""
    user_id: str
    current_action: str
    health_context: dict
    symptoms: List[dict]
    medications: List[dict]
    patterns: List[dict]
    recommendations: List[dict]
    messages: Annotated[List[dict], operator.add]


class HealthHubAgent:
    """Main health management agent with agentic workflows"""

    def __init__(self, api_key: str = None):
        # Use flexible LLM provider (supports Ollama, Groq, Anthropic, Google)
        # Set LLM_PROVIDER env var to choose: ollama, groq, anthropic, google
        self.llm = get_llm(temperature=0.3)
        self.provider_info = get_provider_info()
        self.graph = self._build_graph()

        print(f"HealthHub initialized with {self.provider_info['provider']} ({self.provider_info.get('model', 'default')})")
        print(f"Cost: {self.provider_info['cost']}")

    def _build_graph(self) -> StateGraph:
        """Construct the agentic workflow graph"""
        workflow = StateGraph(HealthHubState)

        # Add nodes (each represents an agent capability)
        workflow.add_node("gather_context", self.gather_health_context)
        workflow.add_node("analyze_symptoms", self.analyze_symptom_patterns)
        workflow.add_node("check_medications", self.check_medication_adherence)
        workflow.add_node("detect_patterns", self.detect_health_patterns)
        workflow.add_node("generate_recommendations", self.generate_recommendations)
        workflow.add_node("execute_actions", self.execute_actions)

        # Define edges (workflow sequence)
        workflow.set_entry_point("gather_context")
        workflow.add_edge("gather_context", "analyze_symptoms")
        workflow.add_edge("analyze_symptoms", "check_medications")
        workflow.add_edge("check_medications", "detect_patterns")
        workflow.add_edge("detect_patterns", "generate_recommendations")

        # Conditional edge: Execute actions or end
        workflow.add_conditional_edges(
            "generate_recommendations",
            self.should_execute_actions,
            {
                "execute": "execute_actions",
                "end": END
            }
        )
        workflow.add_edge("execute_actions", END)

        return workflow.compile()

    async def gather_health_context(self, state: HealthHubState) -> dict:
        """Gather comprehensive health context from database"""
        user_id = state["user_id"]

        # In production, these would be actual database calls
        # For now, simulating with mock data
        recent_symptoms = await self._get_recent_symptoms(user_id, days=30)
        medications = await self._get_active_medications(user_id)
        recent_checkins = await self._get_recent_checkins(user_id, days=7)

        return {
            "health_context": {
                "recent_symptoms": recent_symptoms,
                "medications": medications,
                "checkins": recent_checkins,
                "gathered_at": datetime.now().isoformat()
            },
            "messages": [{
                "role": "system",
                "content": f"Gathered health context for user {user_id}"
            }]
        }

    async def analyze_symptom_patterns(self, state: HealthHubState) -> dict:
        """Use LLM to detect symptom patterns"""
        symptoms = state["health_context"]["recent_symptoms"]

        if not symptoms:
            return {"symptoms": [], "patterns": []}

        prompt = f"""Analyze the following symptom history for patterns:

{json.dumps(symptoms, indent=2)}

Look for:
1. Recurring symptoms (same symptom multiple times)
2. Temporal patterns (time of day, day of week)
3. Correlations (symptoms that appear together)
4. Escalating severity trends
5. New symptoms that require medical attention

Return JSON in this format:
{{
    "patterns": [
        {{
            "type": "recurring" | "temporal" | "correlation" | "escalating" | "new",
            "description": "detailed description",
            "symptoms_involved": ["symptom1", "symptom2"],
            "frequency": "description of frequency",
            "severity": "low" | "medium" | "high" | "critical",
            "confidence": 0.0-1.0,
            "recommendation": "what action to take"
        }}
    ]
}}"""

        messages = [
            SystemMessage(content="You are a health analysis AI that identifies patterns in symptom data."),
            HumanMessage(content=prompt)
        ]

        response = await self.llm.ainvoke(messages)

        try:
            patterns = json.loads(response.content)
            return {
                "patterns": patterns.get("patterns", []),
                "messages": [{
                    "role": "assistant",
                    "content": f"Analyzed {len(symptoms)} symptoms, found {len(patterns.get('patterns', []))} patterns"
                }]
            }
        except json.JSONDecodeError:
            return {"patterns": [], "messages": [{"role": "error", "content": "Failed to parse pattern analysis"}]}

    async def check_medication_adherence(self, state: HealthHubState) -> dict:
        """Check medication adherence and identify issues"""
        medications = state["health_context"]["medications"]

        if not medications:
            return {"medications": []}

        adherence_issues = []

        for med in medications:
            missed_doses = med.get("missed_doses", 0)
            if missed_doses >= 2:
                adherence_issues.append({
                    "medication": med["name"],
                    "missed_count": missed_doses,
                    "issue_type": "adherence",
                    "severity": "high" if missed_doses > 3 else "medium",
                    "recommendation": f"Adjust reminder time for {med['name']}"
                })

        return {
            "medications": adherence_issues,
            "messages": [{
                "role": "system",
                "content": f"Checked {len(medications)} medications, found {len(adherence_issues)} adherence issues"
            }]
        }

    async def detect_health_patterns(self, state: HealthHubState) -> dict:
        """Cross-reference symptoms, meds, behaviors using LLM reasoning"""

        context = {
            "symptoms": state.get("patterns", []),
            "medications": state.get("medications", []),
            "health_context": state.get("health_context", {})
        }

        prompt = f"""You are a health analysis agent. Given this comprehensive health data:

{json.dumps(context, indent=2)}

Identify:
1. Concerning patterns requiring medical attention
2. Medication adherence issues affecting health
3. Lifestyle correlations (sleep, stress, exercise)
4. Opportunities for preventive care

For each finding, assess:
- Severity (low/medium/high/critical)
- Confidence (0.0-1.0, how certain are you?)
- Recommended action
- Urgency (routine/soon/urgent/emergency)

Return structured JSON:
{{
    "findings": [
        {{
            "type": "concerning_pattern" | "medication_issue" | "lifestyle_correlation" | "preventive_care",
            "description": "detailed description",
            "severity": "low" | "medium" | "high" | "critical",
            "confidence": 0.0-1.0,
            "recommended_action": "specific action to take",
            "urgency": "routine" | "soon" | "urgent" | "emergency",
            "reasoning": "why this is concerning"
        }}
    ]
}}"""

        messages = [
            SystemMessage(content="You are a medical analysis AI that identifies health risks and opportunities."),
            HumanMessage(content=prompt)
        ]

        response = await self.llm.ainvoke(messages)

        try:
            analysis = json.loads(response.content)
            findings = analysis.get("findings", [])

            return {
                "recommendations": findings,
                "messages": [{
                    "role": "assistant",
                    "content": f"Detected {len(findings)} health patterns requiring attention"
                }]
            }
        except json.JSONDecodeError:
            return {"recommendations": []}

    async def generate_recommendations(self, state: HealthHubState) -> dict:
        """Convert patterns into actionable recommendations"""

        recommendations = []

        # Process symptom patterns
        for pattern in state.get("patterns", []):
            if pattern.get("severity") in ["high", "critical"]:
                recommendations.append({
                    "type": "schedule_appointment",
                    "reason": pattern["description"],
                    "urgency": pattern.get("urgency", "soon"),
                    "provider_type": self._determine_provider_type(pattern),
                    "auto_execute": False  # Requires user approval
                })

        # Process medication adherence
        for med_issue in state.get("medications", []):
            if med_issue.get("issue_type") == "adherence":
                recommendations.append({
                    "type": "adjust_reminder",
                    "medication": med_issue["medication"],
                    "current_issues": f"Missed {med_issue['missed_count']} doses",
                    "auto_execute": True  # Can auto-adjust reminders
                })

        # Process general recommendations
        for rec in state.get("recommendations", []):
            if rec.get("urgency") in ["urgent", "emergency"]:
                recommendations.append({
                    "type": "immediate_action",
                    "description": rec["description"],
                    "action": rec["recommended_action"],
                    "urgency": rec["urgency"],
                    "auto_execute": False
                })

        return {
            "recommendations": recommendations,
            "messages": [{
                "role": "assistant",
                "content": f"Generated {len(recommendations)} actionable recommendations"
            }]
        }

    def should_execute_actions(self, state: HealthHubState) -> str:
        """Decide if actions should auto-execute or require approval"""

        recommendations = state.get("recommendations", [])

        # Auto-execute low-risk actions
        auto_execute_types = ["adjust_reminder", "send_alert"]

        has_auto_executable = any(
            r.get("auto_execute", False) and r["type"] in auto_execute_types
            for r in recommendations
        )

        return "execute" if has_auto_executable else "end"

    async def execute_actions(self, state: HealthHubState) -> dict:
        """Execute approved actions"""

        executed = []

        for rec in state.get("recommendations", []):
            if rec.get("auto_execute", False):
                if rec["type"] == "adjust_reminder":
                    # Simulate reminder adjustment
                    result = await self._adjust_medication_reminder(rec)
                    executed.append(result)
                elif rec["type"] == "send_alert":
                    # Simulate sending alert
                    result = await self._send_health_alert(rec)
                    executed.append(result)

        return {
            "messages": [{
                "role": "system",
                "content": f"Executed {len(executed)} actions: {', '.join(e['action'] for e in executed)}"
            }]
        }

    # Helper methods

    def _determine_provider_type(self, pattern: dict) -> str:
        """Determine appropriate medical provider type"""
        description = pattern.get("description", "").lower()

        if "headache" in description or "migraine" in description:
            return "neurologist"
        elif "pain" in description:
            return "primary_care"
        elif "skin" in description:
            return "dermatologist"
        else:
            return "primary_care"

    async def _get_recent_symptoms(self, user_id: str, days: int) -> List[dict]:
        """Mock: Get recent symptoms from database"""
        # In production, this would query the database
        return [
            {
                "id": "s1",
                "type": "headache",
                "severity": 7,
                "location": "temples",
                "logged_at": (datetime.now() - timedelta(days=1)).isoformat(),
                "notes": "throbbing pain"
            },
            {
                "id": "s2",
                "type": "headache",
                "severity": 6,
                "location": "temples",
                "logged_at": (datetime.now() - timedelta(days=3)).isoformat(),
                "notes": "light sensitivity"
            },
            {
                "id": "s3",
                "type": "headache",
                "severity": 8,
                "location": "temples",
                "logged_at": (datetime.now() - timedelta(days=5)).isoformat(),
                "notes": "nausea"
            }
        ]

    async def _get_active_medications(self, user_id: str) -> List[dict]:
        """Mock: Get active medications from database"""
        return [
            {
                "id": "m1",
                "name": "Ibuprofen",
                "dosage": "400mg",
                "frequency": "as needed",
                "missed_doses": 0
            },
            {
                "id": "m2",
                "name": "Vitamin D",
                "dosage": "1000 IU",
                "frequency": "daily",
                "missed_doses": 3
            }
        ]

    async def _get_recent_checkins(self, user_id: str, days: int) -> List[dict]:
        """Mock: Get recent daily check-ins"""
        return [
            {
                "date": (datetime.now() - timedelta(days=1)).isoformat(),
                "sleep_quality": 6,
                "pain_level": 3,
                "mood": "tired"
            },
            {
                "date": (datetime.now() - timedelta(days=2)).isoformat(),
                "sleep_quality": 7,
                "pain_level": 2,
                "mood": "good"
            }
        ]

    async def _adjust_medication_reminder(self, recommendation: dict) -> dict:
        """Mock: Adjust medication reminder time"""
        return {
            "action": f"Adjusted reminder for {recommendation['medication']}",
            "status": "success"
        }

    async def _send_health_alert(self, recommendation: dict) -> dict:
        """Mock: Send health alert to user"""
        return {
            "action": "Sent health alert",
            "status": "success"
        }

    async def run_analysis(self, user_id: str) -> dict:
        """Run the complete health analysis workflow"""

        initial_state = {
            "user_id": user_id,
            "current_action": "starting_analysis",
            "health_context": {},
            "symptoms": [],
            "medications": [],
            "patterns": [],
            "recommendations": [],
            "messages": []
        }

        result = await self.graph.ainvoke(initial_state)

        return {
            "user_id": user_id,
            "analysis_timestamp": datetime.now().isoformat(),
            "patterns_detected": result.get("patterns", []),
            "recommendations": result.get("recommendations", []),
            "workflow_messages": result.get("messages", [])
        }


# Example usage
async def main():
    """Example of running the health agent"""
    import os

    # Initialize agent
    api_key = os.getenv("ANTHROPIC_API_KEY", "your-key-here")
    agent = HealthHubAgent(api_key=api_key)

    # Run analysis for a user
    result = await agent.run_analysis(user_id="user_123")

    print("\n=== HealthHub Analysis Results ===\n")
    print(json.dumps(result, indent=2))

    print("\n=== Recommendations ===\n")
    for rec in result.get("recommendations", []):
        print(f"- [{rec['type']}] {rec.get('reason', rec.get('description', 'N/A'))}")


if __name__ == "__main__":
    asyncio.run(main())
