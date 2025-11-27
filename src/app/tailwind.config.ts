import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // من ألوان الفيجما اللي بعتّها
        brandBlue: "#00BFFF",
        brandYellow: "#FFC800",

        // Light theme
        lightBg: "#F0F0F0",
        lightText: "#1E1E1E",
        lightMuted: "#8F8F8F",

        // Dark theme
        darkBg: "#111725",
        darkSurface: "#101622",
        darkSurfaceSoft: "#183E4B",
        darkBorder: "#3F4041",
        darkText: "#FFFFFF",
        darkMuted: "#8E959D",
      },
    },
  },
  plugins: [],
};

export default config;
