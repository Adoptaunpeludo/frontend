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
            tertiary: '#3E73C7',
            default: {
              50: '#f7f7f8',
              100: '#eeeef0',
              200: '#d9d9de',
              300: '#b8b9c1',
              400: '#91939f',
              500: '#737584',
              600: '#5d5e6c',
              700: '#4c4d58',
              800: '#41414b',
              900: '#393941',
              950: '#18181b'
            }
          }
        },
        dark: {
          colors: {
            background: '#000000', // or DEFAULT
            foreground: '#ECEDEE', // or 50 to 900 DEFAULT
            primary: '#A5C73D',
            secondary: '#C74F3E',
            tertiary: '#3E73C7',
            default: {
              50: '#fafafa',
              100: '#efefef',
              200: '#dcdcdc',
              300: '#bdbdbd',
              400: '#989898',
              500: '#7c7c7c',
              600: '#656565',
              700: '#525252',
              800: '#464646',
              900: '#3d3d3d',
              950: '#292929'
            }
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
