# HomeKeeper - Home Maintenance Agent
## Complete Technical Specification

---

## 📋 Project Overview

**Tagline**: *"Your home's memory - it remembers so you don't have to"*

**The Problem**: Home maintenance is overwhelming - HVAC filters, appliance warranties, seasonal tasks, repairs, and utility monitoring all require remembering when things were last done and when they're due next. Most homeowners only think about maintenance when something breaks.

**The Solution**: An agentic AI system that autonomously tracks every aspect of home maintenance, proactively schedules service, detects anomalies in utility usage, and acts as your home's institutional memory.

**One-Liner Pitch**: *"I built an AI that manages my entire home - it caught a water leak from my spiking water bill before I noticed, tracks all my warranties, and auto-schedules HVAC service."*

---

## 🎯 Core Agentic Capabilities

### 1. **Planning & Reasoning**
- Multi-year maintenance scheduling (HVAC every 6 months, roof every 15 years)
- Seasonal task sequencing ("clean gutters before rainy season")
- Cost optimization (bundle service calls to save money)
- Emergency prioritization (leak detection → immediate action)

### 2. **Tool Use & Integration**
- **Email Parsing**: Extracts receipts, warranties, service records
- **Calendar**: Schedules maintenance, reminders
- **Service Platforms**: Thumbtack, Angi for contractor booking
- **Utility APIs**: Water, electric, gas usage monitoring
- **Smart Home**: Connects to thermostats, leak sensors, security cameras

### 3. **Memory & Learning**
- Complete home history (every repair, upgrade, maintenance task)
- Warranty vault (knows every appliance's coverage status)
- Service provider quality tracking (which plumber was best?)
- Seasonal patterns (AC issues always spike in July)

### 4. **Reflection & Adaptation**
- Anomaly detection in utility bills (40% spike = potential leak)
- Maintenance effectiveness (did cleaning AC coils improve efficiency?)
- Cost trend analysis (HVAC repairs increasing, time to replace?)

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   HomeKeeper Agent Core                      │
│                    (LangGraph Workflow)                      │
└───────────────────┬─────────────────────────────────────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
        ▼           ▼           ▼
┌──────────┐  ┌──────────┐  ┌──────────┐
│Maintenance│  │ Warranty │  │ Anomaly  │
│ Scheduler │  │  Vault   │  │ Detector │
└──────────┘  └──────────┘  └──────────┘
        │           │           │
        └───────────┼───────────┘
                    ▼
        ┌───────────────────────┐
        │    Home Knowledge     │
        │       Graph DB        │
        │  (PostgreSQL + JSON)  │
        └───────────────────────┘
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
┌──────────┐  ┌──────────┐  ┌──────────┐
│  Gmail   │  │ Utility  │  │ Service  │
│   API    │  │   APIs   │  │  APIs    │
└──────────┘  └──────────┘  └──────────┘
```

---

## 💻 Technical Stack

### **Backend**
- **Language**: Python 3.11+
- **Agent Framework**: LangGraph (agentic workflows)
- **LLM**: Anthropic Claude 3.5 Sonnet (document parsing, reasoning)
- **API Framework**: FastAPI
- **Database**: PostgreSQL 15 (maintenance history, warranties)
- **Cache**: Redis (scheduled tasks)
- **Task Scheduler**: Celery Beat (daily checks, reminders)
- **OCR**: pytesseract + GPT-4V (receipt/warranty scanning)

### **Frontend**
- **Framework**: Next.js 14
- **UI**: shadcn/ui + Tailwind CSS
- **Charts**: Recharts (utility usage trends)
- **File Upload**: React Dropzone (warranty docs)
- **Calendar**: FullCalendar (maintenance timeline)

### **Integrations**
- **Email**: Gmail API (receipt/warranty extraction)
- **Utilities**:
  - Utility API (multi-provider utility tracking)
  - OPower (smart meter data)
- **Service Platforms**:
  - Thumbtack API (contractor search/booking)
  - Angi (reviews, estimates)
- **Smart Home**:
  - Home Assistant (IoT devices)
  - Nest API (thermostat data)
  - Ring API (security cameras)
- **Weather**: OpenWeatherMap (seasonal planning)
- **Notifications**: Twilio (SMS), Pushover (push notifications)

### **Deployment**
- **Container**: Docker + Docker Compose
- **Hosting**: Railway (backend), Vercel (frontend)
- **Storage**: AWS S3 (warranty docs, photos)
- **Monitoring**: Sentry, Posthog

---

## 🔄 Agentic Workflow Design

### **Maintenance Scheduler Agent**

```python
# LangGraph State
class MaintenanceState(TypedDict):
    home_id: str
    current_date: datetime
    upcoming_tasks: List[MaintenanceTask]
    overdue_tasks: List[MaintenanceTask]
    seasonal_recommendations: List[str]
    actions: List[Action]

# Workflow Nodes
1. gather_home_data() → Pull appliances, systems, last service dates
2. calculate_due_dates() → Apply maintenance schedules
3. check_seasonal_needs() → "Fall = gutter cleaning, furnace check"
4. prioritize_tasks() → Urgency, cost, dependencies
5. find_service_providers() → Search Thumbtack, check past quality
6. schedule_or_recommend() → Auto-book or suggest to user
7. send_reminders() → Notifications at optimal times

# Agent Decision Points
- "HVAC last serviced 11 months ago?" → Schedule within 30 days
- "First freeze predicted next week?" → Suggest winterization tasks
- "AC repair costs > 50% of new unit?" → Recommend replacement
```

### **Warranty Vault Agent**

```python
# LangGraph Workflow
class WarrantyState(TypedDict):
    documents: List[Document]
    appliances: List[Appliance]
    warranties: List[Warranty]
    expiring_soon: List[Warranty]
    claims: List[Claim]

# Graph Flow
1. scan_documents() → OCR + GPT-4V extract warranty details
2. parse_coverage() → Extract dates, terms, what's covered
3. match_to_appliances() → Link warranty to specific item
4. track_expirations() → Alert 30 days before expiry
5. file_claims() → Generate claim paperwork when needed

# Extraction Example
Email: "Your water heater warranty"
→ Agent extracts:
  - Product: AO Smith Water Heater
  - Model: XCV-50
  - Purchase Date: 2023-06-15
  - Warranty: 6 years parts, 1 year labor
  - Expires: 2029-06-15
  - Claim process: Call 1-800-XXX, reference invoice #12345
```

### **Anomaly Detection Agent**

```python
# Multi-Source Monitoring
class AnomalyState(TypedDict):
    utility_data: Dict[str, List[Reading]]  # water, electric, gas
    baselines: Dict[str, float]
    anomalies: List[Anomaly]
    root_causes: List[Hypothesis]
    recommendations: List[Action]

# Agent Steps
1. fetch_utility_data() → Pull latest usage data
2. calculate_baselines() → Historical averages, seasonal adjustments
3. detect_anomalies() → Statistical outliers, sudden spikes
4. hypothesize_causes() → LLM reasons about likely causes
5. cross_reference() → Check maintenance history, weather, occupancy
6. alert_and_recommend() → "Water bill up 40%, likely leak, schedule plumber"

# Example Detection
Water usage baseline: 4,000 gallons/month
Current month: 6,500 gallons (+62%)
Weather: Normal (no lawn watering explanation)
Occupancy: Same (no guests)
→ Agent conclusion: "Probable leak, check toilets and outdoor spigots"
→ Action: Send alert + auto-schedule plumber if user approves
```

---

## 📊 Database Schema

```sql
-- Homes
CREATE TABLE homes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    address TEXT,
    square_footage INTEGER,
    year_built INTEGER,
    type VARCHAR(50), -- 'single_family', 'condo', 'townhouse'
    created_at TIMESTAMP DEFAULT NOW()
);

-- Appliances & Systems
CREATE TABLE appliances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    home_id UUID REFERENCES homes(id),
    type VARCHAR(100), -- 'hvac', 'water_heater', 'refrigerator', 'roof'
    brand VARCHAR(100),
    model VARCHAR(100),
    serial_number VARCHAR(100),
    purchase_date DATE,
    install_date DATE,
    expected_lifespan_years INTEGER,
    location VARCHAR(100), -- 'basement', 'garage', 'kitchen'
    notes TEXT
);

-- Warranties
CREATE TABLE warranties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appliance_id UUID REFERENCES appliances(id),
    type VARCHAR(50), -- 'manufacturer', 'extended', 'homeowner'
    coverage_start DATE,
    coverage_end DATE,
    parts_covered BOOLEAN DEFAULT TRUE,
    labor_covered BOOLEAN DEFAULT FALSE,
    terms TEXT,
    claim_process TEXT,
    document_url TEXT, -- S3 link to scanned warranty
    created_at TIMESTAMP DEFAULT NOW()
);

-- Maintenance Tasks
CREATE TABLE maintenance_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    home_id UUID REFERENCES homes(id),
    appliance_id UUID REFERENCES appliances(id),
    task_type VARCHAR(100), -- 'hvac_service', 'gutter_cleaning', 'filter_change'
    frequency_days INTEGER, -- 180 for semi-annual
    last_completed DATE,
    next_due DATE,
    priority VARCHAR(20), -- 'low', 'medium', 'high', 'urgent'
    estimated_cost DECIMAL(10,2),
    notes TEXT
);

-- Maintenance History
CREATE TABLE maintenance_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES maintenance_tasks(id),
    completed_date DATE,
    provider_name VARCHAR(255),
    cost DECIMAL(10,2),
    description TEXT,
    quality_rating INTEGER CHECK (quality_rating BETWEEN 1 AND 5),
    receipt_url TEXT,
    notes TEXT
);

-- Service Providers
CREATE TABLE service_providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    type VARCHAR(100), -- 'hvac', 'plumbing', 'electrical', 'landscaping'
    phone VARCHAR(20),
    email VARCHAR(255),
    website TEXT,
    avg_rating DECIMAL(3,2),
    total_jobs INTEGER,
    avg_cost DECIMAL(10,2),
    notes TEXT
);

-- Utility Bills
CREATE TABLE utility_bills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    home_id UUID REFERENCES homes(id),
    utility_type VARCHAR(50), -- 'water', 'electric', 'gas', 'trash'
    billing_period_start DATE,
    billing_period_end DATE,
    usage_amount DECIMAL(10,2),
    usage_unit VARCHAR(20), -- 'kWh', 'gallons', 'therms'
    cost DECIMAL(10,2),
    document_url TEXT,
    imported_at TIMESTAMP DEFAULT NOW()
);

-- Anomaly Alerts
CREATE TABLE anomaly_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    home_id UUID REFERENCES homes(id),
    alert_type VARCHAR(50), -- 'utility_spike', 'missed_maintenance', 'warranty_expiring'
    severity VARCHAR(20), -- 'info', 'warning', 'critical'
    description TEXT,
    detected_at TIMESTAMP DEFAULT NOW(),
    resolved_at TIMESTAMP,
    recommended_action TEXT,
    agent_reasoning TEXT
);

-- Agent Actions
CREATE TABLE agent_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    home_id UUID REFERENCES homes(id),
    action_type VARCHAR(100), -- 'scheduled_service', 'sent_reminder', 'detected_anomaly'
    status VARCHAR(50), -- 'pending', 'approved', 'executed', 'rejected'
    data JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_appliances_home ON appliances(home_id);
CREATE INDEX idx_warranties_expiry ON warranties(coverage_end);
CREATE INDEX idx_maintenance_due ON maintenance_tasks(next_due);
CREATE INDEX idx_utility_bills_period ON utility_bills(billing_period_end DESC);
```

---

## 🔌 API Endpoints

```python
# FastAPI Routes

# 1. Home Dashboard
GET /api/v1/homes/{home_id}/dashboard
Response:
{
  "upcoming_maintenance": [
    {
      "task": "HVAC Service",
      "due_date": "2025-12-01",
      "days_until_due": 13,
      "priority": "medium",
      "estimated_cost": 150
    }
  ],
  "recent_alerts": [
    {
      "type": "utility_spike",
      "severity": "warning",
      "message": "Water usage up 40% this month",
      "action": "Check for leaks"
    }
  ],
  "warranties_expiring": [
    {
      "appliance": "Water Heater",
      "expires": "2025-12-15",
      "days_remaining": 27
    }
  ]
}

# 2. Add Appliance
POST /api/v1/appliances
{
  "type": "hvac",
  "brand": "Carrier",
  "model": "Infinity 20",
  "serial_number": "1234ABC",
  "install_date": "2020-05-15",
  "location": "basement"
}

# Agent automatically:
# 1. Looks up expected lifespan (HVAC = 15-20 years)
# 2. Creates maintenance schedule (service every 6 months)
# 3. Prompts for warranty information

# 3. Upload Warranty
POST /api/v1/warranties/upload
Content-Type: multipart/form-data
{
  "file": <warranty_pdf>,
  "appliance_id": "uuid"
}

# Agent workflow:
# 1. OCR the document
# 2. Extract: coverage dates, terms, claim process
# 3. Link to appliance
# 4. Schedule expiration reminder

Response:
{
  "warranty_id": "uuid",
  "extracted_data": {
    "coverage_start": "2020-05-15",
    "coverage_end": "2030-05-15",
    "parts_covered": true,
    "labor_covered": false,
    "claim_phone": "1-800-XXX-XXXX"
  }
}

# 4. Schedule Maintenance
POST /api/v1/maintenance/schedule
{
  "task_type": "hvac_service",
  "preferred_date": "2025-12-01",
  "budget_max": 200
}

# Agent orchestration:
# 1. Find service providers (in-network, good ratings)
# 2. Check availability
# 3. Get quotes
# 4. Rank options
# 5. Book or present options

Response:
{
  "status": "options_found",
  "providers": [
    {
      "name": "ABC Heating & Cooling",
      "rating": 4.8,
      "available": "2025-12-01 10:00 AM",
      "estimated_cost": 150,
      "distance_miles": 3.2,
      "recommendation_score": 0.95
    }
  ]
}

# 5. Utility Tracking
POST /api/v1/utilities/import
{
  "utility_type": "water",
  "billing_period_start": "2025-10-01",
  "billing_period_end": "2025-10-31",
  "usage_gallons": 6500,
  "cost": 78.50
}

# Agent analysis:
Response:
{
  "imported": true,
  "baseline": 4000,
  "variance": "+62%",
  "anomaly_detected": true,
  "alert": {
    "severity": "warning",
    "message": "Water usage 62% above baseline. Possible leak.",
    "recommendations": [
      "Check all faucets for drips",
      "Inspect toilet flappers",
      "Check outdoor spigots",
      "Schedule plumber inspection"
    ],
    "estimated_waste_cost": "$28/month if not fixed"
  }
}

# 6. Get Maintenance Calendar
GET /api/v1/maintenance/calendar?year=2025
Response:
{
  "months": {
    "2025-11": [
      {
        "task": "Clean gutters",
        "due_date": "2025-11-15",
        "seasonal": true,
        "reason": "Before rainy season"
      }
    ],
    "2025-12": [
      {
        "task": "HVAC service (heating system check)",
        "due_date": "2025-12-01",
        "recurring": true,
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

# 7. Smart Reminders
GET /api/v1/reminders/optimize
# Agent learns when you actually complete tasks
# Adjusts reminder times for better compliance

Response:
{
  "optimizations": [
    {
      "task": "Change AC filter",
      "current_reminder": "1st of month, 9 AM",
      "suggested_reminder": "Last Saturday of month, 10 AM",
      "reason": "You typically complete this task on weekends around 10 AM"
    }
  ]
}
```

---

## 🤖 Agent Implementation

### **Core HomeKeeper Agent**

```python
# homekeeper/agents/homekeeper_agent.py

from langgraph.graph import StateGraph, END
from langchain_anthropic import ChatAnthropic
from typing import TypedDict, List

class HomeKeeperState(TypedDict):
    home_id: str
    current_date: datetime
    appliances: List[dict]
    maintenance_due: List[dict]
    utility_data: List[dict]
    anomalies: List[dict]
    actions: List[dict]

class HomeKeeperAgent:
    def __init__(self):
        self.llm = ChatAnthropic(model="claude-3-5-sonnet-20241022")
        self.graph = self._build_graph()

    def _build_graph(self) -> StateGraph:
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

        # Query database
        tasks = await db.get_maintenance_tasks(home_id)

        due_soon = []
        overdue = []

        for task in tasks:
            days_until = (task.next_due - current_date).days

            if days_until < 0:
                overdue.append(task)
            elif days_until <= 30:
                due_soon.append(task)

        return {
            "maintenance_due": {
                "overdue": overdue,
                "due_soon": due_soon
            }
        }

    async def analyze_utility_usage(self, state: HomeKeeperState) -> dict:
        """Analyze utility bills for anomalies"""

        home_id = state["home_id"]

        # Get last 12 months of bills
        bills = await db.get_utility_bills(home_id, months=12)

        # Calculate baselines by utility type
        baselines = {}
        for utility_type in ['water', 'electric', 'gas']:
            usage = [b.usage_amount for b in bills if b.utility_type == utility_type]
            baselines[utility_type] = {
                "mean": np.mean(usage),
                "std": np.std(usage),
                "seasonal_avg": self._calculate_seasonal_avg(usage)
            }

        # Check current month against baseline
        current_bills = [b for b in bills if b.billing_period_end.month == datetime.now().month]

        return {
            "utility_data": {
                "baselines": baselines,
                "current": current_bills
            }
        }

    async def detect_anomalies(self, state: HomeKeeperState) -> dict:
        """Use LLM to reason about anomalies"""

        utility_data = state.get("utility_data", {})
        maintenance = state.get("maintenance_due", {})

        prompt = f"""You are a home maintenance AI agent. Analyze this data:

UTILITY USAGE:
{json.dumps(utility_data, indent=2)}

MAINTENANCE STATUS:
Overdue: {len(maintenance.get('overdue', []))} tasks
Due soon: {len(maintenance.get('due_soon', []))} tasks

Detect anomalies and potential issues:
1. Utility spikes (> 2 standard deviations from baseline)
2. Maintenance neglect (overdue tasks that could cause damage)
3. Correlations (e.g., overdue HVAC + high electric bill)

For each anomaly, provide:
- Severity (low/medium/high/critical)
- Likely cause
- Recommended action
- Urgency (days until action needed)
- Estimated cost of inaction

Return structured JSON."""

        response = await self.llm.ainvoke(prompt)
        anomalies = json.loads(response.content)

        return {"anomalies": anomalies}

    async def generate_recommendations(self, state: HomeKeeperState) -> dict:
        """Generate actionable recommendations"""

        recommendations = []

        # Overdue maintenance
        for task in state.get("maintenance_due", {}).get("overdue", []):
            recommendations.append({
                "type": "schedule_maintenance",
                "task": task.task_type,
                "urgency": "high",
                "reason": f"Overdue by {(datetime.now() - task.next_due).days} days",
                "auto_schedule": False  # User approval needed
            })

        # Anomalies
        for anomaly in state.get("anomalies", []):
            if anomaly["severity"] in ["high", "critical"]:
                recommendations.append({
                    "type": "investigate_anomaly",
                    "description": anomaly["description"],
                    "action": anomaly["recommended_action"],
                    "urgency": anomaly["urgency"]
                })

        # Warranties expiring
        warranties = state.get("warranties_expiring", [])
        for warranty in warranties:
            if warranty["days_remaining"] <= 30:
                recommendations.append({
                    "type": "use_warranty",
                    "appliance": warranty["appliance"],
                    "expires": warranty["expires"],
                    "action": "Schedule service while still under warranty"
                })

        return {"actions": recommendations}

    def should_auto_schedule(self, state: HomeKeeperState) -> str:
        """Decide if services should be auto-scheduled"""

        actions = state.get("actions", [])

        # Auto-schedule only routine maintenance within budget
        auto_schedulable = [
            a for a in actions
            if a["type"] == "schedule_maintenance"
            and a["urgency"] == "medium"
            and a.get("estimated_cost", 0) < 200
        ]

        return "schedule" if auto_schedulable else "end"
```

### **Warranty Extraction Agent**

```python
# homekeeper/agents/warranty_agent.py

class WarrantyExtractionAgent:
    """Extracts warranty information from documents"""

    async def process_warranty_document(self, file_path: str, appliance_id: str):
        """OCR + GPT-4V extraction"""

        # Read document (PDF or image)
        if file_path.endswith('.pdf'):
            images = convert_from_path(file_path)
            image = images[0]  # First page
        else:
            image = Image.open(file_path)

        # Use GPT-4V for extraction
        prompt = """Extract warranty information from this document:

Required fields:
- Product name
- Model number
- Serial number (if present)
- Purchase/activation date
- Coverage start date
- Coverage end date
- What's covered (parts, labor, specific components)
- What's NOT covered (exclusions)
- Claim process (phone, website, required documents)
- Transferable? (if sold/moved)

Return structured JSON."""

        # Call GPT-4V with image
        response = await openai.ChatCompletion.create(
            model="gpt-4-vision-preview",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {"type": "image_url", "image_url": self._encode_image(image)}
                    ]
                }
            ]
        )

        extracted = json.loads(response.choices[0].message.content)

        # Store in database
        warranty = await db.create_warranty(
            appliance_id=appliance_id,
            **extracted
        )

        # Upload original document to S3
        document_url = await s3.upload_file(file_path, f"warranties/{warranty.id}")

        await db.update_warranty(warranty.id, document_url=document_url)

        return warranty
```

### **Anomaly Detection Agent**

```python
# homekeeper/agents/anomaly_agent.py

class AnomalyDetectionAgent:
    """Detects unusual patterns in utility usage"""

    async def analyze_water_usage(self, home_id: str):
        """Specialized water leak detection"""

        # Get recent bills
        bills = await db.get_utility_bills(home_id, utility_type='water', months=12)

        # Calculate baseline (median of last 6 months, excluding current)
        baseline = np.median([b.usage_amount for b in bills[1:7]])

        # Current month usage
        current = bills[0].usage_amount

        # Calculate z-score
        std = np.std([b.usage_amount for b in bills[1:]])
        z_score = (current - baseline) / std

        if z_score > 2:  # 2 standard deviations
            # Potential leak - investigate further
            percent_increase = ((current - baseline) / baseline) * 100

            # Check for correlations
            weather = await weather_api.get_historical(bills[0].billing_period_start)
            hot_days = sum(1 for day in weather if day.temp_max > 85)

            # LLM reasoning
            prompt = f"""Analyze this water usage anomaly:

Baseline: {baseline} gallons/month
Current: {current} gallons/month
Increase: {percent_increase:.1f}%
Z-score: {z_score:.2f}

Weather context: {hot_days} days above 85°F (lawn watering possible)
Historical pattern: {[b.usage_amount for b in bills]}

Is this likely:
1. A leak (toilet, pipe, outdoor spigot)
2. Increased lawn watering
3. More occupants/guests
4. Appliance issue (water heater, dishwasher)

Provide:
- Most likely cause (with confidence %)
- Diagnostic steps
- Urgency (days until action needed)
- Estimated cost of inaction per month
"""

            analysis = await self.llm.ainvoke(prompt)

            # Create alert
            await db.create_alert(
                home_id=home_id,
                alert_type='utility_spike',
                severity='warning' if z_score < 3 else 'critical',
                description=f"Water usage up {percent_increase:.0f}%",
                recommended_action=analysis["diagnostic_steps"],
                agent_reasoning=analysis
            )

            return analysis

        return {"status": "normal"}
```

---

## 🎨 Frontend Implementation

```typescript
// homekeeper-frontend/app/dashboard/page.tsx

export default function Dashboard() {
  const [alerts, setAlerts] = useState([]);
  const [maintenanceDue, setMaintenanceDue] = useState([]);

  useEffect(() => {
    async function fetchDashboard() {
      const res = await fetch('/api/v1/homes/{home_id}/dashboard');
      const data = await res.json();
      setAlerts(data.recent_alerts);
      setMaintenanceDue(data.upcoming_maintenance);
    }
    fetchDashboard();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Home Dashboard</h1>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">⚠️ Alerts</h2>
          {alerts.map(alert => (
            <Alert key={alert.id} severity={alert.severity}>
              <AlertTitle>{alert.message}</AlertTitle>
              <AlertDescription>{alert.action}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Maintenance Calendar */}
      <MaintenanceCalendar tasks={maintenanceDue} />

      {/* Utility Usage Trends */}
      <UtilityChart />

      {/* Warranty Vault */}
      <WarrantyVault />
    </div>
  );
}
```

---

## 🚀 Deployment

```yaml
# docker-compose.yml

version: '3.8'

services:
  backend:
    build: ./homekeeper-backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/homekeeper
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
      - AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=homekeeper
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  celery:
    build: ./homekeeper-backend
    command: celery -A homekeeper.celery worker --loglevel=info
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/homekeeper
    depends_on:
      - db
      - redis

  celery-beat:
    build: ./homekeeper-backend
    command: celery -A homekeeper.celery beat --loglevel=info
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/homekeeper
    depends_on:
      - db
      - redis

  redis:
    image: redis:7-alpine

volumes:
  postgres_data:
```

---

## 📈 Success Metrics

**Technical**:
- Warranty extraction accuracy (> 95%)
- Anomaly detection precision (< 10% false positives)
- Service scheduling success rate (> 90%)

**User Impact**:
- Maintenance tasks completed on time (> 80%)
- Cost savings from early anomaly detection
- Time saved per month (target: 2+ hours)

---

## 🎯 Portfolio Value

**Why This Stands Out**:
1. **Universal problem**: Every homeowner needs this
2. **Real cost savings**: Catches leaks, prevents damage
3. **Long-term planning**: Multi-year maintenance scheduling
4. **Multi-modal AI**: Document OCR, time-series analysis, reasoning
5. **Proactive intelligence**: Prevents problems before they happen

**Interview Hook**: *"My AI caught a water leak from bill analysis, saving me $300+ in water costs and potential damage"*

---

**Build Time**: 2-3 weeks
**Cost**: <$10/month
**Difficulty**: ⭐⭐⭐ (Moderate)
**Novelty**: ⭐⭐⭐⭐ (Highly differentiated)
