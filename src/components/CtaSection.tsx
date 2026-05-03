'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const btn1Ref = useRef<HTMLAnchorElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      headRef.current,
      { y: 80, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power4.out',
        scrollTrigger: {
          trigger: headRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      ctaRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: headRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Orb pulse
    if (orbRef.current) {
      gsap.to(orbRef.current, {
        scale: 1.15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pad"
      id="contact"
      style={{
        background: 'var(--color-bg-2)',
        overflow: 'hidden',
      }}
    >
      {/* Large orb */}
      <div
        ref={orbRef}
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px', height: '700px',
          background: 'radial-gradient(circle, rgba(255, 103, 1, 0.2) 0%, rgba(0, 0, 0, 0.05) 50%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div style={{
        position: 'absolute', top: '20%', left: '5%',
        width: '80px', height: '80px',
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: '20px',
        transform: 'rotate(25deg)',
        animation: 'float 8s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', right: '8%',
        width: '60px', height: '60px',
        border: '1px solid rgba(255, 103, 1, 0.5)',
        borderRadius: '50%',
        animation: 'float-reverse 6s ease-in-out infinite',
      }} />

      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        {/* Label */}
        <div className="section-label" style={{ margin: '0 auto 32px' }}>
          Ready to Begin?
        </div>

        {/* Headline */}
        <div ref={headRef} style={{ marginBottom: '32px' }}>
          <h2 className="display-lg" style={{ marginBottom: '16px' }}>
            Let&apos;s Build Something
          </h2>
          <h2 className="display-lg shimmer-text" style={{ marginBottom: '0' }}>
            Legendary
          </h2>
        </div>

        <p style={{
          maxWidth: '520px', margin: '0 auto 56px',
          color: 'var(--color-text-muted)',
          fontSize: '1.1rem', lineHeight: 1.7,
        }}>
          Your vision deserves a digital partner obsessed with excellence. Let&apos;s create something that stops people mid-scroll.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}>
          <a
            ref={btn1Ref}
            href="mailto:hello@pixiewebs.com"
            className="btn-primary"
            style={{ fontSize: '1.05rem', padding: '18px 48px' }}
          >
            <span>✉ hello@pixiewebs.com</span>
          </a>
          <a
            href="tel:+919188777807"
            className="btn-ghost"
            style={{ fontSize: '1.05rem', padding: '17px 40px' }}
          >
            📞 +91 9188777807
          </a>
        </div>

        {/* Trust signals */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '32px',
          flexWrap: 'wrap',
          color: 'var(--color-text-dim)',
          fontSize: '0.82rem',
          fontWeight: 500,
          letterSpacing: '0.05em',
        }}>
          {[
            '✓ Free Strategy Call',
            '✓ No Lock-in Contracts',
            '✓ Results in 30 Days',
            '✓ 24/7 Support',
          ].map((t) => (
            <span key={t} style={{ color: 'var(--color-text-dim)' }}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
