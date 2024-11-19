/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#07213F',
        'brand-secondary': '#2a628f',
        'brand-dark': '#000919',
        'brand-gold': '#C5B358',
        'brand-neutral': '#A9987E',
      },
      backgroundColor: {
        skin: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          accent: 'var(--bg-accent)',
        },
      },
      textColor: {
        skin: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          accent: 'var(--text-accent)',
        },
      },
      borderColor: {
        skin: {
          primary: 'var(--border-primary)',
          secondary: 'var(--border-secondary)',
          accent: 'var(--border-accent)',
        },
      },
      ringColor: {
        skin: {
          primary: 'var(--ring-primary)',
          secondary: 'var(--ring-secondary)',
          accent: 'var(--ring-accent)',
        },
      },
      ringOffsetColor: {
        skin: {
          primary: 'var(--ring-offset-primary)',
          secondary: 'var(--ring-offset-secondary)',
          accent: 'var(--ring-offset-accent)',
        },
      },
    },
  },
  plugins: [],
};