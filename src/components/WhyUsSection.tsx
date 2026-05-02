'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import InteractiveGrid from './InteractiveGrid';

gsap.registerPlugin(ScrollTrigger);

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

export default function WhyUsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const reasonsHeadRef = useRef<HTMLDivElement>(null);
  const reasonsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Refresh ScrollTrigger to ensure all positions are correct
    ScrollTrigger.refresh();

    // Section Header Animation
    gsap.fromTo(
      headRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: headRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Bento Stats Reveal
    const statCards = statsRef.current?.querySelectorAll('.bento-card');
    if (statCards) {
      gsap.fromTo(
        statCards,
        { y: 30, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.3,
          stagger: 0.03,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 100%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      
      // Animated numbers logic
      const numTargets = statsRef.current?.querySelectorAll('.count-up');
      numTargets?.forEach((target, i) => {
        const endVal = parseFloat(target.getAttribute('data-val') || '0');
        const isInt = endVal % 1 === 0;
        const obj = { val: 0 };
        
        ScrollTrigger.create({
          trigger: target,
          start: 'top 100%',
          onEnter: () => {
            gsap.to(obj, {
              val: endVal,
              duration: 0.8,
              delay: 0,
              ease: 'power2.out',
              onUpdate: () => {
                target.textContent = isInt ? Math.floor(obj.val).toString() : obj.val.toFixed(1);
              }
            });
          }
        });
      });
    }

    // "Built on Excellence" Reveal
    if (reasonsHeadRef.current) {
      const heading = reasonsHeadRef.current.querySelector('h2');
      const paragraph = reasonsHeadRef.current.querySelector('p');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: reasonsHeadRef.current,
          start: 'top 100%',
          toggleActions: 'play none none reverse',
        }
      });

      tl.fromTo(
        heading,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
      ).fromTo(
        paragraph,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' },
        '-=0.2'
      );
    }

    // Grid Cards Reveal
    const cards = reasonsRef.current?.querySelectorAll('.reason-card');
    if (cards) {
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.3,
          stagger: 0.03,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: reasonsRef.current,
            start: 'top 100%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Refresh one more time after a short delay for layout shifts
    setTimeout(() => ScrollTrigger.refresh(), 500);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="section-pad" id="why-us">
      {/* Large glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '900px', height: '600px',
        background: 'radial-gradient(ellipse, rgba(0,0,0,0.03) 0%, transparent 70%)',
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

        {/* Bento Box Stats Layout */}
        <div ref={statsRef} className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 mb-24">
          
          {/* Card 1: Left Large (Black with Grid & Glow) */}
          <div className="bento-card relative rounded-[48px] overflow-hidden min-h-[400px] lg:min-h-[500px] bg-[#1C1C1C] flex flex-col justify-between p-10 lg:p-12 shadow-xl group">
            {/* Interactive Pixel Grid */}
            <InteractiveGrid />
            
            {/* Orange Glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF6701] rounded-full blur-[120px] opacity-10 translate-x-1/3 -translate-y-1/3 transition-all duration-700 group-hover:opacity-20 group-hover:scale-110 pointer-events-none" />

            {/* Top Bar */}
            <div className="relative z-10 flex justify-between items-center text-[#FF6701] text-xs font-bold tracking-widest uppercase">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF6701]" />
                HEADLINE STAT
              </div>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8m0 0v6m0-6h-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            
            {/* Content Box */}
            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8 mt-auto pt-20">
              <div>
                <div className="text-7xl lg:text-8xl font-bold font-sans text-white mb-4 tracking-tighter">
                  <span className="count-up" data-val="150">0</span>+
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Projects Delivered</h3>
                <p className="text-neutral-400 text-sm leading-relaxed max-w-[280px]">
                  Across 20+ industries globally. Driven by performance and strategy.
                </p>
              </div>
              <div className="flex items-center gap-3 text-[#FF6701] text-sm font-bold tracking-wider uppercase cursor-pointer hover:opacity-80 transition-opacity pb-2">
                SEE BREAKDOWN
                <div className="w-10 h-10 bg-[#FF6701] rounded-full flex items-center justify-center text-black transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 19L19 5m0 0v10m0-10H9" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Stacked Cards) */}
          <div className="flex flex-col gap-6">
            
            {/* Card 2: Orange */}
            <div className="bento-card bg-[#FF6701] rounded-[40px] p-8 lg:p-10 shadow-sm flex-1 flex flex-col justify-between relative group hover:shadow-xl hover:-translate-y-1 transition-all duration-500 min-h-[150px]">
              <div className="flex justify-between items-start mb-4 text-black">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2m8-14a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm8 6a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="text-xs font-medium opacity-50 font-sans tracking-widest">01</span>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-bold font-sans text-black mb-1 tracking-tight">
                  <span className="count-up" data-val="3.8">0</span>x
                </div>
                <h3 className="text-black font-bold text-sm mb-1">Average client growth</h3>
                <p className="text-neutral-800 text-[13px] leading-relaxed">
                  Deployed across performance campaigns.
                </p>
              </div>
            </div>

            {/* Card 3: White (Was Cyan/Blue) */}
            <div className="bento-card bg-white rounded-[40px] p-8 lg:p-10 shadow-sm flex-1 flex flex-col justify-between relative group hover:shadow-xl hover:-translate-y-1 transition-all duration-500 min-h-[150px]">
              <div className="flex justify-between items-start mb-4 text-black">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM2 12c2-4.5 5.5-8 10-8s8 3.5 10 8-5.5 8-10 8-8-3.5-10-8z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="text-xs font-medium opacity-70 font-sans tracking-widest">02</span>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-bold font-sans text-black mb-1 tracking-tight">
                  <span className="count-up" data-val="100">0</span>%
                </div>
                <h3 className="text-black font-bold text-sm mb-1">Commitment to measurable</h3>
                <p className="text-neutral-500 text-[13px] leading-relaxed">
                  Intelligent, efficient, and seamless strategy.
                </p>
              </div>
            </div>

            {/* Card 4: Satin Grey (Was White) */}
            <div className="bento-card bg-[#1C1C1C] rounded-[40px] p-8 lg:p-10 shadow-sm flex-1 flex flex-col justify-between relative group hover:shadow-xl hover:-translate-y-1 transition-all duration-500 min-h-[150px] border border-white/5">
              <div className="flex justify-between items-start mb-4 text-white">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5zm0 0v8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="text-xs font-medium opacity-40 font-sans tracking-widest">03</span>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-bold font-sans text-white mb-1 tracking-tight">
                  <span className="count-up" data-val="60">0</span> fps
                </div>
                <h3 className="text-white font-bold text-sm mb-1">Performance Standard</h3>
                <p className="text-neutral-400 text-[13px] leading-relaxed">
                  Smooth animations across all devices.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Reasons Heading */}
        <div ref={reasonsHeadRef} className="mt-32 mb-16 text-center lg:text-left flex flex-col lg:flex-row justify-between items-end gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl lg:text-5xl font-bold font-sans text-black tracking-tight mb-4">
              Built on <span className="text-neutral-400 shimmer-text">Excellence</span>
            </h2>
            <p className="text-neutral-500 text-[1.05rem] leading-relaxed">
              Our approach is fundamentally different. We prioritize performance, design, and conversion at every stage to ensure your digital presence is unmatched.
            </p>
          </div>
        </div>

        {/* Modern Reasons Grid */}
        <div
          ref={reasonsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map((r, i) => (
            <div
              key={i}
              className="reason-card relative bg-white rounded-[40px] p-8 lg:p-10 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-neutral-100 group hover:-translate-y-2 overflow-hidden"
            >
              <InteractiveGrid />
              <div className="relative z-10">
                <div className="reason-icon w-14 h-14 bg-neutral-50 rounded-2xl flex items-center justify-center text-2xl mb-8 transition-all duration-500 group-hover:scale-110 group-hover:bg-[#FF6701] group-hover:shadow-md">
                  {r.icon}
                </div>
                <h3 className="text-xl font-bold font-sans text-black mb-3 tracking-tight">
                  {r.title}
                </h3>
                <p className="text-neutral-500 text-[0.95rem] leading-relaxed">
                  {r.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


