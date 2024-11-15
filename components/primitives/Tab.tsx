import * as TabsPrimitive from '@radix-ui/react-tabs'
import { styled } from 'stitches.config'

const TabsList = styled(TabsPrimitive.List, {
  display: 'flex',
  gap: '40px',
  borderBottom: '',
  mt: '$5',
  mb: '$4',
})

const TabsTrigger = styled(TabsPrimitive.Trigger, {
  fontWeight: '700',
  '&[data-state="active"]': {
    background:
      'var(--Materials-Titanium, linear-gradient(0deg, #F4EBDD 0%, #B0ABA2 100%))',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  '&:hover': {
    background:
      'var(--Materials-Titanium, linear-gradient(0deg, #F4EBDD 0%, #B0ABA2 100%))',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
})

const TabsContent = styled(TabsPrimitive.Content, {})

export { TabsList, TabsTrigger, TabsContent }
