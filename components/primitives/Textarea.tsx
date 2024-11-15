import { styled } from 'stitches.config'
import Flex from 'components/primitives/Flex'
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  ReactNode,
} from 'react'
import { CSS } from '@stitches/react'

const StyledtexTarea = styled('textarea', {
  all: 'unset',
  width: '100%',
  px: 16,
  py: 12,
  borderRadius: 0,
  fontFamily: '$body',
  fontSize: 14,
  color: '$gray12',
  backgroundColor: 'black',
  border: '1px solid $gray4',
  $$focusColor: '$colors$primary8',
  '&::placeholder': { color: '$gray10' },
  '&:focus': {
    border: '1px solid var(--Materials-Steel, #EBEBFC)',
    background:
      'var(--Materials-Vanadium, linear-gradient(0deg, #2F2F32 0%, #161617 100%))',
  },
  '&:disabled': {
    backgroundColor: '$gray2',
    color: '$gray9',
  },

  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },
})

const Textarea = forwardRef<
  ElementRef<typeof StyledtexTarea>,
  ComponentPropsWithoutRef<typeof StyledtexTarea> & {
    icon?: ReactNode
    containerCss?: CSS
    rows?: number
  }
>(({ children, icon, containerCss, rows, ...props }, forwardedRef) => (
  <Flex css={{ ...containerCss, position: 'relative' }}>
    {icon && (
      <div style={{ position: 'absolute', top: 16, left: 16 }}>{icon}</div>
    )}
    <StyledtexTarea
      rows={rows}
      css={{ pl: icon ? 48 : 16 }}
      ref={forwardedRef}
      {...props}
    />
  </Flex>
))

export default Textarea
