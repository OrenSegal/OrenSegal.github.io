# MedAudit AI - Medical Bill Auditor & Negotiator

## Executive Summary

**MedAudit AI** is an autonomous agent that audits medical bills for errors, identifies overcharges, and generates appeal letters with evidence. Medical billing errors affect 80% of bills, with average overcharges of $1,300+. This agent turns a complex, intimidating process into automated savings.

---

## Value Proposition

### The Problem
- 80% of medical bills contain errors
- Average American can't interpret EOBs or CPT codes
- Appeal processes are confusing and time-consuming
- Hospitals count on patients not challenging bills
- Medical debt is #1 cause of bankruptcy in US

### The Solution
An AI agent that:
1. **Parses** bills and EOBs using OCR/document AI
2. **Audits** charges against fair pricing databases
3. **Identifies** common billing errors and upcoding
4. **Generates** professionally-written appeal letters
5. **Tracks** submissions and follows up autonomously

### Portfolio Impact
- Demonstrates real-world financial impact ($100s-$1000s saved per user)
- Shows complex document understanding
- Multi-step agentic workflow with human-in-the-loop
- Integration with external data sources
- High emotional resonance in interviews

---

## Technical Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    MedAudit AI Agent                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌──────────────┐    ┌───────────────┐  │
│  │  Document   │    │   Billing    │    │    Appeal     │  │
│  │  Ingestion  │───▶│   Analysis   │───▶│   Generator   │  │
│  │   Agent     │    │    Agent     │    │    Agent      │  │
│  └─────────────┘    └──────────────┘    └───────────────┘  │
│         │                  │                    │           │
│         ▼                  ▼                    ▼           │
│  ┌─────────────┐    ┌──────────────┐    ┌───────────────┐  │
│  │   OCR &     │    │   Pricing    │    │   Template    │  │
│  │  Extraction │    │  Databases   │    │    Engine     │  │
│  └─────────────┘    └──────────────┘    └───────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   User Review   │
                    │   & Approval    │
                    └─────────────────┘
```

### Agent Workflow

```python
# Simplified agent flow using LangGraph

from langgraph.graph import StateGraph, END

class BillAuditState(TypedDict):
    bill_image: bytes
    extracted_data: dict
    pricing_analysis: dict
    errors_found: list
    appeal_letter: str
    user_approved: bool

def document_ingestion(state: BillAuditState) -> BillAuditState:
    """Extract structured data from bill/EOB images"""
    # Use docTR or PaddleOCR for text extraction
    # Parse into structured format: provider, CPT codes, charges, dates
    pass

def pricing_analysis(state: BillAuditState) -> BillAuditState:
    """Compare charges against fair pricing databases"""
    # Query CMS pricing data
    # Compare against regional averages
    # Flag outliers (>150% of fair price)
    pass

def error_detection(state: BillAuditState) -> BillAuditState:
    """Identify common billing errors"""
    # Check for: duplicate charges, unbundling, upcoding
    # Verify services match diagnosis codes
    # Check for charges during inpatient stay
    pass

def appeal_generation(state: BillAuditState) -> BillAuditState:
    """Generate professional appeal letter"""
    # Use LLM to create personalized letter
    # Include specific evidence and regulations
    # Format for provider and insurance appeals
    pass

# Build the graph
workflow = StateGraph(BillAuditState)
workflow.add_node("ingest", document_ingestion)
workflow.add_node("analyze", pricing_analysis)
workflow.add_node("detect", error_detection)
workflow.add_node("generate", appeal_generation)

workflow.set_entry_point("ingest")
workflow.add_edge("ingest", "analyze")
workflow.add_edge("analyze", "detect")
workflow.add_edge("detect", "generate")
workflow.add_edge("generate", END)
```

---

## Tech Stack (100% Free/Affordable)

### Document Processing
| Component | Tool | Cost |
|-----------|------|------|
| OCR Engine | **docTR** (Apache 2.0) | Free |
| PDF Parsing | **PyMuPDF** | Free |
| Image Processing | **Pillow** | Free |
| Alternative OCR | **PaddleOCR** | Free |

### AI/LLM Layer
| Component | Tool | Cost |
|-----------|------|------|
| Agent Framework | **LangGraph** | Free |
| Primary LLM | **Ollama + Llama 3.1 8B** | Free (local) |
| Cloud LLM (optional) | **Groq API** | Free tier: 30 req/min |
| Embeddings | **all-MiniLM-L6-v2** | Free |

### Data Sources (All Free)
| Source | Data | Access |
|--------|------|--------|
| **CMS Physician Fee Schedule** | Medicare pricing by CPT code | Public download |
| **FAIR Health** | Consumer cost estimates | Free lookup tool |
| **Healthcare Bluebook** | Fair price ranges | Free consumer access |
| **CMS HCPCS** | Procedure code definitions | Public download |

### Backend & Storage
| Component | Tool | Cost |
|-----------|------|------|
| Backend | **FastAPI** | Free |
| Database | **SQLite** | Free |
| Vector Store | **ChromaDB** | Free |
| Task Queue | **Celery + Redis** | Free |

### Frontend
| Component | Tool | Cost |
|-----------|------|------|
| Framework | **React** | Free |
| UI Components | **shadcn/ui** | Free |
| File Upload | **react-dropzone** | Free |
| Charts | **Recharts** | Free |

---

## Core Features & Implementation

### 1. Document Ingestion & Parsing

```python
import doctr
from doctr.io import DocumentFile
from doctr.models import ocr_predictor

class BillParser:
    def __init__(self):
        self.ocr_model = ocr_predictor(pretrained=True)

    def extract_from_image(self, image_path: str) -> dict:
        """Extract structured data from medical bill image"""
        doc = DocumentFile.from_images(image_path)
        result = self.ocr_model(doc)

        # Extract text blocks
        text_content = result.render()

        # Use LLM to structure the extracted text
        structured_data = self.structure_with_llm(text_content)

        return structured_data

    def structure_with_llm(self, raw_text: str) -> dict:
        """Use LLM to extract structured fields"""
        prompt = """
        Extract the following from this medical bill:
        - Provider name and address
        - Patient name and account number
        - Date of service
        - List of charges with:
          - CPT/HCPCS code
          - Description
          - Quantity
          - Charge amount
        - Insurance payments
        - Patient responsibility

        Return as JSON.

        Bill text:
        {raw_text}
        """
        # Call local Ollama or Groq API
        return llm_extract(prompt.format(raw_text=raw_text))
```

### 2. Pricing Analysis Engine

```python
import pandas as pd

class PricingAnalyzer:
    def __init__(self):
        # Load CMS fee schedule (downloaded from CMS.gov)
        self.cms_fees = pd.read_csv('data/cms_physician_fees.csv')
        self.regional_multipliers = self.load_geographic_adjustments()

    def analyze_charges(self, bill_data: dict, zip_code: str) -> dict:
        """Compare bill charges against fair pricing"""
        analysis = []

        for charge in bill_data['charges']:
            cpt_code = charge['cpt_code']
            billed_amount = charge['amount']

            # Get Medicare rate
            medicare_rate = self.get_medicare_rate(cpt_code, zip_code)

            # Calculate fair price range (typically 1.5-2x Medicare)
            fair_low = medicare_rate * 1.5
            fair_high = medicare_rate * 2.5

            # Determine if overcharged
            status = 'fair'
            if billed_amount > fair_high:
                status = 'overcharged'
                potential_savings = billed_amount - fair_high
            elif billed_amount < fair_low:
                status = 'undercharged'  # Rare but possible
                potential_savings = 0
            else:
                potential_savings = 0

            analysis.append({
                'cpt_code': cpt_code,
                'description': charge['description'],
                'billed': billed_amount,
                'medicare_rate': medicare_rate,
                'fair_range': f'${fair_low:.2f} - ${fair_high:.2f}',
                'status': status,
                'potential_savings': potential_savings
            })

        return {
            'line_items': analysis,
            'total_potential_savings': sum(item['potential_savings'] for item in analysis)
        }

    def get_medicare_rate(self, cpt_code: str, zip_code: str) -> float:
        """Look up Medicare rate with geographic adjustment"""
        base_rate = self.cms_fees[
            self.cms_fees['cpt_code'] == cpt_code
        ]['national_rate'].values[0]

        # Apply geographic adjustment
        locality = self.get_locality(zip_code)
        gpci = self.regional_multipliers[locality]

        return base_rate * gpci
```

### 3. Error Detection System

```python
class BillingErrorDetector:
    """Detect common medical billing errors"""

    ERROR_PATTERNS = {
        'duplicate_charge': 'Same CPT code billed multiple times for single service',
        'unbundling': 'Services that should be billed together are separated',
        'upcoding': 'Higher-cost code used instead of appropriate code',
        'phantom_charge': 'Charge for service not rendered',
        'incorrect_quantity': 'Wrong number of units billed',
        'balance_billing': 'Billing patient for in-network negotiated amounts',
    }

    def detect_errors(self, bill_data: dict, eob_data: dict = None) -> list:
        """Run all error detection checks"""
        errors = []

        # Check for duplicates
        errors.extend(self.check_duplicates(bill_data))

        # Check for unbundling
        errors.extend(self.check_unbundling(bill_data))

        # Check for upcoding patterns
        errors.extend(self.check_upcoding(bill_data))

        # If EOB provided, cross-reference
        if eob_data:
            errors.extend(self.cross_reference_eob(bill_data, eob_data))

        return errors

    def check_duplicates(self, bill_data: dict) -> list:
        """Find duplicate charges for same date/service"""
        errors = []
        seen = {}

        for charge in bill_data['charges']:
            key = (charge['date'], charge['cpt_code'])
            if key in seen:
                errors.append({
                    'type': 'duplicate_charge',
                    'severity': 'high',
                    'description': f"Duplicate charge for {charge['cpt_code']} on {charge['date']}",
                    'potential_refund': charge['amount'],
                    'evidence': f"CPT {charge['cpt_code']} appears {seen[key] + 1} times on same date"
                })
            seen[key] = seen.get(key, 0) + 1

        return errors

    def check_unbundling(self, bill_data: dict) -> list:
        """Detect unbundling - billing separately for bundled services"""
        errors = []
        cpt_codes = [c['cpt_code'] for c in bill_data['charges']]

        # Common unbundling patterns
        unbundle_patterns = [
            (['99213', '99214'], '99215'),  # Office visit levels
            (['36415', '36416'], '36410'),  # Blood draw components
            # Add more patterns from CCI edits
        ]

        for components, bundle_code in unbundle_patterns:
            if all(code in cpt_codes for code in components):
                component_total = sum(
                    c['amount'] for c in bill_data['charges']
                    if c['cpt_code'] in components
                )
                errors.append({
                    'type': 'unbundling',
                    'severity': 'high',
                    'description': f"Services {components} should be billed as {bundle_code}",
                    'potential_refund': component_total * 0.3,  # Estimate
                    'evidence': 'CCI (Correct Coding Initiative) edits indicate these should be bundled'
                })

        return errors
```

### 4. Appeal Letter Generator

```python
class AppealGenerator:
    """Generate professional appeal letters with evidence"""

    def generate_appeal(self,
                       bill_data: dict,
                       errors: list,
                       pricing_analysis: dict,
                       appeal_type: str = 'provider') -> str:
        """Generate customized appeal letter"""

        # Build evidence section
        evidence_points = self.compile_evidence(errors, pricing_analysis)

        # Select template based on appeal type
        if appeal_type == 'provider':
            template = self.PROVIDER_APPEAL_TEMPLATE
        elif appeal_type == 'insurance':
            template = self.INSURANCE_APPEAL_TEMPLATE
        else:
            template = self.GENERAL_APPEAL_TEMPLATE

        # Use LLM to personalize
        prompt = f"""
        Generate a professional medical bill appeal letter using this template and information:

        Template: {template}

        Patient Info: {bill_data['patient']}
        Provider: {bill_data['provider']}
        Account: {bill_data['account_number']}
        Total Billed: ${bill_data['total']}

        Issues Found:
        {self.format_issues(errors, pricing_analysis)}

        Evidence Points:
        {evidence_points}

        Requested Action: Review and adjust charges based on evidence provided.

        Make the letter professional, firm but polite, and include specific
        regulatory references where applicable.
        """

        return self.llm_generate(prompt)

    PROVIDER_APPEAL_TEMPLATE = """
    [Date]

    [Provider Name]
    [Provider Address]

    RE: Billing Dispute - Account #[Account Number]
    Patient: [Patient Name]
    Date of Service: [DOS]

    Dear Billing Department,

    I am writing to formally dispute charges on the above-referenced account.
    After careful review, I have identified the following issues that require
    immediate attention:

    [ISSUES_SECTION]

    Supporting Evidence:
    [EVIDENCE_SECTION]

    Based on the above, I respectfully request:
    1. An itemized bill with CPT codes for all charges
    2. Review and correction of the identified errors
    3. Adjustment of charges to fair market rates

    I am prepared to pay the fair and accurate amount promptly upon resolution.
    Please respond within 30 days as required by [State] law.

    Sincerely,
    [Patient Name]
    [Contact Information]

    Enclosures: [List of supporting documents]
    """
```

### 5. Tracking & Follow-up System

```python
from datetime import datetime, timedelta
from sqlalchemy import Column, Integer, String, DateTime, Float, Enum

class Appeal(Base):
    __tablename__ = 'appeals'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    provider_name = Column(String)
    account_number = Column(String)
    original_amount = Column(Float)
    disputed_amount = Column(Float)
    status = Column(Enum('draft', 'sent', 'acknowledged', 'in_review',
                         'resolved', 'escalated'))
    created_at = Column(DateTime, default=datetime.utcnow)
    sent_at = Column(DateTime)
    response_deadline = Column(DateTime)
    resolution_amount = Column(Float)
    savings = Column(Float)

class FollowUpAgent:
    """Autonomous follow-up on pending appeals"""

    def check_pending_appeals(self):
        """Check for appeals needing follow-up"""
        pending = Appeal.query.filter(
            Appeal.status.in_(['sent', 'in_review']),
            Appeal.response_deadline < datetime.utcnow()
        ).all()

        for appeal in pending:
            self.generate_followup(appeal)

    def generate_followup(self, appeal: Appeal):
        """Generate follow-up communication"""
        days_overdue = (datetime.utcnow() - appeal.response_deadline).days

        if days_overdue <= 7:
            # Gentle reminder
            template = 'followup_reminder'
        elif days_overdue <= 30:
            # Firm follow-up with regulatory reference
            template = 'followup_firm'
        else:
            # Escalation warning
            template = 'followup_escalation'

        followup_letter = self.generate_letter(appeal, template)

        # Queue notification to user
        self.notify_user(appeal.user_id, followup_letter)
```

---

## Data Pipeline

### CMS Data Integration

```python
import requests
import pandas as pd

class CMSDataLoader:
    """Load and process CMS pricing data"""

    CMS_URLS = {
        'physician_fee': 'https://www.cms.gov/Medicare/Medicare-Fee-for-Service-Payment/PhysicianFeeSched/Downloads/RVU21A.zip',
        'gpci': 'https://www.cms.gov/Medicare/Medicare-Fee-for-Service-Payment/PhysicianFeeSched/Downloads/CY2024-GPCI-File.zip',
        'hcpcs': 'https://www.cms.gov/Medicare/Coding/HCPCSReleaseCodeSets/Downloads/2024-Alpha-Numeric-HCPCS-File.zip'
    }

    def load_physician_fees(self) -> pd.DataFrame:
        """Load and process physician fee schedule"""
        # Download and extract
        df = pd.read_csv('rvu_data.csv')

        # Calculate payment amount
        # Payment = [(Work RVU * Work GPCI) + (PE RVU * PE GPCI) +
        #            (MP RVU * MP GPCI)] * Conversion Factor

        df['national_payment'] = (
            (df['work_rvu'] * 1.0 +
             df['pe_rvu'] * 1.0 +
             df['mp_rvu'] * 1.0) *
            df['conversion_factor']
        )

        return df[['hcpcs_code', 'description', 'national_payment',
                   'work_rvu', 'pe_rvu', 'mp_rvu']]
```

---

## User Interface

### Main Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│  MedAudit AI                                    [Settings]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │  Total Saved    │  │ Bills Audited   │  │  Pending    │ │
│  │    $2,847       │  │      12         │  │  Appeals: 3 │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
│                                                             │
│  [+ Upload New Bill]                                        │
│                                                             │
│  Recent Audits                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🏥 City Hospital - ER Visit      $847 overcharged   │   │
│  │    Status: Appeal Sent | Response due: Nov 25       │   │
│  │    [View Details] [Download Appeal]                 │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ 🏥 Radiology Associates - MRI    $320 overcharged   │   │
│  │    Status: Resolved | Saved: $320                   │   │
│  │    [View Details] [Mark Paid]                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Bill Analysis View

```
┌─────────────────────────────────────────────────────────────┐
│  Bill Analysis: City Hospital ER Visit                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Summary                                                    │
│  ────────────────────────────────────                      │
│  Total Billed: $3,247.00                                   │
│  Fair Price Range: $1,800 - $2,400                         │
│  Potential Savings: $847 - $1,447                          │
│                                                             │
│  ⚠️  3 Issues Found                                         │
│                                                             │
│  Line Item Analysis                                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ CPT    Description          Billed   Fair    Status │   │
│  │ ───────────────────────────────────────────────────│   │
│  │ 99284  ER Visit Level 4     $1,200   $450    ⚠️ HIGH │   │
│  │ 36415  Blood Draw           $85      $15     ⚠️ HIGH │   │
│  │ 85025  CBC                  $312     $25     ⚠️ HIGH │   │
│  │ 99284  ER Visit Level 4     $1,200   --      🚫 DUP  │   │
│  │ 96360  IV Infusion          $450     $180    ⚠️ HIGH │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Errors Detected                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🚫 Duplicate Charge: ER Visit billed twice          │   │
│  │    Potential refund: $1,200                         │   │
│  │                                                     │   │
│  │ ⚠️  Upcoding Suspected: Level 4 ER for minor issue  │   │
│  │    Potential savings: $400                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [Generate Appeal Letter]  [Request Itemized Bill]          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Roadmap

### Phase 1: Core Engine (Week 1-2)
- [ ] Set up OCR pipeline with docTR
- [ ] Build CPT code extraction logic
- [ ] Load CMS physician fee schedule data
- [ ] Implement basic pricing comparison
- [ ] Create SQLite database schema

### Phase 2: Error Detection (Week 3)
- [ ] Implement duplicate detection
- [ ] Add unbundling detection rules
- [ ] Build upcoding pattern matching
- [ ] Create error severity scoring

### Phase 3: Appeal Generation (Week 4)
- [ ] Design appeal letter templates
- [ ] Implement LLM-based personalization
- [ ] Add evidence compilation
- [ ] Create PDF export

### Phase 4: User Interface (Week 5-6)
- [ ] Build React frontend
- [ ] Implement file upload with drag-drop
- [ ] Create analysis dashboard
- [ ] Add appeal tracking system

### Phase 5: Polish & Demo (Week 7)
- [ ] Add sample bills for demo
- [ ] Create walkthrough video
- [ ] Write documentation
- [ ] Deploy to free hosting

---

## Demo Strategy

### Sample Bills
Create realistic sample bills with intentional errors:
1. ER visit with duplicate charge and upcoding
2. Lab work with unbundled tests
3. Outpatient surgery with phantom charges

### Live Demo Flow
1. Upload sample bill (drag-drop)
2. Watch OCR extraction in real-time
3. Show pricing comparison visualization
4. Highlight detected errors with explanations
5. Generate and display appeal letter
6. Show tracking dashboard with resolved cases

### Metrics to Highlight
- Processing time: <30 seconds per bill
- Detection accuracy on test set
- Average savings per bill in demo

---

## Regulatory References

Include these in appeal letters for credibility:

- **No Surprises Act (2022)**: Protects against surprise billing
- **Fair Debt Collection Practices Act**: Limits collection on disputed bills
- **HIPAA**: Right to access itemized bills
- **State-specific laws**: Many states have billing transparency laws

---

## Future Enhancements

1. **Insurance EOB Integration**: Cross-reference with EOB for discrepancies
2. **Provider Negotiation Bot**: Automated phone/chat negotiation
3. **Class Action Detection**: Identify if others have similar issues
4. **Credit Protection**: Dispute credit reporting during appeals
5. **HSA/FSA Optimization**: Ensure eligible expenses are covered

---

## Cost to Run

| Component | Monthly Cost |
|-----------|-------------|
| Hosting (Vercel/Railway free tier) | $0 |
| Database (SQLite local) | $0 |
| LLM (Ollama local or Groq free) | $0 |
| Domain (optional) | $12/year |
| **Total** | **$0 - $1/month** |

---

## Key Differentiators

1. **Truly Agentic**: Multi-step reasoning, not just chatbot Q&A
2. **Real Impact**: Quantifiable savings ($100s-$1000s)
3. **Complex Pipeline**: OCR → Analysis → Generation → Tracking
4. **Free Data Sources**: Uses public CMS data
5. **Human-in-the-Loop**: User reviews before sending appeals

This project demonstrates sophisticated AI engineering while solving a genuine pain point that affects millions of Americans.
