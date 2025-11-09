"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

const ContactPage = () => {
  const heroRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from('.contact-hero', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // Form animation
      gsap.from('.contact-form', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
      });

      // Info cards animation
      gsap.from('.info-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.4,
        ease: 'power3.out'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Si è verificato un errore. Riprova più tardi.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Errore di connessione. Controlla la tua connessione internet.');
    }
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'luigibalestrucci52@gmail.com',
      link: 'mailto:luigibalestrucci52@gmail.com'
    },
    {
      icon: '🐙',
      title: 'GitHub',
      value: 'github.com/bale231',
      link: 'https://github.com/bale231'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'Luigi Balestrucci',
      link: 'https://linkedin.com/in/luigi-balestrucci'
    },
    {
      icon: '📸',
      title: 'Instagram',
      value: '@luigi_bale',
      link: 'https://instagram.com/luigi_bale'
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
              <Link href="/about" className="hover:text-purple-400 transition-colors">About</Link>
              <Link href="/skills" className="hover:text-purple-400 transition-colors">Skills</Link>
              <Link href="/projects" className="hover:text-purple-400 transition-colors">Projects</Link>
              <Link href="/contact" className="text-purple-400">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-purple-950/30"></div>

        <div className="relative z-10 max-w-6xl mx-auto text-center contact-hero">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Mettiamoci in Contatto
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Hai un progetto in mente? Una domanda? O semplicemente vuoi dire ciao?
            Sono sempre aperto a nuove opportunità e collaborazioni.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                className="info-card group bg-gradient-to-br from-purple-950/50 to-black border border-purple-900/30 rounded-2xl p-6 hover:border-purple-500/50 transition-all hover:scale-105"
              >
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">
                  {info.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-purple-300">{info.title}</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                  {info.value}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="contact-form bg-gradient-to-br from-purple-950/30 to-black border border-purple-900/30 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Inviami un Messaggio
            </h2>
            <p className="text-gray-400 text-center mb-8">
              Compila il form qui sotto e ti risponderò al più presto!
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-purple-900/30 rounded-lg focus:outline-none focus:border-purple-500 transition-all text-white"
                    placeholder="Il tuo nome"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-purple-900/30 rounded-lg focus:outline-none focus:border-purple-500 transition-all text-white"
                    placeholder="tua@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-300 mb-2">
                  Oggetto *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-purple-900/30 rounded-lg focus:outline-none focus:border-purple-500 transition-all text-white"
                  placeholder="Di cosa vuoi parlare?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                  Messaggio *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-purple-900/30 rounded-lg focus:outline-none focus:border-purple-500 transition-all text-white resize-none"
                  placeholder="Scrivi il tuo messaggio qui..."
                ></textarea>
              </div>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="p-4 bg-green-900/30 border border-green-500/50 rounded-lg text-green-300">
                  ✓ Messaggio inviato con successo! Ti risponderò al più presto.
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-300">
                  ✗ {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg ${
                  status === 'loading'
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/30'
                }`}
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Invio in corso...
                  </span>
                ) : (
                  'Invia Messaggio'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-purple-950/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Altre Informazioni
          </h2>
          <div className="space-y-4 text-gray-400 text-lg">
            <p>
              <span className="text-purple-400 font-semibold">Tempo di risposta:</span> Di solito rispondo entro 24-48 ore
            </p>
            <p>
              <span className="text-purple-400 font-semibold">Disponibilità:</span> Aperto a progetti freelance e collaborazioni
            </p>
            <p>
              <span className="text-purple-400 font-semibold">Lingue:</span> Italiano, Inglese
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-900/30 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 mb-6">
            © {new Date().getFullYear()} Luigi Balestrucci. Built with Next.js, TypeScript & GSAP
          </p>

          {/* Social Icons */}
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/bale231"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 bg-gray-800/50 hover:bg-purple-600/20 rounded-full transition-all duration-300 hover:scale-110"
            >
              <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            <a
              href="https://linkedin.com/in/luigi-balestrucci"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 bg-gray-800/50 hover:bg-purple-600/20 rounded-full transition-all duration-300 hover:scale-110"
            >
              <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            <a
              href="https://instagram.com/luigi_bale"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 bg-gray-800/50 hover:bg-purple-600/20 rounded-full transition-all duration-300 hover:scale-110"
            >
              <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <a
              href="mailto:luigibalestrucci52@gmail.com"
              className="group relative p-3 bg-gray-800/50 hover:bg-purple-600/20 rounded-full transition-all duration-300 hover:scale-110"
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

export default ContactPage;
