import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        "primary": "#4992ca",
        "primary-hover": "#2869a1"
      }
    }
  },

  plugins: []
} satisfies Config;
