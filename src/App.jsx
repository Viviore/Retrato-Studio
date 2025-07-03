import "./App.css";
import { Routes, Route } from "react-router-dom";
import GradientText from "./components/GradientText";
import GradientBackground from "./components/GradientBackground";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Service from "./components/Service";
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import { useEffect } from "react";

// Main Home Page Component
function HomePage() {
  // Always scroll to top on mount (refresh or navigation)
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Gradient Background */}
      <GradientBackground />

      {/* Navbar */}
      <Nav />

      {/* Home */}
      <Hero />

      {/* Services */}
      <Service />

      {/* Gallery */}
      <Gallery />

      {/* Reviews */}
      <Reviews />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
    </Routes>
  );
}

export default App;
