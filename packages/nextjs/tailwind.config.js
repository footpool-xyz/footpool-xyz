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
          primary: "#4CAF50",            // Verde principal del logo
          "primary-content": "#1C1B29",   // Para contrastar
          secondary: "#FFC107",           // Amarillo del logo
          "secondary-content": "#1C1B29", // Contraste para el amarillo
          accent: "#FFC107",              // Amarillo de acento
          "accent-content": "#1C1B29",
          neutral: "#263655",             // Azul oscuro para el fondo
          "neutral-content": "#FFFFFF",
          "base-100": "#FFFFFF",
          "base-200": "#f3f3f3",
          "base-300": "#E0E0E0",
          "base-content": "#263655",
          info: "#4CAF50",                // Verde para mensajes de info
          success: "#34EEB6",             // Verde brillante para éxito
          warning: "#FFC107",             // Amarillo de advertencia
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
          "primary-content": "#FFFFFF",
          secondary: "#FFC107",
          "secondary-content": "#1C1B29",
          accent: "#FFC107",
          "accent-content": "#FFFFFF",
          neutral: "#263655",
          "neutral-content": "#F9FBFF",
          "base-100": "#1C1B29",          // Fondo oscuro para modo oscuro
          "base-200": "#2A2A37",
          "base-300": "#3A3A4A",
          "base-content": "#F9FBFF",
          info: "#4CAF50",
          success: "#34EEB6",
          warning: "#FFC107",
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
