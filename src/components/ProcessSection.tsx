'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import InteractiveGrid from './InteractiveGrid';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'We dive deep into your goals, audience, and market. Research-driven strategy that sets the foundation for everything.',
    color: '#000000',
    icon: <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>,
  },
  {
    number: '02',
    title: 'Design',
    description: 'Wireframes evolve into stunning, pixel-perfect interfaces. Every interaction carefully crafted for maximum impact.',
    color: '#000000',
    icon: <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-8c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm-3-4c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm-3 4c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm3 4c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z"/></svg>,
  },
  {
    number: '03',
    title: 'Develop',
    description: 'Clean, scalable code brings designs to life. Performance-first approach with the latest web technologies.',
    color: '#000000',
    icon: <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>,
  },
  {
    number: '04',
    title: 'Launch',
    description: 'Seamless deployment, rigorous testing, and ongoing optimization to ensure peak performance post-launch.',
    color: '#FF6701',
    icon: <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M13.13 22.19L11.5 18.36c-.11-.26-.26-.51-.43-.72l-1.95-2.29c-.27-.33-.31-.79-.11-1.16l2.12-4c.37-.69 1.25-.95 1.95-.57.69.37.95 1.25.57 1.95l-2.12 4c-.11.21-.11.45 0 .66l1.95 2.29c.17.21.32.46.43.72l1.63 3.83c.23.54-.02 1.16-.57 1.39-.54.23-1.16-.02-1.39-.57zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>,
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    // Bento Cards reveal
    const cards = gridRef.current?.querySelectorAll('.bento-process-card');
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
    <section ref={sectionRef} className="section-pad" id="process" style={{ background: 'var(--color-surface)' }}>
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.1,
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      <div className="container">
        {/* Header */}
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '80px', position: 'relative', zIndex: 10 }}>
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

        {/* Bento Grid Layout */}
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 relative z-10">
          
          {/* Card 1: Left Tall (White Style - Was Blue Image) */}
          <div className="bento-process-card relative rounded-[48px] overflow-hidden min-h-[400px] lg:min-h-[480px] bg-white flex flex-col justify-between p-4 shadow-sm group">
            {/* Background Image / Overlay */}
            <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105">
              <div className="absolute inset-0 bg-black/70 z-10" />
              <Image 
                src="/projects/dashboard-1.png" 
                alt="Discover" 
                fill 
                className="object-cover opacity-80" 
                style={{ filter: 'grayscale(100%) brightness(1.9)' }}
              />
            </div>
            {/* Top Icon & Number */}
            <div className="relative z-10 flex justify-between items-start pt-6 px-6">
              <div className="w-14 h-14 bg-[#1C1C1C] rounded-2xl flex items-center justify-center text-2xl shadow-lg text-white">
                {steps[0].icon}
              </div>
              <div className="text-7xl lg:text-8xl font-bold text-white opacity-10 font-sans tracking-tighter">
                {steps[0].number}
              </div>
            </div>
            {/* Content Box */}
            <div className="relative z-10 bg-[#1C1C1C] rounded-[32px] p-8 pb-10 w-full shadow-xl transform transition-transform duration-500 group-hover:-translate-y-2 border border-white/5">
              <h3 className="text-2xl font-bold font-sans text-white mb-3 tracking-tight">
                {steps[0].title}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {steps[0].description}
              </p>
            </div>
          </div>

          {/* Card 2 & 3: Middle Column (Stacked) */}
          <div className="flex flex-col gap-6">
            
            {/* Develop (Orange Style) */}
            <div data-cursor-white className="bento-process-card bg-[#FF6701] rounded-[48px] p-10 shadow-sm flex-1 flex flex-col justify-between min-h-[260px] transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl text-black">
                  {steps[2].icon}
                </div>
                <div className="text-7xl lg:text-8xl font-bold text-white/20 font-sans tracking-tighter">
                  {steps[2].number}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-sans text-black mb-3 tracking-tight">
                  {steps[2].title}
                </h3>
                <p className="text-neutral-800 text-sm leading-relaxed max-w-[240px]">
                  {steps[2].description}
                </p>
              </div>
            </div>

            {/* Launch (Black Style) */}
            <div className="bento-process-card bg-black rounded-[40px] p-8 lg:p-10 shadow-xl flex items-center justify-between min-h-[140px] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group">
              <div className="flex flex-col">
                <div className="text-7xl lg:text-8xl text-white/20 font-bold font-sans tracking-tighter mb-1">
                  {steps[3].number}
                </div>
                <h3 className="text-2xl font-bold font-sans text-white tracking-tight">
                  {steps[3].title}
                </h3>
              </div>
              <div data-cursor-white className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-2xl text-white transform transition-transform duration-500 group-hover:scale-110 group-hover:bg-[#FF6701] group-hover:text-black">
                {steps[3].icon}
              </div>
            </div>

          </div>

          {/* Card 4: Right Tall (Satin Grey Style) */}
          <div className="bento-process-card bg-[#1C1C1C] rounded-[48px] p-10 lg:p-12 shadow-sm flex flex-col justify-between min-h-[400px] lg:min-h-[480px] transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border border-white/5 overflow-hidden relative">
            <InteractiveGrid />
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-2xl text-white">
                  {steps[1].icon}
                </div>
                <div className="text-7xl lg:text-8xl font-bold text-white/10 font-sans tracking-tighter">
                  {steps[1].number}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-sans text-white mb-3 tracking-tight">
                  {steps[1].title}
                </h3>
                <p className="text-neutral-400 text-[0.95rem] leading-relaxed">
                  {steps[1].description}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

