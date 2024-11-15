import {
  Root as ToggleGroupRoot,
  Item as ToggleGroupItem,
} from '@radix-ui/react-toggle-group'
import { styled } from 'stitches.config'

const StyledToggleGroupRoot = styled(ToggleGroupRoot, {
  overflow: 'hidden',
  display: 'flex',
  gap: 8,
})

const StyledToggleGroupItem = styled(ToggleGroupItem, {
  border: '1px solid var(--Materials-Iron, #9C99A6)',
  background:
    'var(--Materials-Vanadium, linear-gradient(0deg, #2F2F32 0%, #161617 100%))',
  color: '$gray12',
  p: '$3',
  '&[data-state=on]': {
    border: '1px solid var(--Materials-Titanium, #F4EBDD)',
    background:
      'var(--Materials-Vanadium, linear-gradient(0deg, #2F2F32 0%, #161617 100%))',
  },
})

export {
  StyledToggleGroupRoot as ToggleGroup,
  StyledToggleGroupItem as ToggleGroupItem,
  StyledToggleGroupRoot as ToggleGroupRoot,
}
