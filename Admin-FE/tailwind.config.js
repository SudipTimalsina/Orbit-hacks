/** @type {import('tailwindcss').Config} */
export default {
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ripple: '#DAECF3',
        crush: '#FE424D',
        seafloor: '#1AA6B7',
        cyprus: '#022D41',
        greenlight:'#077B88'
      },
    },
  },
  plugins: [],
}