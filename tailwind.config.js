/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      colors: {
        primary: 'rgb(219, 68, 68)',
      },
    },
  },
  plugins: [
    require("daisyui"),
    function({ addComponents }) {
      addComponents({
        '.custom-section *': {
          all: 'unset',
          display: 'revert',
          // Add other reset styles as needed
        },
        '.custom-section': {
          '@apply bg-white text-black': {}, // Add any styles you want to keep
        },
      });
    },
  ],
}
