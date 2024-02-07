import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {

    colors: {

      'seashell-peach': '#fff7f0',

      'burnt-sienna': '#e97662',

      'medium-purple': '#755cde',

      'sandy-brown': '#f5a560',

      'fountain-blue': '#62c4b7',

      'tawny-port': '#55204a',

      'black': '#000',

      'white': '#fff',

      'transparent': 'rgba(255,255,255,0)',
      
    },

    extend: {
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
    },
  },
  plugins: [],
};
export default config;
