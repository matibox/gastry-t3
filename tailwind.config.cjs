// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: '#E78D34',
        brown: '#AE4E10',
        green: '#8C8E30',
        black: '#0E1211',
        beige: '#EBC392',
        gray: '#979797',
      },
      fontFamily: {
        montserrat: ['var(--montserrat)', ...fontFamily.sans],
        'open-sans': ['var(--open-sans)', ...fontFamily.sans],
      },
      backgroundImage: {
        hero: "url('/hero.webp')",
      },
    },
  },
  plugins: [],
};
