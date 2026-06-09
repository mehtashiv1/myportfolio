import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)
  const [darkMode, setDarkMode] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFAQ, setActiveFAQ] = useState(null)

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
      rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1
      if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px' }
      requestAnimationFrame(animateRing)
    }
    animateRing()
    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const dm = darkMode

  const projects = [
    { href: '/ecommerce', tag: 'E-Commerce', name: 'Vaulted', desc: 'Luxury goods platform with curated collections, smooth product discovery, and white-glove checkout experience.', features: ['Custom product gallery', 'Animated UI', 'Mobile-first'], accent: '#c9a96e', bg: dm ? '#1a1712' : '#f5f3ee', dark: true },
    { href: '/health', tag: 'Health & Wellness', name: 'Aura', desc: 'Precision wellness brand with science-backed supplements. Clean aesthetic built to convert health-conscious consumers.', features: ['Conversion-focused', 'Brand identity', 'SEO optimized'], accent: '#8fa889', bg: dm ? '#111a10' : '#eef4ed', dark: true },
    { href: '/tech', tag: 'Tech / AI', name: 'Nexus AI', desc: 'Enterprise AI infrastructure platform with complex SaaS pricing, animated data dashboards, and developer-centric design.', features: ['SaaS layout', 'Animated charts', 'Dark mode UI'], accent: '#6378ff', bg: dm ? '#07080d' : '#eef0ff', dark: true },
  ]

  const faqs = [
    { q: 'How fast can my website be completed?', a: 'The Starter package is delivered within 24 hours. The Business package takes 3–5 days, and the Premium package is completed within 5–7 days. Rush delivery options are available on request.' },
    { q: 'Do I need to purchase hosting separately?', a: 'Yes, hosting is separate. I can guide you through affordable hosting options (starting at ₹200/month) and help you set everything up so you don\'t have to figure it out alone.' },
    { q: 'Can I request revisions after delivery?', a: 'Absolutely. Every package includes revision rounds — Starter gets 2, Business gets 3, and Premium gets unlimited revisions within the project scope.' },
    { q: 'Will my website work perfectly on mobile devices?', a: 'Yes — every website I build is mobile-first. It will look and function beautifully on phones, tablets, and desktops, fully tested across all screen sizes.' },
    { q: 'Can you redesign an existing website?', a: 'Definitely. Redesigns are one of my most common requests. Whether you want a full visual overhaul or specific improvements, I can transform your current site into a modern, high-converting experience.' },
  ]

  const benefits = [
    { icon: '⚡', title: 'Fast Turnaround', desc: 'From 24 hours to 7 days depending on complexity. No long waiting periods.' },
    { icon: '✦', title: 'Premium Modern Design', desc: 'Every site is crafted to look like it cost 10x more. No templates.' },
    { icon: '📱', title: 'Mobile-First Development', desc: 'Built for the phone first, then perfected for desktop.' },
    { icon: '🔍', title: 'SEO-Friendly Structure', desc: 'Proper meta tags, fast load times, and clean code search engines love.' },
    { icon: '₹', title: 'Affordable Pricing', desc: 'Agency-quality results without the agency price tag. Honest, transparent pricing.' },
    { icon: '🤝', title: 'Personal Support', desc: 'You work directly with me — no middlemen, no ticket queues.' },
  ]

  const t = dm ? {
    bg: '#0b0b0d', surface: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.08)',
    text: '#f0eee8', muted: 'rgba(240,238,232,0.45)', accent: '#7c6fff',
    accentRgb: '124,111,255', card: '#111117', navBg: 'rgba(11,11,13,0.85)'
  } : {
    bg: '#fafaf8', surface: 'rgba(0,0,0,0.03)', border: 'rgba(0,0,0,0.08)',
    text: '#0f0f14', muted: 'rgba(15,15,20,0.5)', accent: '#5542ff',
    accentRgb: '85,66,255', card: '#f2f2f6', navBg: 'rgba(250,250,248,0.85)'
  }

  return (
    <>
      <Head>
        <title>WebStudio — Premium Business Websites in 24 Hours</title>
        <meta name="description" content="Professional business websites delivered fast. Helping local businesses, startups, creators, and brands launch stunning websites." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Fraunces:opsz,wght@9..144,300;9..144,400&display=swap" rel="stylesheet" />
      </Head>

      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />

      {/* NAV */}
      <nav className="nav" style={{ background: t.navBg, borderColor: t.border }}>
        <div className="nav-inner">
          <a href="#" className="nav-logo" style={{ color: t.text }}>
            <span style={{ color: t.accent }}>W</span>ebStudio
          </a>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`} style={{ '--nav-bg': t.navBg, '--nav-text': t.text, '--nav-border': t.border }}>
            {['Services', 'Portfolio', 'Process', 'FAQ'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{ color: t.muted }}>{item}</a>
            ))}
            <a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)} style={{ background: t.accent }}>Book a Call</a>
          </div>
          <div className="nav-right">
            <button className="theme-btn" onClick={() => setDarkMode(!dm)} style={{ color: t.muted, borderColor: t.border }} title="Toggle theme">
              {dm ? '☀' : '☾'}
            </button>
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ color: t.text }}>
              <span style={{ background: t.text }} /><span style={{ background: t.text }} /><span style={{ background: t.text }} />
            </button>
          </div>
        </div>
      </nav>

      <main style={{ background: t.bg, color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif", transition: 'background 0.3s, color 0.3s' }}>

        {/* HERO */}
        <section className="hero" style={{ '--accent': t.accent, '--accent-rgb': t.accentRgb, '--muted': t.muted, '--border': t.border }}>
          <div className="hero-glow" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, rgba(${t.accentRgb},0.18) 0%, transparent 70%)` }} />
          <div className="container">
            <div className="hero-badge reveal" style={{ color: t.accent, borderColor: `rgba(${t.accentRgb},0.3)`, background: `rgba(${t.accentRgb},0.08)` }}>
              ✦ Available for new projects
            </div>
            <h1 className="hero-h1 reveal" style={{ color: t.text }}>
              Professional Business<br />
              <span className="hero-gradient" style={{ '--a': t.accent }}>Websites Delivered<br />in 24 Hours</span>
            </h1>
            <p className="hero-sub reveal" style={{ color: t.muted }}>
              Helping local businesses, startups, creators, and brands launch stunning websites that generate trust, attract customers, and drive sales.
            </p>
            <div className="hero-actions reveal">
              <a href="#contact" className="btn-primary" style={{ background: t.accent }}>Book a Free Consultation</a>
              <a href="#portfolio" className="btn-secondary" style={{ color: t.text, borderColor: t.border }}>View Portfolio →</a>
            </div>
            <div className="trust-bar reveal" style={{ borderColor: t.border }}>
              {['✓ 24-Hour Delivery', '✓ Mobile Responsive', '✓ SEO Optimized', '✓ Modern Premium Design'].map(item => (
                <span key={item} style={{ color: t.muted }}><span style={{ color: t.accent }}>{item.split(' ')[0]}</span> {item.slice(2)}</span>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section" style={{ '--border': t.border }}>
          <div className="container">
            <div className="section-label reveal" style={{ color: t.accent }}>Services & Pricing</div>
            <h2 className="section-h2 reveal" style={{ color: t.text }}>Everything your business needs to launch online</h2>
            <div className="pricing-grid">
              {[
                {
                  name: 'Starter', price: '₹9,999', tag: null,
                  ideal: 'Perfect for local businesses and personal brands.',
                  items: ['1-page professional website', 'Mobile responsive design', 'Contact form', 'WhatsApp integration', 'Basic SEO setup', 'Delivery within 24 hours'],
                  delivery: '24 Hours'
                },
                {
                  name: 'Business', price: '₹19,999', tag: 'Most Popular',
                  ideal: 'Ideal for growing businesses that need multiple pages.',
                  items: ['Up to 5 custom pages', 'Mobile responsive design', 'Contact forms', 'WhatsApp integration', 'SEO optimization', 'Google Maps integration', 'Speed optimization', 'Delivery within 3–5 days'],
                  delivery: '3–5 Days'
                },
                {
                  name: 'Premium', price: '₹34,999', tag: null,
                  ideal: 'Built for businesses that want a premium online presence.',
                  items: ['Fully custom design', 'Up to 10 pages', 'Advanced animations', 'Blog setup', 'Lead generation forms', 'SEO optimization', 'Performance optimization', 'Premium UI/UX design', 'Analytics integration', 'Priority support', 'Delivery within 5–7 days'],
                  delivery: '5–7 Days'
                }
              ].map((pkg, i) => (
                <div key={pkg.name} className={`pricing-card reveal ${pkg.tag ? 'pricing-featured' : ''}`}
                  style={{
                    background: pkg.tag ? t.accent : t.card,
                    border: `1px solid ${pkg.tag ? 'transparent' : t.border}`,
                    color: pkg.tag ? '#fff' : t.text,
                    '--accent': t.accent, '--accentRgb': t.accentRgb
                  }}>
                  {pkg.tag && <div className="pricing-badge">★ Most Popular</div>}
                  <div className="pricing-top">
                    <span className="pricing-name" style={{ color: pkg.tag ? 'rgba(255,255,255,0.7)' : t.muted }}>{pkg.name}</span>
                    <div className="pricing-price" style={{ color: pkg.tag ? '#fff' : t.text }}>{pkg.price}</div>
                    <p className="pricing-ideal" style={{ color: pkg.tag ? 'rgba(255,255,255,0.75)' : t.muted }}>{pkg.ideal}</p>
                  </div>
                  <ul className="pricing-list">
                    {pkg.items.map(item => (
                      <li key={item} style={{ color: pkg.tag ? 'rgba(255,255,255,0.9)' : t.text }}>
                        <span style={{ color: pkg.tag ? 'rgba(255,255,255,0.6)' : t.accent }}>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="pricing-cta" style={{
                    background: pkg.tag ? '#fff' : t.accent,
                    color: pkg.tag ? t.accent : '#fff'
                  }}>Get Started</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio" className="section" style={{ background: dm ? '#0e0e11' : '#f4f4f8', '--border': t.border }}>
          <div className="container">
            <div className="section-label reveal" style={{ color: t.accent }}>Portfolio</div>
            <h2 className="section-h2 reveal" style={{ color: t.text }}>Recent work across industries</h2>
            <div className="portfolio-grid">
              {projects.map((project, i) => (
                <div key={project.name} className="portfolio-card reveal" style={{ background: project.bg, border: `1px solid ${t.border}` }}>
                  <div className="portfolio-preview" style={{ background: `linear-gradient(135deg, ${project.bg} 0%, rgba(${project.accent.replace('#','').match(/.{2}/g).map(x=>parseInt(x,16)).join(',')},0.3) 100%)` }}>
                    <div className="portfolio-preview-inner">
                      <div className="portfolio-dot" style={{ background: project.accent }} />
                      <span style={{ fontFamily: 'Fraunces, serif', fontSize: '2.5rem', color: project.accent, opacity: 0.9 }}>{project.name}</span>
                    </div>
                  </div>
                  <div className="portfolio-info">
                    <span className="portfolio-tag" style={{ color: project.accent, background: `rgba(${project.accent.replace('#','').match(/.{2}/g).map(x=>parseInt(x,16)).join(',')},0.12)` }}>{project.tag}</span>
                    <h3 style={{ color: '#f0eee8', fontSize: '1.4rem', fontWeight: 700, margin: '12px 0 8px' }}>{project.name}</h3>
                    <p style={{ color: 'rgba(240,238,232,0.55)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: 16 }}>{project.desc}</p>
                    <div className="portfolio-features">
                      {project.features.map(f => (
                        <span key={f} style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(240,238,232,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}>{f}</span>
                      ))}
                    </div>
                    <a href={project.href} className="portfolio-link" style={{ color: project.accent }}>View Website →</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE ME */}
        <section className="section" style={{ '--border': t.border }}>
          <div className="container">
            <div className="section-label reveal" style={{ color: t.accent }}>Why Choose Me</div>
            <h2 className="section-h2 reveal" style={{ color: t.text }}>Quality that speaks for itself</h2>
            <div className="benefits-grid">
              {benefits.map(b => (
                <div key={b.title} className="benefit-card reveal" style={{ background: t.card, border: `1px solid ${t.border}`, '--accent': t.accent, '--accentRgb': t.accentRgb }}>
                  <span className="benefit-icon">{b.icon}</span>
                  <h3 style={{ color: t.text, fontSize: '1rem', fontWeight: 700, margin: '12px 0 8px' }}>{b.title}</h3>
                  <p style={{ color: t.muted, fontSize: '0.85rem', lineHeight: 1.7 }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="section" style={{ background: dm ? '#0e0e11' : '#f4f4f8', '--accent': t.accent, '--border': t.border }}>
          <div className="container">
            <div className="section-label reveal" style={{ color: t.accent }}>Process</div>
            <h2 className="section-h2 reveal" style={{ color: t.text }}>From idea to live site — fast</h2>
            <div className="process-grid">
              {[
                { step: '01', title: 'Consultation', desc: 'We discuss your goals, brand, and requirements. I ask the right questions so we start building the right thing.' },
                { step: '02', title: 'Design & Development', desc: 'I build your website using modern tools and best practices, keeping you updated throughout.' },
                { step: '03', title: 'Review & Launch', desc: 'You review the finished site, request any final tweaks, and we launch. Your business goes live.' },
              ].map((p, i) => (
                <div key={p.step} className="process-card reveal" style={{ background: t.card, border: `1px solid ${t.border}` }}>
                  <div className="process-num" style={{ color: t.accent, borderColor: `rgba(${t.accentRgb},0.2)`, background: `rgba(${t.accentRgb},0.08)` }}>{p.step}</div>
                  <h3 style={{ color: t.text, fontSize: '1.15rem', fontWeight: 700, margin: '20px 0 10px' }}>{p.title}</h3>
                  <p style={{ color: t.muted, fontSize: '0.875rem', lineHeight: 1.75 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="section" style={{ '--border': t.border }}>
          <div className="container">
            <div className="section-label reveal" style={{ color: t.accent }}>Testimonials</div>
            <h2 className="section-h2 reveal" style={{ color: t.text }}>What clients say</h2>
            <div className="testimonials-grid">
              {[
                { name: 'Priya S.', role: 'Boutique Owner, Mumbai', text: 'My new website went live in less than 24 hours. The design is stunning and my customers keep complimenting it. Sales have noticeably improved.' },
                { name: 'Rahul M.', role: 'Startup Founder, Pune', text: 'I was quoted ₹80,000 by another agency for half the result. This was delivered faster, looked better, and cost a fraction of the price.' },
                { name: 'Ananya K.', role: 'Fitness Coach, Bangalore', text: 'The mobile design is perfect. Every client I send to my website comments on how professional it looks. Couldn\'t be happier.' },
              ].map(t2 => (
                <div key={t2.name} className="testimonial-card reveal" style={{ background: t.card, border: `1px solid ${t.border}` }}>
                  <div className="testimonial-stars" style={{ color: t.accent }}>★★★★★</div>
                  <p className="testimonial-text" style={{ color: t.text }}>"{t2.text}"</p>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar" style={{ background: `rgba(${t.accentRgb},0.15)`, color: t.accent }}>{t2.name[0]}</div>
                    <div>
                      <div style={{ color: t.text, fontWeight: 600, fontSize: '0.9rem' }}>{t2.name}</div>
                      <div style={{ color: t.muted, fontSize: '0.78rem' }}>{t2.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="section" style={{ background: dm ? '#0e0e11' : '#f4f4f8', '--border': t.border }}>
          <div className="container container-narrow">
            <div className="section-label reveal" style={{ color: t.accent }}>FAQ</div>
            <h2 className="section-h2 reveal" style={{ color: t.text }}>Common questions</h2>
            <div className="faq-list">
              {faqs.map((faq, i) => (
                <div key={i} className="faq-item reveal" style={{ borderColor: t.border }}>
                  <button className="faq-q" onClick={() => setActiveFAQ(activeFAQ === i ? null : i)} style={{ color: t.text }}>
                    {faq.q}
                    <span className="faq-chevron" style={{ color: t.accent, transform: activeFAQ === i ? 'rotate(180deg)' : 'none' }}>↓</span>
                  </button>
                  <div className="faq-a" style={{ maxHeight: activeFAQ === i ? '200px' : '0', color: t.muted }}>
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section id="contact" className="section cta-section" style={{ '--accent': t.accent, '--accentRgb': t.accentRgb, '--border': t.border }}>
          <div className="cta-glow" style={{ background: `radial-gradient(ellipse 70% 70% at 50% 50%, rgba(${t.accentRgb},0.15) 0%, transparent 70%)` }} />
          <div className="container container-narrow" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div className="section-label reveal" style={{ color: t.accent, textAlign: 'center' }}>Get Started</div>
            <h2 className="section-h2 reveal" style={{ color: t.text, textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Ready to Launch Your<br />Business Online?
            </h2>
            <p className="reveal" style={{ color: t.muted, maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.8 }}>
              Get a professional website that helps your business stand out and attract more customers.
            </p>
            <div className="hero-actions reveal" style={{ justifyContent: 'center' }}>
              <a href="https://wa.me/917021000000" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ background: t.accent }}>Get Started Today</a>
              <a href="mailto:hello@webstudio.in" className="btn-secondary" style={{ color: t.text, borderColor: t.border }}>hello@webstudio.in</a>
            </div>
            <div className="trust-bar reveal" style={{ borderColor: t.border, justifyContent: 'center', marginTop: 48 }}>
              {['✓ 24-Hour Delivery', '✓ Mobile Responsive', '✓ SEO Optimized', '✓ Modern Premium Design'].map(item => (
                <span key={item} style={{ color: t.muted }}><span style={{ color: t.accent }}>{item.split(' ')[0]}</span> {item.slice(2)}</span>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ background: dm ? '#08080a' : '#f0f0f2', borderTop: `1px solid ${t.border}`, padding: '32px 0' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <span style={{ color: t.muted, fontSize: '0.8rem' }}>
              <span style={{ color: t.accent, fontWeight: 700 }}>W</span>ebStudio © 2025 · Crafted with care in India
            </span>
            <span style={{ color: t.muted, fontSize: '0.8rem' }}>
              {['Instagram', 'LinkedIn', 'WhatsApp'].map((s, i, arr) => (
                <span key={s}><a href="#" style={{ color: t.muted, textDecoration: 'none' }}>{s}</a>{i < arr.length - 1 ? ' · ' : ''}</span>
              ))}
            </span>
          </div>
        </footer>
      </main>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        .cursor {
          position: fixed; width: 8px; height: 8px;
          background: #7c6fff; border-radius: 50%; pointer-events: none;
          z-index: 9999; transform: translate(-50%,-50%);
          transition: width .3s, height .3s; mix-blend-mode: difference;
        }
        .cursor-ring {
          position: fixed; width: 28px; height: 28px;
          border: 1px solid rgba(124,111,255,0.4); border-radius: 50%;
          pointer-events: none; z-index: 9998; transform: translate(-50%,-50%);
        }
        @media (pointer: coarse) { .cursor, .cursor-ring { display: none; } body { cursor: auto !important; } }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid;
        }
        .nav-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 40px;
          height: 64px; display: flex; align-items: center; justify-content: space-between;
        }
        .nav-logo { font-size: 1.15rem; font-weight: 800; text-decoration: none; font-family: 'Plus Jakarta Sans', sans-serif; }
        .nav-links { display: flex; align-items: center; gap: 32px; }
        .nav-links a { font-size: 0.85rem; font-weight: 500; text-decoration: none; transition: opacity .2s; letter-spacing: 0.01em; }
        .nav-links a:hover { opacity: 1 !important; }
        .nav-cta { padding: 9px 20px !important; border-radius: 100px; color: #fff !important; font-weight: 600 !important; transition: opacity .2s, transform .2s !important; }
        .nav-cta:hover { transform: translateY(-1px); opacity: 0.9 !important; }
        .nav-right { display: flex; align-items: center; gap: 12px; }
        .theme-btn { background: transparent; border: 1px solid; border-radius: 100px; padding: 7px 14px; cursor: pointer; font-size: 0.85rem; transition: opacity .2s; }
        .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
        .hamburger span { display: block; width: 22px; height: 2px; border-radius: 2px; transition: transform .3s; }

        @media (max-width: 768px) {
          .hamburger { display: flex; }
          .nav-inner { padding: 0 20px; }
          .nav-links {
            display: none; position: absolute; top: 64px; left: 0; right: 0;
            flex-direction: column; padding: 24px 20px; gap: 20px;
            background: var(--nav-bg); border-bottom: 1px solid var(--nav-border);
            backdrop-filter: blur(16px);
          }
          .nav-links.open { display: flex; }
          .nav-links a { color: var(--nav-text) !important; font-size: 1rem; }
        }

        /* LAYOUT */
        .container { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
        .container-narrow { max-width: 800px; }
        .section { padding: 100px 0; position: relative; }
        .section-label { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 16px; }
        .section-h2 { font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 800; line-height: 1.15; letter-spacing: -0.02em; margin-bottom: 56px; }

        @media (max-width: 768px) {
          .container { padding: 0 20px; }
          .section { padding: 72px 0; }
          .section-h2 { margin-bottom: 36px; }
        }

        /* HERO */
        .hero { padding: 180px 0 120px; overflow: hidden; position: relative; }
        .hero-glow { position: absolute; inset: 0; pointer-events: none; }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 16px; border-radius: 100px; border: 1px solid;
          font-size: 0.78rem; font-weight: 600; letter-spacing: 0.05em;
          margin-bottom: 32px;
        }
        .hero-h1 { font-size: clamp(2.6rem, 6vw, 5.2rem); font-weight: 800; line-height: 1.07; letter-spacing: -0.03em; margin-bottom: 28px; }
        .hero-gradient {
          background: linear-gradient(135deg, var(--a) 0%, #a78bff 60%, var(--a) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .hero-sub { font-size: 1.05rem; line-height: 1.75; max-width: 560px; margin-bottom: 40px; font-weight: 400; }
        .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 64px; }
        .btn-primary { padding: 15px 30px; border-radius: 100px; color: #fff; font-weight: 700; font-size: 0.92rem; text-decoration: none; transition: transform .2s, box-shadow .2s; font-family: 'Plus Jakarta Sans', sans-serif; display: inline-block; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,0,0,0.3); }
        .btn-secondary { padding: 14px 28px; border-radius: 100px; font-weight: 600; font-size: 0.92rem; text-decoration: none; border: 1px solid; transition: transform .2s; font-family: 'Plus Jakarta Sans', sans-serif; display: inline-block; }
        .btn-secondary:hover { transform: translateY(-2px); }
        .trust-bar { display: flex; gap: 28px; flex-wrap: wrap; padding-top: 32px; border-top: 1px solid; }
        .trust-bar span { font-size: 0.82rem; font-weight: 500; }

        @media (max-width: 768px) {
          .hero { padding: 120px 0 80px; }
          .trust-bar { gap: 16px; }
        }

        /* PRICING */
        .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; align-items: start; }
        .pricing-card { border-radius: 24px; padding: 36px 32px; display: flex; flex-direction: column; gap: 0; transition: transform .3s; }
        .pricing-card:hover { transform: translateY(-6px); }
        .pricing-badge { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 20px; opacity: 0.85; }
        .pricing-top { margin-bottom: 28px; }
        .pricing-name { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; }
        .pricing-price { font-size: 2.4rem; font-weight: 800; letter-spacing: -0.03em; margin: 8px 0 10px; font-family: 'Fraunces', serif; }
        .pricing-ideal { font-size: 0.85rem; line-height: 1.65; font-weight: 400; }
        .pricing-list { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 32px; flex: 1; }
        .pricing-list li { font-size: 0.875rem; display: flex; align-items: flex-start; gap: 8px; line-height: 1.5; font-weight: 450; }
        .pricing-cta { display: block; text-align: center; padding: 14px; border-radius: 100px; font-weight: 700; font-size: 0.9rem; text-decoration: none; transition: transform .2s, opacity .2s; }
        .pricing-cta:hover { transform: translateY(-1px); opacity: 0.9; }

        @media (max-width: 900px) { .pricing-grid { grid-template-columns: 1fr; max-width: 440px; margin: 0 auto; } }

        /* PORTFOLIO */
        .portfolio-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .portfolio-card { border-radius: 20px; overflow: hidden; transition: transform .3s; }
        .portfolio-card:hover { transform: translateY(-4px); }
        .portfolio-preview { height: 200px; display: flex; align-items: center; justify-content: center; }
        .portfolio-preview-inner { display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .portfolio-dot { width: 8px; height: 8px; border-radius: 50%; }
        .portfolio-info { padding: 24px; }
        .portfolio-tag { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 5px 12px; border-radius: 100px; display: inline-block; }
        .portfolio-features { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
        .portfolio-features span { font-size: 0.75rem; padding: 5px 12px; border-radius: 100px; font-weight: 500; }
        .portfolio-link { font-size: 0.875rem; font-weight: 700; text-decoration: none; display: inline-block; transition: transform .2s; }
        .portfolio-link:hover { transform: translateX(4px); }

        @media (max-width: 900px) { .portfolio-grid { grid-template-columns: 1fr; } }

        /* BENEFITS */
        .benefits-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .benefit-card { padding: 32px; border-radius: 20px; transition: transform .3s; cursor: default; }
        .benefit-card:hover { transform: translateY(-4px); }
        .benefit-icon { font-size: 1.6rem; display: block; margin-bottom: 4px; }

        @media (max-width: 900px) { .benefits-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .benefits-grid { grid-template-columns: 1fr; } }

        /* PROCESS */
        .process-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .process-card { padding: 36px 32px; border-radius: 20px; transition: transform .3s; }
        .process-card:hover { transform: translateY(-4px); }
        .process-num { width: 44px; height: 44px; border-radius: 12px; border: 1px solid; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.05em; }

        @media (max-width: 768px) { .process-grid { grid-template-columns: 1fr; } }

        /* TESTIMONIALS */
        .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .testimonial-card { padding: 32px; border-radius: 20px; display: flex; flex-direction: column; gap: 16px; }
        .testimonial-stars { font-size: 0.9rem; letter-spacing: 2px; }
        .testimonial-text { font-size: 0.9rem; line-height: 1.75; font-weight: 400; flex: 1; }
        .testimonial-author { display: flex; align-items: center; gap: 12px; }
        .testimonial-avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.9rem; flex-shrink: 0; }

        @media (max-width: 768px) { .testimonials-grid { grid-template-columns: 1fr; } }

        /* FAQ */
        .faq-list { display: flex; flex-direction: column; }
        .faq-item { border-bottom: 1px solid; }
        .faq-q { width: 100%; background: none; border: none; cursor: pointer; padding: 24px 0; display: flex; justify-content: space-between; align-items: center; gap: 20px; font-size: 1rem; font-weight: 600; text-align: left; font-family: 'Plus Jakarta Sans', sans-serif; }
        .faq-chevron { font-size: 1.1rem; transition: transform .3s; flex-shrink: 0; }
        .faq-a { overflow: hidden; transition: max-height .35s ease; }
        .faq-a p { padding: 0 0 24px; font-size: 0.9rem; line-height: 1.8; }

        /* CTA SECTION */
        .cta-section { overflow: hidden; }
        .cta-glow { position: absolute; inset: 0; pointer-events: none; }

        /* REVEAL */
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity .65s ease, transform .65s ease; }
        .reveal.visible { opacity: 1; transform: none; }

        @media (prefers-reduced-motion: reduce) {
          .reveal { opacity: 1; transform: none; transition: none; }
        }
      `}</style>
    </>
  )
}
