'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 150, suffix: '+', label: 'Projects Delivered', sub: 'Across 20+ industries' },
  { value: 98, suffix: '%', label: 'Client Satisfaction', sub: 'Measured via NPS scores' },
  { value: 3.8, suffix: 'x', label: 'Average ROI', sub: 'For our clients' },
  { value: 60, suffix: 'fps', label: 'Animation Performance', sub: 'Buttery smooth always' },
];

const reasons = [
  {
    icon: '⚡',
    title: 'Lightning Performance',
    description: 'Core Web Vitals optimized. Every millisecond matters for conversion rates.',
  },
  {
    icon: '🎨',
    title: 'Design-First Thinking',
    description: 'We lead with design philosophy, creating experiences that feel inevitable.',
  },
  {
    icon: '📈',
    title: 'Conversion Focused',
    description: 'Every design decision is backed by data and aimed at growing your business.',
  },
  {
    icon: '🔮',
    title: 'Future-Proof Tech',
    description: 'Built on modern stacks that scale and evolve with your business needs.',
  },
  {
    icon: '🤝',
    title: 'True Partnership',
    description: 'We embed ourselves in your team, aligned with your goals and vision.',
  },
  {
    icon: '🏆',
    title: 'Award-Winning Quality',
    description: 'Recognized globally for pushing the boundaries of web craftsmanship.',
  },
];

function CounterItem({ value, suffix, label, sub, index }: {
  value: number; suffix: string; label: string; sub: string; index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        // Scale entrance
        gsap.fromTo(ref.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, delay: index * 0.1, ease: 'back.out(1.7)' }
        );
        // Number count
        const obj = { val: 0 };
        gsap.to(obj, {
          val: value,
          duration: 2.2,
          delay: index * 0.1 + 0.3,
          ease: 'power3.out',
          onUpdate: () => {
            if (numRef.current) {
              numRef.current.textContent = value % 1 !== 0
                ? obj.val.toFixed(1)
                : Math.floor(obj.val).toString();
            }
          },
        });
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      className="stat-item"
      style={{ opacity: 0 }}
    >
      <div className="counter-number">
        <span ref={numRef}>0</span>
        <span style={{ color: 'var(--color-accent)' }}>{suffix}</span>
      </div>
      <div style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: '1.05rem',
        marginTop: '12px',
        marginBottom: '6px',
      }}>
        {label}
      </div>
      <div style={{ color: 'var(--color-text-dim)', fontSize: '0.85rem' }}>
        {sub}
      </div>
    </div>
  );
}

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const reasonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    const cards = reasonsRef.current?.querySelectorAll('.reason-card');
    if (cards) {
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: reasonsRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="section-pad" id="why-us">
      {/* Large glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '900px', height: '600px',
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        {/* Header */}
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div className="section-label" style={{ margin: '0 auto 24px' }}>Why Choose Us</div>
          <h2 className="display-md" style={{ marginBottom: '20px' }}>
            The{' '}
            <span className="text-gradient">Pixie Webs</span>
            {' '}Difference
          </h2>
          <p style={{
            maxWidth: '520px', margin: '0 auto',
            color: 'var(--color-text-muted)',
            fontSize: '1.05rem', lineHeight: 1.7,
          }}>
            We don&apos;t just build websites — we engineer digital growth engines that work around the clock.
          </p>
        </div>

        {/* Stats Counter */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0',
          marginBottom: '100px',
          borderRadius: '28px',
          border: '1px solid var(--color-border)',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden',
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              borderRight: i < stats.length - 1 ? '1px solid var(--color-border)' : 'none',
            }}>
              <CounterItem {...s} index={i} />
            </div>
          ))}
        </div>

        {/* Reasons Grid */}
        <div
          ref={reasonsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {reasons.map((r, i) => (
            <div
              key={i}
              className="reason-card glass-card"
              style={{ padding: '32px', opacity: 0 }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget.querySelector('.reason-icon'), {
                  scale: 1.2, rotate: 10,
                  duration: 0.4, ease: 'back.out(1.7)',
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget.querySelector('.reason-icon'), {
                  scale: 1, rotate: 0,
                  duration: 0.5, ease: 'elastic.out(1, 0.3)',
                });
              }}
            >
              <div className="reason-icon" style={{
                fontSize: '2.2rem',
                marginBottom: '16px',
                display: 'inline-block',
              }}>
                {r.icon}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.1rem',
                fontWeight: 700,
                marginBottom: '10px',
                letterSpacing: '-0.01em',
              }}>
                {r.title}
              </h3>
              <p style={{
                color: 'var(--color-text-muted)',
                fontSize: '0.9rem',
                lineHeight: 1.65,
              }}>
                {r.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
