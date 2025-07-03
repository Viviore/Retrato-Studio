/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { useInView, motion } from "framer-motion";
import GradientText from "./GradientText";
import Masonry from "./Masonry";
import { AnimatePresence } from "framer-motion";

const Gallery = ({ setAnimated }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [showMasonry, setShowMasonry] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "0px", amount: 0.1 });
  const [hasAnimated, setHasAnimated] = useState(false);
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const galleryImages = [
    {
      id: 1,
      img: "/images/output/1.jpg",
      url: "/images/output/1.jpg",
      height: 400,
      title: "Dalagang Pilipina at Cafe sa Bukid, Talakag",
      description:
        "A graceful tribute to the timeless Filipina, this shoot captures soft elegance and cultural pride against the rustic charm of Cafe sa Bukid. Surrounded by nature and provincial warmth, the Dalagang Pilipina blooms with quiet strength and classic beauty.",
    },
    {
      id: 2,
      img: "/images/output/2.jpg",
      url: "/images/output/2.jpg",
      height: 350,
      title: "Gown Portraits at Cafe sa Bukid, Talakag",
      description:
        "Set against the rustic beauty of Cafe sa Bukid, this shoot captures elegance and grace in a modern gown. With nature and countryside charm as the backdrop, the subject radiates timeless poise—blending contemporary style with a serene provincial atmosphere.",
    },
    {
      id: 3,
      img: "/images/output/3.jpg",
      url: "/images/output/3.jpg",
      height: 450,
      title: "Moonlight Reverie",
      description:
        "Set in a wide green field beneath the moonlight, this dreamy shoot captures soft elegance and quiet wonder. Dressed in a flowing gown and riding a horse, she becomes a vision of grace—blending fantasy, nature, and serene beauty.",
    },
    {
      id: 4,
      img: "/images/output/4.jpg",
      url: "/images/output/4.jpg",
      height: 380,
      title: "Serene Afternoon at Lake Pinamaloy",
      description:
        "Set by the calm waters of Lake Pinamaloy in Don Carlos, this golden hour shoot captures effortless charm and natural beauty. Dressed in a casual dress and touched by the warm afternoon light, she reflects quiet peace and simple elegance in a lakeside setting.",
    },
    {
      id: 5,
      img: "/images/output/5.jpg",
      url: "/images/output/5.jpg",
      height: 420,
      title: "Golden Stillness at Lake Pinamaloy",
      description:
        "Set along the quiet shore of Lake Pinamaloy in Don Carlos, this golden hour shoot captures soft simplicity and calm. Seated by the water in a casual dress, she radiates gentle charm and natural elegance beneath the warm afternoon light.",
    },
    {
      id: 6,
      img: "/images/output/6.jpg",
      url: "/images/output/6.jpg",
      height: 360,
      title: "Grace in the Field",
      description:
        "Set in a peaceful farm surrounded by golden fields and soft air, this shoot captures the essence of a true Filipina in her kimona and native basket. With every pose, she reflects the quiet strength, charm, and simple elegance of countryside life—an ode to the timeless spirit of the dalagang bukid.",
    },
    {
      id: 7,
      img: "/images/output/7.jpg",
      url: "/images/output/7.jpg",
      height: 390,
      title: "Bulak sa Baybay",
      description:
        "By the still waters of Lake Pinamaloy, this shoot captures the soft grace of a Filipina in a casual dress, gently holding a flower. Set in the golden hour glow, she mirrors the calm of the lake—simple, serene, and beautifully in bloom.",
    },
    {
      id: 8,
      img: "/images/output/8.jpg",
      url: "/images/output/8.jpg",
      height: 410,
      title: "Hinabing Ganda",
      description:
        "In the quiet beauty of Kalilangan, Bukidnon, Ms. Danica graces the frame in a locally made gown by Ms. Junio. With every step, she carries the soul of her roots—showcasing the charm of a dalaga and the craftsmanship of local hands. A tribute to heritage, elegance, and homegrown pride.",
    },
    {
      id: 9,
      img: "/images/output/9.jpg",
      url: "/images/output/9.jpg",
      height: 370,
      title: "Brewed Confidence at Felritz",
      description:
        "Inside the café of Felritz Hotel, this funshoot captures the cool, effortless charm of a half-African gent. With warm ambiance, subtle swagger, and natural light, each frame blends culture, character, and chill energy in one cozy space.",
    },
    {
      id: 10,
      img: "/images/output/10.jpg",
      url: "/images/output/10.jpg",
      height: 430,
      title: "Soft Strength at Campo Uno",
      description:
        "Set in the open charm of Campo Uno, this funshoot features Ms. Jesha in a white casual bodycon dress—radiating confidence and grace with a striking aura reminiscent of our former President's daughter. Each frame captures her quiet boldness and effortless beauty in natural light and open space.",
    },
    {
      id: 11,
      img: "/images/output/11.jpg",
      url: "/images/output/11.jpg",
      height: 400,
      title: "Sell with Style",
      description:
        "We offer clean, high-quality product photography tailored for your business. Whether it's food, fashion, or custom items, we capture your products in the best light—ready for posters, menus, social media, and marketing materials. Visuals that sell, edited with style and purpose.",
    },
    {
      id: 12,
      img: "/images/output/12.jpg",
      url: "/images/output/12.jpg",
      height: 380,
      title: "Love in Still Waters",
      description:
        "Set against the calm beauty of Lake Pinamaloy, this prenup shoot captures Mr. and Mrs. Nulada in simple, casual outfits—reflecting the quiet joy and peace found in true love. Surrounded by nature's calm, their story unfolds in every soft glance and gentle moment.",
    },
    {
      id: 13,
      img: "/images/output/13.jpg",
      url: "/images/output/13.jpg",
      height: 420,
      title: "Pamilya sa Kahayag: Family Portrait in Harmony",
      description:
        "A celebration of togetherness, this family portrait radiates warmth and unity. Set against a minimalist backdrop, each member's genuine smile and coordinated earth tones reflect the love and harmony that bind them. The soft light highlights the beauty of family bonds, making this moment timeless.",
    },
    {
      id: 14,
      img: "/images/output/14.jpg",
      url: "/images/output/14.jpg",
      height: 390,
      title: "Barkadahan sa Kampus: Friends in the Golden Hour",
      description:
        "Captured during the golden hour, this candid group photo showcases the spirit of friendship and youth. With masks on and laughter in their eyes, these friends stand resilient and hopeful, embodying camaraderie and the joy of shared journeys even in challenging times.",
    },
    {
      id: 15,
      img: "/images/output/15.jpg",
      url: "/images/output/15.jpg",
      height: 410,
      title: "Simplicity and Grace at the Bukid",
      description:
        "In the same rustic charm of Cafe sa Bukid, this variation captures a different story—still rooted in cultural pride, but this time with barefoot charm and gentle smiles. A tribute to rural joy, graceful stillness, and the quiet power of natural beauty.",
    },
  ];

  const handleImageClick = (imgObj) => {
    setModalImg(imgObj);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setModalImg(null), 300); // Wait for animation
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="text-white py-16 md:py-24 w-full"
        id="gallery"
      >
        <div className="container mx-auto px-4 md:px-15">
          <motion.div
            className="flex flex-col text-left w-full mb-12 md:mb-15"
            initial={{ opacity: 0, y: 30 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              opacity: { duration: 0.8 },
              y: { duration: 1 },
            }}
          >
            <GradientText className="text-4xl md:text-5xl lg:text-6xl font-semibold mt-15 duration-300 pb-2.5">
              Journey Through Our Gallery
            </GradientText>
          </motion.div>
          <motion.div
            className="w-full bg-transparent min-h-[600px] px-10"
            initial="hidden"
            animate={hasAnimated ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { duration: 1, ease: "easeInOut", delay: 0.1 },
              },
            }}
            onAnimationComplete={() => setShowMasonry(true)}
          >
            {showMasonry && (
              <Masonry
                items={galleryImages}
                ease="easeOut"
                duration={0.6}
                stagger={0.05}
                animateFrom="bottom"
                scaleOnHover={true}
                hoverScale={0.95}
                blurToFocus={true}
                colorShiftOnHover={false}
                onImageClick={handleImageClick}
                parentAnimated={hasAnimated && showMasonry}
              />
            )}
          </motion.div>
        </div>
      </section>

      {/* Modern Modal with Animation */}
      <AnimatePresence>
        {modalOpen && modalImg && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
          >
            {/* Simple dark overlay */}
            <motion.div
              className="absolute inset-0 bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            {/* Only the image, no container, no title, no close button */}
            <motion.img
              src={modalImg.img || modalImg}
              alt=""
              className="relative z-10 max-h-[90vh] max-w-[95vw] object-contain rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeModal}
              draggable={false}
              loading="lazy"
            />
            {/* If you add <video> in the future, use loading="lazy" and preload="none" for optimization */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
