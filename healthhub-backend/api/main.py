"""
HealthHub FastAPI Application
Production-ready API for health management agent
"""

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, date
import os
import sys

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agents.health_agent import HealthHubAgent

# Initialize FastAPI app
app = FastAPI(
    title="HealthHub API",
    description="AI-powered personal health management system",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize health agent
# Uses LLM_PROVIDER env var: ollama (free local), groq (free cloud), anthropic (paid)
# Defaults to Ollama if no provider specified
try:
    health_agent = HealthHubAgent()
except Exception as e:
    print(f"Warning: Could not initialize health agent: {e}")
    health_agent = None


# Pydantic Models

class CheckInRequest(BaseModel):
    """Daily health check-in"""
    sleep_quality: Optional[int] = Field(None, ge=1, le=10, description="Sleep quality 1-10")
    pain_level: Optional[int] = Field(None, ge=0, le=10, description="Pain level 0-10")
    pain_location: Optional[str] = None
    medications_taken: List[str] = []
    mood: Optional[str] = None
    notes: Optional[str] = None


class SymptomLogRequest(BaseModel):
    """Log a symptom"""
    type: str = Field(..., description="Symptom type (headache, pain, fatigue, etc.)")
    severity: int = Field(..., ge=1, le=10, description="Severity 1-10")
    location: Optional[str] = None
    duration_hours: Optional[float] = None
    description: Optional[str] = None


class MedicationRequest(BaseModel):
    """Add a medication"""
    name: str
    dosage: str
    frequency: str  # "once daily", "twice daily", "as needed"
    start_date: date
    end_date: Optional[date] = None
    prescribing_doctor: Optional[str] = None
    notes: Optional[str] = None


class AppointmentRequest(BaseModel):
    """Request appointment booking"""
    reason: str
    urgency: str = Field(..., pattern="^(routine|soon|urgent|emergency)$")
    provider_preference: Optional[str] = None
    preferred_date: Optional[date] = None


# API Endpoints

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "service": "HealthHub API",
        "status": "healthy",
        "version": "1.0.0",
        "agent_ready": health_agent is not None
    }


@app.post("/api/v1/check-in")
async def daily_checkin(user_id: str, checkin: CheckInRequest):
    """
    Daily health check-in endpoint

    Logs daily health metrics and triggers agent analysis if patterns detected
    """
    # In production, store in database
    checkin_data = {
        "user_id": user_id,
        "timestamp": datetime.now().isoformat(),
        **checkin.dict()
    }

    # Trigger agent analysis if concerning patterns
    if checkin.pain_level and checkin.pain_level >= 7:
        if health_agent:
            analysis = await health_agent.run_analysis(user_id)
            return {
                "status": "logged",
                "data": checkin_data,
                "agent_analysis": analysis,
                "alert": "High pain level detected - analysis triggered"
            }

    return {
        "status": "logged",
        "data": checkin_data,
        "message": "Check-in recorded successfully"
    }


@app.post("/api/v1/symptoms")
async def log_symptom(user_id: str, symptom: SymptomLogRequest):
    """
    Log a symptom

    Agent analyzes symptom patterns and provides recommendations
    """
    symptom_data = {
        "user_id": user_id,
        "logged_at": datetime.now().isoformat(),
        **symptom.dict()
    }

    # Run agent analysis
    if health_agent:
        analysis = await health_agent.run_analysis(user_id)

        # Check if pattern detected
        patterns = analysis.get("patterns_detected", [])
        critical_patterns = [p for p in patterns if p.get("severity") in ["high", "critical"]]

        if critical_patterns:
            return {
                "logged": True,
                "symptom": symptom_data,
                "pattern_detected": critical_patterns[0],
                "recommendations": analysis.get("recommendations", [])
            }

    return {
        "logged": True,
        "symptom": symptom_data,
        "message": "Symptom logged successfully"
    }


@app.get("/api/v1/insights")
async def get_health_insights(user_id: str, timeframe: str = "7d"):
    """
    Get AI-powered health insights

    Returns detected patterns, alerts, and recommendations
    """
    if not health_agent:
        raise HTTPException(status_code=503, detail="Health agent not initialized")

    # Run comprehensive analysis
    analysis = await health_agent.run_analysis(user_id)

    # Format insights
    patterns = analysis.get("patterns_detected", [])
    recommendations = analysis.get("recommendations", [])

    # Generate alerts from high-severity patterns
    alerts = [
        {
            "severity": p.get("severity", "medium"),
            "message": p.get("description", "Pattern detected"),
            "action": p.get("recommendation", "Monitor symptoms")
        }
        for p in patterns
        if p.get("severity") in ["high", "critical"]
    ]

    return {
        "timeframe": timeframe,
        "patterns": patterns,
        "alerts": alerts,
        "recommendations": recommendations,
        "generated_at": datetime.now().isoformat()
    }


@app.post("/api/v1/medications")
async def add_medication(user_id: str, medication: MedicationRequest):
    """Add a medication to user's profile"""
    med_data = {
        "user_id": user_id,
        "created_at": datetime.now().isoformat(),
        **medication.dict()
    }

    # In production, store in database and set up reminder system
    return {
        "status": "created",
        "medication": med_data,
        "message": "Medication added successfully"
    }


@app.get("/api/v1/medications/adherence")
async def get_medication_adherence(user_id: str, days: int = 30):
    """
    Get medication adherence statistics

    Shows which medications are being taken consistently
    """
    # Mock data - in production, calculate from database
    return {
        "user_id": user_id,
        "timeframe_days": days,
        "overall_rate": 0.87,
        "by_medication": [
            {
                "name": "Vitamin D",
                "rate": 0.73,
                "missed_doses": 8,
                "optimal_time": "9:00 AM",
                "recommendation": "Try setting reminder for morning routine"
            },
            {
                "name": "Ibuprofen",
                "rate": 1.0,
                "missed_doses": 0,
                "as_needed": True
            }
        ]
    }


@app.post("/api/v1/appointments/request")
async def request_appointment(user_id: str, request: AppointmentRequest):
    """
    Request appointment booking

    Agent orchestrates finding providers, checking insurance, and booking
    """
    # In production, this would trigger full appointment orchestration workflow
    return {
        "status": "processing",
        "request_id": "apt_" + datetime.now().strftime("%Y%m%d%H%M%S"),
        "user_id": user_id,
        "reason": request.reason,
        "urgency": request.urgency,
        "message": "Appointment request received. Agent is finding available providers.",
        "next_steps": [
            "Verifying insurance coverage",
            "Finding in-network providers",
            "Checking availability",
            "Will return top 3 options within 5 minutes"
        ]
    }


@app.get("/api/v1/appointments")
async def get_appointments(user_id: str):
    """Get user's appointments"""
    # Mock data - in production, fetch from database
    return {
        "upcoming": [
            {
                "id": "apt_001",
                "provider": "Dr. Sarah Smith",
                "type": "primary_care",
                "date": "2025-11-25T10:00:00",
                "reason": "Annual checkup",
                "status": "confirmed"
            }
        ],
        "past": []
    }


@app.get("/api/v1/insurance/coverage")
async def check_insurance_coverage(
    user_id: str,
    procedure: str,
    provider: Optional[str] = None
):
    """
    Check insurance coverage for a procedure/provider

    Returns estimated costs and coverage details
    """
    # Mock data - in production, integrate with insurance APIs
    return {
        "procedure": procedure,
        "provider": provider,
        "covered": True,
        "in_network": True,
        "estimated_cost": {
            "insurance_pays": "$150",
            "your_responsibility": "$20 (copay)"
        },
        "pre_authorization_required": False,
        "details": "Fully covered under your plan with $20 copay"
    }


@app.get("/api/v1/health/timeline")
async def get_health_timeline(user_id: str, days: int = 90):
    """
    Get comprehensive health timeline

    Shows all symptoms, medications, appointments over time
    """
    # Mock data - in production, aggregate from database
    return {
        "user_id": user_id,
        "timeframe_days": days,
        "events": [
            {
                "date": "2025-11-17",
                "type": "symptom",
                "data": {"type": "headache", "severity": 7}
            },
            {
                "date": "2025-11-15",
                "type": "medication_started",
                "data": {"name": "Vitamin D", "dosage": "1000 IU"}
            },
            {
                "date": "2025-11-10",
                "type": "appointment",
                "data": {"provider": "Dr. Smith", "reason": "Annual checkup"}
            }
        ]
    }


# Error handlers

@app.exception_handler(404)
async def not_found_handler(request, exc):
    return {
        "error": "Not Found",
        "message": "The requested resource was not found",
        "status_code": 404
    }


@app.exception_handler(500)
async def server_error_handler(request, exc):
    return {
        "error": "Internal Server Error",
        "message": "An unexpected error occurred",
        "status_code": 500
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
