/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkTheme: "dark",
  darkMode: ["selector", "[data-theme='dark']"],
  // DaisyUI theme colors
  daisyui: {
    themes: [
      {
        light: {
          primary: "#6A8752",
          "primary-content": "#263655",
          secondary: "#EDBF53",
          "secondary-content": "#263655",
          accent: "#6A8752",
          "accent-content": "#263655",
          neutral: "#263655",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#f3f3f3",
          "base-300": "#E0E0E0",
          "base-content": "#263655",
          info: "#6A8752",               // Verde para mensajes de info
          success: "#34EEB6",
          warning: "#EDBF53",
          error: "#FF8863",

          "--rounded-btn": "9999rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      },
      {
        dark: {
          primary: "#4CAF50",
          "primary-content": "#263655",
          secondary: "#EDBF53",
          "secondary-content": "#1B2733",
          accent: "#EDBF53",
          "accent-content": "#F9FBFF",
          neutral: "#263655",
          "neutral-content": "#FFFFFF",
          "base-100": "#3c2580",
          "base-200": "#1E1538",
          "base-300": "#2A3655",
          "base-content": "#F9FBFF",
          info: "#6A8752",
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#FF8863",

          "--rounded-btn": "9999rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
            "--tooltip-color": "oklch(var(--p))",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      },
    ],
  },
  theme: {
    extend: {
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
};
