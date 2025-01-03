/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        'custom': '830px',
        'customlg': '1150px'
      },
      colors: {
        primary: 'var(--color-primary)'
      }
    },
  },
  plugins: [],
}

