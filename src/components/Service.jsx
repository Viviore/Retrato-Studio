/* eslint-disable no-unused-vars */
import GradientText from "./GradientText";
import SpotlightCard from "./SpotlightCard";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const Service = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    margin: "0px",
    amount: 0.1,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Override isInView on mobile
  const effectiveInView = isMobile ? true : isInView;

  // Smaller Screens Animations
  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
      rotateX: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 80,
        damping: 20,
      },
    },
    hover: {
      y: -4,
      scale: 1.01,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  const packageVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.15,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.97,
      transition: {
        duration: 0.08,
        ease: "easeOut",
      },
    },
  };

  // Smaller Screens Text Animations
  const textVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Track if animation has already played
  const [hasAnimated, setHasAnimated] = useState(false);
  useEffect(() => {
    if (effectiveInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [effectiveInView, hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="text-white overflow-hidden w-full px-10 py-4 lg:px-8 lg:py-10"
      id="services"
    >
      <div className="w-full max-w-7xl mx-auto duration-300">
        <motion.div
          className="flex flex-col text-center items-center justify-center w-full mb-4 lg:mb-8 duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
            opacity: { duration: 0.6 },
            y: { duration: 0.8 },
          }}
        >
          <GradientText className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold duration-300 pb-2 mt-25 mb-5 lg:pb-4">
            Packages & Services
          </GradientText>
        </motion.div>

        <motion.div
          className="flex flex-col xl:flex-row gap-6 md:gap-8 w-full"
          variants={containerVariants}
          initial="hidden"
          animate={hasAnimated ? "visible" : "hidden"}
        >
          {/* CARD 1: Pre-debut Shot */}
          <motion.div
            className="w-full xl:w-1/3 order-2 xl:order-1"
            variants={cardVariants}
            layout
          >
            <SpotlightCard
              className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden "
              spotlightColor="rgba(245, 158, 11, 0.15)"
            >
              <motion.h2
                className="text-sm tracking-widest title-font mb-1 font-medium"
                variants={textVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                FLASHDRIVE INCLUDED
              </motion.h2>
              <motion.h1
                className="text-2xl lg:text-4xl text-amber-500 pb-4 mb-4 border-b border-gray-200 leading-none font-semibold"
                variants={textVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                PRE-DEBUT SHOT
              </motion.h1>

              {/* Packages Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Package 1 */}
                <motion.div
                  className="bg-transparent rounded-lg shadow-md p-2 md:p-4 flex flex-col items-start relative border border-neutral-800 transition-shadow duration-300"
                  variants={packageVariants}
                  transition={{ duration: 0.15 }}
                >
                  <span className="text-md md:text-lg font-bold text-white mb-2">
                    PACKAGE 1
                  </span>
                  <span className="text-base font-bold text-amber-500 mb-2">
                    ₱2,500
                  </span>
                  <ul className="text-sm text-gray-300 space-y-1 pl-2">
                    <li>10 Edited Photos</li>
                  </ul>
                </motion.div>
                {/* Package 2 */}
                <motion.div
                  className="bg-transparent rounded-lg shadow-md p-2 md:p-4 flex flex-col items-start relative border border-neutral-800 transition-shadow duration-300"
                  variants={packageVariants}
                  transition={{ duration: 0.15 }}
                >
                  <span className="text-md md:text-lg font-bold text-white mb-2">
                    PACKAGE 2
                  </span>
                  <span className="text-base font-bold text-amber-500 mb-2">
                    ₱3,500
                  </span>
                  <ul className="text-sm text-gray-300 space-y-1 pl-2">
                    <li>20 Edited Photos</li>
                  </ul>
                </motion.div>
                {/* Package 3 */}
                <motion.div
                  className="bg-transparent rounded-lg shadow-md p-2 md:p-4 flex flex-col items-start relative border border-neutral-800 transition-shadow duration-300"
                  variants={packageVariants}
                  transition={{ duration: 0.15 }}
                >
                  <span className="text-md md:text-lg font-bold text-white mb-2">
                    PACKAGE 3
                  </span>
                  <span className="text-base font-bold text-amber-500 mb-2">
                    ₱3,000
                  </span>
                  <ul className="text-sm text-gray-300 space-y-1 pl-2">
                    <li>10 Edited Photos</li>
                    <li>1 Minute Video</li>
                  </ul>
                </motion.div>
                {/* Package 4 */}
                <motion.div
                  className="bg-transparent rounded-lg shadow-md p-2 md:p-4 flex flex-col items-start relative border border-neutral-800 transition-shadow duration-300"
                  variants={packageVariants}
                  transition={{ duration: 0.15 }}
                >
                  <span className="text-md md:text-lg font-bold text-white mb-2">
                    PACKAGE 4
                  </span>
                  <span className="text-base font-bold text-amber-500 mb-2">
                    ₱4,500
                  </span>
                  <ul className="text-sm text-gray-300 space-y-1 pl-2">
                    <li>15 Edited Photos</li>
                    <li>1 Minute Video</li>
                  </ul>
                </motion.div>
                {/* Package 5 */}
                <motion.div
                  className="bg-transparent rounded-lg shadow-md p-2 md:p-4 flex flex-col items-start relative border border-neutral-800 transition-shadow duration-300"
                  variants={packageVariants}
                  transition={{ duration: 0.15 }}
                >
                  <span className="text-md md:text-lg font-bold text-white mb-2">
                    PACKAGE 5
                  </span>
                  <span className="text-base font-bold text-amber-500 mb-2">
                    ₱4,500
                  </span>
                  <ul className="text-sm text-gray-300 space-y-1 pl-2">
                    <li>15 Edited Photos</li>
                    <li>1 Minute Video</li>
                  </ul>
                </motion.div>
                {/* Package 6 */}
                <motion.div
                  className="bg-transparent rounded-lg shadow-md p-2 md:p-4 flex flex-col items-start relative border border-neutral-800 transition-shadow duration-300"
                  variants={packageVariants}
                  transition={{ duration: 0.15 }}
                >
                  <span className="text-md md:text-lg font-bold text-white mb-2">
                    VIDEO PACKAGE
                  </span>
                  <ul className="text-sm text-gray-300 space-y-1 pl-2">
                    <li>1 Minutes Video</li>
                    <li>3 Minutes Video</li>
                  </ul>
                </motion.div>
              </div>

              {/* Button */}
              <button
                onClick={() => {
                  // Scroll to contact section and set service parameter
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                    // Set URL parameter for the service
                    const url = new URL(window.location);
                    url.searchParams.set("service", "Pre-Debut Shot");
                    window.history.pushState({}, "", url);
                    // Trigger a custom event to notify Contact component
                    window.dispatchEvent(
                      new CustomEvent("serviceSelected", {
                        detail: { service: "Pre-Debut Shot" },
                      })
                    );
                  }
                }}
                className="bg-amber-500 py-2 px-4 focus:outline-none rounded text-lg transition-shadow duration-300 group relative overflow-hidden w-full flex items-center justify-center mt-auto shadow-none hover:shadow-[0_0_16px_4px_rgba(245,158,11,0.5),0_0_32px_8px_rgba(255,255,255,0.10)] cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 bg-[length:300%_100%] animate-gradient-x opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 w-full flex items-center justify-center">
                  <span className="text-lg font-semibold opacity-100 group-hover:opacity-0 transition-all duration-300 text-white">
                    Book Now
                  </span>
                  <span className="text-lg font-semibold text-white absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    Book Now
                  </span>
                </div>
              </button>
            </SpotlightCard>
          </motion.div>

          {/* CARD 2: Fun Shoot */}
          <motion.div
            className="w-full xl:w-1/3 order-1 lg:order-2"
            variants={cardVariants}
            layout
          >
            <SpotlightCard
              className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden "
              spotlightColor="rgba(245, 158, 11, 0.15)"
            >
              <motion.span
                className="bg-amber-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.6,
                  type: "spring",
                  stiffness: 150,
                }}
              >
                POPULAR
              </motion.span>
              <motion.h2
                className="text-sm tracking-widest title-font mb-1 font-medium"
                variants={textVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <i class="ri-close-large-fill"></i>FLASHDRIVE NOT INCLUDED
              </motion.h2>
              <motion.h1
                className="text-3xl lg:text-4xl text-amber-500 pb-4 mb-4 border-b border-gray-200 leading-none font-semibold"
                variants={textVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                FUN SHOOT
              </motion.h1>

              {/*Packages Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Package 1 */}
                <motion.div
                  className="bg-transparent rounded-lg shadow-md p-2 md:p-4 flex flex-col items-start relative border border-neutral-800 transition-shadow duration-300"
                  variants={packageVariants}
                  transition={{ duration: 0.15 }}
                >
                  <span className="text-md md:text-lg font-bold text-white mb-2">
                    PACKAGE 1
                  </span>
                  <span className="text-base font-bold text-amber-500 mb-2">
                    ₱1,000
                  </span>
                  <ul className="text-sm text-gray-300 space-y-1 pl-2">
                    <li>6 Edited Photos</li>
                  </ul>
                </motion.div>
                {/* Package 2 */}
                <motion.div
                  className="bg-transparent rounded-lg shadow-md p-2 md:p-4 flex flex-col items-start relative border border-neutral-800 transition-shadow duration-300"
                  variants={packageVariants}
                  transition={{ duration: 0.15 }}
                >
                  <span className="text-md md:text-lg font-bold text-white mb-2">
                    PACKAGE 2
                  </span>
                  <span className="text-base font-bold text-amber-500 mb-2">
                    ₱2,000
                  </span>
                  <ul className="text-sm text-gray-300 space-y-1 pl-2">
                    <li>12 Edited Photos</li>
                  </ul>
                </motion.div>
                {/* Package 3 */}
                <motion.div
                  className="bg-transparent rounded-lg shadow-md p-2 md:p-4 flex flex-col items-start relative border border-neutral-800 transition-shadow duration-300"
                  variants={packageVariants}
                  transition={{ duration: 0.15 }}
                >
                  <span className="text-md md:text-lg font-bold text-white mb-2">
                    PACKAGE 3
                  </span>
                  <span className="text-base font-bold text-amber-500 mb-2">
                    ₱3,000
                  </span>
                  <ul className="text-sm text-gray-300 space-y-1 pl-2">
                    <li>18 Edited Photos</li>
                    <li className="invisible">Dummy</li>
                  </ul>
                </motion.div>
                {/* Package 4 */}
                <motion.div
                  className="bg-transparent rounded-lg shadow-md p-2 md:p-4 flex flex-col items-start relative border border-neutral-800 transition-shadow duration-300"
                  variants={packageVariants}
                  transition={{ duration: 0.15 }}
                >
                  <span className="text-md md:text-lg font-bold text-white mb-2">
                    PACKAGE 4
                  </span>
                  <span className="text-base font-bold text-amber-500 mb-2">
                    ₱4,000
                  </span>
                  <ul className="text-sm text-gray-300 space-y-1 pl-2">
                    <li>24 Edited Photos</li>
                    <li className="invisible">Dummy</li>
                  </ul>
                </motion.div>
                {/* Package 5 (spans both columns) */}
                <motion.div
                  className="bg-transparent rounded-lg shadow-md  p-2 md:p-4 flex flex-col items-start relative border border-neutral-800 transition-shadow duration-300 col-span-2"
                  variants={packageVariants}
                  transition={{ duration: 0.15 }}
                >
                  <span className="text-md md:text-lg font-bold text-white mb-2 flex items-center gap-2">
                    VIDEO PACKAGE
                  </span>
                  <ul className="text-sm text-gray-300 space-y-1 pl-2">
                    <li>1 Minute Video</li>
                    <li>3 Minutes Video</li>
                    <li className="invisible">Dummy</li>
                  </ul>
                </motion.div>
              </div>

              {/* Button */}
              <button
                onClick={() => {
                  // Scroll to contact section and set service parameter
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                    // Set URL parameter for the service
                    const url = new URL(window.location);
                    url.searchParams.set("service", "Fun Shoot");
                    window.history.pushState({}, "", url);
                    // Trigger a custom event to notify Contact component
                    window.dispatchEvent(
                      new CustomEvent("serviceSelected", {
                        detail: { service: "Fun Shoot" },
                      })
                    );
                  }
                }}
                className="bg-amber-500 py-2 px-4 focus:outline-none rounded text-lg transition-shadow duration-300 group relative overflow-hidden w-full flex items-center justify-center mt-auto shadow-none hover:shadow-[0_0_16px_4px_rgba(245,158,11,0.5),0_0_32px_8px_rgba(255,255,255,0.10)] cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 bg-[length:300%_100%] animate-gradient-x opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 w-full flex items-center justify-center">
                  <span className="text-lg font-semibold opacity-100 group-hover:opacity-0 transition-all duration-300 text-white">
                    Book Now
                  </span>
                  <span className="text-lg font-semibold text-white absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    Book Now
                  </span>
                </div>
              </button>
            </SpotlightCard>
          </motion.div>

          {/* CARD 3: Prenuptial Shot */}
          <motion.div
            className="w-full xl:w-1/3 order-3 lg:order-3"
            variants={cardVariants}
            layout
          >
            <SpotlightCard
              className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden"
              spotlightColor="rgba(245, 158, 11, 0.15)"
            >
              <motion.h2
                className="text-sm tracking-widest title-font mb-1 font-medium"
                variants={textVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                FLASHDRIVE NOT INCLUDED
              </motion.h2>
              <motion.h1
                className="text-3xl lg:text-4xl text-amber-500 pb-4 mb-4 border-b border-gray-200 leading-none font-semibold"
                variants={textVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                PRENUPTIAL SHOT
              </motion.h1>

              {/* Packages Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Package 1 */}
                <motion.div
                  className="bg-transparent rounded-lg shadow-md p-2 md:p-4 flex flex-col items-start relative border border-neutral-800 transition-shadow duration-300"
                  variants={packageVariants}
                  transition={{ duration: 0.15 }}
                >
                  <span className="text-md md:text-lg font-bold text-white mb-2">
                    PACKAGE 1
                  </span>
                  <span className="text-base font-bold text-amber-500 mb-2">
                    ₱2,500
                  </span>
                  <ul className="text-sm text-gray-300 space-y-1 pl-2">
                    <li>10 Edited Photos</li>
                  </ul>
                </motion.div>
                {/* Package 2 */}
                <motion.div
                  className="bg-transparent rounded-lg shadow-md p-2 md:p-4 flex flex-col items-start relative border border-neutral-800 transition-shadow duration-300"
                  variants={packageVariants}
                  transition={{ duration: 0.15 }}
                >
                  <span className="text-md md:text-lg font-bold text-white mb-2">
                    PACKAGE 2
                  </span>
                  <span className="text-base font-bold text-amber-500 mb-2">
                    ₱3,500
                  </span>
                  <ul className="text-sm text-gray-300 space-y-1 pl-2">
                    <li>20 Edited Photos</li>
                  </ul>
                </motion.div>
                {/* Package 3 */}
                <motion.div
                  className="bg-transparent rounded-lg shadow-md p-2 md:p-4 flex flex-col items-start relative border border-neutral-800 transition-shadow duration-300"
                  variants={packageVariants}
                  transition={{ duration: 0.15 }}
                >
                  <span className="text-md md:text-lg font-bold text-white mb-2">
                    PACKAGE 3
                  </span>
                  <span className="text-base font-bold text-amber-500 mb-2">
                    ₱3,000
                  </span>
                  <ul className="text-sm text-gray-300 space-y-1 pl-2">
                    <li>10 Edited Photos</li>
                    <li>1 Minute Video</li>
                  </ul>
                </motion.div>
                {/* Package 4 */}
                <motion.div
                  className="bg-transparent rounded-lg shadow-md p-2 md:p-4 flex flex-col items-start relative border border-neutral-800 transition-shadow duration-300"
                  variants={packageVariants}
                  transition={{ duration: 0.15 }}
                >
                  <span className="text-md md:text-lg font-bold text-white mb-2">
                    PACKAGE 4
                  </span>
                  <span className="text-base font-bold text-amber-500 mb-2">
                    ₱4,500
                  </span>
                  <ul className="text-sm text-gray-300 space-y-1 pl-2">
                    <li>15 Edited Photos</li>
                    <li>1 Minute Video</li>
                  </ul>
                </motion.div>
                {/* Package 5 */}
                <motion.div
                  className="bg-transparent rounded-lg shadow-md p-2 md:p-4 flex flex-col items-start relative border border-neutral-800 transition-shadow duration-300"
                  variants={packageVariants}
                  transition={{ duration: 0.15 }}
                >
                  <span className="text-md md:text-lg font-bold text-white mb-2">
                    PACKAGE 5
                  </span>
                  <span className="text-base font-bold text-amber-500 mb-2">
                    ₱4,500
                  </span>
                  <ul className="text-sm text-gray-300 space-y-1 pl-2">
                    <li>15 Edited Photos</li>
                    <li>1 Minute Video</li>
                  </ul>
                </motion.div>
                {/* Package 6 */}
                <motion.div
                  className="bg-transparent rounded-lg shadow-md p-2 md:p-4 flex flex-col items-start relative border border-neutral-800 transition-shadow duration-300"
                  variants={packageVariants}
                  transition={{ duration: 0.15 }}
                >
                  <span className="text-md md:text-lg font-bold text-white mb-2">
                    VIDEO PACKAGE
                  </span>
                  <ul className="text-sm text-gray-300 space-y-1 pl-2">
                    <li>1 Minutes Video</li>
                    <li>3 Minutes Video</li>
                  </ul>
                </motion.div>
              </div>

              {/* Button */}
              <button
                onClick={() => {
                  // Scroll to contact section and set service parameter
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                    // Set URL parameter for the service
                    const url = new URL(window.location);
                    url.searchParams.set("service", "Prenuptial Shot");
                    window.history.pushState({}, "", url);
                    // Trigger a custom event to notify Contact component
                    window.dispatchEvent(
                      new CustomEvent("serviceSelected", {
                        detail: { service: "Prenuptial Shot" },
                      })
                    );
                  }
                }}
                className="bg-amber-500 py-2 px-4 focus:outline-none rounded text-lg transition-shadow duration-300 group relative overflow-hidden w-full flex items-center justify-center mt-auto shadow-none hover:shadow-[0_0_16px_4px_rgba(245,158,11,0.5),0_0_32px_8px_rgba(255,255,255,0.10)] cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 bg-[length:300%_100%] animate-gradient-x opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 w-full flex items-center justify-center">
                  <span className="text-lg font-semibold opacity-100 group-hover:opacity-0 transition-all duration-300 text-white">
                    Book Now
                  </span>
                  <span className="text-lg font-semibold text-white absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    Book Now
                  </span>
                </div>
              </button>
            </SpotlightCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Service;
