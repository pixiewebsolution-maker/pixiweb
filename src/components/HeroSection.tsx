'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ParticlesCanvas from './ParticlesCanvas';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ isLoaded }: { isLoaded?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const shape3Ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const strikeRef = useRef<HTMLDivElement>(null);
  const secondLineRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!isLoaded || !headlineRef.current) return;

    // Split text animation
    const words = headlineRef.current.querySelectorAll('.word');

    const tl = gsap.timeline({ delay: 0.2 }); // 0.2 second delay after preloader completes

    // 1. Reveal main heading lines
    tl.set(headlineRef.current, { opacity: 1 })
      .fromTo(
        words,
        { y: '110%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power4.out',
        }
      )
      .to(strikeRef.current, {
        width: '100%',
        duration: 1.0,
        ease: 'power4.out',
      }, '+=0.2')
      .to(secondLineRef.current, {
        color: '#FFFFFF',
        duration: 0.2,
        ease: 'none'
      }, '<') // Sync with strike
      .to(subRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '<') // Start at same time as strike
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '<'); // Start at same time as strike

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
  }, { dependencies: [isLoaded], scope: sectionRef });

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
          background: 'radial-gradient(circle, rgba(255, 103, 1, 0.1) 0%, transparent 70%)',
          top: '-100px', right: '-100px',
        }}
      />
      <div
        ref={shape2Ref}
        className="shape-orb"
        style={{
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(0, 0, 0, 0.05) 0%, transparent 70%)',
          bottom: '-50px', left: '-100px',
        }}
      />
      <div
        ref={shape3Ref}
        className="shape-orb"
        style={{
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(255, 103, 1, 0.08) 0%, transparent 70%)',
          top: '40%', left: '60%',
        }}
      />

      {/* Abstract floating elements */}
      <div className="hidden md:block" style={{
        position: 'absolute', top: '20%', right: '8%',
        width: '80px', height: '80px',
        border: '1px solid rgba(124,58,237,0.3)',
        borderRadius: '20px',
        backdropFilter: 'blur(8px)',
        background: 'rgba(124,58,237,0.05)',
        transform: 'rotate(15deg)',
        animation: 'float 7s ease-in-out infinite',
      }} />
      <div className="hidden md:block" style={{
        position: 'absolute', bottom: '25%', left: '6%',
        width: '60px', height: '60px',
        borderRadius: '50%',
        border: '1px solid rgba(245,158,11,0.3)',
        background: 'rgba(245,158,11,0.05)',
        animation: 'float-reverse 9s ease-in-out infinite',
      }} />
      <div className="hidden md:block" style={{
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


        {/* Headline */}
        <div
          ref={headlineRef}
          aria-label="We don't build websites. We create experiences."
          style={{ marginBottom: '32px', opacity: 0 }}
        >
          <h1 className="display-xl hero-headline" style={{ lineHeight: 1.1 }}>
            <span className="overflow-clip" style={{ display: 'block', fontSize: '0.8em', opacity: 0.9 }}>
              <span className="word" style={{ display: 'inline-block', position: 'relative' }}>
                We don&apos;t build websites.
                <span ref={strikeRef} className="strike-line" style={{
                  position: 'absolute',
                  left: 0,
                  top: '55%',
                  width: 0,
                  height: '4px',
                  background: 'var(--color-primary)',
                  borderRadius: '2px',
                  opacity: 0.8,
                  pointerEvents: 'none',
                  zIndex: 10,
                }} />
              </span>
            </span>
            <span className="overflow-clip" style={{ display: 'block' }}>
              <span ref={secondLineRef} className="word" style={{ display: 'inline-block', color: 'var(--color-primary)' }}>
                &ldquo;We create experiences.&rdquo;
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
            opacity: 0,
            transform: 'translateY(40px)',
          }}
        >
          Award-winning digital agency crafting immersive web experiences that convert visitors into loyal customers through motion, design, and innovation.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '12px', opacity: 0, transform: 'translateY(40px)' }}>
          <a
            ref={btnRef}
            href="#contact"
            data-cursor-white
            className="btn-primary magnetic-wrapper hero-btn-shadow"
            onClick={(e) => scrollToSection(e, '#contact')}
            style={{ display: 'inline-flex' }}
          >
            <span>Start Your Project</span>
            <span style={{ fontSize: '1.2em' }}>→</span>
          </a>
          <a
            href="#work"
            data-cursor-white
            className="btn-ghost hero-btn-shadow"
            style={{ 
              background: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}
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
            bottom: '-120px',
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
            background: 'linear-gradient(to bottom, var(--color-primary), transparent)',
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
