/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6b7280',
        secondary: '#9ca3af',
        wireframe: {
          bg: '#f3f4f6',
          border: '#d1d5db',
          text: '#374151',
          accent: '#4b5563',
        }
      },
    },
  },
  plugins: [],
} 