// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'f1-red': '#E10600',
        'f1-black': '#15151E',
        'f1-gray': '#38383F',
        'ferrari-red': '#DC0000',
        'mercedes-teal': '#00A19C',
        'redbull-blue': '#0600EF',
        'mclaren-orange': '#FF8700',
      },
      fontFamily: {
        'racing': ['Titillium Web', 'sans-serif'],
        'display': ['Formula1', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}