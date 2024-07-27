/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./apps/docs/pages/**/*.{js,ts,jsx,tsx}",
    "./apps/docs/components/**/*.{js,ts,jsx,tsx}",
    "./apps/docs/app/**/*.{js,ts,jsx,tsx}",
    // Add paths for other apps if necessary
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
