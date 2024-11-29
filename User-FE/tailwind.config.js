/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 10s linear infinite",
        flashy: "flashy 1.5s ease-in-out infinite",
        glow: "glow 1.5s ease-in-out infinite", // Add glowing effect
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        flashy: {
          "0%": { opacity: 1, transform: "scale(1)" },
          "50%": { opacity: 0.4, transform: "scale(1.1)" }, // Slightly larger and faded at 50%
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        glow: {
          "0%": { textShadow: "0 0 5px rgba(255, 255, 255, 0.7)" },
          "50%": { textShadow: "0 0 15px rgba(255, 255, 255, 1)" }, // Glowing effect
          "100%": { textShadow: "0 0 5px rgba(255, 255, 255, 0.7)" },
        },
      },
      colors: {
        cyprus: "#022D41",
      },
    },
  },
  plugins: [],
};
