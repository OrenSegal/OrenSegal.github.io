# MeetingMind AI - Intelligent Meeting Preparation Agent

## Executive Summary

**MeetingMind AI** is an autonomous agent that prepares you for meetings by analyzing your calendar, email threads, documents, and participant backgrounds. It generates contextual briefings, talking points, and follow-up actions - turning meeting anxiety into confident preparation.

---

## Value Proposition

### The Problem
- Professionals spend 31 hours/month in unproductive meetings
- 73% of workers do other work during meetings (underprepared)
- Context switching destroys productivity
- Important information buried in email threads
- No time to research participants before meetings

### The Solution
An AI agent that:
1. **Scans** calendar and identifies upcoming meetings
2. **Gathers** context from emails, docs, Slack/Teams
3. **Researches** participants (LinkedIn, company info)
4. **Generates** briefing documents with talking points
5. **Creates** follow-up action items post-meeting

### Portfolio Impact
- Demonstrates enterprise-relevant AI application
- Shows multi-source data integration
- Complex reasoning and summarization
- High value to employers/clients
- Clear productivity ROI

---

## Technical Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                   MeetingMind AI Agent                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌──────────────┐    ┌───────────────┐  │
│  │  Calendar   │    │   Context    │    │   Briefing    │  │
│  │  Scanner    │───▶│   Gatherer   │───▶│   Generator   │  │
│  │   Agent     │    │    Agent     │    │    Agent      │  │
│  └─────────────┘    └──────────────┘    └───────────────┘  │
│         │                  │                    │           │
│         ▼                  ▼                    ▼           │
│  ┌─────────────┐    ┌──────────────┐    ┌───────────────┐  │
│  │  Google/    │    │  Email/Docs/ │    │   LLM +       │  │
│  │  Outlook    │    │  Slack/Web   │    │   Templates   │  │
│  └─────────────┘    └──────────────┘    └───────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   Briefing      │
                    │   Delivery      │
                    └─────────────────┘
```

### Agent Workflow

```python
from langgraph.graph import StateGraph, END

class MeetingPrepState(TypedDict):
    meeting: dict
    participants: list[dict]
    email_context: list[dict]
    document_context: list[dict]
    participant_research: list[dict]
    briefing: str
    talking_points: list[str]
    questions_to_ask: list[str]
    action_items: list[str]

def scan_calendar(state: MeetingPrepState) -> MeetingPrepState:
    """Identify meetings needing preparation"""
    # Get meetings in next 24-48 hours
    # Filter out recurring 1:1s, standup, etc.
    # Prioritize by importance signals
    pass

def gather_context(state: MeetingPrepState) -> MeetingPrepState:
    """Collect relevant emails, docs, messages"""
    # Search emails with participants
    # Find shared documents
    # Check Slack/Teams channels
    # Get recent activity history
    pass

def research_participants(state: MeetingPrepState) -> MeetingPrepState:
    """Gather participant background info"""
    # LinkedIn profiles (public)
    # Company info
    # Recent news mentions
    # Past interaction history
    pass

def generate_briefing(state: MeetingPrepState) -> MeetingPrepState:
    """Create comprehensive meeting briefing"""
    # Summarize context
    # Generate talking points
    # Suggest questions
    # Identify potential objections
    pass

workflow = StateGraph(MeetingPrepState)
workflow.add_node("scan", scan_calendar)
workflow.add_node("gather", gather_context)
workflow.add_node("research", research_participants)
workflow.add_node("brief", generate_briefing)

workflow.set_entry_point("scan")
workflow.add_edge("scan", "gather")
workflow.add_edge("gather", "research")
workflow.add_edge("research", "brief")
workflow.add_edge("brief", END)
```

---

## Tech Stack (100% Free/Affordable)

### Calendar & Email Integration
| Component | Tool | Cost |
|-----------|------|------|
| Google Workspace | **Google APIs** | Free (personal) |
| Microsoft | **Microsoft Graph** | Free tier |
| Alternative | **ICS file import** | Free |

### AI/LLM Layer
| Component | Tool | Cost |
|-----------|------|------|
| Agent Framework | **LangGraph** | Free |
| LLM | **Ollama + Llama 3.1 8B** | Free |
| Cloud LLM | **Groq API** | Free tier |
| Embeddings | **all-MiniLM-L6-v2** | Free |
| RAG | **ChromaDB** | Free |

### Research & Scraping
| Component | Tool | Cost |
|-----------|------|------|
| Web Scraping | **BeautifulSoup + httpx** | Free |
| LinkedIn Public | **Proxycurl free tier** | 10/month |
| Company Info | **Clearbit free** | Free tier |
| News Search | **News API** | Free tier |

### Backend & Storage
| Component | Tool | Cost |
|-----------|------|------|
| Backend | **FastAPI** | Free |
| Database | **SQLite + ChromaDB** | Free |
| Task Scheduling | **APScheduler** | Free |
| Caching | **Redis** | Free |

### Frontend
| Component | Tool | Cost |
|-----------|------|------|
| Framework | **React** | Free |
| UI | **shadcn/ui** | Free |
| Markdown | **react-markdown** | Free |
| PDF Export | **react-pdf** | Free |

---

## Core Features & Implementation

### 1. Calendar Scanner

```python
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from datetime import datetime, timedelta

class CalendarScanner:
    """Scan calendar for meetings needing preparation"""

    # Meeting types that need prep
    PREP_NEEDED = {
        'client_meeting': {'keywords': ['client', 'customer', 'external'],
                          'prep_level': 'high'},
        'interview': {'keywords': ['interview', 'candidate'],
                     'prep_level': 'high'},
        'presentation': {'keywords': ['presentation', 'demo', 'pitch'],
                        'prep_level': 'high'},
        'project_review': {'keywords': ['review', 'sync', 'update'],
                          'prep_level': 'medium'},
        'one_on_one': {'keywords': ['1:1', '1-1', 'one on one'],
                      'prep_level': 'low'},
    }

    def __init__(self, credentials):
        self.service = build('calendar', 'v3', credentials=credentials)

    def get_upcoming_meetings(self, hours_ahead: int = 48) -> list:
        """Get meetings in the next N hours that need prep"""
        now = datetime.utcnow()
        end = now + timedelta(hours=hours_ahead)

        events = self.service.events().list(
            calendarId='primary',
            timeMin=now.isoformat() + 'Z',
            timeMax=end.isoformat() + 'Z',
            singleEvents=True,
            orderBy='startTime'
        ).execute()

        meetings = []
        for event in events.get('items', []):
            # Skip all-day events, personal blocks
            if self.should_prep(event):
                meeting = self.parse_meeting(event)
                meeting['prep_level'] = self.classify_meeting(event)
                meetings.append(meeting)

        return sorted(meetings, key=lambda x: x['prep_priority'], reverse=True)

    def should_prep(self, event: dict) -> bool:
        """Determine if meeting needs preparation"""
        # Skip if no other attendees
        if len(event.get('attendees', [])) == 0:
            return False

        # Skip if marked as "Focus Time" or "OOO"
        if any(skip in event.get('summary', '').lower()
               for skip in ['focus', 'lunch', 'break', 'ooo']):
            return False

        return True

    def classify_meeting(self, event: dict) -> dict:
        """Classify meeting type and prep level"""
        title = event.get('summary', '').lower()
        description = event.get('description', '').lower()
        text = f"{title} {description}"

        for meeting_type, config in self.PREP_NEEDED.items():
            if any(kw in text for kw in config['keywords']):
                return {
                    'type': meeting_type,
                    'prep_level': config['prep_level']
                }

        # Default based on attendee count
        attendee_count = len(event.get('attendees', []))
        if attendee_count > 5:
            return {'type': 'large_meeting', 'prep_level': 'medium'}

        return {'type': 'general', 'prep_level': 'low'}

    def parse_meeting(self, event: dict) -> dict:
        """Parse event into meeting object"""
        attendees = []
        for att in event.get('attendees', []):
            if not att.get('self', False):
                attendees.append({
                    'email': att['email'],
                    'name': att.get('displayName', att['email'].split('@')[0]),
                    'response': att.get('responseStatus', 'needsAction'),
                    'organizer': att.get('organizer', False)
                })

        return {
            'id': event['id'],
            'title': event.get('summary', 'No Title'),
            'start': event['start'].get('dateTime', event['start'].get('date')),
            'end': event['end'].get('dateTime', event['end'].get('date')),
            'description': event.get('description', ''),
            'location': event.get('location', ''),
            'attendees': attendees,
            'meeting_link': self.extract_meeting_link(event),
            'attachments': event.get('attachments', [])
        }

    def extract_meeting_link(self, event: dict) -> str:
        """Extract video meeting link"""
        # Google Meet
        if 'conferenceData' in event:
            for entry in event['conferenceData'].get('entryPoints', []):
                if entry['entryPointType'] == 'video':
                    return entry['uri']

        # Zoom/Teams in description
        description = event.get('description', '')
        import re
        zoom_match = re.search(r'https://[a-z]+\.zoom\.us/j/\d+', description)
        if zoom_match:
            return zoom_match.group()

        teams_match = re.search(r'https://teams\.microsoft\.com/l/meetup-join/[^\s]+', description)
        if teams_match:
            return teams_match.group()

        return ''
```

### 2. Context Gatherer

```python
from datetime import datetime, timedelta
import re

class ContextGatherer:
    """Gather relevant context from emails, docs, and messages"""

    def __init__(self, gmail_service, drive_service):
        self.gmail = gmail_service
        self.drive = drive_service

    def gather_context(self, meeting: dict) -> dict:
        """Gather all relevant context for a meeting"""
        participant_emails = [a['email'] for a in meeting['attendees']]

        context = {
            'emails': self.search_related_emails(
                participant_emails,
                meeting['title'],
                days_back=30
            ),
            'documents': self.find_related_documents(
                participant_emails,
                meeting['title']
            ),
            'calendar_history': self.get_meeting_history(participant_emails),
            'thread_summary': None
        }

        # Summarize email threads
        if context['emails']:
            context['thread_summary'] = self.summarize_threads(context['emails'])

        return context

    def search_related_emails(self, participant_emails: list,
                             meeting_title: str, days_back: int = 30) -> list:
        """Find emails related to meeting participants and topic"""
        emails = []

        # Search by participants
        for email in participant_emails:
            query = f"from:{email} OR to:{email} newer_than:{days_back}d"
            results = self.gmail.users().messages().list(
                userId='me', q=query, maxResults=20
            ).execute()

            for msg in results.get('messages', []):
                full_msg = self.gmail.users().messages().get(
                    userId='me', id=msg['id'], format='full'
                ).execute()
                emails.append(self.parse_email(full_msg))

        # Search by meeting topic keywords
        keywords = self.extract_keywords(meeting_title)
        if keywords:
            query = f"({' OR '.join(keywords)}) newer_than:{days_back}d"
            results = self.gmail.users().messages().list(
                userId='me', q=query, maxResults=10
            ).execute()

            for msg in results.get('messages', []):
                full_msg = self.gmail.users().messages().get(
                    userId='me', id=msg['id'], format='full'
                ).execute()
                emails.append(self.parse_email(full_msg))

        # Deduplicate and sort by date
        seen_ids = set()
        unique_emails = []
        for email in emails:
            if email['id'] not in seen_ids:
                seen_ids.add(email['id'])
                unique_emails.append(email)

        return sorted(unique_emails, key=lambda x: x['date'], reverse=True)

    def find_related_documents(self, participant_emails: list,
                               meeting_title: str) -> list:
        """Find Google Drive documents related to meeting"""
        documents = []

        # Search shared with participants
        for email in participant_emails[:5]:  # Limit to avoid rate limits
            query = f"'{email}' in readers or '{email}' in writers"
            results = self.drive.files().list(
                q=query,
                fields="files(id, name, mimeType, modifiedTime, webViewLink)",
                pageSize=10,
                orderBy="modifiedTime desc"
            ).execute()

            documents.extend(results.get('files', []))

        # Search by meeting title keywords
        keywords = self.extract_keywords(meeting_title)
        if keywords:
            query = ' or '.join([f"name contains '{kw}'" for kw in keywords])
            results = self.drive.files().list(
                q=query,
                fields="files(id, name, mimeType, modifiedTime, webViewLink)",
                pageSize=10,
                orderBy="modifiedTime desc"
            ).execute()

            documents.extend(results.get('files', []))

        # Deduplicate
        seen = set()
        unique_docs = []
        for doc in documents:
            if doc['id'] not in seen:
                seen.add(doc['id'])
                unique_docs.append(doc)

        return unique_docs[:15]  # Return top 15

    def summarize_threads(self, emails: list) -> str:
        """Use LLM to summarize email threads"""
        if not emails:
            return "No relevant email threads found."

        # Group into threads
        threads = self.group_into_threads(emails)

        # Summarize each thread
        summaries = []
        for thread in threads[:5]:  # Top 5 threads
            thread_text = "\n---\n".join([
                f"From: {e['from']}\nDate: {e['date']}\n{e['body'][:1000]}"
                for e in thread
            ])

            summary = self.llm_summarize(
                f"Summarize this email thread concisely, focusing on "
                f"decisions, action items, and open questions:\n\n{thread_text}"
            )
            summaries.append(summary)

        return "\n\n".join(summaries)

    def get_meeting_history(self, participant_emails: list) -> list:
        """Get history of past meetings with these participants"""
        # Search calendar for past meetings
        past_meetings = []

        # This would search past events and return summaries
        # of what was discussed (if notes exist)

        return past_meetings
```

### 3. Participant Researcher

```python
import httpx
from bs4 import BeautifulSoup

class ParticipantResearcher:
    """Research meeting participants for context"""

    def __init__(self, proxycurl_key=None, clearbit_key=None):
        self.proxycurl_key = proxycurl_key
        self.clearbit_key = clearbit_key

    def research_participants(self, attendees: list) -> list:
        """Research all meeting participants"""
        research_results = []

        for attendee in attendees:
            research = {
                'email': attendee['email'],
                'name': attendee['name'],
                'company': self.extract_company(attendee['email']),
                'linkedin': None,
                'role': None,
                'company_info': None,
                'recent_news': None,
                'interaction_history': None
            }

            # Get LinkedIn profile (if available)
            if self.proxycurl_key:
                linkedin_data = self.get_linkedin_profile(attendee['email'])
                if linkedin_data:
                    research['linkedin'] = linkedin_data
                    research['role'] = linkedin_data.get('headline', '')

            # Get company info
            company_domain = attendee['email'].split('@')[1]
            if not self.is_personal_email(company_domain):
                research['company_info'] = self.get_company_info(company_domain)

            # Search for recent news
            research['recent_news'] = self.search_news(
                attendee['name'],
                research['company']
            )

            research_results.append(research)

        return research_results

    def get_linkedin_profile(self, email: str) -> dict:
        """Get LinkedIn profile using Proxycurl"""
        if not self.proxycurl_key:
            return None

        # Use email to LinkedIn lookup
        response = httpx.get(
            'https://nubela.co/proxycurl/api/linkedin/profile/resolve/email',
            params={'email': email, 'lookup_depth': 'superficial'},
            headers={'Authorization': f'Bearer {self.proxycurl_key}'}
        )

        if response.status_code == 200:
            data = response.json()
            return {
                'url': data.get('linkedin_profile_url'),
                'headline': data.get('headline'),
                'summary': data.get('summary', '')[:500],
                'location': data.get('location'),
                'connections': data.get('connections')
            }

        return None

    def get_company_info(self, domain: str) -> dict:
        """Get company information"""
        # Try Clearbit if available
        if self.clearbit_key:
            return self.clearbit_company_lookup(domain)

        # Fallback to basic scraping
        return self.scrape_company_about(domain)

    def clearbit_company_lookup(self, domain: str) -> dict:
        """Lookup company via Clearbit"""
        response = httpx.get(
            f'https://company.clearbit.com/v2/companies/find',
            params={'domain': domain},
            headers={'Authorization': f'Bearer {self.clearbit_key}'}
        )

        if response.status_code == 200:
            data = response.json()
            return {
                'name': data.get('name'),
                'description': data.get('description'),
                'industry': data.get('category', {}).get('industry'),
                'employees': data.get('metrics', {}).get('employees'),
                'founded': data.get('foundedYear'),
                'location': data.get('location'),
                'tech_stack': data.get('tech', [])[:10]
            }

        return None

    def scrape_company_about(self, domain: str) -> dict:
        """Scrape basic company info from website"""
        try:
            response = httpx.get(f'https://{domain}', timeout=5.0)
            soup = BeautifulSoup(response.text, 'html.parser')

            # Get title
            title = soup.find('title')
            title_text = title.string if title else domain

            # Try to find about/description meta
            description = ''
            meta_desc = soup.find('meta', attrs={'name': 'description'})
            if meta_desc:
                description = meta_desc.get('content', '')

            return {
                'name': title_text,
                'description': description[:500],
                'domain': domain
            }

        except Exception:
            return {'domain': domain}

    def search_news(self, person_name: str, company: str) -> list:
        """Search for recent news about person/company"""
        # Using free News API
        query = f'"{person_name}" OR "{company}"'

        try:
            response = httpx.get(
                'https://newsapi.org/v2/everything',
                params={
                    'q': query,
                    'sortBy': 'publishedAt',
                    'pageSize': 5,
                    'apiKey': 'YOUR_FREE_KEY'  # Get free at newsapi.org
                }
            )

            if response.status_code == 200:
                articles = response.json().get('articles', [])
                return [{
                    'title': a['title'],
                    'source': a['source']['name'],
                    'date': a['publishedAt'],
                    'url': a['url']
                } for a in articles[:3]]

        except Exception:
            pass

        return []

    def is_personal_email(self, domain: str) -> bool:
        """Check if email domain is personal"""
        personal_domains = [
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
            'icloud.com', 'aol.com', 'protonmail.com'
        ]
        return domain in personal_domains

    def extract_company(self, email: str) -> str:
        """Extract company name from email domain"""
        domain = email.split('@')[1]
        if self.is_personal_email(domain):
            return ''
        return domain.split('.')[0].title()
```

### 4. Briefing Generator

```python
class BriefingGenerator:
    """Generate comprehensive meeting briefings"""

    def generate_briefing(self, meeting: dict, context: dict,
                         research: list) -> dict:
        """Generate complete meeting briefing"""
        briefing = {
            'meeting': meeting,
            'executive_summary': '',
            'participants': [],
            'context_summary': '',
            'talking_points': [],
            'questions_to_ask': [],
            'potential_objections': [],
            'action_items': [],
            'preparation_checklist': []
        }

        # Generate executive summary
        briefing['executive_summary'] = self.generate_summary(
            meeting, context, research
        )

        # Process participant research
        briefing['participants'] = self.format_participant_cards(research)

        # Generate talking points
        briefing['talking_points'] = self.generate_talking_points(
            meeting, context
        )

        # Generate questions
        briefing['questions_to_ask'] = self.generate_questions(
            meeting, context, research
        )

        # Identify potential objections
        briefing['potential_objections'] = self.identify_objections(
            meeting, context
        )

        # Create preparation checklist
        briefing['preparation_checklist'] = self.create_checklist(
            meeting, context
        )

        return briefing

    def generate_summary(self, meeting: dict, context: dict,
                        research: list) -> str:
        """Generate executive summary of meeting context"""
        prompt = f"""
        Generate a concise executive summary for this meeting:

        Meeting: {meeting['title']}
        Time: {meeting['start']}
        Attendees: {', '.join([a['name'] for a in meeting['attendees']])}

        Email Thread Summary:
        {context.get('thread_summary', 'No email context available')}

        Related Documents:
        {[d['name'] for d in context.get('documents', [])[:5]]}

        Participant Background:
        {self.format_research_for_prompt(research)}

        Create a 2-3 paragraph summary covering:
        1. What this meeting is about
        2. Key stakeholders and their likely perspectives
        3. Important context to remember
        """

        return self.llm_generate(prompt)

    def generate_talking_points(self, meeting: dict, context: dict) -> list:
        """Generate strategic talking points"""
        prompt = f"""
        Generate 5-7 strategic talking points for this meeting:

        Meeting: {meeting['title']}
        Description: {meeting.get('description', '')}

        Email Context:
        {context.get('thread_summary', '')}

        Each talking point should:
        - Be specific and actionable
        - Reference relevant context
        - Help achieve meeting objectives

        Format as a bulleted list.
        """

        response = self.llm_generate(prompt)
        return self.parse_bullet_list(response)

    def generate_questions(self, meeting: dict, context: dict,
                          research: list) -> list:
        """Generate insightful questions to ask"""
        prompt = f"""
        Generate 5 insightful questions to ask in this meeting:

        Meeting: {meeting['title']}
        Attendees: {[a['name'] for a in meeting['attendees']]}

        Context:
        {context.get('thread_summary', '')}

        Questions should:
        - Show preparation and engagement
        - Clarify important points
        - Move discussion forward
        - Be appropriate for the audience

        Format as numbered list.
        """

        response = self.llm_generate(prompt)
        return self.parse_bullet_list(response)

    def identify_objections(self, meeting: dict, context: dict) -> list:
        """Identify potential objections and prepare responses"""
        prompt = f"""
        Based on this meeting context, identify potential objections
        or challenging questions you might face, and suggest responses:

        Meeting: {meeting['title']}
        Context: {context.get('thread_summary', '')}

        For each potential objection:
        - State the objection
        - Explain why it might arise
        - Suggest a response

        List 3-5 potential objections.
        """

        response = self.llm_generate(prompt)
        return self.parse_objections(response)

    def format_participant_cards(self, research: list) -> list:
        """Format participant research into cards"""
        cards = []

        for person in research:
            card = {
                'name': person['name'],
                'email': person['email'],
                'role': person.get('role', ''),
                'company': person.get('company', ''),
                'linkedin_url': person.get('linkedin', {}).get('url', ''),
                'talking_points': [],
                'recent_news': person.get('recent_news', [])
            }

            # Generate person-specific talking points
            if person.get('linkedin') or person.get('company_info'):
                card['talking_points'] = self.generate_person_talking_points(person)

            cards.append(card)

        return cards

    def create_checklist(self, meeting: dict, context: dict) -> list:
        """Create meeting preparation checklist"""
        checklist = [
            {'task': 'Review meeting agenda', 'done': False},
            {'task': 'Check all attendees confirmed', 'done': False},
            {'task': 'Test video/audio setup', 'done': False},
        ]

        # Add document-specific tasks
        for doc in context.get('documents', [])[:3]:
            checklist.append({
                'task': f"Review: {doc['name']}",
                'done': False,
                'link': doc.get('webViewLink', '')
            })

        # Add meeting-type specific tasks
        if 'presentation' in meeting['title'].lower():
            checklist.extend([
                {'task': 'Test screen sharing', 'done': False},
                {'task': 'Prepare backup slides', 'done': False}
            ])

        if 'client' in meeting['title'].lower():
            checklist.extend([
                {'task': 'Review client history', 'done': False},
                {'task': 'Prepare ROI metrics', 'done': False}
            ])

        return checklist
```

### 5. Post-Meeting Action Items

```python
class PostMeetingAgent:
    """Generate follow-up actions after meetings"""

    def process_meeting_notes(self, meeting: dict, notes: str) -> dict:
        """Process meeting notes and generate actions"""
        prompt = f"""
        Analyze these meeting notes and extract:

        Meeting: {meeting['title']}
        Attendees: {[a['name'] for a in meeting['attendees']]}

        Notes:
        {notes}

        Extract:
        1. Key decisions made
        2. Action items (with owner and due date if mentioned)
        3. Open questions/parking lot items
        4. Follow-up meeting needs

        Format as structured JSON.
        """

        result = self.llm_generate(prompt)

        return {
            'decisions': self.extract_decisions(result),
            'action_items': self.extract_actions(result),
            'open_questions': self.extract_questions(result),
            'follow_ups': self.extract_followups(result)
        }

    def generate_summary_email(self, meeting: dict,
                               processed_notes: dict) -> str:
        """Generate follow-up email with meeting summary"""
        prompt = f"""
        Generate a professional follow-up email for this meeting:

        Meeting: {meeting['title']}
        Attendees: {[a['name'] for a in meeting['attendees']]}

        Decisions: {processed_notes['decisions']}
        Action Items: {processed_notes['action_items']}
        Open Questions: {processed_notes['open_questions']}

        Email should:
        - Thank attendees
        - Summarize key decisions
        - List action items with owners
        - Note next steps
        - Be concise and professional
        """

        return self.llm_generate(prompt)

    def create_calendar_followups(self, processed_notes: dict) -> list:
        """Create calendar events for follow-ups"""
        events = []

        for action in processed_notes['action_items']:
            if action.get('due_date'):
                events.append({
                    'title': f"Due: {action['task']}",
                    'date': action['due_date'],
                    'reminder': True
                })

        for followup in processed_notes['follow_ups']:
            events.append({
                'title': followup['meeting_title'],
                'suggested_date': followup.get('suggested_date'),
                'attendees': followup.get('attendees', [])
            })

        return events
```

---

## User Interface

### Daily Briefing View

```
┌─────────────────────────────────────────────────────────────┐
│  MeetingMind AI                        Tuesday, Nov 19      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Today's Meetings                                           │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🔴 HIGH PREP  10:00 AM                              │   │
│  │ Client Review: Acme Corp Q4 Planning                │   │
│  │ with Sarah Chen, Mike Roberts (Acme)                │   │
│  │                                                     │   │
│  │ 📧 12 related emails  📄 3 documents                │   │
│  │                                                     │   │
│  │ [View Briefing]  [Open Prep Checklist]              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🟡 MED PREP  2:00 PM                                │   │
│  │ Product Sync: Feature Prioritization                │   │
│  │ with Dev Team (5 attendees)                         │   │
│  │                                                     │   │
│  │ 📧 8 related emails  📄 1 document                  │   │
│  │                                                     │   │
│  │ [View Briefing]                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Tomorrow (3 meetings needing prep)                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Meeting Briefing View

```
┌─────────────────────────────────────────────────────────────┐
│  Briefing: Client Review - Acme Corp Q4        [Export PDF] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Executive Summary                                          │
│  ─────────────────                                         │
│  Q4 planning session with Acme Corp to review campaign     │
│  performance and set 2024 targets. Sarah Chen (VP Mktg)    │
│  has expressed concerns about CAC in recent emails.        │
│  Mike Roberts (CFO) will be evaluating budget allocation.  │
│  Key focus: demonstrate ROI and propose efficiency gains.  │
│                                                             │
│  Participants                                               │
│  ────────────                                              │
│  ┌─────────────────────────┐ ┌─────────────────────────┐   │
│  │ Sarah Chen              │ │ Mike Roberts            │   │
│  │ VP Marketing, Acme      │ │ CFO, Acme Corp          │   │
│  │ 🔗 LinkedIn             │ │ 🔗 LinkedIn             │   │
│  │                         │ │                         │   │
│  │ Recent: Quoted in       │ │ Note: Joined Acme 6mo   │   │
│  │ AdAge on CAC trends     │ │ ago from Finance role   │   │
│  └─────────────────────────┘ └─────────────────────────┘   │
│                                                             │
│  💬 Talking Points                                          │
│  • Lead with 23% improvement in conversion rate            │
│  • Address CAC concerns: down 15% with new targeting       │
│  • Propose A/B testing budget for Q1                       │
│  • Highlight competitor benchmarking data                  │
│                                                             │
│  ❓ Questions to Ask                                        │
│  • What are Acme's top 3 priorities for 2024?              │
│  • How does finance evaluate marketing ROI?                │
│  • Are there new product launches to support?              │
│                                                             │
│  ⚠️  Potential Objections                                   │
│  • "CAC is still too high" → Show trend + industry comp    │
│  • "Need to cut budget" → Propose efficiency analysis      │
│                                                             │
│  ✅ Prep Checklist                                          │
│  ☐ Review Q3 performance deck                              │
│  ☐ Update ROI calculator with latest data                  │
│  ☐ Prepare competitor analysis slide                       │
│  ☐ Test screen sharing                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Roadmap

### Phase 1: Calendar Integration (Week 1)
- [ ] Google Calendar OAuth flow
- [ ] Meeting parsing and classification
- [ ] Basic meeting list UI
- [ ] Prep level scoring

### Phase 2: Context Gathering (Week 2)
- [ ] Gmail search integration
- [ ] Google Drive document search
- [ ] Email thread summarization
- [ ] Context relevance scoring

### Phase 3: Participant Research (Week 3)
- [ ] Email domain analysis
- [ ] Basic web scraping
- [ ] News API integration
- [ ] Optional LinkedIn integration

### Phase 4: Briefing Generation (Week 4-5)
- [ ] Prompt engineering for briefings
- [ ] Talking points generator
- [ ] Question generator
- [ ] Objection identification

### Phase 5: Frontend & Polish (Week 6)
- [ ] Daily briefing dashboard
- [ ] Meeting detail view
- [ ] PDF export
- [ ] Demo data and walkthrough

---

## Privacy & Security

1. **OAuth scopes**: Request minimal necessary permissions
2. **Data retention**: Clear context after meeting
3. **Local processing**: Option to run LLM locally
4. **No storage**: Don't store participant research
5. **User control**: Always show what data is accessed

---

## Demo Strategy

### Sample Meetings
Create demo calendar with:
1. High-stakes client meeting (full briefing)
2. Job interview (participant research focus)
3. Team sync (lightweight prep)

### Live Demo Flow
1. Show calendar with classified meetings
2. Open high-prep meeting briefing
3. Highlight participant research cards
4. Show talking points and questions
5. Walk through prep checklist
6. Export to PDF

---

## Future Enhancements

1. **Slack/Teams integration**: Pull channel context
2. **CRM integration**: Salesforce/HubSpot history
3. **Real-time coaching**: During-meeting suggestions
4. **Auto note-taking**: Transcription + action extraction
5. **Calendar optimization**: Suggest prep time blocks

---

## Cost to Run

| Component | Monthly Cost |
|-----------|-------------|
| Hosting (Vercel free) | $0 |
| Google APIs (personal) | $0 |
| LLM (Ollama local) | $0 |
| Proxycurl (10 free) | $0 |
| News API (free tier) | $0 |
| **Total** | **$0** |

---

## Key Differentiators

1. **Proactive**: Prepares you before you ask
2. **Contextual**: Synthesizes multiple data sources
3. **Actionable**: Provides talking points, not just summaries
4. **Professional**: Enterprise-ready presentation
5. **Time-saving**: Minutes to prepare, not hours

This project showcases enterprise AI capabilities while solving a universal professional pain point.
