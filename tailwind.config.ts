import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E2433",
        steel: "#53697A",
        mist: "#EDF2F4",
        copper: { DEFAULT: "#B8551F", dark: "#933F13", bright: "#E07B3C", light: "#F6DFD0" },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
