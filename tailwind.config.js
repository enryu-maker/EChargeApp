/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: "Parkinsans-Bold",
        body: "Parkinsans-Regular"
      },
      colors: {
        primary: "#29B675"
      }
    },
  },
  plugins: [],
}
