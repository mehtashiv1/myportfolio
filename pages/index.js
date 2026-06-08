import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function Home() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0
    const cursor = cursorRef.current
    const ring = ringRef.current

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px' }
    }
    document.addEventListener('mousemove', onMove)

    const animateRing = () => {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px' }
      requestAnimationFrame(animateRing)
    }
    animateRing()

    const hoverEls = document.querySelectorAll('a, button')
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => cursor?.classList.add('cursor-big'))
      el.addEventListener('mouseleave', () => cursor?.classList.remove('cursor-big'))
    })

    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  const sites = [
    {
      href: '/ecommerce',
      label: '01',
      tag: 'E-Commerce',
      name: 'Vaulted',
      desc: 'Curated luxury goods. Slow fashion, timeless objects, white-glove delivery.',
      accent: '#c9a96e',
      bg: '#f5f3ee',
      dark: false,
      font: `'Cormorant Garamond', serif`,
    },
    {
      href: '/health',
      label: '02',
      tag: 'Health & Wellness',
      name: 'Aura',
      desc: 'Precision wellness for modern living. Science-backed supplements and routines.',
      accent: '#8fa889',
      bg: '#1c1c1a',
      dark: true,
      font: `'DM Serif Display', serif`,
    },
    {
      href: '/tech',
      label: '03',
      tag: 'Tech / AI',
      name: 'Nexus AI',
      desc: 'Intelligence infrastructure. Deploy powerful AI at enterprise scale.',
      accent: '#6378ff',
      bg: '#07080d',
      dark: true,
      font: `'Syne', sans-serif`,
    },
  ]

  return (
    <>
      <Head>
        <title>Portfolio — Three Sites</title>
        <meta name="description" content="A collection of three beautifully crafted web experiences." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;700;800&family=Outfit:wght@200;300;400&display=swap" rel="stylesheet" />
      </Head>

      {/* Custom cursor */}
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />

      <main className="home">
        {/* Header */}
        <header className="home-header">
          <span className="home-wordmark">Portfolio</span>
          <span className="home-meta">Three Sites · 2025</span>
        </header>

        {/* Hero text */}
        <section className="home-hero">
          <p className="home-tagline">Three distinct worlds.<br />One cohesive vision.</p>
          <p className="home-sub">
            A collection of handcrafted web experiences spanning luxury e-commerce,
            precision wellness, and AI infrastructure.
          </p>
        </section>

        {/* Site cards */}
        <section className="home-grid">
          {sites.map((site) => (
            <Link key={site.href} href={site.href} className="site-card" style={{ '--card-bg': site.bg, '--card-accent': site.accent }}>
              <div className="card-top">
                <span className="card-num">{site.label}</span>
                <span className="card-tag">{site.tag}</span>
              </div>
              <div className="card-center">
                <h2 className="card-name" style={{ fontFamily: site.font, color: site.dark ? '#fff' : '#0a0a09' }}>{site.name}</h2>
              </div>
              <div className="card-bottom">
                <p className="card-desc" style={{ color: site.dark ? 'rgba(255,255,255,0.5)' : 'rgba(10,10,9,0.5)' }}>{site.desc}</p>
                <span className="card-arrow" style={{ color: site.accent }}>→</span>
              </div>
              <div className="card-glow" style={{ background: site.accent }} />
            </Link>
          ))}
        </section>

        {/* Footer */}
        <footer className="home-footer">
          <span>Built with Next.js · Ready for Vercel & Netlify</span>
        </footer>
      </main>

      <style>{`
        body {
          font-family: 'Outfit', sans-serif;
          background: #0c0c0b;
          color: #e8e6e0;
          overflow-x: hidden;
          cursor: none;
        }

        /* Cursor */
        .cursor {
          position: fixed;
          width: 8px; height: 8px;
          background: #e8e6e0;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: width 0.3s, height 0.3s, background 0.3s;
        }
        .cursor.cursor-big {
          width: 40px; height: 40px;
          background: rgba(232,230,224,0.15);
        }
        .cursor-ring {
          position: fixed;
          width: 28px; height: 28px;
          border: 1px solid rgba(232,230,224,0.3);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
        }

        .home {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding: 0 60px;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Header */
        .home-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 40px 0 0;
          border-bottom: 1px solid rgba(232,230,224,0.08);
          padding-bottom: 20px;
        }
        .home-wordmark {
          font-size: 13px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(232,230,224,0.4);
        }
        .home-meta {
          font-size: 11px;
          letter-spacing: 0.15em;
          color: rgba(232,230,224,0.25);
        }

        /* Hero */
        .home-hero {
          padding: 100px 0 80px;
          max-width: 800px;
        }
        .home-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(48px, 6vw, 80px);
          line-height: 1.05;
          letter-spacing: -0.01em;
          margin-bottom: 28px;
        }
        .home-sub {
          font-size: 14px;
          line-height: 1.8;
          color: rgba(232,230,224,0.45);
          font-weight: 300;
          max-width: 440px;
        }

        /* Grid */
        .home-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          margin-bottom: 2px;
          flex: 1;
        }

        .site-card {
          position: relative;
          background: var(--card-bg);
          padding: 48px 44px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 460px;
          text-decoration: none;
          overflow: hidden;
          transition: transform 0.4s ease;
        }
        .site-card:hover { transform: translateY(-6px); z-index: 1; }
        .site-card:hover .card-glow { opacity: 0.08; }
        .site-card:hover .card-arrow { transform: translateX(6px); }

        .card-glow {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .card-num {
          font-size: 11px;
          letter-spacing: 0.2em;
          color: rgba(232,230,224,0.2);
        }
        .card-tag {
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--card-accent);
          border: 1px solid var(--card-accent);
          padding: 4px 10px;
          opacity: 0.8;
        }

        .card-center { padding: 32px 0; }
        .card-name {
          font-size: clamp(36px, 3.5vw, 54px);
          font-weight: 300;
          line-height: 1.0;
          letter-spacing: -0.01em;
        }

        .card-bottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
        }
        .card-desc {
          font-size: 12px;
          line-height: 1.7;
          font-weight: 300;
          max-width: 220px;
        }
        .card-arrow {
          font-size: 24px;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        /* Footer */
        .home-footer {
          padding: 28px 0;
          border-top: 1px solid rgba(232,230,224,0.06);
          font-size: 11px;
          color: rgba(232,230,224,0.2);
          letter-spacing: 0.1em;
          text-align: center;
        }

        @media (max-width: 900px) {
          .home { padding: 0 24px; }
          .home-grid { grid-template-columns: 1fr; }
          .site-card { min-height: 320px; }
        }
      `}</style>
    </>
  )
}
