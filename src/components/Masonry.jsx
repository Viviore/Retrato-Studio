import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const useMedia = (queries, values, defaultValue) => {
  const get = () =>
    values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;

  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach((q) => matchMedia(q).addEventListener("change", handler));
    return () =>
      queries.forEach((q) =>
        matchMedia(q).removeEventListener("change", handler)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries]);

  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

const preloadImages = async (urls) => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

const Masonry = ({
  items,
  ease = "easeOut",
  duration = 0.4,
  stagger = 0.025,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  onImageClick,
  parentAnimated = true,
}) => {
  const columns = useMedia(
    [
      "(min-width:1500px)",
      "(min-width:1000px)",
      "(min-width:600px)",
      "(min-width:400px)",
    ],
    [3, 2, 2, 1],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const [containerHeight, setContainerHeight] = useState(0);

  // Progressive reveal: track loaded images
  const [loadedIds, setLoadedIds] = useState([]);

  // Calculate grid and store col/row for zig-zag animation
  const grid = useMemo(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const gap = 32;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;
    const mapped = items.map((child, idx) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      // Use a fixed aspect ratio for all tiles (4:5)
      const aspectRatio = 4 / 5;
      const height = columnWidth / aspectRatio;
      const y = colHeights[col];
      const row = Math.floor(colHeights[col] / (height + gap));
      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height, col, row };
    });
    setContainerHeight(Math.max(...colHeights) - gap);
    return mapped;
  }, [columns, items, width]);

  // Zig-zag stagger: delay = (row + col * 0.5) * stagger
  const getTileVariants = (item) => ({
    hidden: {
      opacity: 0,
      x: item.x,
      y: item.y + 30,
      width: item.w,
      height: item.h,
      filter: blurToFocus ? "blur(10px)" : undefined,
    },
    visible: {
      opacity: 1,
      x: item.x,
      y: item.y,
      width: item.w,
      height: item.h,
      filter: blurToFocus ? "blur(0px)" : undefined,
      transition: {
        duration,
        ease,
        delay: (item.row + item.col * 0.5) * stagger,
      },
    },
  });

  const [hoveredId, setHoveredId] = useState(null);

  // Handler for progressive reveal
  const handleImageLoad = (id) => {
    setLoadedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: containerHeight }}
    >
      <AnimatePresence>
        {parentAnimated &&
          grid.map((item) => (
            <motion.div
              key={item.id}
              data-key={item.id}
              className="absolute box-content group cursor-pointer"
              style={{
                willChange: "transform, width, height, opacity",
                aspectRatio: "4 / 5",
                zIndex: hoveredId === item.id ? 2 : 1,
              }}
              initial="hidden"
              animate={loadedIds.includes(item.id) ? "visible" : "hidden"}
              exit="hidden"
              variants={getTileVariants(item)}
              whileHover={scaleOnHover ? { scale: hoverScale } : {}}
              transition={{ type: "tween" }}
              onClick={() =>
                onImageClick
                  ? onImageClick(item)
                  : window.open(item.url, "_blank", "noopener")
              }
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                className="relative w-full h-full rounded-[10px] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)] text-[10px] leading-[10px] overflow-hidden"
                style={{ aspectRatio: "4 / 5" }}
              >
                <img
                  src={item.img}
                  alt={item.title || ""}
                  className="w-full h-full object-cover rounded-[10px]"
                  draggable={false}
                  loading="lazy"
                  style={{
                    transition: colorShiftOnHover ? "filter 0.3s" : undefined,
                  }}
                  onLoad={() => handleImageLoad(item.id)}
                />
                {colorShiftOnHover && (
                  <motion.div
                    className="color-overlay absolute inset-0 rounded-[10px] bg-gradient-to-tr from-pink-500/50 to-sky-500/50 pointer-events-none"
                    style={{
                      opacity: hoveredId === item.id ? 0.3 : 0,
                      transition: "opacity 0.3s",
                    }}
                  />
                )}
                <div
                  className="absolute inset-0 bg-black/70 rounded-[10px] flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-white z-10"
                  style={{ pointerEvents: "none" }}
                >
                  <div className="text-lg md:text-xl lg:text-2xl font-bold mb-3 text-center whitespace-pre-line drop-shadow-lg text">
                    {item.title}
                  </div>
                  <div className="text-sm md:text-base lg:text-lg font-normal text-center whitespace-pre-line drop-shadow-md">
                    {item.description}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
};

export default Masonry;
