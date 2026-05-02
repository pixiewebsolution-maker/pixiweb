'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    title: 'NovaSphere',
    category: 'SaaS Platform',
    tech: 'Next.js · GSAP · Three.js',
    image: '/projects/1.png',
    accent: '#7C3AED',
    year: '2025',
  },
  {
    title: 'AuraDesign',
    category: 'Creative Studio',
    tech: 'React · Framer · CSS',
    image: '/projects/2.png',
    accent: '#38BDF8',
    year: '2025',
  },
  {
    title: 'PulseCommerce',
    category: 'E-Commerce',
    tech: 'Next.js · Shopify · GSAP',
    image: '/projects/3.png',
    accent: '#A855F7',
    year: '2024',
  },
  {
    title: 'ZenBranding',
    category: 'Brand Identity',
    tech: 'Figma · Motion · Web',
    image: '/projects/4.png',
    accent: '#4ADE80',
    year: '2024',
  },
  {
    title: 'FluxAI',
    category: 'AI Dashboard',
    tech: 'React · D3.js · GSAP',
    image: '/projects/5.png',
    accent: '#F59E0B',
    year: '2024',
  },
  {
    title: 'OrbitStudio',
    category: 'Agency Portfolio',
    tech: 'Next.js · Three.js',
    image: '/projects/6.png',
    accent: '#6366F1',
    year: '2025',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { y: 60, opacity: 0, scale: 0.95 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 }
  },
};

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <motion.div
      variants={cardVariants}
      className="project-card group"
      data-cursor-hover
      style={{
        borderRadius: '20px',
        overflow: 'hidden',
        border: `1px solid ${project.accent}40`,
        transition: 'border-color 0.4s ease',
        position: 'relative',
        aspectRatio: '4/3',
        backgroundColor: '#FFFFFF'
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="w-full h-full relative origin-center"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      </div>

      {/* Year tag */}
      <div style={{
        position: 'absolute',
        top: '20px', right: '20px',
        padding: '4px 12px',
        borderRadius: '100px',
        fontSize: '0.72rem',
        fontWeight: 600,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(8px)',
        border: `1px solid ${project.accent}30`,
        color: project.accent,
        zIndex: 10
      }}>
        {project.year}
      </div>

      {/* Hover overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '32px',
          zIndex: 5
        }}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
          <div style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: project.accent,
            marginBottom: '8px',
          }}>
            {project.category}
          </div>
          <div style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.6rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            marginBottom: '10px',
            color: '#fff'
          }}>
            {project.title}
          </div>
          <div style={{
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '20px',
          }}>
            {project.tech}
          </div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 20px',
            borderRadius: '100px',
            background: project.accent,
            color: '#000',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'none',
          }}>
            View Project →
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function ShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={sectionRef}
      className="section-pad relative overflow-hidden"
      id="work"
      style={{ background: 'var(--color-surface)' }}
    >
      {/* Background Decorative Elements with Parallax */}
      <motion.div 
        style={{ y, position: 'absolute', top: '10%', left: '-10%', opacity: 0.1, filter: 'blur(80px)', zIndex: 0 }}
        className="w-[500px] h-[500px] rounded-full bg-black"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [-80, 80]), position: 'absolute', bottom: '10%', right: '-5%', opacity: 0.05, filter: 'blur(100px)', zIndex: 0 }}
        className="w-[600px] h-[600px] rounded-full bg-black"
      />

      {/* BG Divider */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: '100%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.15), transparent)',
        zIndex: 1
      }} />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '60px',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div>
            <div className="section-label" style={{ marginBottom: '24px' }}>Our Work</div>
            <h2 className="display-md">
              Projects that{' '}
              <span className="text-gradient">Make Waves</span>
            </h2>
          </div>
          <a href="#contact" className="btn-ghost" style={{ flexShrink: 0 }}
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            View All Work →
          </a>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
          }}
        >
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
