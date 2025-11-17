# 🔧 Technical Specifications - All 6 Projects
## Complete Implementation Guide

---

# 🎵 1. Spotify Genes - Musical DNA Analyzer

## Overview
Analyze Spotify listening history to infer personality traits and match users with companies based on musical culture fit.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Spotify Genes System                    │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   ┌────▼─────┐         ┌────▼─────┐        ┌─────▼────┐
   │  Data    │         │ Analysis │        │ Matching │
   │  Layer   │────────▶│  Engine  │───────▶│  Engine  │
   └──────────┘         └──────────┘        └──────────┘
        │                     │                     │
   ┌────▼─────┐         ┌────▼─────┐        ┌─────▼────┐
   │ Spotify  │         │ Audio    │        │ Company  │
   │   API    │         │ Features │        │ Profiles │
   └──────────┘         └──────────┘        └──────────┘
```

## Data Sources

### **1. Spotify Web API**
```
Endpoints needed:
- /me (user profile)
- /me/top/tracks (top tracks - various time ranges)
- /me/top/artists (top artists)
- /playlists/{playlist_id}/tracks (playlist contents)
- /audio-features/{id} (track audio features)
- /audio-analysis/{id} (detailed audio analysis)
```

### **2. Audio Features (Spotify provides)**
```python
audio_features = {
    'acousticness': 0.0-1.0,      # Confidence measure
    'danceability': 0.0-1.0,       # Rhythm strength
    'energy': 0.0-1.0,             # Intensity/activity
    'instrumentalness': 0.0-1.0,   # Vocal presence
    'key': 0-11,                   # Pitch class
    'liveness': 0.0-1.0,           # Audience presence
    'loudness': -60.0-0.0,         # Overall loudness (dB)
    'mode': 0/1,                   # Major/minor
    'speechiness': 0.0-1.0,        # Spoken words
    'tempo': 0.0-250.0,            # BPM
    'time_signature': 3-7,         # Beats per bar
    'valence': 0.0-1.0             # Musical positiveness
}
```

### **3. Temporal Data**
```python
listening_session = {
    'track_id': str,
    'played_at': datetime,
    'context_type': str,  # playlist, album, artist
    'device_type': str,   # computer, mobile, speaker
    'duration_ms': int,
    'completion_rate': float  # How much was played
}
```

## Implementation Details

### **Phase 1: Data Collection (Week 1, Days 1-2)**

**File: `backend/app/spotify_client.py`**
```python
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from datetime import datetime, timedelta
import pandas as pd

class SpotifyClient:
    def __init__(self, client_id, client_secret, redirect_uri):
        self.sp = spotipy.Spotify(auth_manager=SpotifyOAuth(
            client_id=client_id,
            client_secret=client_secret,
            redirect_uri=redirect_uri,
            scope="user-top-read user-read-recently-played playlist-read-private"
        ))

    def get_user_listening_history(self, time_range='long_term'):
        """
        Fetch comprehensive listening history
        time_range: short_term (4 weeks), medium_term (6 months), long_term (years)
        """
        top_tracks = self.sp.current_user_top_tracks(
            limit=50,
            time_range=time_range
        )

        # Get audio features for all tracks
        track_ids = [t['id'] for t in top_tracks['items']]
        audio_features = self.sp.audio_features(track_ids)

        # Combine data
        tracks_with_features = []
        for track, features in zip(top_tracks['items'], audio_features):
            tracks_with_features.append({
                **track,
                'audio_features': features
            })

        return tracks_with_features

    def get_recently_played(self, limit=50):
        """Get recently played tracks with timestamps"""
        recent = self.sp.current_user_recently_played(limit=limit)
        return recent['items']

    def get_user_playlists_analysis(self):
        """Analyze user's playlists for context"""
        playlists = self.sp.current_user_playlists(limit=50)

        playlist_data = []
        for playlist in playlists['items']:
            tracks = self.sp.playlist_tracks(playlist['id'])
            playlist_data.append({
                'name': playlist['name'],
                'tracks': tracks['items'],
                'description': playlist['description']
            })

        return playlist_data
```

### **Phase 1: Audio Analysis (Week 1, Days 3-4)**

**File: `backend/app/audio_analyzer.py`**
```python
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from datetime import datetime

class AudioAnalyzer:
    def __init__(self):
        self.scaler = StandardScaler()

    def extract_musical_genome(self, tracks_with_features):
        """Extract high-level musical patterns"""

        df = pd.DataFrame([{
            'track_id': t['id'],
            'track_name': t['name'],
            'artist': t['artists'][0]['name'],
            **t['audio_features']
        } for t in tracks_with_features])

        genome = {
            'energy_profile': self._calculate_energy_profile(df),
            'genre_diversity': self._calculate_diversity(tracks_with_features),
            'complexity_score': self._calculate_complexity(df),
            'emotional_range': self._calculate_emotional_range(df),
            'temporal_patterns': self._analyze_temporal_patterns(df)
        }

        return genome

    def _calculate_energy_profile(self, df):
        """Average energy patterns"""
        return {
            'mean_energy': df['energy'].mean(),
            'std_energy': df['energy'].std(),
            'mean_tempo': df['tempo'].mean(),
            'mean_danceability': df['danceability'].mean(),
            'mean_valence': df['valence'].mean()
        }

    def _calculate_diversity(self, tracks):
        """Calculate genre and artist diversity"""
        artists = set(t['artists'][0]['name'] for t in tracks)
        genres = set()
        for t in tracks:
            if 'genres' in t['artists'][0]:
                genres.update(t['artists'][0]['genres'])

        return {
            'unique_artists': len(artists),
            'unique_genres': len(genres),
            'diversity_score': len(artists) / len(tracks)
        }

    def _calculate_complexity(self, df):
        """Musical complexity based on various factors"""
        complexity = (
            0.3 * df['instrumentalness'].mean() +
            0.3 * (1 - df['speechiness'].mean()) +
            0.2 * df['acousticness'].mean() +
            0.2 * (df['time_signature'].std() / 7.0)
        )
        return complexity

    def _calculate_emotional_range(self, df):
        """Emotional diversity through valence variation"""
        return {
            'mean_valence': df['valence'].mean(),
            'valence_std': df['valence'].std(),
            'emotional_volatility': df['valence'].std() / (df['valence'].mean() + 0.001)
        }

    def _analyze_temporal_patterns(self, df):
        """Identify listening patterns over time"""
        # This would use timestamp data when available
        return {
            'consistency': 1.0 - df['energy'].std(),
            'exploration_rate': len(df) / max(len(set(df['artist'])), 1)
        }

    def classify_listening_contexts(self, recent_tracks):
        """Classify tracks by likely listening context"""
        contexts = {
            'focus': [],
            'workout': [],
            'relax': [],
            'social': [],
            'commute': []
        }

        for track in recent_tracks:
            features = track['audio_features']

            # Focus: high instrumentalness, low energy
            if features['instrumentalness'] > 0.5 and features['energy'] < 0.6:
                contexts['focus'].append(track)

            # Workout: high energy, high tempo
            elif features['energy'] > 0.7 and features['tempo'] > 120:
                contexts['workout'].append(track)

            # Relax: low energy, high valence
            elif features['energy'] < 0.5 and features['valence'] > 0.5:
                contexts['relax'].append(track)

            # Social: high danceability, high valence
            elif features['danceability'] > 0.7 and features['valence'] > 0.6:
                contexts['social'].append(track)

            # Commute: medium energy, familiar
            else:
                contexts['commute'].append(track)

        return contexts
```

### **Phase 1: Personality Inference (Week 1, Days 5-6)**

**File: `backend/app/personality.py`**
```python
from sklearn.ensemble import RandomForestClassifier
import numpy as np

class PersonalityInferencer:
    """Map musical features to Big 5 personality traits"""

    def __init__(self):
        self.trait_models = self._initialize_models()

    def _initialize_models(self):
        """
        Research-backed mappings:
        - Openness: Genre diversity, experimental music
        - Conscientiousness: Structured listening, consistency
        - Extraversion: Energy levels, social playlists
        - Agreeableness: Mainstream vs niche
        - Neuroticism: Emotional volatility
        """
        return {
            'openness': self._create_openness_model(),
            'conscientiousness': self._create_conscientiousness_model(),
            'extraversion': self._create_extraversion_model(),
            'agreeableness': self._create_agreeableness_model(),
            'neuroticism': self._create_neuroticism_model()
        }

    def infer_personality(self, musical_genome):
        """Infer Big 5 traits from musical genome"""

        personality = {}

        # Openness: Genre diversity + complexity
        personality['openness'] = self._calculate_openness(musical_genome)

        # Conscientiousness: Consistency + structure
        personality['conscientiousness'] = self._calculate_conscientiousness(musical_genome)

        # Extraversion: Energy + social listening
        personality['extraversion'] = self._calculate_extraversion(musical_genome)

        # Agreeableness: Mainstream preference
        personality['agreeableness'] = self._calculate_agreeableness(musical_genome)

        # Neuroticism: Emotional volatility
        personality['neuroticism'] = self._calculate_neuroticism(musical_genome)

        return personality

    def _calculate_openness(self, genome):
        """High diversity + complexity → High openness"""
        diversity = genome['genre_diversity']['diversity_score']
        complexity = genome['complexity_score']

        openness = 0.6 * diversity + 0.4 * complexity
        return min(1.0, max(0.0, openness))

    def _calculate_conscientiousness(self, genome):
        """High consistency + structure → High conscientiousness"""
        consistency = genome['temporal_patterns']['consistency']
        structure = 1.0 - genome['emotional_range']['emotional_volatility']

        conscientiousness = 0.5 * consistency + 0.5 * structure
        return min(1.0, max(0.0, conscientiousness))

    def _calculate_extraversion(self, genome):
        """High energy + danceability → High extraversion"""
        energy = genome['energy_profile']['mean_energy']
        danceability = genome['energy_profile']['mean_danceability']
        valence = genome['energy_profile']['mean_valence']

        extraversion = 0.4 * energy + 0.3 * danceability + 0.3 * valence
        return min(1.0, max(0.0, extraversion))

    def _calculate_agreeableness(self, genome):
        """Lower diversity + higher valence → Higher agreeableness"""
        diversity = genome['genre_diversity']['diversity_score']
        valence = genome['energy_profile']['mean_valence']

        agreeableness = 0.3 * (1 - diversity) + 0.7 * valence
        return min(1.0, max(0.0, agreeableness))

    def _calculate_neuroticism(self, genome):
        """Emotional volatility → Neuroticism"""
        volatility = genome['emotional_range']['emotional_volatility']

        neuroticism = min(1.0, volatility * 2.0)
        return neuroticism

    def _create_openness_model(self):
        """Placeholder for ML model"""
        return None

    def _create_conscientiousness_model(self):
        return None

    def _create_extraversion_model(self):
        return None

    def _create_agreeableness_model(self):
        return None

    def _create_neuroticism_model(self):
        return None
```

### **Phase 2: Company Matching (Week 2, Days 8-11)**

**File: `backend/app/matcher.py`**
```python
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict

class CompanyMatcher:
    def __init__(self):
        self.company_profiles = self._load_company_profiles()

    def _load_company_profiles(self):
        """Load or simulate company musical profiles"""
        # In production, this would be aggregated from employee data
        # For MVP, we'll use simulated profiles
        return {
            'Google': {
                'genome': {
                    'energy_profile': {'mean_energy': 0.65, 'mean_valence': 0.70},
                    'genre_diversity': {'diversity_score': 0.75},
                    'complexity_score': 0.70,
                    'culture_traits': {'innovative': 0.9, 'collaborative': 0.8}
                },
                'personality': {
                    'openness': 0.80,
                    'conscientiousness': 0.75,
                    'extraversion': 0.65,
                    'agreeableness': 0.70,
                    'neuroticism': 0.30
                }
            },
            'Meta': {
                'genome': {
                    'energy_profile': {'mean_energy': 0.70, 'mean_valence': 0.75},
                    'genre_diversity': {'diversity_score': 0.70},
                    'complexity_score': 0.65,
                    'culture_traits': {'innovative': 0.85, 'fast_paced': 0.9}
                },
                'personality': {
                    'openness': 0.75,
                    'conscientiousness': 0.70,
                    'extraversion': 0.75,
                    'agreeableness': 0.65,
                    'neuroticism': 0.35
                }
            },
            'Microsoft': {
                'genome': {
                    'energy_profile': {'mean_energy': 0.55, 'mean_valence': 0.65},
                    'genre_diversity': {'diversity_score': 0.65},
                    'complexity_score': 0.75,
                    'culture_traits': {'structured': 0.8, 'balanced': 0.85}
                },
                'personality': {
                    'openness': 0.70,
                    'conscientiousness': 0.85,
                    'extraversion': 0.60,
                    'agreeableness': 0.75,
                    'neuroticism': 0.25
                }
            },
            # Add more companies...
        }

    def calculate_match_score(self, user_genome, user_personality, company_name):
        """Calculate comprehensive match score"""

        company = self.company_profiles.get(company_name)
        if not company:
            return 0.0, "Company not found"

        # Multi-dimensional matching
        genome_similarity = self._genome_similarity(
            user_genome,
            company['genome']
        )

        personality_similarity = self._personality_similarity(
            user_personality,
            company['personality']
        )

        # Weighted combination
        match_score = (
            0.4 * genome_similarity +
            0.6 * personality_similarity
        )

        # Generate explanation
        explanation = self._generate_explanation(
            user_genome,
            user_personality,
            company,
            match_score
        )

        return match_score, explanation

    def _genome_similarity(self, user_genome, company_genome):
        """Calculate musical genome similarity"""

        # Energy similarity
        energy_diff = abs(
            user_genome['energy_profile']['mean_energy'] -
            company_genome['energy_profile']['mean_energy']
        )
        energy_sim = 1.0 - energy_diff

        # Valence similarity
        valence_diff = abs(
            user_genome['energy_profile']['mean_valence'] -
            company_genome['energy_profile']['mean_valence']
        )
        valence_sim = 1.0 - valence_diff

        # Diversity similarity
        diversity_diff = abs(
            user_genome['genre_diversity']['diversity_score'] -
            company_genome['genre_diversity']['diversity_score']
        )
        diversity_sim = 1.0 - diversity_diff

        # Complexity similarity
        complexity_diff = abs(
            user_genome['complexity_score'] -
            company_genome['complexity_score']
        )
        complexity_sim = 1.0 - complexity_diff

        # Weighted average
        similarity = (
            0.3 * energy_sim +
            0.2 * valence_sim +
            0.3 * diversity_sim +
            0.2 * complexity_sim
        )

        return similarity

    def _personality_similarity(self, user_personality, company_personality):
        """Calculate personality trait similarity"""

        traits = ['openness', 'conscientiousness', 'extraversion',
                  'agreeableness', 'neuroticism']

        similarities = []
        for trait in traits:
            diff = abs(user_personality[trait] - company_personality[trait])
            similarity = 1.0 - diff
            similarities.append(similarity)

        return np.mean(similarities)

    def _generate_explanation(self, user_genome, user_personality,
                            company, match_score):
        """Generate human-readable match explanation"""

        explanations = []

        # Energy match
        user_energy = user_genome['energy_profile']['mean_energy']
        company_energy = company['genome']['energy_profile']['mean_energy']

        if abs(user_energy - company_energy) < 0.15:
            explanations.append(
                f"Your energy level ({user_energy:.0%}) aligns well "
                f"with {company['genome']['culture_traits']}"
            )

        # Personality highlights
        for trait, score in user_personality.items():
            company_score = company['personality'][trait]
            if abs(score - company_score) < 0.15:
                explanations.append(
                    f"Strong {trait} match (You: {score:.0%}, "
                    f"Company: {company_score:.0%})"
                )

        return " • ".join(explanations)

    def find_top_matches(self, user_genome, user_personality, top_n=10):
        """Find top N company matches"""

        matches = []
        for company_name in self.company_profiles.keys():
            score, explanation = self.calculate_match_score(
                user_genome,
                user_personality,
                company_name
            )
            matches.append({
                'company': company_name,
                'score': score,
                'explanation': explanation
            })

        # Sort by score
        matches.sort(key=lambda x: x['score'], reverse=True)

        return matches[:top_n]
```

### **Phase 2: FastAPI Backend (Week 2, Days 12-14)**

**File: `backend/app/main.py`**
```python
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict
import uvicorn

from .spotify_client import SpotifyClient
from .audio_analyzer import AudioAnalyzer
from .personality import PersonalityInferencer
from .matcher import CompanyMatcher

app = FastAPI(title="Spotify Genes API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
audio_analyzer = AudioAnalyzer()
personality_inferencer = PersonalityInferencer()
company_matcher = CompanyMatcher()

# Models
class AnalysisResult(BaseModel):
    musical_genome: Dict
    personality: Dict
    company_matches: List[Dict]

@app.get("/")
async def root():
    return {"message": "Spotify Genes API"}

@app.get("/auth/spotify")
async def spotify_auth():
    """Initiate Spotify OAuth flow"""
    # Implementation for OAuth
    pass

@app.post("/analyze")
async def analyze_user(spotify_token: str):
    """
    Main analysis endpoint
    Takes Spotify auth token, returns full analysis
    """
    try:
        # Initialize Spotify client
        client = SpotifyClient(
            client_id="YOUR_CLIENT_ID",
            client_secret="YOUR_CLIENT_SECRET",
            redirect_uri="http://localhost:3000/callback"
        )

        # Get listening history
        tracks = client.get_user_listening_history()

        # Extract musical genome
        genome = audio_analyzer.extract_musical_genome(tracks)

        # Infer personality
        personality = personality_inferencer.infer_personality(genome)

        # Find company matches
        matches = company_matcher.find_top_matches(genome, personality)

        return AnalysisResult(
            musical_genome=genome,
            personality=personality,
            company_matches=matches
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/companies")
async def list_companies():
    """List all available companies"""
    return list(company_matcher.company_profiles.keys())

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

**File: `backend/requirements.txt`**
```
fastapi==0.104.1
uvicorn==0.24.0
spotipy==2.23.0
pandas==2.1.3
numpy==1.26.2
scikit-learn==1.3.2
pydantic==2.5.0
python-dotenv==1.0.0
```

---

This is Part 1 of the technical specifications. Should I continue with:
- Part 2: Frontend implementation (Next.js + D3.js)
- Part 3: Deployment & Infrastructure
- Part 4: NBA Sixth Man specs
- Part 5: All remaining projects

Or would you like me to start implementing the code for Spotify Genes now?
