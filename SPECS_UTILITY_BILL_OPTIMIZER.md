# UtilityGuard AI - Utility Bill Optimizer Agent

## Executive Summary

**UtilityGuard AI** is an autonomous agent that analyzes your utility bills for anomalies, compares rates with alternatives, and identifies eligible assistance programs and rebates. It turns complex utility management into automated savings and ensures you never overpay for electricity, gas, water, or internet.

---

## Value Proposition

### The Problem
- 40% of homeowners overpay on utilities due to wrong rate plans
- Hidden fees and billing errors go unnoticed
- Rate shopping is confusing and time-consuming
- Assistance programs exist but aren't advertised
- No visibility into usage patterns and anomalies

### The Solution
An AI agent that:
1. **Analyzes** utility bills for errors and anomalies
2. **Compares** current rates with available alternatives
3. **Identifies** eligible rebates and assistance programs
4. **Monitors** for billing irregularities
5. **Generates** switch/dispute requests

### Portfolio Impact
- Universal problem - everyone has utilities
- Clear financial savings
- Complex data analysis
- Multi-provider integration
- Government program navigation

---

## Technical Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                  UtilityGuard AI Agent                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌──────────────┐    ┌───────────────┐  │
│  │    Bill     │    │    Rate      │    │   Program     │  │
│  │  Analyzer   │───▶│  Comparator  │───▶│   Matcher     │  │
│  │   Agent     │    │    Agent     │    │    Agent      │  │
│  └─────────────┘    └──────────────┘    └───────────────┘  │
│         │                  │                    │           │
│         ▼                  ▼                    ▼           │
│  ┌─────────────┐    ┌──────────────┐    ┌───────────────┐  │
│  │  Bill OCR   │    │   Rate       │    │  Rebate &     │  │
│  │  & Parser   │    │  Databases   │    │  Assistance   │  │
│  └─────────────┘    └──────────────┘    └───────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   Action        │
                    │   Generator     │
                    └─────────────────┘
```

### Agent Workflow

```python
from langgraph.graph import StateGraph, END

class UtilityOptimizeState(TypedDict):
    bills: list[dict]
    usage_analysis: dict
    rate_comparison: dict
    programs_eligible: list
    anomalies: list
    recommendations: list
    action_items: list

def analyze_bills(state: UtilityOptimizeState) -> UtilityOptimizeState:
    """Parse and analyze utility bills"""
    # OCR bill images/PDFs
    # Extract charges, usage, rates
    # Build usage history
    # Detect anomalies
    pass

def compare_rates(state: UtilityOptimizeState) -> UtilityOptimizeState:
    """Compare current rates with alternatives"""
    # Get current plan details
    # Fetch alternative rates
    # Calculate potential savings
    # Consider time-of-use patterns
    pass

def match_programs(state: UtilityOptimizeState) -> UtilityOptimizeState:
    """Find eligible assistance and rebates"""
    # Check income-based programs
    # Find equipment rebates
    # Identify seasonal programs
    # Match by location and utility
    pass

def generate_actions(state: UtilityOptimizeState) -> UtilityOptimizeState:
    """Generate actionable recommendations"""
    # Create dispute letters
    # Draft switch requests
    # Prepare program applications
    pass

workflow = StateGraph(UtilityOptimizeState)
workflow.add_node("analyze", analyze_bills)
workflow.add_node("compare", compare_rates)
workflow.add_node("match", match_programs)
workflow.add_node("actions", generate_actions)

workflow.set_entry_point("analyze")
workflow.add_edge("analyze", "compare")
workflow.add_edge("compare", "match")
workflow.add_edge("match", "actions")
workflow.add_edge("actions", END)
```

---

## Tech Stack (100% Free/Affordable)

### Bill Processing
| Component | Tool | Cost |
|-----------|------|------|
| OCR | **docTR** | Free |
| PDF Parse | **PyMuPDF** | Free |
| Data Extract | **LLM + regex** | Free |

### AI/LLM Layer
| Component | Tool | Cost |
|-----------|------|------|
| Agent Framework | **LangGraph** | Free |
| LLM | **Ollama + Llama 3.1 8B** | Free |
| Anomaly Detection | **Prophet / statsmodels** | Free |
| Embeddings | **all-MiniLM-L6-v2** | Free |

### Data Sources (All Free)
| Source | Data | Access |
|--------|------|--------|
| **EIA Open Data** | Electricity rates by state | Free API |
| **LIHEAP** | Assistance program info | Public |
| **DSIRE** | Rebates and incentives | Free database |
| **Utility websites** | Rate schedules | Public |

### Backend & Storage
| Component | Tool | Cost |
|-----------|------|------|
| Backend | **FastAPI** | Free |
| Database | **SQLite** | Free |
| Time Series | **SQLite + pandas** | Free |
| Scheduler | **APScheduler** | Free |

### Frontend
| Component | Tool | Cost |
|-----------|------|------|
| Framework | **React** | Free |
| Charts | **Recharts** | Free |
| UI | **shadcn/ui** | Free |

---

## Core Features & Implementation

### 1. Bill Parser & Analyzer

```python
import re
from doctr.io import DocumentFile
from doctr.models import ocr_predictor
from datetime import datetime

class BillAnalyzer:
    """Parse and analyze utility bills"""

    # Common utility bill patterns
    BILL_PATTERNS = {
        'account_number': r'Account\s*(?:Number|#|No\.?)?\s*[:.]?\s*(\d{8,15})',
        'service_period': r'Service\s*Period\s*[:.]?\s*(\d{1,2}/\d{1,2}/\d{2,4})\s*[-to]+\s*(\d{1,2}/\d{1,2}/\d{2,4})',
        'total_due': r'(?:Total|Amount)\s*Due\s*[:.]?\s*\$?([\d,]+\.\d{2})',
        'kwh_usage': r'(\d{1,6})\s*kWh',
        'therms': r'(\d{1,6}(?:\.\d+)?)\s*(?:therms?|ccf)',
        'gallons': r'(\d{1,8})\s*(?:gallons?|gal)',
    }

    def __init__(self):
        self.ocr_model = ocr_predictor(pretrained=True)

    def analyze_bill(self, file_path: str, utility_type: str) -> dict:
        """Analyze a single utility bill"""
        # Extract text
        if file_path.endswith('.pdf'):
            text = self.extract_pdf_text(file_path)
        else:
            text = self.ocr_image(file_path)

        # Parse structured data
        bill_data = self.parse_bill_text(text, utility_type)

        # Extract line items
        bill_data['line_items'] = self.extract_line_items(text)

        # Detect potential errors
        bill_data['potential_errors'] = self.detect_errors(bill_data)

        return bill_data

    def parse_bill_text(self, text: str, utility_type: str) -> dict:
        """Extract structured data from bill text"""
        data = {
            'utility_type': utility_type,
            'raw_text': text
        }

        # Extract using patterns
        for field, pattern in self.BILL_PATTERNS.items():
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                data[field] = match.group(1)

        # Use LLM for complex extraction
        llm_data = self.llm_extract_details(text, utility_type)
        data.update(llm_data)

        return data

    def extract_line_items(self, text: str) -> list:
        """Extract individual charges from bill"""
        prompt = f"""
        Extract all line item charges from this utility bill.
        For each charge, identify:
        - description
        - amount
        - type (usage, delivery, tax, fee, other)

        Bill text:
        {text[:3000]}

        Return as JSON array.
        """

        return self.llm_extract(prompt)

    def detect_errors(self, bill_data: dict) -> list:
        """Detect potential billing errors"""
        errors = []

        # Check for common errors
        line_items = bill_data.get('line_items', [])

        # Duplicate charges
        seen = {}
        for item in line_items:
            key = (item['description'].lower(), item['amount'])
            if key in seen:
                errors.append({
                    'type': 'duplicate_charge',
                    'description': f"Possible duplicate: {item['description']} ${item['amount']}",
                    'severity': 'high'
                })
            seen[key] = True

        # Unusual fees
        for item in line_items:
            if item['type'] == 'fee' and item['amount'] > 25:
                errors.append({
                    'type': 'unusual_fee',
                    'description': f"Investigate fee: {item['description']} ${item['amount']}",
                    'severity': 'medium'
                })

        return errors

    def build_usage_history(self, bills: list) -> dict:
        """Build usage history from multiple bills"""
        history = {
            'monthly_usage': [],
            'monthly_cost': [],
            'average_rate': [],
            'dates': []
        }

        for bill in sorted(bills, key=lambda x: x['service_period_start']):
            history['monthly_usage'].append(bill['usage'])
            history['monthly_cost'].append(bill['total_due'])
            history['average_rate'].append(
                bill['total_due'] / max(bill['usage'], 1)
            )
            history['dates'].append(bill['service_period_start'])

        return history
```

### 2. Usage Anomaly Detector

```python
import pandas as pd
import numpy as np
from scipy import stats

class AnomalyDetector:
    """Detect anomalies in utility usage"""

    def detect_anomalies(self, usage_history: dict) -> list:
        """Detect usage and billing anomalies"""
        anomalies = []

        # Convert to pandas
        df = pd.DataFrame({
            'date': pd.to_datetime(usage_history['dates']),
            'usage': usage_history['monthly_usage'],
            'cost': usage_history['monthly_cost'],
            'rate': usage_history['average_rate']
        })

        # Check for usage spikes
        usage_anomalies = self.detect_spikes(df['usage'], 'usage')
        anomalies.extend(usage_anomalies)

        # Check for rate changes
        rate_anomalies = self.detect_rate_changes(df['rate'])
        anomalies.extend(rate_anomalies)

        # Check seasonal patterns
        if len(df) >= 12:
            seasonal_anomalies = self.detect_seasonal_deviation(df)
            anomalies.extend(seasonal_anomalies)

        return anomalies

    def detect_spikes(self, series: pd.Series, metric_name: str) -> list:
        """Detect unusual spikes in data"""
        anomalies = []

        # Calculate z-scores
        z_scores = stats.zscore(series.dropna())

        for i, z in enumerate(z_scores):
            if abs(z) > 2:  # More than 2 standard deviations
                direction = 'spike' if z > 0 else 'drop'
                anomalies.append({
                    'type': f'{metric_name}_{direction}',
                    'index': i,
                    'value': series.iloc[i],
                    'z_score': z,
                    'description': f"Unusual {metric_name} {direction}: {series.iloc[i]:.0f} (expected ~{series.mean():.0f})",
                    'severity': 'high' if abs(z) > 3 else 'medium'
                })

        return anomalies

    def detect_rate_changes(self, rates: pd.Series) -> list:
        """Detect unexpected rate changes"""
        anomalies = []

        for i in range(1, len(rates)):
            pct_change = (rates.iloc[i] - rates.iloc[i-1]) / rates.iloc[i-1] * 100

            if abs(pct_change) > 15:  # More than 15% change
                anomalies.append({
                    'type': 'rate_change',
                    'index': i,
                    'change_percent': pct_change,
                    'description': f"Rate changed by {pct_change:.1f}%: ${rates.iloc[i-1]:.3f} → ${rates.iloc[i]:.3f} per unit",
                    'severity': 'high' if abs(pct_change) > 25 else 'medium'
                })

        return anomalies

    def detect_seasonal_deviation(self, df: pd.DataFrame) -> list:
        """Detect deviations from seasonal patterns"""
        anomalies = []

        # Group by month
        df['month'] = df['date'].dt.month
        monthly_avg = df.groupby('month')['usage'].mean()

        for _, row in df.iterrows():
            expected = monthly_avg[row['month']]
            actual = row['usage']
            deviation = (actual - expected) / expected * 100

            if abs(deviation) > 50:  # 50% deviation from seasonal average
                anomalies.append({
                    'type': 'seasonal_deviation',
                    'date': row['date'],
                    'expected': expected,
                    'actual': actual,
                    'description': f"Usage {deviation:.0f}% {'above' if deviation > 0 else 'below'} seasonal average",
                    'severity': 'medium'
                })

        return anomalies

    def predict_next_bill(self, usage_history: dict) -> dict:
        """Predict next bill based on history"""
        df = pd.DataFrame({
            'date': pd.to_datetime(usage_history['dates']),
            'usage': usage_history['monthly_usage'],
            'cost': usage_history['monthly_cost']
        })

        # Simple seasonal prediction
        df['month'] = df['date'].dt.month
        next_month = (df['date'].iloc[-1].month % 12) + 1

        # Average for that month historically
        month_data = df[df['month'] == next_month]
        if len(month_data) > 0:
            predicted_usage = month_data['usage'].mean()
            predicted_cost = month_data['cost'].mean()
        else:
            predicted_usage = df['usage'].mean()
            predicted_cost = df['cost'].mean()

        return {
            'predicted_usage': predicted_usage,
            'predicted_cost': predicted_cost,
            'confidence': 'high' if len(month_data) >= 2 else 'low'
        }
```

### 3. Rate Comparison Engine

```python
import httpx

class RateComparator:
    """Compare utility rates and find savings"""

    def __init__(self):
        # EIA API for electricity data
        self.eia_base = "https://api.eia.gov/v2"

    def compare_electricity_rates(self, current_bill: dict,
                                   location: dict) -> dict:
        """Compare current electricity rate with alternatives"""
        current_rate = current_bill['average_rate']
        monthly_usage = current_bill['usage']

        # Get state average rates
        state_rates = self.get_state_rates(location['state'])

        # Get available plans in area
        available_plans = self.get_available_plans(
            location['zip'],
            location.get('utility_provider')
        )

        comparisons = []
        for plan in available_plans:
            monthly_cost = self.calculate_plan_cost(plan, monthly_usage)
            current_cost = current_rate * monthly_usage

            savings = current_cost - monthly_cost

            comparisons.append({
                'plan_name': plan['name'],
                'provider': plan['provider'],
                'rate': plan['rate'],
                'monthly_cost': monthly_cost,
                'monthly_savings': savings,
                'yearly_savings': savings * 12,
                'plan_type': plan['type'],  # fixed, variable, time-of-use
                'contract_length': plan.get('contract_months'),
                'green_energy': plan.get('renewable_percent', 0)
            })

        return {
            'current_rate': current_rate,
            'current_monthly': current_rate * monthly_usage,
            'state_average': state_rates['average'],
            'comparisons': sorted(comparisons,
                                 key=lambda x: x['monthly_savings'],
                                 reverse=True),
            'best_savings': comparisons[0] if comparisons else None
        }

    def get_state_rates(self, state: str) -> dict:
        """Get average electricity rates for state from EIA"""
        # EIA API call (free, requires key)
        response = httpx.get(
            f"{self.eia_base}/electricity/retail-sales",
            params={
                'api_key': 'YOUR_EIA_KEY',  # Free from eia.gov
                'frequency': 'monthly',
                'data[0]': 'price',
                'facets[stateid][]': state,
                'sort[0][column]': 'period',
                'sort[0][direction]': 'desc',
                'length': 1
            }
        )

        if response.status_code == 200:
            data = response.json()
            # Extract residential rate
            return {
                'average': data['response']['data'][0]['price'] / 100,  # Convert to $/kWh
                'period': data['response']['data'][0]['period']
            }

        return {'average': 0.12}  # Fallback national average

    def get_available_plans(self, zip_code: str,
                           current_provider: str = None) -> list:
        """Get available electricity plans for location"""
        # In deregulated states, multiple providers compete
        # This would scrape or use APIs from comparison sites

        # Demo data structure
        plans = [
            {
                'name': 'Fixed Rate 12',
                'provider': 'Clean Energy Co',
                'rate': 0.089,
                'type': 'fixed',
                'contract_months': 12,
                'renewable_percent': 100
            },
            {
                'name': 'Variable Green',
                'provider': 'EcoWatts',
                'rate': 0.095,
                'type': 'variable',
                'contract_months': 0,
                'renewable_percent': 50
            },
            {
                'name': 'Time-of-Use Saver',
                'provider': current_provider,
                'rate': 0.07,  # Off-peak rate
                'type': 'time-of-use',
                'peak_rate': 0.15,
                'contract_months': 0
            }
        ]

        return plans

    def calculate_plan_cost(self, plan: dict, monthly_usage: float) -> float:
        """Calculate monthly cost under a plan"""
        if plan['type'] == 'time-of-use':
            # Assume 60% off-peak, 40% peak
            cost = (monthly_usage * 0.6 * plan['rate'] +
                   monthly_usage * 0.4 * plan['peak_rate'])
        else:
            cost = monthly_usage * plan['rate']

        return cost

    def recommend_plan_type(self, usage_pattern: dict) -> str:
        """Recommend plan type based on usage pattern"""
        if usage_pattern.get('works_from_home'):
            return "Variable or fixed - avoid time-of-use if home during peak"
        elif usage_pattern.get('away_during_day'):
            return "Time-of-use could save significantly"
        elif usage_pattern.get('stable_usage'):
            return "Fixed rate for predictability"
        else:
            return "Variable rate for flexibility"
```

### 4. Assistance Program Matcher

```python
class ProgramMatcher:
    """Match users with assistance programs and rebates"""

    # Programs database (would be more comprehensive)
    ASSISTANCE_PROGRAMS = {
        'LIHEAP': {
            'name': 'Low Income Home Energy Assistance Program',
            'type': 'bill_assistance',
            'income_limit_pct': 150,  # % of federal poverty level
            'utilities': ['electric', 'gas', 'oil', 'propane'],
            'federal': True,
            'url': 'https://www.acf.hhs.gov/ocs/programs/liheap'
        },
        'WAP': {
            'name': 'Weatherization Assistance Program',
            'type': 'efficiency',
            'income_limit_pct': 200,
            'services': ['insulation', 'sealing', 'hvac'],
            'federal': True,
            'url': 'https://www.energy.gov/eere/wap'
        },
        'CARE': {
            'name': 'California Alternate Rates for Energy',
            'type': 'discounted_rate',
            'income_limit_pct': 200,
            'states': ['CA'],
            'discount': '20-35% off bill'
        }
    }

    REBATE_PROGRAMS = {
        'heat_pump': {
            'name': 'Heat Pump Rebate (IRA)',
            'type': 'equipment',
            'amount': 'Up to $8,000',
            'income_qualified': True,
            'url': 'https://www.rewiringamerica.org/app/ira-calculator'
        },
        'smart_thermostat': {
            'name': 'Smart Thermostat Rebate',
            'type': 'equipment',
            'amount': '$50-100',
            'source': 'utility',
            'requirements': ['Wi-Fi enabled', 'ENERGY STAR certified']
        },
        'led_bulbs': {
            'name': 'LED Lighting Rebate',
            'type': 'equipment',
            'amount': '$1-5 per bulb',
            'source': 'utility'
        },
        'ev_charger': {
            'name': 'EV Charger Rebate',
            'type': 'equipment',
            'amount': '$300-1,000',
            'source': 'utility_or_state'
        }
    }

    def find_eligible_programs(self, user_profile: dict) -> dict:
        """Find all programs user may be eligible for"""
        eligible = {
            'assistance': [],
            'rebates': [],
            'estimated_value': 0
        }

        # Check assistance programs
        for program_id, program in self.ASSISTANCE_PROGRAMS.items():
            eligibility = self.check_assistance_eligibility(
                program, user_profile
            )
            if eligibility['eligible']:
                program_info = {
                    **program,
                    'id': program_id,
                    'eligibility_notes': eligibility['notes'],
                    'next_steps': self.get_application_steps(program_id)
                }
                eligible['assistance'].append(program_info)

        # Check rebate programs
        for rebate_id, rebate in self.REBATE_PROGRAMS.items():
            if self.check_rebate_availability(rebate, user_profile):
                rebate_info = {
                    **rebate,
                    'id': rebate_id,
                    'how_to_claim': self.get_rebate_steps(rebate_id, user_profile)
                }
                eligible['rebates'].append(rebate_info)

        # Get utility-specific programs
        utility_programs = self.get_utility_programs(
            user_profile['utility_provider'],
            user_profile['state']
        )
        eligible['rebates'].extend(utility_programs)

        # Estimate total value
        eligible['estimated_value'] = self.estimate_total_value(eligible)

        return eligible

    def check_assistance_eligibility(self, program: dict,
                                     user_profile: dict) -> dict:
        """Check if user is eligible for assistance program"""
        # Check state availability
        if 'states' in program:
            if user_profile['state'] not in program['states']:
                return {'eligible': False, 'notes': 'Not available in your state'}

        # Check income
        if 'income_limit_pct' in program:
            fpl = self.get_federal_poverty_level(user_profile['household_size'])
            income_limit = fpl * (program['income_limit_pct'] / 100)

            if user_profile.get('annual_income', float('inf')) <= income_limit:
                return {
                    'eligible': True,
                    'notes': f"Income under {program['income_limit_pct']}% FPL"
                }
            else:
                return {
                    'eligible': False,
                    'notes': f"Income exceeds {program['income_limit_pct']}% FPL limit"
                }

        return {'eligible': True, 'notes': 'Check specific requirements'}

    def get_federal_poverty_level(self, household_size: int) -> float:
        """Get 2024 Federal Poverty Level"""
        # 2024 FPL for 48 contiguous states
        base = 15060
        per_person = 5380
        return base + (per_person * (household_size - 1))

    def get_utility_programs(self, utility: str, state: str) -> list:
        """Get utility-specific rebate programs"""
        # This would query DSIRE database or utility websites
        # Example structure
        return [
            {
                'name': f'{utility} Energy Efficiency Rebates',
                'type': 'utility_program',
                'items': [
                    {'item': 'ENERGY STAR Refrigerator', 'rebate': '$50'},
                    {'item': 'Smart Thermostat', 'rebate': '$75'},
                    {'item': 'Heat Pump Water Heater', 'rebate': '$400'}
                ],
                'url': f'https://{utility.lower().replace(" ", "")}.com/rebates'
            }
        ]

    def get_application_steps(self, program_id: str) -> list:
        """Get steps to apply for assistance program"""
        steps = {
            'LIHEAP': [
                'Contact your local LIHEAP office (find at liheap.org)',
                'Gather required documents: ID, income proof, utility bill',
                'Complete application (online or in-person)',
                'Typical processing time: 2-4 weeks'
            ],
            'WAP': [
                'Contact your state WAP agency',
                'Complete income verification',
                'Schedule home energy audit',
                'Approve recommended improvements'
            ]
        }
        return steps.get(program_id, ['Contact program directly for application process'])

    def estimate_total_value(self, eligible: dict) -> float:
        """Estimate total value of eligible programs"""
        value = 0

        # Assistance programs (estimate annual benefit)
        for program in eligible['assistance']:
            if program['type'] == 'bill_assistance':
                value += 500  # Average LIHEAP benefit
            elif program['type'] == 'discounted_rate':
                value += 300  # Estimated annual discount

        # Rebates (one-time)
        for rebate in eligible['rebates']:
            amount_str = rebate.get('amount', '$0')
            # Extract number from string like "Up to $8,000" or "$50-100"
            import re
            numbers = re.findall(r'\d+', amount_str.replace(',', ''))
            if numbers:
                value += int(numbers[-1])  # Take highest number

        return value
```

### 5. Action Generator

```python
class ActionGenerator:
    """Generate actionable recommendations and documents"""

    def generate_all_actions(self, analysis: dict, comparisons: dict,
                            programs: dict) -> list:
        """Generate all recommended actions"""
        actions = []

        # Anomaly-based actions
        for anomaly in analysis.get('anomalies', []):
            action = self.create_anomaly_action(anomaly)
            if action:
                actions.append(action)

        # Rate switching action
        if comparisons.get('best_savings'):
            best = comparisons['best_savings']
            if best['yearly_savings'] > 100:  # Worth switching
                actions.append({
                    'type': 'switch_provider',
                    'priority': 'high',
                    'potential_savings': best['yearly_savings'],
                    'title': f"Switch to {best['plan_name']}",
                    'description': f"Save ${best['yearly_savings']:.0f}/year by switching to {best['provider']}",
                    'steps': self.get_switch_steps(best),
                    'documents': []
                })

        # Program applications
        for program in programs.get('assistance', []):
            actions.append({
                'type': 'apply_program',
                'priority': 'high' if program['type'] == 'bill_assistance' else 'medium',
                'potential_savings': 500,  # Estimate
                'title': f"Apply for {program['name']}",
                'description': f"You may qualify for {program['name']}",
                'steps': program['next_steps'],
                'documents': self.generate_application_docs(program)
            })

        # Rebate claims
        for rebate in programs.get('rebates', [])[:3]:  # Top 3
            actions.append({
                'type': 'claim_rebate',
                'priority': 'medium',
                'title': f"Claim {rebate['name']}",
                'description': rebate['amount'],
                'steps': rebate.get('how_to_claim', []),
                'documents': []
            })

        return sorted(actions, key=lambda x: x.get('potential_savings', 0),
                     reverse=True)

    def create_anomaly_action(self, anomaly: dict) -> dict:
        """Create action item for detected anomaly"""
        if anomaly['type'] == 'duplicate_charge':
            return {
                'type': 'dispute_bill',
                'priority': 'high',
                'potential_savings': anomaly.get('value', 0),
                'title': 'Dispute duplicate charge',
                'description': anomaly['description'],
                'steps': [
                    'Call utility customer service',
                    'Reference the duplicate charge',
                    'Request credit or refund',
                    'Follow up in writing if needed'
                ],
                'documents': [
                    self.generate_dispute_letter(anomaly)
                ]
            }
        elif anomaly['type'] == 'usage_spike':
            return {
                'type': 'investigate',
                'priority': 'medium',
                'title': 'Investigate usage spike',
                'description': anomaly['description'],
                'steps': [
                    'Check for malfunctioning appliances',
                    'Verify meter reading is correct',
                    'Consider requesting meter test',
                    'Check for leaks (water) or insulation issues'
                ]
            }
        return None

    def generate_dispute_letter(self, anomaly: dict) -> str:
        """Generate letter to dispute billing error"""
        template = """
[Date]

[Utility Company]
Customer Service Department
[Address]

RE: Billing Dispute - Account #[ACCOUNT]

Dear Customer Service,

I am writing to dispute a charge on my recent bill dated [BILL_DATE].

Issue: {description}

Upon reviewing my bill, I identified what appears to be {issue_type}.
I request that you:

1. Review the charge in question
2. Provide an explanation or correction
3. Credit my account for any overcharge

I have attached a copy of my bill with the disputed charge highlighted.

Please respond within 30 days as required by [State] utility regulations.

Sincerely,
[Your Name]
[Contact Information]

Enclosure: Utility bill dated [BILL_DATE]
"""
        return template.format(
            description=anomaly['description'],
            issue_type=anomaly['type'].replace('_', ' ')
        )

    def get_switch_steps(self, plan: dict) -> list:
        """Get steps to switch electricity providers"""
        return [
            f"Visit {plan['provider']} website or call to enroll",
            f"Have your current utility account number ready",
            f"Review contract terms: {plan.get('contract_months', 'N/A')} months",
            "Your current utility will be notified automatically",
            "No service interruption during switch",
            "First bill from new provider in 1-2 billing cycles"
        ]
```

---

## User Interface

### Dashboard View

```
┌─────────────────────────────────────────────────────────────┐
│  UtilityGuard AI                                [Sync Bills]│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Monthly Overview                                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │  Electric       │  │  Gas            │  │  Water      │ │
│  │  $142.50        │  │  $67.30         │  │  $45.20     │ │
│  │  ▲ 12% vs avg   │  │  ✓ Normal       │  │  ✓ Normal   │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
│                                                             │
│  ⚠️  2 Issues Detected                                      │
│  💰 $847/year potential savings found                       │
│                                                             │
│  Usage Trend (12 months)                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │    ╭─╮                                              │   │
│  │   ╭╯ ╰╮     ╭╮                          Electric    │   │
│  │  ╭╯   ╰╮   ╭╯╰╮       ╭─╮                          │   │
│  │ ╭╯     ╰───╯  ╰───────╯ ╰────                      │   │
│  │ J F M A M J J A S O N D                             │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Recommended Actions                                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🔴 Switch to CleanEnergy Fixed Plan                 │   │
│  │    Save $456/year | 5 min to switch                 │   │
│  │    [Start Switch]                                   │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ 🟡 Apply for LIHEAP Assistance                      │   │
│  │    You may qualify for $500+ in bill help           │   │
│  │    [See If Eligible]                                │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ 🟡 Claim Smart Thermostat Rebate                    │   │
│  │    $75 rebate from your utility                     │   │
│  │    [Learn More]                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Bill Analysis View

```
┌─────────────────────────────────────────────────────────────┐
│  Electric Bill Analysis - November 2024           [Upload]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Summary                                                    │
│  ─────────────────────                                     │
│  Total: $142.50                                            │
│  Usage: 892 kWh                                             │
│  Rate: $0.159/kWh                                          │
│  Service Period: Oct 15 - Nov 14                           │
│                                                             │
│  ⚠️  Issues Found                                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ ❌ Rate 23% above state average ($0.129/kWh)        │   │
│  │    → You could save $26/mo with better plan         │   │
│  │                                                     │   │
│  │ ⚠️ Usage 15% higher than same month last year       │   │
│  │    → Check for efficiency issues                    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Charge Breakdown                                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Electricity Supply        892 kWh    $98.12   ✓     │   │
│  │ Delivery Charge                      $28.45   ✓     │   │
│  │ System Benefit Charge                $3.50    ✓     │   │
│  │ State Tax                            $5.23    ✓     │   │
│  │ Customer Service Fee                 $7.20    ⚠️     │   │
│  │ └─ This fee increased 20% this month                │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [Compare Plans]  [Dispute Charge]  [Download Analysis]     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Roadmap

### Phase 1: Bill Processing (Week 1-2)
- [ ] PDF/image OCR pipeline
- [ ] Bill data extraction
- [ ] Line item parsing
- [ ] Multi-utility support (electric, gas, water)

### Phase 2: Analysis Engine (Week 3)
- [ ] Usage history tracking
- [ ] Anomaly detection
- [ ] Error identification
- [ ] Trend analysis

### Phase 3: Rate Comparison (Week 4)
- [ ] EIA API integration
- [ ] Alternative plan database
- [ ] Savings calculations
- [ ] Plan recommendations

### Phase 4: Programs Matcher (Week 5)
- [ ] Assistance program database
- [ ] Eligibility checker
- [ ] Rebate finder
- [ ] Application generators

### Phase 5: Frontend & Demo (Week 6)
- [ ] Dashboard with charts
- [ ] Bill upload and analysis
- [ ] Action items list
- [ ] Demo data

---

## Data Sources

### Free APIs
- **EIA Open Data**: Electricity prices by state
- **Census API**: Income data for eligibility
- **Weather API**: Correlate usage with weather

### Public Databases
- **LIHEAP Clearinghouse**: Assistance program info
- **DSIRE**: Database of State Incentives for Renewables & Efficiency
- **ENERGY STAR**: Certified products

### Scraping (with permission)
- Utility rate schedules
- Provider comparison sites

---

## Demo Strategy

### Sample Data
Create demo with:
- 12 months of electric bills with a spike
- Rate above average
- Eligibility for assistance
- Available rebates

### Live Demo Flow
1. Upload sample utility bill
2. Show automatic parsing
3. Display anomaly detection
4. Run rate comparison
5. Show eligible programs
6. Generate action items

---

## Future Enhancements

1. **Smart meter integration**: Real-time usage monitoring
2. **Automated switching**: Complete switch process
3. **Multi-property**: Manage multiple locations
4. **Solar analysis**: Calculate solar payback
5. **EV integration**: Optimize charging costs

---

## Cost to Run

| Component | Monthly Cost |
|-----------|-------------|
| Hosting (Vercel free) | $0 |
| Database (SQLite) | $0 |
| LLM (Ollama local) | $0 |
| EIA API | $0 |
| **Total** | **$0** |

---

## Key Differentiators

1. **Multi-utility**: Electric, gas, water, internet
2. **Anomaly detection**: Catches errors humans miss
3. **Rate shopping**: Compares actual available plans
4. **Program matching**: Finds money left on the table
5. **Action-oriented**: Generates dispute letters and applications

This project demonstrates practical AI application to a universal need with clear, measurable savings.
