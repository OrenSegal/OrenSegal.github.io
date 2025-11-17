# AI Engineer Portfolio

A professional, minimal, and dynamic portfolio website designed specifically for AI Engineers and Data Professionals. Built with a focus on showcasing business impact, technical depth, and product building capabilities.

## ✨ Features

### **Professional & Impact-Focused**
- **Business Metrics**: Prominent display of measurable achievements (17% revenue growth, 99.5% forecast accuracy)
- **Timeline Journey**: Visual story from Data Analyst to AI Engineer
- **Project Showcase**: Detailed current work (Shelfie) plus strategic portfolio suggestions
- **Skills Matrix**: Organized by AI/ML, Software Engineering, Data Engineering, and Analytics

### **Dynamic & Engaging**
- **Animated Code Terminal**: Live-typing Python code showcasing your tech stack
- **Counter Animations**: Smooth number animations for impact metrics
- **Scroll Animations**: Fade-in effects with staggered timing
- **Responsive Design**: Mobile-first approach that works beautifully on all devices

### **Minimal & Clean**
- **Typography**: Inter for content, JetBrains Mono for code
- **Color Palette**: Professional blue accent with clean grays
- **Whitespace**: Generous spacing for easy reading
- **Performance**: Optimized with lazy loading and efficient animations

## 📁 File Structure

```
portfolio/
├── index.html          # Main HTML structure with semantic markup
├── styles.css          # Complete CSS with responsive design
├── script.js           # JavaScript for animations and interactions
└── README.md           # This file
```

## 🚀 Quick Start

### Option 1: Local Development
1. Clone or download this repository
2. Open `index.html` in your browser
3. Customize the placeholders with your information

### Option 2: Deploy to GitHub Pages
1. Create a new GitHub repository
2. Push these files to the main branch
3. Go to Settings → Pages → Select main branch
4. Your site will be live at `https://[username].github.io/[repo-name]`

### Option 3: Deploy to Netlify/Vercel
1. Drag and drop the folder to [Netlify](https://app.netlify.com/drop) or [Vercel](https://vercel.com/new)
2. Your site will be live instantly with a custom domain option

## ⚙️ Customization Guide

### 1. Personal Information

Replace ALL placeholders marked with `[...]`:

#### Header/Navigation
```html
<!-- Line 17 in index.html -->
<a href="#home" class="nav-logo">[YN]</a>
```
**Replace with**: Your initials (e.g., "JS" for John Smith)

#### Contact Information
```html
<!-- Lines 700-726 in index.html -->
<span>[Your City]</span>
<a href="mailto:[your.email@example.com]">[your.email@example.com]</a>
<a href="tel:[+1234567890]">[+1 (234) 567-890]</a>
<a href="https://linkedin.com/in/[your-profile]">/in/[your-profile]</a>
```

### 2. Education (Optional)

The current portfolio focuses on experience and skills. To add an Education section:

1. Add after the About section in `index.html` (line ~170):

```html
<section id="education" class="section">
    <div class="container">
        <div class="section-header">
            <span class="section-label">Education</span>
            <h2 class="section-title">Academic Background</h2>
        </div>
        <div class="experience-card">
            <div class="experience-header">
                <div>
                    <h3>Bachelor of Science in Information Systems</h3>
                    <p class="experience-company">The Academic College of Tel Aviv</p>
                </div>
                <div class="experience-period">
                    <span>2014-2018</span>
                </div>
            </div>
        </div>
    </div>
</section>
```

2. Add navigation link (line ~20):
```html
<a href="#education">Education</a>
```

### 3. Adjust Your Story

The website tells your career journey. Customize these sections:

#### Hero Section (Lines 36-64)
- Update the value proposition to match your unique selling points
- Modify the stats to reflect your achievements
- Change the hero description to tell your story

#### About Section (Lines 84-169)
- Timeline: Update with your career milestones
- Narrative: Rewrite "The Transition" to reflect your journey
- Highlights: Modify the 4 cards to emphasize your strengths

#### Experience Section (Lines 172-260)
- Shelfie: Replace with your current project or primary work
- Reshet 13: Add your previous roles
- Keep the impact metrics prominent

### 4. Portfolio Projects

The site includes **6 suggested portfolio projects** to amplify your story:

**High Priority** (Do these first):
1. **TV Analytics Dashboard**: Showcase your 17% revenue impact
2. **AI Data Analyst Agent**: Combine data expertise with LLM agents

**Medium Priority**:
3. **Production ML System**: Demonstrate your 99.5% forecasting accuracy
4. **Computer Vision App**: Show your Shelfie-related CV skills

**Nice to Have**:
5. **Automated ETL Pipeline**: Highlight data engineering
6. **RAG-Based Knowledge Assistant**: Modern LLM application

Each suggestion includes:
- **Why** it matters for your story
- **Impact** it demonstrates
- **Tech stack** to use
- **Time estimate** to complete

**To add completed projects**:
Replace the suggestions section with real project cards following this template:

```html
<div class="project-card featured-project">
    <div class="project-badge">Completed Project</div>
    <div class="project-content">
        <h3>Your Project Name</h3>
        <p class="project-tagline">One-line description</p>
        <p class="project-description">
            Detailed description of what you built, the problem it solves,
            and the technologies used.
        </p>
        <div class="project-tech">
            <span>Python</span>
            <span>TensorFlow</span>
            <span>FastAPI</span>
        </div>
    </div>
    <div class="project-visual">
        <!-- Add screenshot or demo -->
    </div>
</div>
```

### 5. Skills Customization

#### Update AI/ML Skills (Lines 509-543)
Modify based on your actual expertise:
- LLM Applications
- ML Frameworks
- Computer Vision
- NLP

#### Update Software Engineering (Lines 546-572)
Adjust languages and frameworks you use

#### Update Certifications (Lines 640-683)
Add/remove certifications as needed. The current list matches your resume.

### 6. Color Scheme

To change the accent color, modify the CSS variables in `styles.css` (lines 10-11):

```css
:root {
    --color-accent: #2563eb;        /* Primary blue */
    --color-accent-hover: #1d4ed8;  /* Darker on hover */
}
```

Popular alternatives:
- **Purple**: `#8b5cf6` / `#7c3aed`
- **Teal**: `#14b8a6` / `#0d9488`
- **Green**: `#10b981` / `#059669`
- **Orange**: `#f59e0b` / `#d97706`

## 📊 Portfolio Strategy

Based on your resume, here's the recommended approach:

### Phase 1 (Weeks 1-2): Build "TV Analytics Dashboard"
**Why**: This is your signature achievement - 17% revenue growth is huge. Show the world HOW you did it.
- Use simulated/anonymized data
- Showcase forecasting accuracy
- Include audience segmentation
- Add decision support visualizations

### Phase 2 (Week 3): Build "AI Data Analyst Agent"
**Why**: Positions you at the cutting edge while leveraging your domain expertise.
- Multi-agent architecture (planner, coder, critic)
- Natural language to insights
- Automated visualization generation
- Shows you understand modern AI patterns

### Phase 3 (Ongoing): Add Depth
Choose one:
- **Production ML System** - if targeting ML Engineer roles
- **Computer Vision App** - if targeting AI Product roles
- **ETL Pipeline** - if targeting Data Engineering roles

With Shelfie + 2-3 showcase projects, you'll have a portfolio that tells a complete story:
✓ Business impact (TV Dashboard)
✓ Technical depth (Production ML/CV)
✓ AI innovation (LLM Agent)
✓ Product building (Shelfie)

## 🎯 Who This Portfolio Is For

This design works best for professionals with:
- **Background in data/analytics** transitioning to AI engineering
- **Proven business impact** (revenue, efficiency, accuracy metrics)
- **Production ML experience** (not just notebooks)
- **Full-stack capabilities** (backend, frontend, deployment)
- **Founder/product mindset** (building complete solutions)

If this describes you, this portfolio will help you stand out.

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup for accessibility
- **CSS3**: Modern features (Grid, Flexbox, Variables, Animations)
- **JavaScript (ES6+)**: Intersection Observer, requestAnimationFrame, async/await
- **Fonts**: Google Fonts (Inter, JetBrains Mono)

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance
- **Lazy loading** for images
- **Intersection Observer** for animations
- **RequestIdleCallback** for non-critical resources
- **Debounced/throttled** scroll handlers
- **No external dependencies** (except fonts)

### Accessibility
- Semantic HTML5 elements
- ARIA labels where appropriate
- Keyboard navigation support
- Sufficient color contrast ratios
- Responsive font sizes

## 🚀 Deployment Checklist

Before deploying:
- [ ] Replace ALL `[...]` placeholders with your information
- [ ] Update the meta description in `<head>` (line 6)
- [ ] Update the page `<title>` (line 7)
- [ ] Test on mobile devices
- [ ] Check all links work correctly
- [ ] Verify email/phone links function
- [ ] Test smooth scrolling navigation
- [ ] Validate HTML (https://validator.w3.org/)
- [ ] Test loading speed (https://pagespeed.web.dev/)
- [ ] Add Google Analytics (optional)
- [ ] Add your own domain (optional)

## 📈 Next Steps

1. **Customize the content** with your personal information
2. **Build one portfolio project** from the suggestions
3. **Deploy the site** to GitHub Pages, Netlify, or Vercel
4. **Share your portfolio** on LinkedIn and in job applications
5. **Iterate based on feedback** from mentors and peers

## 💡 Tips for Maximum Impact

### Content Strategy
- **Lead with impact**: Start every bullet with the result (17% revenue increase, 99.5% accuracy)
- **Be specific**: Use exact numbers, not ranges ("70+" not "many")
- **Tell a story**: Your journey from data to AI should be clear and compelling
- **Show, don't tell**: Link to live projects whenever possible

### Visual Strategy
- **Keep it minimal**: Less is more - focus on clarity over decoration
- **Use whitespace**: Let content breathe - don't cram information
- **Consistent alignment**: Keep margins and padding uniform
- **Professional photos**: If adding a headshot, use a professional photo

### Technical Strategy
- **Portfolio first, then apply**: Build 1-2 showcase projects before sending applications
- **GitHub prominence**: Link to well-documented GitHub repos
- **Live demos**: Host projects with live links, not just code
- **Case studies**: For each project, explain problem → solution → impact

## 🤝 Support

This portfolio was custom-designed based on your specific resume and career trajectory. The structure emphasizes:
- Your unique data-to-AI transition
- Proven business impact (17%, 99.5%, 70+, 12%)
- Full-stack AI product building
- Continuous learning (7 certifications)

If you have questions about customization, refer to this README or the inline HTML comments.

## 📝 License

This portfolio template is provided as-is for personal use. Feel free to customize and deploy it as your own.

---

**Built with focus on clarity, impact, and professionalism** 🚀

Good luck with your AI engineering journey!
