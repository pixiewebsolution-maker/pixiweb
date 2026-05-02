'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import InteractiveGrid from './InteractiveGrid';

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
    tag: 'UX Research',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
    title: 'Development',
    description: 'Blazing-fast, scalable code that performs flawlessly. From Next.js to full-stack solutions.',
    tag: 'React · Next.js',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    title: 'Branding',
    description: 'Strategic brand identities that resonate, differentiate, and build enduring market presence.',
    tag: 'Identity · Strategy',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
    title: 'UI/UX Design',
    description: 'Human-centered experiences that delight users at every touchpoint with intuitive interaction design.',
    tag: 'Wireframes · Testing',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    const cards = gridRef.current?.querySelectorAll('.bento-service-card');
    if (cards) {
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0, scale: 0.98 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.3,
          stagger: 0.03,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 100%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
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
        background: 'radial-gradient(ellipse, rgba(0,0,0,0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container relative z-10">
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

        {/* Bento Grid Layout */}
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1 & 2: Left Column (Stacked) */}
          <div className="flex flex-col gap-6">
            
            {/* Branding (Orange Style) */}
            <div className="bento-service-card bg-[#FF6701] rounded-[48px] p-10 shadow-sm flex-1 flex flex-col justify-between min-h-[260px] transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-2xl text-[#FF6701] transition-transform duration-300 group-hover:scale-110">
                  {services[2].icon}
                </div>
                <div className="bg-black/10 px-4 py-2 rounded-full text-black text-xs font-bold tracking-wider uppercase">
                  {services[2].tag}
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold font-sans text-black mb-3 tracking-tight">
                  {services[2].title}
                </h3>
                <p className="text-neutral-800 text-[0.95rem] leading-relaxed max-w-[260px]">
                  {services[2].description}
                </p>
              </div>
            </div>

            {/* UI/UX Design (Black Style) */}
            <div className="bento-service-card bg-black rounded-[40px] p-8 lg:p-10 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 min-h-[140px] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group">
              <div className="flex flex-col order-2 sm:order-1">
                <div className="bg-white/10 w-fit px-3 py-1 rounded-full text-white/70 text-[0.65rem] font-bold tracking-wider uppercase mb-2">
                  {services[3].tag}
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold font-sans text-white tracking-tight">
                  {services[3].title}
                </h3>
              </div>
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-2xl text-white transform transition-transform duration-500 group-hover:scale-110 group-hover:bg-[#FF6701] group-hover:text-black order-1 sm:order-2 shrink-0">
                {services[3].icon}
              </div>
            </div>

          </div>

          {/* Card 3: Development (Middle Tall - Satin Grey Style - Was White) */}
          <div className="bento-service-card bg-[#1C1C1C] rounded-[48px] p-10 lg:p-12 shadow-sm flex flex-col justify-between min-h-[400px] lg:min-h-[480px] transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group border border-white/5 overflow-hidden relative">
            <InteractiveGrid />
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 bg-[#FF6701] rounded-full flex items-center justify-center text-2xl text-black transition-transform duration-300 group-hover:scale-110">
                  {services[1].icon}
                </div>
                <div className="bg-white/5 px-4 py-2 rounded-full text-white/60 text-xs font-bold tracking-wider uppercase">
                  {services[1].tag}
                </div>
              </div>
              <div>
                <h3 className="text-4xl font-bold font-sans text-white mb-4 tracking-tight">
                  {services[1].title}
                </h3>
                <p className="text-neutral-400 text-[1rem] leading-relaxed">
                  {services[1].description}
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: Web Design (Right Tall - White Style - Was Blue) */}
          <div className="bento-service-card relative rounded-[48px] overflow-hidden min-h-[400px] lg:min-h-[480px] bg-white flex flex-col justify-between p-4 shadow-sm group border border-neutral-100">
            {/* Background Image / Overlay */}
            <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105">
              <div className="absolute inset-0 bg-white/40 mix-blend-overlay z-10" />
              <Image src="/projects/dashboard-2.png" alt="Web Design" fill className="object-cover opacity-80" />
            </div>
            {/* Top Tag & Icon */}
            <div className="relative z-10 flex justify-between items-center pt-6 px-6">
              <div className="w-14 h-14 bg-[#1C1C1C] rounded-full flex items-center justify-center text-2xl text-white shadow-lg">
                {services[0].icon}
              </div>
              <div className="bg-[#1C1C1C]/10 backdrop-blur-md px-4 py-2 rounded-full text-black text-xs font-bold tracking-wider uppercase">
                {services[0].tag}
              </div>
            </div>
            {/* Content Box */}
            <div className="relative z-10 bg-[#1C1C1C] rounded-[32px] p-8 pb-10 w-full shadow-xl transform transition-transform duration-500 group-hover:-translate-y-2 border border-white/5">
              <h3 className="text-3xl font-bold font-sans text-white mb-3 tracking-tight">
                {services[0].title}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {services[0].description}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
