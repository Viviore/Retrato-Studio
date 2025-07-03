import React from "react";
import GradientBackground from "../components/GradientBackground";
import Footer from "../components/Footer";
import GradientText from "../components/GradientText";

export default function Terms() {
  return (
    <>
      <GradientBackground />
      <main className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 relative z-10">
        <GradientText><h1 className="text-4xl md:text-5xl font-bold text-amber-500 mb-8 text-center">Terms & Conditions</h1></GradientText>
        <div className="max-w-2xl bg-white/10 rounded-xl p-8 shadow-lg backdrop-blur-md text-white text-lg space-y-6">
          <h2 className="text-2xl font-semibold mb-4 text-amber-400">Welcome</h2>
          <p>
            Thank you for visiting Retrato. By accessing or using our website, you agree to the following terms and conditions. Please review them carefully to ensure a clear understanding of your rights and responsibilities.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-2 text-amber-300">1. Use of Our Website</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Our content is provided for your personal, non-commercial use only.</li>
            <li>Do not copy, reproduce, or distribute any material without written permission.</li>
            <li>Respect the intellectual property rights of Retrato and our contributors.</li>
          </ul>
          <h3 className="text-xl font-semibold mt-6 mb-2 text-amber-300">2. User Responsibilities</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Keep your account information confidential and secure.</li>
            <li>Do not engage in any activity that could harm, disrupt, or misuse the website or its users.</li>
          </ul>
          <h3 className="text-xl font-semibold mt-6 mb-2 text-amber-300">3. Updates & Changes</h3>
          <p>
            We may update these terms at any time. Continued use of the site means you accept the revised terms. Please check this page periodically for updates.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-2 text-amber-300">4. Limitation of Liability</h3>
          <p>
            Retrato is not liable for any damages or losses resulting from your use of this website. All content is provided "as is" without warranties of any kind.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-2 text-amber-300">5. Contact Us</h3>
          <p>
            If you have questions or concerns about these terms, please reach out via our Contact page. We value transparency and are happy to assist you.
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