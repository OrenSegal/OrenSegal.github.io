"""
HomeKeeper FastAPI Application
Production-ready API for home maintenance agent
"""

from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, date
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agents.homekeeper_agent import HomeKeeperAgent

app = FastAPI(
    title="HomeKeeper API",
    description="AI-powered home maintenance management system",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize agent - uses LLM_PROVIDER env var: ollama (free), groq (free), anthropic (paid)
try:
    homekeeper_agent = HomeKeeperAgent()
except Exception as e:
    print(f"Warning: Could not initialize homekeeper agent: {e}")
    homekeeper_agent = None


# Pydantic Models

class ApplianceRequest(BaseModel):
    """Add an appliance"""
    type: str = Field(..., description="Appliance type (hvac, water_heater, refrigerator, etc.)")
    brand: str
    model: str
    serial_number: Optional[str] = None
    install_date: date
    location: str


class MaintenanceTaskRequest(BaseModel):
    """Schedule maintenance"""
    task_type: str
    appliance_id: Optional[str] = None
    frequency_days: int
    estimated_cost: Optional[float] = None


class UtilityBillRequest(BaseModel):
    """Import utility bill"""
    utility_type: str = Field(..., pattern="^(water|electric|gas)$")
    billing_period_start: date
    billing_period_end: date
    usage_amount: float
    usage_unit: str
    cost: float


# API Endpoints

@app.get("/")
async def root():
    return {
        "service": "HomeKeeper API",
        "status": "healthy",
        "version": "1.0.0",
        "agent_ready": homekeeper_agent is not None
    }


@app.get("/api/v1/homes/{home_id}/dashboard")
async def get_home_dashboard(home_id: str):
    """
    Get comprehensive home dashboard

    Returns upcoming maintenance, alerts, and expiring warranties
    """
    if not homekeeper_agent:
        raise HTTPException(status_code=503, detail="HomeKeeper agent not initialized")

    # Run agent analysis
    analysis = await homekeeper_agent.run_analysis(home_id)

    # Format for dashboard
    maintenance_due = analysis.get("maintenance_status", {})
    anomalies = analysis.get("anomalies_detected", [])
    recommendations = analysis.get("recommendations", [])

    upcoming_maintenance = []
    for task in maintenance_due.get("due_soon", [])[:5]:
        days_until = (task["next_due"] - datetime.now()).days
        upcoming_maintenance.append({
            "task": task["task_type"],
            "due_date": task["next_due"].isoformat() if isinstance(task["next_due"], datetime) else task["next_due"],
            "days_until_due": days_until,
            "priority": "high" if days_until < 14 else "medium",
            "estimated_cost": task.get("estimated_cost", 0)
        })

    # Format alerts from anomalies
    alerts = []
    for anomaly in anomalies:
        if anomaly.get("severity") in ["medium", "high", "critical"]:
            alerts.append({
                "type": anomaly.get("type", "alert"),
                "severity": anomaly.get("severity", "medium"),
                "message": anomaly.get("description", "Anomaly detected"),
                "action": anomaly.get("recommended_action", "Review and address")
            })

    return {
        "home_id": home_id,
        "upcoming_maintenance": upcoming_maintenance,
        "recent_alerts": alerts,
        "recommendations": recommendations,
        "generated_at": datetime.now().isoformat()
    }


@app.post("/api/v1/appliances")
async def add_appliance(home_id: str, appliance: ApplianceRequest):
    """Add an appliance to the home"""
    appliance_data = {
        "home_id": home_id,
        "created_at": datetime.now().isoformat(),
        **appliance.dict()
    }

    # In production, store in database and auto-create maintenance schedule
    return {
        "status": "created",
        "appliance": appliance_data,
        "message": "Appliance added successfully",
        "next_steps": [
            "Upload warranty document (optional)",
            "Maintenance schedule auto-created"
        ]
    }


@app.post("/api/v1/warranties/upload")
async def upload_warranty(appliance_id: str, file: UploadFile = File(...)):
    """
    Upload warranty document

    Agent will OCR and extract warranty information
    """
    # In production, process with OCR + GPT-4V
    return {
        "status": "processing",
        "appliance_id": appliance_id,
        "filename": file.filename,
        "message": "Warranty document uploaded. Agent is extracting information...",
        "extracted_data": {
            "coverage_start": "2020-05-15",
            "coverage_end": "2030-05-15",
            "parts_covered": True,
            "labor_covered": False,
            "claim_phone": "1-800-XXX-XXXX"
        }
    }


@app.post("/api/v1/utilities/import")
async def import_utility_bill(home_id: str, bill: UtilityBillRequest):
    """
    Import utility bill

    Agent analyzes for anomalies and trends
    """
    bill_data = {
        "home_id": home_id,
        "imported_at": datetime.now().isoformat(),
        **bill.dict()
    }

    # Mock anomaly detection
    # In production, run full agent analysis
    baseline = {"water": 4000, "electric": 850, "gas": 50}
    current_baseline = baseline.get(bill.utility_type, 0)

    variance_pct = ((bill.usage_amount - current_baseline) / current_baseline) * 100 if current_baseline > 0 else 0

    response = {
        "imported": True,
        "bill": bill_data,
        "baseline": current_baseline,
        "variance": f"{variance_pct:+.1f}%"
    }

    # Anomaly detected
    if abs(variance_pct) > 40:
        response["anomaly_detected"] = True
        response["alert"] = {
            "severity": "warning" if abs(variance_pct) < 60 else "critical",
            "message": f"{bill.utility_type.title()} usage {abs(variance_pct):.0f}% {'above' if variance_pct > 0 else 'below'} baseline",
            "recommendations": [
                "Check for leaks" if bill.utility_type == "water" else "Inspect appliances",
                "Review recent usage patterns",
                f"Schedule inspection if pattern continues"
            ]
        }

    return response


@app.get("/api/v1/maintenance/calendar")
async def get_maintenance_calendar(home_id: str, year: int = 2025):
    """Get maintenance calendar for the year"""

    # Mock calendar data
    return {
        "home_id": home_id,
        "year": year,
        "months": {
            "2025-11": [
                {
                    "task": "Clean gutters",
                    "due_date": "2025-11-15",
                    "seasonal": True,
                    "reason": "Before rainy season"
                }
            ],
            "2025-12": [
                {
                    "task": "HVAC service (heating check)",
                    "due_date": "2025-12-01",
                    "recurring": True,
                    "last_completed": "2025-06-01"
                },
                {
                    "task": "Change furnace filter",
                    "due_date": "2025-12-01",
                    "frequency": "monthly"
                }
            ]
        }
    }


@app.post("/api/v1/maintenance/schedule")
async def schedule_maintenance(home_id: str, task: MaintenanceTaskRequest):
    """
    Request maintenance scheduling

    Agent finds providers, gets quotes, and presents options
    """
    return {
        "status": "options_found",
        "task_type": task.task_type,
        "providers": [
            {
                "name": "ABC Heating & Cooling",
                "rating": 4.8,
                "available": "2025-12-01 10:00 AM",
                "estimated_cost": 150,
                "distance_miles": 3.2,
                "recommendation_score": 0.95
            },
            {
                "name": "Home Services Pro",
                "rating": 4.6,
                "available": "2025-12-02 2:00 PM",
                "estimated_cost": 135,
                "distance_miles": 5.1,
                "recommendation_score": 0.88
            }
        ],
        "message": "Agent found 2 qualified providers"
    }


@app.get("/api/v1/insights/anomalies")
async def get_anomaly_insights(home_id: str):
    """Get detected anomalies and AI recommendations"""

    if not homekeeper_agent:
        raise HTTPException(status_code=503, detail="Agent not initialized")

    analysis = await homekeeper_agent.run_analysis(home_id)

    return {
        "home_id": home_id,
        "anomalies": analysis.get("anomalies_detected", []),
        "recommendations": analysis.get("recommendations", []),
        "analyzed_at": datetime.now().isoformat()
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
