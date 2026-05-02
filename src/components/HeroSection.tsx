'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticlesCanvas from './ParticlesCanvas';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const shape3Ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!headlineRef.current) return;

    // Split text animation
    const words = headlineRef.current.querySelectorAll('.word');

    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      words,
      { y: '110%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 1,
        stagger: 0.08,
        ease: 'power4.out',
      }
    )
    .fromTo(
      subRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(
      ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(
      scrollHintRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 },
      '-=0.3'
    );

    // Floating shapes
    if (shape1Ref.current) {
      gsap.to(shape1Ref.current, {
        y: -40, x: 20, rotation: 15,
        duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut'
      });
    }
    if (shape2Ref.current) {
      gsap.to(shape2Ref.current, {
        y: 50, x: -30, rotation: -20,
        duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut'
      });
    }
    if (shape3Ref.current) {
      gsap.to(shape3Ref.current, {
        y: -30, x: -20, rotation: 10,
        duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut'
      });
    }

    // Parallax on scroll
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        if (headlineRef.current) {
          gsap.set(headlineRef.current, { y: self.progress * 120 });
        }
      },
    });

    // Magnetic CTA button
    const btn = btnRef.current;
    if (btn) {
      const handleMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
          x: x * 0.35, y: y * 0.35,
          duration: 0.4, ease: 'power2.out',
        });
      };
      const handleLeave = () => {
        gsap.to(btn, {
          x: 0, y: 0,
          duration: 0.8, ease: 'elastic.out(1, 0.3)',
        });
      };
      const handleClick = (e: MouseEvent) => {
        // Ripple
        const ripple = document.createElement('span');
        ripple.className = 'btn-ripple';
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);
      };
      btn.addEventListener('mousemove', handleMove);
      btn.addEventListener('mouseleave', handleLeave);
      btn.addEventListener('click', handleClick);
      return () => {
        btn.removeEventListener('mousemove', handleMove);
        btn.removeEventListener('mouseleave', handleLeave);
        btn.removeEventListener('click', handleClick);
      };
    }
  }, []);

  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="hero-section grid-pattern" id="home">
      {/* Particles */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <ParticlesCanvas />
      </div>

      {/* Gradient orbs */}
      <div
        ref={shape1Ref}
        className="shape-orb"
        style={{
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)',
          top: '-100px', right: '-100px',
        }}
      />
      <div
        ref={shape2Ref}
        className="shape-orb"
        style={{
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)',
          bottom: '-50px', left: '-100px',
        }}
      />
      <div
        ref={shape3Ref}
        className="shape-orb"
        style={{
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)',
          top: '40%', left: '60%',
        }}
      />

      {/* Abstract floating elements */}
      <div style={{
        position: 'absolute', top: '20%', right: '8%',
        width: '80px', height: '80px',
        border: '1px solid rgba(124,58,237,0.3)',
        borderRadius: '20px',
        backdropFilter: 'blur(8px)',
        background: 'rgba(124,58,237,0.05)',
        transform: 'rotate(15deg)',
        animation: 'float 7s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '25%', left: '6%',
        width: '60px', height: '60px',
        borderRadius: '50%',
        border: '1px solid rgba(245,158,11,0.3)',
        background: 'rgba(245,158,11,0.05)',
        animation: 'float-reverse 9s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', top: '55%', right: '15%',
        width: '40px', height: '40px',
        borderRadius: '10px',
        border: '1px solid rgba(168,85,247,0.4)',
        background: 'rgba(168,85,247,0.08)',
        transform: 'rotate(-30deg)',
        animation: 'float 5s ease-in-out infinite',
      }} />

      {/* Main Content */}
      <div className="container relative z-10 text-center">
        {/* Label */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 20px',
          background: 'rgba(124, 58, 237, 0.1)',
          border: '1px solid rgba(124, 58, 237, 0.3)',
          borderRadius: '100px',
          fontSize: '0.78rem',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--color-primary-light)',
          marginBottom: '32px',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-accent)', display: 'inline-block', animation: 'pulse-dot 2s ease-in-out infinite' }} />
          Digital Excellence Redefined
        </div>

        {/* Headline */}
        <div
          ref={headlineRef}
          aria-label="We don't build websites. We build experiences."
          style={{ marginBottom: '28px' }}
        >
          <h1 className="display-xl" style={{ lineHeight: 1.0 }}>
            {[
              { text: "We don't", gradient: false },
              { text: "build", gradient: false },
              { text: "websites.", gradient: false },
            ].map((item, i) => (
              <span key={i} className="overflow-clip" style={{ display: 'block' }}>
                <span className="word" style={{ display: 'inline-block' }}>
                  {item.text}
                </span>
              </span>
            ))}
            <span className="overflow-clip" style={{ display: 'block' }}>
              <span className="word text-gradient shimmer-text" style={{ display: 'inline-block' }}>
                We build experiences.
              </span>
            </span>
          </h1>
        </div>

        {/* Sub */}
        <p
          ref={subRef}
          style={{
            maxWidth: '540px',
            margin: '0 auto 48px',
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            lineHeight: 1.7,
            color: 'var(--color-text-muted)',
          }}
        >
          Award-winning digital agency crafting immersive web experiences that convert visitors into loyal customers through motion, design, and innovation.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            ref={btnRef}
            href="#contact"
            className="btn-primary magnetic-wrapper"
            onClick={(e) => scrollToSection(e, '#contact')}
            style={{ display: 'inline-flex' }}
          >
            <span>Start Your Project</span>
            <span style={{ fontSize: '1.1em' }}>→</span>
          </a>
          <a
            href="#work"
            className="btn-ghost"
            onClick={(e) => scrollToSection(e, '#work')}
          >
            View Our Work
          </a>
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--color-text-dim)',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          <span>Scroll</span>
          <div style={{
            width: '1.5px',
            height: '40px',
            background: 'linear-gradient(to bottom, var(--color-primary-light), transparent)',
            animation: 'scrollLine 2s ease-in-out infinite',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  );
}
