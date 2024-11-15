import { CSS, styled } from '@stitches/react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const CheckboxRoot = styled(CheckboxPrimitive.Root, {
  all: 'unset',
  background:
    'var(--Materials-Vanadium, linear-gradient(0deg, #2F2F32 0%, #161617 100%))',
  width: 20,
  height: 20,
  minWidth: 20,
  minHeight: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid var(--Materials-Titanium, #F4EBDD)',
  '&[data-state=checked]': {
    borderColor: 'var(--Materials-Titanium, #F4EBDD)',
    background:
      'var(--Materials-Vanadium, linear-gradient(0deg, #2F2F32 0%, #161617 100%))',
  },
})

const CheckboxIndicator = styled(CheckboxPrimitive.Indicator, {
  color: 'white',
})

const Checkbox = (props?: CheckboxPrimitive.CheckboxProps) => (
  <CheckboxRoot {...props}>
    <CheckboxIndicator>
      <FontAwesomeIcon icon={faCheck} />
    </CheckboxIndicator>
  </CheckboxRoot>
)

export default Checkbox
