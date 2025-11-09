"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const heroRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from('.about-hero-image', {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from('.about-hero-text', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3
      });

      // Timeline items animation
      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach((item, index) => {
        gsap.from(item, {
          x: index % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });
      });

      // Stats animation
      const stats = document.querySelectorAll('.stat-number');
      stats.forEach(stat => {
        const element = stat as HTMLElement;
        gsap.from(element, {
          textContent: 0,
          duration: 2,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
          },
          snap: { textContent: 1 },
          onUpdate: function() {
            const currentValue = parseFloat(element.textContent || '0');
            element.textContent = Math.ceil(currentValue).toString();
          }
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const timeline = [
    {
      year: '2022',
      title: 'Inizio del Percorso',
      description: 'Ho iniziato a programmare da autodidatta, esplorando HTML, CSS e JavaScript'
    },
    {
      year: '2023',
      title: 'Iscrizione al corso di Full Stack Development in Develhope.',
      description: 'Ho scelto di iscrivermi al corso per ampliare le mie competenze come sviluppatore web full stack.'
    },
    {
      year: '2024',
      title: 'Full Stack Development',
      description: 'Ho ampliato le mie competenze al backend con Node.js, Express e database'
    },
    {
      year: '2025',
      title: 'Tecnologie Moderne',
      description: 'Ho approfondito le tecnologie moderne come React, Next.js e TypeScript e ho implementato progetti reali anche con AI.'
    }
  ];

  return (
    <div ref={heroRef} className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-purple-900/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Luigi Balestrucci
            </Link>
            <div className="hidden md:flex gap-8">
              <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
              <Link href="/about" className="text-purple-400">About</Link>
              <Link href="/skills" className="hover:text-purple-400 transition-colors">Skills</Link>
              <Link href="/projects" className="hover:text-purple-400 transition-colors">Projects</Link>
              <Link href="/contact" className="hover:text-purple-400 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-purple-950/30"></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="about-hero-image">
              <div className="relative">
                <div className="w-full aspect-square rounded-2xl overflow-hidden border-4 border-purple-500/50 shadow-2xl shadow-purple-500/30">
                  <img
                    src="/images/images-profile.png"
                    alt="Luigi Balestrucci"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Crect fill="%238b5cf6" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" font-size="120" text-anchor="middle" dy=".3em" fill="white"%3E👨‍💻%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-purple-500/20 blur-2xl -z-10"></div>
              </div>
            </div>

            {/* Text */}
            <div className="about-hero-text">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                La Mia Storia
              </h1>
              <div className="space-y-4 text-gray-300 text-lg">
                <p>
                  Ciao! Sono <span className="text-purple-400 font-semibold">Luigi Balestrucci</span>,
                  un Full Stack Developer appassionato di tecnologia e innovazione.
                </p>
                <p>
                  Il mio percorso nel mondo della programmazione è iniziato da autodidatta,
                  mosso dalla curiosità di capire come funzionano le cose e dalla voglia di
                  creare soluzioni innovative.
                </p>
                <p>
                  Oggi mi specializzo nello sviluppo di applicazioni web moderne, utilizzando
                  le tecnologie più avanzate e integrando soluzioni di AI per ottimizzare i
                  processi e migliorare l'esperienza utente.
                </p>
                <p>
                  Quello che mi appassiona di più è la possibilità di trasformare idee in
                  prodotti concreti che possano fare la differenza.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-purple-950/50 to-black border border-purple-900/30 rounded-2xl">
              <div className="stat-number text-4xl md:text-5xl font-bold text-purple-400 mb-2">5</div>
              <div className="text-gray-400">Anni di Esperienza</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-950/50 to-black border border-purple-900/30 rounded-2xl">
              <div className="stat-number text-4xl md:text-5xl font-bold text-purple-400 mb-2">20</div>
              <div className="text-gray-400">Progetti Completati</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-950/50 to-black border border-purple-900/30 rounded-2xl">
              <div className="stat-number text-4xl md:text-5xl font-bold text-purple-400 mb-2">15</div>
              <div className="text-gray-400">Tecnologie</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-950/50 to-black border border-purple-900/30 rounded-2xl">
              <div className="stat-number text-4xl md:text-5xl font-bold text-purple-400 mb-2">100</div>
              <div className="text-gray-400">% Dedizione</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Il Mio Percorso
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 to-purple-900"></div>

            {timeline.map((item, index) => (
              <div key={index} className={`timeline-item relative mb-12 ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:text-right'}`}>
                <div className={`flex items-center ${index % 2 === 0 ? 'md:flex-row-reverse md:justify-end' : 'md:justify-start'} gap-4`}>
                  {/* Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-black -ml-2 md:-ml-2 z-10"></div>

                  {/* Content */}
                  <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-16' : 'md:ml-16'} bg-gradient-to-br from-purple-950/50 to-black border border-purple-900/30 rounded-2xl p-6 max-w-md`}>
                    <div className="text-purple-400 font-bold text-2xl mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            I Miei Valori
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-900/30 rounded-2xl p-8 hover:border-purple-500/50 transition-all">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-3 text-purple-300">Qualità</h3>
              <p className="text-gray-400">
                Dedico massima attenzione ai dettagli per garantire codice pulito,
                manutenibile e performante.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-900/30 rounded-2xl p-8 hover:border-purple-500/50 transition-all">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-3 text-purple-300">Innovazione</h3>
              <p className="text-gray-400">
                Sono sempre alla ricerca delle tecnologie più avanzate per creare
                soluzioni all'avanguardia.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-900/30 rounded-2xl p-8 hover:border-purple-500/50 transition-all">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-2xl font-bold mb-3 text-purple-300">Apprendimento</h3>
              <p className="text-gray-400">
                Credo nell'apprendimento continuo e nell'adattamento alle nuove sfide
                del settore tech.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Vuoi saperne di più?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Esplora le mie competenze e i progetti che ho realizzato
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/skills" className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-purple-500/30">
              Scopri le Skills
            </Link>
            <Link href="/projects" className="px-8 py-3 border-2 border-purple-600 hover:bg-purple-600/10 rounded-lg font-semibold transition-all">
              Vedi i Progetti
            </Link>
            <Link href="/contact" className="px-8 py-3 border-2 border-purple-600 hover:bg-purple-600/10 rounded-lg font-semibold transition-all">
              Contattami
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-900/30 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Luigi Balestrucci. Built with Next.js, TypeScript & GSAP
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
