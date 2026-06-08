# My Portfolio — Three Sites

A Next.js multi-page app containing three distinct web experiences:

| Route | Site | Theme |
|-------|------|-------|
| `/` | Home / Portal | Dark landing page linking all three |
| `/ecommerce` | Vaulted | Luxury e-commerce |
| `/health` | Aura | Health & wellness |
| `/tech` | Nexus AI | AI / tech SaaS |

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel (Recommended — zero config)

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your repo — Vercel auto-detects Next.js
4. Click **Deploy** ✓

That's it. No extra config needed.

---

## Deploy to Netlify

1. Push this folder to a GitHub repo
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
3. Set **Build command**: `npm run build`
4. Set **Publish directory**: `.next`
5. Install the **Next.js Runtime** plugin when prompted (or it auto-installs)
6. Click **Deploy** ✓

---

## Project Structure

```
myportfolio/
├── pages/
│   ├── _app.js          # Global app wrapper
│   ├── index.js         # Home page (links to all 3 sites)
│   ├── ecommerce.js     # Vaulted luxury e-commerce
│   ├── health.js        # Aura wellness
│   └── tech.js          # Nexus AI
├── styles/
│   └── globals.css      # Global reset
├── package.json
├── next.config.js
├── vercel.json          # Vercel config
├── netlify.toml         # Netlify config
└── .gitignore
```

---

## Adding More Pages

1. Create a new file in `pages/`, e.g. `pages/blog.js`
2. Export a default React component
3. It's instantly available at `/blog`

No routing setup needed — Next.js handles it automatically.
