const {nextui} = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|checkbox|date-picker|input|select|ripple|spinner|form|calendar|date-input|popover|listbox|divider|scroll-shadow).js"
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui()],
}

