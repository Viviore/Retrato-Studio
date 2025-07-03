/* eslint-disable no-unused-vars */
import GradientText from "./GradientText";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { emailAPI } from "../services/emailService";

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
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
  const effectiveInView = isMobile ? true : isInView;

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    appointment: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  // Listen for service selection from Service cards
  useEffect(() => {
    const handleServiceSelected = (event) => {
      const { service } = event.detail;
      setFormData((prev) => ({
        ...prev,
        service: service,
      }));
    };

    // Check URL parameters on component mount
    const urlParams = new URLSearchParams(window.location.search);
    const serviceFromUrl = urlParams.get("service");
    if (serviceFromUrl) {
      setFormData((prev) => ({
        ...prev,
        service: serviceFromUrl,
      }));
    }

    // Listen for custom events
    window.addEventListener("serviceSelected", handleServiceSelected);

    return () => {
      window.removeEventListener("serviceSelected", handleServiceSelected);
    };
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send both notification and auto-reply emails
      const result = await emailAPI.sendBookingEmails(
        formData,
        formRef.current
      );

      if (result.success) {
        console.log("SUCCESS! Both emails sent successfully");
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          appointment: "",
          service: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Form submission failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
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
      className="text-gray-600 body-font relative 0 pt-20"
      id="contact"
    >
      <motion.div
        className="container px-5 py-24 mx-auto flex flex-col md:flex-col space-y-8 md:space-y-8 xl:flex-row xl:space-y-0 xl:space-x-10"
        variants={containerVariants}
        initial="hidden"
        animate={effectiveInView ? "visible" : "hidden"}
      >
        {/* Map & Contacts */}
        <motion.div
          className="xl:w-2/3 md:w-full w-full bg-gray-300 rounded-3xl border-1 border-neutral-800 overflow-hidden sm:mr-0 md:mr-0 xl:mr-10 p-10 flex items-end justify-start relative"
          variants={contentVariants}
        >
          {/* Google Map as background */}
          <iframe
            title="map"
            width="100%"
            height="100%"
            className="absolute inset-0 pointer-events-none"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            scrolling="no"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31621.721365101683!2d124.68493893405078!3d7.819943106331758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32ff44e71e97fac7%3A0x904a1978215a63b3!2sKalilangan%2C%20Bukidnon!5e0!3m2!1sen!2sph!4v1751129972304!5m2!1sen!2sph"
            style={{
              filter: "grayscale(1) contrast(1.2) brightness(0.4)",
            }}
          ></iframe>

          {/* Overlay with fixed opacity and z-index */}
          <div className="bg-primary absolute inset-0 pointer-events-none opacity-10 z-0 pt-10  "></div>

          {/* Contact Info Box (Overlayed on map) */}
          <div className="w-full bg-primary flex flex-wrap py-6 px-3 sm:px-6 shadow-md relative z-10 rounded-3xl border border-neutral-800 bg-neutral-900">
            <div className="w-full sm:w-1/2 px-2 sm:px-6 mb-6 sm:mb-0">
              <h2 className="title-font font-semibold text-amber-500 tracking-widest text-xs">
                ADDRESS
              </h2>
              <p className="leading-relaxed text-white text-sm sm:text-base">
                Kalilangan, Bukidnon Province 8713, Philippines
              </p>
              <h2 className="title-font font-semibold text-amber-500 tracking-widest text-xs mt-4">
                PHONE
              </h2>
              <p className="leading-relaxed text-white text-sm sm:text-base">
                +639280761089
              </p>
            </div>
            <div className="w-full sm:w-1/2 px-2 sm:px-6">
              <h2 className="title-font font-semibold text-amber-500 tracking-widest text-xs">
                EMAIL
              </h2>
              <a
                href="mailto:retrato.creativeteam@gmail.com?subject=General Inquiry"
                className="text-white hover:text-gray-500 duration-300 text-sm sm:text-base break-all"
              >
                retrato.creativeteam@gmail.com
              </a>
              <h2 className="title-font font-semibold text-amber-500 tracking-widest text-xs mt-4">
                SOCIALS
              </h2>
              <div className="container">
                <div className="flex justify-start items-center gap-3 text-lg text-white">
                  <a
                    href="https://www.facebook.com/blissphotostudioyourphotographybuddy"
                    aria-label="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="ri-facebook-fill hover:text-gray-500 duration-300"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/retrat_oo?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="ri-instagram-line hover:text-gray-500 duration-300"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="xl:w-1/3 md:w-full bg-primary flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 p-5 rounded-3xl border border-neutral-800 bg-neutral-900"
          variants={contentVariants}
        >
          <h2 className="text-amber-500 text-lg mb-1 font-medium title-font">
            Schedule Your Photoshoot
          </h2>
          <p className="leading-relaxed mb-5 text-white">
            Let's capture the moment that tells your story.
          </p>

          <form ref={formRef} onSubmit={handleSubmit} id="contact-form">
            {/* Name Field */}
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-500">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full bg-neutral-800 rounded border border-neutral-800 focus:border-neutral-800 
            focus:ring-2 focus:ring-neutral-700 text-base outline-none text-neutral-400 py-1 px-3 
            leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            {/* Email Field */}
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-500"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-neutral-800 rounded border border-neutral-800 focus:border-neutral-800 
            focus:ring-2 focus:ring-neutral-700 text-base outline-none text-neutral-400 py-1 px-3 
            leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            {/* Appointment Date Field */}
            <div className="relative mb-4">
              <label
                htmlFor="appointment"
                className="leading-7 text-sm text-gray-500"
              >
                Appointment Date
              </label>
              <input
                type="date"
                id="appointment"
                name="appointment"
                value={formData.appointment}
                onChange={handleInputChange}
                required
                className="w-full bg-neutral-800 rounded border border-neutral-800 focus:border-neutral-800 
            focus:ring-2 focus:ring-neutral-700 text-base outline-none text-neutral-400 py-1 px-3 
            leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            {/* Service Field */}
            <div className="relative mb-4">
              <label
                htmlFor="service"
                className="leading-7 text-sm text-gray-500"
              >
                Service
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                required
                className="w-full bg-neutral-800 rounded border border-neutral-800 focus:border-neutral-800 
            focus:ring-2 focus:ring-neutral-700 text-base outline-none text-neutral-400 py-2 px-3 
            transition-colors duration-200 ease-in-out [&>option[value='']]:hidden"
              >
                <option value="" disabled>
                  Select a service
                </option>
                <option value="Fun Shoot">Fun Shoot</option>
                <option value="Pre-Debut Shot">Pre-Debut Shot</option>
                <option value="Prenuptial Shot">Prenuptial Shot</option>
              </select>
            </div>

            {/* Message Field */}
            <div className="relative mb-4">
              <label
                htmlFor="message"
                className="leading-7 text-sm text-gray-500"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                maxLength={250}
                required
                className="w-full bg-neutral-800 rounded border border-neutral-800 focus:border-neutral-800 \
            focus:ring-2 focus:ring-neutral-700 h-32 text-base outline-none text-neutral-400 py-1 px-3 \
            resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
              <div className="text-xs text-gray-500 mt-1 text-right">
                {formData.message.length}/250 characters
              </div>
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="mb-4 p-3 bg-green-900 border border-green-500 rounded text-green-400 text-sm duration-300">
                Thank you! Your message has been sent successfully. We'll get
                back to you soon.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-4 p-3 bg-red-900 border border-red-500 rounded text-red-400 text-sm duration-300">
                Sorry, there was an error sending your message. Please try
                again.
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-transparent border-2 border-amber-500 py-2 px-6 focus:outline-none 
        rounded text-lg transition-all duration-300 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed w-full cursor-pointer"
            >
              {/* Animated background overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 bg-[length:300%_100%] animate-gradient-x opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Text content */}
              <div className="relative z-10">
                <GradientText className="text-lg font-semibold opacity-100 group-hover:opacity-0 transition-all duration-300">
                  {isSubmitting ? "Sending..." : "Submit"}
                </GradientText>
                <span className="text-lg font-semibold text-white absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {isSubmitting ? "Sending..." : "Submit"}
                </span>
              </div>
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-3">
            Your information is safe with us. We respect your privacy.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
