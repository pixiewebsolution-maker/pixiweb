'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import InteractiveGrid from './InteractiveGrid';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>,
    title: 'Branding',
    description: 'Strategic brand identities that resonate, differentiate, and build enduring market presence.',
    number: '01',
    color: '#FF6701',
    textColor: 'black',
    className: 'md:col-span-1 md:row-span-2',
  },
  {
    icon: <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>,
    title: 'Development',
    description: 'Blazing-fast, scalable code that performs flawlessly. From Next.js to full-stack solutions.',
    number: '02',
    color: '#1C1C1C',
    textColor: 'white',
    className: 'md:col-span-2 md:row-span-1',
  },
  {
    icon: <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm1.063-17.974L4.026 12.063 12.063 20.1l8.037-8.037-7.037-7.037z"/></svg>,
    title: 'UI/UX Design',
    description: 'Human-centered experiences that delight users at every touchpoint with intuitive design.',
    number: '03',
    color: 'black',
    textColor: 'white',
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    icon: <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3-4c-.83 0-1.5-.67-1.5-1.5S8.67 5 9.5 5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3 4c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>,
    title: 'Web Design',
    description: 'Award-winning designs that captivate, convert, and create lasting impressions.',
    number: '04',
    color: 'white',
    textColor: 'white',
    bgImage: '/projects/dashboard-1.png',
    className: 'md:col-span-1 md:row-span-2',
  },
  {
    icon: <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>,
    title: 'SEO',
    description: 'Data-driven search engine optimization to boost your visibility and organic growth.',
    number: '05',
    color: '#FF6701',
    textColor: 'black',
    className: 'md:col-span-2 md:row-span-1',
  },
  {
    icon: <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>,
    title: 'E-commerce',
    description: 'High-converting online stores built for performance, security, and scale.',
    number: '06',
    color: 'black',
    textColor: 'white',
    className: 'md:col-span-3 md:row-span-1',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

    const cards = gridRef.current?.querySelectorAll('.bento-service-card');
    if (cards) {
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0, scale: 0.98 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="section-pad" id="services">
      <div className="container relative z-10">
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div className="section-label" style={{ margin: '0 auto 24px' }}>What We Do</div>
          <h2 className="display-md" style={{ marginBottom: '20px' }}>
            Crafted for <span className="text-gradient">Digital Excellence</span>
          </h2>
          <p style={{
            maxWidth: '520px', margin: '0 auto',
            color: 'var(--color-text-muted)',
            fontSize: '1.05rem', lineHeight: 1.7,
          }}>
            Every service is delivered with obsessive attention to detail, cutting-edge technology, and measurable results.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 md:auto-rows-[220px]">
          {services.map((s, i) => (
            <div 
              key={i}
              data-cursor-white={s.textColor === 'white'}
              className={`bento-service-card relative rounded-[40px] p-6 lg:p-8 shadow-sm flex flex-col justify-between min-h-[200px] transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group overflow-hidden border border-white/5 ${s.color === 'white' ? 'bg-white' : ''} md:${s.className?.replace('md:', '') || ''}`}
              style={{ backgroundColor: s.bgImage ? undefined : s.color }}
            >
              {s.bgImage && (
                <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105">
                  <div className="absolute inset-0 bg-black/70 z-10" />
                  <Image src={s.bgImage} alt={s.title} fill className="object-cover opacity-80" />
                </div>
              )}
              
              {s.title === 'Development' && <InteractiveGrid />}

              <div className="relative z-10 flex justify-between items-start mb-6">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110 shrink-0 ${
                    s.textColor === 'black' ? 'bg-black text-white' : 'bg-white text-black'
                  }`}
                >
                  {s.icon}
                </div>
                <div 
                  className={`text-5xl lg:text-6xl font-bold font-sans tracking-tighter ${
                    s.textColor === 'black' ? 'text-black/10' : 'text-white/10'
                  }`}
                >
                  {s.number}
                </div>
              </div>

              <div className="relative z-10">
                <h3 
                  className={`text-2xl font-bold font-sans mb-3 tracking-tight ${
                    s.textColor === 'black' ? 'text-black' : 'text-white'
                  }`}
                >
                  {s.title}
                </h3>
                <p 
                  className={`text-[0.95rem] leading-relaxed ${
                    s.textColor === 'black' ? 'text-neutral-800' : 'text-neutral-400'
                  }`}
                >
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
