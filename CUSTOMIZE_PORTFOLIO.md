# 📝 Portfolio Website Customization Guide
## Quick Start - Replace Placeholders

This guide helps you customize your portfolio website with your personal information in under 10 minutes.

---

## 🔍 **Find & Replace All Placeholders**

### **Method 1: Search & Replace (Recommended)**

Open `index.html` in your editor and use Find & Replace:

1. **`[YN]`** → Your Initials (e.g., "OS" for Oren Segal)
   - **1 occurrence** (line 17: navigation logo)

2. **`[Your Name]`** → Full Name
   - **2 occurrences** (lines 7, 742: page title, footer)

3. **`[Your City]`** → Location (e.g., "New York, NY")
   - **1 occurrence** (line 704: contact section)

4. **`[your.email@example.com]`** → Your Email
   - **3 occurrences** (lines 711, 730, 731: contact info, CTA buttons)

5. **`[+1 (234) 567-890]`** → Your Phone
   - **1 occurrence** (line 718: contact section)

6. **`[your-profile]`** → LinkedIn Username
   - **3 occurrences** (lines 725, 731, 732: contact info, CTA button)

---

## 📍 **Line-by-Line Replacement Guide**

### **1. Page Title (Line 7)**
```html
<!-- BEFORE -->
<title>[Your Name] | AI Engineer & Product Builder</title>

<!-- AFTER -->
<title>Oren Segal | AI Engineer & Product Builder</title>
```

### **2. Navigation Logo (Line 17)**
```html
<!-- BEFORE -->
<a href="#home" class="nav-logo">[YN]</a>

<!-- AFTER -->
<a href="#home" class="nav-logo">OS</a>
```

### **3. Contact Section - Location (Line 704)**
```html
<!-- BEFORE -->
<span>[Your City]</span>

<!-- AFTER -->
<span>New York, NY</span>
```

### **4. Contact Section - Email (Lines 710-711)**
```html
<!-- BEFORE -->
<strong>Email</strong>
<a href="mailto:[your.email@example.com]">[your.email@example.com]</a>

<!-- AFTER -->
<strong>Email</strong>
<a href="mailto:oren@example.com">oren@example.com</a>
```

### **5. Contact Section - Phone (Lines 717-718)**
```html
<!-- BEFORE -->
<strong>Phone</strong>
<a href="tel:[+1234567890]">[+1 (234) 567-890]</a>

<!-- AFTER -->
<strong>Phone</strong>
<a href="tel:+12125551234">+1 (212) 555-1234</a>
```

### **6. Contact Section - LinkedIn (Lines 724-725)**
```html
<!-- BEFORE -->
<strong>LinkedIn</strong>
<a href="https://linkedin.com/in/[your-profile]" target="_blank">/in/[your-profile]</a>

<!-- AFTER -->
<strong>LinkedIn</strong>
<a href="https://linkedin.com/in/orensegal" target="_blank">/in/orensegal</a>
```

### **7. Contact CTA Buttons (Lines 730-731)**
```html
<!-- BEFORE -->
<a href="mailto:[your.email@example.com]" class="btn btn-primary">Send Email</a>
<a href="https://linkedin.com/in/[your-profile]" target="_blank" class="btn btn-secondary">Connect on LinkedIn</a>

<!-- AFTER -->
<a href="mailto:oren@example.com" class="btn btn-primary">Send Email</a>
<a href="https://linkedin.com/in/orensegal" target="_blank" class="btn btn-secondary">Connect on LinkedIn</a>
```

### **8. Footer (Line 742)**
```html
<!-- BEFORE -->
<p>&copy; 2025 [Your Name]. Built with focus on impact and clarity.</p>

<!-- AFTER -->
<p>&copy; 2025 Oren Segal. Built with focus on impact and clarity.</p>
```

---

## ✅ **Verification Checklist**

After replacing, verify:
- [ ] Navigation logo shows your initials
- [ ] Browser tab shows your name
- [ ] Contact section has correct city
- [ ] Email links work when clicked
- [ ] Phone link works when clicked (opens phone app on mobile)
- [ ] LinkedIn link opens correct profile
- [ ] Footer shows your name

---

## 🎨 **Optional Customizations**

### **1. Add Your Photo (Optional)**

Add to hero section (after line 65):
```html
<div class="hero-visual">
    <img src="/path/to/your/photo.jpg" alt="Your Name" class="profile-photo" />
    <!-- existing code block -->
</div>
```

Add CSS to `styles.css`:
```css
.profile-photo {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    object-fit: cover;
    border: 5px solid var(--color-accent);
    box-shadow: var(--shadow-xl);
}
```

### **2. Update Meta Description (Line 6)**
```html
<!-- Make it more specific to you -->
<meta name="description" content="Oren Segal - AI Engineer with proven track record of 17% revenue growth. Specializing in LLMs, computer vision, and production ML systems.">
```

### **3. Add Favicon**

1. Create or download a favicon (your initials or logo)
2. Add to `<head>` section (after line 7):
```html
<link rel="icon" href="/favicon.ico" />
```

### **4. Customize About Narrative (Lines 132-143)**

Make it more personal:
```html
<h3>The Transition</h3>
<p>
    After [describe your journey - e.g., "After spending 5 years at Israel's
    second-largest TV network, where I proved that data-driven decision making
    could drive 17% revenue growth, I realized..."]
</p>
<p>
    [Your passion statement - e.g., "I'm particularly passionate about building
    AI applications that combine technical sophistication with real-world utility.
    My experience has taught me that the best AI solutions are those that solve
    actual problems, not just technical curiosities."]
</p>
```

### **5. Add Google Analytics (Optional)**

Add before closing `</head>` tag:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🚀 **Quick Deploy Checklist**

Before deploying:
1. [ ] All placeholders replaced
2. [ ] Links tested locally
3. [ ] Mobile view checked
4. [ ] All sections reviewed for accuracy
5. [ ] Portfolio projects updated (remove suggestions, add real projects as you build them)

---

## 📱 **Test Your Portfolio**

1. **Open locally:**
   ```bash
   # Simple method - just open the file
   open index.html  # Mac
   start index.html  # Windows
   xdg-open index.html  # Linux
   ```

2. **Test on mobile:**
   - Open browser dev tools (F12)
   - Toggle device toolbar
   - Test iPhone and Android views

3. **Check all links:**
   - Email: Should open mail app
   - Phone: Should prompt to call
   - LinkedIn: Should open your profile
   - Navigation: Should smooth scroll

---

## 🌐 **Deploy to GitHub Pages**

```bash
# Your code is already on the branch
# Just enable GitHub Pages:
1. Go to your repo on GitHub
2. Settings → Pages
3. Source: Deploy from branch
4. Branch: claude/build-portfolio-website-01FvANkmWTnaYW2U8Y29c5B4
5. Save

# Your site will be live at:
# https://[username].github.io/portfolio/
```

---

## 💡 **Quick Template**

Copy this template and fill in your details:

```
Name: [Your Full Name]
Initials: [YN]
City: [Your City, State]
Email: [your.email@domain.com]
Phone: [+1 (XXX) XXX-XXXX]
LinkedIn: [linkedin-username]
```

Then use Find & Replace to update all at once!

---

## 🎯 **Next Steps After Customization**

1. **Deploy the portfolio** (GitHub Pages/Netlify/Vercel)
2. **Start building Spotify Genes** (your first showcase project)
3. **Update portfolio with completed projects** (replace suggestions)
4. **Share on LinkedIn** ("Check out my new AI Engineering portfolio!")

---

**Your portfolio is ready to go live! 🚀**

All placeholders replaced? Deploy it and start building projects!
