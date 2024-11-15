import { styled } from '@stitches/react'
import * as SwitchPrimitive from '@radix-ui/react-switch'

// NEED TO DO
// NEED TO STYLE

const StyledSwitch = styled(SwitchPrimitive.Root, {
  all: 'unset',
  width: 46,
  height: 24,
  border: '1px solid var(--Materials-Iron, #2F2F32)',
  background:
    'var(--Materials-Vanadium, linear-gradient(0deg, #2F2F32 0%, #161617 100%))',
  position: 'relative',
  transition: 'background-color 250ms linear',
  $$focusColor: '$colors$gray12',
  '&[data-state="checked"]': {
    backgroundColor: '$primary9',
    border: '1px solid var(--Materials-Iron, #EBEBFC)',
    background:
      'var(--Materials-Vanadium, linear-gradient(0deg, #2F2F32 0%, #161617 100%))',
  },
  '&:focus-visible': {
    boxShadow: '0 0 0 2px $$focusColor',
  },
})

const Thumb = styled(SwitchPrimitive.Thumb, {
  display: 'block',
  width: 20,
  height: 20,
  background:
    'var(--Materials-Titanium, linear-gradient(0deg, #F4EBDD 0%, #B0ABA2 100%))',
  transition: 'transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  transform: 'translateX(4px)',
  willChange: 'transform',
  $$borderColor: '$colors$gray7',
  boxShadow: '0 0 0 1px $$borderColor',
  '&[data-state="checked"]': { transform: 'translateX(22px)' },
})

const Switch = (props?: SwitchPrimitive.SwitchProps) => (
  <StyledSwitch {...props}>
    <Thumb />
  </StyledSwitch>
)

export default Switch
