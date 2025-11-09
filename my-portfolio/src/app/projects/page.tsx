"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

gsap.registerPlugin(ScrollTrigger);

const ProjectsPage = () => {
  const heroRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from('.projects-hero', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // Project cards animation
      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach((card, index) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, [activeFilter]);

  const projects = [
    {
      title: 'ToDoList WebApp Frontend React/TypeScript',
      description: "WebApp TodoList creata completamente con l'AI ChatGPT e Claude Code come esperimento sulle potenzialità dell'utilizzo dell'AI.",
      image: '📝',
      category: 'frontend',
      tags: ['React.js', 'TypeScript', 'Django', 'OpenAI', 'Claude Code', 'Gsap', 'Tailwind CSS', 'Firebase', ],
      github: 'https://github.com/bale231/todowebapp-frontend-reactts',
      demo: "https://todowebapp-frontend-reactts-stml.vercel.app/",
      featured: true
    },
    {
      title: 'ToDoList WebApp Backend Django',
      description: "Backend di ToDoList creata completamente con l'AI ChatGPT e Claude Code come esperimento sulle potenzialità dell'utilizzo dell'AI.",
      image: '📝',
      category: 'backend',
      tags: ['Django', 'OpenAI', 'Claude Code', 'MySQL', 'Social Auth Django', 'JWT', 'Django Rest-Framework', 'Google Auth'],
      github: 'https://github.com/bale231/todowebappbackend-django',
      demo: "https://todowebapp-frontend-reactts-stml.vercel.app/",
      featured: true
    },
    {
      title: 'Mixout Server',
      description: 'Repo incentrata sul backend di Mixout, un app per la creazione di outfits personalizzati tramite riconoscimento AI-Scan.',
      image: '👕',
      category: 'backend',
      tags: ['Docker', 'OpenAI', 'Claude Code', 'PostgreSQL', 'MongoDB', 'Django', 'Node.js'],
      github: 'https://github.com/Mixout-App/Mixout-Server',
      demo: 'https://mixout.ai/auth/',
      featured: true
    },
    {
      title: 'Electronic Arts Cloning Project',
      description: 'Progetto di clonazione della Homepage Electronic Arts per la scuola di informatica effettuata in team.',
      image: '🎮',
      category: 'frontend',
      tags: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/Francesca-Bonato/Electonic-Arts-clone-project',
      demo: 'https://eaclone.netlify.app/',
      featured: false
    },
    {
      title: 'ByCycle Blog Platform',
      description: 'Piattaforma di blogging per ciclisti come progetto finale della scuola di informatica.',
      image: '📝',
      category: 'fullstack',
      tags: ['React.js', 'Tailwind CSS', 'Node.js', 'Express', 'MySQL', 'CSS', 'JavaScript', 'SCSS'],
      github: 'https://github.com/Francesca-Bonato/ByCycle-project',
      demo: '#',
      featured: false
    },
    {
      title: 'Portfolio Generator',
      description: 'Tool per generare portfolio automaticamente partendo da template personalizzabili.',
      image: '🎨',
      category: 'frontend',
      tags: ['React', 'TailwindCSS', 'Vite'],
      github: 'https://github.com/bale231',
      demo: '#',
      featured: false
    },
    {
      title: 'WebApp Musica Demo',
      description: 'Progetto creato nel secondo colloquio tecnico con Spicy Sparks.',
      image: '🎵',
      category: 'frontend',
      tags: ['React.js', 'Redux', 'React Router', 'Tailwind CSS', 'Lerna', 'JavaScript', 'CSS' ],
      github: 'https://github.com/bale231/spicy-sparks-app',
      demo: '#',
      featured: false
    }
  ];

  const filters = [
    { id: 'all', label: 'Tutti i Progetti', icon: '🎯' },
    { id: 'fullstack', label: 'Full Stack', icon: '⚡' },
    { id: 'frontend', label: 'Frontend', icon: '🎨' },
    { id: 'backend', label: 'Backend', icon: '⚙️' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <div ref={heroRef} className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar currentPage="projects" />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-purple-950/30"></div>

        <div className="relative z-10 max-w-6xl mx-auto text-center projects-hero">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            I Miei Progetti
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Una selezione dei progetti più significativi che ho realizzato,
            dalle applicazioni web alle integrazioni AI
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  activeFilter === filter.id
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span>{filter.icon}</span>
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">Nessun progetto trovato in questa categoria</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={index}
                  className={`project-card group relative bg-gradient-to-br from-purple-950/50 to-black border border-purple-900/30 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all hover:scale-105 ${
                    project.featured ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-20 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ⭐ Featured
                    </div>
                  )}

                  {/* Image/Icon */}
                  <div className="relative h-48 bg-gradient-to-br from-purple-900/40 to-black flex items-center justify-center text-8xl border-b border-purple-900/30">
                    {project.image}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-center transition-all flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                      <a
                        href={project.demo}
                        className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-center transition-all flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Demo
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-purple-950/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Statistiche Progetti
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-purple-950/50 to-black border border-purple-900/30 rounded-2xl">
              <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">{projects.length}+</div>
              <div className="text-gray-400">Progetti Totali</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-950/50 to-black border border-purple-900/30 rounded-2xl">
              <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">50K+</div>
              <div className="text-gray-400">Linee di Codice</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-950/50 to-black border border-purple-900/30 rounded-2xl">
              <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">15+</div>
              <div className="text-gray-400">Tecnologie</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-950/50 to-black border border-purple-900/30 rounded-2xl">
              <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">100%</div>
              <div className="text-gray-400">Soddisfazione</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Hai un progetto in mente?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Collaboriamo per trasformare la tua idea in realtà
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact" className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-purple-500/30">
              Iniziamo a Parlare
            </Link>
            <Link href="/skills" className="px-8 py-3 border-2 border-purple-600 hover:bg-purple-600/10 rounded-lg font-semibold transition-all">
              Vedi le Skills
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

export default ProjectsPage;
