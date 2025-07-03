import React, { useState } from "react";
import GradientBackground from "../components/GradientBackground";
import Footer from "../components/Footer";
import GradientText from "../components/GradientText";
import { motion } from "framer-motion";
import SpotlightCard from "../components/SpotlightCard";

export default function Privacy() {
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    });
  }

  function handleMouseLeave() {
    setSpotlight(s => ({ ...s, visible: false }));
  }

  return (
    <>
      <GradientBackground />
      <main className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 relative z-10">
        <GradientText>
          <h1 className="text-4xl md:text-5xl font-bold text-amber-500 mb-8 text-center">Privacy Policy</h1>
        </GradientText>
        <div className="max-w-2xl bg-white/10 rounded-xl p-8 shadow-lg backdrop-blur-md text-white text-lg space-y-6">
          <h2 className="text-2xl font-semibold mb-4 text-amber-400">Your Privacy Matters</h2>
          <p>
            At Retrato, we are committed to protecting your privacy. This policy explains what information we collect, how we use it, and how we keep it safe.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-2 text-amber-300">1. Information We Collect</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Personal details you provide (such as name, email, or messages sent through our forms).</li>
            <li>Technical data like your browser type, device, and usage patterns (collected automatically).</li>
          </ul>
          <h3 className="text-xl font-semibold mt-6 mb-2 text-amber-300">2. How We Use Your Information</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>To respond to your inquiries and provide requested services.</li>
            <li>To improve our website and personalize your experience.</li>
            <li>To communicate important updates or offers (only if you opt in).</li>
          </ul>
          <h3 className="text-xl font-semibold mt-6 mb-2 text-amber-300">3. Data Protection</h3>
          <p>
            We use industry-standard security measures to protect your data. However, no method of transmission over the internet is completely secure.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-2 text-amber-300">4. Cookies & Tracking</h3>
          <p>
            Our site may use cookies to enhance your experience. You can disable cookies in your browser settings, but some features may not work as intended.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-2 text-amber-300">5. Third-Party Services</h3>
          <p>
            We may use trusted third-party services (like analytics) to help us understand and improve our website. These providers may collect information as described in their own privacy policies.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-2 text-amber-300">6. Changes to This Policy</h3>
          <p>
            We may update this privacy policy from time to time. Please review it periodically for any changes.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-2 text-amber-300">7. Contact Us</h3>
          <p>
            If you have any questions or concerns about our privacy practices, please contact us via our Contact page. We are here to help.
          </p>
          <div className="flex justify-center mt-8">
            <a href="/">
              <button className="px-8 py-3 rounded-lg bg-white/10 border border-white/20 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer">
                <GradientText className="text-lg font-semibold">Back to Home</GradientText>
              </button>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 