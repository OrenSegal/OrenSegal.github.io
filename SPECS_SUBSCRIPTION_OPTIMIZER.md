# SubSweep AI - Subscription Optimizer Agent

## Executive Summary

**SubSweep AI** is an autonomous agent that identifies, analyzes, and optimizes all your recurring subscriptions. It connects to financial data, calculates true usage value, and generates cancellation scripts - turning subscription creep into conscious spending.

---

## Value Proposition

### The Problem
- Average American has 12+ active subscriptions
- 42% forget about at least one subscription
- $348/year wasted on unused subscriptions per person
- Cancellation processes are intentionally difficult
- No single view of all recurring charges

### The Solution
An AI agent that:
1. **Discovers** all recurring charges across accounts
2. **Analyzes** usage patterns and value per dollar
3. **Identifies** duplicates and underutilized services
4. **Generates** cancellation scripts and emails
5. **Tracks** savings over time

### Portfolio Impact
- Relatable problem everyone understands
- Clear ROI demonstration
- Shows financial data integration
- Multi-step agentic workflow
- Great for live demos

---

## Technical Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    SubSweep AI Agent                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌──────────────┐    ┌───────────────┐  │
│  │Transaction  │    │  Subscription│    │  Cancellation │  │
│  │  Scanner    │───▶│   Analyzer   │───▶│   Assistant   │  │
│  │   Agent     │    │    Agent     │    │    Agent      │  │
│  └─────────────┘    └──────────────┘    └───────────────┘  │
│         │                  │                    │           │
│         ▼                  ▼                    ▼           │
│  ┌─────────────┐    ┌──────────────┐    ┌───────────────┐  │
│  │   Plaid /   │    │   Usage &    │    │   Script &    │  │
│  │  CSV Parse  │    │   Pricing DB │    │   Email Gen   │  │
│  └─────────────┘    └──────────────┘    └───────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   Savings       │
                    │   Dashboard     │
                    └─────────────────┘
```

### Agent Workflow

```python
from langgraph.graph import StateGraph, END

class SubscriptionState(TypedDict):
    transactions: list
    subscriptions: list[Subscription]
    analysis: list[SubscriptionAnalysis]
    recommendations: list[Recommendation]
    cancellation_scripts: dict

def scan_transactions(state: SubscriptionState) -> SubscriptionState:
    """Identify recurring charges from transaction history"""
    # Pattern matching for recurring charges
    # Group by merchant, amount, frequency
    # Identify subscription services
    pass

def analyze_subscriptions(state: SubscriptionState) -> SubscriptionState:
    """Analyze value and usage of each subscription"""
    # Calculate cost per use
    # Compare to alternatives
    # Check for duplicates/overlap
    # Score value for money
    pass

def generate_recommendations(state: SubscriptionState) -> SubscriptionState:
    """Create actionable recommendations"""
    # Categorize: keep, downgrade, cancel, pause
    # Prioritize by savings potential
    # Consider user preferences
    pass

def create_cancellation_content(state: SubscriptionState) -> SubscriptionState:
    """Generate cancellation emails and call scripts"""
    # Research cancellation process for each service
    # Generate personalized scripts
    # Include retention offer counters
    pass

workflow = StateGraph(SubscriptionState)
workflow.add_node("scan", scan_transactions)
workflow.add_node("analyze", analyze_subscriptions)
workflow.add_node("recommend", generate_recommendations)
workflow.add_node("scripts", create_cancellation_content)

workflow.set_entry_point("scan")
workflow.add_edge("scan", "analyze")
workflow.add_edge("analyze", "recommend")
workflow.add_edge("recommend", "scripts")
workflow.add_edge("scripts", END)
```

---

## Tech Stack (100% Free/Affordable)

### Data Ingestion
| Component | Tool | Cost |
|-----------|------|------|
| Bank Connection | **Plaid** (100 free users) | Free tier |
| Alternative | **CSV Upload** | Free |
| Statement Parse | **Tabula-py** | Free |

### AI/LLM Layer
| Component | Tool | Cost |
|-----------|------|------|
| Agent Framework | **LangGraph** | Free |
| LLM | **Ollama + Llama 3.1 8B** | Free |
| Classification | **Zero-shot classifier** | Free |
| Embeddings | **all-MiniLM-L6-v2** | Free |

### Backend & Storage
| Component | Tool | Cost |
|-----------|------|------|
| Backend | **FastAPI** | Free |
| Database | **SQLite** | Free |
| Caching | **Redis** (or in-memory) | Free |
| Scheduler | **APScheduler** | Free |

### Frontend
| Component | Tool | Cost |
|-----------|------|------|
| Framework | **React** | Free |
| Charts | **Recharts** | Free |
| UI | **Tailwind + shadcn** | Free |
| State | **Zustand** | Free |

---

## Core Features & Implementation

### 1. Transaction Scanner

```python
import pandas as pd
from datetime import datetime, timedelta
from collections import defaultdict

class TransactionScanner:
    """Identify recurring subscriptions from transactions"""

    # Known subscription merchant patterns
    SUBSCRIPTION_PATTERNS = {
        'netflix': {'name': 'Netflix', 'category': 'streaming'},
        'spotify': {'name': 'Spotify', 'category': 'music'},
        'hulu': {'name': 'Hulu', 'category': 'streaming'},
        'amazon prime': {'name': 'Amazon Prime', 'category': 'shopping'},
        'openai': {'name': 'OpenAI/ChatGPT', 'category': 'ai_tools'},
        'adobe': {'name': 'Adobe', 'category': 'software'},
        'microsoft': {'name': 'Microsoft 365', 'category': 'software'},
        'google storage': {'name': 'Google One', 'category': 'storage'},
        'icloud': {'name': 'iCloud', 'category': 'storage'},
        'dropbox': {'name': 'Dropbox', 'category': 'storage'},
        'gym': {'name': 'Gym Membership', 'category': 'fitness'},
        'planet fitness': {'name': 'Planet Fitness', 'category': 'fitness'},
    }

    def scan_for_subscriptions(self, transactions: pd.DataFrame) -> list:
        """Identify recurring charges from transaction history"""
        subscriptions = []

        # Group transactions by merchant
        merchant_groups = self.group_by_merchant(transactions)

        for merchant, txns in merchant_groups.items():
            # Check if recurring (appears multiple times with similar amounts)
            if self.is_recurring(txns):
                subscription = self.create_subscription(merchant, txns)
                subscriptions.append(subscription)

        return subscriptions

    def group_by_merchant(self, transactions: pd.DataFrame) -> dict:
        """Group transactions by normalized merchant name"""
        groups = defaultdict(list)

        for _, txn in transactions.iterrows():
            merchant = self.normalize_merchant(txn['description'])
            groups[merchant].append(txn)

        return groups

    def normalize_merchant(self, description: str) -> str:
        """Normalize merchant names for grouping"""
        description = description.lower()

        # Check known patterns
        for pattern, info in self.SUBSCRIPTION_PATTERNS.items():
            if pattern in description:
                return info['name']

        # Basic normalization for unknown merchants
        # Remove numbers, special chars, standardize
        return self.clean_merchant_name(description)

    def is_recurring(self, transactions: list, min_occurrences: int = 2) -> bool:
        """Determine if transactions represent a subscription"""
        if len(transactions) < min_occurrences:
            return False

        # Check for consistent timing (weekly, monthly, yearly)
        dates = sorted([t['date'] for t in transactions])
        intervals = [(dates[i+1] - dates[i]).days for i in range(len(dates)-1)]

        # Check if intervals are consistent (within tolerance)
        if not intervals:
            return False

        avg_interval = sum(intervals) / len(intervals)

        # Monthly (28-31 days), Yearly (360-370), Weekly (6-8)
        is_monthly = 25 <= avg_interval <= 35
        is_yearly = 350 <= avg_interval <= 380
        is_weekly = 5 <= avg_interval <= 9

        return is_monthly or is_yearly or is_weekly

    def create_subscription(self, merchant: str, transactions: list) -> dict:
        """Create subscription object from transactions"""
        amounts = [t['amount'] for t in transactions]
        dates = [t['date'] for t in transactions]

        return {
            'merchant': merchant,
            'amount': round(sum(amounts) / len(amounts), 2),  # Average
            'frequency': self.detect_frequency(dates),
            'first_seen': min(dates),
            'last_charged': max(dates),
            'total_spent': sum(amounts),
            'charge_count': len(transactions),
            'category': self.categorize(merchant)
        }

    def detect_frequency(self, dates: list) -> str:
        """Detect billing frequency"""
        if len(dates) < 2:
            return 'unknown'

        dates = sorted(dates)
        avg_days = (dates[-1] - dates[0]).days / (len(dates) - 1)

        if avg_days <= 8:
            return 'weekly'
        elif avg_days <= 35:
            return 'monthly'
        elif avg_days <= 100:
            return 'quarterly'
        else:
            return 'yearly'
```

### 2. Subscription Analyzer

```python
class SubscriptionAnalyzer:
    """Analyze value and recommend actions for subscriptions"""

    # Category overlap detection
    OVERLAP_CATEGORIES = {
        'streaming': ['Netflix', 'Hulu', 'Disney+', 'HBO Max', 'Paramount+',
                      'Apple TV+', 'Peacock', 'Amazon Prime Video'],
        'music': ['Spotify', 'Apple Music', 'YouTube Music', 'Tidal', 'Amazon Music'],
        'storage': ['Google One', 'iCloud', 'Dropbox', 'OneDrive'],
        'news': ['NYT', 'WSJ', 'Washington Post', 'The Athletic'],
        'fitness': ['Peloton', 'Apple Fitness+', 'Nike Training', 'Gym'],
    }

    def analyze_all(self, subscriptions: list, usage_data: dict = None) -> list:
        """Analyze all subscriptions and generate insights"""
        analyses = []

        for sub in subscriptions:
            analysis = self.analyze_single(sub, usage_data)
            analyses.append(analysis)

        # Add overlap detection
        overlaps = self.detect_overlaps(subscriptions)

        return {
            'individual': analyses,
            'overlaps': overlaps,
            'total_monthly': self.calculate_monthly_total(subscriptions),
            'total_yearly': self.calculate_yearly_total(subscriptions)
        }

    def analyze_single(self, subscription: dict, usage_data: dict = None) -> dict:
        """Analyze a single subscription"""
        monthly_cost = self.normalize_to_monthly(subscription)

        analysis = {
            'subscription': subscription,
            'monthly_cost': monthly_cost,
            'yearly_cost': monthly_cost * 12,
            'value_score': 0,
            'recommendation': 'keep',
            'reasoning': [],
            'alternatives': [],
            'savings_potential': 0
        }

        # Check usage if available
        if usage_data and subscription['merchant'] in usage_data:
            usage = usage_data[subscription['merchant']]
            cost_per_use = monthly_cost / max(usage['monthly_uses'], 1)
            analysis['cost_per_use'] = cost_per_use
            analysis['usage_frequency'] = usage['monthly_uses']

            # Score based on cost per use
            if cost_per_use > 10:
                analysis['value_score'] -= 30
                analysis['reasoning'].append(f"High cost per use: ${cost_per_use:.2f}")
            elif cost_per_use < 1:
                analysis['value_score'] += 20
                analysis['reasoning'].append(f"Good value: ${cost_per_use:.2f} per use")

        # Check for cheaper alternatives
        alternatives = self.find_alternatives(subscription)
        if alternatives:
            cheapest_alt = min(alternatives, key=lambda x: x['price'])
            if cheapest_alt['price'] < monthly_cost:
                analysis['alternatives'] = alternatives
                analysis['savings_potential'] = monthly_cost - cheapest_alt['price']
                analysis['reasoning'].append(
                    f"Cheaper alternative: {cheapest_alt['name']} at ${cheapest_alt['price']}/mo"
                )

        # Generate recommendation
        analysis['recommendation'] = self.generate_recommendation(analysis)

        return analysis

    def detect_overlaps(self, subscriptions: list) -> list:
        """Detect overlapping/redundant subscriptions"""
        overlaps = []

        for category, services in self.OVERLAP_CATEGORIES.items():
            user_services = [
                s for s in subscriptions
                if s['merchant'] in services
            ]

            if len(user_services) > 1:
                total_cost = sum(
                    self.normalize_to_monthly(s) for s in user_services
                )
                overlaps.append({
                    'category': category,
                    'services': [s['merchant'] for s in user_services],
                    'combined_monthly_cost': total_cost,
                    'recommendation': self.recommend_consolidation(
                        category, user_services
                    )
                })

        return overlaps

    def find_alternatives(self, subscription: dict) -> list:
        """Find cheaper alternatives for a subscription"""
        alternatives_db = {
            'Netflix': [
                {'name': 'Netflix Basic', 'price': 6.99},
                {'name': 'Tubi', 'price': 0},
                {'name': 'Pluto TV', 'price': 0},
            ],
            'Spotify': [
                {'name': 'Spotify Free', 'price': 0},
                {'name': 'YouTube Music Free', 'price': 0},
            ],
            'Adobe Creative Cloud': [
                {'name': 'Affinity Suite', 'price': 0},  # One-time purchase
                {'name': 'Canva Pro', 'price': 12.99},
                {'name': 'GIMP + Inkscape', 'price': 0},
            ],
            'Dropbox': [
                {'name': 'Google Drive 100GB', 'price': 1.99},
                {'name': 'iCloud 50GB', 'price': 0.99},
            ],
        }

        return alternatives_db.get(subscription['merchant'], [])

    def generate_recommendation(self, analysis: dict) -> str:
        """Generate action recommendation"""
        score = analysis['value_score']
        cost = analysis['monthly_cost']
        usage = analysis.get('usage_frequency', 'unknown')

        if usage != 'unknown' and usage == 0:
            return 'cancel'
        elif analysis['savings_potential'] > cost * 0.3:
            return 'switch'
        elif score < -20:
            return 'cancel'
        elif score < 0:
            return 'review'
        else:
            return 'keep'
```

### 3. Cancellation Script Generator

```python
class CancellationAssistant:
    """Generate cancellation emails and call scripts"""

    # Cancellation difficulty and methods
    CANCELLATION_INFO = {
        'Netflix': {
            'difficulty': 'easy',
            'method': 'online',
            'url': 'netflix.com/cancelplan',
            'retention_offers': ['free month', 'downgrade']
        },
        'NYT': {
            'difficulty': 'hard',
            'method': 'phone',
            'phone': '1-800-698-4637',
            'retention_offers': ['50% off 6 months', 'free month'],
            'tips': ['Be firm', 'Cite financial reasons', 'Ask for supervisor']
        },
        'Gym': {
            'difficulty': 'hard',
            'method': 'in_person_or_mail',
            'tips': ['Check contract for cancellation clause',
                    'Send certified mail', 'Document everything']
        },
        'Adobe': {
            'difficulty': 'medium',
            'method': 'chat',
            'url': 'adobe.com/support',
            'retention_offers': ['2 months free', '40% off annual'],
            'tips': ['Early termination fee may apply']
        },
    }

    def generate_cancellation_content(self, subscription: dict, reason: str = 'cost') -> dict:
        """Generate cancellation email and/or call script"""
        merchant = subscription['merchant']
        info = self.CANCELLATION_INFO.get(merchant, {})

        content = {
            'merchant': merchant,
            'method': info.get('method', 'contact_support'),
            'difficulty': info.get('difficulty', 'unknown'),
            'email': None,
            'call_script': None,
            'tips': info.get('tips', []),
            'retention_counters': []
        }

        # Generate appropriate content based on method
        if info.get('method') in ['email', 'online']:
            content['email'] = self.generate_email(subscription, reason)

        if info.get('method') in ['phone', 'chat']:
            content['call_script'] = self.generate_call_script(
                subscription, reason, info.get('retention_offers', [])
            )
            content['retention_counters'] = self.generate_retention_counters(
                info.get('retention_offers', [])
            )

        return content

    def generate_email(self, subscription: dict, reason: str) -> str:
        """Generate cancellation email"""
        templates = {
            'cost': """
Subject: Cancellation Request - Account [ACCOUNT_NUMBER]

Dear {merchant} Support,

I am writing to request the immediate cancellation of my subscription.

Account Details:
- Account Email: [YOUR_EMAIL]
- Billing Amount: ${amount}/month

Reason for Cancellation:
I am canceling due to budget constraints and need to reduce my monthly expenses.

Please confirm:
1. The cancellation has been processed
2. No further charges will be made
3. The date my access will end

If there are any remaining charges or refunds due, please advise.

Thank you for your service.

Best regards,
[YOUR_NAME]
""",
            'not_using': """
Subject: Cancellation Request - Account [ACCOUNT_NUMBER]

Dear {merchant} Support,

I would like to cancel my subscription as I am no longer using the service.

Please process this cancellation immediately and confirm via email.

Account Email: [YOUR_EMAIL]

Thank you,
[YOUR_NAME]
"""
        }

        template = templates.get(reason, templates['cost'])
        return template.format(
            merchant=subscription['merchant'],
            amount=subscription['amount']
        )

    def generate_call_script(self, subscription: dict,
                            reason: str, retention_offers: list) -> str:
        """Generate phone cancellation script"""
        script = f"""
CANCELLATION CALL SCRIPT - {subscription['merchant']}
{'=' * 50}

OPENING:
"Hi, I'd like to cancel my subscription, please."

WHEN ASKED WHY:
"I'm cutting back on expenses and won't be using the service."

IF TRANSFERRED TO RETENTION:
Stay firm. They will try to keep you.

RETENTION OFFER RESPONSES:

"""
        for offer in retention_offers:
            counter = self.generate_retention_counters([offer])[0]
            script += f"""
Offer: "{offer}"
Your Response: "{counter}"

"""

        script += """
CLOSING:
"I appreciate the offers, but I've made my decision.
Please process the cancellation now."

"Can you confirm my cancellation number and that I won't be charged again?"

IMPORTANT:
- Note the representative's name
- Get a confirmation number
- Ask for email confirmation
- Note the time and date of call
"""
        return script

    def generate_retention_counters(self, offers: list) -> list:
        """Generate responses to retention offers"""
        counters = {
            'free month': "Thank you, but a free month doesn't solve my need to reduce ongoing expenses. Please proceed with cancellation.",
            'downgrade': "I've considered that, but I'd rather cancel completely. I can always resubscribe if my situation changes.",
            '50% off 6 months': "I appreciate the offer, but I need to cancel entirely. Even at 50% off, it's still an expense I need to eliminate.",
            '2 months free': "That's generous, but I've made my decision to cancel. Please process it now.",
            '40% off annual': "Thank you, but I don't want to commit to an annual plan. Please cancel my subscription.",
        }

        return [counters.get(offer, f"Thank you, but please proceed with the cancellation.")
                for offer in offers]
```

### 4. Savings Tracker

```python
from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean

class Subscription(Base):
    __tablename__ = 'subscriptions'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    merchant = Column(String)
    amount = Column(Float)
    frequency = Column(String)
    category = Column(String)
    status = Column(String)  # active, cancelled, paused
    cancelled_date = Column(DateTime)

class SavingsTracker:
    """Track savings from cancelled subscriptions"""

    def calculate_savings(self, user_id: int) -> dict:
        """Calculate total savings from cancelled subscriptions"""
        cancelled = Subscription.query.filter_by(
            user_id=user_id,
            status='cancelled'
        ).all()

        total_savings = 0
        monthly_savings = 0
        savings_breakdown = []

        for sub in cancelled:
            months_saved = self.months_since_cancellation(sub.cancelled_date)
            monthly = self.normalize_to_monthly(sub)
            saved = monthly * months_saved

            total_savings += saved
            monthly_savings += monthly

            savings_breakdown.append({
                'merchant': sub.merchant,
                'monthly_was': monthly,
                'months_saved': months_saved,
                'total_saved': saved
            })

        return {
            'total_savings': round(total_savings, 2),
            'monthly_savings': round(monthly_savings, 2),
            'yearly_projection': round(monthly_savings * 12, 2),
            'breakdown': savings_breakdown,
            'subscriptions_cancelled': len(cancelled)
        }

    def generate_savings_report(self, user_id: int) -> str:
        """Generate shareable savings report"""
        savings = self.calculate_savings(user_id)

        report = f"""
🎉 SubSweep Savings Report
{'=' * 40}

Total Saved: ${savings['total_savings']:.2f}
Monthly Savings: ${savings['monthly_savings']:.2f}
Projected Yearly: ${savings['yearly_projection']:.2f}

Subscriptions Cancelled: {savings['subscriptions_cancelled']}

Breakdown:
"""
        for item in savings['breakdown']:
            report += f"  • {item['merchant']}: ${item['total_saved']:.2f}\n"

        return report
```

---

## User Interface

### Dashboard View

```
┌─────────────────────────────────────────────────────────────┐
│  SubSweep AI                                 [Sync Bank]    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │ Monthly Spend   │  │ Potential Save  │  │  Saved So   │ │
│  │    $247/mo      │  │    $89/mo       │  │   Far: $534 │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
│                                                             │
│  ⚠️  2 Overlapping Categories Detected                      │
│                                                             │
│  Active Subscriptions                          [Sort ▼]     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Netflix           $15.49/mo   Streaming    [Keep]   │   │
│  │ Last used: 2 days ago                               │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ Hulu              $17.99/mo   Streaming   [Review]  │   │
│  │ ⚠️ Overlaps with Netflix                             │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ Spotify           $10.99/mo   Music       [Keep]    │   │
│  │ 47 hours listened this month                        │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ Adobe CC          $54.99/mo   Software   [Switch]   │   │
│  │ 💡 Save $42/mo with Affinity (one-time $170)        │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ ClassPass         $49.00/mo   Fitness    [Cancel]   │   │
│  │ ⚠️ 0 uses in last 60 days                           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [📊 View Full Analysis]  [🎯 Get Cancellation Scripts]      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Cancellation Assistant View

```
┌─────────────────────────────────────────────────────────────┐
│  Cancel: ClassPass                              [Back]      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Monthly Cost: $49.00                                       │
│  Total Paid: $588.00 (12 months)                           │
│  Uses: 3 total (😬 $196 per class!)                        │
│                                                             │
│  Cancellation Method: Online Account                        │
│  Difficulty: ⭐⭐ Easy                                       │
│                                                             │
│  Steps:                                                     │
│  1. Log in to classpass.com                                │
│  2. Go to Account Settings                                  │
│  3. Click "Manage Membership"                               │
│  4. Select "Cancel Membership"                              │
│                                                             │
│  ⚠️  They will offer retention deals. Stay firm!            │
│                                                             │
│  Common Retention Offers & Your Responses:                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ "How about 50% off next month?"                     │   │
│  │                                                     │   │
│  │ Your response:                                      │   │
│  │ "Thank you, but I need to cancel entirely.          │   │
│  │  I can resubscribe when my schedule allows."        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [Copy Response]  [Mark as Cancelled]                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Sources

### Transaction Data
- **Plaid API** (100 free users): Direct bank connection
- **CSV Upload**: Manual statement upload
- **Mint Export**: Import from existing Mint data

### Subscription Database
Build a database of known subscriptions:
```python
SUBSCRIPTION_DB = {
    'netflix': {
        'official_name': 'Netflix',
        'category': 'streaming',
        'plans': [
            {'name': 'Standard with ads', 'price': 6.99},
            {'name': 'Standard', 'price': 15.49},
            {'name': 'Premium', 'price': 22.99},
        ],
        'cancellation': {
            'method': 'online',
            'url': 'netflix.com/cancelplan',
            'difficulty': 'easy'
        }
    },
    # ... more services
}
```

### Usage Data (Optional Integrations)
- Streaming: Watch history length
- Music: Listening hours
- Software: App usage time
- Fitness: Check-ins

---

## Implementation Roadmap

### Phase 1: Transaction Scanning (Week 1)
- [ ] CSV upload and parsing
- [ ] Recurring charge detection algorithm
- [ ] Merchant normalization
- [ ] Basic subscription identification

### Phase 2: Analysis Engine (Week 2)
- [ ] Build subscription database
- [ ] Implement value scoring
- [ ] Add overlap detection
- [ ] Create recommendation logic

### Phase 3: Cancellation Content (Week 3)
- [ ] Research cancellation processes
- [ ] Build email templates
- [ ] Create call scripts
- [ ] Add retention counters

### Phase 4: Frontend (Week 4-5)
- [ ] Dashboard with charts
- [ ] Subscription list view
- [ ] Cancellation wizard
- [ ] Savings tracker

### Phase 5: Polish (Week 6)
- [ ] Add demo data
- [ ] Create sample scenarios
- [ ] Record walkthrough
- [ ] Deploy

---

## Demo Strategy

### Sample Scenarios
Create demo accounts showing:
1. "Subscription Hoarder": 15+ subscriptions, many unused
2. "Overlap City": Multiple streaming, storage services
3. "Optimized": Already lean, validates "keep" recommendations

### Live Demo Flow
1. Show sample bank transactions (CSV)
2. Agent scans and identifies 12 subscriptions
3. Highlight overlap detection (3 streaming services)
4. Show unused subscription (gym, 0 visits)
5. Generate cancellation script for hard-to-cancel service
6. Display savings projection

### Metrics to Show
- Subscriptions found vs. user awareness
- Potential monthly/yearly savings
- Cost per use calculations

---

## Privacy Considerations

1. **No stored credentials**: Plaid handles bank auth
2. **Local processing option**: Can run entirely locally
3. **Data deletion**: Clear all data on request
4. **Anonymized demos**: Use synthetic data

---

## Future Enhancements

1. **Automated cancellation**: Agent fills forms/sends emails
2. **Price drop alerts**: Notify of subscription price changes
3. **Trial tracker**: Prevent forgetting free trials
4. **Family plan optimizer**: Consolidate household subscriptions
5. **Negotiate on behalf**: AI calls retention lines

---

## Cost to Run

| Component | Monthly Cost |
|-----------|-------------|
| Hosting (Vercel free) | $0 |
| Database (SQLite) | $0 |
| LLM (Ollama local) | $0 |
| Plaid (100 users) | $0 |
| **Total** | **$0** |

For production with more users:
- Plaid: $0.30/user/month
- Cloud hosting: $5-20/month

---

## Key Differentiators

1. **Beyond discovery**: Not just finding subscriptions, but analyzing value
2. **Actionable output**: Provides actual cancellation scripts
3. **Retention counters**: Prepares users for sales tactics
4. **Savings tracking**: Shows long-term impact
5. **Relatable problem**: Everyone has subscription creep

This project demonstrates practical AI application to a universal problem with clear, measurable results.
