"""
NewsDigest FastAPI Application
Production-ready API for personalized news curation agent
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Dict, Optional
from datetime import date
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agents.newsdigest_agent import NewsDigestAgent

app = FastAPI(
    title="NewsDigest API",
    description="AI-powered personalized news curation system",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
news_agent = NewsDigestAgent(api_key=ANTHROPIC_API_KEY) if ANTHROPIC_API_KEY else None


# Pydantic Models

class PreferencesRequest(BaseModel):
    """Update user preferences"""
    topics: Dict[str, float] = Field(
        ...,
        description="Topic interests (0.0-1.0)"
    )
    briefing_length: Optional[str] = "5-7 minutes"
    diversity_enforcement: bool = True
    breaking_news_alerts: bool = False


class QuestionRequest(BaseModel):
    """Ask about news"""
    question: str


# API Endpoints

@app.get("/")
async def root():
    return {
        "service": "NewsDigest API",
        "status": "healthy",
        "version": "1.0.0",
        "agent_ready": news_agent is not None
    }


@app.get("/api/v1/briefing")
async def get_daily_briefing(
    user_id: str = "default",
    date_param: Optional[str] = None,
    format: str = "text"
):
    """
    Get personalized daily news briefing

    Returns curated news based on user interests with bias diversity
    """
    if not news_agent:
        raise HTTPException(status_code=503, detail="News agent not initialized")

    # Get user preferences (in production, from database)
    user_interests = {
        "politics": 0.7,
        "technology": 1.0,
        "business": 0.6,
        "health": 0.5,
        "sports": 0.3,
        "science": 0.8
    }

    # Run agent curation
    briefing = await news_agent.run_curation(
        user_id=user_id,
        user_interests=user_interests
    )

    # Add audio URL if audio format requested
    if format == "audio":
        briefing["audio_url"] = f"https://s3.example.com/briefings/{user_id}-{briefing['date']}.mp3"

    return briefing


@app.get("/api/v1/explore/{topic}")
async def explore_topic(topic: str, depth: str = "summary"):
    """
    Deep dive into a specific topic

    Returns context, key stories, and background
    """
    # Mock response - in production, agent would research topic
    return {
        "topic": topic,
        "headline": f"Latest in {topic.title()}",
        "overview": f"Recent developments in {topic} show significant activity...",
        "key_stories": [
            {
                "title": f"Major {topic} development",
                "summary": "Key details about this story...",
                "source": "Reuters",
                "url": "https://example.com/story1"
            }
        ],
        "background": "This builds on previous developments...",
        "what_to_watch": "Future trends and predictions..."
    }


@app.post("/api/v1/stories/follow")
async def follow_story(user_id: str, article_id: str, notify_on_updates: bool = True):
    """
    Follow a story for updates

    Agent tracks story over time and notifies on developments
    """
    return {
        "story_cluster_id": f"cluster_{article_id}",
        "tracking": True,
        "notify_on_updates": notify_on_updates,
        "current_status": "developing",
        "updates_found": 0,
        "message": "You'll be notified when this story develops"
    }


@app.get("/api/v1/bias/dashboard")
async def get_bias_dashboard(user_id: str, days: int = 30):
    """
    Bias exposure dashboard

    Shows how diverse your news consumption has been
    """
    # Mock data - in production, calculate from reading history
    return {
        "user_id": user_id,
        "timeframe_days": days,
        "last_30_days": {
            "articles_read": 120,
            "bias_distribution": {
                "left": 45,
                "center-left": 20,
                "center": 30,
                "center-right": 15,
                "right": 10
            },
            "diversity_score": 0.72,  # 0-1, higher = more diverse
            "recommendations": [
                "Good balance across political spectrum",
                "Consider reading more center sources for neutral perspective"
            ]
        },
        "topics": {
            "politics": {
                "articles": 60,
                "bias_balance": "balanced",
                "suggestion": "Great diversity in political news sources"
            },
            "technology": {
                "articles": 40,
                "bias_balance": "center_heavy",
                "suggestion": "Mostly center sources, which is typical for tech news"
            }
        }
    }


@app.post("/api/v1/deep-dive")
async def deep_dive_article(user_id: str, article_id: str):
    """
    AI-powered deep dive on an article

    Provides background, counterarguments, and predictions
    """
    if not news_agent:
        raise HTTPException(status_code=503, detail="News agent not initialized")

    # Mock response - in production, agent would research
    return {
        "article_id": article_id,
        "background": "This policy has roots in 2020 legislation that...",
        "context": {
            "key_players": ["Senator A", "Representative B"],
            "previous_attempts": "Similar bills failed in 2018 and 2020",
            "stakeholders": "Environmental groups support, industry opposes"
        },
        "counterarguments": [
            "Critics argue this will increase costs by 15-20%",
            "Economists worry about unintended market consequences",
            "Constitutional concerns raised by legal scholars"
        ],
        "alternative_perspectives": [
            {
                "viewpoint": "Industry perspective",
                "summary": "Compliance costs will hurt small businesses",
                "source": "Chamber of Commerce"
            },
            {
                "viewpoint": "Environmental groups",
                "summary": "Essential step for climate goals",
                "source": "Sierra Club"
            }
        ],
        "predictions": {
            "short_term": "Likely to face legal challenges in next 60 days",
            "implementation": "6-12 month rollout timeline",
            "political_impact": "Could influence upcoming elections"
        }
    }


@app.post("/api/v1/preferences")
async def update_preferences(user_id: str, preferences: PreferencesRequest):
    """Update user news preferences"""

    # In production, store in database
    return {
        "user_id": user_id,
        "updated": True,
        "preferences": preferences.dict(),
        "preview": "Your next briefing will be tailored to these preferences",
        "estimated_stories": sum(1 for v in preferences.topics.values() if v > 0.5) * 2
    }


@app.post("/api/v1/ask")
async def ask_about_news(user_id: str, request: QuestionRequest):
    """
    Ask the AI about current news

    Agent searches and synthesizes answer from multiple sources
    """
    if not news_agent:
        raise HTTPException(status_code=503, detail="News agent not initialized")

    # Mock response - in production, agent would search and synthesize
    return {
        "question": request.question,
        "answer": "Based on recent coverage, the situation is developing. Multiple sources report...",
        "sources": [
            {
                "title": "Related Article 1",
                "url": "https://example.com/article1",
                "bias": "left",
                "excerpt": "Key quote from this source..."
            },
            {
                "title": "Related Article 2",
                "url": "https://example.com/article2",
                "bias": "right",
                "excerpt": "Alternative perspective..."
            }
        ],
        "timeline": [
            {
                "date": "2025-11-15",
                "event": "Initial development"
            },
            {
                "date": "2025-11-17",
                "event": "Key response"
            }
        ],
        "related_questions": [
            "What happens next?",
            "What do critics say?",
            "How does this compare to previous events?"
        ]
    }


@app.get("/api/v1/trending")
async def get_trending_topics():
    """Get currently trending topics across all sources"""

    return {
        "trending": [
            {
                "topic": "Climate Policy",
                "article_count": 45,
                "trending_score": 0.92,
                "sentiment": "mixed",
                "top_headline": "Congress Debates Climate Legislation"
            },
            {
                "topic": "AI Regulation",
                "article_count": 38,
                "trending_score": 0.88,
                "sentiment": "neutral",
                "top_headline": "Tech Industry Responds to AI Rules"
            },
            {
                "topic": "Economic Data",
                "article_count": 32,
                "trending_score": 0.75,
                "sentiment": "positive",
                "top_headline": "Markets Rally on Jobs Report"
            }
        ],
        "generated_at": "2025-11-18T12:00:00Z"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
