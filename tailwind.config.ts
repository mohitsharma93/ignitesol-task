import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: ['./src/**/*.{html,ts}'], // Angular-specific content scanning
  theme: {
    extend: {
      colors: {
        primary: '#5E56E7',
        lavender: '#F8F7FF',
        lightGrey: '#F0F0F6',
        grey: '#A0A0A0',
        darkGrey: '#333333',
      },
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        h1: ['48px', { lineHeight: '56px', fontWeight: '600' }],
        h2: ['30px', { lineHeight: '36px', fontWeight: '600' }],
        genre: ['20px', { lineHeight: '28px', fontWeight: '400' }],
        body: ['16px', { lineHeight: '24px', fontWeight: '400' }],
        small: ['12px', { lineHeight: '16px', fontWeight: '400' }],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
      },
      boxShadow: {
        card: '0 2px 5px 0 rgba(211, 209, 238, 0.5)',
      },
      height: {
        textbox: '40px',
        genreCard: '50px',
        bookCard: '162px',
      },
      width: {
        bookCard: '114px',
      },
    },
  },
  plugins: [],
};

export default config;
