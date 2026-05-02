'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically imported client-side only components
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });
const Preloader = dynamic(() => import('@/components/Preloader'), { ssr: false });
const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), { ssr: false });

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ProcessSection from '@/components/ProcessSection';
import WhyUsSection from '@/components/WhyUsSection';
import ShowcaseSection from '@/components/ShowcaseSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scroll after preloader
    const initLenis = async () => {
      const Lenis = (await import('lenis')).default;
      const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);

      return () => lenis.destroy();
    };

    if (loaded) {
      initLenis();
    }
  }, [loaded]);

  return (
    <>
      {/* Noise texture */}
      <div className="noise-overlay" />

      {/* Preloader */}
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      {/* Custom cursor */}
      <CustomCursor />

      {/* Scroll progress */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <WhyUsSection />
        <ShowcaseSection />
        <CtaSection />
      </main>

      <Footer />
    </>
  );
}
