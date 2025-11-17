# 🎨 Spotify Genes Frontend - Complete Implementation Guide

## Overview
Beautiful, interactive Next.js frontend with D3.js visualizations for the Spotify Genes project.

---

## Tech Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **D3.js** (visualizations)
- **Recharts** (charts library)
- **Framer Motion** (animations)

---

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Landing page
│   │   ├── auth/
│   │   │   └── callback/
│   │   │       └── page.tsx        # OAuth callback
│   │   ├── analyze/
│   │   │   └── page.tsx            # Analysis loading page
│   │   └── results/
│   │       └── page.tsx            # Results dashboard
│   ├── components/
│   │   ├── GenomeChart.tsx         # Radial genome visualization
│   │   ├── PersonalityProfile.tsx  # Big 5 traits display
│   │   ├── CompanyMatches.tsx      # Top company matches
│   │   ├── PlaylistGenerator.tsx   # Work mode playlists
│   │   └── LoadingAnimation.tsx    # Analysis loading state
│   ├── lib/
│   │   ├── api.ts                  # API client
│   │   ├── types.ts                # TypeScript types
│   │   └── utils.ts                # Utility functions
│   └── styles/
│       └── globals.css             # Global styles
├── public/
│   └── assets/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

---

## Implementation

### **1. Landing Page (`app/page.tsx`)**

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    // Redirect to Spotify OAuth
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/spotify`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Hero Section */}
          <h1 className="text-6xl font-bold text-white mb-6">
            Discover Your<br />
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Musical DNA
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Analyze your Spotify listening history to uncover your personality traits
            and find companies where you'll thrive based on musical culture fit.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <FeatureCard
              icon="🎵"
              title="Musical Genome"
              description="Deep analysis of your listening patterns, energy, and complexity preferences"
            />
            <FeatureCard
              icon="🧠"
              title="Personality Insights"
              description="Infer Big 5 personality traits from your musical taste"
            />
            <FeatureCard
              icon="🏢"
              title="Company Matching"
              description="Find companies where employees share your musical DNA"
            />
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleConnect}
            disabled={isLoading}
            className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold rounded-full shadow-lg transition-all disabled:opacity-50"
          >
            {isLoading ? 'Connecting...' : 'Connect Spotify'}
          </motion.button>

          <p className="text-sm text-gray-400 mt-4">
            We only read your listening history. No posting or modifications.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </motion.div>
  );
}
```

### **2. Results Dashboard (`app/results/page.tsx`)**

```typescript
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GenomeChart from '@/components/GenomeChart';
import PersonalityProfile from '@/components/PersonalityProfile';
import CompanyMatches from '@/components/CompanyMatches';
import PlaylistGenerator from '@/components/PlaylistGenerator';
import { getAnalysisResults } from '@/lib/api';
import type { AnalysisResult } from '@/lib/types';

export default function ResultsPage() {
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      const data = await getAnalysisResults();
      setResults(data);
    } catch (error) {
      console.error('Failed to load results:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (!results) {
    return <ErrorState />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Your Musical DNA Analysis
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Based on your Spotify listening history
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Musical Genome Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GenomeChart genome={results.musical_genome} />
          </motion.div>

          {/* Personality Profile */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <PersonalityProfile personality={results.personality} />
          </motion.div>
        </div>

        {/* Company Matches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <CompanyMatches matches={results.company_matches} />
        </motion.div>

        {/* Playlist Generator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12"
        >
          <PlaylistGenerator genome={results.musical_genome} />
        </motion.div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">Analyzing your musical DNA...</p>
      </div>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
        <p className="text-gray-600 mb-4">We couldn't load your analysis results.</p>
        <button
          onClick={() => window.location.href = '/'}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
```

### **3. Genome Chart Component (`components/GenomeChart.tsx`)**

```typescript
'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { MusicalGenome } from '@/lib/types';

interface GenomeChartProps {
  genome: MusicalGenome;
}

export default function GenomeChart({ genome }: GenomeChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    renderChart();
  }, [genome]);

  const renderChart = () => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous

    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2 - 40;

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Prepare data
    const data = [
      { trait: 'Energy', value: genome.energy_profile.mean_energy },
      { trait: 'Valence', value: genome.energy_profile.mean_valence },
      { trait: 'Danceability', value: genome.energy_profile.mean_danceability },
      { trait: 'Diversity', value: genome.genre_diversity.diversity_score },
      { trait: 'Complexity', value: genome.complexity_score },
    ];

    // Scales
    const angleScale = d3.scaleBand()
      .domain(data.map(d => d.trait))
      .range([0, 2 * Math.PI]);

    const radiusScale = d3.scaleLinear()
      .domain([0, 1])
      .range([0, radius]);

    // Draw circular grid
    const levels = 5;
    for (let i = 1; i <= levels; i++) {
      const levelRadius = (radius / levels) * i;
      g.append('circle')
        .attr('r', levelRadius)
        .attr('fill', 'none')
        .attr('stroke', '#e5e7eb')
        .attr('stroke-width', 1);
    }

    // Draw axes
    data.forEach((d, i) => {
      const angle = angleScale(d.trait)!;
      const x = Math.sin(angle) * radius;
      const y = -Math.cos(angle) * radius;

      g.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', x)
        .attr('y2', y)
        .attr('stroke', '#e5e7eb')
        .attr('stroke-width', 1);

      // Labels
      const labelX = Math.sin(angle) * (radius + 20);
      const labelY = -Math.cos(angle) * (radius + 20);

      g.append('text')
        .attr('x', labelX)
        .attr('y', labelY)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('font-size', '14px')
        .attr('font-weight', 'bold')
        .attr('fill', '#374151')
        .text(d.trait);
    });

    // Draw data polygon
    const lineGenerator = d3.lineRadial<{ trait: string; value: number }>()
      .angle(d => angleScale(d.trait)!)
      .radius(d => radiusScale(d.value))
      .curve(d3.curveLinearClosed);

    g.append('path')
      .datum(data)
      .attr('d', lineGenerator)
      .attr('fill', 'rgba(139, 92, 246, 0.3)')
      .attr('stroke', 'rgba(139, 92, 246, 1)')
      .attr('stroke-width', 2);

    // Draw data points
    data.forEach(d => {
      const angle = angleScale(d.trait)!;
      const r = radiusScale(d.value);
      const x = Math.sin(angle) * r;
      const y = -Math.cos(angle) * r;

      g.append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 5)
        .attr('fill', '#8b5cf6')
        .attr('stroke', 'white')
        .attr('stroke-width', 2);
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Your Musical Genome
      </h2>
      <div className="flex justify-center">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
}
```

### **4. Personality Profile (`components/PersonalityProfile.tsx`)**

```typescript
'use client';

import { motion } from 'framer-motion';
import type { Personality } from '@/lib/types';

interface PersonalityProfileProps {
  personality: Personality;
}

export default function PersonalityProfile({ personality }: PersonalityProfileProps) {
  const traits = [
    { name: 'Openness', key: 'openness', description: 'Creativity and curiosity', color: 'bg-purple-500' },
    { name: 'Conscientiousness', key: 'conscientiousness', description: 'Organization and discipline', color: 'bg-blue-500' },
    { name: 'Extraversion', key: 'extraversion', description: 'Social energy and enthusiasm', color: 'bg-green-500' },
    { name: 'Agreeableness', key: 'agreeableness', description: 'Cooperation and empathy', color: 'bg-yellow-500' },
    { name: 'Neuroticism', key: 'neuroticism', description: 'Emotional sensitivity', color: 'bg-red-500' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Personality Profile
      </h2>

      <div className="space-y-6">
        {traits.map((trait, index) => (
          <motion.div
            key={trait.key}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {trait.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {trait.description}
                </p>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round(personality[trait.key as keyof Personality] * 100)}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${personality[trait.key as keyof Personality] * 100}%` }}
                transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                className={`h-full ${trait.color} rounded-full`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Note:</strong> These personality insights are inferred from your musical preferences
          based on research in music psychology. They reflect patterns in your listening behavior.
        </p>
      </div>
    </div>
  );
}
```

### **5. Company Matches (`components/CompanyMatches.tsx`)**

```typescript
'use client';

import { motion } from 'framer-motion';
import type { CompanyMatch } from '@/lib/types';

interface CompanyMatchesProps {
  matches: CompanyMatch[];
}

export default function CompanyMatches({ matches }: CompanyMatchesProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Your Top Company Matches
      </h2>

      <div className="space-y-4">
        {matches.map((match, index) => (
          <motion.div
            key={match.company}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-purple-600">
                  #{index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {match.company}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Match Score:
                    </span>
                    <span className="text-lg font-bold text-purple-600">
                      {Math.round(match.score * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Match Score Visualization */}
              <div className="w-20 h-20">
                <svg viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="8"
                    strokeDasharray={`${match.score * 283} 283`}
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              {match.explanation}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
```

### **6. TypeScript Types (`lib/types.ts`)**

```typescript
export interface MusicalGenome {
  energy_profile: {
    mean_energy: number;
    mean_valence: number;
    mean_danceability: number;
    mean_tempo: number;
  };
  genre_diversity: {
    unique_artists: number;
    unique_genres: number;
    diversity_score: number;
  };
  complexity_score: number;
  emotional_range: {
    mean_valence: number;
    valence_std: number;
    emotional_volatility: number;
  };
  temporal_patterns: {
    consistency: number;
    exploration_rate: number;
  };
}

export interface Personality {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

export interface CompanyMatch {
  company: string;
  score: number;
  explanation: string;
}

export interface AnalysisResult {
  musical_genome: MusicalGenome;
  personality: Personality;
  company_matches: CompanyMatch[];
}
```

### **7. API Client (`lib/api.ts`)**

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function getAnalysisResults(): Promise<AnalysisResult> {
  const token = localStorage.getItem('spotify_token');

  const response = await fetch(`${API_URL}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ spotify_token: token }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch analysis results');
  }

  return response.json();
}

export async function getCompanies(): Promise<string[]> {
  const response = await fetch(`${API_URL}/companies`);

  if (!response.ok) {
    throw new Error('Failed to fetch companies');
  }

  return response.json();
}
```

### **8. Package Configuration (`package.json`)**

```json
{
  "name": "spotify-genes-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "d3": "^7.8.5",
    "framer-motion": "^10.16.16",
    "recharts": "^2.10.3"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "@types/d3": "^7.4.3",
    "autoprefixer": "^10.0.1",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "typescript": "^5"
  }
}
```

---

## Deployment

### **Docker Setup**

**File: `docker-compose.yml`**
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - SPOTIFY_CLIENT_ID=${SPOTIFY_CLIENT_ID}
      - SPOTIFY_CLIENT_SECRET=${SPOTIFY_CLIENT_SECRET}
    volumes:
      - ./backend:/app

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000
    depends_on:
      - backend
```

### **Vercel Deployment (Frontend)**
1. Push to GitHub
2. Connect to Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_API_URL=https://your-backend-url.com`
4. Deploy

### **Railway/Render Deployment (Backend)**
1. Push to GitHub
2. Connect to Railway/Render
3. Set environment variables:
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
4. Deploy

---

This completes the Spotify Genes implementation! Ready to build it?
