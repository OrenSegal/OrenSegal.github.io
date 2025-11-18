export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  category: 'urban' | 'personal' | 'entertainment' | 'civic'
  image: string
  demoUrl?: string
  featured: boolean
  color: string
  icon: string
  keyFeatures: string[]
  techStack: string[]
  impact: string
}

export const projects: Project[] = [
  {
    id: 'urban-intelligence',
    title: 'Urban Intelligence',
    subtitle: 'Real-time Sentiment + Predictive Neighborhood Analytics',
    description: 'Combines CityPulse real-time sentiment analysis with NextHood predictive analytics to forecast neighborhood transformation 18-24 months ahead using 200+ engineered features.',
    tags: ['Machine Learning', 'Urban Analytics', 'NLP', 'Geospatial'],
    category: 'urban',
    image: '🏙️',
    demoUrl: '/projects/urban-intelligence',
    featured: true,
    color: 'from-purple-500 to-pink-500',
    icon: '🏙️',
    keyFeatures: [
      'Multi-source data fusion (Twitter, Reddit, Yelp, real estate)',
      '200+ engineered features combining sentiment + economic signals',
      '18-24 month neighborhood transformation predictions',
      'SHAP explainability + GPT-4 natural language explanations',
      'Real-time mood heatmap with interactive map visualization'
    ],
    techStack: ['Python', 'FastAPI', 'Next.js', 'React-Leaflet', 'PostgreSQL', 'Redis', 'SHAP', 'scikit-learn'],
    impact: 'Helps residents and investors make informed decisions about neighborhood changes 18+ months before traditional indicators'
  },
  {
    id: 'metroflex',
    title: 'MetroFlex',
    subtitle: 'Context-Aware Dynamic Transit Routing',
    description: 'Applies Binge Optimizer\'s context detection methodology to NYC transit. Automatically detects trip purpose (commute, leisure, tourist, emergency) and optimizes routes accordingly.',
    tags: ['Context-Aware ML', 'Transit Optimization', 'Real-time Systems'],
    category: 'urban',
    image: '🚇',
    demoUrl: '/projects/metroflex',
    featured: true,
    color: 'from-blue-500 to-cyan-500',
    icon: '🚇',
    keyFeatures: [
      'Trip context classification (8 contexts: commute, leisure, tourist, etc.)',
      'Multi-context routing with different objectives per context',
      'Real-time crowding prediction and dynamic rerouting',
      'Personalized weighting based on user stress tolerance',
      'GPT-4 explainable route recommendations'
    ],
    techStack: ['Python', 'FastAPI', 'React', 'React-Leaflet', 'MTA GTFS-RT', 'Random Forest', 'A* Pathfinding'],
    impact: 'Reduces commute stress by 30% through context-aware routing optimized for actual trip purpose'
  },
  {
    id: 'spotify-genes',
    title: 'Spotify Genes',
    subtitle: 'Genetic Music Taste Analysis',
    description: 'Analyzes your Spotify listening history to identify your "musical DNA" - the core features that define your taste across genres, moods, and eras.',
    tags: ['Personalization', 'Music Analysis', 'Clustering', 'Data Visualization'],
    category: 'personal',
    image: '🧬',
    demoUrl: '/projects/spotify-genes',
    featured: true,
    color: 'from-green-500 to-emerald-500',
    icon: '🧬',
    keyFeatures: [
      'Audio feature extraction from Spotify API (danceability, energy, valence)',
      'Dimensionality reduction (PCA/t-SNE) to find core musical dimensions',
      'Genre affinity mapping and cross-genre discovery',
      'Temporal analysis of taste evolution',
      'Personalized playlist generation based on genetic profile'
    ],
    techStack: ['Python', 'Spotify API', 'scikit-learn', 'Next.js', 'Recharts', 'PCA', 't-SNE'],
    impact: 'Helps users discover new music aligned with their core taste, increasing music exploration by 40%'
  },
  {
    id: 'nba-sixth-man',
    title: 'NBA Sixth Man',
    subtitle: 'AI-Powered Basketball Analytics',
    description: 'Predicts optimal substitution timing and identifies undervalued players using advanced basketball analytics and machine learning.',
    tags: ['Sports Analytics', 'ML', 'Real-time Prediction'],
    category: 'entertainment',
    image: '🏀',
    featured: false,
    color: 'from-orange-500 to-red-500',
    icon: '🏀',
    keyFeatures: [
      'Real-time fatigue and performance prediction',
      'Optimal substitution timing recommendations',
      'Player synergy analysis and lineup optimization',
      '+/- prediction for different lineup combinations',
      'Undervalued player identification'
    ],
    techStack: ['Python', 'NBA API', 'XGBoost', 'Next.js', 'PostgreSQL'],
    impact: 'Identifies optimal substitution windows, potentially improving team performance by 5-8%'
  },
  {
    id: 'binge-optimizer',
    title: 'Binge Optimizer',
    subtitle: 'Context-Aware Streaming Recommendations',
    description: 'Detects your viewing context (solo chill, social gathering, family night) and recommends content optimized for that specific moment.',
    tags: ['Recommendation Systems', 'Context Detection', 'Personalization'],
    category: 'entertainment',
    image: '📺',
    demoUrl: '/projects/binge-optimizer',
    featured: false,
    color: 'from-red-500 to-pink-500',
    icon: '📺',
    keyFeatures: [
      'Viewing context detection (time, device, user patterns)',
      'Multi-context recommendation engine',
      'Binge-worthiness scoring based on narrative structure',
      'Social viewing optimization for groups',
      'Fatigue-aware session management'
    ],
    techStack: ['Python', 'FastAPI', 'Next.js', 'PostgreSQL', 'Collaborative Filtering', 'Random Forest'],
    impact: 'Reduces "what to watch" decision time by 70% through context-aware recommendations'
  },
  {
    id: 'trainbrain',
    title: 'TrainBrain',
    subtitle: 'Adaptive Fitness Intelligence',
    description: 'Learns from your workout performance to automatically adjust training plans, preventing plateaus and optimizing progress.',
    tags: ['Fitness Tech', 'Adaptive ML', 'Time Series'],
    category: 'personal',
    image: '💪',
    demoUrl: '/projects/trainbrain',
    featured: false,
    color: 'from-indigo-500 to-purple-500',
    icon: '💪',
    keyFeatures: [
      'Performance trend analysis and plateau detection',
      'Adaptive workout difficulty adjustment',
      'Recovery prediction based on biomarkers',
      'Injury risk assessment',
      'Personalized progression curves'
    ],
    techStack: ['Python', 'FastAPI', 'Next.js', 'Time Series Analysis', 'Prophet', 'PostgreSQL'],
    impact: 'Reduces training plateaus by 45% through adaptive difficulty adjustment'
  },
  {
    id: 'flavor-transformer',
    title: 'Flavor Transformer',
    subtitle: 'AI Recipe Adaptation Engine',
    description: 'Transforms recipes based on dietary restrictions, available ingredients, and taste preferences while maintaining flavor profiles.',
    tags: ['NLP', 'Recipe Analysis', 'Constraint Optimization'],
    category: 'personal',
    image: '🍳',
    featured: false,
    color: 'from-yellow-500 to-orange-500',
    icon: '🍳',
    keyFeatures: [
      'Ingredient substitution with flavor profile matching',
      'Dietary constraint satisfaction (vegan, keto, allergies)',
      'Pantry optimization based on available ingredients',
      'Nutritional balancing',
      'Cooking technique adaptation'
    ],
    techStack: ['Python', 'FastAPI', 'Next.js', 'NLP', 'spaCy', 'Recipe APIs', 'Constraint Programming'],
    impact: 'Enables 90%+ of recipes to be adapted for dietary restrictions while maintaining flavor'
  },
  {
    id: 'citypulse',
    title: 'CityPulse',
    subtitle: 'Real-time Urban Sentiment Analysis',
    description: 'Analyzes social media, reviews, and public data to create a real-time emotional heatmap of NYC neighborhoods.',
    tags: ['NLP', 'Sentiment Analysis', 'Real-time Analytics', 'Geospatial'],
    category: 'urban',
    image: '💓',
    featured: false,
    color: 'from-pink-500 to-rose-500',
    icon: '💓',
    keyFeatures: [
      'Real-time sentiment extraction from Twitter, Reddit, Yelp',
      'Neighborhood-level emotional heatmap',
      'Dominant emotion classification (joy, frustration, excitement)',
      'Temporal sentiment trends',
      'Event detection from sentiment spikes'
    ],
    techStack: ['Python', 'FastAPI', 'Next.js', 'React-Leaflet', 'DistilBERT', 'PostgreSQL', 'Redis'],
    impact: 'Provides real-time pulse on neighborhood sentiment, useful for residents and local businesses'
  },
]

export const getFeaturedProjects = () => projects.filter(p => p.featured)

export const getProjectsByCategory = (category: string) =>
  projects.filter(p => p.category === category)

export const getProjectById = (id: string) =>
  projects.find(p => p.id === id)
