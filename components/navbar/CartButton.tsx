import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { CartPopover, useCart } from '@reservoir0x/reservoir-kit-ui'
import { Flex, Button, Text } from 'components/primitives'

const CartButton = () => {
  const { data: cartItems } = useCart((cart) => cart.items)
  const { openConnectModal } = useConnectModal()

  return (
    <CartPopover
      onConnectWallet={() => {
        openConnectModal?.()
      }}
      trigger={
        <Button
          css={{
            justifyContent: 'center',
            width: '',
            height: '',
            position: 'relative',
            background: 'transparent',
            border: 'none',
            '&:hover': {
              background: 'black',
            },
          }}
          size="none"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1 3H4.5V18H17.677L22.477 6H6.5V1H1V3ZM4.5 20.2496H5.5H6.25043H7.25043V21.2496V22V23H6.25043H5.5H4.5V22V21.2496V20.2496ZM11.5 20.2496H10.5V21.2496V22V23H11.5H12.2504H13.2504V22V21.2496V20.2496H12.2504H11.5Z"
              fill="url(#paint0_linear_216_17112)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_216_17112"
                x1="11.7385"
                y1="23"
                x2="11.7385"
                y2="0.999999"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#F4EBDD" />
                <stop offset="1" stopColor="#B0ABA2" />
              </linearGradient>
            </defs>
          </svg>

          {cartItems.length > 0 && (
            <Flex
              align="center"
              justify="center"
              css={{
                borderRadius: '99999px',
                width: 20,
                height: 20,
                backgroundColor: 'hsl(206, 6.0%, 43.9%)',
                position: 'absolute',
                top: -8,
                right: -6,
              }}
            >
              <Text style="subtitle3" css={{ color: 'white' }}>
                {cartItems.length}
              </Text>
            </Flex>
          )}
        </Button>
      }
    />
  )
}

export default CartButton
