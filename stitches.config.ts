import {
  crimson,
  slate,
  crimsonDark,
  violetDark,
  slateDark,
  greenDark,
  iris,
  irisDark,
  gray,
  green,
  violetDarkA,
  whiteA,
  redDark,
  red,
  blackA,
  violet,
  violetA,
  indigo,
} from '@radix-ui/colors'
import { createStitches } from '@stitches/react'
import type * as Stitches from '@stitches/react'
import { reset } from 'utils/css/reset'
import { Inter } from 'next/font/google'
import tw from 'twin.macro'
import { Nohemi } from 'styles/fonts'

const inter = Inter({
  subsets: ['latin'],
})

const nohemi = Nohemi

// CONFIGURABLE: Here you can update all your theming (outside of ReservoirKit which can be configured in the app.tsx)
// The theme colors are all already hooked up to stitches scales, so you just need to swap them.
// Don't forget to check the dark mode themes below.
// More on Stitches theme tokens: https://stitches.dev/docs/tokens
// More on Radix color scales: https://www.radix-ui.com/docs/colors/palette-composition/the-scales

export const { createTheme, keyframes, styled, globalCss, getCssText } =
  createStitches({
    theme: {
      colors: {
        ...gray,
        ...crimson,
        ...violet,
        ...violetA,
        ...slate,
        ...red,
        ...whiteA,
        ...blackA,
        ...iris,
        ...green,
        ...indigo,

        greycool: '#2F2F32',
        mithrilSteel: '#EBEBFC',

        green20: '#C9FFD1',
        green30: '#55ED6C',
        green40: '#32D74B',
        green50: '#008A15',
        green60: '#00570D',
        yellow20: '#FFF3B5',
        yellow30: '#FFDF41',
        yellow40: '#FFD60A',
        yellow50: '#CBA900',
        yellow60: '#766200',
        orange20: '#FFDDA9',
        orange30: '#FFB543',
        orange40: '#FF9F0A',
        orange50: '#C97A00',
        orange60: '#714400',
        red20: '#FFBDB9',
        red30: '#FF5D54',
        red40: '#FF453A',
        red50: '#B6251D',
        red60: '#680600',
        pink20: '#FFB6EA',
        pink30: '#FF7EDB',
        pink40: '#F02A5A',
        pink50: '#951342',
        pink60: '#580825',
        purple20: '#EAC0FF',
        purple30: '#D991FD',
        purple40: '#BF5AF2',
        purple50: '#8A18C3',
        purple60: '#550080',
        blue20: '#A4D1FF',
        blue30: '#5BADFF',
        blue40: '#0A84FF',
        blue50: '#005BB7',
        blue60: '#013264',
        cyan20: '#C5F4FF',
        cyan30: '#9AEDFF',
        cyan400: '#1AD6FF',
        cyan500: '#0BAFD2',
        cyan600: '#006980',
        white: '#FFFFFF',
        black: '#000000',
        paper: '#F2F2F2',

        //Aliases
        primary1: '$iris1',
        primary2: '$iris2',
        primary3: '$iris3',
        primary4: '$iris4',
        primary5: '$iris5',
        primary6: '$iris6',
        primary7: '$iris7',
        primary8: '$iris8',
        primary9: '$iris9',
        primary10: '$iris10',
        primary11: '#FFFFFF',
        primary12: '$iris12',

        //Secondary
        secondary1: '$violetA1',
        secondary2: '$violetA2',
        secondary3: '$violetA3',
        secondary4: '$violetA4',
        secondary5: '$violetA5',
        secondary6: '$violetA6',
        secondary7: '$violetA7',
        secondary8: '$violetA8',
        secondary9: '$violetA9',
        secondary10: '$violetA10',
        secondary11: '$violetA11',
        secondary12: '$violetA12',

        pupleFade:
          'linear-gradient(0deg, #362A67 17.71%, rgba(27, 16, 35, 0.00) 100%)',
        bronze: 'linear-gradient(0deg, #A48A84 0%, #3F2F2C 100%)',
        iron: 'linear-gradient(0deg, #9C99A6 0%, #484950 100%)',
        mithril: '#F4EBDD',
        vanadiumMaterial: '#2F2F32',
        vanadium: 'linear-gradient(0deg, #2F2F32 0%, #161617 100%)',
        titanium: 'linear-gradient(0deg, #F4EBDD 0%, #B0ABA2 100%)',
        //Gray
        gray1: '#F2F2F7',
        gray2: '#E5E5EA',
        gray3: '#D1D1D6',
        gray4: '#C7C7CC',
        gray5: '#AEAEB2',
        gray6: '#8E8E93',
        gray7: '#636366',
        gray8: '#48484A',
        gray9: '#1C1C1E',
        gray10: '#0D0D0D',
        gray11: '#0D0D0D',
        gray12: '$slate12',

        grey10: '#F2F2F7',
        grey20: '#E5E5EA',
        grey30: '#D1D1D6',
        grey40: '#C7C7CC',
        grey50: '#AEAEB2',
        grey60: '#8E8E93',
        grey70: '#636366',
        grey80: '#48484A',
        grey90: '#1C1C1E',
        grey100: '#0D0D0D',

        //Red
        red1: '$crimson1',
        red2: '$crimson2',
        red3: '$crimson3',
        red4: '$crimson4',
        red5: '$crimson5',
        red6: '$crimson6',
        red7: '$crimson7',
        red8: '$crimson8',
        red9: '$crimson9',
        red10: '$crimson10',
        red11: '$crimson11',
        red12: '$crimson12',

        neutralBg: '#000000',
        neutralBgSubtle: '#000000',
        panelShadow: 'rgba(0,0,0,0.1)',
        panelBg: '#000000',
        panelBorder: 'transparent',
        dropdownBg: '#000000',
        sidebarOverlay: '#000000',
      },
      gradients: {
        bronze: 'linear-gradient(0deg, #A48A84 0%, #3F2F2C 100%)',
        iron: 'linear-gradient(0deg, #9C99A6 0%, #484950 100%)',
        steel:
          'var(--materials-steel, linear-gradient(0deg, #EBEBFC 0%, #A2A3AE 100%))',
        valadium:
          'var(--materials-vanadium, linear-gradient(0deg, #2F2F32 0%, #161617 100%))',
        // mithril:
        //   'var(--materials-vanadium, linear-gradient(0deg, #2F2F32 0%, #161617 100%))',
        adomant:
          'var(--materials-adamant, linear-gradient(0deg, #456857 0%, #1F2924 100%))',
        gold: 'var(--materials-gold, linear-gradient(0deg, #DECAAB 0%, #FBEFDC 100%))',
        cobalt:
          'var(--materials-cobalt, linear-gradient(0deg, #2E2E50 0%, #101323 100%))',
        moodgreen:
          'var(--moods-green, linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 45.32%), linear-gradient(16deg, #2E504A 11.11%, #101A23 88.89%))',
        'mood-yellow':
          'var(--moods-yellow, linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 45.32%), linear-gradient(16deg, #716139 11.11%, #2C1603 88.89%))',
        'mood-red':
          'var(--moods-red, linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 45.32%), linear-gradient(16deg, #712C2C 11.11%, #2C0303 88.89%))',
        'mood-orange':
          'var(--moods-orange, linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 45.32%), linear-gradient(16deg, #714A39 11.11%, #2C0A03 88.89%, #2C0A03 88.89%))',
        'mood-pink':
          'var(--moods-pink, linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 45.32%), linear-gradient(16deg, #51104A 11.11%, #270224 88.89%))',
        'mood-purple':
          'var(--moods-purple, linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 45.32%), linear-gradient(16deg, #362A67 11.11%, #1B1023 88.89%))',
        'mood-blue':
          'var(--moods-blue, linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 45.32%), linear-gradient(16deg, #25387D 11.11%, #111023 88.89%))',
        'mood-cyan':
          'var(--moods-cyan, linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 45.32%), linear-gradient(16deg, #1B446A 11.11%, #102123 88.89%))',
        'fade-green':
          'var(--fade-green-fade, linear-gradient(0deg, #2E504A 18.23%, rgba(46, 80, 74, 0.00) 100%))',
        'fade-yellow':
          'var(--fade-yellow-fade, linear-gradient(0deg, #716139 17.71%, rgba(44, 22, 3, 0.00) 100%))',
        'fade-orange':
          'var(--fade-orange-fade, linear-gradient(0deg, #714A39 17.71%, rgba(44, 10, 3, 0.00) 100%))',
        'fade-red':
          'var(--fade-red-fade, linear-gradient(0deg, #712C2C 17.71%, rgba(44, 3, 3, 0.00) 100%))',
        'fade-pink':
          'var(--fade-pink-fade, linear-gradient(0deg, #51104A 17.71%, rgba(39, 2, 36, 0.00) 100%))',
        'fade-purple':
          'var(--fade-purple-fade, linear-gradient(0deg, #362A67 17.71%, rgba(27, 16, 35, 0.00) 100%))',
        'fade-blue':
          'var(--fade-blue-fade, linear-gradient(0deg, #25387D 17.71%, rgba(17, 16, 35, 0.00) 100%))',
        'fade-cyan':
          'var(--fade-cyan-fade, linear-gradient(0deg, #1B446A 18.23%, rgba(16, 33, 35, 0.00) 100%))',
      },
      space: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '32px',
        6: '64px',
      },
      fontSizes: {},
      fontWeights: {},
      fonts: {
        nohemi: nohemi.style.fontFamily,
        body: inter.style.fontFamily,
        button: '$body',
      },

      lineHeights: {},
      letterSpacings: {},
      sizes: {},
      radii: {},
      shadows: {},
      transitions: {},
      breakpoints: {
        sm: 100,
      },
    },
    utils: {
      // MARGIN
      m: (value: Stitches.PropertyValue<'margin'>) => ({
        margin: value,
      }),
      mx: (value: Stitches.PropertyValue<'margin'>) => ({
        marginLeft: value,
        marginRight: value,
      }),
      my: (value: Stitches.PropertyValue<'margin'>) => ({
        marginTop: value,
        marginBottom: value,
      }),
      mt: (value: Stitches.PropertyValue<'margin'>) => ({
        marginTop: value,
      }),
      mb: (value: Stitches.PropertyValue<'margin'>) => ({
        marginBottom: value,
      }),
      ml: (value: Stitches.PropertyValue<'margin'>) => ({
        marginLeft: value,
      }),
      mr: (value: Stitches.PropertyValue<'margin'>) => ({
        marginRight: value,
      }),

      // PADDING
      p: (value: Stitches.PropertyValue<'padding'>) => ({
        padding: value,
      }),
      px: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingLeft: value,
        paddingRight: value,
      }),
      py: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingTop: value,
        paddingBottom: value,
      }),
      pt: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingTop: value,
      }),
      pb: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingBottom: value,
      }),
      pl: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingLeft: value,
      }),
      pr: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingRight: value,
      }),
      // DIMENSIONS
      w: (value: Stitches.PropertyValue<'width'>) => ({
        width: value,
      }),
      h: (value: Stitches.PropertyValue<'height'>) => ({
        height: value,
      }),
      size: (value: Stitches.PropertyValue<'width'>) => ({
        width: value,
        height: value,
      }),
      // GRID
      colSpan: (value: number | 'full') => {
        if (value === 'full') {
          return {
            gridColumn: '1 / -1',
          }
        }
        return {
          gridColumn: `span ${value} / span ${value}`,
        }
      },
    },
    media: {
      sm: '(min-width: 600px)',
      md: '(min-width: 900px)',
      lg: '(min-width: 1200px)',
      xl: '(min-width: 1820px)',
      bp300: '(min-width: 300px)',
      bp400: '(min-width: 400px)',
      bp500: '(min-width: 500px)',
      bp600: '(min-width: 600px)',
      bp700: '(min-width: 700px)',
      bp800: '(min-width: 800px)',
      bp900: '(min-width: 900px)',
      bp1000: '(min-width: 1000px)',
      bp1100: '(min-width: 1100px)',
      bp1200: '(min-width: 1200px)',
      bp1300: '(min-width: 1300px)',
      bp1400: '(min-width: 1400px)',
      bp1500: '(min-width: 1500px)',
      motion: '(prefers-reduced-motion)',
      hover: '(any-hover: hover)',
      dark: '(prefers-color-scheme: dark)',
      light: '(prefers-color-scheme: light)',
    },
  })

export const globalReset = globalCss(reset)

export const darkTheme = createTheme({
  colors: {
    ...crimsonDark,
    ...violetDark,
    ...violetDarkA,
    ...slateDark,
    ...greenDark,
    ...irisDark,
    ...whiteA,
    ...redDark,
    ...blackA,

    //Aliases

    //Primary
    primary1: '$iris1',
    primary2: '$iris2',
    primary3: '$iris3',
    primary4: '$iris4',
    primary5: '$iris5',
    primary6: '$iris6',
    primary7: '$iris7',
    primary8: '$iris8',
    primary9: '$mithrilSteel',
    primary10: '$mithrilSteel',
    primary11: '#FFFFFF',
    primary12: '$iris12',

    //Secondary
    secondary1: '$violetA1',
    secondary2: '$violetA2',
    secondary3: '$violetA3',
    secondary4: '$violetA4',
    secondary5: '$violetA5',
    secondary6: '$violetA6',
    secondary7: '$violetA7',
    secondary8: '$violetA8',
    secondary9: '$violetA9',
    secondary10: '$violetA10',
    secondary11: '$violetA11',
    secondary12: '$violetA12',

    green20: '#C9FFD1',
    green30: '#55ED6C',
    green40: '#32D74B',
    green50: '#008A15',
    green60: '#00570D',
    yellow20: '#FFF3B5',
    yellow30: '#FFDF41',
    yellow40: '#FFD60A',
    yellow50: '#CBA900',
    yellow60: '#766200',
    orange20: '#FFDDA9',
    orange30: '#FFB543',
    orange40: '#FF9F0A',
    orange50: '#C97A00',
    orange60: '#714400',
    red20: '#FFBDB9',
    red30: '#FF5D54',
    red40: '#FF453A',
    red50: '#B6251D',
    red60: '#680600',
    pink20: '#FFB6EA',
    pink30: '#FF7EDB',
    pink40: '#F02A5A',
    pink50: '#951342',
    pink60: '#580825',
    purple20: '#EAC0FF',
    purple30: '#D991FD',
    purple40: '#BF5AF2',
    purple50: '#8A18C3',
    purple60: '#550080',
    blue20: '#A4D1FF',
    blue30: '#5BADFF',
    blue40: '#0A84FF',
    blue50: '#005BB7',
    blue60: '#013264',
    cyan20: '#C5F4FF',
    cyan30: '#9AEDFF',
    cyan400: '#1AD6FF',
    cyan500: '#0BAFD2',
    cyan600: '#006980',
    white: '#FFFFFF',
    black: '#000000',
    paper: '#F2F2F2',

    //Gray
    gray1: '$slate1',
    gray2: '$slate2',
    gray3: '$slate3',
    gray4: '$slate4',
    gray5: '$slate5',
    gray6: '$slate6',
    gray7: '$slate7',
    gray8: '$slate8',
    gray9: '$slate9',
    gray10: '$slate10',
    gray11: '$slate11',
    gray12: '$slate12',

    accent: '#7000FF',

    backgroundColor: '#000000',

    neutralBgSubtle: '#000000',
    neutralBg: '#000000',

    panelBg: '#000000',
    panelBorder: '#000000',
    panelShadow: 'transparent',
    dropdownBg: '#000000',
    sidebarOverlay: '#000000',
  },
})
