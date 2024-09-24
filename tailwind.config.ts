import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(171deg, #F88508 -12.41%, rgba(246, 250, 217, 0) 163.32%)',
        'layout-gradient': 'linear-gradient(113deg, #FFF 0.28%, rgba(70, 97, 115, 0) 178.65%)',
      },
      boxShadow: {
        'box-custom': '10px 10px 4px rgba(0, 0, 0, 0.50)',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        goblin :"var(--green)",
        text:"var(--text)",
        inputBg:"var(--input-bg)",

      },
    },
  },
  plugins: [],
};
export default config;
