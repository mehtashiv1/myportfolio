import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Page() {
  useEffect(() => {
    // Re-run original site scripts after mount
    const script = document.createElement('script')
    script.text = `
  // FAQ toggle
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal, .program-card, .product-card-w, .pillar-item').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
`
    document.body.appendChild(script)
    return () => document.body.removeChild(script)
  }, [])

  return (
    <>
      <Head>
        <title>AURA — Precision Wellness</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@200;300;400;500&display=swap" rel="stylesheet" />
      </Head>

      {/* Back to home button */}
      <Link href="/" style={{
        position: 'fixed', top: 24, left: 24, zIndex: 99999,
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '8px 18px',
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid #8fa88950',
        color: '#8fa889',
        fontSize: 10,
        letterSpacing: '0.2em',
        textDecoration: 'none',
        textTransform: 'uppercase',
        fontFamily: 'sans-serif',
        fontWeight: 400,
        borderRadius: 2,
        transition: 'all 0.3s',
      }}>← Home</Link>

      {/* Inject original site styles */}
      <style dangerouslySetInnerHTML={{ __html: `
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --sage: #8fa889;
    --sage-pale: #e8ede6;
    --sage-deep: #5a7055;
    --moss: #3d5240;
    --cream: #f8f6f0;
    --cream-warm: #f0ece0;
    --stone: #d4cfc4;
    --ink: #1c1c1a;
    --ink-muted: #6b6b65;
    --ink-faint: #a8a89e;
    --white: #fdfcf9;
    --border: rgba(28,28,26,0.1);
  }

  html { scroll-behavior: smooth; }
  body {
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    background: var(--white);
    color: var(--ink);
    overflow-x: hidden;
  }

  /* Nav */
  nav {
    position: fixed; top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 24px 64px;
    background: rgba(253,252,249,0.9);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-family: 'DM Serif Display', serif;
    font-size: 20px;
    letter-spacing: 0.15em;
    color: var(--ink);
    text-decoration: none;
    display: flex; align-items: center; gap: 10px;
  }
  .nav-logo .dot {
    width: 7px; height: 7px;
    background: var(--sage);
    border-radius: 50%;
    animation: pulse 3s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.4); opacity: 0.7; }
  }
  .nav-links { display: flex; gap: 36px; list-style: none; }
  .nav-links a {
    font-size: 13px;
    color: var(--ink-muted);
    text-decoration: none;
    font-weight: 400;
    letter-spacing: 0.02em;
    transition: color 0.3s;
  }
  .nav-links a:hover { color: var(--ink); }
  .nav-cta {
    display: flex; align-items: center; gap: 16px;
  }
  .nav-login {
    font-size: 13px;
    color: var(--ink-muted);
    text-decoration: none;
    transition: color 0.3s;
  }
  .nav-login:hover { color: var(--ink); }
  .nav-btn {
    padding: 11px 28px;
    background: var(--moss);
    color: var(--white);
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.08em;
    text-decoration: none;
    border-radius: 40px;
    transition: background 0.3s, transform 0.2s;
  }
  .nav-btn:hover { background: var(--sage-deep); transform: translateY(-1px); }

  /* Hero */
  .hero {
    padding: 160px 64px 100px;
    background: var(--cream);
    position: relative;
    overflow: hidden;
  }
  .hero-bg-shape {
    position: absolute;
    right: -200px; top: -200px;
    width: 700px; height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(143,168,137,0.15) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-bg-shape2 {
    position: absolute;
    left: 30%; bottom: -100px;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(143,168,137,0.1) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-inner {
    max-width: 1200px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 8px 16px;
    background: var(--sage-pale);
    border-radius: 40px;
    font-size: 11px;
    color: var(--sage-deep);
    letter-spacing: 0.05em;
    font-weight: 400;
    margin-bottom: 32px;
  }
  .hero-tag .status {
    width: 6px; height: 6px;
    background: var(--sage);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  .hero-headline {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(48px, 5.5vw, 76px);
    line-height: 1.0;
    margin-bottom: 28px;
    letter-spacing: -0.01em;
  }
  .hero-headline .accent { color: var(--sage); }
  .hero-headline em { font-style: italic; }
  .hero-sub {
    font-size: 15px;
    line-height: 1.8;
    color: var(--ink-muted);
    margin-bottom: 52px;
    max-width: 420px;
  }
  .hero-actions {
    display: flex; align-items: center; gap: 24px;
    flex-wrap: wrap;
  }
  .btn-forest {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 16px 36px;
    background: var(--moss);
    color: var(--white);
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.05em;
    text-decoration: none;
    border-radius: 40px;
    transition: background 0.3s, transform 0.2s;
  }
  .btn-forest:hover { background: var(--sage-deep); transform: translateY(-2px); }
  .btn-outline-forest {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 15px 36px;
    background: transparent;
    color: var(--ink);
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.05em;
    text-decoration: none;
    border: 1px solid var(--border);
    border-radius: 40px;
    transition: background 0.3s, border-color 0.3s;
  }
  .btn-outline-forest:hover { background: var(--sage-pale); border-color: var(--sage); }
  .hero-trust {
    display: flex; align-items: center; gap: 16px;
    margin-top: 48px;
  }
  .hero-avatars {
    display: flex;
  }
  .hero-avatars .av {
    width: 32px; height: 32px;
    border-radius: 50%;
    border: 2px solid var(--white);
    margin-right: -8px;
    overflow: hidden;
    background: var(--stone);
    display: flex; align-items: center; justify-content: center;
    font-size: 10px;
    color: var(--ink-muted);
    font-weight: 500;
  }
  .hero-trust-text {
    font-size: 12px;
    color: var(--ink-muted);
    line-height: 1.5;
  }
  .hero-trust-text strong {
    color: var(--ink);
    font-weight: 500;
    display: block;
  }

  /* Hero visual */
  .hero-visual {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hero-orb {
    width: 420px; height: 420px;
    border-radius: 50%;
    background: var(--sage-pale);
    position: relative;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .hero-orb::before {
    content: '';
    position: absolute;
    width: 88%; height: 88%;
    border-radius: 50%;
    background: linear-gradient(145deg, #e0e9dd 0%, #d0dece 100%);
    animation: orbRotate 20s linear infinite;
  }
  @keyframes orbRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .hero-orb::after {
    content: '';
    position: absolute;
    width: 75%; height: 75%;
    border-radius: 50%;
    background: linear-gradient(145deg, #d4e0d0 0%, #b8ccb4 100%);
    z-index: 1;
  }
  .orb-center {
    position: relative;
    z-index: 2;
    text-align: center;
    background: rgba(253,252,249,0.95);
    border-radius: 50%;
    width: 55%;
    aspect-ratio: 1;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 4px;
  }
  .orb-center .metric {
    font-family: 'DM Serif Display', serif;
    font-size: 36px;
    color: var(--ink);
    line-height: 1;
  }
  .orb-center .metric-label {
    font-size: 10px;
    letter-spacing: 0.12em;
    color: var(--ink-muted);
    text-transform: uppercase;
  }
  .orb-badge {
    position: absolute;
    background: var(--white);
    border-radius: 12px;
    padding: 12px 16px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.08);
    font-size: 12px;
    color: var(--ink);
    white-space: nowrap;
  }
  .orb-badge.top { top: 20px; right: -20px; }
  .orb-badge.left { left: -10px; top: 50%; transform: translateY(-50%); }
  .orb-badge.bottom { bottom: 30px; right: 0px; }
  .orb-badge .badge-title {
    font-weight: 500;
    font-size: 13px;
    margin-bottom: 2px;
    color: var(--moss);
  }
  .orb-badge .badge-sub {
    font-size: 11px;
    color: var(--ink-muted);
  }
  .orb-badge .badge-icon {
    font-size: 18px;
    margin-bottom: 4px;
  }

  /* Stats */
  .stats-strip {
    background: var(--white);
    padding: 60px 64px;
    border-bottom: 1px solid var(--border);
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
  }
  .stat-item { text-align: center; }
  .stat-number {
    font-family: 'DM Serif Display', serif;
    font-size: 48px;
    line-height: 1;
    margin-bottom: 8px;
    color: var(--ink);
  }
  .stat-label {
    font-size: 12px;
    color: var(--ink-muted);
    letter-spacing: 0.05em;
  }
  .stat-divider {
    width: 1px;
    background: var(--border);
    height: 100%;
    margin: 0 auto;
    display: none;
  }

  /* Products / Programs */
  .programs {
    padding: 120px 64px;
    background: var(--cream);
  }
  .section-eyebrow {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--sage-deep);
    margin-bottom: 16px;
    display: flex; align-items: center; gap: 10px;
  }
  .section-eyebrow::before {
    content: '';
    width: 32px; height: 1px;
    background: var(--sage);
  }
  .section-title {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(36px, 4vw, 52px);
    line-height: 1.05;
    margin-bottom: 60px;
  }
  .section-title em { font-style: italic; color: var(--sage-deep); }
  .programs-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  .program-card {
    background: var(--white);
    border-radius: 24px;
    overflow: hidden;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    cursor: pointer;
  }
  .program-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 64px rgba(0,0,0,0.07);
  }
  .program-card.featured {
    background: var(--moss);
    color: var(--white);
  }
  .program-visual {
    height: 220px;
    background: var(--sage-pale);
    display: flex; align-items: center; justify-content: center;
    position: relative;
    overflow: hidden;
  }
  .program-card.featured .program-visual {
    background: rgba(255,255,255,0.1);
  }
  .program-visual-orb {
    width: 110px; height: 110px;
    border-radius: 50%;
    background: rgba(143,168,137,0.4);
    display: flex; align-items: center; justify-content: center;
    font-size: 40px;
  }
  .program-card.featured .program-visual-orb {
    background: rgba(255,255,255,0.15);
  }
  .program-badge {
    position: absolute;
    top: 16px; right: 16px;
    padding: 5px 12px;
    background: var(--white);
    color: var(--sage-deep);
    border-radius: 40px;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.06em;
  }
  .program-card.featured .program-badge {
    background: rgba(255,255,255,0.2);
    color: rgba(255,255,255,0.9);
  }
  .program-body { padding: 28px; }
  .program-category {
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--sage-deep);
    margin-bottom: 10px;
    font-weight: 400;
  }
  .program-card.featured .program-category { color: rgba(255,255,255,0.6); }
  .program-name {
    font-family: 'DM Serif Display', serif;
    font-size: 24px;
    margin-bottom: 12px;
    line-height: 1.15;
  }
  .program-desc {
    font-size: 13px;
    line-height: 1.7;
    color: var(--ink-muted);
    margin-bottom: 24px;
  }
  .program-card.featured .program-desc { color: rgba(255,255,255,0.65); }
  .program-meta {
    display: flex; align-items: center; gap: 20px;
    font-size: 11px;
    color: var(--ink-faint);
    padding-top: 20px;
    border-top: 1px solid var(--border);
  }
  .program-card.featured .program-meta {
    border-top: 1px solid rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.5);
  }
  .program-meta .meta-item { display: flex; align-items: center; gap: 5px; }

  /* Philosophy */
  .philosophy {
    padding: 120px 64px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 100px;
    align-items: center;
  }
  .philosophy-visual {
    position: relative;
  }
  .philosophy-image-stack {
    position: relative;
    height: 520px;
  }
  .phi-card {
    position: absolute;
    background: var(--cream);
    border-radius: 20px;
    overflow: hidden;
  }
  .phi-card-main {
    width: 75%; height: 400px;
    left: 0; top: 0;
    background: var(--sage-pale);
    display: flex; align-items: center; justify-content: center;
  }
  .phi-card-secondary {
    width: 55%; height: 240px;
    right: 0; bottom: 0;
    background: var(--cream-warm);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 24px 60px rgba(0,0,0,0.08);
  }
  .phi-inner-orb {
    width: 80px; height: 80px;
    border-radius: 50%;
    background: rgba(143,168,137,0.5);
  }
  .phi-stat-card {
    position: absolute;
    right: -20px; top: 120px;
    background: var(--white);
    border-radius: 16px;
    padding: 20px 24px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.08);
    z-index: 10;
    min-width: 160px;
  }
  .phi-stat-val {
    font-family: 'DM Serif Display', serif;
    font-size: 36px;
    color: var(--moss);
    line-height: 1;
  }
  .phi-stat-text {
    font-size: 11px;
    color: var(--ink-muted);
    margin-top: 4px;
  }

  .philosophy-content {}
  .philosophy-content .section-eyebrow { margin-bottom: 20px; }
  .philosophy-content .section-title { margin-bottom: 32px; }
  .philosophy-content p {
    font-size: 15px;
    line-height: 1.9;
    color: var(--ink-muted);
    margin-bottom: 20px;
  }
  .pillars {
    margin-top: 40px;
    display: flex; flex-direction: column; gap: 0;
  }
  .pillar-item {
    display: flex; gap: 20px;
    padding: 20px 0;
    border-bottom: 1px solid var(--border);
    align-items: flex-start;
  }
  .pillar-num {
    font-family: 'DM Serif Display', serif;
    font-size: 14px;
    color: var(--sage);
    min-width: 28px;
    padding-top: 2px;
  }
  .pillar-text h4 {
    font-weight: 500;
    font-size: 15px;
    margin-bottom: 4px;
    color: var(--ink);
  }
  .pillar-text p {
    font-size: 13px;
    color: var(--ink-muted);
    line-height: 1.7;
    margin: 0;
  }

  /* Products section */
  .products {
    padding: 120px 64px;
    background: var(--cream);
  }
  .products-header {
    display: flex; align-items: flex-end; justify-content: space-between;
    margin-bottom: 60px;
  }
  .product-filters {
    display: flex; gap: 8px;
  }
  .filter-btn {
    padding: 9px 20px;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 40px;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    color: var(--ink-muted);
    cursor: pointer;
    transition: all 0.3s;
  }
  .filter-btn.active, .filter-btn:hover {
    background: var(--moss);
    color: var(--white);
    border-color: var(--moss);
  }
  .products-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
  .product-card-w {
    background: var(--white);
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .product-card-w:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(0,0,0,0.06);
  }
  .product-img-w {
    height: 200px;
    background: var(--sage-pale);
    display: flex; align-items: center; justify-content: center;
    position: relative;
  }
  .product-img-orb {
    width: 80px; height: 80px;
    border-radius: 50%;
    background: rgba(143,168,137,0.4);
  }
  .product-rating {
    position: absolute;
    bottom: 12px; right: 12px;
    background: var(--white);
    border-radius: 8px;
    padding: 4px 10px;
    font-size: 11px;
    color: var(--ink);
    display: flex; align-items: center; gap: 4px;
    font-weight: 500;
  }
  .product-rating .star { color: #c9a96e; }
  .product-body-w { padding: 20px; }
  .product-name-w {
    font-weight: 500;
    font-size: 15px;
    margin-bottom: 4px;
    color: var(--ink);
  }
  .product-sub-w {
    font-size: 12px;
    color: var(--ink-muted);
    margin-bottom: 16px;
  }
  .product-price-row {
    display: flex; align-items: center; justify-content: space-between;
  }
  .product-price-w {
    font-weight: 500;
    font-size: 16px;
    color: var(--ink);
  }
  .product-add-btn {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: var(--moss);
    border: none;
    color: var(--white);
    font-size: 18px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.3s, transform 0.2s;
  }
  .product-add-btn:hover { background: var(--sage-deep); transform: scale(1.1); }

  /* Testimonial/Social Proof */
  .social-proof {
    padding: 100px 64px;
    background: var(--moss);
    color: var(--white);
    text-align: center;
  }
  .proof-eyebrow {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--sage);
    margin-bottom: 16px;
  }
  .proof-quote {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(28px, 3.5vw, 44px);
    line-height: 1.25;
    max-width: 680px;
    margin: 0 auto 32px;
    color: var(--white);
  }
  .proof-author {
    font-size: 12px;
    color: rgba(255,255,255,0.5);
    letter-spacing: 0.05em;
  }
  .proof-author strong { color: var(--sage); font-weight: 400; }
  .proof-metrics {
    display: flex; justify-content: center; gap: 64px;
    margin-top: 72px;
    flex-wrap: wrap;
  }
  .proof-metric {}
  .proof-metric-val {
    font-family: 'DM Serif Display', serif;
    font-size: 44px;
    color: var(--white);
    margin-bottom: 6px;
  }
  .proof-metric-label {
    font-size: 12px;
    color: rgba(255,255,255,0.5);
  }

  /* FAQ strip */
  .faq {
    padding: 120px 64px;
    max-width: 800px;
    margin: 0 auto;
  }
  .faq-item {
    border-bottom: 1px solid var(--border);
    padding: 28px 0;
    cursor: pointer;
  }
  .faq-question {
    display: flex; align-items: center; justify-content: space-between;
    font-weight: 500;
    font-size: 16px;
    color: var(--ink);
  }
  .faq-icon {
    width: 28px; height: 28px;
    border-radius: 50%;
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    color: var(--ink-muted);
    flex-shrink: 0;
    transition: transform 0.3s, background 0.3s;
  }
  .faq-item.open .faq-icon {
    transform: rotate(45deg);
    background: var(--sage-pale);
  }
  .faq-answer {
    font-size: 14px;
    line-height: 1.8;
    color: var(--ink-muted);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease, padding 0.4s ease;
    padding-top: 0;
  }
  .faq-item.open .faq-answer {
    max-height: 200px;
    padding-top: 16px;
  }

  /* CTA */
  .cta-section {
    background: var(--cream);
    padding: 100px 64px;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 60px;
    align-items: center;
    border-top: 1px solid var(--border);
  }
  .cta-title {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(36px, 4vw, 52px);
    line-height: 1.05;
  }
  .cta-title em { font-style: italic; color: var(--sage-deep); }
  .cta-sub {
    font-size: 14px;
    color: var(--ink-muted);
    margin-top: 12px;
    max-width: 440px;
    line-height: 1.7;
  }

  /* Footer */
  footer {
    background: var(--ink);
    color: rgba(255,255,255,0.6);
    padding: 80px 64px 36px;
  }
  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 60px;
    margin-bottom: 72px;
  }
  .footer-brand-logo {
    font-family: 'DM Serif Display', serif;
    font-size: 22px;
    color: var(--white);
    margin-bottom: 16px;
    display: flex; align-items: center; gap: 8px;
  }
  .footer-brand-logo .dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--sage);
  }
  .footer-brand p {
    font-size: 13px;
    line-height: 1.8;
    max-width: 260px;
  }
  .footer-col h4 {
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--white);
    margin-bottom: 20px;
    font-weight: 500;
  }
  .footer-col ul { list-style: none; }
  .footer-col li { margin-bottom: 10px; }
  .footer-col a {
    font-size: 13px;
    color: rgba(255,255,255,0.45);
    text-decoration: none;
    transition: color 0.3s;
  }
  .footer-col a:hover { color: var(--white); }
  .footer-bottom {
    border-top: 1px solid rgba(255,255,255,0.08);
    padding-top: 28px;
    display: flex; align-items: center; justify-content: space-between;
    font-size: 12px;
  }

  /* Animations */
  .reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 900px) {
    nav { padding: 20px 24px; }
    .nav-links { display: none; }
    .hero { padding: 120px 24px 80px; }
    .hero-inner { grid-template-columns: 1fr; gap: 60px; }
    .hero-orb { width: 300px; height: 300px; }
    .stats-strip { grid-template-columns: 1fr 1fr; padding: 40px 24px; }
    .programs { padding: 80px 24px; }
    .programs-grid { grid-template-columns: 1fr; }
    .philosophy { grid-template-columns: 1fr; padding: 80px 24px; }
    .philosophy-image-stack { height: 300px; }
    .products { padding: 80px 24px; }
    .products-row { grid-template-columns: 1fr 1fr; }
    .social-proof { padding: 80px 24px; }
    .proof-metrics { gap: 40px; }
    .faq { padding: 80px 24px; }
    .cta-section { grid-template-columns: 1fr; padding: 80px 24px; }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
    footer { padding: 60px 24px 32px; }
  }
` }} />

      {/* Inject original site HTML */}
      <div dangerouslySetInnerHTML={{ __html: `

<!-- Nav -->
<nav>
  <a href="#" class="nav-logo">
    <span class="dot"></span>
    Aura
  </a>
  <ul class="nav-links">
    <li><a href="#">Programs</a></li>
    <li><a href="#">Products</a></li>
    <li><a href="#">Science</a></li>
    <li><a href="#">Community</a></li>
    <li><a href="#">Blog</a></li>
  </ul>
  <div class="nav-cta">
    <a href="#" class="nav-login">Log in</a>
    <a href="#" class="nav-btn">Start Free Trial</a>
  </div>
</nav>

<!-- Hero -->
<section class="hero">
  <div class="hero-bg-shape"></div>
  <div class="hero-bg-shape2"></div>
  <div class="hero-inner">
    <div class="hero-content">
      <div class="hero-tag">
        <span class="status"></span>
        Precision Wellness, Backed by Science
      </div>
      <h1 class="hero-headline">
        Live at Your<br><em>Peak</em><br><span class="accent">Every Day</span>
      </h1>
      <p class="hero-sub">
        Aura combines cutting-edge biometric tracking, AI-guided programs, and functional nutrition to help you perform, recover, and feel your absolute best.
      </p>
      <div class="hero-actions">
        <a href="#" class="btn-forest">Begin Your Journey →</a>
        <a href="#" class="btn-outline-forest">Watch How It Works</a>
      </div>
      <div class="hero-trust">
        <div class="hero-avatars">
          <div class="av">PA</div>
          <div class="av">MK</div>
          <div class="av">SJ</div>
          <div class="av">RT</div>
        </div>
        <div class="hero-trust-text">
          <strong>50,000+ members</strong>
          Transforming their wellness with Aura
        </div>
      </div>
    </div>
    <div class="hero-visual">
      <div class="hero-orb">
        <div class="orb-center">
          <div class="metric">97</div>
          <div class="metric-label">Wellness Score</div>
        </div>
        <div class="orb-badge top">
          <div class="badge-icon">😴</div>
          <div class="badge-title">Sleep Quality</div>
          <div class="badge-sub">8h 12m · Excellent</div>
        </div>
        <div class="orb-badge left">
          <div class="badge-title">HRV</div>
          <div class="badge-sub">72ms ↑ +8%</div>
        </div>
        <div class="orb-badge bottom">
          <div class="badge-title">Recovery</div>
          <div class="badge-sub">High · Ready to train</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Stats -->
<div class="stats-strip">
  <div class="stat-item reveal">
    <div class="stat-number">50K+</div>
    <div class="stat-label">Active Members</div>
  </div>
  <div class="stat-item reveal">
    <div class="stat-number">94%</div>
    <div class="stat-label">Report Better Sleep</div>
  </div>
  <div class="stat-item reveal">
    <div class="stat-number">3.2×</div>
    <div class="stat-label">Avg. Energy Increase</div>
  </div>
  <div class="stat-item reveal">
    <div class="stat-number">28</div>
    <div class="stat-label">Wellness Programs</div>
  </div>
</div>

<!-- Programs -->
<section class="programs">
  <div class="section-eyebrow">Personalized Programs</div>
  <h2 class="section-title">Built for <em>Your</em> Body</h2>
  <div class="programs-grid">
    <div class="program-card featured">
      <div class="program-visual">
        <div class="program-visual-orb">🧘</div>
        <div class="program-badge">Most Popular</div>
      </div>
      <div class="program-body">
        <div class="program-category">Mind & Body</div>
        <div class="program-name">Deep Restoration</div>
        <p class="program-desc">A 30-day program combining breathwork, somatic release, and sleep science to rebuild your nervous system from the ground up.</p>
        <div class="program-meta">
          <span class="meta-item">🕐 30 Days</span>
          <span class="meta-item">⚡ 15 min/day</span>
          <span class="meta-item">👤 2,400 enrolled</span>
        </div>
      </div>
    </div>
    <div class="program-card">
      <div class="program-visual">
        <div class="program-visual-orb">💪</div>
        <div class="program-badge">Strength</div>
      </div>
      <div class="program-body">
        <div class="program-category">Performance</div>
        <div class="program-name">Functional Strength</div>
        <p class="program-desc">Evidence-based strength training aligned with your circadian rhythm, recovery data, and nutrition timing.</p>
        <div class="program-meta">
          <span class="meta-item">🕐 12 Weeks</span>
          <span class="meta-item">⚡ 45 min/day</span>
          <span class="meta-item">👤 1,800 enrolled</span>
        </div>
      </div>
    </div>
    <div class="program-card">
      <div class="program-visual">
        <div class="program-visual-orb">🌿</div>
        <div class="program-badge">Nutrition</div>
      </div>
      <div class="program-body">
        <div class="program-category">Metabolic Health</div>
        <div class="program-name">Gut Reset</div>
        <p class="program-desc">A guided 21-day elimination and reintroduction protocol designed to identify and resolve chronic inflammation at the root.</p>
        <div class="program-meta">
          <span class="meta-item">🕐 21 Days</span>
          <span class="meta-item">⚡ Meal-guided</span>
          <span class="meta-item">👤 3,100 enrolled</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Philosophy -->
<section class="philosophy">
  <div class="philosophy-visual">
    <div class="philosophy-image-stack">
      <div class="phi-card phi-card-main">
        <div class="phi-inner-orb"></div>
      </div>
      <div class="phi-card phi-card-secondary">
        <div class="phi-inner-orb" style="width:50px;height:50px;background:rgba(143,168,137,0.3)"></div>
      </div>
      <div class="phi-stat-card">
        <div class="phi-stat-val">87%</div>
        <div class="phi-stat-text">of users see measurable results within 30 days</div>
      </div>
    </div>
  </div>
  <div class="philosophy-content">
    <div class="section-eyebrow">Our Approach</div>
    <h2 class="section-title">Wellness Rooted in <em>Evidence</em></h2>
    <p>At Aura, we believe wellness isn't guesswork. Every recommendation is grounded in peer-reviewed research, your personal biometric data, and adaptive AI that learns as you do.</p>
    <p>We go beyond fitness tracking — we help you understand the signals your body sends, and give you the tools to respond intelligently.</p>
    <div class="pillars">
      <div class="pillar-item">
        <div class="pillar-num">01</div>
        <div class="pillar-text">
          <h4>Biometric Intelligence</h4>
          <p>Real-time analysis of HRV, sleep cycles, and stress markers to guide your daily decisions.</p>
        </div>
      </div>
      <div class="pillar-item">
        <div class="pillar-num">02</div>
        <div class="pillar-text">
          <h4>Adaptive Programming</h4>
          <p>Plans that evolve based on your progress, recovery, and changing goals — no rigid schedules.</p>
        </div>
      </div>
      <div class="pillar-item">
        <div class="pillar-num">03</div>
        <div class="pillar-text">
          <h4>Whole System View</h4>
          <p>Connecting sleep, nutrition, movement, and mindset into one integrated picture of your health.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Products -->
<section class="products">
  <div class="products-header">
    <div>
      <div class="section-eyebrow">Functional Nutrition</div>
      <h2 class="section-title" style="margin-bottom:0">Shop <em>Supplements</em></h2>
    </div>
    <div class="product-filters">
      <button class="filter-btn active">All</button>
      <button class="filter-btn">Sleep</button>
      <button class="filter-btn">Focus</button>
      <button class="filter-btn">Recovery</button>
    </div>
  </div>
  <div class="products-row">
    <div class="product-card-w">
      <div class="product-img-w">
        <div class="product-img-orb"></div>
        <div class="product-rating"><span class="star">★</span> 4.9</div>
      </div>
      <div class="product-body-w">
        <div class="product-name-w">Deep Sleep Formula</div>
        <div class="product-sub-w">Magnesium · L-Theanine · Ashwagandha</div>
        <div class="product-price-row">
          <span class="product-price-w">₹ 2,200</span>
          <button class="product-add-btn">+</button>
        </div>
      </div>
    </div>
    <div class="product-card-w">
      <div class="product-img-w" style="background:#dce8d8">
        <div class="product-img-orb" style="background:rgba(61,82,64,0.25)"></div>
        <div class="product-rating"><span class="star">★</span> 4.8</div>
      </div>
      <div class="product-body-w">
        <div class="product-name-w">Morning Focus Stack</div>
        <div class="product-sub-w">Lion's Mane · Rhodiola · B12</div>
        <div class="product-price-row">
          <span class="product-price-w">₹ 2,800</span>
          <button class="product-add-btn">+</button>
        </div>
      </div>
    </div>
    <div class="product-card-w">
      <div class="product-img-w" style="background:#e8ede4">
        <div class="product-img-orb" style="background:rgba(90,112,85,0.3)"></div>
        <div class="product-rating"><span class="star">★</span> 4.9</div>
      </div>
      <div class="product-body-w">
        <div class="product-name-w">Recovery Blend</div>
        <div class="product-sub-w">Collagen · Zinc · Curcumin</div>
        <div class="product-price-row">
          <span class="product-price-w">₹ 3,100</span>
          <button class="product-add-btn">+</button>
        </div>
      </div>
    </div>
    <div class="product-card-w">
      <div class="product-img-w" style="background:#e0e9dd">
        <div class="product-img-orb" style="background:rgba(143,168,137,0.5)"></div>
        <div class="product-rating"><span class="star">★</span> 4.7</div>
      </div>
      <div class="product-body-w">
        <div class="product-name-w">Adaptogen Complex</div>
        <div class="product-sub-w">Reishi · Cordyceps · Schisandra</div>
        <div class="product-price-row">
          <span class="product-price-w">₹ 2,500</span>
          <button class="product-add-btn">+</button>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Social Proof -->
<section class="social-proof">
  <div class="proof-eyebrow">Transformation Stories</div>
  <blockquote class="proof-quote">
    "Within 6 weeks of using Aura, my sleep quality went from erratic to exceptional. My energy is consistent, my focus is sharp, and I feel like a different person."
  </blockquote>
  <p class="proof-author">— <strong>Nisha R.</strong>, Software Engineer · Mumbai</p>
  <div class="proof-metrics">
    <div class="proof-metric">
      <div class="proof-metric-val">50K+</div>
      <div class="proof-metric-label">Lives Transformed</div>
    </div>
    <div class="proof-metric">
      <div class="proof-metric-val">4.9★</div>
      <div class="proof-metric-label">Average Rating</div>
    </div>
    <div class="proof-metric">
      <div class="proof-metric-val">94%</div>
      <div class="proof-metric-label">Renewal Rate</div>
    </div>
    <div class="proof-metric">
      <div class="proof-metric-val">28</div>
      <div class="proof-metric-label">Programs Available</div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="faq" style="padding: 100px 64px;">
  <div style="text-align:center; margin-bottom: 60px;">
    <div class="section-eyebrow" style="justify-content:center">Common Questions</div>
    <h2 class="section-title" style="margin-bottom:0">Everything You <em>Need to Know</em></h2>
  </div>
  <div class="faq-item open">
    <div class="faq-question">Is Aura suitable for beginners?<span class="faq-icon">+</span></div>
    <div class="faq-answer">Absolutely. Aura is designed to meet you wherever you are in your wellness journey. Our onboarding assessment creates a fully personalized baseline that adapts as you grow.</div>
  </div>
  <div class="faq-item">
    <div class="faq-question">Do I need any wearable devices?<span class="faq-icon">+</span></div>
    <div class="faq-answer">Wearables enhance the experience but aren't required. Aura integrates with most popular devices (Apple Watch, Garmin, Oura Ring) but the app also works using manual check-ins and sleep journaling alone.</div>
  </div>
  <div class="faq-item">
    <div class="faq-question">How is Aura different from other wellness apps?<span class="faq-icon">+</span></div>
    <div class="faq-answer">Most apps track data in silos. Aura connects sleep, nutrition, movement, and stress into one adaptive intelligence layer, giving you contextual recommendations rather than just raw numbers.</div>
  </div>
  <div class="faq-item">
    <div class="faq-question">What's included in the free trial?<span class="faq-icon">+</span></div>
    <div class="faq-answer">Your 14-day free trial includes full access to one program of your choice, the dashboard, supplement recommendations, and our community forum. No credit card required to start.</div>
  </div>
</section>

<!-- CTA -->
<section class="cta-section">
  <div>
    <h2 class="cta-title">Your Healthiest Self<br>Starts <em>Today</em></h2>
    <p class="cta-sub">Join 50,000+ people who've discovered what it feels like to truly thrive. Start with a free 14-day trial — no commitment required.</p>
  </div>
  <div style="display:flex; flex-direction:column; gap:12px; align-items:flex-start;">
    <a href="#" class="btn-forest" style="white-space:nowrap">Start Free Trial →</a>
    <span style="font-size:12px; color:var(--ink-muted)">No credit card required</span>
  </div>
</section>

<!-- Footer -->
<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <div class="footer-brand-logo"><span class="dot"></span>Aura</div>
      <p>Precision wellness for the modern human. Built on science, powered by you.</p>
    </div>
    <div class="footer-col">
      <h4>Programs</h4>
      <ul>
        <li><a href="#">Sleep & Recovery</a></li>
        <li><a href="#">Mental Performance</a></li>
        <li><a href="#">Gut Health</a></li>
        <li><a href="#">Strength & Movement</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Company</h4>
      <ul>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Science Team</a></li>
        <li><a href="#">Research</a></li>
        <li><a href="#">Careers</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Support</h4>
      <ul>
        <li><a href="#">Help Center</a></li>
        <li><a href="#">Community</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">Privacy</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2025 Aura Wellness. All rights reserved.</span>
    <span>Designed for humans, powered by science.</span>
  </div>
</footer>

<script>
  // FAQ toggle
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal, .program-card, .product-card-w, .pillar-item').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
</script>
` }} />
    </>
  )
}
