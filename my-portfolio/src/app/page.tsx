"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const PortfolioHomepage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Profile image animation
      gsap.from('.profile-image', {
        scale: 0,
        rotation: 360,
        opacity: 0,
        duration: 1.2,
        ease: 'back.out(1.7)',
        delay: 0.2
      });

      // Greeting text animation
      gsap.from('.greeting-text', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.5
      });

      // Effetto macchina da scrivere per il nome
      const nameElement = titleRef.current?.querySelector('.animated-name');
      if (nameElement) {
        const originalText = nameElement.textContent || 'Luigi Balestrucci';
        
        // Svuota il contenuto e aggiungi cursore
        nameElement.innerHTML = '<span class="typed-text"></span><span class="cursor">|</span>';
        
        const typedTextElement = nameElement.querySelector('.typed-text');
        const cursorElement = nameElement.querySelector('.cursor');
        
        // Stile per il cursore lampeggiante
        if (cursorElement) {
          gsap.to(cursorElement, {
            opacity: 0,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut'
          });
        }
        
        // Animazione di scrittura
        if (typedTextElement) {
          // Prima mostra il cursore vuoto per un po'
          gsap.delayedCall(0.8, () => {
            let currentText = '';
            let currentIndex = 0;
            
            const typeNextChar = () => {
              if (currentIndex < originalText.length) {
                currentText += originalText[currentIndex];
                typedTextElement.textContent = currentText;
                currentIndex++;
                
                // Velocità di scrittura variabile per effetto più naturale
                const delay = gsap.utils.random(0.05, 0.15);
                gsap.delayedCall(delay, typeNextChar);
              } else {
                // Quando finisce, ferma il cursore per 2 secondi poi lo fa sparire
                gsap.delayedCall(2, () => {
                  if (cursorElement) {
                    gsap.to(cursorElement, {
                      opacity: 0,
                      duration: 0.3
                    });
                  }
                });
              }
            };
            
            typeNextChar();
          });
        }
      }

      // Subtitle animation
      gsap.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        delay: 1.8
      });

      // CTA animation
      gsap.from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power4.out',
        delay: 2.1
      });

      // Cards animation con ScrollTrigger
      const cards = cardsContainerRef.current?.querySelectorAll('.preview-card');
      if (cards && cards.length > 0) {
        gsap.set(cards, { opacity: 0, y: 80 });
        
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const sections = [
    {
      title: 'About Me',
      description: 'Scopri la mia storia, il mio percorso e cosa mi appassiona',
      icon: '👨‍💻',
      link: '/about'
    },
    {
      title: 'Skills',
      description: 'Le mie competenze tecniche e gli strumenti che utilizzo',
      icon: '⚡',
      link: '/skills'
    },
    {
      title: 'Projects',
      description: 'Portfolio dei progetti realizzati e case studies',
      icon: '🚀',
      link: '/projects'
    },
    {
      title: 'Contact',
      description: 'Mettiamoci in contatto per collaborare insieme',
      icon: '📧',
      link: '/contact'
    }
  ];

  return (
    <div ref={heroRef} className="min-h-screen bg-black text-white">
      <style jsx>{`
        .cursor {
          display: inline-block;
          background: linear-gradient(to right, #fff, #c084fc, #a855f7);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 100;
          font-size: 0.9em;
        }
      `}</style>
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-purple-900/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Luigi Balestrucci
            </Link>
            <div className="hidden md:flex gap-8">
              <Link href="/" className="text-purple-400 transition-colors">Home</Link>
              <Link href="/about" className="hover:text-purple-400 transition-colors">About</Link>
              <Link href="/skills" className="hover:text-purple-400 transition-colors">Skills</Link>
              <Link href="/projects" className="hover:text-purple-400 transition-colors">Projects</Link>
              <Link href="/contact" className="hover:text-purple-400 transition-colors">Contact</Link>
            </div>
            <button className="md:hidden text-purple-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-purple-950/30"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-800/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Profile Section with Image */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            {/* Profile Image */}
            <div className="profile-image relative">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-purple-500/50 shadow-2xl shadow-purple-500/30">
                <img 
                  src="/images/images-profile.png"
                  alt="Luigi Balestrucci Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect fill="%238b5cf6" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" font-size="80" text-anchor="middle" dy=".3em" fill="white"%3E👨‍💻%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-xl -z-10"></div>
            </div>

            {/* Text Content */}
            <div className="text-center md:text-left">
              <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-4">
                <span className="greeting-text inline-block bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                  Benvenuti, sono
                </span>
                <br />
                <span className="animated-name inline-block bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                  Luigi Balestrucci
                </span>
              </h1>
            </div>
          </div>

          {/* Subtitle and CTA */}
          <div className="text-center">
            <p 
              ref={subtitleRef}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Full Stack Developer specializzato in tecnologie moderne e nell'utilizzo dell'AI
            </p>
            <div ref={ctaRef} className="flex gap-4 justify-center">
              <Link href="/projects" className="px-8 py-3 bg-purple-600 cursor-pointer hover:bg-purple-700 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-purple-500/30">
                Scopri i Progetti
              </Link>
              <Link href="/contact" className="px-8 py-3 border-2 cursor-pointer border-purple-600 hover:bg-purple-600/10 rounded-lg font-semibold transition-all">
                Contattami
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Cards Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Esplora il Portfolio
          </h2>
          
          <div ref={cardsContainerRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section, index) => (
              <Link
                key={index}
                href={section.link}
                className="preview-card group relative bg-gradient-to-br from-purple-950/50 to-black border border-purple-900/30 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 cursor-pointer overflow-hidden block"
              >
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-purple-600/0 group-hover:from-purple-600/10 group-hover:to-purple-800/10 transition-all duration-300"></div>

                <div className="relative z-10">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {section.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
                    {section.description}
                  </p>
                  <div className="flex items-center text-purple-400 group-hover:text-purple-300 font-semibold">
                    Esplora
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-900/30 py-8 px-6 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 mb-6">
            © {new Date().getFullYear()} Luigi Balestrucci. Built with Next.js, TypeScript, TailwindCSS & GSAP
          </p>
          
          {/* Social Icons */}
          <div className="flex justify-center gap-6">
            {/* GitHub */}
            <a 
              href="https://github.com/bale231" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative p-3 bg-gray-800/50 hover:bg-purple-600/20 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a 
              href="https://linkedin.com/in/luigi-balestrucci" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative p-3 bg-gray-800/50 hover:bg-purple-600/20 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a 
              href="https://instagram.com/luigi_bale" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative p-3 bg-gray-800/50 hover:bg-purple-600/20 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* Email */}
            <a 
              href="mailto:luigibalestrucci52@gmail.com" 
              className="group relative p-3 bg-gray-800/50 hover:bg-purple-600/20 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioHomepage;