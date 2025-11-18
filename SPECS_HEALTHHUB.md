# HealthHub - Personal Health Manager
## Complete Technical Specification

---

## 📋 Project Overview

**Tagline**: *"Your AI health companion that remembers, tracks, and acts"*

**The Problem**: Managing health is overwhelming - tracking symptoms, medications, appointments, insurance navigation, and medical records across multiple providers creates cognitive overload and leads to missed care.

**The Solution**: An agentic AI system that autonomously manages your complete health journey - from daily symptom tracking to appointment orchestration to insurance navigation.

**One-Liner Pitch**: *"I built an AI that tracks my health patterns, books doctor appointments when needed, and navigates insurance - it caught a recurring symptom pattern my doctor missed."*

---

## 🎯 Core Agentic Capabilities

### 1. **Planning & Reasoning**
- Multi-step healthcare workflows (symptom → pattern detection → appointment → prep)
- Temporal reasoning (tracks trends over weeks/months)
- Constraint satisfaction (insurance networks, provider availability, medication interactions)
- Proactive scheduling (preventive care, refills before they run out)

### 2. **Tool Use & Integration**
- **Medical Records**: FHIR API, MyChart/Epic integration
- **Pharmacy**: RxNorm API, pharmacy systems
- **Insurance**: Eligibility verification, claims tracking
- **Calendar**: Appointment scheduling, reminders
- **Communication**: SMS/email for check-ins and alerts

### 3. **Memory & Learning**
- Personal health timeline (symptoms, diagnoses, treatments)
- Medication efficacy tracking (did it help?)
- Provider quality tracking (wait times, bedside manner)
- Behavioral patterns (morning check-ins work better than evening)

### 4. **Reflection & Adaptation**
- Pattern detection in symptoms (headaches every Monday)
- Medication adherence optimization (reminders at optimal times)
- Appointment scheduling adjustments (avoid 8am appointments)

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     HealthHub Agent Core                     │
│                    (LangGraph Workflow)                      │
└───────────────────┬─────────────────────────────────────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
        ▼           ▼           ▼
┌──────────┐  ┌──────────┐  ┌──────────┐
│ Symptom  │  │Medication│  │Appointment│
│  Tracker │  │ Manager  │  │Orchestrator│
└──────────┘  └──────────┘  └──────────┘
        │           │           │
        └───────────┼───────────┘
                    ▼
        ┌───────────────────────┐
        │    Health Knowledge   │
        │    Graph Database     │
        │   (PostgreSQL + pgvector)│
        └───────────────────────┘
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
┌──────────┐  ┌──────────┐  ┌──────────┐
│  FHIR    │  │Pharmacy  │  │Insurance │
│   API    │  │   API    │  │   API    │
└──────────┘  └──────────┘  └──────────┘
```

---

## 💻 Technical Stack

### **Backend**
- **Language**: Python 3.11+
- **Agent Framework**: LangGraph (for agentic workflows)
- **LLM**: Anthropic Claude 3.5 Sonnet (reasoning, synthesis)
- **API Framework**: FastAPI (REST endpoints)
- **Database**: PostgreSQL 15 + pgvector (health timeline, embeddings)
- **Cache/Queue**: Redis (medication reminders, scheduled tasks)
- **Task Scheduler**: Celery (daily check-ins, appointment monitoring)

### **Frontend**
- **Framework**: Next.js 14 (App Router)
- **UI Library**: shadcn/ui + Tailwind CSS
- **State**: Zustand (client state)
- **Charts**: Recharts (symptom trends)
- **Auth**: NextAuth.js (OAuth + magic links)

### **Integrations**
- **Medical Records**: FHIR R4 API (HL7 standard)
- **Pharmacy**: RxNorm, OpenFDA Drug API
- **Insurance**: Eligibility 270/271 (X12 EDI)
- **Calendar**: Google Calendar API
- **Notifications**: Twilio (SMS), SendGrid (email)

### **Deployment**
- **Container**: Docker + Docker Compose
- **Hosting**: Railway / Render (backend), Vercel (frontend)
- **Secrets**: Doppler / environment variables
- **Monitoring**: Sentry (errors), Posthog (analytics)

---

## 🔄 Agentic Workflow Design

### **Daily Check-In Agent**
```python
# LangGraph State
class HealthCheckState(TypedDict):
    user_id: str
    date: datetime
    sleep_quality: Optional[int]  # 1-10
    pain_level: Optional[int]
    pain_location: Optional[str]
    medications_taken: List[str]
    mood: Optional[str]
    symptoms: List[str]

# Workflow Nodes
1. morning_prompt() → Send check-in via SMS/notification
2. collect_responses() → Parse user input (natural language)
3. analyze_patterns() → Detect trends, anomalies
4. trigger_actions() → If concerning pattern, escalate
5. update_timeline() → Store in health graph

# Agent Decision Points
- "Pain 3+ days in a row?" → Schedule appointment
- "Missed medication 2 days?" → Adjust reminder time
- "Sleep quality declining?" → Suggest sleep hygiene tips
```

### **Symptom Analysis Agent**
```python
# LangGraph Workflow
class SymptomAnalysisState(TypedDict):
    symptoms: List[Symptom]
    timeframe: str  # "last 7 days"
    user_context: HealthContext
    patterns: List[Pattern]
    recommendations: List[Action]

# Graph Flow
1. gather_symptoms() → Query last N days of check-ins
2. detect_patterns() → LLM analyzes temporal patterns
3. cross_reference() → Check against known conditions
4. generate_summary() → Create patient-friendly report
5. recommend_action() → "See doctor" vs "monitor" vs "lifestyle change"
```

### **Appointment Orchestrator Agent**
```python
# Multi-Step Workflow
class AppointmentState(TypedDict):
    reason: str  # "recurring headaches"
    urgency: str  # "routine" | "urgent" | "emergency"
    provider_type: str  # "primary care" | "specialist"
    insurance_verified: bool
    available_slots: List[Slot]
    selected_slot: Optional[Slot]
    prep_questions: List[str]

# Agent Steps
1. determine_provider() → PCP vs specialist, in-network check
2. find_availability() → Scrape provider websites, call APIs
3. rank_options() → Score by: distance, wait time, reviews, cost
4. book_appointment() → Automated booking or draft message
5. prepare_visit() → Generate questions, symptom summary for doctor
6. set_reminders() → Calendar event, pre-visit prep, follow-up
```

---

## 📊 Database Schema

### **PostgreSQL Tables**

```sql
-- Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    insurance_provider VARCHAR(255),
    insurance_member_id VARCHAR(100),
    preferred_pharmacy VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Health Timeline (Event Sourcing)
CREATE TABLE health_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    event_type VARCHAR(50), -- 'symptom', 'medication', 'appointment', 'diagnosis'
    event_date TIMESTAMP NOT NULL,
    data JSONB NOT NULL, -- Flexible schema
    embedding VECTOR(1536), -- For semantic search
    created_at TIMESTAMP DEFAULT NOW()
);

-- Medications
CREATE TABLE medications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    dosage VARCHAR(100),
    frequency VARCHAR(100), -- "twice daily"
    start_date DATE,
    end_date DATE,
    prescribing_doctor VARCHAR(255),
    notes TEXT,
    active BOOLEAN DEFAULT TRUE
);

-- Medication Logs (Adherence Tracking)
CREATE TABLE medication_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    medication_id UUID REFERENCES medications(id),
    scheduled_time TIMESTAMP,
    taken_time TIMESTAMP,
    taken BOOLEAN,
    notes TEXT
);

-- Appointments
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    provider_name VARCHAR(255),
    provider_type VARCHAR(100), -- 'primary_care', 'specialist'
    appointment_date TIMESTAMP,
    reason TEXT,
    status VARCHAR(50), -- 'scheduled', 'completed', 'cancelled'
    notes TEXT,
    prep_questions JSONB,
    visit_summary TEXT
);

-- Symptoms
CREATE TABLE symptoms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    symptom_type VARCHAR(100), -- 'headache', 'pain', 'fatigue'
    severity INTEGER CHECK (severity BETWEEN 1 AND 10),
    location VARCHAR(100),
    description TEXT,
    logged_at TIMESTAMP DEFAULT NOW()
);

-- Agent Actions (Audit Trail)
CREATE TABLE agent_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action_type VARCHAR(100), -- 'booked_appointment', 'sent_alert', 'detected_pattern'
    reasoning TEXT,
    data JSONB,
    status VARCHAR(50), -- 'pending_approval', 'executed', 'rejected'
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_health_events_user_date ON health_events(user_id, event_date DESC);
CREATE INDEX idx_symptoms_user_date ON symptoms(user_id, logged_at DESC);
CREATE INDEX idx_medications_user_active ON medications(user_id, active);
```

---

## 🔌 API Endpoints

### **Core Health Management**

```python
# FastAPI Routes

# 1. Daily Check-In
POST /api/v1/check-in
{
  "sleep_quality": 7,
  "pain_level": 3,
  "pain_location": "lower back",
  "medications_taken": ["ibuprofen"],
  "mood": "tired",
  "notes": "Slept poorly, back hurts after gym"
}

# 2. Get Health Insights
GET /api/v1/insights?timeframe=7d
Response:
{
  "patterns": [
    {
      "type": "recurring_symptom",
      "symptom": "headache",
      "frequency": "3 times in 7 days",
      "correlation": "Always on Monday mornings",
      "recommendation": "Consider stress/sleep patterns on Sundays"
    }
  ],
  "alerts": [
    {
      "severity": "medium",
      "message": "You've missed ibuprofen 2 days in a row",
      "action": "Adjust reminder time?"
    }
  ]
}

# 3. Medication Management
POST /api/v1/medications
{
  "name": "Lisinopril",
  "dosage": "10mg",
  "frequency": "once daily morning",
  "start_date": "2025-01-15"
}

GET /api/v1/medications/adherence
Response:
{
  "overall_rate": 0.87, // 87% adherence
  "by_medication": [
    {
      "name": "Lisinopril",
      "rate": 0.95,
      "missed_doses": 2,
      "optimal_time": "8:30 AM" // Learned from data
    }
  ]
}

# 4. Appointment Orchestration
POST /api/v1/appointments/request
{
  "reason": "recurring headaches",
  "urgency": "routine",
  "provider_preference": "Dr. Smith"
}

# Agent workflow triggers:
# 1. Verify insurance coverage
# 2. Find available slots
# 3. Rank by user preferences
# 4. Return top 3 options or auto-book if clear choice

Response:
{
  "status": "options_found",
  "recommendations": [
    {
      "provider": "Dr. Smith (PCP)",
      "date": "2025-11-22T10:00:00",
      "wait_time": "4 days",
      "in_network": true,
      "estimated_cost": "$20 copay",
      "score": 0.95
    }
  ],
  "prep_questions": [
    "When did headaches start?",
    "How often do they occur?",
    "What makes them better/worse?"
  ]
}

# 5. Symptom Logging
POST /api/v1/symptoms
{
  "type": "headache",
  "severity": 7,
  "location": "temples",
  "duration_hours": 4,
  "notes": "throbbing pain, sensitive to light"
}

# Agent analyzes and responds:
Response:
{
  "logged": true,
  "pattern_detected": {
    "type": "migraine_cluster",
    "occurrences": 3,
    "timeframe": "last 10 days",
    "recommendation": "Schedule appointment with neurologist",
    "action": "Would you like me to book an appointment?"
  }
}

# 6. Insurance Navigation
GET /api/v1/insurance/coverage?procedure=MRI&provider=RadiologyGroup
Response:
{
  "covered": true,
  "in_network": true,
  "estimated_cost": {
    "insurance_pays": "$850",
    "your_responsibility": "$150 (deductible)"
  },
  "pre_authorization_required": true,
  "authorization_status": "pending"
}
```

---

## 🤖 Agent Implementation

### **Core Agent Class**

```python
# healthhub/agents/health_agent.py

from langgraph.graph import StateGraph, END
from langchain_anthropic import ChatAnthropic
from typing import TypedDict, List, Annotated
import operator

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
    def __init__(self):
        self.llm = ChatAnthropic(model="claude-3-5-sonnet-20241022")
        self.graph = self._build_graph()

    def _build_graph(self) -> StateGraph:
        """Construct the agentic workflow"""
        workflow = StateGraph(HealthHubState)

        # Add nodes
        workflow.add_node("gather_context", self.gather_health_context)
        workflow.add_node("analyze_symptoms", self.analyze_symptom_patterns)
        workflow.add_node("check_medications", self.check_medication_adherence)
        workflow.add_node("detect_patterns", self.detect_health_patterns)
        workflow.add_node("generate_recommendations", self.generate_recommendations)
        workflow.add_node("execute_actions", self.execute_actions)

        # Define edges
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
        """Pull recent health data for analysis"""
        user_id = state["user_id"]

        # Query database for context
        recent_symptoms = await db.get_symptoms(user_id, days=30)
        medications = await db.get_active_medications(user_id)
        recent_checkins = await db.get_checkins(user_id, days=7)

        return {
            "health_context": {
                "recent_symptoms": recent_symptoms,
                "medications": medications,
                "checkins": recent_checkins
            }
        }

    async def analyze_symptom_patterns(self, state: HealthHubState) -> dict:
        """Use LLM to detect symptom patterns"""
        symptoms = state["health_context"]["recent_symptoms"]

        prompt = f"""Analyze the following symptom history for patterns:

{json.dumps(symptoms, indent=2)}

Look for:
1. Recurring symptoms (same symptom multiple times)
2. Temporal patterns (time of day, day of week)
3. Correlations (symptoms that appear together)
4. Escalating severity
5. New symptoms that require attention

Return JSON with detected patterns and severity assessment."""

        response = await self.llm.ainvoke(prompt)
        patterns = json.loads(response.content)

        return {"patterns": patterns}

    async def detect_health_patterns(self, state: HealthHubState) -> dict:
        """Cross-reference symptoms, meds, behaviors"""

        # Combine all data sources
        context = {
            "symptoms": state.get("symptoms", []),
            "medications": state.get("medications", []),
            "patterns": state.get("patterns", []),
            "health_context": state.get("health_context", {})
        }

        prompt = f"""You are a health analysis agent. Given this comprehensive health data:

{json.dumps(context, indent=2)}

Identify:
1. Concerning patterns requiring medical attention
2. Medication adherence issues
3. Lifestyle correlations (sleep, stress, exercise)
4. Opportunities for preventive care

For each finding, assess:
- Severity (low/medium/high/critical)
- Confidence (how certain are you?)
- Recommended action
- Urgency (routine/soon/urgent/emergency)

Return structured JSON."""

        response = await self.llm.ainvoke(prompt)
        analysis = json.loads(response.content)

        return {"recommendations": analysis["findings"]}

    async def generate_recommendations(self, state: HealthHubState) -> dict:
        """Convert patterns into actionable recommendations"""

        recommendations = []

        for pattern in state.get("patterns", []):
            if pattern["severity"] in ["high", "critical"]:
                recommendations.append({
                    "type": "schedule_appointment",
                    "reason": pattern["description"],
                    "urgency": pattern["urgency"],
                    "provider_type": pattern.get("recommended_specialist", "primary_care")
                })
            elif pattern["type"] == "medication_adherence":
                recommendations.append({
                    "type": "adjust_reminder",
                    "medication": pattern["medication"],
                    "current_time": pattern["current_reminder"],
                    "suggested_time": pattern["optimal_time"]
                })

        return {"recommendations": recommendations}

    def should_execute_actions(self, state: HealthHubState) -> str:
        """Decide if actions should auto-execute or require approval"""

        recommendations = state.get("recommendations", [])

        # Auto-execute low-risk actions
        auto_execute_types = ["adjust_reminder", "send_alert"]

        has_auto_executable = any(
            r["type"] in auto_execute_types for r in recommendations
        )

        return "execute" if has_auto_executable else "end"

    async def execute_actions(self, state: HealthHubState) -> dict:
        """Execute approved actions"""

        executed = []

        for rec in state.get("recommendations", []):
            if rec["type"] == "schedule_appointment":
                result = await self.appointment_orchestrator.book(rec)
                executed.append(result)
            elif rec["type"] == "adjust_reminder":
                result = await self.medication_manager.update_reminder(rec)
                executed.append(result)
            elif rec["type"] == "send_alert":
                result = await self.notification_service.send(rec)
                executed.append(result)

        return {"messages": [{"role": "system", "content": f"Executed {len(executed)} actions"}]}
```

### **Medication Adherence Agent**

```python
# healthhub/agents/medication_agent.py

class MedicationAgent:
    """Manages medication tracking and adherence optimization"""

    async def optimize_reminder_times(self, user_id: str, medication_id: str):
        """Learn optimal reminder times from adherence data"""

        # Get historical logs
        logs = await db.get_medication_logs(medication_id, days=30)

        # Analyze when user actually takes medication
        taken_times = [log.taken_time for log in logs if log.taken]

        # Find cluster of times
        optimal_time = self._find_time_cluster(taken_times)

        # Update reminder
        await db.update_medication_reminder(medication_id, optimal_time)

        return {
            "medication_id": medication_id,
            "old_time": logs[0].scheduled_time,
            "new_time": optimal_time,
            "reason": "Optimized based on your actual intake patterns"
        }

    async def detect_missed_doses(self, user_id: str):
        """Proactively identify adherence issues"""

        medications = await db.get_active_medications(user_id)

        alerts = []
        for med in medications:
            logs = await db.get_recent_logs(med.id, days=7)

            missed = [log for log in logs if not log.taken]

            if len(missed) >= 2:
                alerts.append({
                    "medication": med.name,
                    "missed_count": len(missed),
                    "action": "reminder_time_adjustment",
                    "message": f"You've missed {med.name} {len(missed)} times this week. Want to adjust the reminder time?"
                })

        return alerts

    async def check_interactions(self, new_medication: str, user_id: str):
        """Check for drug interactions"""

        current_meds = await db.get_active_medications(user_id)

        # Use FDA API for interaction data
        interactions = await fda_api.check_interactions(
            new_medication,
            [med.name for med in current_meds]
        )

        return {
            "safe": len(interactions) == 0,
            "interactions": interactions,
            "recommendation": "Consult your doctor" if interactions else "No known interactions"
        }
```

### **Appointment Orchestrator**

```python
# healthhub/agents/appointment_agent.py

class AppointmentOrchestrator:
    """Multi-step appointment booking agent"""

    async def book_appointment(self, request: AppointmentRequest):
        """Autonomous appointment booking workflow"""

        # Step 1: Determine provider type
        provider_type = await self._determine_provider_type(request.reason)

        # Step 2: Verify insurance coverage
        coverage = await self._verify_insurance(provider_type)

        if not coverage["in_network"]:
            # Find alternative in-network providers
            providers = await self._find_in_network_providers(provider_type)
        else:
            providers = await self._get_preferred_providers(request.user_id)

        # Step 3: Find availability
        availability = await self._check_availability(providers, request.urgency)

        # Step 4: Rank options
        ranked = await self._rank_options(availability, request.preferences)

        # Step 5: Prepare visit materials
        prep = await self._prepare_visit_materials(request.reason, request.user_id)

        return {
            "top_options": ranked[:3],
            "prep_questions": prep["questions"],
            "symptom_summary": prep["summary"],
            "action": "review_and_confirm"
        }

    async def _determine_provider_type(self, reason: str) -> str:
        """Use LLM to categorize medical need"""

        prompt = f"""Given this patient's reason for seeking care:
"{reason}"

Determine the appropriate provider type:
- primary_care: General checkup, common illness, non-specialist needs
- dermatology: Skin issues
- cardiology: Heart-related
- neurology: Headaches, neurological symptoms
- orthopedics: Bone, joint, muscle issues
- mental_health: Therapy, psychiatry
- urgent_care: Needs same-day attention but not emergency
- emergency: Life-threatening

Return just the provider type."""

        response = await self.llm.ainvoke(prompt)
        return response.content.strip()

    async def _prepare_visit_materials(self, reason: str, user_id: str):
        """Generate questions and symptom summary for doctor"""

        # Get relevant health history
        symptoms = await db.get_symptoms_related_to(user_id, reason)
        medications = await db.get_active_medications(user_id)

        prompt = f"""You're preparing a patient for a doctor's visit.

Reason for visit: {reason}

Recent symptoms: {json.dumps(symptoms)}
Current medications: {json.dumps(medications)}

Generate:
1. A concise symptom summary (2-3 sentences) the patient can share with their doctor
2. 5-7 questions the patient should ask during the visit
3. Important context the doctor should know

Format as JSON."""

        response = await self.llm.ainvoke(prompt)
        return json.loads(response.content)
```

---

## 🎨 Frontend Implementation

### **Dashboard Component**

```typescript
// healthhub-frontend/app/dashboard/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { SymptomTracker } from '@/components/SymptomTracker';
import { MedicationCard } from '@/components/MedicationCard';
import { HealthInsights } from '@/components/HealthInsights';
import { AppointmentList } from '@/components/AppointmentList';

export default function Dashboard() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInsights() {
      const res = await fetch('/api/v1/insights?timeframe=7d');
      const data = await res.json();
      setInsights(data);
      setLoading(false);
    }
    fetchInsights();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Health Dashboard</h1>

      {/* Daily Check-In */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <DailyCheckIn />
        <QuickActions />
      </div>

      {/* AI Insights */}
      {insights && (
        <HealthInsights
          patterns={insights.patterns}
          alerts={insights.alerts}
        />
      )}

      {/* Medications */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Medications</h2>
        <MedicationList />
      </div>

      {/* Upcoming Appointments */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Appointments</h2>
        <AppointmentList />
      </div>
    </div>
  );
}
```

### **Symptom Tracker Component**

```typescript
// healthhub-frontend/components/SymptomTracker.tsx

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';

export function SymptomTracker() {
  const [symptom, setSymptom] = useState({
    type: '',
    severity: 5,
    location: '',
    description: ''
  });

  const handleSubmit = async () => {
    const res = await fetch('/api/v1/symptoms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(symptom)
    });

    const result = await res.json();

    // Show agent's analysis
    if (result.pattern_detected) {
      showAlert({
        title: 'Pattern Detected',
        message: result.pattern_detected.recommendation,
        action: result.pattern_detected.action
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Log Symptom</h3>

      <div className="space-y-4">
        <select
          value={symptom.type}
          onChange={(e) => setSymptom({...symptom, type: e.target.value})}
          className="w-full p-2 border rounded"
        >
          <option value="">Select symptom type</option>
          <option value="headache">Headache</option>
          <option value="pain">Pain</option>
          <option value="fatigue">Fatigue</option>
          <option value="nausea">Nausea</option>
          <option value="other">Other</option>
        </select>

        <div>
          <label className="block mb-2">Severity: {symptom.severity}/10</label>
          <Slider
            value={[symptom.severity]}
            onValueChange={(val) => setSymptom({...symptom, severity: val[0]})}
            min={1}
            max={10}
          />
        </div>

        <input
          type="text"
          placeholder="Location (e.g., lower back)"
          value={symptom.location}
          onChange={(e) => setSymptom({...symptom, location: e.target.value})}
          className="w-full p-2 border rounded"
        />

        <Textarea
          placeholder="Additional details..."
          value={symptom.description}
          onChange={(e) => setSymptom({...symptom, description: e.target.value})}
        />

        <Button onClick={handleSubmit} className="w-full">
          Log Symptom
        </Button>
      </div>
    </div>
  );
}
```

---

## 🚀 Deployment Guide

### **Docker Compose Setup**

```yaml
# docker-compose.yml

version: '3.8'

services:
  # Backend API
  backend:
    build: ./healthhub-backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/healthhub
      - REDIS_URL=redis://redis:6379
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - TWILIO_ACCOUNT_SID=${TWILIO_ACCOUNT_SID}
      - TWILIO_AUTH_TOKEN=${TWILIO_AUTH_TOKEN}
    depends_on:
      - db
      - redis
    volumes:
      - ./healthhub-backend:/app

  # PostgreSQL Database
  db:
    image: pgvector/pgvector:pg15
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=healthhub
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  # Redis (for caching and task queue)
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  # Celery Worker (scheduled tasks)
  celery:
    build: ./healthhub-backend
    command: celery -A healthhub.celery worker --loglevel=info
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/healthhub
      - REDIS_URL=redis://redis:6379
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
    depends_on:
      - db
      - redis

  # Celery Beat (scheduler)
  celery-beat:
    build: ./healthhub-backend
    command: celery -A healthhub.celery beat --loglevel=info
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/healthhub
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis

volumes:
  postgres_data:
```

### **Environment Variables**

```bash
# .env

# API Keys
ANTHROPIC_API_KEY=sk-ant-...
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
SENDGRID_API_KEY=SG...

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/healthhub

# Redis
REDIS_URL=redis://localhost:6379

# FHIR API (if using specific EHR)
FHIR_BASE_URL=https://fhir.epic.com/interconnect-fhir-oauth
FHIR_CLIENT_ID=...
FHIR_CLIENT_SECRET=...

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
```

---

## 📈 Success Metrics

### **Technical Metrics**
- Agent workflow success rate (> 95%)
- API response time (< 500ms p95)
- Pattern detection accuracy (> 85%)
- Medication adherence improvement (> 20%)

### **User Impact Metrics**
- Days to appointment booking (reduce by 50%)
- Missed medication doses (reduce by 30%)
- Health pattern insights generated per user per month
- User satisfaction with recommendations (> 4.5/5)

### **Business Metrics**
- Monthly active users
- Feature engagement rate
- Cost per user (< $5/month)
- User retention (> 70% at 3 months)

---

## 🎯 Portfolio Impact

**Why This Project Stands Out**:

1. **Real-world utility**: Solves a universal pain point (healthcare is complex)
2. **True agency**: Multi-step workflows, planning, reflection, tool use
3. **Privacy-conscious**: Handles sensitive health data responsibly
4. **Technical breadth**: LLMs, graph DBs, APIs, scheduling, real-time alerts
5. **Scalable architecture**: Production-ready design patterns

**Interview Talking Points**:
- "Built an AI health agent that reduced my time managing appointments by 80%"
- "Implemented agentic workflows with LangGraph for multi-step healthcare planning"
- "Designed HIPAA-conscious architecture with local-first data processing"
- "Created pattern detection that identified a recurring symptom my doctor missed"

---

## 🔄 Future Enhancements

1. **Voice interface**: "Hey HealthHub, log that I have a headache"
2. **Wearable integration**: Apple Health, Fitbit for automatic data collection
3. **Telemedicine integration**: Book virtual visits, share records
4. **Family management**: Manage health for dependents
5. **Predictive modeling**: "You're likely to get a cold based on patterns"
6. **Clinical trial matching**: Suggest relevant research studies

---

## 📚 References

- **FHIR API**: https://www.hl7.org/fhir/
- **RxNorm**: https://www.nlm.nih.gov/research/umls/rxnorm/
- **OpenFDA**: https://open.fda.gov/
- **LangGraph**: https://python.langchain.com/docs/langgraph
- **HIPAA Compliance**: https://www.hhs.gov/hipaa/index.html

---

**Build Time**: 3-4 weeks
**Estimated Cost**: $10-15/month (Anthropic API, Twilio, hosting)
**Difficulty**: ⭐⭐⭐⭐ (Advanced - healthcare domain complexity)
**Novelty**: ⭐⭐⭐⭐⭐ (Highly differentiated)

