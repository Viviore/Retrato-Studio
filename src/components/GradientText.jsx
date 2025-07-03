/*
	Installed from https://reactbits.dev/tailwind/
*/

import React from "react";

export default function GradientText({ children, className = "" }) {
  return (
    <span
      className={`bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 bg-[length:300%_100%] bg-clip-text text-transparent animate-gradient-x ${className}`}
    >
      {children}
    </span>
  );
}

// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         gradient: {
//           '0%': { backgroundPosition: '0% 50%' },
//           '50%': { backgroundPosition: '100% 50%' },
//           '100%': { backgroundPosition: '0% 50%' },
//         },
//       },
//       animation: {
//         gradient: 'gradient 8s linear infinite'
//       },
//     },
//   },
//   plugins: [],
// };
