"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

gsap.registerPlugin(ScrollTrigger);

const SkillsPage = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from('.skills-hero', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // Skill cards animation
      const skillCategories = document.querySelectorAll('.skill-category');
      skillCategories.forEach((category, index) => {
        gsap.from(category, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: category,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });
      });

      // Individual skill items
      const skillItems = document.querySelectorAll('.skill-item');
      skillItems.forEach(item => {
        gsap.from(item, {
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: '🎨',
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'React', level: 90, icon: '⚛️' },
        { name: 'React Router', level: 85, icon: '▲' },
        { name: 'Redux', level: 75, icon: '🔄' },
        { name: 'TypeScript', level: 88, icon: '📘' },
        { name: 'JavaScript', level: 92, icon: '💛' },
        { name: 'TailwindCSS', level: 90, icon: '🎨' },
        { name: 'HTML/CSS', level: 95, icon: '🌐' },
        { name: 'GSAP', level: 80, icon: '✨' }
      ]
    },
    {
      title: 'Backend Development',
      icon: '⚙️',
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Node.js', level: 70, icon: '🟢' },
        { name: 'Express', level: 70, icon: '🚂' },
        { name: 'Python', level: 88, icon: '🐍' },
        { name: 'REST API', level: 88, icon: '🔌' },
      ]
    },
    {
      title: 'Database & Cloud',
      icon: '💾',
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'PostgreSQL', level: 80, icon: '🐘' },
        { name: 'MySQL', level: 78, icon: '🔶' },
        { name: 'Firebase', level: 75, icon: '🔥' },
        { name: 'Docker', level: 72, icon: '🐳' }
      ]
    },
    // {
    //   title: 'AI & Machine Learning',
    //   icon: '🤖',
    //   color: 'from-orange-500 to-red-500',
    //   skills: [
    //     { name: 'OpenAI API', level: 85, icon: '🧠' },
    //     { name: 'LangChain', level: 75, icon: '⛓️' },
    //     { name: 'Prompt Engineering', level: 88, icon: '💭' },
    //     { name: 'AI Integration', level: 82, icon: '🔮' },
    //     { name: 'TensorFlow', level: 65, icon: '📊' }
    //   ]
    // },
    {
      title: 'Tools & Other',
      icon: '🛠️',
      color: 'from-yellow-500 to-orange-500',
      skills: [
        { name: 'Git', level: 90, icon: '📦' },
        { name: 'GitHub', level: 88, icon: '🐙' },
        { name: 'VS Code', level: 95, icon: '💻' },
        { name: 'Postman', level: 85, icon: '📬' },
        { name: 'Linux', level: 48, icon: '🐧' }
      ]
    }
  ];

  return (
    <div ref={heroRef} className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar currentPage="skills" />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-purple-950/30"></div>

        <div className="relative z-10 max-w-6xl mx-auto text-center skills-hero">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Le Mie Competenze
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Un arsenale completo di tecnologie moderne per creare soluzioni innovative
            e scalabili
          </p>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="skill-category">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="text-5xl">{category.icon}</div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r {category.color} bg-clip-text text-transparent">
                    {category.title}
                  </h2>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="skill-item group bg-gradient-to-br from-purple-950/50 to-black border border-purple-900/30 rounded-2xl p-6 hover:border-purple-500/50 transition-all hover:scale-105 cursor-pointer"
                  >
                    {/* Icon and Name */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-3xl">{skill.icon}</div>
                      <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Livello</span>
                        <span className="text-purple-400 font-semibold">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-1000 group-hover:from-purple-400 group-hover:to-purple-500"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-purple-950/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Formazione & Certificazioni
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-900/30 rounded-2xl p-8 hover:border-purple-500/50 transition-all">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold mb-3 text-purple-300">Formazione Continua</h3>
              <p className="text-gray-400 mb-4">
                Costante aggiornamento attraverso corsi online, documentazione ufficiale
                e sperimentazione con nuove tecnologie.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">•</span>
                  Udemy, Codegrind, Develhope
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">•</span>
                  Documentazione ufficiale delle tecnologie
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">•</span>
                  Progetti personali e open source
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-950/50 to-black border border-purple-900/30 rounded-2xl p-8 hover:border-purple-500/50 transition-all">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-2xl font-bold mb-3 text-purple-300">Specializzazioni</h3>
              <p className="text-gray-400 mb-4">
                Focus su tecnologie moderne e best practices per lo sviluppo di
                applicazioni web scalabili e performanti.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">•</span>
                  Full Stack Web Development
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">•</span>
                  Web App Development PWA(Progressive Web Apps)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">•</span>
                  AI Integration & Automation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Vuoi vedere cosa posso creare?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Esplora i progetti che ho realizzato utilizzando queste tecnologie
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/projects" className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-purple-500/30">
              Vedi i Progetti
            </Link>
            <Link href="/contact" className="px-8 py-3 border-2 border-purple-600 hover:bg-purple-600/10 rounded-lg font-semibold transition-all">
              Collaboriamo
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

export default SkillsPage;
