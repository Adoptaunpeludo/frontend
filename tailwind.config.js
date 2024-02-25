const { nextui } = require('@nextui-org/react');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      lobster: ['Lobster'],
      poppins: ['Poppins']
    },
    extend: {}
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: '#FFFFFF', // or DEFAULT
            foreground: '#11181C', // or 50 to 900 DEFAULT
            primary: '#A5C73D',
            secondary: '#C74F3E',
            tertiary: '#3E73C7'
          }
        },
        dark: {
          colors: {
            background: '#000000', // or DEFAULT
            foreground: '#ECEDEE', // or 50 to 900 DEFAULT
            primary: '#A5C73D',
            secondary: '#C74F3E',
            tertiary: '#3E73C7'
          }
          // ... rest of the colors
        },
        mytheme: {
          // custom theme
          extend: 'dark',
          colors: {
            primary: {
              DEFAULT: '#BEF264',
              foreground: '#000000'
            },
            focus: '#BEF264'
          }
        }
      }
    })
  ]
};
