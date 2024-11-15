import { Text } from 'components/primitives'
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react'

type NavItemProps = {
  children: ReactNode
}

const NavItem = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<typeof Text> & NavItemProps
>(({ children, ...props }, forwardedRef) => (
  <Text
    {...props}
    ref={forwardedRef}
    css={{
      color: '$gray12',
      cursor: 'pointer',
      fontWeight: 500,
      background: 'linear-gradient(0deg, #F4EBDD 0%, #B0ABA2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      padding: '0.2em 0.4em',
      '&:hover': {
        color: 'white',
      },
      ...props.css,
    }}
    style="labelReg"
  >
    {children}
  </Text>
))

export default NavItem
