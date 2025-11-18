"""
LLM Provider - Supports multiple free and paid LLM options
"""

import os
from typing import Optional


def get_llm(temperature: float = 0.3):
    """
    Get LLM based on environment configuration

    Supports:
    - ollama: Free local LLMs (Llama, Mistral, etc.)
    - groq: Free cloud tier (very fast)
    - anthropic: Paid (best quality)
    - google: Free tier available
    """
    provider = os.getenv("LLM_PROVIDER", "ollama").lower()

    if provider == "ollama":
        from langchain_community.llms import Ollama

        model = os.getenv("OLLAMA_MODEL", "llama3.1")
        base_url = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")

        return Ollama(
            model=model,
            base_url=base_url,
            temperature=temperature
        )

    elif provider == "groq":
        from langchain_groq import ChatGroq

        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise ValueError("GROQ_API_KEY environment variable required")

        model = os.getenv("GROQ_MODEL", "llama-3.1-70b-versatile")

        return ChatGroq(
            model=model,
            api_key=api_key,
            temperature=temperature
        )

    elif provider == "anthropic":
        from langchain_anthropic import ChatAnthropic

        api_key = os.getenv("ANTHROPIC_API_KEY")
        if not api_key:
            raise ValueError("ANTHROPIC_API_KEY environment variable required")

        return ChatAnthropic(
            model="claude-3-5-sonnet-20241022",
            api_key=api_key,
            temperature=temperature
        )

    elif provider == "google":
        from langchain_google_genai import ChatGoogleGenerativeAI

        api_key = os.getenv("GOOGLE_API_KEY")
        if not api_key:
            raise ValueError("GOOGLE_API_KEY environment variable required")

        return ChatGoogleGenerativeAI(
            model="gemini-1.5-flash",
            google_api_key=api_key,
            temperature=temperature
        )

    else:
        raise ValueError(f"Unknown LLM provider: {provider}. Use: ollama, groq, anthropic, google")


def get_provider_info() -> dict:
    """Get information about current LLM provider"""
    provider = os.getenv("LLM_PROVIDER", "ollama").lower()

    info = {
        "provider": provider,
        "cost": "free" if provider in ["ollama", "groq", "google"] else "paid"
    }

    if provider == "ollama":
        info["model"] = os.getenv("OLLAMA_MODEL", "llama3.1")
        info["base_url"] = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
    elif provider == "groq":
        info["model"] = os.getenv("GROQ_MODEL", "llama-3.1-70b-versatile")
    elif provider == "anthropic":
        info["model"] = "claude-3-5-sonnet-20241022"
    elif provider == "google":
        info["model"] = "gemini-1.5-flash"

    return info
