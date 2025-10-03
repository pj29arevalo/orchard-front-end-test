# Orchard Front-end Test 

> A production-ready, responsive website showcasing molecular gastronomy content with interactive gallery and cards components. Built with Vite for lightning-fast development and optimized production builds.

## 🚀 [Live Demo](https://pj-orchard-test.netlify.app)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Development](#-development)
- [Build & Deploy](#-build--deploy)

---

## ✨ Features

### Interactive Components
- **📸 Gallery Modal**: Click images to view larger versions with keyboard navigation support
- **🔗 Link Tracking**: Console logging for all card link interactions with detailed analytics
- **⌨️ Keyboard Navigation**: Full accessibility with Tab, Enter, ESC, and Arrow keys
- **📱 Responsive Design**: Seamless experience from 320px mobile to 4K desktop

### Technical Highlights
- ⚡ **Vite Build System**: Lightning-fast HMR and optimized production builds
- 🎨 **Custom CSS Architecture**: BEM methodology with CSS Grid and Flexbox
- 🌐 **SEO Optimized**: Comprehensive meta tags and semantic HTML
- ♿ **WCAG 2.1 AA Compliant**: Full screen reader and keyboard support
- 📦 **CMS Ready**: JSON-driven content structure for easy integration
- 🚀 **Performance Optimized**: Lazy loading, code splitting, and tree shaking

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Build Tool** | Vite 5.0 |
| **JavaScript** | Vanilla ES6+ (No frameworks) |
| **CSS** | Custom CSS3 (No Tailwind) |
| **HTML** | Semantic HTML5 |
| **Deployment** | Netlify |
| **CI/CD** | Netlify builds when a change is pushed to repository |

---

## 📁 Project Structure

```
orchard-front-end-test/
├── index.html                    # Main HTML (MUST be in root for Vite)
├── src/
│   ├── assets/
│   │   ├── images/              # Image assets
│   ├── data/
│   │   ├── content.json        # CMS-ready content data
│   ├── styles/
│   │   ├── main.css            # Main CSS entry (imports all styles)
│   │   ├── base/
│   │   │   ├── reset.css       # CSS reset
│   │   │   ├── variables.css   # CSS custom properties
│   │   │   └── typography.css  # Typography styles
│   │   └── components/
│   │       ├── gallery.css     # Gallery component styles
│   │       ├── cards.css       # Cards component styles
│   │       └── modal.css       # Modal component styles
│   └── scripts/
│       ├── main.js              # Main JS entry point
│       ├── components/
│       │   ├── GalleryModal.js      # Gallery modal component
│       │   └── CardLinkTracker.js   # Link tracking component
│       └── utils/
│           └── helpers.js       # Utility functions
├── dist/                        # Production build (generated)
├── .gitignore
├── LICENSE
├── README.md
├── netlify.toml
├── package.json
└── vite.config.js              # Vite configuration
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pj29arevalo/orchard-front-end-test.git
   cd orchard-front-end-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   
   The site will open automatically at [http://localhost:8080](http://localhost:8080)

4. **Build for production**
   ```bash
   npm run build
   ```

That's it! 🎉

---

## 💻 Development

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | Build for production to `dist/` folder |
| `npm run preview` | Preview production build locally |
| `npm run clean` | Clean the `dist/` folder |

### Development Workflow

1. **Start the dev server**
   ```bash
   npm run dev
   ```
   - Instant server start
   - Hot Module Replacement (HMR)
   - Source maps for debugging

2. **Make your changes**
   - Edit files in `src/` directory
   - Changes reflect instantly in the browser
   - Console logs preserved for debugging

3. **Test production build**
   ```bash
   npm run build
   npm run preview
   ```

### Code Organization

#### JavaScript Modules
```javascript
// src/scripts/main.js
import '../styles/main.css';  // Vite processes CSS imports
import { GalleryModal } from './components/GalleryModal.js';
import { CardLinkTracker } from './components/CardLinkTracker.js';
```

#### CSS Structure
```css
/* src/styles/main.css */
@import './base/variables.css';
@import './base/reset.css';
@import './base/typography.css';
@import './components/gallery.css';
@import './components/cards.css';
@import './components/modal.css';
```

#### Content Management
```json
// src/data/content.json
{
  "gallery": {
    "title": "What Does Cooking Mean?",
    "content": ["..."],
    "images": [...]
  },
  "cards": {
    "title": "Taste The Colours",
    "items": [...]
  }
}
```

---

## 🏗 Build & Deploy

### Production Build

```bash
npm run build
```

**Build Output:**
- Minified JavaScript with tree shaking
- Optimized and minified CSS
- Compressed images

### Deployment Options

#### Netlify

1. **Connect repository to Netlify**

2. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

3. **Deploy**
   - Push to main branch
   - Automatic deployment on every commit

Follow the prompts to deploy.

### Continuous Deployment

Netlify App automatically:
- ✅ Installs dependencies
- ✅ Builds the project to netlify when changes pushed automatically