# 🫒 Olive Landing Page

A pixel-faithful recreation of the **Olive** grocery scanner app landing page, built with **React (JSX)**. Features a step-based carousel that slides product images through a phone mockup — each card enters from the right, pauses on the phone screen for 1.5 seconds, then exits to the left.

---

## 🖼️ Preview

- Sticky navbar with dropdown indicators
- Hero section with social proof avatars, headline, and iOS download CTA
- Animated phone mockup with a carousel that flows **through** the screen
- Cards pause on the phone screen, then continue sliding out
- Smooth edge fade masks and layered depth effect
- Fully responsive with mobile hamburger menu

---

## 🛠️ Tech Stack

- **React 18** (with Hooks)
- **Vite** (recommended) or Create React App
- Plain inline styles + a single `<style>` block (no extra CSS libraries)
- Google Fonts — Nunito (loaded via `@import`)

---

## 🚀 Getting Started

### Option A — Vite (Recommended, fastest)

#### 1. Install Node.js
Download and install from [https://nodejs.org](https://nodejs.org) (LTS version recommended — 18.x or higher).

Verify installation:
```bash
node -v
npm -v
```

#### 2. Create a new Vite + React project
```bash
npm create vite@latest olive-landing -- --template react
cd olive-landing
```

#### 3. Install dependencies
```bash
npm install
```

#### 4. Replace the App component
Copy `olive-landing.jsx` into the `src/` folder:
```
olive-landing/
└── src/
    ├── olive-landing.jsx   ← paste your file here
    └── main.jsx
```

Then open `src/main.jsx` and update it to:
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import OliveLanding from './olive-landing.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <OliveLanding />
  </React.StrictMode>
)
```

#### 5. Run the dev server
```bash
npm run dev
```

Open your browser at **http://localhost:5173**

---

### Option B — Create React App (CRA)

#### 1. Create a new CRA project
```bash
npx create-react-app olive-landing
cd olive-landing
```

#### 2. Replace App.js
Copy `olive-landing.jsx` into the `src/` folder, then open `src/index.js` and update it to:
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import OliveLanding from './olive-landing';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <OliveLanding />
  </React.StrictMode>
);
```

#### 3. Run the dev server
```bash
npm start
```

Open your browser at **http://localhost:3000**

---

## 📁 Project Structure

```
olive-landing/
├── src/
│   ├── olive-landing.jsx   ← Main component (all-in-one)
│   └── main.jsx            ← Entry point (Vite) or index.js (CRA)
├── public/
│   └── index.html
├── package.json
└── README.md
```

---

## 📦 Build for Production

```bash
# Vite
npm run build

# CRA
npm run build
```

Output will be in the `dist/` (Vite) or `build/` (CRA) folder — ready to deploy to Netlify, Vercel, or any static host.

---

## 🌐 Deploy to Vercel (Optional)

```bash
npm install -g vercel
vercel
```

Follow the prompts. Your site will be live at a `*.vercel.app` URL in under a minute.

---

## ⚙️ Customisation

| What                  | Where in `olive-landing.jsx`         |
|-----------------------|--------------------------------------|
| Carousel images       | `SLIDES` array (swap Unsplash URLs)  |
| Pause duration        | `PAUSE_MS` constant (default 1500ms) |
| Slide speed           | `SLIDE_MS` constant (default 700ms)  |
| Phone screen size     | `SCREEN_W`, `SCREEN_H` constants     |
| Brand colors          | CSS variables inside `<style>` block |
| Nav links             | `NAV` array                          |
| Avatar images         | `AVATARS` array                      |

---

## 🐛 Troubleshooting

**Fonts not loading?**
Make sure you have an internet connection — Nunito is loaded from Google Fonts via `@import`.

**Carousel not animating?**
The animation uses `requestAnimationFrame` and CSS transitions. Ensure you are running in a modern browser (Chrome 90+, Firefox 88+, Safari 15+).

**White margin on sides?**
Make sure `html, body` have no default margin. The component injects a global `* { margin: 0; padding: 0 }` reset but if your `index.css` overrides it, remove the conflicting styles.

**Module not found errors?**
Make sure the import path in `main.jsx` exactly matches the filename (case-sensitive on Linux/Mac).

## 🫒 Final Page Screenshot
<img width="1277" height="1381" alt="image" src="https://github.com/user-attachments/assets/af46ebf6-2173-4c28-ba73-5393572aad42" />

---

## 📄 License

MIT — free to use, modify, and distribute.
