import GradientText from "./GradientText";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const [atTop, setAtTop] = useState(true);
  const [indicatorVisible, setIndicatorVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY < 50);
      if (window.scrollY > 50 && indicatorVisible) {
        setIndicatorVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [indicatorVisible]);

  // Animation variants for staggered content, all delays start after video fade-in
  const baseDelay = 1.2;
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 60 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: baseDelay + delay, ease: "easeOut" },
    },
  });

  return (
    <section className="relative h-screen w-full overflow-hidden" id="home">
      {/* Video Background */}
      <motion.video
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: baseDelay, ease: "easeOut" }}
        autoPlay
        loop
        muted
        playsInline
        loading="lazy"
        preload="none"
        className="absolute top-0 left-0 w-full h-full object-cover z-1"
      >
        <source src="/videos/videoBg.webm" type="video/webm" />
        <source src="/videos/videoBg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </motion.video>

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10"></div>

      {/* Content */}
      <div className="container mx-auto flex px-5 py-8 md:py-16 lg:py-24 md:flex-row flex-col items-center justify-center h-full relative z-20">
        <div className="lg:flex-grow md:w-full md:p-10 lg:p-20 xl:p-40 flex flex-col md:mb-0 items-center justify-center text-center duration-300">
          {/* Logo */}
          <motion.div
            {...fadeUp(0.1)}
            className="mb-8 transform hover:scale-105 transition-transform duration-500"
          >
            <img
              src="/images/logo/logo.png"
              alt="Logo"
              className="h-24 md:h-32 lg:h-30 drop-shadow-2xl filter brightness-110 duration-300"
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            {...fadeUp(0.3)}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-amber-500 mb-4 leading-tight"
          >
            <GradientText>Capturing Real Moments</GradientText>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.5)}
            className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-light text-gray-200 mb-8 max-w-4xl leading-relaxed"
          >
            <span className="bg-gradient-to-r from-gray-200 via-white to-gray-200 bg-clip-text text-transparent font-medium">
              With elegance and simplicity. From portraits to pre-debuts, every
              photo tells your story.
            </span>
          </motion.p>

          {/* Button */}
          <motion.div {...fadeUp(0.7)} className="mt-2">
            <a href="#gallery">
              <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-3 rounded-full text-lg font-semibold hover:bg-white/20 hover:border-white/40 transition-all duration-300 shadow-xl cursor-pointer whitespace-nowrap">
                View Gallery
              </button>
            </a>
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-opacity duration-500 ${
          indicatorVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
