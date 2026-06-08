import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Page() {
  useEffect(() => {
    // Re-run original site scripts after mount
    const script = document.createElement('script')
    script.text = `
  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Observe case cards, plan cards, testimonials
  document.querySelectorAll('.case-card, .plan-card, .testimonial-card, .feature-cell').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
`
    document.body.appendChild(script)
    return () => document.body.removeChild(script)
  }, [])

  return (
    <>
      <Head>
        <title>NEXUS AI — Intelligence Infrastructure</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600&family=Syne:wght@400;500;700;800&display=swap" rel="stylesheet" />
      </Head>

      {/* Back to home button */}
      <Link href="/" style={{
        position: 'fixed', top: 24, left: 24, zIndex: 99999,
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '8px 18px',
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid #6378ff50',
        color: '#6378ff',
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
    --bg: #07080d;
    --bg-2: #0c0e16;
    --bg-3: #11131e;
    --border: rgba(255,255,255,0.07);
    --border-accent: rgba(99,120,255,0.3);
    --text: #e8eaf2;
    --text-muted: #7a7d8a;
    --text-faint: #3f4150;
    --blue: #6378ff;
    --blue-pale: rgba(99,120,255,0.12);
    --blue-glow: rgba(99,120,255,0.25);
    --teal: #38d9a9;
    --teal-pale: rgba(56,217,169,0.1);
    --white: #ffffff;
    --surface: rgba(255,255,255,0.03);
    --surface-hover: rgba(255,255,255,0.05);
  }

  html { scroll-behavior: smooth; }
  body {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 300;
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
    line-height: 1.6;
  }

  /* Noise overlay */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 1000;
    opacity: 0.5;
  }

  /* Grid bg pattern */
  .grid-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(99,120,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99,120,255,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  /* Nav */
  nav {
    position: fixed; top: 0; left: 0; right: 0;
    z-index: 500;
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 64px;
    background: rgba(7,8,13,0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    display: flex; align-items: center; gap: 10px;
    text-decoration: none;
  }
  .nav-logo-mark {
    width: 30px; height: 30px;
    border: 1px solid var(--border-accent);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    background: var(--blue-pale);
    position: relative;
    overflow: hidden;
  }
  .nav-logo-mark::before {
    content: '';
    position: absolute;
    width: 12px; height: 12px;
    background: var(--blue);
    border-radius: 2px;
    transform: rotate(45deg);
    animation: logoSpin 8s linear infinite;
  }
  @keyframes logoSpin {
    from { transform: rotate(45deg); }
    to { transform: rotate(405deg); }
  }
  .nav-logo-text {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 17px;
    letter-spacing: 0.08em;
    color: var(--white);
  }
  .nav-links { display: flex; gap: 32px; list-style: none; }
  .nav-links a {
    font-size: 13px;
    color: var(--text-muted);
    text-decoration: none;
    font-weight: 400;
    transition: color 0.3s;
    letter-spacing: 0.02em;
  }
  .nav-links a:hover { color: var(--text); }
  .nav-right { display: flex; align-items: center; gap: 16px; }
  .nav-tag {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 12px;
    background: var(--teal-pale);
    border: 1px solid rgba(56,217,169,0.2);
    border-radius: 4px;
    font-size: 10px;
    color: var(--teal);
    letter-spacing: 0.1em;
    font-weight: 500;
  }
  .nav-tag .blink {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--teal);
    animation: blink 1.5s ease-in-out infinite;
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.2; }
  }
  .nav-btn {
    padding: 10px 24px;
    background: var(--blue);
    color: var(--white);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-decoration: none;
    border-radius: 6px;
    transition: opacity 0.3s, transform 0.2s;
  }
  .nav-btn:hover { opacity: 0.85; transform: translateY(-1px); }

  /* Hero */
  .hero {
    min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 160px 64px 100px;
    position: relative;
    overflow: hidden;
  }
  .hero .grid-bg { opacity: 0.8; }
  .hero-glow {
    position: absolute;
    width: 800px; height: 800px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,120,255,0.12) 0%, transparent 70%);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  .hero-glow-2 {
    position: absolute;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(56,217,169,0.07) 0%, transparent 70%);
    top: 30%; right: 15%;
    pointer-events: none;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 8px 16px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 40px;
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 0.06em;
    margin-bottom: 40px;
    position: relative;
    z-index: 1;
  }
  .hero-badge .badge-blue {
    font-size: 11px;
    color: var(--blue);
    font-weight: 500;
    padding: 2px 8px;
    background: var(--blue-pale);
    border-radius: 4px;
  }
  .hero-headline {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: clamp(52px, 7vw, 96px);
    line-height: 0.95;
    letter-spacing: -0.03em;
    margin-bottom: 28px;
    position: relative;
    z-index: 1;
    color: var(--white);
  }
  .hero-headline .gradient-text {
    background: linear-gradient(135deg, #6378ff 0%, #38d9a9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hero-headline .outline-text {
    -webkit-text-stroke: 1px rgba(255,255,255,0.25);
    color: transparent;
  }
  .hero-sub {
    font-size: 17px;
    line-height: 1.7;
    color: var(--text-muted);
    max-width: 560px;
    margin: 0 auto 56px;
    position: relative;
    z-index: 1;
    font-weight: 300;
  }
  .hero-actions {
    display: flex; align-items: center; gap: 16px;
    justify-content: center;
    position: relative;
    z-index: 1;
  }
  .btn-primary-ai {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 16px 36px;
    background: var(--blue);
    color: var(--white);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.03em;
    text-decoration: none;
    border-radius: 8px;
    transition: opacity 0.3s, transform 0.2s, box-shadow 0.3s;
  }
  .btn-primary-ai:hover {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(99,120,255,0.3);
  }
  .btn-ghost-ai {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 15px 32px;
    background: transparent;
    color: var(--text);
    font-size: 14px;
    font-weight: 400;
    text-decoration: none;
    border: 1px solid var(--border);
    border-radius: 8px;
    transition: background 0.3s, border-color 0.3s;
    letter-spacing: 0.02em;
  }
  .btn-ghost-ai:hover { background: var(--surface-hover); border-color: rgba(255,255,255,0.15); }

  /* Trusted logos */
  .hero-logos {
    margin-top: 80px;
    position: relative;
    z-index: 1;
  }
  .hero-logos-label {
    font-size: 11px;
    color: var(--text-faint);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 24px;
  }
  .logo-row {
    display: flex; align-items: center; gap: 48px; justify-content: center;
    flex-wrap: wrap;
  }
  .logo-item {
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: var(--text-faint);
    letter-spacing: 0.05em;
    opacity: 0.5;
    transition: opacity 0.3s;
  }
  .logo-item:hover { opacity: 0.8; }

  /* Feature strip */
  .features {
    padding: 100px 64px;
    background: var(--bg-2);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2px;
  }
  .feature-cell {
    padding: 40px 32px;
    border-right: 1px solid var(--border);
  }
  .feature-cell:last-child { border-right: none; }
  .feature-num {
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 600;
    color: var(--blue);
    letter-spacing: 0.15em;
    margin-bottom: 20px;
  }
  .feature-val {
    font-family: 'Syne', sans-serif;
    font-size: 36px;
    font-weight: 800;
    color: var(--white);
    margin-bottom: 8px;
    line-height: 1;
  }
  .feature-label {
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.6;
  }

  /* Core product */
  .product {
    padding: 120px 64px;
    position: relative;
    overflow: hidden;
  }
  .product .grid-bg { opacity: 0.4; }
  .product-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 100px;
    align-items: center;
    position: relative;
    z-index: 1;
  }
  .eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 11px;
    color: var(--blue);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: 20px;
  }
  .eyebrow::before {
    content: '';
    width: 24px; height: 1px;
    background: var(--blue);
  }
  .product-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: clamp(36px, 4vw, 52px);
    line-height: 1.05;
    color: var(--white);
    margin-bottom: 24px;
    letter-spacing: -0.02em;
  }
  .product-title .accent { color: var(--blue); }
  .product-desc {
    font-size: 15px;
    line-height: 1.8;
    color: var(--text-muted);
    margin-bottom: 40px;
    font-weight: 300;
  }
  .feature-list {
    list-style: none;
    display: flex; flex-direction: column; gap: 12px;
    margin-bottom: 48px;
  }
  .feature-list li {
    display: flex; align-items: flex-start; gap: 12px;
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.5;
  }
  .feature-list li::before {
    content: '';
    width: 16px; height: 16px;
    border-radius: 50%;
    background: var(--teal-pale);
    border: 1px solid rgba(56,217,169,0.3);
    flex-shrink: 0;
    margin-top: 2px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M3 8l4 4 6-6' stroke='%2338d9a9' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-size: contain;
  }

  /* Terminal / product visual */
  .terminal {
    background: var(--bg-3);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    font-family: 'Space Grotesk', monospace;
    position: relative;
  }
  .terminal-header {
    background: rgba(255,255,255,0.03);
    border-bottom: 1px solid var(--border);
    padding: 14px 20px;
    display: flex; align-items: center; gap: 8px;
  }
  .terminal-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
  }
  .terminal-dot.red { background: #ff5f57; }
  .terminal-dot.yellow { background: #febc2e; }
  .terminal-dot.green { background: #28c840; }
  .terminal-title {
    font-size: 12px;
    color: var(--text-muted);
    margin-left: 8px;
    letter-spacing: 0.04em;
  }
  .terminal-body { padding: 28px; }
  .terminal-line {
    font-size: 13px;
    line-height: 2;
    display: flex;
    gap: 8px;
  }
  .t-prompt { color: var(--teal); }
  .t-cmd { color: var(--text); font-weight: 400; }
  .t-output { color: var(--text-muted); }
  .t-highlight { color: var(--blue); }
  .t-success { color: var(--teal); }
  .t-dim { color: var(--text-faint); }
  .terminal-divider {
    height: 1px;
    background: var(--border);
    margin: 12px 0;
  }
  .cursor-blink {
    display: inline-block;
    width: 8px; height: 14px;
    background: var(--blue);
    vertical-align: middle;
    animation: cursorBlink 1s step-end infinite;
  }
  @keyframes cursorBlink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  /* Use cases */
  .use-cases {
    padding: 120px 64px;
    background: var(--bg-2);
    border-top: 1px solid var(--border);
  }
  .use-cases-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: end;
    margin-bottom: 64px;
  }
  .use-cases-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: clamp(36px, 4vw, 52px);
    line-height: 1.05;
    color: var(--white);
    letter-spacing: -0.02em;
  }
  .use-cases-desc {
    font-size: 15px;
    line-height: 1.8;
    color: var(--text-muted);
  }
  .cases-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .case-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 32px;
    transition: border-color 0.3s, background 0.3s, transform 0.3s;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .case-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--blue) 0%, var(--teal) 100%);
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }
  .case-card:hover {
    border-color: var(--border-accent);
    background: var(--surface-hover);
    transform: translateY(-4px);
  }
  .case-card:hover::before { transform: scaleX(1); }
  .case-card.span-2 { grid-column: span 2; }
  .case-icon {
    width: 44px; height: 44px;
    border-radius: 10px;
    background: var(--blue-pale);
    border: 1px solid var(--border-accent);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 24px;
    font-size: 20px;
  }
  .case-title {
    font-family: 'Syne', sans-serif;
    font-weight: 600;
    font-size: 18px;
    color: var(--white);
    margin-bottom: 12px;
    letter-spacing: -0.01em;
  }
  .case-desc {
    font-size: 13px;
    line-height: 1.7;
    color: var(--text-muted);
    margin-bottom: 24px;
  }
  .case-tag {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 11px;
    color: var(--blue);
    font-weight: 500;
    letter-spacing: 0.04em;
  }
  .case-tag::after {
    content: '→';
    font-size: 12px;
    transition: transform 0.3s;
  }
  .case-card:hover .case-tag::after { transform: translateX(4px); }

  /* Pricing */
  .pricing {
    padding: 120px 64px;
    position: relative;
    overflow: hidden;
  }
  .pricing .grid-bg { opacity: 0.3; }
  .pricing-header {
    text-align: center;
    margin-bottom: 72px;
    position: relative;
    z-index: 1;
  }
  .pricing-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: clamp(36px, 4vw, 52px);
    color: var(--white);
    margin-bottom: 16px;
    letter-spacing: -0.02em;
  }
  .pricing-sub {
    font-size: 15px;
    color: var(--text-muted);
  }
  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    position: relative;
    z-index: 1;
  }
  .plan-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 40px;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s, border-color 0.3s;
  }
  .plan-card:hover { transform: translateY(-4px); }
  .plan-card.popular {
    border-color: var(--border-accent);
    background: var(--bg-3);
  }
  .plan-card.popular::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(99,120,255,0.4) 0%, transparent 50%, rgba(56,217,169,0.2) 100%);
    z-index: -1;
  }
  .plan-badge {
    position: absolute;
    top: 20px; right: 20px;
    padding: 4px 12px;
    background: var(--blue-pale);
    border: 1px solid var(--border-accent);
    border-radius: 4px;
    font-size: 10px;
    color: var(--blue);
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .plan-name {
    font-size: 12px;
    letter-spacing: 0.15em;
    color: var(--text-muted);
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: 20px;
  }
  .plan-price {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 52px;
    color: var(--white);
    line-height: 1;
    margin-bottom: 4px;
  }
  .plan-price span { font-size: 20px; font-weight: 400; }
  .plan-period {
    font-size: 13px;
    color: var(--text-faint);
    margin-bottom: 32px;
  }
  .plan-divider {
    height: 1px;
    background: var(--border);
    margin-bottom: 28px;
  }
  .plan-features {
    list-style: none;
    display: flex; flex-direction: column; gap: 12px;
    margin-bottom: 36px;
  }
  .plan-features li {
    display: flex; align-items: center; gap: 10px;
    font-size: 13px;
    color: var(--text-muted);
  }
  .plan-features li::before {
    content: '✓';
    font-size: 11px;
    color: var(--teal);
    font-weight: 700;
    min-width: 16px;
  }
  .plan-features li.dim {
    color: var(--text-faint);
  }
  .plan-features li.dim::before { color: var(--text-faint); }
  .plan-btn {
    display: block; width: 100%;
    padding: 14px;
    text-align: center;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.3s;
  }
  .plan-btn.outline {
    background: transparent;
    color: var(--text);
    border: 1px solid var(--border);
  }
  .plan-btn.outline:hover { background: var(--surface-hover); border-color: rgba(255,255,255,0.15); }
  .plan-btn.solid {
    background: var(--blue);
    color: var(--white);
    border: 1px solid transparent;
  }
  .plan-btn.solid:hover { opacity: 0.85; box-shadow: 0 8px 32px rgba(99,120,255,0.3); }

  /* Social proof */
  .testimonials {
    padding: 100px 64px;
    background: var(--bg-2);
    border-top: 1px solid var(--border);
  }
  .testimonials-header {
    text-align: center;
    margin-bottom: 64px;
  }
  .testimonials-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: clamp(32px, 3.5vw, 48px);
    color: var(--white);
    letter-spacing: -0.02em;
  }
  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .testimonial-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 32px;
    transition: border-color 0.3s;
  }
  .testimonial-card:hover { border-color: var(--border-accent); }
  .testimonial-header {
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 20px;
  }
  .testimonial-avatar {
    width: 40px; height: 40px;
    border-radius: 50%;
    background: var(--blue-pale);
    border: 1px solid var(--border-accent);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px;
    font-weight: 500;
    color: var(--blue);
  }
  .testimonial-name {
    font-weight: 500;
    font-size: 14px;
    color: var(--white);
    margin-bottom: 2px;
  }
  .testimonial-role {
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 0.03em;
  }
  .testimonial-stars {
    margin-left: auto;
    color: var(--blue);
    font-size: 12px;
    letter-spacing: 2px;
  }
  .testimonial-text {
    font-size: 14px;
    line-height: 1.7;
    color: var(--text-muted);
    font-style: italic;
  }

  /* CTA final */
  .cta-final {
    padding: 120px 64px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .cta-final .grid-bg { opacity: 0.5; }
  .cta-glow {
    position: absolute;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,120,255,0.1) 0%, transparent 70%);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  .cta-title {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: clamp(44px, 6vw, 80px);
    color: var(--white);
    line-height: 0.95;
    margin-bottom: 24px;
    letter-spacing: -0.03em;
    position: relative;
    z-index: 1;
  }
  .cta-title .gradient-text {
    background: linear-gradient(135deg, #6378ff 0%, #38d9a9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .cta-sub {
    font-size: 16px;
    color: var(--text-muted);
    max-width: 480px;
    margin: 0 auto 52px;
    line-height: 1.7;
    position: relative;
    z-index: 1;
  }
  .cta-actions {
    display: flex; align-items: center; gap: 16px;
    justify-content: center;
    position: relative;
    z-index: 1;
  }

  /* Footer */
  footer {
    background: var(--bg-2);
    border-top: 1px solid var(--border);
    padding: 80px 64px 40px;
  }
  .footer-top {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 60px;
    margin-bottom: 72px;
  }
  .footer-brand-desc {
    font-size: 13px;
    line-height: 1.8;
    color: var(--text-muted);
    max-width: 260px;
    margin-top: 16px;
  }
  .footer-col h4 {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text);
    font-weight: 500;
    margin-bottom: 20px;
  }
  .footer-col ul { list-style: none; }
  .footer-col li { margin-bottom: 10px; }
  .footer-col a {
    font-size: 13px;
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.3s;
    letter-spacing: 0.02em;
  }
  .footer-col a:hover { color: var(--text); }
  .footer-bottom {
    border-top: 1px solid var(--border);
    padding-top: 28px;
    display: flex; align-items: center; justify-content: space-between;
    font-size: 12px;
    color: var(--text-faint);
  }
  .footer-bottom .status-dot {
    display: inline-flex; align-items: center; gap: 6px;
    color: var(--teal);
    font-size: 11px;
  }

  /* Animations */
  .fade-in {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: none;
  }
  .fade-in.delay-1 { transition-delay: 0.1s; }
  .fade-in.delay-2 { transition-delay: 0.2s; }
  .fade-in.delay-3 { transition-delay: 0.3s; }

  /* Hero animation */
  @keyframes heroLoad {
    from { opacity: 0; transform: translateY(32px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .hero-badge { animation: heroLoad 0.8s ease forwards; }
  .hero-headline { animation: heroLoad 0.8s 0.1s ease both; }
  .hero-sub { animation: heroLoad 0.8s 0.2s ease both; }
  .hero-actions { animation: heroLoad 0.8s 0.3s ease both; }
  .hero-logos { animation: heroLoad 0.8s 0.45s ease both; }

  @media (max-width: 900px) {
    nav { padding: 16px 24px; }
    .nav-links { display: none; }
    .hero { padding: 120px 24px 80px; }
    .hero-headline { font-size: 48px; }
    .features { grid-template-columns: 1fr 1fr; padding: 60px 24px; }
    .feature-cell { border-right: none; border-bottom: 1px solid var(--border); }
    .product { padding: 80px 24px; }
    .product-inner { grid-template-columns: 1fr; gap: 60px; }
    .use-cases { padding: 80px 24px; }
    .use-cases-header { grid-template-columns: 1fr; }
    .cases-grid { grid-template-columns: 1fr; }
    .case-card.span-2 { grid-column: span 1; }
    .pricing { padding: 80px 24px; }
    .pricing-grid { grid-template-columns: 1fr; }
    .testimonials { padding: 80px 24px; }
    .testimonials-grid { grid-template-columns: 1fr; }
    .cta-final { padding: 80px 24px; }
    .footer-top { grid-template-columns: 1fr 1fr; gap: 40px; }
    footer { padding: 60px 24px 32px; }
    .logo-row { gap: 28px; }
  }
` }} />

      {/* Inject original site HTML */}
      <div dangerouslySetInnerHTML={{ __html: `

<!-- Nav -->
<nav>
  <a href="#" class="nav-logo">
    <div class="nav-logo-mark"></div>
    <span class="nav-logo-text">NEXUS</span>
  </a>
  <ul class="nav-links">
    <li><a href="#">Platform</a></li>
    <li><a href="#">Solutions</a></li>
    <li><a href="#">Pricing</a></li>
    <li><a href="#">Docs</a></li>
    <li><a href="#">Blog</a></li>
  </ul>
  <div class="nav-right">
    <div class="nav-tag">
      <span class="blink"></span>
      All systems operational
    </div>
    <a href="#" class="nav-btn">Get API Access</a>
  </div>
</nav>

<!-- Hero -->
<section class="hero">
  <div class="grid-bg"></div>
  <div class="hero-glow"></div>
  <div class="hero-glow-2"></div>

  <div class="hero-badge">
    <span class="badge-blue">New</span>
    Nexus 3.0 with multimodal reasoning — now in beta
  </div>

  <h1 class="hero-headline">
    <span class="outline-text">Intelligence</span><br>
    <span class="gradient-text">Infrastructure</span><br>
    <span>for Builders</span>
  </h1>

  <p class="hero-sub">
    Deploy production-grade AI capabilities in minutes. Nexus provides the models, APIs, and pipelines your team needs to build products that actually ship.
  </p>

  <div class="hero-actions">
    <a href="#" class="btn-primary-ai">Start Building Free →</a>
    <a href="#" class="btn-ghost-ai">View Documentation</a>
  </div>

  <div class="hero-logos">
    <p class="hero-logos-label">Trusted by engineering teams at</p>
    <div class="logo-row">
      <span class="logo-item">STRIPE</span>
      <span class="logo-item">NOTION</span>
      <span class="logo-item">FIGMA</span>
      <span class="logo-item">LINEAR</span>
      <span class="logo-item">VERCEL</span>
      <span class="logo-item">CLERK</span>
    </div>
  </div>
</section>

<!-- Feature strip -->
<div class="features">
  <div class="feature-cell fade-in">
    <div class="feature-num">01</div>
    <div class="feature-val">99.9%</div>
    <div class="feature-label">Uptime SLA on all production endpoints</div>
  </div>
  <div class="feature-cell fade-in delay-1">
    <div class="feature-num">02</div>
    <div class="feature-val">&lt; 80ms</div>
    <div class="feature-label">Median response latency globally</div>
  </div>
  <div class="feature-cell fade-in delay-2">
    <div class="feature-num">03</div>
    <div class="feature-val">10B+</div>
    <div class="feature-label">API calls processed monthly</div>
  </div>
  <div class="feature-cell fade-in delay-3">
    <div class="feature-num">04</div>
    <div class="feature-val">SOC 2</div>
    <div class="feature-label">Type II certified, GDPR & HIPAA compliant</div>
  </div>
</div>

<!-- Core Product -->
<section class="product">
  <div class="grid-bg"></div>
  <div class="product-inner">
    <div>
      <div class="eyebrow">Core Platform</div>
      <h2 class="product-title">Everything You Need to<br><span class="accent">Ship AI Features</span></h2>
      <p class="product-desc">
        Nexus is the complete AI infrastructure layer — from foundation models to vector search, fine-tuning pipelines, and production observability. One API, everything you need.
      </p>
      <ul class="feature-list">
        <li>Unified API for text, vision, audio, and code models</li>
        <li>Built-in RAG with managed vector database at scale</li>
        <li>Fine-tuning with your own data, no ML expertise needed</li>
        <li>Prompt management, versioning, and A/B testing</li>
        <li>Real-time streaming with sub-100ms time to first token</li>
        <li>Automatic failover and multi-region redundancy</li>
      </ul>
      <a href="#" class="btn-primary-ai">Explore the Platform →</a>
    </div>
    <div class="terminal">
      <div class="terminal-header">
        <div class="terminal-dot red"></div>
        <div class="terminal-dot yellow"></div>
        <div class="terminal-dot green"></div>
        <span class="terminal-title">nexus-api · terminal</span>
      </div>
      <div class="terminal-body">
        <div class="terminal-line">
          <span class="t-prompt">$</span>
          <span class="t-cmd">npm install @nexus/sdk</span>
        </div>
        <div class="terminal-line">
          <span class="t-output">+ @nexus/sdk@3.2.1 added 1 package</span>
        </div>
        <div class="terminal-divider"></div>
        <div class="terminal-line">
          <span class="t-dim">// Initialize the client</span>
        </div>
        <div class="terminal-line">
          <span class="t-highlight">import</span>
          <span class="t-cmd"> Nexus </span>
          <span class="t-highlight">from</span>
          <span class="t-cmd"> '@nexus/sdk'</span>
        </div>
        <div class="terminal-line">
          <span class="t-highlight">const</span>
          <span class="t-cmd"> nexus = </span>
          <span class="t-highlight">new</span>
          <span class="t-cmd"> Nexus({ apiKey })</span>
        </div>
        <div class="terminal-divider"></div>
        <div class="terminal-line">
          <span class="t-dim">// Generate with streaming</span>
        </div>
        <div class="terminal-line">
          <span class="t-highlight">const</span>
          <span class="t-cmd"> stream = </span>
          <span class="t-highlight">await</span>
          <span class="t-cmd"> nexus.generate({</span>
        </div>
        <div class="terminal-line">
          <span class="t-cmd" style="padding-left:20px">model: </span>
          <span class="t-success">'nexus-3-pro'</span><span class="t-cmd">,</span>
        </div>
        <div class="terminal-line">
          <span class="t-cmd" style="padding-left:20px">prompt,</span>
        </div>
        <div class="terminal-line">
          <span class="t-cmd" style="padding-left:20px">stream: </span>
          <span class="t-highlight">true</span>
        </div>
        <div class="terminal-line">
          <span class="t-cmd">})</span>
        </div>
        <div class="terminal-divider"></div>
        <div class="terminal-line">
          <span class="t-success">✓</span>
          <span class="t-output"> Connected · latency 67ms · tokens: 4096</span>
        </div>
        <div class="terminal-line">
          <span class="t-prompt">$</span>
          <span class="cursor-blink"></span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Use Cases -->
<section class="use-cases">
  <div class="use-cases-header">
    <div>
      <div class="eyebrow">Solutions</div>
      <h2 class="use-cases-title">Built for Every<br>AI Use Case</h2>
    </div>
    <p class="use-cases-desc">
      From search and summarization to autonomous agents and multimodal workflows — Nexus scales with whatever you're building.
    </p>
  </div>
  <div class="cases-grid">
    <div class="case-card span-2 fade-in">
      <div class="case-icon">🧠</div>
      <div class="case-title">AI Agents & Automation</div>
      <p class="case-desc">Build long-horizon AI agents with persistent memory, tool calling, and complex reasoning chains. Deploy multi-step workflows that handle real-world tasks autonomously — from research to code execution to web browsing.</p>
      <span class="case-tag">Explore agents</span>
    </div>
    <div class="case-card fade-in delay-1">
      <div class="case-icon">🔍</div>
      <div class="case-title">Semantic Search</div>
      <p class="case-desc">Drop-in intelligent search across your documents, databases, and knowledge bases using state-of-the-art embeddings.</p>
      <span class="case-tag">See how it works</span>
    </div>
    <div class="case-card fade-in">
      <div class="case-icon">✍️</div>
      <div class="case-title">Content Generation</div>
      <p class="case-desc">Generate, rewrite, and personalize content at scale — with brand voice controls and factual grounding built in.</p>
      <span class="case-tag">View examples</span>
    </div>
    <div class="case-card fade-in delay-1">
      <div class="case-icon">💻</div>
      <div class="case-title">Code Intelligence</div>
      <p class="case-desc">Power developer tools, code review, test generation, and debugging assistants with specialized code models.</p>
      <span class="case-tag">Explore code models</span>
    </div>
    <div class="case-card fade-in delay-2">
      <div class="case-icon">🌐</div>
      <div class="case-title">Multimodal Processing</div>
      <p class="case-desc">Process images, audio, documents, and video together in unified multimodal pipelines. One API for all input types.</p>
      <span class="case-tag">Try multimodal</span>
    </div>
  </div>
</section>

<!-- Pricing -->
<section class="pricing">
  <div class="grid-bg"></div>
  <div class="pricing-header">
    <div class="eyebrow" style="justify-content:center; display:flex;">Pricing</div>
    <h2 class="pricing-title">Simple, Predictable Pricing</h2>
    <p class="pricing-sub">Start free, scale as you grow. No hidden fees, no vendor lock-in.</p>
  </div>
  <div class="pricing-grid">
    <div class="plan-card fade-in">
      <div class="plan-name">Starter</div>
      <div class="plan-price"><span>$</span>0</div>
      <div class="plan-period">per month · forever free</div>
      <div class="plan-divider"></div>
      <ul class="plan-features">
        <li>100K tokens / month</li>
        <li>Access to Nexus-2 models</li>
        <li>Community support</li>
        <li>2 concurrent requests</li>
        <li class="dim">RAG & vector search</li>
        <li class="dim">Fine-tuning</li>
        <li class="dim">SLA guarantee</li>
      </ul>
      <a href="#" class="plan-btn outline">Get Started Free</a>
    </div>
    <div class="plan-card popular fade-in delay-1">
      <div class="plan-badge">Most Popular</div>
      <div class="plan-name">Pro</div>
      <div class="plan-price"><span>$</span>49</div>
      <div class="plan-period">per month · billed monthly</div>
      <div class="plan-divider"></div>
      <ul class="plan-features">
        <li>5M tokens / month</li>
        <li>All Nexus-3 models</li>
        <li>Priority support</li>
        <li>Unlimited requests</li>
        <li>RAG & vector search</li>
        <li>Basic fine-tuning</li>
        <li class="dim">99.9% SLA</li>
      </ul>
      <a href="#" class="plan-btn solid">Start 14-Day Trial</a>
    </div>
    <div class="plan-card fade-in delay-2">
      <div class="plan-name">Enterprise</div>
      <div class="plan-price" style="font-size:36px;margin-top:8px">Custom</div>
      <div class="plan-period">volume pricing available</div>
      <div class="plan-divider"></div>
      <ul class="plan-features">
        <li>Unlimited tokens</li>
        <li>All models + early access</li>
        <li>Dedicated support</li>
        <li>Unlimited requests</li>
        <li>Advanced RAG pipelines</li>
        <li>Full fine-tuning suite</li>
        <li>99.99% SLA + uptime credits</li>
      </ul>
      <a href="#" class="plan-btn outline">Talk to Sales</a>
    </div>
  </div>
</section>

<!-- Testimonials -->
<section class="testimonials">
  <div class="testimonials-header">
    <div class="eyebrow" style="justify-content:center; display:flex;">Customer Stories</div>
    <h2 class="testimonials-title">Loved by Engineering Teams</h2>
  </div>
  <div class="testimonials-grid">
    <div class="testimonial-card fade-in">
      <div class="testimonial-header">
        <div class="testimonial-avatar">AK</div>
        <div>
          <div class="testimonial-name">Arjun Kapoor</div>
          <div class="testimonial-role">Head of AI · Razorpay</div>
        </div>
        <div class="testimonial-stars">★★★★★</div>
      </div>
      <p class="testimonial-text">"We went from proof-of-concept to 50K daily active users in 6 weeks. Nexus's API is the cleanest AI infrastructure I've worked with."</p>
    </div>
    <div class="testimonial-card fade-in delay-1">
      <div class="testimonial-header">
        <div class="testimonial-avatar">SL</div>
        <div>
          <div class="testimonial-name">Sophie Laurent</div>
          <div class="testimonial-role">CTO · Loom AI</div>
        </div>
        <div class="testimonial-stars">★★★★★</div>
      </div>
      <p class="testimonial-text">"The streaming latency is unmatched. Our users noticed the difference immediately. We haven't looked at another provider since."</p>
    </div>
    <div class="testimonial-card fade-in delay-2">
      <div class="testimonial-header">
        <div class="testimonial-avatar">RN</div>
        <div>
          <div class="testimonial-name">Rahul Narayan</div>
          <div class="testimonial-role">Founder · Supermind</div>
        </div>
        <div class="testimonial-stars">★★★★★</div>
      </div>
      <p class="testimonial-text">"The fine-tuning pipeline saved us months of ML work. We trained our domain-specific model in a weekend and it outperforms GPT-4 on our benchmark."</p>
    </div>
  </div>
</section>

<!-- Final CTA -->
<section class="cta-final">
  <div class="grid-bg"></div>
  <div class="cta-glow"></div>
  <h2 class="cta-title">
    Start Building<br>
    <span class="gradient-text">Today</span>
  </h2>
  <p class="cta-sub">
    Your first 100K tokens are free. No credit card, no pitch calls — just access to production-grade AI infrastructure, immediately.
  </p>
  <div class="cta-actions">
    <a href="#" class="btn-primary-ai">Create Free Account →</a>
    <a href="#" class="btn-ghost-ai">Read the Docs</a>
  </div>
</section>

<!-- Footer -->
<footer>
  <div class="footer-top">
    <div>
      <a href="#" class="nav-logo" style="text-decoration:none">
        <div class="nav-logo-mark"></div>
        <span class="nav-logo-text">NEXUS</span>
      </a>
      <p class="footer-brand-desc">AI infrastructure for the next generation of builders. Fast, reliable, and built to scale.</p>
    </div>
    <div class="footer-col">
      <h4>Platform</h4>
      <ul>
        <li><a href="#">Models</a></li>
        <li><a href="#">Embeddings</a></li>
        <li><a href="#">Fine-tuning</a></li>
        <li><a href="#">RAG</a></li>
        <li><a href="#">Agents</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Developers</h4>
      <ul>
        <li><a href="#">Documentation</a></li>
        <li><a href="#">API Reference</a></li>
        <li><a href="#">SDKs</a></li>
        <li><a href="#">Status Page</a></li>
        <li><a href="#">Changelog</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Company</h4>
      <ul>
        <li><a href="#">About</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Careers</a></li>
        <li><a href="#">Security</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2025 Nexus AI, Inc. All rights reserved.</span>
    <span class="status-dot">
      <span style="width:6px;height:6px;border-radius:50%;background:var(--teal);display:inline-block;animation:blink 2s infinite"></span>
      All systems operational
    </span>
  </div>
</footer>

<script>
  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Observe case cards, plan cards, testimonials
  document.querySelectorAll('.case-card, .plan-card, .testimonial-card, .feature-cell').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
</script>
` }} />
    </>
  )
}
