/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { href: "#home", label: "HOME" },
  { href: "#services", label: "SERVICES" },
  { href: "#gallery", label: "GALLERY" },
  { href: "#contact", label: "BOOK NOW", cta: true },
];

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const trigger = window.innerHeight * 0.8;
      setIsScrolled(window.scrollY > trigger);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className="fixed z-50 left-0 right-0 flex justify-center pointer-events-none mt-4 px-4 md:px-8 lg:px-16 xl:px-20"
      style={{ top: 0 }}
    >
      <nav
        className={`pointer-events-auto flex items-center justify-between w-full px-4 md:px-14 py-5 rounded-3xl border border-white/20 shadow-xl backdrop-blur-xl bg-white/10 transition-all duration-500 ${
          isScrolled ? "max-w-7xl" : "max-w-3xl"
        } mx-4 md:mx-0`}
        style={{ overflow: "hidden" }}
      >
        {/* Logo always on the left */}
        <div className="flex items-center min-w-[100px]">
          <img
            src="/images/logo/logo.png"
            alt="Logo"
            className="h-8 md:h-10 drop-shadow-md filter brightness-110"
          />
        </div>

        {/* Desktop Nav links */}
        <div className="hidden md:flex items-center gap-x-5">
          {navLinks.map((link) =>
            link.cta ? (
              <a
                key={link.label}
                href={link.href}
                className="bg-amber-400/10 border border-amber-400/50 text-amber-400 px-8 py-2 rounded-full text-base font-semibold hover:bg-amber-400/20 hover:border-amber-400/80 shadow-lg cursor-pointer ml-4 transition backdrop-blur-md whitespace-nowrap"
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-white/90 hover:text-amber-400 font-medium transition"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        {/* Hamburger for mobile/tablet */}
        <button
          className="md:hidden flex items-center justify-center text-3xl text-white/90 hover:text-amber-400 transition pointer-events-auto ml-2"
          aria-label="Open menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <i className={menuOpen ? "" : "ri-menu-line"}></i>
        </button>
      </nav>

      {/* Mobile/Tablet Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center md:hidden pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Close button in upper right corner */}
            <button
              className="absolute top-8 right-6.5 text-white bg-white/20 hover:bg-white/40 rounded-full p-2 shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 z-50"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.2}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <motion.nav
              className="bg-white/10 border border-white/20 rounded-2xl shadow-xl px-8 py-10 flex flex-col items-center gap-6 w-[90vw] max-w-sm"
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              {navLinks.map((link) =>
                link.cta ? (
                  <a
                    key={link.label}
                    href={link.href}
                    className="w-full text-center bg-amber-400/10 border border-amber-400/50 text-amber-400 px-8 py-3 rounded-full text-lg font-semibold hover:bg-amber-400/20 hover:border-amber-400/80 shadow-lg cursor-pointer transition backdrop-blur-md whitespace-nowrap"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="w-full text-center text-white/90 hover:text-amber-400 font-medium text-xl py-2 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              )}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
