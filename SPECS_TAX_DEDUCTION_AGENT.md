# TaxHound AI - Tax Deduction Archaeologist Agent

## Executive Summary

**TaxHound AI** is an autonomous agent that excavates missed tax deductions from your financial data. It scans emails, receipts, bank transactions, and documents to identify deductible expenses you might have overlooked - potentially recovering hundreds to thousands in tax savings.

---

## Value Proposition

### The Problem
- Americans overpay $1 billion+ in taxes annually from missed deductions
- Average person misses $500-2,000 in legitimate deductions
- Tax code has 70,000+ pages - impossible to know everything
- Receipts lost, expenses forgotten
- Fear of audits prevents claiming legitimate deductions

### The Solution
An AI agent that:
1. **Scans** emails, photos, and transactions for deductible expenses
2. **Categorizes** expenses per IRS rules
3. **Calculates** potential savings by tax bracket
4. **Generates** documentation packages for tax filing
5. **Tracks** deductions year-round

### Portfolio Impact
- High-value financial application ($100s-$1000s impact)
- Complex classification and reasoning
- Multi-source data integration
- Document understanding
- Clear, quantifiable ROI

---

## Technical Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    TaxHound AI Agent                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌──────────────┐    ┌───────────────┐  │
│  │   Data      │    │  Deduction   │    │ Documentation │  │
│  │  Ingestion  │───▶│  Classifier  │───▶│   Generator   │  │
│  │   Agent     │    │    Agent     │    │    Agent      │  │
│  └─────────────┘    └──────────────┘    └───────────────┘  │
│         │                  │                    │           │
│         ▼                  ▼                    ▼           │
│  ┌─────────────┐    ┌──────────────┐    ┌───────────────┐  │
│  │ Email/Bank/ │    │  IRS Rules   │    │   Receipt     │  │
│  │ Receipt OCR │    │  Database    │    │   Organizer   │  │
│  └─────────────┘    └──────────────┘    └───────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   Tax Savings   │
                    │   Calculator    │
                    └─────────────────┘
```

### Agent Workflow

```python
from langgraph.graph import StateGraph, END

class TaxDeductionState(TypedDict):
    transactions: list
    emails: list
    receipts: list
    potential_deductions: list
    verified_deductions: list
    documentation: dict
    estimated_savings: float

def ingest_data(state: TaxDeductionState) -> TaxDeductionState:
    """Ingest and normalize data from all sources"""
    # Parse bank transactions
    # Extract purchase emails
    # OCR receipt photos
    # Consolidate into expense records
    pass

def classify_deductions(state: TaxDeductionState) -> TaxDeductionState:
    """Classify expenses as potential deductions"""
    # Match against IRS deduction categories
    # Check eligibility requirements
    # Flag for user verification
    pass

def verify_and_calculate(state: TaxDeductionState) -> TaxDeductionState:
    """Verify deductions and calculate savings"""
    # User confirms/rejects flagged items
    # Calculate tax savings by bracket
    # Check against standard deduction
    pass

def generate_documentation(state: TaxDeductionState) -> TaxDeductionState:
    """Create documentation package"""
    # Organize receipts by category
    # Generate summary reports
    # Create audit-ready documentation
    pass

workflow = StateGraph(TaxDeductionState)
workflow.add_node("ingest", ingest_data)
workflow.add_node("classify", classify_deductions)
workflow.add_node("verify", verify_and_calculate)
workflow.add_node("document", generate_documentation)

workflow.set_entry_point("ingest")
workflow.add_edge("ingest", "classify")
workflow.add_edge("classify", "verify")
workflow.add_edge("verify", "document")
workflow.add_edge("document", END)
```

---

## Tech Stack (100% Free/Affordable)

### Data Ingestion
| Component | Tool | Cost |
|-----------|------|------|
| Bank Transactions | **Plaid** / CSV | Free tier |
| Email Scanning | **Gmail API** | Free |
| Receipt OCR | **docTR** | Free |
| Photo Processing | **Pillow** | Free |

### AI/LLM Layer
| Component | Tool | Cost |
|-----------|------|------|
| Agent Framework | **LangGraph** | Free |
| LLM | **Ollama + Llama 3.1 8B** | Free |
| Classification | **Zero-shot classifier** | Free |
| Embeddings | **all-MiniLM-L6-v2** | Free |
| RAG | **ChromaDB** | Free |

### Tax Knowledge Base
| Source | Data | Access |
|--------|------|--------|
| **IRS Publication 17** | Individual deductions | Free PDF |
| **IRS Publication 535** | Business expenses | Free PDF |
| **IRS Publication 463** | Travel/Entertainment | Free PDF |
| **Schedule A Instructions** | Itemized deductions | Free PDF |

### Backend & Storage
| Component | Tool | Cost |
|-----------|------|------|
| Backend | **FastAPI** | Free |
| Database | **SQLite** | Free |
| Vector Store | **ChromaDB** | Free |
| File Storage | **Local filesystem** | Free |

### Frontend
| Component | Tool | Cost |
|-----------|------|------|
| Framework | **React** | Free |
| UI | **shadcn/ui** | Free |
| Charts | **Recharts** | Free |
| PDF Export | **react-pdf** | Free |

---

## Core Features & Implementation

### 1. Multi-Source Data Ingestion

```python
import pandas as pd
from doctr.io import DocumentFile
from doctr.models import ocr_predictor
from datetime import datetime

class DataIngestionAgent:
    """Ingest data from multiple sources for deduction mining"""

    def __init__(self):
        self.ocr_model = ocr_predictor(pretrained=True)

    def ingest_all(self, user_id: int) -> list:
        """Ingest and consolidate all expense data"""
        expenses = []

        # Bank transactions
        bank_expenses = self.process_bank_transactions(user_id)
        expenses.extend(bank_expenses)

        # Email receipts
        email_expenses = self.process_email_receipts(user_id)
        expenses.extend(email_expenses)

        # Photo receipts
        photo_expenses = self.process_photo_receipts(user_id)
        expenses.extend(photo_expenses)

        # Deduplicate
        expenses = self.deduplicate_expenses(expenses)

        return expenses

    def process_bank_transactions(self, user_id: int) -> list:
        """Process bank transaction CSV or Plaid data"""
        # Load transactions
        df = pd.read_csv(f'user_data/{user_id}/transactions.csv')

        expenses = []
        for _, row in df.iterrows():
            if row['amount'] < 0:  # Expenses are negative
                expenses.append({
                    'source': 'bank',
                    'date': row['date'],
                    'amount': abs(row['amount']),
                    'merchant': row['description'],
                    'category': row.get('category', 'unknown'),
                    'raw_description': row['description'],
                    'receipt_available': False
                })

        return expenses

    def process_email_receipts(self, user_id: int) -> list:
        """Extract purchases from email receipts"""
        # Search for receipt emails
        receipt_patterns = [
            'from:noreply@amazon.com subject:order',
            'from:receipts subject:receipt',
            'subject:"your order" OR subject:"order confirmation"',
            'subject:"payment received"'
        ]

        expenses = []
        for pattern in receipt_patterns:
            emails = self.search_emails(user_id, pattern)

            for email in emails:
                extracted = self.extract_receipt_from_email(email)
                if extracted:
                    extracted['source'] = 'email'
                    extracted['receipt_available'] = True
                    extracted['receipt_data'] = email['body']
                    expenses.append(extracted)

        return expenses

    def process_photo_receipts(self, user_id: int) -> list:
        """OCR receipt photos"""
        import os
        receipt_dir = f'user_data/{user_id}/receipts'

        expenses = []
        for filename in os.listdir(receipt_dir):
            filepath = os.path.join(receipt_dir, filename)

            # OCR the image
            doc = DocumentFile.from_images(filepath)
            result = self.ocr_model(doc)
            text = result.render()

            # Extract structured data
            extracted = self.extract_receipt_data(text)
            if extracted:
                extracted['source'] = 'photo'
                extracted['receipt_available'] = True
                extracted['receipt_file'] = filepath
                expenses.append(extracted)

        return expenses

    def extract_receipt_data(self, text: str) -> dict:
        """Extract structured data from receipt text using LLM"""
        prompt = f"""
        Extract the following from this receipt:
        - merchant/store name
        - date
        - total amount
        - list of items (if visible)
        - payment method

        Receipt text:
        {text}

        Return as JSON. If a field is not found, use null.
        """

        result = self.llm_extract(prompt)

        if result and result.get('total_amount'):
            return {
                'merchant': result.get('merchant', 'Unknown'),
                'date': result.get('date', datetime.now().isoformat()),
                'amount': float(result['total_amount']),
                'items': result.get('items', []),
                'payment_method': result.get('payment_method')
            }

        return None

    def deduplicate_expenses(self, expenses: list) -> list:
        """Remove duplicate entries across sources"""
        # Sort by amount and date
        expenses.sort(key=lambda x: (x['date'], x['amount']))

        deduplicated = []
        seen = set()

        for expense in expenses:
            # Create a key for deduplication
            key = (
                expense['date'][:10],  # Date without time
                round(expense['amount'], 0),  # Round amount
                expense['merchant'][:10].lower()  # First 10 chars of merchant
            )

            if key not in seen:
                seen.add(key)
                # Prefer entries with receipts
                if expense['receipt_available']:
                    deduplicated.append(expense)
                elif key not in [d.get('key') for d in deduplicated]:
                    expense['key'] = key
                    deduplicated.append(expense)

        return deduplicated
```

### 2. Deduction Classification Engine

```python
class DeductionClassifier:
    """Classify expenses into IRS deduction categories"""

    # Common deduction categories and keywords
    DEDUCTION_CATEGORIES = {
        'medical': {
            'keywords': ['pharmacy', 'cvs', 'walgreens', 'doctor', 'hospital',
                        'dental', 'vision', 'prescription', 'medical', 'health',
                        'therapy', 'chiropractor', 'lab'],
            'irs_reference': 'Publication 502',
            'threshold': '7.5% of AGI',
            'schedule': 'Schedule A, Line 1'
        },
        'charitable': {
            'keywords': ['donation', 'charity', 'church', 'nonprofit', 'foundation',
                        'united way', 'red cross', 'goodwill', 'salvation army'],
            'irs_reference': 'Publication 526',
            'threshold': None,
            'schedule': 'Schedule A, Line 11'
        },
        'home_office': {
            'keywords': ['office depot', 'staples', 'amazon', 'desk', 'chair',
                        'monitor', 'keyboard', 'office supplies'],
            'irs_reference': 'Publication 587',
            'threshold': None,
            'schedule': 'Schedule C or Form 8829',
            'requirements': ['Self-employed or work from home requirement']
        },
        'education': {
            'keywords': ['tuition', 'university', 'college', 'course', 'udemy',
                        'coursera', 'textbook', 'student'],
            'irs_reference': 'Publication 970',
            'threshold': None,
            'schedule': 'Form 8863 or Schedule A'
        },
        'business_travel': {
            'keywords': ['airline', 'hotel', 'uber', 'lyft', 'rental car',
                        'airbnb', 'conference', 'parking'],
            'irs_reference': 'Publication 463',
            'threshold': None,
            'schedule': 'Schedule C',
            'requirements': ['Must be business-related']
        },
        'business_meals': {
            'keywords': ['restaurant', 'uber eats', 'doordash', 'grubhub'],
            'irs_reference': 'Publication 463',
            'threshold': '50% deductible',
            'schedule': 'Schedule C',
            'requirements': ['Must document business purpose']
        },
        'professional_services': {
            'keywords': ['cpa', 'accountant', 'lawyer', 'attorney', 'consultant',
                        'legal', 'tax prep'],
            'irs_reference': 'Publication 529',
            'threshold': None,
            'schedule': 'Schedule C'
        },
        'software_subscriptions': {
            'keywords': ['adobe', 'microsoft', 'zoom', 'slack', 'notion',
                        'github', 'aws', 'google workspace'],
            'irs_reference': 'Publication 535',
            'threshold': None,
            'schedule': 'Schedule C',
            'requirements': ['Must be business use']
        },
        'mileage': {
            'keywords': [],  # Special handling
            'irs_reference': 'Publication 463',
            'rate': '0.67/mile (2024)',
            'schedule': 'Schedule C or Form 2106'
        },
        'state_local_tax': {
            'keywords': ['property tax', 'state income tax', 'dmv'],
            'irs_reference': 'Publication 17',
            'threshold': '$10,000 cap',
            'schedule': 'Schedule A, Line 5'
        }
    }

    def classify_expenses(self, expenses: list, user_profile: dict) -> list:
        """Classify all expenses for potential deductions"""
        classified = []

        for expense in expenses:
            classifications = self.classify_single(expense, user_profile)

            for classification in classifications:
                classified.append({
                    **expense,
                    'deduction_category': classification['category'],
                    'confidence': classification['confidence'],
                    'irs_reference': classification['irs_reference'],
                    'requirements': classification.get('requirements', []),
                    'notes': classification.get('notes', ''),
                    'verified': False
                })

        return classified

    def classify_single(self, expense: dict, user_profile: dict) -> list:
        """Classify a single expense"""
        merchant = expense['merchant'].lower()
        amount = expense['amount']
        potential_categories = []

        # Keyword matching
        for category, config in self.DEDUCTION_CATEGORIES.items():
            if any(kw in merchant for kw in config['keywords']):
                confidence = 0.8

                # Check eligibility
                if category in ['home_office', 'business_travel', 'software_subscriptions']:
                    if not user_profile.get('self_employed'):
                        confidence = 0.3
                        notes = 'May require self-employment or business use'
                    else:
                        notes = ''

                potential_categories.append({
                    'category': category,
                    'confidence': confidence,
                    'irs_reference': config['irs_reference'],
                    'requirements': config.get('requirements', []),
                    'notes': notes
                })

        # If no keyword match, use LLM classification
        if not potential_categories:
            llm_classification = self.llm_classify(expense)
            if llm_classification:
                potential_categories.append(llm_classification)

        return potential_categories if potential_categories else [{
            'category': 'not_deductible',
            'confidence': 0.5,
            'irs_reference': None,
            'notes': 'No matching deduction category found'
        }]

    def llm_classify(self, expense: dict) -> dict:
        """Use LLM to classify ambiguous expenses"""
        prompt = f"""
        Classify this expense for tax deduction purposes:

        Merchant: {expense['merchant']}
        Amount: ${expense['amount']}
        Date: {expense['date']}
        Category: {expense.get('category', 'unknown')}

        Determine if this could be a tax deduction and which category:
        - medical (doctor, pharmacy, health insurance)
        - charitable (donations)
        - home_office (supplies, equipment for work)
        - education (courses, training)
        - business_travel (work-related travel)
        - business_meals (client meals)
        - professional_services (accounting, legal)
        - software_subscriptions (business software)
        - not_deductible

        Return JSON with: category, confidence (0-1), reasoning
        """

        result = self.llm_extract(prompt)
        if result and result.get('category') != 'not_deductible':
            category = result['category']
            return {
                'category': category,
                'confidence': result.get('confidence', 0.6),
                'irs_reference': self.DEDUCTION_CATEGORIES.get(
                    category, {}
                ).get('irs_reference'),
                'notes': result.get('reasoning', '')
            }

        return None
```

### 3. Tax Savings Calculator

```python
class TaxSavingsCalculator:
    """Calculate potential tax savings from deductions"""

    # 2024 Federal Tax Brackets (Single)
    TAX_BRACKETS_SINGLE = [
        (11600, 0.10),
        (47150, 0.12),
        (100525, 0.22),
        (191950, 0.24),
        (243725, 0.32),
        (609350, 0.35),
        (float('inf'), 0.37)
    ]

    # Standard deduction 2024
    STANDARD_DEDUCTION = {
        'single': 14600,
        'married_joint': 29200,
        'married_separate': 14600,
        'head_of_household': 21900
    }

    def calculate_savings(self, deductions: list, user_profile: dict) -> dict:
        """Calculate tax savings from identified deductions"""
        # Group deductions by category
        by_category = self.group_by_category(deductions)

        # Calculate totals
        total_deductions = sum(d['amount'] for d in deductions if d['verified'])

        # Get user's marginal rate
        marginal_rate = self.get_marginal_rate(
            user_profile['estimated_income'],
            user_profile['filing_status']
        )

        # Compare to standard deduction
        standard = self.STANDARD_DEDUCTION[user_profile['filing_status']]
        should_itemize = total_deductions > standard

        # Calculate actual savings
        if should_itemize:
            tax_savings = total_deductions * marginal_rate
            additional_savings = (total_deductions - standard) * marginal_rate
        else:
            tax_savings = 0
            additional_savings = 0

        return {
            'total_deductions': round(total_deductions, 2),
            'by_category': by_category,
            'marginal_rate': marginal_rate,
            'standard_deduction': standard,
            'should_itemize': should_itemize,
            'estimated_tax_savings': round(tax_savings, 2),
            'additional_vs_standard': round(additional_savings, 2),
            'breakdown': self.generate_breakdown(by_category, marginal_rate)
        }

    def get_marginal_rate(self, income: float, filing_status: str) -> float:
        """Get marginal tax rate based on income"""
        brackets = self.TAX_BRACKETS_SINGLE  # Simplified

        for threshold, rate in brackets:
            if income <= threshold:
                return rate

        return 0.37  # Top bracket

    def group_by_category(self, deductions: list) -> dict:
        """Group deductions by category with totals"""
        groups = {}

        for d in deductions:
            if d['verified']:
                cat = d['deduction_category']
                if cat not in groups:
                    groups[cat] = {
                        'items': [],
                        'total': 0,
                        'count': 0
                    }
                groups[cat]['items'].append(d)
                groups[cat]['total'] += d['amount']
                groups[cat]['count'] += 1

        return groups

    def generate_breakdown(self, by_category: dict, rate: float) -> list:
        """Generate savings breakdown by category"""
        breakdown = []

        for category, data in by_category.items():
            breakdown.append({
                'category': category,
                'total_amount': round(data['total'], 2),
                'item_count': data['count'],
                'tax_savings': round(data['total'] * rate, 2)
            })

        return sorted(breakdown, key=lambda x: x['tax_savings'], reverse=True)

    def analyze_vs_standard(self, deductions: list,
                           user_profile: dict) -> dict:
        """Analyze whether itemizing beats standard deduction"""
        total = sum(d['amount'] for d in deductions if d['verified'])
        standard = self.STANDARD_DEDUCTION[user_profile['filing_status']]

        gap = total - standard

        if gap > 0:
            recommendation = 'itemize'
            explanation = f"Itemizing saves ${gap * self.get_marginal_rate(user_profile['estimated_income'], user_profile['filing_status']):.2f} more than standard deduction"
        elif gap > -1000:
            recommendation = 'close'
            explanation = f"You're ${abs(gap):.2f} short of itemizing. Look for more deductions."
        else:
            recommendation = 'standard'
            explanation = f"Standard deduction is better by ${abs(gap):.2f}"

        return {
            'recommendation': recommendation,
            'itemized_total': total,
            'standard_deduction': standard,
            'difference': gap,
            'explanation': explanation
        }
```

### 4. Documentation Generator

```python
from datetime import datetime
import json

class DocumentationGenerator:
    """Generate tax-ready documentation packages"""

    def generate_package(self, deductions: list, savings: dict,
                        user_profile: dict) -> dict:
        """Generate complete documentation package"""
        package = {
            'summary': self.generate_summary(deductions, savings, user_profile),
            'by_category': {},
            'receipts': [],
            'audit_notes': self.generate_audit_notes(deductions),
            'generated_at': datetime.now().isoformat()
        }

        # Organize by category
        for category in savings['by_category']:
            items = savings['by_category'][category]['items']
            package['by_category'][category] = {
                'total': savings['by_category'][category]['total'],
                'items': self.format_items_for_export(items),
                'irs_reference': self.get_irs_reference(category),
                'documentation_requirements': self.get_doc_requirements(category)
            }

        return package

    def generate_summary(self, deductions: list, savings: dict,
                        user_profile: dict) -> dict:
        """Generate executive summary"""
        return {
            'tax_year': datetime.now().year,
            'filing_status': user_profile['filing_status'],
            'total_deductions': savings['total_deductions'],
            'estimated_savings': savings['estimated_tax_savings'],
            'recommendation': 'Itemize' if savings['should_itemize'] else 'Standard Deduction',
            'categories_found': list(savings['by_category'].keys()),
            'items_count': len([d for d in deductions if d['verified']])
        }

    def generate_audit_notes(self, deductions: list) -> list:
        """Generate notes for potential audit"""
        notes = []

        # Check for high-risk categories
        medical_total = sum(
            d['amount'] for d in deductions
            if d['deduction_category'] == 'medical' and d['verified']
        )
        if medical_total > 10000:
            notes.append({
                'category': 'medical',
                'note': 'High medical deductions may trigger review. Ensure all receipts are organized.',
                'action': 'Keep all medical bills, EOBs, and pharmacy receipts'
            })

        charitable = sum(
            d['amount'] for d in deductions
            if d['deduction_category'] == 'charitable' and d['verified']
        )
        if charitable > 5000:
            notes.append({
                'category': 'charitable',
                'note': 'Charitable donations over $500 require Form 8283',
                'action': 'Obtain written acknowledgment from each charity for donations over $250'
            })

        # Check for missing receipts
        missing_receipts = [
            d for d in deductions
            if d['verified'] and not d['receipt_available'] and d['amount'] > 75
        ]
        if missing_receipts:
            notes.append({
                'category': 'general',
                'note': f'{len(missing_receipts)} deductions over $75 are missing receipts',
                'action': 'Try to obtain duplicate receipts or bank statements as backup'
            })

        return notes

    def get_doc_requirements(self, category: str) -> list:
        """Get documentation requirements for category"""
        requirements = {
            'medical': [
                'Itemized bills (not just credit card statements)',
                'EOBs from insurance',
                'Prescription records',
                'Mileage log for medical travel'
            ],
            'charitable': [
                'Written acknowledgment for donations over $250',
                'Form 8283 for non-cash donations over $500',
                'Fair market value documentation for donated items',
                'Bank records showing date and amount'
            ],
            'home_office': [
                'Measurement of home office space',
                'Total home square footage',
                'Receipts for office supplies/equipment',
                'Utility bills (for actual expense method)'
            ],
            'business_travel': [
                'Receipts for all expenses',
                'Business purpose documentation',
                'Trip itinerary',
                'Meeting confirmations/agendas'
            ],
            'mileage': [
                'Mileage log with date, destination, purpose, miles',
                'Odometer readings at start/end of year',
                'Business purpose for each trip'
            ]
        }

        return requirements.get(category, ['Receipts with date, amount, and description'])

    def export_to_csv(self, package: dict, filepath: str):
        """Export deductions to CSV for tax software import"""
        import csv

        with open(filepath, 'w', newline='') as f:
            writer = csv.writer(f)
            writer.writerow([
                'Date', 'Description', 'Amount', 'Category',
                'IRS Reference', 'Has Receipt'
            ])

            for category, data in package['by_category'].items():
                for item in data['items']:
                    writer.writerow([
                        item['date'],
                        item['merchant'],
                        item['amount'],
                        category,
                        data['irs_reference'],
                        'Yes' if item['receipt_available'] else 'No'
                    ])

    def export_to_pdf(self, package: dict, filepath: str):
        """Export documentation package to PDF"""
        # Use reportlab or weasyprint to generate PDF
        # Include summary, categorized lists, and audit notes
        pass
```

### 5. Year-Round Tracking

```python
from sqlalchemy import Column, Integer, String, Float, Date, Boolean

class TrackedExpense(Base):
    __tablename__ = 'tracked_expenses'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    date = Column(Date)
    merchant = Column(String)
    amount = Column(Float)
    category = Column(String)
    deduction_category = Column(String)
    receipt_path = Column(String)
    verified = Column(Boolean, default=False)
    notes = Column(String)

class YearRoundTracker:
    """Track deductions throughout the year"""

    def add_expense(self, user_id: int, expense: dict):
        """Add expense to tracking"""
        # Auto-classify
        classified = self.classifier.classify_single(expense, self.get_profile(user_id))

        # Save to database
        tracked = TrackedExpense(
            user_id=user_id,
            date=expense['date'],
            merchant=expense['merchant'],
            amount=expense['amount'],
            category=expense.get('category'),
            deduction_category=classified[0]['category'] if classified else None,
            receipt_path=expense.get('receipt_file'),
            verified=False
        )
        self.session.add(tracked)
        self.session.commit()

        return tracked

    def get_ytd_summary(self, user_id: int) -> dict:
        """Get year-to-date deduction summary"""
        year = datetime.now().year

        expenses = TrackedExpense.query.filter(
            TrackedExpense.user_id == user_id,
            TrackedExpense.date >= f'{year}-01-01'
        ).all()

        by_category = {}
        for exp in expenses:
            if exp.deduction_category:
                if exp.deduction_category not in by_category:
                    by_category[exp.deduction_category] = 0
                by_category[exp.deduction_category] += exp.amount

        total = sum(by_category.values())

        return {
            'year': year,
            'total_tracked': total,
            'by_category': by_category,
            'vs_standard': total - self.calculator.STANDARD_DEDUCTION['single'],
            'items_count': len(expenses)
        }

    def get_monthly_trend(self, user_id: int) -> list:
        """Get monthly deduction trend"""
        # Returns list of {month, total, by_category} for charting
        pass

    def suggest_missing(self, user_id: int) -> list:
        """Suggest commonly missed deductions"""
        profile = self.get_profile(user_id)
        suggestions = []

        # Based on profile, suggest relevant deductions
        if profile.get('has_student_loans'):
            suggestions.append({
                'category': 'student_loan_interest',
                'description': 'Student loan interest is deductible up to $2,500',
                'action': 'Get Form 1098-E from your loan servicer'
            })

        if profile.get('works_from_home'):
            suggestions.append({
                'category': 'home_office',
                'description': 'Home office expenses may be deductible',
                'action': 'Track internet, utilities, and office supplies'
            })

        if profile.get('has_kids'):
            suggestions.append({
                'category': 'childcare',
                'description': 'Childcare expenses may qualify for credit',
                'action': 'Get provider\'s tax ID and total paid'
            })

        return suggestions
```

---

## User Interface

### Dashboard View

```
┌─────────────────────────────────────────────────────────────┐
│  TaxHound AI                              Tax Year 2024     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │  YTD Tracked    │  │ Est. Savings    │  │  Standard   │ │
│  │   $12,847       │  │    $2,826       │  │   $14,600   │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
│                                                             │
│  📊 You're $1,753 away from itemizing!                      │
│                                                             │
│  Deductions by Category                                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ ████████████████████ Medical        $4,230          │   │
│  │ ██████████████       Charitable     $3,150          │   │
│  │ ██████████           Home Office    $2,430          │   │
│  │ ██████               Education      $1,890          │   │
│  │ ███                  Business       $1,147          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Recent Activity                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Nov 15  CVS Pharmacy         $45.67   Medical   ✅  │   │
│  │ Nov 14  Goodwill Donation    $120.00  Charitable ✅  │   │
│  │ Nov 12  Amazon (office)      $89.99   Home Off. ⚠️   │   │
│  │         ⚠️ Needs verification: business use?          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [Scan New Data]  [Export Package]  [View All Deductions]   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Verification View

```
┌─────────────────────────────────────────────────────────────┐
│  Verify Deductions                              15 pending  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Amazon - Office Chair                               │   │
│  │ Nov 10, 2024                           $289.99      │   │
│  │                                                     │   │
│  │ Suggested: Home Office (85% confidence)             │   │
│  │ IRS Reference: Publication 587                      │   │
│  │                                                     │   │
│  │ ⚠️ Requirement: Must be used for business           │   │
│  │                                                     │   │
│  │ Is this for business/work use?                      │   │
│  │                                                     │   │
│  │ [Yes, 100% business] [Partial use ___%] [No, personal] │
│  │                                                     │   │
│  │ 📎 Receipt attached                    [View Receipt] │  │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Uber ride to airport                                │   │
│  │ Nov 8, 2024                             $47.50      │   │
│  │                                                     │   │
│  │ Suggested: Business Travel (70% confidence)         │   │
│  │                                                     │   │
│  │ Was this for business travel?                       │   │
│  │                                                     │   │
│  │ [Yes] [No]                                          │   │
│  │                                                     │   │
│  │ If yes, what was the business purpose?              │   │
│  │ [Client meeting_________________]                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Roadmap

### Phase 1: Data Ingestion (Week 1-2)
- [ ] CSV transaction parser
- [ ] Receipt OCR pipeline
- [ ] Email receipt extractor
- [ ] Data normalization and deduplication

### Phase 2: Classification Engine (Week 3)
- [ ] Build deduction category database
- [ ] Implement keyword matching
- [ ] Add LLM fallback classification
- [ ] Create confidence scoring

### Phase 3: Savings Calculator (Week 4)
- [ ] Tax bracket calculations
- [ ] Standard deduction comparison
- [ ] Category-specific rules (limits, thresholds)
- [ ] Savings breakdown generator

### Phase 4: Documentation (Week 5)
- [ ] Summary report generator
- [ ] PDF export
- [ ] CSV export for tax software
- [ ] Audit notes generator

### Phase 5: Frontend & Demo (Week 6)
- [ ] Dashboard with charts
- [ ] Verification workflow
- [ ] Documentation export
- [ ] Demo data and walkthrough

---

## Demo Strategy

### Sample Data
Create realistic demo with:
- Mixed expenses (personal and deductible)
- Multiple categories represented
- Missing receipts to show warnings
- Edge cases requiring verification

### Live Demo Flow
1. Show "Scan" pulling in transactions and emails
2. Display classified deductions with confidence
3. Walk through verification of 2-3 items
4. Show savings calculator comparison
5. Export documentation package

### Metrics to Highlight
- Number of deductions found
- Estimated tax savings
- Comparison to standard deduction
- Processing time

---

## Important Disclaimers

1. **Not tax advice**: Tool provides organization, not professional tax advice
2. **Consult CPA**: Recommend professional review for complex situations
3. **No guarantee**: Tax law interpretation may vary
4. **Keep records**: Tool complements, doesn't replace record keeping

---

## Future Enhancements

1. **Mileage tracker**: GPS-based business mileage logging
2. **Receipt capture app**: Mobile app for instant receipt upload
3. **State taxes**: Add state-specific deductions
4. **Estimated payments**: Track quarterly tax payments
5. **CPA export**: Direct integration with tax software

---

## Cost to Run

| Component | Monthly Cost |
|-----------|-------------|
| Hosting (Vercel free) | $0 |
| Database (SQLite) | $0 |
| LLM (Ollama local) | $0 |
| OCR (docTR) | $0 |
| Gmail API | $0 |
| **Total** | **$0** |

---

## Key Differentiators

1. **Multi-source mining**: Doesn't just categorize - actively finds deductions
2. **IRS-aware**: References actual publications and rules
3. **Audit-ready**: Generates documentation that holds up
4. **Year-round**: Not just tax season - tracks all year
5. **Quantified impact**: Shows exact savings in dollars

This project demonstrates sophisticated AI application to a high-value financial use case with clear, measurable user benefit.
