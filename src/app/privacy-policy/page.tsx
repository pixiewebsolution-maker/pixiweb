'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticlesCanvas from '@/components/ParticlesCanvas';

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });
const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function PrivacyPolicyPage() {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoaded(true);
    // Initialize Lenis smooth scroll
    const initLenis = async () => {
      const Lenis = (await import('lenis')).default;
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      return () => {
        lenis.destroy();
        gsap.ticker.remove(lenis.raf);
      };
    };
    initLenis();
  }, []);

  useGSAP(() => {
    if (!loaded) return;

    // Hero Animation
    const tl = gsap.timeline();
    const heroElements = heroRef.current?.querySelectorAll('.animate-up');
    
    if (heroElements && heroElements.length > 0) {
      tl.fromTo(
        heroElements,
        { y: 60, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, stagger: 0.2, ease: 'expo.out' }
      );
    }

    // Content Sections Animation
    const sections = contentRef.current?.querySelectorAll('.policy-section');
    if (sections && sections.length > 0) {
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }
  }, { dependencies: [loaded], scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-[var(--color-text)] selection:bg-[#fe8b3e] selection:text-white">
      {/* Noise texture */}
      <div className="noise-overlay opacity-[0.04]" />
      
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <ParticlesCanvas />
      </div>

      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main className="relative z-10 pt-40 pb-24">
        {/* Hero Section */}
        <section ref={heroRef} className="container mb-20 text-center">
          <div className="section-label animate-up mx-auto">Legal</div>
          <h1 className="display-lg animate-up mb-6 text-[var(--color-text)]">
            Privacy <span className="text-[#fe8b3e] italic font-normal">Policy</span>
          </h1>
          <p className="animate-up max-w-2xl mx-auto text-[var(--color-text-muted)] text-lg leading-relaxed">
            At Pixie Webs, we take your privacy seriously. This policy outlines how we collect, use, and protect your information when you interact with our digital agency.
          </p>
          <div className="animate-up mt-8 flex items-center justify-center gap-4 text-sm text-[var(--color-text-dim)] font-medium tracking-wider uppercase">
            <span>Effective Date: May 8, 2024</span>
            <span className="w-1 h-1 bg-neutral-300 rounded-full" />
            <span>Version 1.0</span>
          </div>
        </section>

        {/* Content Section */}
        <section ref={contentRef} className="container max-w-4xl">
          <div className="p-8 md:p-16 border border-black/5 bg-white/0 backdrop-blur-xl rounded-[40px] relative overflow-hidden shadow-2xl shadow-black/5">
            <div className="relative z-10 space-y-16">
              {/* Introduction */}
              <div className="policy-section">
                <h2 className="text-2xl font-bold mb-6 text-[var(--color-text)] flex items-center gap-4">
                  <span className="text-[#fe8b3e]">01.</span> Introduction
                </h2>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  Welcome to Pixie Webs. We are committed to protecting your personal data and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at <span className="text-[#fe8b3e] font-semibold">pixiewebsolution@gmail.com</span>.
                </p>
              </div>

              {/* Information We Collect */}
              <div className="policy-section">
                <h2 className="text-2xl font-bold mb-6 text-[var(--color-text)] flex items-center gap-4">
                  <span className="text-[#fe8b3e]">02.</span> Information We Collect
                </h2>
                <p className="text-[var(--color-text-muted)] mb-6 leading-relaxed">
                  We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our services. This includes:
                </p>
                <ul className="space-y-4 text-[var(--color-text-muted)] list-none">
                  {[
                    'Name and Contact Data (Email address, Phone number)',
                    'Project Inquiry Details and Business Information',
                    'Device and Usage Analytics (IP address, browser type, operating system)',
                    'Cookies and similar tracking technologies'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 bg-[#fe8b3e] rounded-full shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How We Use Information */}
              <div className="policy-section">
                <h2 className="text-2xl font-bold mb-6 text-[var(--color-text)] flex items-center gap-4">
                  <span className="text-[#fe8b3e]">03.</span> How We Use Information
                </h2>
                <p className="text-[var(--color-text-muted)] mb-6 leading-relaxed">
                  We use personal information collected via our website for a variety of business purposes, including:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    'To provide and deliver the services you request',
                    'To communicate with you about your project',
                    'To send administrative information',
                    'To protect our services and website',
                    'To respond to legal requests',
                    'To improve our marketing and website performance'
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-black/[0.03] border border-black/5 text-sm text-[var(--color-text-muted)]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* User Accounts & Authentication */}
              <div className="policy-section">
                <h2 className="text-2xl font-bold mb-6 text-[var(--color-text)] flex items-center gap-4">
                  <span className="text-[#fe8b3e]">04.</span> User Accounts & Authentication
                </h2>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  When you create an account or use our authentication systems, we securely store your credentials using industry-standard encryption. We use third-party authentication providers to ensure your login data remains protected and isolated from our primary servers where possible.
                </p>
              </div>

              {/* Cookies & Analytics */}
              <div className="policy-section">
                <h2 className="text-2xl font-bold mb-6 text-[var(--color-text)] flex items-center gap-4">
                  <span className="text-[#fe8b3e]">05.</span> Cookies & Analytics
                </h2>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  We use cookies and similar tracking technologies to access or store information. We use analytics providers to help us understand how users interact with our website, which allows us to provide a more seamless and high-performance experience.
                </p>
              </div>

              {/* Third-Party Services */}
              <div className="policy-section">
                <h2 className="text-2xl font-bold mb-6 text-[var(--color-text)] flex items-center gap-4">
                  <span className="text-[#fe8b3e]">06.</span> Third-Party Services
                </h2>
                <p className="text-[var(--color-text-muted)] mb-6 leading-relaxed">
                  We may share your data with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf. These include:
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Cloud Infrastructure', 'Hosting Providers', 'Analytics Services', 'Payment Processors', 'Authentication Systems'].map((item) => (
                    <span key={item} className="px-4 py-2 rounded-full bg-[#fe8b3e]/10 border border-[#fe8b3e]/20 text-xs font-semibold text-[#fe8b3e]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* International Data Usage */}
              <div className="policy-section">
                <h2 className="text-2xl font-bold mb-6 text-[var(--color-text)] flex items-center gap-4">
                  <span className="text-[#fe8b3e]">07.</span> International Data Usage
                </h2>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  Our servers are located globally. If you are accessing our website from outside, please be aware that your information may be transferred to, stored, and processed by us in our facilities and by those third parties with whom we may share your personal information.
                </p>
              </div>

              {/* Data Security */}
              <div className="policy-section">
                <h2 className="text-2xl font-bold mb-6 text-[var(--color-text)] flex items-center gap-4">
                  <span className="text-[#fe8b3e]">08.</span> Data Security
                </h2>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
                </p>
              </div>

              {/* User Rights */}
              <div className="policy-section">
                <h2 className="text-2xl font-bold mb-6 text-[var(--color-text)] flex items-center gap-4">
                  <span className="text-[#fe8b3e]">09.</span> User Rights
                </h2>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  In some regions, you have certain rights under applicable data protection laws. These may include the right to request access and obtain a copy of your personal information, to request rectification or erasure, and to restrict the processing of your personal information.
                </p>
              </div>

              {/* Data Retention */}
              <div className="policy-section">
                <h2 className="text-2xl font-bold mb-6 text-[var(--color-text)] flex items-center gap-4">
                  <span className="text-[#fe8b3e]">10.</span> Data Retention
                </h2>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law.
                </p>
              </div>

              {/* Children’s Privacy */}
              <div className="policy-section">
                <h2 className="text-2xl font-bold mb-6 text-[var(--color-text)] flex items-center gap-4">
                  <span className="text-[#fe8b3e]">11.</span> Children’s Privacy
                </h2>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  We do not knowingly solicit data from or market to children under 18 years of age. By using our website, you represent that you are at least 18.
                </p>
              </div>

              {/* Changes to This Policy */}
              <div className="policy-section">
                <h2 className="text-2xl font-bold mb-6 text-[var(--color-text)] flex items-center gap-4">
                  <span className="text-[#fe8b3e]">12.</span> Changes to This Policy
                </h2>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  We may update this privacy policy from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible.
                </p>
              </div>

              {/* Contact Information */}
              <div className="policy-section">
                <h2 className="text-2xl font-bold mb-6 text-[var(--color-text)] flex items-center gap-4">
                  <span className="text-[#fe8b3e]">13.</span> Contact Information
                </h2>
                <p className="text-[var(--color-text-muted)] mb-8 leading-relaxed">
                  If you have questions or comments about this policy, you may email us at:
                </p>
                <a href="mailto:pixiewebsolution@gmail.com" className="btn-primary group inline-flex">
                  <span>✉ pixiewebsolution@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        .glass-card {
          border-radius: 40px;
        }
        @media (max-width: 768px) {
          .glass-card {
            border-radius: 24px;
            padding: 32px 24px;
          }
        }
      `}</style>
    </div>
  );
}
