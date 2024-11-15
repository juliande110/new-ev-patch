import { useRef, useEffect, useState } from 'react'
import { Box, Flex, Card } from '../primitives'
import GlobalSearch from './GlobalSearch'
import { useRouter } from 'next/router'
import { useHotkeys } from 'react-hotkeys-hook'
import Link from 'next/link'
import Image from 'next/image'
import { ConnectWalletButton } from 'components/ConnectWalletButton'
import NavItem from './NavItem'
import ThemeSwitcher from './ThemeSwitcher'
import HamburgerMenu from './HamburgerMenu'
import MobileSearch from './MobileSearch'
import { useTheme } from 'next-themes'
import { useMediaQuery } from 'react-responsive'
import { useMarketplaceChain, useMounted } from '../../hooks'
import { useAccount } from 'wagmi'
import CartButton from './CartButton'
import { AccountSidebar } from 'components/navbar/AccountSidebar'
import ChainToggle from 'components/common/ChainToggle'

import * as HoverCard from '@radix-ui/react-hover-card'

export const NAVBAR_HEIGHT = 81
export const NAVBAR_HEIGHT_MOBILE = 77

const Navbar = () => {
  const { theme } = useTheme()
  const { isConnected } = useAccount()
  const isMobile = useMediaQuery({ query: '(max-width: 960px' })
  const isMounted = useMounted()
  const { routePrefix } = useMarketplaceChain()
  const { address } = useAccount()

  let searchRef = useRef<HTMLInputElement>(null)

  const router = useRouter()
  useHotkeys('meta+k', (e) => {
    e.preventDefault()
    if (searchRef?.current) {
      searchRef?.current?.focus()
    }
  })

  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true)
      } else {
        setHasScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isMounted) {
    return null
  }

  return isMobile ? (
    <Flex
      css={{
        height: NAVBAR_HEIGHT_MOBILE,
        px: '$4',
        width: '100%',
        zIndex: 999,
        background: '#000000',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
      }}
      align="center"
      justify="between"
    >
      <Box css={{ flex: 1 }}>
        <Flex align="center">
          <Link href={`/${routePrefix}`}>
            <Box css={{ width: 46, cursor: 'pointer' }}>
              <Image
                src="/emblemIcon.svg"
                width={36}
                height={36}
                alt="Emblem Vault"
              />
            </Box>
          </Link>
        </Flex>
      </Box>
      <Flex align="center" css={{ gap: '$3' }}>
        <MobileSearch key={`${router.asPath}-search`} />
        <CartButton />
        <HamburgerMenu key={`${router.asPath}-hamburger`} />
      </Flex>
    </Flex>
  ) : (
    <Flex
      css={{
        height: NAVBAR_HEIGHT,
        width: '100%',
        mx: 'auto',
        zIndex: 999,
        position: 'fixed',
        background: 'black',
        top: 0,
        left: 0,
        right: 0,
        transition: 'background 0.69s',
      }}
      align="center"
      justify="between"
    >
      <Flex
        css={{
          height: NAVBAR_HEIGHT,
          px: '$4',
          width: '100%',
          maxWidth: '1440px',
          mx: 'auto',
          zIndex: 999,
          position: 'fixed',
          // background: hasScrolled ? '$black' : '$transparent',

          top: 0,
          left: 0,
          right: 0,
          transition: 'background 0.69s',
        }}
        align="center"
        justify="between"
      >
        <Box
          css={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Flex align="center">
            <Link href={`/${routePrefix}`}>
              {/* Logo */}
              <Box
                css={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '$2',
                  alignItems: 'center', // Added to vertically center items
                }}
              >
                <Box
                  css={{
                    display: 'flex',
                    flexDirection: 'row',
                    pr: '60px',
                    gap: '$2',
                    alignItems: 'center', // Added to vertically center items
                  }}
                >
                  <img
                    className="relative w-[32.05px] h-[40px]"
                    alt=""
                    src="/emblemIcon.svg"
                  />
                  <img
                    className="relative w-[137.05px] h-[15.7px]"
                    alt=""
                    src="/EmblemVaultText.svg"
                  />
                </Box>
              </Box>
            </Link>
          </Flex>
        </Box>
        <Box css={{ gap: 2 }}>{/* <ChainToggle /> */}</Box>
        {/* Search Bar */}
        <Box css={{ flex: 1, px: '$5' }}>
          <GlobalSearch
            ref={searchRef}
            placeholder="Search for items"
            containerCss={{ width: '100%' }}
            key={router.asPath}
          />
        </Box>

        <Flex
          css={{
            gap: '$3',
            flex: 'unset',
            '@bp1300': {
              // flex: 1,
            },
          }}
          justify="end"
          align="center"
        >
          <Flex css={{ gap: '$5', mr: 12, alignItems: 'center' }}>
            {' '}
            {/* Added alignItems: 'center' to vertically align items */}
            <Box>
              <Link href={`/${routePrefix}/collections/trending`}>
                <NavItem>Collections</NavItem>
              </Link>
            </Box>
            <Box>
              <Link href={`/apps`}>
                <NavItem>Apps</NavItem>
              </Link>
            </Box>
            {isConnected && <CartButton />}
          </Flex>
          {isConnected ? (
            <AccountSidebar />
          ) : (
            <Box css={{ maxWidth: '185px' }}>
              <ConnectWalletButton />
            </Box>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Navbar
