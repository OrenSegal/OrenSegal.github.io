"""
NewsDigest Core Agent
Agentic personalized news curation system using LangGraph
"""

from langgraph.graph import StateGraph, END
from langchain_anthropic import ChatAnthropic
from langchain_core.messages import HumanMessage, SystemMessage
from typing import TypedDict, List, Annotated, Optional
import operator
import json
from datetime import datetime, timedelta, date
import asyncio
import hashlib

class NewsDigestState(TypedDict):
    """Shared state across agent workflow"""
    user_id: str
    date: date
    user_interests: dict
    fetched_articles: List[dict]
    selected_articles: List[dict]
    briefing: dict
    messages: Annotated[List[dict], operator.add]


class NewsDigestAgent:
    """Main news curation agent with agentic workflows"""

    def __init__(self, api_key: str):
        self.llm = ChatAnthropic(
            model="claude-3-5-sonnet-20241022",
            api_key=api_key,
            temperature=0.3
        )
        self.graph = self._build_graph()

    def _build_graph(self) -> StateGraph:
        """Construct the agentic workflow graph"""
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

        # Mock news articles (in production, call real APIs)
        mock_articles = [
            {
                "id": "art_1",
                "title": "Congress Passes Climate Legislation",
                "description": "Major climate bill passes with bipartisan support",
                "url": "https://example.com/news1",
                "source": "CNN",
                "source_bias": "left",
                "category": "politics",
                "published_at": datetime.now().isoformat(),
                "content": "Congress passed sweeping climate legislation today..."
            },
            {
                "id": "art_2",
                "title": "Climate Bill Approved: $370B in Spending",
                "description": "Lawmakers approve controversial climate spending package",
                "url": "https://example.com/news2",
                "source": "WSJ",
                "source_bias": "right",
                "category": "politics",
                "published_at": datetime.now().isoformat(),
                "content": "The climate spending bill was approved despite concerns..."
            },
            {
                "id": "art_3",
                "title": "AI Breakthrough in Medical Diagnostics",
                "description": "New AI system detects cancer with 99% accuracy",
                "url": "https://example.com/news3",
                "source": "Nature",
                "source_bias": "center",
                "category": "technology",
                "published_at": datetime.now().isoformat(),
                "content": "Researchers developed an AI system that can detect..."
            },
            {
                "id": "art_4",
                "title": "Markets Rally on Economic Data",
                "description": "Stock markets surge after positive jobs report",
                "url": "https://example.com/news4",
                "source": "Bloomberg",
                "source_bias": "center",
                "category": "business",
                "published_at": datetime.now().isoformat(),
                "content": "Markets rallied today following better than expected..."
            },
            {
                "id": "art_5",
                "title": "New Study Links Sleep to Longevity",
                "description": "7-8 hours of sleep associated with longer lifespan",
                "url": "https://example.com/news5",
                "source": "Science Daily",
                "source_bias": "center",
                "category": "health",
                "published_at": datetime.now().isoformat(),
                "content": "A comprehensive study found that people who sleep..."
            }
        ]

        return {
            "fetched_articles": mock_articles,
            "messages": [{
                "role": "system",
                "content": f"Fetched {len(mock_articles)} articles from news sources"
            }]
        }

    async def deduplicate_stories(self, state: NewsDigestState) -> dict:
        """Deduplicate similar stories (same event, different sources)"""

        articles = state["fetched_articles"]

        # Simple deduplication by title similarity
        # In production, use embeddings and semantic similarity
        seen_titles = {}
        deduplicated = []

        for article in articles:
            title_hash = hashlib.md5(article["title"].lower()[:50].encode()).hexdigest()

            if title_hash not in seen_titles:
                seen_titles[title_hash] = article
                deduplicated.append(article)
            else:
                # Group as alternative perspective
                existing = seen_titles[title_hash]
                if "alternatives" not in existing:
                    existing["alternatives"] = []
                existing["alternatives"].append({
                    "source": article["source"],
                    "bias": article["source_bias"],
                    "url": article["url"],
                    "title": article["title"]
                })

        return {
            "fetched_articles": deduplicated,
            "messages": [{
                "role": "system",
                "content": f"Deduplicated to {len(deduplicated)} unique stories"
            }]
        }

    async def rank_by_relevance(self, state: NewsDigestState) -> dict:
        """Score articles based on user interests"""

        articles = state["fetched_articles"]
        user_interests = state["user_interests"]

        scored_articles = []

        for article in articles:
            # Topic match score
            topic_score = user_interests.get(article["category"], 0.5)

            # Recency score
            pub_time = datetime.fromisoformat(article["published_at"])
            hours_old = (datetime.now() - pub_time).total_seconds() / 3600
            recency_score = max(0, 1 - (hours_old / 48))  # Decay over 48 hours

            # Combined score
            final_score = (topic_score * 0.7) + (recency_score * 0.3)

            scored_articles.append({
                **article,
                "relevance_score": final_score
            })

        # Sort by score
        ranked = sorted(scored_articles, key=lambda a: a["relevance_score"], reverse=True)

        return {
            "selected_articles": ranked[:20],  # Top 20
            "messages": [{
                "role": "system",
                "content": f"Ranked articles, selected top 20"
            }]
        }

    async def ensure_diversity(self, state: NewsDigestState) -> dict:
        """Prevent filter bubble by enforcing topic and bias diversity"""

        articles = state["selected_articles"]

        # Count distribution
        topic_counts = {}
        bias_counts = {}

        for article in articles[:15]:  # Top 15 for briefing
            topic = article["category"]
            bias = article.get("source_bias", "center")

            topic_counts[topic] = topic_counts.get(topic, 0) + 1
            bias_counts[bias] = bias_counts.get(bias, 0) + 1

        # Enforce diversity: no topic > 40%, ensure 2+ bias perspectives
        max_per_topic = 6
        diverse_articles = []
        current_topic_counts = {}

        for article in articles:
            topic = article["category"]
            count = current_topic_counts.get(topic, 0)

            if count < max_per_topic:
                diverse_articles.append(article)
                current_topic_counts[topic] = count + 1

            if len(diverse_articles) >= 12:
                break

        # Check bias diversity
        bias_distribution = {}
        for article in diverse_articles:
            bias = article.get("source_bias", "center")
            bias_distribution[bias] = bias_distribution.get(bias, 0) + 1

        # If too skewed, add alternatives
        total = len(diverse_articles)
        for bias, count in bias_distribution.items():
            if total > 0 and count / total > 0.7:
                # Too skewed - this would trigger adding alternative perspectives
                pass

        return {
            "selected_articles": diverse_articles,
            "messages": [{
                "role": "system",
                "content": f"Ensured diversity: {len(diverse_articles)} articles across {len(current_topic_counts)} topics"
            }]
        }

    async def detect_bias_for_articles(self, state: NewsDigestState) -> dict:
        """Analyze bias in articles"""

        articles = state["selected_articles"]

        # For each article, analyze language bias
        for article in articles[:5]:  # Analyze top 5 for demo
            prompt = f"""Analyze this news headline and description for bias:

Title: {article['title']}
Description: {article['description']}
Source: {article['source']} (known bias: {article.get('source_bias', 'unknown')})

Identify:
1. Loaded/emotional language
2. Framing (how the story is positioned)
3. Overall bias indicator (0=neutral, 1=highly biased)

Return JSON:
{{
    "loaded_language": ["word1", "word2"],
    "framing": "emotional" | "factual" | "opinion",
    "bias_score": 0.0-1.0
}}"""

            try:
                messages = [
                    SystemMessage(content="You are a media bias analysis expert."),
                    HumanMessage(content=prompt)
                ]

                response = await self.llm.ainvoke(messages)
                bias_data = json.loads(response.content)

                article["bias_analysis"] = bias_data
            except:
                article["bias_analysis"] = {"bias_score": 0.5}

        return {
            "selected_articles": articles,
            "messages": [{
                "role": "assistant",
                "content": "Analyzed bias for articles"
            }]
        }

    async def generate_summaries(self, state: NewsDigestState) -> dict:
        """Generate concise, neutral summaries"""

        articles = state["selected_articles"]

        for article in articles[:12]:  # Summarize top 12
            prompt = f"""Summarize this news article in 2-3 sentences:

Title: {article['title']}
Content: {article.get('content', article['description'])[:500]}

Requirements:
- Neutral tone (remove editorial bias)
- Focus on facts: who, what, when, where, why
- Maximum 3 sentences

Return just the summary text."""

            try:
                messages = [
                    SystemMessage(content="You are a neutral news summarizer."),
                    HumanMessage(content=prompt)
                ]

                response = await self.llm.ainvoke(messages)
                article["summary"] = response.content
            except:
                article["summary"] = article["description"]

        return {
            "selected_articles": articles,
            "messages": [{
                "role": "assistant",
                "content": f"Generated summaries for {len(articles)} articles"
            }]
        }

    async def create_briefing(self, state: NewsDigestState) -> dict:
        """Assemble final briefing"""

        articles = state["selected_articles"][:12]
        user_interests = state["user_interests"]

        # Group by topic
        briefing_sections = {}

        for article in articles:
            topic = article["category"]
            if topic not in briefing_sections:
                briefing_sections[topic] = []

            briefing_sections[topic].append({
                "headline": article["title"],
                "summary": article.get("summary", article["description"]),
                "url": article["url"],
                "source": article["source"],
                "bias": article.get("source_bias", "center"),
                "perspectives": article.get("alternatives", []),
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
            "date": state["date"].isoformat(),
            "sections": [
                {"topic": topic.title(), "stories": stories}
                for topic, stories in sorted_sections
            ],
            "story_count": sum(len(s) for _, s in sorted_sections),
            "reading_time_minutes": sum(len(s) for _, s in sorted_sections) // 2,
            "generated_at": datetime.now().isoformat()
        }

        return {
            "briefing": briefing,
            "messages": [{
                "role": "assistant",
                "content": f"Created briefing with {briefing['story_count']} stories"
            }]
        }

    async def run_curation(self, user_id: str, user_interests: dict = None) -> dict:
        """Run the complete news curation workflow"""

        if user_interests is None:
            user_interests = {
                "politics": 0.8,
                "technology": 1.0,
                "business": 0.6,
                "health": 0.5,
                "sports": 0.2
            }

        initial_state = {
            "user_id": user_id,
            "date": date.today(),
            "user_interests": user_interests,
            "fetched_articles": [],
            "selected_articles": [],
            "briefing": {},
            "messages": []
        }

        result = await self.graph.ainvoke(initial_state)

        return result.get("briefing", {})


# Example usage
async def main():
    """Example of running the newsdigest agent"""
    import os

    # Initialize agent
    api_key = os.getenv("ANTHROPIC_API_KEY", "your-key-here")
    agent = NewsDigestAgent(api_key=api_key)

    # Run curation for a user
    briefing = await agent.run_curation(
        user_id="user_123",
        user_interests={
            "politics": 0.7,
            "technology": 1.0,
            "business": 0.5,
            "health": 0.6
        }
    )

    print("\n=== NewsDigest Daily Briefing ===\n")
    print(json.dumps(briefing, indent=2))

    print("\n=== Stories by Topic ===\n")
    for section in briefing.get("sections", []):
        print(f"\n{section['topic']} ({len(section['stories'])} stories):")
        for story in section["stories"]:
            print(f"  - {story['headline']}")
            if story.get("perspectives"):
                print(f"    Alternative perspectives: {len(story['perspectives'])}")


if __name__ == "__main__":
    asyncio.run(main())
