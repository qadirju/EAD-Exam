export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c1d3ff',
          300: '#a3bcff',
          400: '#7a95ff',
          500: '#5568ff',
          600: '#3d47cc',
          700: '#2d35a3',
          800: '#1f247a',
          900: '#151851',
        },
        secondary: {
          50: '#f5f3ff',
          100: '#ede9ff',
          200: '#ddd3ff',
          300: '#c2abff',
          400: '#a382ff',
          500: '#8f5aff',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        accent: {
          50: '#fef3c7',
          100: '#fde68a',
          200: '#fcd34d',
          300: '#fbbf24',
          400: '#f59e0b',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#92400e',
          900: '#78350f',
        },
      },
    },
  },
  plugins: [],
}
