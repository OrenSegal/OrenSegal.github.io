# Oren Segal - AI & Data Science Portfolio

A modern, interactive portfolio showcasing innovative AI and data science projects with real-world impact.

## 🚀 Live Demo

Visit the live portfolio at: [Your Vercel URL]

## 📊 Featured Projects

### 1. Urban Intelligence
Real-time sentiment + predictive neighborhood analytics combining CityPulse and NextHood to forecast transformation 18-24 months ahead using 200+ engineered features.

**Tech Stack:** Python, FastAPI, Next.js, React-Leaflet, PostgreSQL, Redis, SHAP, scikit-learn

### 2. MetroFlex
Context-aware dynamic transit routing applying Binge Optimizer's methodology to NYC transit. Automatically detects trip purpose and optimizes routes accordingly.

**Tech Stack:** Python, FastAPI, React, React-Leaflet, MTA GTFS-RT, Random Forest, A* Pathfinding

### 3. Spotify Genes
Analyzes Spotify listening history to identify your "musical DNA" - the core features defining your taste across genres, moods, and eras.

**Tech Stack:** Python, Spotify API, scikit-learn, Next.js, Recharts, PCA, t-SNE

...and 5 more innovative projects!

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Maps:** React-Leaflet + OpenStreetMap (100% FREE)
- **Charts:** Recharts + D3.js
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel (FREE tier)

## 💻 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to see the portfolio.

## 🌟 Features

- ✅ Fully responsive design
- ✅ Interactive project demos
- ✅ Modern UI with glassmorphism effects
- ✅ Smooth animations and transitions
- ✅ SEO optimized
- ✅ 100% free technology stack
- ✅ Fast performance with Next.js 14

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js 14 App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── projects/          # Project pages
│       ├── [id]/          # Dynamic project routes
│       ├── urban-intelligence/
│       └── metroflex/
├── components/            # React components
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── ProjectCard.tsx
│   └── demos/            # Interactive demos
├── lib/                  # Utilities and data
│   └── projects.ts       # Project definitions
└── public/              # Static assets
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will auto-detect Next.js and deploy

Or use the Vercel CLI:

```bash
npm install -g vercel
vercel --prod
```

## 📝 Customization

To customize the portfolio:

1. Update project data in `lib/projects.ts`
2. Modify colors in `tailwind.config.ts`
3. Update personal info in `components/Footer.tsx` and `components/Contact.tsx`
4. Add your social links in `components/Navigation.tsx`

## 📄 License

MIT License - feel free to use this portfolio as inspiration for your own!

## 📧 Contact

- Email: contact@example.com
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

---

Built with ❤️ using Next.js 14, TypeScript, and Tailwind CSS
