/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    {
      pattern:
        /bg-(green|yellow|orange|red|pink|purple|blue|cyan)-(20|30|40|50|60)/,
    },
    {
      pattern:
        /bg-(bronze|iron|steel|valadium|mithril|adomant|gold|titanium|cobalt|mood-green|mood-yellow|mood-orange|mood-red|mood-pink|mood-purple|mood-blue|mood-cyan|fade-green|fade-yellow|fade-orange|fade-red|fade-pink|fade-purple|fade-blue|fade-cyan)/,
    },
    {
      pattern:
        /fill-(bronze|iron|steel|valadium|mithril|adomant|gold|titanium|cobalt|mood-green|mood-yellow|mood-orange|mood-red|mood-pink|mood-purple|mood-blue|mood-cyan|fade-green|fade-yellow|fade-orange|fade-red|fade-pink|fade-purple|fade-blue|fade-cyan)/,
    },
    {
      pattern: /bg-(grey)-(10|20|30|40|50|60|70|80|90|100)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        'eclipse-dark': '#000',
        'grayscale-gray-60': '#8e8e93',
        'main-colors-white': '#fff',
        'colours-blue-blue-20': '#a4d1ff',
        'colours-blue-blue-30': '#5badff',
        'colours-blue-blue-40': '#0a84ff',
        'colours-blue-blue-50': '#005bb7',
        'colours-blue-blue-60': '#013264',
        'colours-purple-purple-20': '#eac0ff',
        'colours-purple-purple-30': '#d991fd',
        'colours-purple-purple-40': '#bf5af2',
        'colours-purple-purple-50': '#8a18c4',
        'colours-purple-purple-60': '#550080',
        'colours-pink-pink-20': '#ff9bc5',
        'colours-pink-pink-30': '#ff6e9a',
        'colours-pink-pink-40': '#f02a5a',
        'colours-pink-pink-50': '#951342',
        'colours-pink-pink-60': '#580825',
        'colours-red-red-20': '#ffbdb9',
        'colours-red-red-30': '#ff5e54',
        'colours-red-red-40': '#ff453a',
        'colours-red-red-50': '#b6251d',
        'colours-red-red-60': '#680600',
        'colours-orange-orange-20': '#ffdda9',
        'colours-orange-orange-30': '#ffb543',
        'colours-orange-orange-40': '#ff9f0a',
        'colours-orange-orange-50': '#c97a00',
        'colours-orange-orange-60': '#714500',
        'colours-yellow-yellow-20': '#fff3b5',
        'colours-yellow-yellow-30': '#ffdf41',
        'colours-yellow-yellow-40': '#ffd60a',
        'colours-yellow-yellow-50': '#cba900',
        'colours-yellow-yellow-60': '#766200',
        'colours-green-green-20': '#c9ffd1',
        'colours-green-green-30': '#55ed6c',
        'colours-green-green-40': '#32d74b',
        'colours-green-green-50': '#008a15',
        'colours-green-green-60': '#00570d',
        'greyscale-gray-10': '#f2f2f7',
        'greyscale-gray-20': '#e5e5ea',
        'greyscale-gray-30': '#d1d1d6',
        'greyscale-gray-40': '#c7c7cc',
        'greyscale-gray-50': '#aeaeb2',
        'greyscale-gray-70': '#636366',
        'greyscale-gray-80': '#48484a',
        'greyscale-gray-90': '#3a3a3c',
        'greyscale-gray-100': '#1c1c1e',

        green: {
          20: '#C9FFD1',
          30: '#55ED6C',
          40: '#32D74B',
          50: '#008A15',
          60: '#00570D',
        },
        yellow: {
          20: '#FFF3B5',
          30: '#FFDF41',
          40: '#FFD60A',
          50: '#CBA900',
          60: '#766200',
        },
        orange: {
          20: '#FFDDA9',
          30: '#FFB543',
          40: '#FF9F0A',
          50: '#C97A00',
          60: '#714400',
        },
        red: {
          20: '#FFBDB9',
          30: '#FF5D54',
          40: '#FF453A',
          50: '#B6251D',
          60: '#680600',
        },
        pink: {
          20: '#FFB6EA',
          30: '#FF7EDB',
          40: '#F02A5A',
          50: '#951342',
          60: '#580825',
        },
        purple: {
          20: '#EAC0FF',
          30: '#D991FD',
          40: '#BF5AF2',
          50: '#8A18C3',
          60: '#550080',
        },
        blue: {
          20: '#A4D1FF',
          30: '#5BADFF',
          40: '#0A84FF',
          50: '#005BB7',
          60: '#013264',
        },
        cyan: {
          20: '#C5F4FF',
          30: '#9AEDFF',
          400: '#1AD6FF',
          500: '#0BAFD2',
          600: '#006980',
        },
        white: '#FFFFFF',
        black: '#000000',
        paper: '#F2F2F2',
        grey: {
          10: '#F2F2F7',
          20: '#E5E5EA',
          30: '#D1D1D6',
          40: '#C7C7CC',
          50: '#AEAEB2',
          60: '#8E8E93',
          70: '#636366',
          80: '#48484A',
          90: '#1C1C1E',
          100: '#0D0D0D',
        },

        steel: {
          'steel-low': '#D0D5E0',
          'steel-high': '#F7F9FF',
        },
        gold: {
          'gold-low': '#BBB29E',
          'gold-high': '#FDF4E0',
        },
        'rose-gold': {
          'rose-gold-low': '#AB8468',
          'rose-gold-high': '#FFD1B6',
        },
        carbon: {
          'carbon-low': '#151516',
          'carbon-high': '#212129',
        },
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      borderColor: (theme: any) => ({
        DEFAULT: theme('colors.grey.300'),
      }),
      border: (theme: any) => ({
        titanium: `var(--materials-titanium, linear-gradient(0deg, #F4EBDD 0%, #B0ABA2 100%))`,
      }),

      fill: (theme: any) => ({
        steel: `var(--materials-steel, linear-gradient(0deg, #EBEBFC 0%, #A2A3AE 100%))`,
      }),

      backgroundImage: (theme: any) => ({
        //vault
        bronze: `var(--materials-bronze, linear-gradient(0deg, #A48A84 0%, #3F2F2C 100%))`,
        iron: `var(--materials-iron, linear-gradient(0deg, #9C99A6 0%, #484950 100%))`,
        steel: `var(--materials-steel, linear-gradient(0deg, #EBEBFC 0%, #A2A3AE 100%))`,
        valadium: `var(--materials-vanadium, linear-gradient(0deg, #2F2F32 0%, #161617 100%))`,
        mithril: `var(--materials-vanadium, linear-gradient(0deg, #2F2F32 0%, #161617 100%))`,
        adomant: `var(--materials-adamant, linear-gradient(0deg, #456857 0%, #1F2924 100%))`,
        gold: `var(--materials-gold, linear-gradient(0deg, #DECAAB 0%, #FBEFDC 100%))`,
        titanium: `var(--materials-titanium, linear-gradient(0deg, #F4EBDD 0%, #B0ABA2 100%))`,
        cobalt: `var(--materials-cobalt, linear-gradient(0deg, #2E2E50 0%, #101323 100%))`,
        //moods
        'mood-green': `var(--moods-green, linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 45.32%), linear-gradient(16deg, #2E504A 11.11%, #101A23 88.89%))`,
        'mood-yellow': `var(--moods-yellow, linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 45.32%), linear-gradient(16deg, #716139 11.11%, #2C1603 88.89%))`,
        'mood-red': `var(--moods-red, linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 45.32%), linear-gradient(16deg, #712C2C 11.11%, #2C0303 88.89%))`,
        'mood-orange': `var(--moods-orange, linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 45.32%), linear-gradient(16deg, #714A39 11.11%, #2C0A03 88.89%, #2C0A03 88.89%))`,
        'mood-pink': `var(--moods-pink, linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 45.32%), linear-gradient(16deg, #51104A 11.11%, #270224 88.89%))`,
        'mood-purple': `var(--moods-purple, linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 45.32%), linear-gradient(16deg, #362A67 11.11%, #1B1023 88.89%))`,
        'mood-blue': `var(--moods-blue, linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 45.32%), linear-gradient(16deg, #25387D 11.11%, #111023 88.89%))`,
        'mood-cyan': `var(--moods-cyan, linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 45.32%), linear-gradient(16deg, #1B446A 11.11%, #102123 88.89%))`,
        //fades
        'fade-green': `var(--fade-green-fade, linear-gradient(0deg, #2E504A 18.23%, rgba(46, 80, 74, 0.00) 100%))`,
        'fade-yellow': `var(--fade-yellow-fade, linear-gradient(0deg, #716139 17.71%, rgba(44, 22, 3, 0.00) 100%))`,
        'fade-orange': `var(--fade-orange-fade, linear-gradient(0deg, #714A39 17.71%, rgba(44, 10, 3, 0.00) 100%))`,
        'fade-red': `var(--fade-red-fade, linear-gradient(0deg, #712C2C 17.71%, rgba(44, 3, 3, 0.00) 100%))`,
        'fade-pink': `var(--fade-pink-fade, linear-gradient(0deg, #51104A 17.71%, rgba(39, 2, 36, 0.00) 100%))`,
        'fade-purple': `var(--fade-purple-fade, linear-gradient(0deg, #362A67 17.71%, rgba(27, 16, 35, 0.00) 100%))`,
        'fade-blue': `var(--fade-blue-fade, linear-gradient(0deg, #25387D 17.71%, rgba(17, 16, 35, 0.00) 100%))`,
        'fade-cyan': `var(--fade-cyan-fade, linear-gradient(0deg, #1B446A 18.23%, rgba(16, 33, 35, 0.00) 100%))`,
      }),

      spacing: {},
      fontFamily: {
        'labels-label-small': 'Inter',
      },
      borderRadius: {
        '9980xl': '9999px',
      },
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      mini: '15px',
      lg: '18px',
      xl: '20px',
      inherit: 'inherit',
    },
    screens: {
      md: {
        max: '960px',
      },
      sm: {
        max: '420px',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
}
