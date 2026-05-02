'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { name: 'Twitter / X', icon: 'X', href: '#' },
  { name: 'Instagram', icon: 'IG', href: '#' },
  { name: 'LinkedIn', icon: 'LI', href: '#' },
  { name: 'Dribbble', icon: 'DR', href: '#' },
];

const footerLinks = {
  Services: ['Web Design', 'Development', 'Branding', 'UI/UX Design', 'SEO & Growth'],
  Company: ['About Us', 'Our Work', 'Case Studies', 'Blog', 'Careers'],
  Contact: ['hello@pixiewebs.com', '+91 88777 7807', 'Kochi, Kerala, India'],
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <footer ref={footerRef}>
      <div className="container" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr repeat(3, auto)',
          gap: '60px',
          marginBottom: '60px',
          flexWrap: 'wrap',
        }}
        className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <Image src="/pixie-logo.png" alt="Pixie Webs" width={64} height={64} style={{ mixBlendMode: 'multiply' }} />
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: 'var(--color-text)',
              }}>
                Pixie Webs
              </span>
            </div>
            <p style={{
              color: 'var(--color-text-muted)',
              fontSize: '0.9rem',
              lineHeight: 1.7,
              maxWidth: '280px',
              marginBottom: '28px',
            }}>
              Websites that work. Magic that connects. Award-winning digital experiences from Kochi to the world.
            </p>
            {/* Socials */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  style={{
                    width: '40px', height: '40px',
                    borderRadius: '10px',
                    border: '1px solid var(--color-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', fontWeight: 700,
                    color: 'var(--color-text-muted)',
                    transition: 'all 0.3s ease',
                    cursor: 'none',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = 'rgba(255, 103, 1, 0.6)';
                    el.style.color = '#FF6701';
                    el.style.background = 'rgba(255, 103, 1, 0.1)';
                    el.style.boxShadow = '0 0 20px rgba(255, 103, 1, 0.2)';
                    gsap.to(el, { y: -4, duration: 0.3, ease: 'back.out(1.7)' });
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = 'var(--color-border)';
                    el.style.color = 'var(--color-text-muted)';
                    el.style.background = 'transparent';
                    el.style.boxShadow = 'none';
                    gsap.to(el, { y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, items]) => (
            <div key={group}>
              <div style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-text)',
                marginBottom: '20px',
              }}>
                {group}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      style={{
                        color: 'var(--color-text-muted)',
                        fontSize: '0.88rem',
                        textDecoration: 'none',
                        transition: 'color 0.3s ease',
                        cursor: 'none',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-primary-light)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'var(--color-border)',
          marginBottom: '32px',
        }} />

        {/* Bottom */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          color: 'var(--color-text-muted)',
          fontSize: '0.82rem',
        }}>
          <span>© 2025 Pixie Webs. All rights reserved.</span>
          <span style={{ color: 'var(--color-text-muted)' }}>
            Made with{' '}
            <span style={{ color: '#ef4444' }}>♥</span>
            {' '}in Kochi, India
          </span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none', cursor: 'none', transition: 'color 0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-dim)'}>
              Privacy Policy
            </a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none', cursor: 'none', transition: 'color 0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-dim)'}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </footer>
  );
}
