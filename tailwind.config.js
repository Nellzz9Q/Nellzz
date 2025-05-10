// tailwind.config.js
export default {
  darkMode: 'media', // ← ここを 'class' から 'media' に変更！
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#ff005c',
      },
    },
  },
  plugins: [],
};
// tailwind.config.js
module.exports = {
  content: [ './app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}' ],
  theme: { extend: {} },
  plugins: [require('@tailwindcss/typography')], // 👈 追加
};
