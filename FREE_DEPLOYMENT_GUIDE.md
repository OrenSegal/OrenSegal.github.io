# Running AI Agents for FREE
## Complete Guide to Zero-Cost Deployment

This guide shows how to run all three AI agents (HealthHub, HomeKeeper, NewsDigest) with **$0/month** costs using local LLMs and free-tier services.

---

## 🆓 Free Stack Overview

| Component | Free Option | Limits | Cost |
|-----------|-------------|--------|------|
| **LLM** | Ollama (local) | Unlimited | $0 |
| **LLM (cloud)** | Groq | 30 req/min, 14,400/day | $0 |
| **Database** | SQLite | Unlimited (local) | $0 |
| **Hosting** | Local / Render | 750 hrs/month | $0 |
| **News API** | RSS feeds | Unlimited | $0 |

---

## 🚀 Option 1: Fully Local (Recommended)

### **Step 1: Install Ollama**

```bash
# macOS
brew install ollama

# Linux
curl -fsSL https://ollama.com/install.sh | sh

# Windows
# Download from https://ollama.com/download
```

### **Step 2: Pull a Model**

```bash
# Best for agentic tasks (7B parameters, runs on 8GB RAM)
ollama pull llama3.1

# Lighter option (3B parameters, runs on 4GB RAM)
ollama pull llama3.2

# Or use Mistral (good balance)
ollama pull mistral
```

### **Step 3: Start Ollama Server**

```bash
ollama serve
# Server runs on http://localhost:11434
```

### **Step 4: Run the Agent**

```bash
cd healthhub-backend
pip install -r requirements.txt

# Set to use Ollama
export LLM_PROVIDER=ollama
export OLLAMA_MODEL=llama3.1

python api/main.py
```

---

## 🌐 Option 2: Free Cloud LLM (Groq)

Groq offers extremely fast inference with a generous free tier.

### **Get Free API Key**

1. Go to https://console.groq.com/
2. Sign up (free)
3. Create API key

### **Run with Groq**

```bash
export LLM_PROVIDER=groq
export GROQ_API_KEY=your-key-here

python api/main.py
```

**Groq Free Limits**:
- 30 requests/minute
- 14,400 requests/day
- Models: Llama 3.1 70B, Mixtral 8x7B

---

## 🔧 Updated Agent Code

Here's the updated agent that supports multiple free LLM providers:

### **LLM Provider Wrapper**

```python
# llm_provider.py - Add to each backend

import os
from langchain_community.llms import Ollama
from langchain_groq import ChatGroq
from langchain_anthropic import ChatAnthropic

def get_llm():
    """Get LLM based on environment configuration"""
    provider = os.getenv("LLM_PROVIDER", "ollama").lower()

    if provider == "ollama":
        model = os.getenv("OLLAMA_MODEL", "llama3.1")
        return Ollama(
            model=model,
            base_url=os.getenv("OLLAMA_BASE_URL", "http://localhost:11434"),
            temperature=0.3
        )

    elif provider == "groq":
        return ChatGroq(
            model=os.getenv("GROQ_MODEL", "llama-3.1-70b-versatile"),
            api_key=os.getenv("GROQ_API_KEY"),
            temperature=0.3
        )

    elif provider == "anthropic":
        return ChatAnthropic(
            model="claude-3-5-sonnet-20241022",
            api_key=os.getenv("ANTHROPIC_API_KEY"),
            temperature=0.3
        )

    else:
        raise ValueError(f"Unknown LLM provider: {provider}")
```

---

## 💾 Free Database: SQLite

Replace PostgreSQL with SQLite for local development:

```python
# database.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# SQLite (free, local)
DATABASE_URL = "sqlite:///./healthhub.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
```

---

## 📰 Free News Sources

Replace NewsAPI ($0 for 100 req/day) with unlimited free RSS feeds:

```python
# Free news sources - no API key needed

RSS_FEEDS = {
    "technology": [
        "https://feeds.arstechnica.com/arstechnica/technology-lab",
        "https://www.theverge.com/rss/index.xml",
        "https://techcrunch.com/feed/",
    ],
    "politics": [
        "https://rss.nytimes.com/services/xml/rss/nyt/Politics.xml",
        "https://feeds.washingtonpost.com/rss/politics",
        "https://feeds.npr.org/1014/rss.xml",
    ],
    "business": [
        "https://feeds.bloomberg.com/markets/news.rss",
        "https://www.economist.com/business/rss.xml",
    ],
    "science": [
        "https://www.sciencedaily.com/rss/all.xml",
        "https://www.nature.com/nature.rss",
    ],
}

# Reddit (free, no API key for read-only)
REDDIT_FEEDS = [
    "https://www.reddit.com/r/news/.rss",
    "https://www.reddit.com/r/worldnews/.rss",
    "https://www.reddit.com/r/technology/.rss",
]
```

---

## 🖥️ Complete Free Setup

### **1. Clone and Setup**

```bash
git clone <your-repo>
cd portfolio

# Choose an agent
cd healthhub-backend

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements-free.txt
```

### **2. Install Ollama + Model**

```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Pull model (choose based on your RAM)
ollama pull llama3.1      # 8GB RAM
# OR
ollama pull llama3.2:3b   # 4GB RAM
# OR
ollama pull phi3          # 2GB RAM (lighter but less capable)

# Start server
ollama serve
```

### **3. Configure Environment**

```bash
# Create .env file
cat > .env << 'EOF'
LLM_PROVIDER=ollama
OLLAMA_MODEL=llama3.1
OLLAMA_BASE_URL=http://localhost:11434
DATABASE_URL=sqlite:///./data.db
EOF
```

### **4. Run the Agent**

```bash
# Load environment
export $(cat .env | xargs)

# Run API server
python api/main.py

# Server starts on http://localhost:8000
```

### **5. Test It**

```bash
# HealthHub
curl "http://localhost:8000/api/v1/insights?user_id=test&timeframe=7d"

# HomeKeeper (port 8001)
curl "http://localhost:8001/api/v1/homes/home_123/dashboard"

# NewsDigest (port 8002)
curl "http://localhost:8002/api/v1/briefing?user_id=test"
```

---

## 📊 Performance Comparison

| Provider | Speed | Quality | Cost | Best For |
|----------|-------|---------|------|----------|
| **Ollama (Llama 3.1 8B)** | ~10 tok/s | Good | $0 | Development, demos |
| **Groq (Llama 3.1 70B)** | ~800 tok/s | Excellent | $0 | Production-like speed |
| **Anthropic Claude** | ~50 tok/s | Best | $3/1M tok | Production |

---

## 🆓 Other Free Alternatives

### **Google AI Studio (Gemini)**
- Free tier: 60 requests/minute
- Good quality, fast

```bash
pip install langchain-google-genai

export LLM_PROVIDER=google
export GOOGLE_API_KEY=your-key
```

### **Hugging Face Inference**
- Limited free tier
- Many model options

```bash
pip install langchain-huggingface

export LLM_PROVIDER=huggingface
export HUGGINGFACE_API_KEY=your-key
```

### **Together AI**
- $25 free credit
- Fast inference

---

## 🚀 Free Deployment Options

### **Option A: Run Locally (Easiest)**
- Just run on your laptop
- Best for development and demos

### **Option B: Render.com (Free Tier)**
- 750 hours/month free
- Spins down after 15 min inactivity

```yaml
# render.yaml
services:
  - type: web
    name: healthhub
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn api.main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: LLM_PROVIDER
        value: groq
      - key: GROQ_API_KEY
        sync: false
```

### **Option C: Railway ($5 Free Credit)**
- Better uptime than Render
- Easy deployment

### **Option D: Fly.io (Free Tier)**
- 3 shared VMs free
- Good for small apps

---

## 🔄 Switching Between Providers

The code is designed to easily switch providers:

```bash
# Development (free, local)
export LLM_PROVIDER=ollama
export OLLAMA_MODEL=llama3.1

# Demo (free, fast cloud)
export LLM_PROVIDER=groq
export GROQ_API_KEY=your-key

# Production (paid, best quality)
export LLM_PROVIDER=anthropic
export ANTHROPIC_API_KEY=your-key
```

---

## 💡 Tips for Free Usage

### **1. Optimize Prompts**
- Shorter prompts = faster responses on local models
- Be specific to reduce back-and-forth

### **2. Cache Responses**
- Cache common queries in Redis/SQLite
- Reduces LLM calls significantly

### **3. Batch Operations**
- Group multiple analyses together
- Run overnight for non-urgent tasks

### **4. Use Smaller Models for Simple Tasks**
- Pattern detection: Llama 3.2 3B (fast)
- Complex reasoning: Llama 3.1 8B
- Summaries: Phi-3 (very fast)

---

## 📱 Minimum Hardware Requirements

| Model | RAM | Disk | Speed |
|-------|-----|------|-------|
| Phi-3 (3.8B) | 4GB | 3GB | Fast |
| Llama 3.2 (3B) | 4GB | 2GB | Fast |
| Llama 3.1 (8B) | 8GB | 5GB | Medium |
| Mistral (7B) | 8GB | 4GB | Medium |

---

## 🎯 Recommended Free Stack

**For Development/Portfolio Demo**:
- LLM: Ollama + Llama 3.1
- Database: SQLite
- News: RSS feeds
- Hosting: Local

**For Shareable Demo**:
- LLM: Groq (free tier)
- Database: Supabase (free tier)
- News: RSS feeds
- Hosting: Render (free tier)

---

## 📝 Summary

**Total Monthly Cost: $0**

| Service | Free Tier |
|---------|-----------|
| Ollama | Unlimited local inference |
| Groq | 14,400 requests/day |
| SQLite | Unlimited local storage |
| RSS Feeds | Unlimited news |
| Render | 750 hours/month |

You can run all three AI agents with professional-quality results at zero cost!

---

## 🚀 Quick Start (Copy-Paste)

```bash
# 1. Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# 2. Pull model
ollama pull llama3.1

# 3. Start Ollama
ollama serve &

# 4. Clone and setup
git clone <your-repo>
cd portfolio/healthhub-backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt

# 5. Configure
export LLM_PROVIDER=ollama
export OLLAMA_MODEL=llama3.1

# 6. Run
python api/main.py

# 7. Test
curl "http://localhost:8000/api/v1/insights?user_id=test&timeframe=7d"
```

That's it! Your AI agent is running for free. 🎉
