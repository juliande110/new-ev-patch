import { styled } from 'stitches.config'

export default styled('span', {
  color: '$gray12',
  fontFamily: '$body',
  letterSpacing: 0,

  variants: {
    style: {
      h1: {
        fontFamily: '$nohemi',
        fontWeight: 400,
        fontSize: 48,
        lineHeight: '57.6px',
      },
      h2: {
        fontFamily: '$nohemi',
        fontWeight: 400,
        fontSize: 40,
      },
      h3: {
        fontFamily: '$nohemi',
        fontWeight: 400,
        fontSize: 32,
      },
      h4: {
        fontFamily: '$nohemi',
        fontWeight: 400,
        fontSize: 24,
        lineHeight: '28.8px',
      },
      h5: {
        fontFamily: '$nohemi',
        fontWeight: 400,
        fontSize: 20,
        lineHeight: '20px',
      },
      h6: {
        fontFamily: '$nohemi',
        fontWeight: 400,
        fontSize: 18,
        lineHeight: '18px',
      },
      h7: {
        fontFamily: '$body',
        fontWeight: 700,
        fontSize: 18,
      },
      labelLarge: {
        fontWeight: 500,
        fontSize: 18,
        lineHeight: '18px',
      },
      labelReg: {
        fontWeight: 500,
        fontSize: 15,
        lineHeight: '15px',
      },
      labelSmall: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: '14px',
      },
      labelXSmall: {
        fontWeight: 600,
        fontSize: 12,
        lineHeight: '12px',
      },

      subtitle1: {
        fontWeight: 700,
        fontSize: 16,
      },
      subtitle2: {
        fontWeight: 500,
        fontSize: 14,
      },
      subtitle3: {
        fontWeight: 500,
        fontSize: 15,
      },
      body: {
        fontWeight: 400,
        fontSize: 16,
        lineHeight: '24px',
      },
      body1: {
        fontWeight: 400,
        fontSize: 15,
        lineHeight: '24px',
      },
      body2: {
        fontWeight: 400,
        fontSize: 14,
        lineHeight: '19.6px',
      },
      body3: {
        fontWeight: 400,
        fontSize: 12,
      },
    },
    color: {
      subtle: {
        color: '$gray11',
      },
      error: {
        color: '$red11',
      },
    },
    italic: {
      true: {
        fontStyle: 'italic',
      },
    },
    ellipsify: {
      true: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      },
    },
  },

  defaultVariants: {
    style: 'body1',
  },
})
