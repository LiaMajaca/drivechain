/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          500: '#10b981',
        },
        sky: {
          500: '#0ea5e9',
        },
        amber: {
          500: '#f59e0b',
        },
        rose: {
          500: '#f43f5e',
        },
        slate: {
          500: '#64748b',
          900: '#0f172a',
          800: '#1e293b',
        },
        gold: {
          500: '#eab308',
        },
        deepGreen: {
          500: '#065f46',
        },
        warmOrange: {
          500: '#ea580c',
        },
        softGray: {
          500: '#f8fafc',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};