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
      <div className="container flex items-center justify-between relative min-h-[50px]">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 z-10" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <Image src="/pixie-logo.png" alt="Pixie Webs Icon" width={36} height={36} className="object-contain rounded-lg" style={{ mixBlendMode: 'multiply' }} />
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 800,
            fontSize: '0.95rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#000',
            paddingTop: '2px'
          }}>
            Pixie Webs
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="nav-link"
              onClick={(e) => scrollTo(e, l.href)}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary group" style={{ padding: '8px 20px', fontSize: '0.85rem' }} onClick={(e) => scrollTo(e, '#contact')}>
            <span>Start a Project</span>
            <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] ml-1 transition-transform group-hover:scale-125"></span>
          </a>
        </div>



        <button
          className="flex flex-col gap-1.5 p-2 md:hidden ml-auto z-10"
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
          top: 'calc(100% + 10px)',
          left: 0,
          right: 0,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid var(--color-border)',
          borderRadius: '32px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          animation: 'mobileMenuIn 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        }}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="nav-link"
              style={{ fontSize: '1rem', padding: '12px 16px', borderRadius: '12px', border: '1px solid transparent' }}
              onClick={(e) => scrollTo(e, l.href)}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.03)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary mt-4" style={{ justifyContent: 'center', width: '100%' }} onClick={(e) => scrollTo(e, '#contact')}>
            <span>Start a Project</span>
          </a>
          <style>{`
            @keyframes mobileMenuIn {
              from { opacity: 0; transform: translateY(-10px) scale(0.95); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>
        </div>
      )}
    </nav>
  );
}
