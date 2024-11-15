import { Anchor, Box, Button, Flex, Text } from 'components/primitives'
import { Avatar } from 'components/primitives/Avatar'
import * as RadixDialog from '@radix-ui/react-dialog'
import {
  faBars,
  faXmark,
  faRightFromBracket,
  faPodcast,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faDiscord,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'
import Image from 'next/image'
import { useAccount, useDisconnect } from 'wagmi'
import { ConnectWalletButton } from 'components/ConnectWalletButton'
import { FullscreenModal } from 'components/common/FullscreenModal'
import { useENSResolver, useMarketplaceChain } from 'hooks'
import Wallet from 'components/navbar/Wallet'
import Img from 'components/primitives/Img'

const HamburgerMenu = () => {
  const { address, isConnected } = useAccount()
  const {
    avatar: ensAvatar,
    shortAddress,
    shortName: shortEnsName,
  } = useENSResolver(address)
  const { disconnect } = useDisconnect()
  const { routePrefix } = useMarketplaceChain()

  const trigger = (
    <Button
      css={{ justifyContent: 'center', width: '44px', height: '44px' }}
      type="button"
      size="small"
    >
      <FontAwesomeIcon icon={faBars} width={16} height={16} />
    </Button>
  )

  return (
    <FullscreenModal trigger={trigger}>
      {' '}
      <Flex
        css={{
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Flex
          css={{
            py: '$4',
            px: '$4',
            width: '100%',
            borderBottom: '1px solid $gray1',
          }}
          align="center"
          justify="between"
        >
          <Link href="/">
            <Box css={{ width: 46, cursor: 'pointer' }}>
              <Image
                src="/emblemIcon.svg"
                width={36}
                height={36}
                alt="Reservoir"
              />
            </Box>
          </Link>
          <RadixDialog.Close>
            <Flex
              css={{
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                alignItems: 'center',
                backgroundColor: 'black',
                border: '1px solid #EBEBFC',
                color: '$gray12',
                '&:hover': {
                  backgroundColor: '$gray4',
                },
              }}
            >
              <FontAwesomeIcon icon={faXmark} width={16} height={16} />
            </Flex>
          </RadixDialog.Close>
        </Flex>
        {isConnected ? (
          <Flex
            css={{
              flexDirection: 'column',
              justifyContent: 'flex-start',
              height: '100%',
              py: '$5',
              px: '$4',
            }}
          >
            <Link href={`/portfolio/${address || ''}`} legacyBehavior>
              <Flex
                css={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  pb: '$4',
                }}
              >
                <Flex css={{ alignItems: 'center' }}>
                  {ensAvatar ? (
                    <Avatar size="medium" src={ensAvatar} />
                  ) : (
                    <img
                      src="/SteelVault.png"
                      alt="cart"
                      style={{
                        height: '40px',
                        width: '34.635px',
                      }}
                    />
                  )}
                  <Text style="subtitle1" css={{ ml: '$2' }}>
                    {shortEnsName ? shortEnsName : shortAddress}
                  </Text>
                </Flex>
              </Flex>
            </Link>
            <Flex direction="column">
              <Link href={`/apps`} legacyBehavior>
                <Text
                  style="subtitle1"
                  css={{
                    borderBottom: '1px solid $gray4',
                    cursor: 'pointer',
                    pb: '$4',
                    pt: '24px',
                    width: '100%',
                  }}
                >
                  Apps
                </Text>
              </Link>
              <Link href="/portfolio" legacyBehavior>
                <Flex
                  direction="column"
                  css={{
                    alignContent: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid $gray4',
                    cursor: 'pointer',
                    pb: '$4',
                    pt: '24px',
                    gap: '$1',
                  }}
                >
                  <Text style="h6">Portfolio</Text>
                  <Box
                    css={{
                      pb: '$4',
                      pt: '24px',
                    }}
                  >
                    <Text style="labelReg" color="subtle">
                      Manage your items, collections, listings and offers
                    </Text>
                  </Box>
                </Flex>
              </Link>
            </Flex>
            <Wallet />
            <Flex
              css={{
                justifyContent: 'space-between',
                cursor: 'pointer',
                alignItems: 'center',
                borderBottom: '1px solid $gray4',
              }}
              onClick={() => disconnect()}
            >
              <Text
                style="subtitle1"
                css={{
                  pb: '$4',
                  pt: '24px',
                }}
              >
                Logout
              </Text>
              <Box css={{ color: '$gray10' }}>
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  width={16}
                  height={16}
                />
              </Box>
            </Flex>
          </Flex>
        ) : (
          <Flex
            direction="column"
            justify="between"
            css={{
              height: '100%',
              pb: '$5',
              px: '$4',
            }}
          >
            <Flex direction="column">
              <Link href="/ethereum/collections/trending" legacyBehavior>
                <Text
                  style="subtitle1"
                  css={{
                    borderBottom: '1px solid $gray4',
                    cursor: 'pointer',
                    pb: '$4',
                    pt: '24px',
                    width: '100%',
                  }}
                >
                  Collections
                </Text>
              </Link>
              <Link href={`/apps`} legacyBehavior>
                <Text
                  style="subtitle1"
                  css={{
                    borderBottom: '1px solid $gray4',
                    cursor: 'pointer',
                    pb: '$4',
                    pt: '24px',
                    width: '100%',
                  }}
                >
                  Apps
                </Text>
              </Link>
            </Flex>
            <Box>
              <ConnectWalletButton />
            </Box>
          </Flex>
        )}
        <Flex
          css={{
            pt: '24px',
            pb: '$5',
            px: '$4',
            gap: '$4',
            width: '100%',
            borderTop: '1px solid $gray4',
          }}
        >
          {/* NEED TO DO Need to add icons */}
          <a href="https://twitter.com/emblemvault" target="_blank">
            <Button
              css={{ justifyContent: 'center', width: '44px', height: '44px' }}
              type="button"
              size="small"
              color="gray3"
            >
              <FontAwesomeIcon icon={faTwitter} width={20} height={20} />
            </Button>
          </a>
          <a href="https://discord.com/invite/N6sj6f8WNU" target="_blank">
            <Button
              css={{ justifyContent: 'center', width: '44px', height: '44px' }}
              type="button"
              size="small"
              color="gray3"
            >
              <FontAwesomeIcon icon={faDiscord} width={20} height={20} />
            </Button>
          </a>
          <a href="https://www.youtube.com/@emblemvault" target="_blank">
            <Button
              css={{ justifyContent: 'center', width: '44px', height: '44px' }}
              type="button"
              size="small"
              color="gray3"
            >
              <FontAwesomeIcon icon={faYoutube} width={20} height={20} />
            </Button>
          </a>
          <a href="https://emblem-vault.medium.com/" target="_blank">
            <Button
              css={{ justifyContent: 'center', width: '44px', height: '44px' }}
              type="button"
              size="small"
              color="gray3"
            >
              <Img
                src="/icons/social/medium.svg"
                width={20}
                height={20}
                alt="medium icon"
              />
            </Button>
          </a>{' '}
          <a
            href="https://podcasters.spotify.com/pod/show/thevaultpod/"
            target="_blank"
          >
            <Button
              css={{ justifyContent: 'center', width: '44px', height: '44px' }}
              type="button"
              size="small"
              color="gray3"
            >
              <FontAwesomeIcon icon={faPodcast} width={20} height={20} />
            </Button>
          </a>
        </Flex>
      </Flex>
    </FullscreenModal>
  )
}

export default HamburgerMenu
