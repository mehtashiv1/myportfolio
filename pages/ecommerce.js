import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Page() {
  useEffect(() => {
    // Re-run original site scripts after mount
    const script = document.createElement('script')
    script.text = `
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
  });

  // Intersection observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card, .feature-item, .testimonial-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
  });
`
    document.body.appendChild(script)
    return () => document.body.removeChild(script)
  }, [])

  return (
    <>
      <Head>
        <title>VAULTED — Curated Luxury</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Outfit:wght@200;300;400;500&display=swap" rel="stylesheet" />
      </Head>

      {/* Back to home button */}
      <Link href="/" style={{
        position: 'fixed', top: 24, left: 24, zIndex: 99999,
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '8px 18px',
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid #c9a96e50',
        color: '#c9a96e',
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
    --ink: #0a0a09;
    --ink-muted: #5a5a56;
    --ink-faint: #b0afa8;
    --sand: #f5f3ee;
    --sand-deep: #ece9e1;
    --gold: #c9a96e;
    --gold-pale: #e8dcc8;
    --white: #fafaf8;
    --border: rgba(10,10,9,0.1);
    --border-strong: rgba(10,10,9,0.2);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Outfit', sans-serif;
    font-weight: 300;
    background: var(--white);
    color: var(--ink);
    overflow-x: hidden;
    cursor: none;
  }

  /* Custom cursor */
  .cursor {
    position: fixed;
    width: 8px; height: 8px;
    background: var(--ink);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: transform 0.1s, width 0.3s, height 0.3s, background 0.3s;
  }
  .cursor-ring {
    position: fixed;
    width: 32px; height: 32px;
    border: 1px solid var(--ink);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: transform 0.12s ease-out, width 0.3s, height 0.3s, opacity 0.3s;
    opacity: 0.4;
  }
  body:has(.cursor-hover) .cursor { width: 48px; height: 48px; background: var(--gold); opacity: 0.3; }
  body:has(.cursor-hover) .cursor-ring { opacity: 0; }

  /* Nav */
  nav {
    position: fixed; top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 28px 60px;
    mix-blend-mode: multiply;
  }
  .nav-logo {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 400;
    font-size: 22px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--ink);
    text-decoration: none;
  }
  .nav-links {
    display: flex; gap: 40px; list-style: none;
  }
  .nav-links a {
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-muted);
    text-decoration: none;
    transition: color 0.3s;
  }
  .nav-links a:hover { color: var(--ink); }
  .nav-right {
    display: flex; align-items: center; gap: 28px;
  }
  .nav-right a {
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-muted);
    text-decoration: none;
    transition: color 0.3s;
  }
  .nav-right a:hover { color: var(--ink); }
  .cart-count {
    display: inline-flex; align-items: center; justify-content: center;
    width: 18px; height: 18px;
    background: var(--ink);
    color: var(--white);
    font-size: 9px;
    border-radius: 50%;
    margin-left: 4px;
    font-weight: 400;
  }

  /* Hero */
  .hero {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: var(--sand);
    overflow: hidden;
  }
  .hero-left {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 120px 60px 80px;
    position: relative;
  }
  .hero-label {
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 32px;
    display: flex; align-items: center; gap: 12px;
  }
  .hero-label::before {
    content: '';
    width: 40px; height: 1px;
    background: var(--gold);
    display: block;
  }
  .hero-headline {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(56px, 6vw, 88px);
    line-height: 1.0;
    letter-spacing: -0.01em;
    margin-bottom: 40px;
  }
  .hero-headline em {
    font-style: italic;
    color: var(--ink-muted);
  }
  .hero-sub {
    font-size: 13px;
    line-height: 1.8;
    color: var(--ink-muted);
    max-width: 320px;
    margin-bottom: 56px;
  }
  .hero-actions {
    display: flex; align-items: center; gap: 32px;
  }
  .btn-primary {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 16px 36px;
    background: var(--ink);
    color: var(--white);
    font-family: 'Outfit', sans-serif;
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    text-decoration: none;
    border: none;
    cursor: none;
    transition: background 0.3s, transform 0.3s;
  }
  .btn-primary:hover { background: var(--gold); transform: translateY(-2px); }
  .btn-ghost {
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-muted);
    text-decoration: none;
    border-bottom: 1px solid var(--border);
    padding-bottom: 2px;
    transition: color 0.3s, border-color 0.3s;
  }
  .btn-ghost:hover { color: var(--ink); border-color: var(--ink); }

  .hero-scroll-indicator {
    position: absolute;
    bottom: 80px;
    right: 0;
    writing-mode: vertical-rl;
    font-size: 9px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--ink-faint);
    transform: rotate(180deg);
    display: flex; align-items: center; gap: 12px;
  }
  .hero-scroll-indicator::after {
    content: '';
    width: 1px; height: 48px;
    background: var(--ink-faint);
    display: block;
    animation: scrollLine 2s ease-in-out infinite;
  }
  @keyframes scrollLine {
    0%, 100% { opacity: 0.3; transform: scaleY(0.5); }
    50% { opacity: 1; transform: scaleY(1); }
  }

  .hero-right {
    position: relative;
    overflow: hidden;
  }
  .hero-image-container {
    width: 100%; height: 100%;
    background: var(--sand-deep);
    position: relative;
    overflow: hidden;
  }
  .hero-img-placeholder {
    position: absolute; inset: 0;
    background: linear-gradient(160deg, #e8e2d6 0%, #d4cbb8 50%, #c4b99f 100%);
    display: flex; align-items: center; justify-content: center;
  }
  .hero-product-visual {
    width: 65%;
    aspect-ratio: 0.75;
    background: var(--white);
    margin: 0 auto;
    position: relative;
    transform: translateY(10px);
    box-shadow: 40px 60px 120px rgba(0,0,0,0.12);
    animation: heroFloat 6s ease-in-out infinite;
  }
  @keyframes heroFloat {
    0%, 100% { transform: translateY(10px); }
    50% { transform: translateY(-10px); }
  }
  .hero-product-visual::before {
    content: '';
    position: absolute;
    top: 20px; left: 20px; right: 20px; bottom: 20px;
    background: linear-gradient(135deg, #f5f0e8 0%, #e8dcc8 100%);
  }
  .hero-product-visual::after {
    content: 'VAULTED';
    font-family: 'Cormorant Garamond', serif;
    font-size: 11px;
    letter-spacing: 0.4em;
    color: var(--ink-faint);
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
  }
  .hero-product-tag {
    position: absolute;
    bottom: 60px; right: 60px;
    background: var(--white);
    padding: 20px 24px;
    text-align: right;
  }
  .hero-product-tag .name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    margin-bottom: 4px;
  }
  .hero-product-tag .price {
    font-size: 12px;
    color: var(--gold);
    letter-spacing: 0.1em;
  }
  .hero-counter {
    position: absolute;
    top: 60px; right: 60px;
    font-size: 11px;
    color: var(--ink-faint);
    letter-spacing: 0.15em;
  }

  /* Marquee */
  .marquee-strip {
    background: var(--ink);
    color: var(--white);
    padding: 16px 0;
    overflow: hidden;
    white-space: nowrap;
  }
  .marquee-track {
    display: inline-flex;
    animation: marquee 20s linear infinite;
    gap: 0;
  }
  .marquee-item {
    display: inline-flex;
    align-items: center;
    gap: 24px;
    padding: 0 40px;
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
  }
  .marquee-item .dot {
    width: 4px; height: 4px;
    background: var(--gold);
    border-radius: 50%;
    flex-shrink: 0;
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  /* Collections */
  .section { padding: 120px 60px; }
  .section-header {
    display: flex; align-items: flex-end; justify-content: space-between;
    margin-bottom: 64px;
  }
  .section-label {
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 16px;
    display: flex; align-items: center; gap: 10px;
  }
  .section-label::before {
    content: '';
    width: 24px; height: 1px;
    background: var(--gold);
  }
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(36px, 4vw, 52px);
    line-height: 1.05;
  }
  .section-title em { font-style: italic; color: var(--ink-muted); }
  .view-all {
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-muted);
    text-decoration: none;
    display: flex; align-items: center; gap: 8px;
    border-bottom: 1px solid var(--border);
    padding-bottom: 2px;
    transition: color 0.3s;
  }
  .view-all:hover { color: var(--ink); }
  .view-all .arrow { font-size: 14px; transition: transform 0.3s; }
  .view-all:hover .arrow { transform: translateX(4px); }

  /* Product grid */
  .products-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
  }
  .product-card {
    position: relative;
    background: var(--sand);
    cursor: none;
    overflow: hidden;
  }
  .product-card.featured {
    grid-row: span 2;
  }
  .product-image {
    aspect-ratio: 0.85;
    position: relative;
    overflow: hidden;
    background: var(--sand-deep);
  }
  .product-card.featured .product-image {
    aspect-ratio: 0.6;
  }
  .product-image-inner {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    transition: transform 0.6s ease;
  }
  .product-card:hover .product-image-inner { transform: scale(1.04); }
  .product-img-mock {
    width: 55%;
    aspect-ratio: 0.75;
    background: var(--white);
    box-shadow: 0 20px 60px rgba(0,0,0,0.1);
    position: relative;
    overflow: hidden;
  }
  .product-img-mock::before {
    content: '';
    position: absolute; inset: 12px;
    background: linear-gradient(135deg, rgba(201,169,110,0.2) 0%, transparent 100%);
  }
  .product-overlay {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 20px;
    background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.4s;
  }
  .product-card:hover .product-overlay { opacity: 1; }
  .product-quick-add {
    display: flex; align-items: center; justify-content: center;
    width: 100%; padding: 12px;
    background: var(--white);
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    border: none;
    cursor: none;
    color: var(--ink);
  }
  .product-info {
    padding: 20px 20px 24px;
  }
  .product-category {
    font-size: 9px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--ink-faint);
    margin-bottom: 8px;
  }
  .product-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 8px;
  }
  .product-price {
    font-size: 13px;
    color: var(--gold);
    letter-spacing: 0.05em;
  }
  .product-price .original {
    color: var(--ink-faint);
    text-decoration: line-through;
    margin-left: 8px;
    font-size: 12px;
  }
  .product-badge {
    position: absolute;
    top: 16px; left: 16px;
    background: var(--ink);
    color: var(--white);
    font-size: 9px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 5px 10px;
  }

  /* Feature strip */
  .features-strip {
    background: var(--sand);
    padding: 80px 60px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2px;
  }
  .feature-item {
    padding: 40px 32px;
    background: var(--white);
  }
  .feature-icon {
    width: 36px; height: 36px;
    margin-bottom: 24px;
    opacity: 0.4;
  }
  .feature-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    margin-bottom: 12px;
  }
  .feature-desc {
    font-size: 12px;
    line-height: 1.8;
    color: var(--ink-muted);
  }

  /* Editorial */
  .editorial {
    padding: 120px 60px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    background: var(--ink);
    color: var(--white);
  }
  .editorial-left {
    background: #141410;
    padding: 80px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .editorial-eyebrow {
    font-size: 9px;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 24px;
    display: flex; align-items: center; gap: 10px;
  }
  .editorial-eyebrow::before {
    content: '';
    width: 24px; height: 1px;
    background: var(--gold);
  }
  .editorial-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(40px, 4.5vw, 64px);
    line-height: 1.0;
    margin-bottom: 32px;
    color: var(--white);
  }
  .editorial-title em { font-style: italic; color: rgba(255,255,255,0.5); }
  .editorial-body {
    font-size: 13px;
    line-height: 1.9;
    color: rgba(255,255,255,0.5);
    max-width: 360px;
    margin-bottom: 48px;
  }
  .btn-light {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 16px 36px;
    background: transparent;
    color: var(--white);
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    text-decoration: none;
    border: 1px solid rgba(255,255,255,0.3);
    cursor: none;
    width: fit-content;
    transition: background 0.3s, border-color 0.3s;
  }
  .btn-light:hover { background: var(--gold); border-color: var(--gold); }
  .editorial-right {
    position: relative;
    overflow: hidden;
    min-height: 600px;
  }
  .editorial-image {
    position: absolute; inset: 0;
    background: linear-gradient(160deg, #2a2418 0%, #1a1710 50%, #0d0c09 100%);
    display: flex; align-items: center; justify-content: center;
  }
  .editorial-product-mock {
    width: 50%;
    aspect-ratio: 0.65;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(201,169,110,0.3);
    position: relative;
    animation: heroFloat 8s ease-in-out infinite;
  }
  .editorial-product-mock::after {
    content: '';
    position: absolute;
    top: 24px; left: 24px; right: 24px; bottom: 24px;
    background: linear-gradient(135deg, rgba(201,169,110,0.15) 0%, transparent 100%);
  }

  /* Testimonials */
  .testimonials {
    padding: 120px 60px;
    background: var(--white);
    text-align: center;
  }
  .testimonial-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    margin-top: 72px;
  }
  .testimonial-item {
    padding: 48px 40px;
    border: 1px solid var(--border);
    position: relative;
  }
  .testimonial-item::before {
    content: '\\201C';
    font-family: 'Cormorant Garamond', serif;
    font-size: 80px;
    color: var(--gold-pale);
    position: absolute;
    top: 16px; left: 28px;
    line-height: 1;
  }
  .testimonial-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-style: italic;
    line-height: 1.6;
    color: var(--ink);
    margin-bottom: 32px;
    position: relative;
    z-index: 1;
  }
  .testimonial-author {
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ink-faint);
  }
  .testimonial-stars {
    color: var(--gold);
    font-size: 12px;
    margin-bottom: 16px;
    letter-spacing: 4px;
  }

  /* Newsletter */
  .newsletter {
    background: var(--sand);
    padding: 100px 60px;
    text-align: center;
  }
  .newsletter-label {
    font-size: 9px;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 20px;
  }
  .newsletter-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(36px, 4vw, 52px);
    margin-bottom: 16px;
  }
  .newsletter-sub {
    font-size: 13px;
    color: var(--ink-muted);
    margin-bottom: 48px;
  }
  .newsletter-form {
    display: flex;
    max-width: 480px;
    margin: 0 auto;
    border: 1px solid var(--border-strong);
  }
  .newsletter-input {
    flex: 1;
    padding: 16px 24px;
    background: var(--white);
    border: none;
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    color: var(--ink);
    outline: none;
  }
  .newsletter-input::placeholder { color: var(--ink-faint); }
  .newsletter-btn {
    padding: 16px 32px;
    background: var(--ink);
    color: var(--white);
    font-family: 'Outfit', sans-serif;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    border: none;
    cursor: none;
    transition: background 0.3s;
  }
  .newsletter-btn:hover { background: var(--gold); }

  /* Footer */
  footer {
    background: var(--ink);
    color: var(--white);
    padding: 80px 60px 40px;
  }
  .footer-top {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 60px;
    margin-bottom: 80px;
  }
  .footer-brand .logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 20px;
    display: block;
  }
  .footer-brand p {
    font-size: 12px;
    line-height: 1.9;
    color: rgba(255,255,255,0.4);
    max-width: 260px;
  }
  .footer-col h4 {
    font-size: 9px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 24px;
  }
  .footer-col ul { list-style: none; }
  .footer-col li { margin-bottom: 12px; }
  .footer-col a {
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    text-decoration: none;
    transition: color 0.3s;
    letter-spacing: 0.03em;
  }
  .footer-col a:hover { color: var(--white); }
  .footer-bottom {
    border-top: 1px solid rgba(255,255,255,0.08);
    padding-top: 32px;
    display: flex; align-items: center; justify-content: space-between;
    font-size: 11px;
    color: rgba(255,255,255,0.25);
    letter-spacing: 0.05em;
  }

  /* Animations */
  .fade-up {
    opacity: 0;
    transform: translateY(30px);
    animation: fadeUp 0.8s ease forwards;
  }
  .fade-up.delay-1 { animation-delay: 0.15s; }
  .fade-up.delay-2 { animation-delay: 0.3s; }
  .fade-up.delay-3 { animation-delay: 0.45s; }
  @keyframes fadeUp {
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 900px) {
    nav { padding: 24px 32px; }
    .nav-links { display: none; }
    .hero { grid-template-columns: 1fr; }
    .hero-right { min-height: 50vh; }
    .hero-left { padding: 120px 32px 60px; }
    .section { padding: 80px 32px; }
    .products-grid { grid-template-columns: 1fr 1fr; }
    .product-card.featured { grid-row: span 1; }
    .features-strip { grid-template-columns: 1fr 1fr; padding: 60px 32px; }
    .editorial { grid-template-columns: 1fr; }
    .editorial-left { padding: 60px 32px; }
    .editorial-right { min-height: 400px; }
    .testimonial-grid { grid-template-columns: 1fr; }
    .footer-top { grid-template-columns: 1fr 1fr; gap: 40px; }
    footer { padding: 60px 32px 32px; }
  }
` }} />

      {/* Inject original site HTML */}
      <div dangerouslySetInnerHTML={{ __html: `

<div class="cursor" id="cursor"></div>
<div class="cursor-ring" id="cursorRing"></div>

<!-- Nav -->
<nav>
  <a href="#" class="nav-logo">Vaulted</a>
  <ul class="nav-links">
    <li><a href="#">Collections</a></li>
    <li><a href="#">New Arrivals</a></li>
    <li><a href="#">Lookbook</a></li>
    <li><a href="#">About</a></li>
  </ul>
  <div class="nav-right">
    <a href="#">Search</a>
    <a href="#">Account</a>
    <a href="#">Bag <span class="cart-count">2</span></a>
  </div>
</nav>

<!-- Hero -->
<section class="hero">
  <div class="hero-left">
    <div class="hero-label fade-up">New Collection — SS 2025</div>
    <h1 class="hero-headline fade-up delay-1">
      Objects of<br>Rare <em>Beauty</em>
    </h1>
    <p class="hero-sub fade-up delay-2">
      A carefully curated selection of luxury goods — each piece chosen for its exceptional craft, enduring design, and quiet presence.
    </p>
    <div class="hero-actions fade-up delay-3">
      <a href="#" class="btn-primary">Explore Collection <span>→</span></a>
      <a href="#" class="btn-ghost">View Lookbook</a>
    </div>
    <div class="hero-scroll-indicator">Scroll</div>
  </div>
  <div class="hero-right">
    <div class="hero-image-container">
      <div class="hero-img-placeholder">
        <div class="hero-product-visual"></div>
      </div>
      <div class="hero-product-tag">
        <div class="name">Arcadia Bag</div>
        <div class="price">₹ 24,900</div>
      </div>
      <div class="hero-counter">01 / 06</div>
    </div>
  </div>
</section>

<!-- Marquee -->
<div class="marquee-strip">
  <div class="marquee-track">
    <span class="marquee-item"><span class="dot"></span>Free Shipping Above ₹5,000</span>
    <span class="marquee-item"><span class="dot"></span>Handcrafted in India</span>
    <span class="marquee-item"><span class="dot"></span>30-Day Returns</span>
    <span class="marquee-item"><span class="dot"></span>Sustainable Materials</span>
    <span class="marquee-item"><span class="dot"></span>Lifetime Warranty</span>
    <span class="marquee-item"><span class="dot"></span>Limited Editions Available Now</span>
    <span class="marquee-item"><span class="dot"></span>Free Shipping Above ₹5,000</span>
    <span class="marquee-item"><span class="dot"></span>Handcrafted in India</span>
    <span class="marquee-item"><span class="dot"></span>30-Day Returns</span>
    <span class="marquee-item"><span class="dot"></span>Sustainable Materials</span>
    <span class="marquee-item"><span class="dot"></span>Lifetime Warranty</span>
    <span class="marquee-item"><span class="dot"></span>Limited Editions Available Now</span>
  </div>
</div>

<!-- Collections -->
<section class="section">
  <div class="section-header">
    <div>
      <div class="section-label">Curated Selection</div>
      <h2 class="section-title">New <em>Arrivals</em></h2>
    </div>
    <a href="#" class="view-all">View All <span class="arrow">→</span></a>
  </div>

  <div class="products-grid">
    <div class="product-card featured">
      <div class="product-badge">New</div>
      <div class="product-image">
        <div class="product-image-inner">
          <div class="product-img-mock"></div>
        </div>
        <div class="product-overlay">
          <button class="product-quick-add">Quick Add</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">Handbags</div>
        <div class="product-name">Meridian Tote</div>
        <div class="product-price">₹ 18,500</div>
      </div>
    </div>

    <div class="product-card">
      <div class="product-image">
        <div class="product-image-inner">
          <div class="product-img-mock"></div>
        </div>
        <div class="product-overlay">
          <button class="product-quick-add">Quick Add</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">Accessories</div>
        <div class="product-name">Soleil Watch</div>
        <div class="product-price">₹ 42,000 <span class="original">₹ 56,000</span></div>
      </div>
    </div>

    <div class="product-card">
      <div class="product-image">
        <div class="product-image-inner">
          <div class="product-img-mock"></div>
        </div>
        <div class="product-overlay">
          <button class="product-quick-add">Quick Add</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">Fragrance</div>
        <div class="product-name">Vetiver Noir</div>
        <div class="product-price">₹ 8,900</div>
      </div>
    </div>

    <div class="product-card">
      <div class="product-badge">Sale</div>
      <div class="product-image">
        <div class="product-image-inner">
          <div class="product-img-mock"></div>
        </div>
        <div class="product-overlay">
          <button class="product-quick-add">Quick Add</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">Leather Goods</div>
        <div class="product-name">Cardholder</div>
        <div class="product-price">₹ 3,200 <span class="original">₹ 4,500</span></div>
      </div>
    </div>

    <div class="product-card">
      <div class="product-image">
        <div class="product-image-inner">
          <div class="product-img-mock"></div>
        </div>
        <div class="product-overlay">
          <button class="product-quick-add">Quick Add</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">Jewellery</div>
        <div class="product-name">Arc Bracelet</div>
        <div class="product-price">₹ 12,700</div>
      </div>
    </div>
  </div>
</section>

<!-- Features -->
<div class="features-strip">
  <div class="feature-item">
    <svg class="feature-icon" viewBox="0 0 36 36" fill="none" stroke="#0a0a09" stroke-width="1"><rect x="4" y="8" width="28" height="20" rx="1"/><path d="M4 14h28"/><circle cx="10" cy="22" r="2"/></svg>
    <div class="feature-title">Secure Checkout</div>
    <p class="feature-desc">End-to-end encryption on every transaction. Your data, always protected.</p>
  </div>
  <div class="feature-item">
    <svg class="feature-icon" viewBox="0 0 36 36" fill="none" stroke="#0a0a09" stroke-width="1"><path d="M18 4l3 9h9l-7.5 5.5 3 9L18 22l-7.5 5.5 3-9L6 13h9z"/></svg>
    <div class="feature-title">Authenticated Pieces</div>
    <p class="feature-desc">Every item verified by our team of luxury authentication specialists.</p>
  </div>
  <div class="feature-item">
    <svg class="feature-icon" viewBox="0 0 36 36" fill="none" stroke="#0a0a09" stroke-width="1"><path d="M6 18s3-10 12-10 12 10 12 10-3 10-12 10S6 18 6 18z"/><circle cx="18" cy="18" r="4"/></svg>
    <div class="feature-title">White Glove Delivery</div>
    <p class="feature-desc">Delivered in signature packaging with personal notification at every step.</p>
  </div>
  <div class="feature-item">
    <svg class="feature-icon" viewBox="0 0 36 36" fill="none" stroke="#0a0a09" stroke-width="1"><path d="M18 4v10M18 22v10M4 18h10M22 18h10"/><circle cx="18" cy="18" r="6"/></svg>
    <div class="feature-title">Lifetime Support</div>
    <p class="feature-desc">Complimentary care, repair, and restoration services for life.</p>
  </div>
</div>

<!-- Editorial -->
<section class="editorial">
  <div class="editorial-left">
    <div class="editorial-eyebrow">The Journal</div>
    <h2 class="editorial-title">The Art of <em>Slow</em><br>Fashion</h2>
    <p class="editorial-body">
      In an age of fast everything, we believe in the opposite. Each piece in the Vaulted collection is designed to last decades — not seasons. We explore why timeless always outlasts trendy.
    </p>
    <a href="#" class="btn-light">Read the Story →</a>
  </div>
  <div class="editorial-right">
    <div class="editorial-image">
      <div class="editorial-product-mock"></div>
    </div>
  </div>
</section>

<!-- Testimonials -->
<section class="testimonials">
  <div>
    <div class="section-label" style="justify-content: center;">Client Stories</div>
    <h2 class="section-title">What They <em>Say</em></h2>
  </div>
  <div class="testimonial-grid">
    <div class="testimonial-item">
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text">"The craftsmanship is extraordinary. I've never owned something that felt this intentional."</p>
      <div class="testimonial-author">— Priya M., Mumbai</div>
    </div>
    <div class="testimonial-item">
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text">"Vaulted understands luxury the way it should be — quiet, considered, and lasting."</p>
      <div class="testimonial-author">— Rohan S., Delhi</div>
    </div>
    <div class="testimonial-item">
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text">"The packaging alone sets a standard. This is what a luxury experience should feel like."</p>
      <div class="testimonial-author">— Anika T., Bengaluru</div>
    </div>
  </div>
</section>

<!-- Newsletter -->
<section class="newsletter">
  <div class="newsletter-label">Stay in the Loop</div>
  <h2 class="newsletter-title">Join the Circle</h2>
  <p class="newsletter-sub">Early access to new arrivals, private sales, and editorial content. No noise — just what matters.</p>
  <div class="newsletter-form">
    <input type="email" class="newsletter-input" placeholder="Your email address">
    <button class="newsletter-btn">Subscribe</button>
  </div>
</section>

<!-- Footer -->
<footer>
  <div class="footer-top">
    <div class="footer-brand">
      <span class="logo">Vaulted</span>
      <p>A luxury ecommerce experience built for the discerning few. Objects chosen for craft, beauty, and permanence.</p>
    </div>
    <div class="footer-col">
      <h4>Shop</h4>
      <ul>
        <li><a href="#">New Arrivals</a></li>
        <li><a href="#">Handbags</a></li>
        <li><a href="#">Jewellery</a></li>
        <li><a href="#">Fragrance</a></li>
        <li><a href="#">Accessories</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Company</h4>
      <ul>
        <li><a href="#">Our Story</a></li>
        <li><a href="#">Sustainability</a></li>
        <li><a href="#">Artisans</a></li>
        <li><a href="#">Journal</a></li>
        <li><a href="#">Press</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Help</h4>
      <ul>
        <li><a href="#">Shipping</a></li>
        <li><a href="#">Returns</a></li>
        <li><a href="#">Authenticity</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">FAQ</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2025 Vaulted. All rights reserved.</span>
    <span>Made with intention.</span>
  </div>
</footer>

<script>
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
  });

  // Intersection observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card, .feature-item, .testimonial-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
  });
</script>
` }} />
    </>
  )
}
