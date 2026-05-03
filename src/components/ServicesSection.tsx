'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import InteractiveGrid from './InteractiveGrid';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3-4c-.83 0-1.5-.67-1.5-1.5S8.67 5 9.5 5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3 4c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>,
    title: 'Web Design',
    description: 'Award-winning designs that captivate, convert, and create lasting impressions. Every pixel is intentional.',
    tag: 'UX Research',
    number: '04',
  },
  {
    icon: <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>,
    title: 'Development',
    description: 'Blazing-fast, scalable code that performs flawlessly. From Next.js to full-stack solutions.',
    tag: 'React · Next.js',
    number: '02',
  },
  {
    icon: <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>,
    title: 'Branding',
    description: 'Strategic brand identities that resonate, differentiate, and build enduring market presence.',
    tag: 'Identity · Strategy',
    number: '01',
  },
  {
    icon: <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm1.063-17.974L4.026 12.063 12.063 20.1l8.037-8.037-7.037-7.037z"/></svg>,
    title: 'UI/UX Design',
    description: 'Human-centered experiences that delight users at every touchpoint with intuitive interaction design.',
    tag: 'Wireframes · Testing',
    number: '03',
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
            <div data-cursor-white className="bento-service-card bg-[#FF6701] rounded-[48px] p-10 shadow-sm flex-1 flex flex-col justify-between min-h-[260px] transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group">
              <div className="flex justify-between items-start mb-6">
                <div data-cursor-white className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl text-black transition-transform duration-300 group-hover:scale-110 shrink-0">
                  {services[2].icon}
                </div>
                <div className="text-6xl lg:text-7xl font-bold text-white/30 font-sans tracking-tighter">
                  {services[2].number}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-sans text-black mb-3 tracking-tight">
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
                <h3 className="text-xl lg:text-2xl font-bold font-sans text-white tracking-tight">
                  {services[3].title}
                </h3>
                <div className="text-5xl font-bold text-white/10 font-sans tracking-tighter">
                  {services[3].number}
                </div>
              </div>
              <div data-cursor-white className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-2xl text-white transform transition-transform duration-500 group-hover:scale-110 group-hover:bg-[#FF6701] group-hover:text-black order-1 sm:order-2 shrink-0">
                {services[3].icon}
              </div>
            </div>

          </div>

          {/* Card 3: Development (Middle Tall - Satin Grey Style - Was White) */}
          <div className="bento-service-card bg-[#1C1C1C] rounded-[48px] p-10 lg:p-12 shadow-sm flex flex-col justify-between min-h-[400px] lg:min-h-[480px] transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group border border-white/5 overflow-hidden relative">
            <InteractiveGrid />
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start mb-8">
                <div data-cursor-white className="w-16 h-16 bg-[#FF6701] rounded-full flex items-center justify-center text-2xl text-black transition-transform duration-300 group-hover:scale-110 shrink-0">
                  {services[1].icon}
                </div>
                <div className="text-7xl lg:text-8xl font-bold text-white/10 font-sans tracking-tighter">
                  {services[1].number}
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold font-sans text-white mb-4 tracking-tight">
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
              <div className="absolute inset-0 bg-black/70 z-10" />
              <Image src="/projects/web-design-bg.png" alt="Web Design" fill className="object-cover opacity-80" />
            </div>
            {/* Top Tag & Icon */}
            <div className="relative z-10 flex justify-between items-center pt-6 px-6">
              <div className="w-14 h-14 bg-[#1C1C1C] rounded-full flex items-center justify-center text-2xl text-white shadow-lg shrink-0">
                {services[0].icon}
              </div>
              <div className="text-6xl font-bold text-black/10 font-sans tracking-tighter">
                {services[0].number}
              </div>
            </div>
            {/* Content Box */}
            <div className="relative z-10 bg-[#1C1C1C] rounded-[32px] p-8 pb-10 w-full shadow-xl transform transition-transform duration-500 group-hover:-translate-y-2 border border-white/5">
              <h3 className="text-2xl font-bold font-sans text-white mb-3 tracking-tight">
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
