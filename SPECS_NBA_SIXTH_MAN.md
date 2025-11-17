# 🏀 NBA Sixth Man - Technical Specifications
## Real-Time Play-by-Play Sequential Analysis System

---

## Overview
ML/LLM system that analyzes NBA play-by-play data to detect patterns, momentum shifts, and sequential dependencies (e.g., FG% after rebounds, scoring runs after turnovers).

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                NBA Sixth Man System                      │
└─────────────────────────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
   ┌────▼────┐     ┌────▼────┐     ┌────▼────┐
   │  Data   │────▶│Sequential│────▶│Insight  │
   │ Layer   │     │Analysis  │     │Engine   │
   └─────────┘     └─────────┘     └─────────┘
        │                │                │
   ┌────▼────┐     ┌────▼────┐     ┌────▼────┐
   │NBA API  │     │Pattern  │     │  LLM    │
   │Play-by- │     │Detection│     │Commentary│
   │  Play   │     └─────────┘     └─────────┘
   └─────────┘
```

---

## Data Sources

### **1. NBA Stats API**
```python
# Primary endpoints
endpoints = {
    'play_by_play': 'https://stats.nba.com/stats/playbyplayv2',
    'box_score': 'https://stats.nba.com/stats/boxscoretraditionalv2',
    'shot_chart': 'https://stats.nba.com/stats/shotchartdetail',
    'player_stats': 'https://stats.nba.com/stats/playerdashboardbygeneralsplits'
}
```

### **2. Play-by-Play Data Structure**
```python
play_event = {
    'game_id': str,
    'event_num': int,
    'event_type': str,  # SHOT, REBOUND, TURNOVER, FOUL, etc.
    'period': int,
    'time': str,
    'team_id': int,
    'player1_id': int,
    'player1_name': str,
    'action_type': str,
    'shot_distance': float,
    'shot_result': str,  # Made/Missed
    'score': str,
    'score_margin': int
}
```

### **3. Derived Features**
```python
derived_features = {
    'momentum_score': float,      # -100 to +100
    'possession_outcome': str,    # SCORE, MISS, TURNOVER
    'play_sequence': List[str],   # Last N plays
    'time_since_last_score': int,
    'current_run': int,           # Current scoring run
    'pace': float,                # Possessions per minute
    'defensive_pressure': float   # Estimated pressure
}
```

---

## Implementation

### **Phase 1: Data Collection (Week 7, Days 1-3)**

**File: `nba_sixth_man/data/nba_client.py`**

```python
import requests
import pandas as pd
from typing import List, Dict
import time
from datetime import datetime

class NBAClient:
    """Client for NBA Stats API"""

    BASE_URL = "https://stats.nba.com/stats"

    HEADERS = {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://stats.nba.com/',
        'Accept': 'application/json'
    }

    def get_play_by_play(self, game_id: str) -> pd.DataFrame:
        """Fetch play-by-play data for a game"""

        url = f"{self.BASE_URL}/playbyplayv2"
        params = {
            'GameID': game_id,
            'StartPeriod': 0,
            'EndPeriod': 10
        }

        response = requests.get(url, params=params, headers=self.HEADERS)
        data = response.json()

        # Parse response
        plays = data['resultSets'][0]['rowSet']
        columns = data['resultSets'][0]['headers']

        df = pd.DataFrame(plays, columns=columns)
        return df

    def get_todays_games(self) -> List[Dict]:
        """Get list of today's games"""

        url = f"{self.BASE_URL}/scoreboardv2"
        params = {'GameDate': datetime.now().strftime('%Y-%m-%d')}

        response = requests.get(url, params=params, headers=self.HEADERS)
        data = response.json()

        games = data['resultSets'][0]['rowSet']
        return games

    def get_live_game_data(self, game_id: str) -> Dict:
        """Get real-time game data"""

        # Fetch play-by-play
        pbp = self.get_play_by_play(game_id)

        # Fetch box score
        box_score = self.get_box_score(game_id)

        return {
            'play_by_play': pbp,
            'box_score': box_score,
            'timestamp': datetime.now()
        }

    def get_box_score(self, game_id: str) -> pd.DataFrame:
        """Fetch box score data"""

        url = f"{self.BASE_URL}/boxscoretraditionalv2"
        params = {'GameID': game_id}

        response = requests.get(url, params=params, headers=self.HEADERS)
        data = response.json()

        player_stats = data['resultSets'][0]['rowSet']
        columns = data['resultSets'][0]['headers']

        return pd.DataFrame(player_stats, columns=columns)

    def stream_game(self, game_id: str, callback, interval=10):
        """Stream game data with callback function"""

        while True:
            try:
                data = self.get_live_game_data(game_id)
                callback(data)
                time.sleep(interval)
            except KeyboardInterrupt:
                break
            except Exception as e:
                print(f"Error streaming: {e}")
                time.sleep(interval)
```

### **Phase 2: Sequential Pattern Analysis (Week 7-8, Days 4-10)**

**File: `nba_sixth_man/analysis/sequential_analyzer.py`**

```python
import pandas as pd
import numpy as np
from typing import List, Dict, Tuple
from collections import defaultdict, deque

class SequentialAnalyzer:
    """Analyze sequential patterns in play-by-play data"""

    def __init__(self, window_size=5):
        self.window_size = window_size
        self.patterns = defaultdict(list)

    def analyze_post_event_performance(
        self,
        pbp: pd.DataFrame,
        event_type: str,
        team_id: int
    ) -> Dict:
        """
        Analyze performance after specific events
        Example: FG% after offensive rebounds
        """

        results = {
            'total_events': 0,
            'next_possession_scores': 0,
            'fg_percentage': 0.0,
            'average_points': 0.0,
            'patterns': []
        }

        # Filter events
        events = pbp[
            (pbp['EVENTMSGTYPE'] == event_type) &
            (pbp['PLAYER1_TEAM_ID'] == team_id)
        ]

        for idx, event in events.iterrows():
            # Get next N plays
            next_plays = pbp.loc[idx+1:idx+self.window_size]

            # Analyze outcome
            outcome = self._analyze_possession_outcome(next_plays, team_id)
            results['patterns'].append(outcome)

        # Calculate statistics
        results['total_events'] = len(results['patterns'])

        if results['total_events'] > 0:
            scores = sum(1 for p in results['patterns'] if p['scored'])
            results['next_possession_scores'] = scores
            results['fg_percentage'] = scores / results['total_events']

            points = [p['points'] for p in results['patterns']]
            results['average_points'] = np.mean(points)

        return results

    def _analyze_possession_outcome(
        self,
        plays: pd.DataFrame,
        team_id: int
    ) -> Dict:
        """Analyze outcome of a possession"""

        outcome = {
            'scored': False,
            'points': 0,
            'shot_taken': False,
            'turnover': False,
            'possession_length': len(plays)
        }

        for _, play in plays.iterrows():
            # Check for made shot
            if (play['EVENTMSGTYPE'] == 1 and  # Field goal made
                play['PLAYER1_TEAM_ID'] == team_id):
                outcome['scored'] = True
                outcome['points'] = 2 if play['SHOTDISTANCE'] < 23.75 else 3
                break

            # Check for turnover
            elif (play['EVENTMSGTYPE'] == 5 and
                  play['PLAYER1_TEAM_ID'] == team_id):
                outcome['turnover'] = True
                break

            # Check for opponent possession
            elif play['PLAYER1_TEAM_ID'] != team_id:
                break

        return outcome

    def detect_momentum_shifts(
        self,
        pbp: pd.DataFrame,
        threshold: int = 8
    ) -> List[Dict]:
        """
        Detect momentum shifts (scoring runs)
        """

        runs = []
        current_run = {
            'team': None,
            'points': 0,
            'start_idx': 0,
            'plays': []
        }

        for idx, play in pbp.iterrows():
            if play['EVENTMSGTYPE'] == 1:  # Field goal made
                team = play['PLAYER1_TEAM_ID']
                points = 2 if play['SHOTDISTANCE'] < 23.75 else 3

                if current_run['team'] == team:
                    # Continue run
                    current_run['points'] += points
                    current_run['plays'].append(play)
                else:
                    # Save previous run if significant
                    if current_run['points'] >= threshold:
                        runs.append(current_run.copy())

                    # Start new run
                    current_run = {
                        'team': team,
                        'points': points,
                        'start_idx': idx,
                        'plays': [play]
                    }

        # Save final run
        if current_run['points'] >= threshold:
            runs.append(current_run)

        return runs

    def calculate_momentum_score(
        self,
        pbp: pd.DataFrame,
        team_id: int,
        window: int = 10
    ) -> float:
        """
        Calculate momentum score (-100 to +100)
        Based on recent possessions
        """

        recent_plays = pbp.tail(window)
        team_points = 0
        opponent_points = 0

        for _, play in recent_plays.iterrows():
            if play['EVENTMSGTYPE'] == 1:  # Score
                points = 2 if play['SHOTDISTANCE'] < 23.75 else 3

                if play['PLAYER1_TEAM_ID'] == team_id:
                    team_points += points
                else:
                    opponent_points += points

        # Calculate momentum (-100 to +100)
        total = team_points + opponent_points
        if total == 0:
            return 0.0

        momentum = ((team_points - opponent_points) / total) * 100
        return momentum

    def analyze_clutch_performance(
        self,
        pbp: pd.DataFrame,
        team_id: int
    ) -> Dict:
        """
        Analyze performance in clutch situations
        (Last 5 minutes, score within 5 points)
        """

        # Filter clutch plays
        clutch = pbp[
            (pbp['PERIOD'] == 4) &
            (pbp['PCTIMESTRING'].str.split(':').str[0].astype(int) <= 5) &
            (pbp['SCOREMARGIN'].abs() <= 5)
        ]

        return self.analyze_post_event_performance(
            clutch,
            event_type=1,  # Field goal attempts
            team_id=team_id
        )

    def find_sequential_patterns(
        self,
        pbp: pd.DataFrame,
        sequence_length: int = 3
    ) -> Dict[Tuple, float]:
        """
        Find common play sequences and their success rates
        Example: [REBOUND, PASS, SHOT] → 65% success
        """

        patterns = defaultdict(lambda: {'total': 0, 'success': 0})

        for i in range(len(pbp) - sequence_length):
            # Extract sequence
            sequence = tuple(
                pbp.iloc[i:i+sequence_length]['EVENTMSGTYPE'].values
            )

            # Check outcome
            next_play = pbp.iloc[i+sequence_length]
            success = (next_play['EVENTMSGTYPE'] == 1)  # Made shot

            patterns[sequence]['total'] += 1
            patterns[sequence]['success'] += int(success)

        # Calculate success rates
        pattern_rates = {}
        for seq, stats in patterns.items():
            if stats['total'] >= 5:  # Minimum occurrences
                pattern_rates[seq] = stats['success'] / stats['total']

        return pattern_rates
```

### **Phase 3: LLM Integration (Week 9, Days 1-4)**

**File: `nba_sixth_man/analysis/insight_generator.py`**

```python
from openai import OpenAI
from typing import Dict, List
import json

class InsightGenerator:
    """Generate natural language insights using LLM"""

    def __init__(self, api_key: str):
        self.client = OpenAI(api_key=api_key)

    def generate_commentary(
        self,
        analysis_results: Dict,
        game_context: Dict
    ) -> str:
        """Generate commentary from analysis results"""

        prompt = self._create_prompt(analysis_results, game_context)

        response = self.client.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert NBA analyst providing "
                               "insightful commentary based on advanced statistics."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.7,
            max_tokens=300
        )

        return response.choices[0].message.content

    def _create_prompt(
        self,
        analysis: Dict,
        context: Dict
    ) -> str:
        """Create detailed prompt for LLM"""

        prompt = f"""
Analyze this NBA game situation and provide expert commentary:

GAME CONTEXT:
- {context['home_team']} vs {context['away_team']}
- Period: {context['period']}, Time: {context['time']}
- Score: {context['score']}

STATISTICAL ANALYSIS:
- Post-Rebound FG%: {analysis['post_rebound_fg']:.1%}
- Current Momentum: {analysis['momentum_score']:.0f}/100
- Recent Scoring Run: {analysis['current_run']} points

SEQUENTIAL PATTERNS DETECTED:
{json.dumps(analysis['patterns'], indent=2)}

Provide 2-3 sentences of insightful commentary that:
1. Explains what the numbers mean in basketball terms
2. Predicts what might happen next
3. Compares to league averages or historical patterns

Focus on actionable insights a coach or serious fan would appreciate.
"""

        return prompt

    def generate_prediction(
        self,
        current_state: Dict,
        historical_patterns: Dict
    ) -> Dict:
        """Generate prediction with explanation"""

        prompt = f"""
Based on this game state and historical patterns, predict the next possession:

CURRENT STATE:
{json.dumps(current_state, indent=2)}

HISTORICAL PATTERNS:
{json.dumps(historical_patterns, indent=2)}

Provide:
1. Most likely outcome (SCORE/MISS/TURNOVER)
2. Probability estimate
3. 2-sentence explanation
4. Key factors influencing prediction

Format as JSON.
"""

        response = self.client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a predictive NBA analytics engine."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5,
            max_tokens=200
        )

        return json.loads(response.choices[0].message.content)
```

### **Phase 4: Real-Time Dashboard (Week 9-10)**

**File: `nba_sixth_man/dashboard/app.py`**

```python
import streamlit as st
import pandas as pd
from nba_client import NBAClient
from sequential_analyzer import SequentialAnalyzer
from insight_generator import InsightGenerator
import plotly.graph_objects as go
import plotly.express as px

# Initialize
st.set_page_config(page_title="NBA Sixth Man", layout="wide")

@st.cache_resource
def init_services():
    return {
        'client': NBAClient(),
        'analyzer': SequentialAnalyzer(),
        'insight_gen': InsightGenerator(api_key=st.secrets['OPENAI_API_KEY'])
    }

services = init_services()

# Sidebar
st.sidebar.title("🏀 NBA Sixth Man")
st.sidebar.markdown("Real-time sequential analysis")

# Game selection
games = services['client'].get_todays_games()
game_options = {f"{g[6]} vs {g[7]}": g[2] for g in games}
selected_game = st.sidebar.selectbox("Select Game", list(game_options.keys()))
game_id = game_options[selected_game]

# Auto-refresh
auto_refresh = st.sidebar.checkbox("Auto-refresh (30s)", value=False)

if auto_refresh:
    st.experimental_rerun()

# Main dashboard
st.title(f"📊 {selected_game}")

# Fetch data
with st.spinner("Loading game data..."):
    game_data = services['client'].get_live_game_data(game_id)
    pbp = game_data['play_by_play']

# Columns
col1, col2, col3 = st.columns(3)

with col1:
    st.metric("Total Plays", len(pbp))

with col2:
    momentum = services['analyzer'].calculate_momentum_score(pbp, team_id=1)
    st.metric("Momentum", f"{momentum:.0f}")

with col3:
    runs = services['analyzer'].detect_momentum_shifts(pbp)
    st.metric("Scoring Runs", len(runs))

# Sequential Analysis
st.header("📈 Sequential Analysis")

# Post-rebound performance
rebound_analysis = services['analyzer'].analyze_post_event_performance(
    pbp,
    event_type=3,  # Rebound
    team_id=1
)

col1, col2 = st.columns(2)

with col1:
    st.subheader("Post-Rebound Performance")
    st.metric(
        "FG% After Offensive Rebound",
        f"{rebound_analysis['fg_percentage']:.1%}"
    )
    st.metric(
        "Avg Points Per Possession",
        f"{rebound_analysis['average_points']:.2f}"
    )

with col2:
    st.subheader("Momentum Chart")

    # Create momentum timeline
    momentum_timeline = []
    for i in range(10, len(pbp), 10):
        mom = services['analyzer'].calculate_momentum_score(
            pbp.iloc[:i],
            team_id=1
        )
        momentum_timeline.append({
            'play': i,
            'momentum': mom
        })

    df_momentum = pd.DataFrame(momentum_timeline)

    fig = px.line(
        df_momentum,
        x='play',
        y='momentum',
        title='Momentum Flow'
    )
    st.plotly_chart(fig)

# LLM Insights
st.header("🧠 AI Commentary")

if st.button("Generate Insight"):
    with st.spinner("Analyzing..."):
        analysis = {
            'post_rebound_fg': rebound_analysis['fg_percentage'],
            'momentum_score': momentum,
            'current_run': runs[-1]['points'] if runs else 0,
            'patterns': rebound_analysis['patterns'][:5]
        }

        context = {
            'home_team': selected_game.split(' vs ')[0],
            'away_team': selected_game.split(' vs ')[1],
            'period': pbp.iloc[-1]['PERIOD'],
            'time': pbp.iloc[-1]['PCTIMESTRING'],
            'score': pbp.iloc[-1]['SCORE']
        }

        commentary = services['insight_gen'].generate_commentary(
            analysis,
            context
        )

        st.info(commentary)

# Play-by-play table
st.header("📋 Recent Plays")
st.dataframe(
    pbp[['PCTIMESTRING', 'HOMEDESCRIPTION', 'VISITORDESCRIPTION', 'SCORE']]
    .tail(20)
)
```

---

## Key Features

### **1. Sequential Pattern Detection**
- Analyze performance after specific events (rebounds, turnovers, etc.)
- Detect common play sequences
- Calculate success rates

### **2. Momentum Analysis**
- Real-time momentum scoring (-100 to +100)
- Scoring run detection
- Clutch performance analysis

### **3. LLM-Powered Insights**
- Natural language commentary
- Predictive analysis
- Context-aware explanations

### **4. Real-Time Dashboard**
- Live game tracking
- Interactive visualizations
- Auto-refresh capability

---

## Novel Algorithms

### **Momentum Score Calculation**
```python
def calculate_momentum(recent_plays):
    """
    Weighted score based on:
    - Recent scoring (40%)
    - Shot percentage (30%)
    - Possession efficiency (20%)
    - Defensive stops (10%)
    """
    return weighted_combination(factors)
```

### **Pattern Success Prediction**
```python
def predict_next_possession(current_sequence, historical_patterns):
    """
    Use Markov chains + ML to predict outcome
    based on current play sequence
    """
    return probability_distribution
```

---

## Deployment

```yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build: ./backend
    environment:
      - NBA_API_KEY=${NBA_API_KEY}
      - OPENAI_API_KEY=${OPENAI_API_KEY}

  frontend:
    build: ./dashboard
    ports:
      - "8501:8501"
    depends_on:
      - backend
```

---

**Continue with remaining 4 projects?** (Binge Optimizer, TrainBrain, Flavor Transformer, CityPulse)
