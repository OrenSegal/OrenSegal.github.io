# NewsDigest - Personalized News Agent
## Complete Technical Specification

---

## 📋 Project Overview

**Tagline**: *"Your AI news curator that fights filter bubbles"*

**The Problem**: News consumption is broken - overwhelming volume, clickbait headlines, algorithmic filter bubbles, no time to stay informed on what actually matters, and media bias makes it hard to get the full picture.

**The Solution**: An agentic AI system that autonomously curates personalized news briefings, detects bias by showing multiple perspectives, tracks stories over time, and adapts to your interests while actively preventing echo chambers.

**One-Liner Pitch**: *"I built an AI news agent that gives me a 5-minute morning briefing, shows the same story from left/right/center sources, and follows developing stories over weeks - it's like having a personal news analyst."*

---

## 🎯 Core Agentic Capabilities

### 1. **Planning & Reasoning**
- Multi-source news aggregation (100+ sources across political spectrum)
- Temporal story tracking (follows stories from breaking → analysis → resolution)
- Personalization with diversity (learns your interests but prevents filter bubbles)
- Depth on demand (can drill into any story for more context)

### 2. **Tool Use & Integration**
- **News APIs**: NewsAPI, RSS feeds, Reddit, Twitter/X
- **Summarization**: Claude for abstractive summaries
- **Bias Analysis**: Political bias classification
- **Text-to-Speech**: ElevenLabs for audio briefings
- **Search**: Tavily for deep-dive research on topics

### 3. **Memory & Learning**
- Reading history (what you actually read vs skip)
- Topic interest graph (clusters related topics)
- Bias exposure tracking (prevents echo chamber)
- Story timeline memory (connects today's news to past context)

### 4. **Reflection & Adaptation**
- Content mix optimization (adjusts topics based on engagement)
- Brevity tuning (learns optimal summary length)
- Timing optimization (when do you actually read the news?)
- Bias balance enforcement (ensures exposure to diverse viewpoints)

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 NewsDigest Agent Core                        │
│                  (LangGraph Workflow)                        │
└───────────────────┬─────────────────────────────────────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
        ▼           ▼           ▼
┌──────────┐  ┌──────────┐  ┌──────────┐
│  News    │  │  Bias    │  │  Story   │
│Aggregator│  │ Detector │  │ Tracker  │
└──────────┘  └──────────┘  └──────────┘
        │           │           │
        └───────────┼───────────┘
                    ▼
        ┌───────────────────────┐
        │   Story Graph DB      │
        │ (PostgreSQL + pgvector)│
        │  + User Preferences   │
        └───────────────────────┘
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
┌──────────┐  ┌──────────┐  ┌──────────┐
│ NewsAPI  │  │   RSS    │  │  Reddit  │
│          │  │  Feeds   │  │  /r/news │
└──────────┘  └──────────┘  └──────────┘
```

---

## 💻 Technical Stack

### **Backend**
- **Language**: Python 3.11+
- **Agent Framework**: LangGraph (agentic workflows)
- **LLM**: Anthropic Claude 3.5 Sonnet (summarization, bias analysis)
- **API Framework**: FastAPI
- **Database**: PostgreSQL 15 + pgvector (story embeddings, similarity search)
- **Cache**: Redis (story deduplication, rate limiting)
- **Task Scheduler**: Celery Beat (hourly news fetches, morning briefing)
- **Search**: Tavily API (deep research)

### **Frontend**
- **Framework**: Next.js 14 (App Router)
- **UI**: shadcn/ui + Tailwind CSS
- **Audio Player**: Howler.js
- **Charts**: Recharts (bias exposure dashboard)
- **Feed Reader**: Custom infinite scroll

### **Integrations**
- **News Sources**:
  - NewsAPI (70+ sources)
  - RSS feeds (custom sources)
  - Reddit API (r/news, r/worldnews)
  - HackerNews API (tech news)
- **Bias Data**: AllSides Media Bias Ratings
- **Text-to-Speech**: ElevenLabs API
- **Summarization**: Claude 3.5 Sonnet
- **Notifications**: Pushover, Email

### **Deployment**
- **Container**: Docker + Docker Compose
- **Hosting**: Railway (backend), Vercel (frontend)
- **Storage**: AWS S3 (audio briefings)
- **Monitoring**: Sentry, Posthog

---

## 🔄 Agentic Workflow Design

### **News Aggregation Agent**

```python
# LangGraph State
class NewsAggregationState(TypedDict):
    user_id: str
    timeframe: str  # "last_24h", "breaking"
    user_interests: List[str]
    fetched_articles: List[Article]
    deduplicated_articles: List[Article]
    ranked_articles: List[Article]

# Workflow Nodes
1. fetch_from_sources() → Multi-source API calls
2. deduplicate() → Use embeddings to find duplicate stories
3. extract_topics() → Classify into topics
4. rank_by_relevance() → Score based on user interests
5. ensure_diversity() → Enforce topic/bias balance
6. generate_briefing() → Create structured digest

# Agent Decision Points
- "Too many politics articles?" → Inject science/tech stories
- "All sources lean left?" → Add center/right perspectives
- "User ignores sports?" → Reduce sports content
```

### **Bias Detection Agent**

```python
# LangGraph Workflow
class BiasDetectionState(TypedDict):
    article: Article
    source_bias: str  # "left", "center", "right"
    language_bias_score: float  # 0-1
    framing_analysis: dict
    related_articles: List[Article]  # Same story, different sources

# Graph Flow
1. lookup_source_bias() → Check AllSides ratings
2. analyze_language() → Detect loaded language, emotional framing
3. find_alternative_perspectives() → Search for same story from opposite bias
4. compare_narratives() → Highlight how framing differs
5. generate_balanced_summary() → Synthesize multiple perspectives

# Example Output
{
  "article_id": "abc123",
  "headline": "Congress Passes Climate Bill",
  "source_bias": "left",
  "language_indicators": ["landmark legislation", "historic victory"],
  "alternative_perspectives": [
    {
      "source": "WSJ",
      "bias": "right",
      "headline": "Congress Approves $370B Climate Spending",
      "framing": ["costly", "government spending"]
    }
  ],
  "balanced_summary": "Congress passed climate legislation with $370B in spending..."
}
```

### **Story Tracking Agent**

```python
# Multi-Day Story Evolution
class StoryTrackingState(TypedDict):
    story_cluster_id: str
    timeline: List[Article]  # Sorted by publish date
    story_arc: str  # "breaking", "developing", "analysis", "resolved"
    key_developments: List[str]
    predicted_next: str

# Agent Steps
1. cluster_related_articles() → Use embeddings to group same story
2. build_timeline() → Sort chronologically
3. extract_developments() → "Day 1: Announced, Day 3: Criticized, Day 5: Revised"
4. synthesize_evolution() → How has narrative changed?
5. predict_next() → "Likely next: Congressional hearing"
6. notify_user() → "Update on story you're following"

# Example: Tracking a Policy Change
Timeline:
- Nov 15: "Policy Proposed" (breaking)
- Nov 17: "Critics Raise Concerns" (developing)
- Nov 20: "Revisions Announced" (developing)
- Nov 22: "Policy Finalized" (resolved)

Agent summary: "The policy underwent two major revisions after initial criticism,
ultimately passing in modified form. Key change: Budget reduced from $500M to $300M."
```

---

## 📊 Database Schema

```sql
-- Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    briefing_time TIME DEFAULT '08:00:00', -- Preferred time for morning digest
    briefing_format VARCHAR(20) DEFAULT 'text', -- 'text', 'audio', 'both'
    created_at TIMESTAMP DEFAULT NOW()
);

-- User Interests (Topic Preferences)
CREATE TABLE user_interests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    topic VARCHAR(100), -- 'politics', 'technology', 'science', 'business'
    weight FLOAT DEFAULT 1.0, -- Interest strength
    updated_at TIMESTAMP DEFAULT NOW()
);

-- News Sources
CREATE TABLE news_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL,
    type VARCHAR(50), -- 'api', 'rss', 'reddit'
    url TEXT,
    bias_rating VARCHAR(20), -- 'left', 'center-left', 'center', 'center-right', 'right'
    reliability_score FLOAT, -- AllSides reliability
    active BOOLEAN DEFAULT TRUE
);

-- Articles
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID REFERENCES news_sources(id),
    title TEXT NOT NULL,
    url TEXT UNIQUE NOT NULL,
    description TEXT,
    content TEXT,
    author VARCHAR(255),
    published_at TIMESTAMP,
    fetched_at TIMESTAMP DEFAULT NOW(),
    category VARCHAR(100),
    embedding VECTOR(1536), -- For semantic search
    sentiment_score FLOAT, -- -1 (negative) to 1 (positive)
    keywords JSONB
);

-- Story Clusters (Group related articles)
CREATE TABLE story_clusters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500), -- Representative headline
    first_seen TIMESTAMP,
    last_updated TIMESTAMP,
    status VARCHAR(50), -- 'breaking', 'developing', 'analysis', 'resolved'
    summary TEXT,
    key_developments JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Article Clusters (Many-to-Many)
CREATE TABLE article_clusters (
    article_id UUID REFERENCES articles(id),
    cluster_id UUID REFERENCES story_clusters(id),
    PRIMARY KEY (article_id, cluster_id)
);

-- Bias Analysis
CREATE TABLE bias_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    article_id UUID REFERENCES articles(id),
    source_bias VARCHAR(20),
    language_bias_score FLOAT, -- 0-1
    loaded_terms JSONB, -- ["landmark", "costly", etc.]
    framing_type VARCHAR(50), -- 'emotional', 'factual', 'opinion'
    analyzed_at TIMESTAMP DEFAULT NOW()
);

-- Alternative Perspectives (Same Story, Different Bias)
CREATE TABLE alternative_perspectives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    article_id UUID REFERENCES articles(id),
    related_article_id UUID REFERENCES articles(id),
    perspective_type VARCHAR(20), -- 'opposite', 'centrist', 'international'
    created_at TIMESTAMP DEFAULT NOW()
);

-- User Reading History
CREATE TABLE reading_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    article_id UUID REFERENCES articles(id),
    read_at TIMESTAMP DEFAULT NOW(),
    time_spent_seconds INTEGER,
    completed BOOLEAN DEFAULT FALSE, -- Did they read to the end?
    rating INTEGER CHECK (rating BETWEEN 1 AND 5) -- Optional feedback
);

-- Daily Briefings
CREATE TABLE briefings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    date DATE NOT NULL,
    format VARCHAR(20), -- 'text', 'audio'
    content TEXT,
    audio_url TEXT, -- S3 link if audio format
    article_ids JSONB, -- List of included article IDs
    sent_at TIMESTAMP,
    opened_at TIMESTAMP,
    UNIQUE(user_id, date)
);

-- Agent Actions
CREATE TABLE agent_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action_type VARCHAR(100), -- 'generated_briefing', 'detected_bias', 'tracked_story'
    data JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_articles_published ON articles(published_at DESC);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_reading_history_user ON reading_history(user_id, read_at DESC);
CREATE INDEX idx_story_clusters_updated ON story_clusters(last_updated DESC);
```

---

## 🔌 API Endpoints

```python
# FastAPI Routes

# 1. Get Personalized Briefing
GET /api/v1/briefing?date=2025-11-18&format=text
Response:
{
  "briefing_id": "uuid",
  "date": "2025-11-18",
  "format": "text",
  "sections": [
    {
      "topic": "Politics",
      "stories": [
        {
          "headline": "Congress Passes Climate Bill",
          "summary": "A 3-sentence neutral summary...",
          "perspectives": [
            {
              "source": "CNN",
              "bias": "left",
              "headline": "Historic Climate Victory",
              "url": "..."
            },
            {
              "source": "WSJ",
              "bias": "right",
              "headline": "$370B Climate Spending Approved",
              "url": "..."
            }
          ],
          "why_included": "Top story in Politics (your #1 interest)"
        }
      ]
    },
    {
      "topic": "Technology",
      "stories": [...]
    }
  ],
  "reading_time_minutes": 5,
  "story_count": 12,
  "audio_url": "https://s3.../briefing-2025-11-18.mp3" // if format=audio
}

# 2. Explore Topic
GET /api/v1/explore/technology?depth=full
# Agent workflow:
# 1. Find top tech stories today
# 2. Fetch related context articles
# 3. Build narrative connecting stories
# 4. Provide "learn more" links

Response:
{
  "topic": "technology",
  "headline": "AI Regulation Heats Up",
  "overview": "Three major developments...",
  "key_stories": [...],
  "background": "This builds on last month's...",
  "what_to_watch": "Next: Senate hearings scheduled for Dec 1"
}

# 3. Follow Story
POST /api/v1/stories/follow
{
  "article_id": "uuid",
  "notify_on_updates": true
}

# Agent creates story cluster, monitors for updates

Response:
{
  "story_cluster_id": "uuid",
  "tracking": true,
  "current_status": "developing",
  "updates_found": 3,
  "timeline": [
    {
      "date": "2025-11-15",
      "headline": "Policy Proposed",
      "source": "NYT"
    },
    {
      "date": "2025-11-17",
      "headline": "Critics Respond",
      "source": "WSJ"
    }
  ]
}

# 4. Bias Dashboard
GET /api/v1/bias/dashboard
# Shows user's exposure to different perspectives

Response:
{
  "last_30_days": {
    "articles_read": 120,
    "bias_distribution": {
      "left": 45,
      "center-left": 20,
      "center": 30,
      "center-right": 15,
      "right": 10
    },
    "diversity_score": 0.72, // 0-1, higher = more diverse
    "recommendations": [
      "You're reading mostly left-leaning sources. Try WSJ, The Economist for balance.",
      "Great diversity this month! Keep it up."
    ]
  },
  "topics": {
    "politics": {
      "articles": 60,
      "bias_balance": "skewed_left",
      "suggestion": "Add Fox News, National Review to your politics feed"
    }
  }
}

# 5. Deep Dive
POST /api/v1/deep-dive
{
  "article_id": "uuid",
  "questions": [
    "What's the background context?",
    "What are the counterarguments?",
    "What happens next?"
  ]
}

# Agent workflow:
# 1. Read original article
# 2. Use Tavily to search for context, counterarguments, predictions
# 3. Synthesize findings
# 4. Return structured response

Response:
{
  "background": "This policy has roots in 2020 legislation...",
  "counterarguments": [
    "Critics argue this will increase costs by...",
    "Economists worry about unintended consequences..."
  ],
  "predictions": "Likely to face legal challenges. Implementation timeline: 6-12 months."
}

# 6. Adjust Preferences
POST /api/v1/preferences
{
  "topics": {
    "politics": 0.8,
    "technology": 1.0,
    "sports": 0.2,
    "entertainment": 0.0
  },
  "briefing_length": "5-7 minutes",
  "diversity_enforcement": true, // Prevent filter bubble
  "breaking_news_alerts": true
}

Response:
{
  "updated": true,
  "preview": "Your next briefing will include 3 tech stories, 2 politics, 1 business..."
}

# 7. Ask About News
POST /api/v1/ask
{
  "question": "What's happening with the climate bill?"
}

# Agentic workflow:
# 1. Search article database for relevant stories
# 2. Retrieve story cluster timeline
# 3. Synthesize answer from multiple sources
# 4. Cite sources

Response:
{
  "answer": "The climate bill passed Congress on Nov 15 with $370B in spending...",
  "sources": [
    {"title": "...", "url": "...", "bias": "left"},
    {"title": "...", "url": "...", "bias": "right"}
  ],
  "timeline": [...],
  "related_questions": [
    "What's in the climate bill?",
    "When does it take effect?",
    "What do critics say?"
  ]
}
```

---

## 🤖 Agent Implementation

### **Core NewsDigest Agent**

```python
# newsdigest/agents/news_agent.py

from langgraph.graph import StateGraph, END
from langchain_anthropic import ChatAnthropic
from typing import TypedDict, List

class NewsDigestState(TypedDict):
    user_id: str
    date: date
    user_interests: dict
    fetched_articles: List[dict]
    selected_articles: List[dict]
    briefing: dict

class NewsDigestAgent:
    def __init__(self):
        self.llm = ChatAnthropic(model="claude-3-5-sonnet-20241022")
        self.graph = self._build_graph()

    def _build_graph(self) -> StateGraph:
        workflow = StateGraph(NewsDigestState)

        # Add nodes
        workflow.add_node("fetch_news", self.fetch_from_all_sources)
        workflow.add_node("deduplicate", self.deduplicate_stories)
        workflow.add_node("rank_relevance", self.rank_by_relevance)
        workflow.add_node("ensure_diversity", self.ensure_diversity)
        workflow.add_node("detect_bias", self.detect_bias_for_articles)
        workflow.add_node("generate_summaries", self.generate_summaries)
        workflow.add_node("create_briefing", self.create_briefing)

        # Define flow
        workflow.set_entry_point("fetch_news")
        workflow.add_edge("fetch_news", "deduplicate")
        workflow.add_edge("deduplicate", "rank_relevance")
        workflow.add_edge("rank_relevance", "ensure_diversity")
        workflow.add_edge("ensure_diversity", "detect_bias")
        workflow.add_edge("detect_bias", "generate_summaries")
        workflow.add_edge("generate_summaries", "create_briefing")
        workflow.add_edge("create_briefing", END)

        return workflow.compile()

    async def fetch_from_all_sources(self, state: NewsDigestState) -> dict:
        """Fetch news from multiple sources"""

        # NewsAPI
        newsapi_articles = await newsapi.get_top_headlines(
            language='en',
            page_size=100
        )

        # RSS Feeds
        rss_articles = []
        for feed_url in RSS_FEEDS:
            articles = await rss_parser.parse(feed_url)
            rss_articles.extend(articles)

        # Reddit
        reddit_posts = await reddit.get_hot('news', limit=50)

        # Combine and normalize format
        all_articles = self._normalize_articles(
            newsapi_articles + rss_articles + reddit_posts
        )

        return {"fetched_articles": all_articles}

    async def deduplicate_stories(self, state: NewsDigestState) -> dict:
        """Use embeddings to find duplicate/similar stories"""

        articles = state["fetched_articles"]

        # Generate embeddings for titles + descriptions
        embeddings = await self._generate_embeddings([
            f"{a['title']} {a['description']}" for a in articles
        ])

        # Store in database with embeddings
        for article, embedding in zip(articles, embeddings):
            await db.upsert_article(article, embedding)

        # Find clusters of similar articles (cosine similarity > 0.85)
        clusters = await db.find_similar_article_clusters(threshold=0.85)

        # Keep best article from each cluster (highest source reliability)
        deduplicated = []
        for cluster in clusters:
            best = max(cluster, key=lambda a: a.source_reliability_score)
            deduplicated.append(best)

        return {"fetched_articles": deduplicated}

    async def rank_by_relevance(self, state: NewsDigestState) -> dict:
        """Score articles based on user interests"""

        articles = state["fetched_articles"]
        user_interests = state["user_interests"]

        # Score each article
        scored_articles = []
        for article in articles:
            # Topic match score
            topic_score = user_interests.get(article['category'], 0.5)

            # Recency score (exponential decay)
            hours_old = (datetime.now() - article['published_at']).total_seconds() / 3600
            recency_score = math.exp(-hours_old / 24)  # Decay over 24 hours

            # Engagement prediction (based on past reading history)
            engagement_score = await self._predict_engagement(state["user_id"], article)

            # Combined score
            final_score = (
                topic_score * 0.5 +
                recency_score * 0.3 +
                engagement_score * 0.2
            )

            scored_articles.append({
                **article,
                "relevance_score": final_score
            })

        # Sort by score
        ranked = sorted(scored_articles, key=lambda a: a['relevance_score'], reverse=True)

        return {"selected_articles": ranked[:50]}  # Top 50

    async def ensure_diversity(self, state: NewsDigestState) -> dict:
        """Prevent filter bubble by enforcing topic and bias diversity"""

        articles = state["selected_articles"]

        # Count current distribution
        topic_counts = {}
        bias_counts = {}

        for article in articles[:20]:  # Top 20 for briefing
            topic_counts[article['category']] = topic_counts.get(article['category'], 0) + 1
            bias_counts[article['source_bias']] = bias_counts.get(article['source_bias'], 0) + 1

        # Enforce diversity rules
        # Rule 1: No topic should be > 50% of briefing
        # Rule 2: Should have at least 2 different bias perspectives

        diverse_articles = []
        topic_limits = {topic: 10 for topic in topic_counts}  # Max 10 per topic

        for article in articles:
            topic = article['category']
            if topic_counts.get(topic, 0) < topic_limits.get(topic, 10):
                diverse_articles.append(article)
                topic_counts[topic] = topic_counts.get(topic, 0) + 1

            if len(diverse_articles) >= 20:
                break

        # Ensure bias diversity
        bias_distribution = {}
        for article in diverse_articles:
            bias = article.get('source_bias', 'center')
            bias_distribution[bias] = bias_distribution.get(bias, 0) + 1

        # If > 70% from one bias, inject alternatives
        total = len(diverse_articles)
        for bias, count in bias_distribution.items():
            if count / total > 0.7:
                # Find underrepresented bias
                underrep_bias = 'center' if bias != 'center' else 'left'
                alternatives = [a for a in articles if a.get('source_bias') == underrep_bias]
                diverse_articles.extend(alternatives[:3])  # Add 3 alternative perspectives

        return {"selected_articles": diverse_articles[:20]}

    async def detect_bias_for_articles(self, state: NewsDigestState) -> dict:
        """Analyze bias and find alternative perspectives"""

        articles = state["selected_articles"]

        for article in articles:
            # Source bias (from database)
            source_bias = await db.get_source_bias(article['source_id'])

            # Language analysis
            prompt = f"""Analyze this news article for bias:

Title: {article['title']}
Description: {article['description']}

Identify:
1. Loaded language (emotional, persuasive words)
2. Framing (how the story is positioned)
3. What perspectives are missing?
4. Overall bias score (0 = neutral, 1 = highly biased)

Return JSON."""

            analysis = await self.llm.ainvoke(prompt)
            bias_data = json.loads(analysis.content)

            # Find alternative perspectives
            alternatives = await self._find_alternative_perspectives(article)

            # Store bias analysis
            await db.create_bias_analysis(
                article_id=article['id'],
                source_bias=source_bias,
                language_bias_score=bias_data['bias_score'],
                loaded_terms=bias_data['loaded_language'],
                framing_type=bias_data['framing']
            )

            # Link alternatives
            for alt in alternatives:
                await db.create_alternative_perspective(
                    article_id=article['id'],
                    related_article_id=alt['id'],
                    perspective_type='opposite' if alt['bias'] != source_bias else 'similar'
                )

        return state

    async def generate_summaries(self, state: NewsDigestState) -> dict:
        """Generate concise, neutral summaries"""

        articles = state["selected_articles"]

        for article in articles:
            prompt = f"""Summarize this news article in 2-3 sentences:

Title: {article['title']}
Content: {article['content'][:1000]}

Requirements:
- Neutral tone (remove bias)
- Focus on facts, not opinions
- Include key who/what/when/where/why
- Maximum 3 sentences

Return just the summary."""

            summary = await self.llm.ainvoke(prompt)
            article['summary'] = summary.content

        return {"selected_articles": articles}

    async def create_briefing(self, state: NewsDigestState) -> dict:
        """Assemble final briefing"""

        articles = state["selected_articles"]
        user_interests = state["user_interests"]

        # Group by topic
        briefing_sections = {}
        for article in articles[:12]:  # Top 12 for briefing
            topic = article['category']
            if topic not in briefing_sections:
                briefing_sections[topic] = []

            # Get alternative perspectives
            alternatives = await db.get_alternative_perspectives(article['id'])

            briefing_sections[topic].append({
                "headline": article['title'],
                "summary": article['summary'],
                "url": article['url'],
                "perspectives": alternatives,
                "why_included": f"Top story in {topic}"
            })

        # Sort sections by user interest
        sorted_sections = sorted(
            briefing_sections.items(),
            key=lambda x: user_interests.get(x[0], 0),
            reverse=True
        )

        briefing = {
            "user_id": state["user_id"],
            "date": state["date"],
            "sections": [
                {"topic": topic, "stories": stories}
                for topic, stories in sorted_sections
            ],
            "story_count": sum(len(s) for _, s in sorted_sections),
            "reading_time_minutes": sum(len(s) for _, s in sorted_sections) // 2
        }

        # Store in database
        await db.create_briefing(briefing)

        return {"briefing": briefing}

    async def _find_alternative_perspectives(self, article: dict) -> List[dict]:
        """Find same story from different bias sources"""

        # Use embedding similarity to find same story
        similar = await db.find_similar_articles(
            article['id'],
            threshold=0.75,
            limit=10
        )

        # Filter for different bias
        alternatives = []
        article_bias = article.get('source_bias', 'center')

        for sim_article in similar:
            if sim_article['source_bias'] != article_bias:
                alternatives.append(sim_article)

        return alternatives
```

### **Story Tracking Agent**

```python
# newsdigest/agents/story_tracker.py

class StoryTrackingAgent:
    """Tracks stories over time"""

    async def create_story_cluster(self, article_id: str):
        """Initialize tracking for a new story"""

        article = await db.get_article(article_id)

        # Create cluster
        cluster = await db.create_story_cluster(
            title=article.title,
            first_seen=article.published_at,
            status='breaking'
        )

        # Link article to cluster
        await db.link_article_to_cluster(article_id, cluster.id)

        return cluster

    async def update_story_clusters(self):
        """Daily job: Find new articles for existing stories"""

        active_clusters = await db.get_active_story_clusters()

        for cluster in active_clusters:
            # Get representative article
            articles = await db.get_cluster_articles(cluster.id)
            seed_article = articles[0]

            # Search for new articles about same story (published today)
            new_articles = await db.find_similar_articles(
                seed_article.id,
                threshold=0.75,
                published_after=datetime.now() - timedelta(days=1)
            )

            # Link new articles to cluster
            for article in new_articles:
                await db.link_article_to_cluster(article.id, cluster.id)

            # Update cluster status
            if len(articles) > 10:
                cluster.status = 'developing'
            elif cluster.last_updated < datetime.now() - timedelta(days=3):
                cluster.status = 'resolved'

            # Extract key developments
            developments = await self._extract_developments(cluster.id)
            await db.update_cluster(cluster.id, key_developments=developments)

    async def _extract_developments(self, cluster_id: str) -> List[str]:
        """Summarize how story evolved"""

        articles = await db.get_cluster_articles(cluster_id)
        articles = sorted(articles, key=lambda a: a.published_at)

        prompt = f"""Analyze how this story evolved over time:

{json.dumps([
    {
        "date": a.published_at.isoformat(),
        "headline": a.title,
        "summary": a.description
    }
    for a in articles
], indent=2)}

Extract key developments as a timeline. Focus on:
- What changed?
- New information revealed
- Policy/decision changes
- Resolution or next steps

Return as JSON array of strings."""

        response = await self.llm.ainvoke(prompt)
        developments = json.loads(response.content)

        return developments
```

---

## 🎨 Frontend Implementation

```typescript
// newsdigest-frontend/app/briefing/page.tsx

export default function DailyBriefing() {
  const [briefing, setBriefing] = useState(null);

  useEffect(() => {
    async function fetchBriefing() {
      const res = await fetch('/api/v1/briefing?date=today&format=text');
      const data = await res.json();
      setBriefing(data);
    }
    fetchBriefing();
  }, []);

  if (!briefing) return <LoadingSpinner />;

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <h1 className="text-4xl font-bold mb-2">Your Daily Briefing</h1>
      <p className="text-gray-600 mb-6">
        {briefing.story_count} stories · {briefing.reading_time_minutes} min read
      </p>

      {/* Audio Player */}
      {briefing.audio_url && (
        <AudioPlayer url={briefing.audio_url} />
      )}

      {/* Sections */}
      {briefing.sections.map(section => (
        <section key={section.topic} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            {getTopicIcon(section.topic)}
            {section.topic}
          </h2>

          {section.stories.map(story => (
            <StoryCard key={story.url} story={story} />
          ))}
        </section>
      ))}
    </div>
  );
}

function StoryCard({ story }) {
  const [showPerspectives, setShowPerspectives] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <h3 className="text-xl font-semibold mb-2">{story.headline}</h3>
      <p className="text-gray-700 mb-4">{story.summary}</p>

      {/* Perspective Toggle */}
      {story.perspectives.length > 0 && (
        <button
          onClick={() => setShowPerspectives(!showPerspectives)}
          className="text-blue-600 hover:underline mb-2"
        >
          {showPerspectives ? 'Hide' : 'Show'} other perspectives ({story.perspectives.length})
        </button>
      )}

      {/* Alternative Perspectives */}
      {showPerspectives && (
        <div className="border-l-4 border-blue-500 pl-4 mt-4">
          {story.perspectives.map(persp => (
            <div key={persp.url} className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium">{persp.source}</span>
                <BiasBadge bias={persp.bias} />
              </div>
              <a
                href={persp.url}
                className="text-blue-600 hover:underline"
                target="_blank"
              >
                {persp.headline}
              </a>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-4 mt-4">
        <a href={story.url} target="_blank" className="text-blue-600 hover:underline">
          Read full article →
        </a>
        <button onClick={() => followStory(story)} className="text-gray-600 hover:text-blue-600">
          Follow this story
        </button>
      </div>
    </div>
  );
}
```

---

## 🚀 Deployment

```yaml
# docker-compose.yml

services:
  backend:
    build: ./newsdigest-backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/newsdigest
      - REDIS_URL=redis://redis:6379
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - NEWSAPI_KEY=${NEWSAPI_KEY}
      - ELEVENLABS_API_KEY=${ELEVENLABS_API_KEY}

  db:
    image: pgvector/pgvector:pg15
    environment:
      - POSTGRES_DB=newsdigest
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine

  celery-beat:
    build: ./newsdigest-backend
    command: celery -A newsdigest.celery beat --loglevel=info
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/newsdigest

volumes:
  postgres_data:
```

---

## 📈 Success Metrics

**Technical**:
- Story deduplication accuracy (> 90%)
- Bias detection precision (> 85%)
- Briefing generation time (< 30s)

**User Impact**:
- Time to stay informed (< 10 min/day)
- Bias exposure diversity score (> 0.7)
- User engagement with alternative perspectives (> 30%)

---

## 🎯 Portfolio Value

**Why This Stands Out**:
1. **Fights filter bubbles**: Actively enforces diverse perspectives
2. **Temporal reasoning**: Tracks stories over days/weeks
3. **Multi-source synthesis**: 100+ sources, deduplicated, ranked
4. **Actionable insights**: Not just headlines, but context and predictions
5. **Personalized yet diverse**: Balances interests with exposure

**Interview Hook**: *"I built an AI that curates my news from 100+ sources, shows me the same story from left/right/center perspectives, and tracks stories over time - it's like having a personal news analyst."*

---

**Build Time**: 2 weeks
**Cost**: $15-30/month
**Difficulty**: ⭐⭐⭐ (Moderate)
**Novelty**: ⭐⭐⭐⭐ (Highly differentiated)
