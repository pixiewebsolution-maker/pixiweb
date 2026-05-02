'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'We dive deep into your goals, audience, and market. Research-driven strategy that sets the foundation for everything.',
    color: '#7C3AED',
    icon: '🔍',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Wireframes evolve into stunning, pixel-perfect interfaces. Every interaction carefully crafted for maximum impact.',
    color: '#A855F7',
    icon: '✦',
  },
  {
    number: '03',
    title: 'Develop',
    description: 'Clean, scalable code brings designs to life. Performance-first approach with the latest web technologies.',
    color: '#C084FC',
    icon: '</> ',
  },
  {
    number: '04',
    title: 'Launch',
    description: 'Seamless deployment, rigorous testing, and ongoing optimization to ensure peak performance post-launch.',
    color: '#F59E0B',
    icon: '🚀',
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Headline reveal
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

    // Cards reveal
    const cards = track.querySelectorAll('.process-card');
    gsap.fromTo(
      cards,
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: track,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Progress line animation
    if (progressLineRef.current) {
      gsap.fromTo(
        progressLineRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: track,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="section-pad" id="process" style={{ background: 'var(--color-surface)' }}>
      {/* BG Pattern */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.3,
        backgroundImage: 'linear-gradient(rgba(138,92,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(138,92,246,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="container">
        {/* Header */}
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div className="section-label" style={{ margin: '0 auto 24px' }}>How We Work</div>
          <h2 className="display-md" style={{ marginBottom: '20px' }}>
            Our{' '}
            <span className="text-gradient">Creative Process</span>
          </h2>
          <p style={{
            maxWidth: '480px', margin: '0 auto',
            color: 'var(--color-text-muted)',
            fontSize: '1.05rem', lineHeight: 1.7,
          }}>
            A proven methodology that turns complex challenges into elegant, high-performing digital solutions.
          </p>
        </div>

        {/* Steps */}
        <div ref={pinRef} style={{ position: 'relative' }}>
          {/* Progress line */}
          <div style={{
            position: 'relative',
            marginBottom: '60px',
            height: '2px',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '100px',
            overflow: 'hidden',
          }}>
            <div
              ref={progressLineRef}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
                borderRadius: '100px',
              }}
            />
            {/* Step dots on line */}
            {steps.map((_, i) => (
              <div key={i} style={{
                position: 'absolute',
                top: '50%',
                left: `${(i / (steps.length - 1)) * 100}%`,
                transform: 'translate(-50%, -50%)',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: steps[i].color,
                border: '2px solid var(--color-surface)',
                boxShadow: `0 0 16px ${steps[i].color}80`,
                zIndex: 2,
              }} />
            ))}
          </div>

          {/* Cards track */}
          <div
            ref={trackRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
            }}
          >
            {steps.map((step, i) => (
              <div
                key={i}
                className="process-card"
                style={{
                  padding: '40px 32px',
                  borderRadius: '24px',
                  border: `1px solid ${step.color}25`,
                  background: `linear-gradient(135deg, ${step.color}08 0%, transparent 100%)`,
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    y: -8, boxShadow: `0 20px 60px ${step.color}30`,
                    duration: 0.4, ease: 'power2.out',
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    y: 0, boxShadow: 'none',
                    duration: 0.6, ease: 'elastic.out(1, 0.3)',
                  });
                }}
              >
                {/* Number */}
                <div style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '5.5rem',
                  fontWeight: 900,
                  lineHeight: 1,
                  color: 'transparent',
                  WebkitTextStroke: `1px ${step.color}30`,
                  position: 'absolute',
                  top: '16px',
                  right: '20px',
                }}>
                  {step.number}
                </div>

                {/* Icon */}
                <div style={{
                  fontSize: '2rem',
                  marginBottom: '20px',
                  display: 'inline-block',
                  background: `${step.color}15`,
                  border: `1px solid ${step.color}30`,
                  borderRadius: '14px',
                  width: '56px', height: '56px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {step.icon}
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  marginBottom: '12px',
                  color: step.color,
                }}>
                  {step.title}
                </h3>
                <p style={{
                  color: 'var(--color-text-muted)',
                  fontSize: '0.92rem',
                  lineHeight: 1.7,
                }}>
                  {step.description}
                </p>

                {/* Arrow connector (not on last) */}
                {i < steps.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-12px',
                    right: '-12px',
                    width: '24px', height: '24px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${step.color}, ${steps[i+1].color})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', color: 'white', fontWeight: 700,
                    zIndex: 2,
                  }}>
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
