const GradientBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Large gradient circle - top left */}
      <div className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px] xl:w-[1200px] xl:h-[1200px] -top-[400px] -left-[400px] md:-top-[500px] md:-left-[500px] lg:-top-[600px] lg:-left-[600px] xl:-top-[700px] xl:-left-[700px] bg-amber-500 opacity-5 rounded-full blur-3xl duration-300"></div>

      {/* Medium gradient circle - bottom right */}
      <div className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] xl:w-[1000px] xl:h-[1000px] -bottom-[300px] -right-[300px] md:-bottom-[400px] md:-right-[400px] lg:-bottom-[500px] lg:-right-[500px] xl:-bottom-[600px] xl:-right-[600px] bg-amber-500 opacity-5 rounded-full blur-3xl duration-300"></div>
    </div>
  );
};

export default GradientBackground;
