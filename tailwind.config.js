/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: ({ colors }) => ({
        inherit: colors.inherit,
        current: colors.current,
        transparent: colors.transparent,
        primary: "#243665",
        secondary: "#8BD8BD",
        info: "#2a9670",
        black: colors.black,
        white: colors.white,
        slate: colors.slate,
        error: "#B00020",
        gray: {
          50: "#FAFAFC",
          100: "#E9E9EC",
          200: "#C6C8CD",
          300: "#ACAEB6",
          400: "#92959F",
          500: "#777C87",
          600: "#5D6370",
          700: "#434959",
          800: "#293041",
          900: "#0f172a",
        },
        zinc: colors.zinc,
        neutral: colors.neutral,
        stone: "#607d8b",
        red: colors.red,
        orange: colors.orange,
        amber: colors.amber,
        yellow: colors.yellow,
        lime: colors.lime,
        green: "#097969",
        emerald: colors.emerald,
        teal: colors.teal,
        cyan: colors.cyan,
        sky: "#0166dd",
        blue: colors.blue,
        indigo: colors.indigo,
        violet: colors.violet,
        purple: colors.purple,
        fuchsia: colors.fuchsia,
        pink: colors.pink,
        rose: colors.rose,
      }),
    },
  },
  plugins: [],
};
