"use client";

import React, { useEffect, useRef } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import ImageCarousel from '@/components/ImageCarousel';
import { getProjectBySlug, projects } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

// Helper to check if image field is an actual image path
const isImagePath = (src: string): boolean => {
  return src.startsWith('/') || src.startsWith('http');
};

const ProjectDetailPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const project = getProjectBySlug(slug);
  const pageRef = useRef(null);

  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from('.project-hero', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // Content sections animation
      gsap.from('.content-section', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.content-section',
          start: 'top 80%',
        }
      });
    }, pageRef);

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    notFound();
  }

  // Find related projects (same category, excluding current)
  const relatedProjects = projects
    .filter(p => p.category === project.category && p.slug !== project.slug)
    .slice(0, 3);

  return (
    <div ref={pageRef} className="min-h-screen bg-black text-white">
      <Navbar currentPage="projects" />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-purple-950/30"></div>

        <div className="relative z-10 max-w-6xl mx-auto project-hero">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-purple-400 transition-colors">Progetti</Link>
            <span>/</span>
            <span className="text-purple-400">{project.title}</span>
          </nav>

          {/* Project Header */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Project Icon */}
            <div className="bg-gradient-to-br from-purple-900/40 to-black p-8 rounded-2xl border border-purple-900/30 flex items-center justify-center">
              {isImagePath(project.image) ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  width={150}
                  height={150}
                  className="object-contain"
                />
              ) : (
                <span className="text-8xl lg:text-9xl">{project.image}</span>
              )}
            </div>

            {/* Project Info */}
            <div className="flex-1">
              {project.featured && (
                <span className="inline-block bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  ⭐ Featured Project
                </span>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                {project.title}
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                {project.shortDescription}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-6 text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{project.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{project.role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span className="capitalize">{project.category}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {project.github !== '#' && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold transition-all flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Codice GitHub
                  </a>
                )}
                {project.demo !== '#' && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all flex items-center gap-2 shadow-lg shadow-purple-500/30"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Vedi Demo Live
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Carousel Section */}
      <section className="py-12 px-6 content-section">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-purple-400">Screenshot del Progetto</h2>
          <ImageCarousel images={project.images} autoPlay={true} interval={6000} />
        </div>
      </section>

      {/* Tags Section */}
      <section className="py-8 px-6 content-section">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-purple-400">Tecnologie Utilizzate</h2>
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="tag-item px-4 py-2 bg-gradient-to-r from-purple-900/50 to-purple-800/30 text-purple-300 rounded-lg text-sm font-medium border border-purple-700/30 hover:border-purple-500/50 transition-all"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Full Description Section */}
      <section className="py-12 px-6 content-section">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-purple-400">Descrizione Completa</h2>
          <div className="bg-gradient-to-br from-purple-950/30 to-black border border-purple-900/30 rounded-2xl p-8">
            <div className="prose prose-invert max-w-none">
              {project.fullDescription.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-300 mb-4 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-12 px-6 content-section">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-purple-400">Punti Chiave</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {project.highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-gradient-to-br from-purple-950/30 to-black border border-purple-900/30 rounded-xl p-4"
              >
                <span className="text-purple-400 text-xl">✓</span>
                <span className="text-gray-300">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges & Learnings */}
      {(project.challenges || project.learnings) && (
        <section className="py-12 px-6 content-section">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {project.challenges && (
              <div className="bg-gradient-to-br from-purple-950/30 to-black border border-purple-900/30 rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  <span className="text-purple-400">Sfide Affrontate</span>
                </h3>
                <p className="text-gray-300 leading-relaxed">{project.challenges}</p>
              </div>
            )}
            {project.learnings && (
              <div className="bg-gradient-to-br from-purple-950/30 to-black border border-purple-900/30 rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">💡</span>
                  <span className="text-purple-400">Cosa Ho Imparato</span>
                </h3>
                <p className="text-gray-300 leading-relaxed">{project.learnings}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 px-6 bg-gradient-to-b from-black to-purple-950/20 content-section">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Progetti Correlati
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProjects.map((relProject) => (
                <Link
                  key={relProject.slug}
                  href={`/projects/${relProject.slug}`}
                  className="group bg-gradient-to-br from-purple-950/50 to-black border border-purple-900/30 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all hover:scale-105"
                >
                  <div className="h-32 bg-gradient-to-br from-purple-900/40 to-black flex items-center justify-center">
                    {isImagePath(relProject.image) ? (
                      <Image
                        src={relProject.image}
                        alt={relProject.title}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-6xl">{relProject.image}</span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white group-hover:text-purple-300 transition-colors mb-2">
                      {relProject.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {relProject.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-6 content-section">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ti piace questo progetto?</h2>
          <p className="text-gray-400 text-lg mb-8">
            Possiamo lavorare insieme per creare qualcosa di straordinario
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/contact"
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-purple-500/30"
            >
              Contattami
            </Link>
            <Link
              href="/projects"
              className="px-8 py-3 border-2 border-purple-600 hover:bg-purple-600/10 rounded-lg font-semibold transition-all"
            >
              Altri Progetti
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

export default ProjectDetailPage;
