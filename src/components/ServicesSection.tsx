'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
      </svg>
    ),
    title: 'Web Design',
    description: 'Award-winning designs that captivate, convert, and create lasting impressions. Every pixel is intentional.',
    tag: 'UX Research · Visual Design',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
    title: 'Development',
    description: 'Blazing-fast, scalable code that performs flawlessly. From Next.js to full-stack solutions.',
    tag: 'React · Next.js · Node.js',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    title: 'Branding',
    description: 'Strategic brand identities that resonate, differentiate, and build enduring market presence.',
    tag: 'Identity · Strategy · Voice',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
    title: 'UI/UX Design',
    description: 'Human-centered experiences that delight users at every touchpoint with intuitive interaction design.',
    tag: 'Wireframes · Prototypes · Testing',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll('.service-card');

    // Headline
    gsap.fromTo(
      headRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: headRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Cards stagger
    if (cards) {
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Individual card hover 3D tilt
    const cardEls = cardsRef.current?.querySelectorAll<HTMLElement>('.service-card');
    cardEls?.forEach((card) => {
      const handleMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
        gsap.to(card, {
          rotateX: y, rotateY: x,
          transformPerspective: 600,
          duration: 0.4, ease: 'power2.out',
        });
      };
      const handleLeave = () => {
        gsap.to(card, {
          rotateX: 0, rotateY: 0,
          duration: 0.7, ease: 'elastic.out(1, 0.3)',
        });
      };
      card.addEventListener('mousemove', handleMove);
      card.addEventListener('mouseleave', handleLeave);
    });
  }, []);

  return (
    <section ref={sectionRef} className="section-pad" id="services">
      {/* Background */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        {/* Header */}
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div className="section-label" style={{ margin: '0 auto 24px' }}>What We Do</div>
          <h2 className="display-md" style={{ marginBottom: '20px' }}>
            Crafted for{' '}
            <span className="text-gradient">Digital Excellence</span>
          </h2>
          <p style={{
            maxWidth: '520px', margin: '0 auto',
            color: 'var(--color-text-muted)',
            fontSize: '1.05rem', lineHeight: 1.7,
          }}>
            Every service is delivered with obsessive attention to detail, cutting-edge technology, and measurable results.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          {services.map((s, i) => (
            <div 
              key={i} 
              className="service-card" 
              data-cursor-hover
              style={{
                flex: '1 1 calc(33.333% - 16px)',
                minWidth: '280px',
                maxWidth: '400px'
              }}
            >
              <div className="icon-wrap" style={{ color: 'var(--color-primary-light)' }}>
                {s.icon}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.35rem',
                fontWeight: 700,
                marginBottom: '12px',
                letterSpacing: '-0.02em',
              }}>
                {s.title}
              </h3>
              <p style={{
                color: 'var(--color-text-muted)',
                fontSize: '0.95rem',
                lineHeight: 1.7,
                marginBottom: '20px',
              }}>
                {s.description}
              </p>
              <div style={{
                display: 'inline-block',
                padding: '5px 12px',
                borderRadius: '100px',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: 'var(--color-accent)',
                background: 'rgba(245,158,11,0.1)',
                border: '1px solid rgba(245,158,11,0.2)',
              }}>
                {s.tag}
              </div>

              {/* Corner decoration */}
              <div style={{
                position: 'absolute',
                top: '20px', right: '20px',
                width: '40px', height: '40px',
                borderTop: '1.5px solid rgba(168,85,247,0.2)',
                borderRight: '1.5px solid rgba(168,85,247,0.2)',
                borderRadius: '0 8px 0 0',
              }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
