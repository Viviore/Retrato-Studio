import GradientText from "./GradientText";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function Reviews() {
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
  const effectiveInView = isMobile ? true : isInView;

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

  const reviewVariants = {
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
    <section ref={sectionRef} className="text-white" id="reviews">
      <div className="container px-5 py-24 mx-auto">
        <motion.div
          className="flex flex-col text-center items-center justify-center w-full mb-16 mt-16 duration-300"
          initial={{ opacity: 0, y: 30 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            opacity: { duration: 0.8 },
            y: { duration: 1 },
          }}
        >
          <GradientText className="text-3xl md:text-5xl font-semibold duration-300 p-5">
            Stories From Our Clients
          </GradientText>
          <GradientText>
            {" "}
            <span className="inline-block h-2 w-50 rounded bg-amber-500 my-4"></span>
          </GradientText>
        </motion.div>

        <motion.div
          className="flex flex-wrap m-4 justify-center"
          variants={containerVariants}
          initial="hidden"
          animate={hasAnimated ? "visible" : "hidden"}
        >
          {/* Review 1 */}
          <motion.div
            className="xl:w-1/3 xl:mb-0 mb-6 p-4 flex flex-col items-center text-center"
            variants={reviewVariants}
          >
            <p className="text-center max-w-prose">
              Unsaon nako pag ingon ani nga feel gyud nako ang shoot? Haha.
              Bitaw, wala gyuy pressure. Ang photographer kabalo jud unsaon pag
              pa-gawas sa imong natural nga smile. Dili gyud ko hilig ug
              pictorial pero karon murag gusto nako usbon. Retrato is da best,
              swear.
            </p>
            {/* Stars */}
            <div className="flex items-center gap-1 mt-6 mb-4 text-3xl text-amber-500">
              <i className="ri-star-s-fill hover:scale-125 duration-300"></i>
              <i className="ri-star-s-fill hover:scale-125 duration-300"></i>
              <i className="ri-star-s-fill hover:scale-125 duration-300"></i>
              <i className="ri-star-s-fill hover:scale-125 duration-300"></i>
              <i className="ri-star-s-fill hover:scale-125 duration-300"></i>
            </div>
            <span className="inline-block h-1 w-10 rounded bg-amber-500 mb-4"></span>
            <h2 className="text-amber-500 font-medium title-font tracking-wider text-sm">
              SHEENA ROSE PELAYO
            </h2>
            <p className="text-gray-500">Valencia, Bukidnon</p>
          </motion.div>

          {/* Review 2 */}
          <motion.div
            className="xl:w-1/3 xl:mb-0 mb-6 p-4 flex flex-col items-center text-center"
            variants={reviewVariants}
          >
            <p className="text-center max-w-prose">
              Grabe ka nice ilang serbisyo! Wala koy plano magpa-pictorial unta
              pero akong ate ni insist. Pag abot sa shoot, abi nako awkward
              kaayo pero friendly man ilang team. Dili ko kabalo mu-pose pero
              ila ra ko gi tudluan gamay. Dako kaayo ko'g pasalamat. Ganahan
              kaayo ko sa kuha huhu.
            </p>
            {/* Stars */}
            <div className="flex items-center gap-1 mt-6 mb-4 text-3xl text-amber-500">
              <i className="ri-star-s-fill hover:scale-125 duration-300"></i>
              <i className="ri-star-s-fill hover:scale-125 duration-300"></i>
              <i className="ri-star-s-fill hover:scale-125 duration-300"></i>
              <i className="ri-star-s-fill hover:scale-125 duration-300"></i>
              <i className="ri-star-s-fill hover:scale-125 duration-300"></i>
            </div>
            <span className="inline-block h-1 w-10 rounded bg-amber-500 mb-4"></span>
            <h2 className="text-amber-500 font-medium title-font tracking-wider text-sm">
              JESSA MAE ABAPO
            </h2>
            <p className="text-gray-500">Kalilangan, Bukidnon</p>
          </motion.div>

          {/* Review 3 */}
          <motion.div
            className="xl:w-1/3 xl:mb-0 mb-6 p-4 flex flex-col items-center text-center"
            variants={reviewVariants}
          >
            <p className="text-center max-w-prose">
              Sa tinood lang, naglibog ko sa sinina nga dad-on pag shoot kay
              first time nako ani, pero ila ko gi-assist tanan. Chill ra kaayo
              ang vibe, wala pressure. Nalingaw ko, murag nag bonding ra mi. Pag
              tan-aw nako sa mga kuha, hala ka! Wala gyud ko nag-expect nga
              ingana ka nindot. Worth it gyud kaayo!
            </p>
            {/* Stars */}
            <div className="flex items-center gap-1 mt-6 mb-4 text-3xl text-amber-500">
              <i className="ri-star-s-fill hover:scale-125 duration-300"></i>
              <i className="ri-star-s-fill hover:scale-125 duration-300"></i>
              <i className="ri-star-s-fill hover:scale-125 duration-300"></i>
              <i className="ri-star-s-fill hover:scale-125 duration-300"></i>
              <i className="ri-star-s-fill hover:scale-125 duration-300"></i>
            </div>
            <span className="inline-block h-1 w-10 rounded bg-amber-500 mb-4"></span>
            <h2 className="text-amber-500 font-medium title-font tracking-wider text-sm">
              KENT ARLAN DUMOL
            </h2>
            <p className="text-gray-500">Pangantucan, Bukidnon</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
