import React from "react";
import { Link, useLocation } from "react-router-dom";

const socials = [
  {
    href: "https://www.instagram.com/",
    label: "Instagram",
    icon: "ri-instagram-line",
  },
  {
    href: "https://facebook.com/",
    label: "Facebook",
    icon: "ri-facebook-line",
  },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
];

export default function Footer() {
  const location = useLocation();

  const handleLinkClick = (href) => {
    const NAVBAR_HEIGHT = 100;
    if (href === "/") {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else if (href.includes('#')) {
      const id = href.split('#')[1];
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const y = element.getBoundingClientRect().top + window.pageYOffset - NAVBAR_HEIGHT;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <footer className="w-full mt-12 font-sans">
      {/* Main Footer Bar */}
      <div className="w-full flex flex-col md:flex-row items-center md:justify-between bg-white/10 backdrop-blur-md shadow-lg px-6 py-4 border border-white/10">
        {/* Logo Left */}
        <div className="flex items-center w-full md:w-auto md:flex-none justify-center md:justify-start mb-4 md:mb-0">
          <img
            src="/images/logo/logo.png"
            alt="Retrato Logo"
            className="h-10 w-auto drop-shadow select-none"
            draggable="false"
          />
        </div>
        {/* Nav Links Right */}
        <nav className="w-full md:w-auto md:flex-1 flex justify-center md:justify-end">
          <ul className="flex flex-col md:flex-row items-center gap-2 md:gap-10">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-white/80 text-sm md:text-base font-extralight tracking-wide px-2 py-1 rounded transition-all duration-200 hover:text-amber-400 hover:underline underline-offset-8 decoration-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  style={{letterSpacing: 1.1}}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Subfooter */}
      <div className="w-full bg-[#181818] py-3">
        <p className="text-center text-xs md:text-sm text-neutral-400 tracking-wider font-light italic">
          © 2025 Retrato — Created by Barth
        </p>
      </div>
    </footer>
  );
} 