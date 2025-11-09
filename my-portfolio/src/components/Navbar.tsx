"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface NavbarProps {
  currentPage?: 'home' | 'about' | 'skills' | 'projects' | 'contact';
}

const Navbar: React.FC<NavbarProps> = ({ currentPage = 'home' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: '/', label: 'Home', page: 'home' },
    { href: '/about', label: 'About', page: 'about' },
    { href: '/skills', label: 'Skills', page: 'skills' },
    { href: '/projects', label: 'Projects', page: 'projects' },
    { href: '/contact', label: 'Contact', page: 'contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
            onClick={closeMenu}
          >
            Luigi Balestrucci
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.page}
                href={link.href}
                className={`transition-colors ${
                  currentPage === link.page
                    ? 'text-purple-400'
                    : 'hover:text-purple-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-purple-400 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              // X icon when menu is open
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon when menu is closed
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-4 py-4 border-t border-purple-900/30">
            {navLinks.map((link) => (
              <Link
                key={link.page}
                href={link.href}
                onClick={closeMenu}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentPage === link.page
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:bg-purple-600/20 hover:text-purple-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
