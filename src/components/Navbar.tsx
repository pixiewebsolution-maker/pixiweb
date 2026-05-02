'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Magnetic button effect for nav links
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(e.currentTarget, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <nav ref={navRef} className={scrolled ? 'scrolled' : ''}>
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <Image src="/logo.png" alt="Pixie Webs" width={44} height={44} className="rounded-lg" style={{ filter: 'invert(1)', mixBlendMode: 'screen' }} />
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '1.15rem',
            background: 'linear-gradient(135deg, #A855F7, #F59E0B)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Pixie Webs
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="nav-link"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => scrollTo(e, l.href)}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:flex btn-primary text-sm py-3 px-6"
          onClick={(e) => scrollTo(e, '#contact')}
        >
          <span>Start a Project</span>
        </a>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ cursor: 'none', background: 'none', border: 'none' }}
          aria-label="Menu"
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: 'block',
              width: '24px',
              height: '2px',
              background: 'var(--color-text)',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              transformOrigin: 'center',
              transform: menuOpen
                ? i === 0 ? 'translateY(6px) rotate(45deg)' : i === 2 ? 'translateY(-6px) rotate(-45deg)' : 'scaleX(0)'
                : 'none',
            }} />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(3, 1, 10, 0.95)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid var(--color-border)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="nav-link"
              style={{ fontSize: '1.1rem', padding: '8px 0' }}
              onClick={(e) => scrollTo(e, l.href)}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary mt-2" style={{ justifyContent: 'center' }} onClick={(e) => scrollTo(e, '#contact')}>
            <span>Start a Project</span>
          </a>
        </div>
      )}
    </nav>
  );
}
