import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  extractMediaType,
  TokenMedia,
  useDynamicTokens,
} from '@reservoir0x/reservoir-kit-ui'
import AddToCart from 'components/buttons/AddToCart'
import BuyNow from 'components/buttons/BuyNow'
import { Box, Flex, FormatCryptoCurrency, Text } from 'components/primitives'
import { ToastContext } from 'context/ToastContextProvider'
import { useMarketplaceChain } from 'hooks'
import Link from 'next/link'
import { SyntheticEvent, useContext } from 'react'
import { MutatorCallback } from 'swr'
import { formatNumber } from 'utils/numbers'
import { Address } from 'wagmi'

type TokenCardProps = {
  token: ReturnType<typeof useDynamicTokens>['data'][0]
  address?: Address
  rarityEnabled: boolean
  addToCartEnabled?: boolean
  showSource?: boolean
  showAsk?: boolean
  mutate?: MutatorCallback
  onMediaPlayed?: (
    e: SyntheticEvent<HTMLAudioElement | HTMLVideoElement, Event>
  ) => void
  tokenCount?: string
}

export default ({
  token,
  address,
  rarityEnabled = true,
  addToCartEnabled = true,
  showAsk = true,
  mutate,
  onMediaPlayed,
  tokenCount,
  showSource = true,
}: TokenCardProps) => {
  const { addToast } = useContext(ToastContext)
  const mediaType = extractMediaType(token?.token?.media)
  const showMedia =
    mediaType === 'mp4' ||
    mediaType === 'mp3' ||
    mediaType === 'm4a' ||
    mediaType === 'wav' ||
    mediaType === 'mov'
  const { routePrefix, proxyApi } = useMarketplaceChain()
  const tokenIsInCart = token && token?.isInCart
  const isOwner = token?.token?.owner?.toLowerCase() !== address?.toLowerCase()

  const is1155 = token?.token?.kind === 'erc1155'

  return (
    <Box
      css={{
        borderRadius: 0,
        overflow: 'hidden',
        background: '$neutralBgSubtle',
        $$shadowColor: '$colors$panelShadow',
        boxShadow: '0 8px 12px 0px $$shadowColor',
        position: 'relative',
        '&:hover > a > div > img': {
          transform: 'scale(1.1)',
        },
        '@sm': {
          '&:hover .token-button-container': {
            bottom: 0,
          },
        },
      }}
    >
      {tokenCount && (
        <Flex
          justify="center"
          align="center"
          css={{
            borderRadius: 0,
            px: '$2',
            py: '$1',
            mr: '$2',
            position: 'absolute',
            left: '$2',
            top: '$2',
            zIndex: 1,
            maxWidth: '50%',
            backgroundColor: 'rgba(	38, 41, 43, 0.3)',
          }}
        >
          <Text
            css={{
              color: '$whiteA12',
            }}
            ellipsify
          >
            x{tokenCount}
          </Text>
        </Flex>
      )}

      {is1155 && token?.token?.supply && (
        <Flex
          justify="center"
          align="center"
          css={{
            borderRadius: 0,
            px: '$2',
            py: '$1',
            mr: '$2',
            position: 'absolute',
            left: '$2',
            top: '$2',
            zIndex: 1,
            maxWidth: '50%',
            backgroundColor: 'rgba(	38, 41, 43, 0.3)',
            backdropFilter: 'blur(2px)',
          }}
        >
          <Text
            css={{
              color: '$whiteA12',
            }}
            ellipsify
          >
            x{formatNumber(token?.token?.supply, 0, true)}
          </Text>
        </Flex>
      )}
      <Flex
        justify="center"
        align="center"
        css={{
          borderRadius: '0px',
          width: 48,
          height: 48,
          backgroundColor: 'hsl(206, 6.0%, 43.9%)',
          position: 'absolute',
          right: '$2',
          zIndex: 1,
          transition: `visibility 0s linear ${
            tokenIsInCart ? '' : '250ms'
          }, opacity 250ms ease-in-out, top 250ms ease-in-out`,
          opacity: tokenIsInCart ? 1 : 0,
          top: tokenIsInCart ? '$2' : 50,
          visibility: tokenIsInCart ? 'visible' : 'hidden',
          color: 'white',
        }}
      >
        <FontAwesomeIcon icon={faCheck} width={20} height={20} />
      </Flex>
      <Link
        passHref
        href={`/${routePrefix}/asset/${token?.token?.contract}:${token?.token?.tokenId}`}
      >
        <Box
          css={{
            background: '$gray3',
            overflow: 'hidden',
            border: '6px solid #EBEBFC',
          }}
        >
          <TokenMedia
            token={token?.token}
            style={{
              width: '100%',
              transition: 'transform .3s ease-in-out',
              maxHeight: 720,
              height: '100%',
              borderRadius: 0,
              aspectRatio: '1/1',
            }}
            staticOnly={!showMedia}
            imageResolution={'medium'}
            audioOptions={{
              onPlay: (e) => {
                onMediaPlayed?.(e)
              },
            }}
            videoOptions={{
              onPlay: (e) => {
                onMediaPlayed?.(e)
              },
            }}
            onRefreshToken={() => {
              mutate?.()
              addToast?.({
                title: 'Refresh Metadata',
                description: 'Request to refresh this token was accepted.',
              })
            }}
          />
        </Box>
      </Link>
      <Link
        href={`/${routePrefix}/asset/${token?.token?.contract}:${token?.token?.tokenId}`}
      >
        <Flex
          css={{
            border: '4px solid #2F2F32',
            background: '$gray100',
            p: '$4',
            minHeight: showAsk ? 132 : 0,
            cursor: 'pointer',
          }}
          direction="column"
        >
          <Flex css={{ mb: '$2' }} align="center" justify="between">
            <Flex direction="column" css={{ gap: '$1', minWidth: 0 }}>
              <Text
                style="h6"
                as="p"
                ellipsify
                css={{
                  pr: '$1',
                  textTransform: 'capitalize',
                }}
              >
                {token?.token?.name?.split('|')[0]?.toLowerCase() ||
                  ('#' + token?.token?.tokenId).toLowerCase()}
              </Text>
              <Text
                color="subtle"
                style="labelSmall"
                as="p"
                ellipsify
                css={{
                  decoration: 'none',
                  color: '$gray7',
                  fontWeight: 600,
                  pr: '$1',
                }}
              >
                {token?.token?.name?.split('|')[1] ||
                  '#' + token?.token?.tokenId}
              </Text>
            </Flex>
            {rarityEnabled && !is1155 && token?.token?.rarityRank && (
              <Box
                css={{
                  px: '$1',
                  py: 2,
                  background: '$gray3',
                  borderRadius: 8,
                  minWidth: 'max-content',
                }}
              >
                {/* <Flex align="center" css={{ gap: 5 }}>
                  <img
                    style={{ width: 13, height: 13 }}
                    src="/icons/rarity-icon.svg"
                  />
                  <Text style="subtitle3" as="p">
                    {formatNumber(token?.token?.rarityRank)}
                  </Text>
                </Flex> */}
              </Box>
            )}
          </Flex>
          {showAsk && (
            <Flex align="center" justify="between" css={{ gap: '$2' }}>
              <Flex align="center" css={{ gap: '$2' }}>
                <Flex
                  css={{
                    flex: 1,
                    minWidth: 0,
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    gap: '$1',
                  }}
                >
                  {token?.market?.floorAsk?.price && (
                    <FormatCryptoCurrency
                      label="Listed Price"
                      logoHeight={18}
                      amount={token?.market?.floorAsk?.price?.amount?.raw}
                      address={
                        token?.market?.floorAsk?.price?.currency?.contract
                      }
                      decimals={
                        token?.market?.floorAsk?.price?.currency?.decimals
                      }
                      borderRadius="100%"
                      textStyle="h6"
                      css={{
                        fontWeight: 500,
                        background:
                          'var(--Materials-Steel, linear-gradient(0deg, #EBEBFC 0%, #A2A3AE 100%))',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textOverflow: 'ellipsis',
                        minWidth: 0,
                        width: '100%',
                        overflow: 'hidden',
                        fontSize: 18,
                      }}
                      maximumFractionDigits={4}
                    />
                  )}

                  <Text>ETH</Text>
                </Flex>

                {/* {is1155 && token?.market?.floorAsk?.quantityRemaining ? (
                  <Text style="subtitle2" ellipsify>
                    x
                    {formatNumber(
                      token?.market?.floorAsk?.quantityRemaining,
                      0,
                      true
                    )}
                  </Text>
                ) : null} */}
              </Flex>
              {/* 
              {showSource && token?.market?.floorAsk?.source?.name ? (
                <img
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                  }}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    const url = `${process.env.NEXT_PUBLIC_PROXY_URL}${proxyApi}/redirect/sources/${token?.market?.floorAsk?.source?.domain}/tokens/${token?.token?.contract}:${token?.token?.tokenId}/link/v2`
                    window.open(url, '_blank')
                  }}
                  src={`${process.env.NEXT_PUBLIC_PROXY_URL}${proxyApi}/redirect/sources/${token?.market?.floorAsk?.source?.domain}/logo/v2`}
                />
              ) : null} */}
            </Flex>
          )}
          {token?.token?.lastSale?.price?.amount?.decimal ? (
            <Flex css={{ gap: '$2', marginTop: 'auto' }}>
              <Text
                css={{
                  fontSize: '14px',
                  color: '#464b50',
                  // color: '',
                }}
              >
                Last Sale
              </Text>
              <FormatCryptoCurrency
                label="Last Sale"
                logoHeight={12}
                amount={token.token.lastSale.price.amount?.decimal}
                address={token.token.lastSale.price.currency?.contract}
                decimals={token.token.lastSale.price.currency?.decimals}
                textStyle="subtitle3"
                maximumFractionDigits={4}
                css={{
                  color: '$gray7',
                  fontWeight: 500,
                  fontSize: 14,
                }}
              />
              <Text
                css={{
                  fontSize: '14px',
                  color: '#464b50',
                  // color: '',
                }}
              >
                ETH
              </Text>
            </Flex>
          ) : null}
        </Flex>
      </Link>
      {showAsk && isOwner && token?.market?.floorAsk?.price?.amount ? (
        <Flex
          className="token-button-container"
          css={{
            width: '100%',
            transition: 'bottom 0.25s ease-in-out',
            position: 'absolute',
            bottom: -44,
            left: 0,
            right: 0,
            gap: 1,
          }}
        >
          <BuyNow
            tokenId={token.token?.tokenId}
            contract={token.token?.contract}
            mutate={mutate}
            buttonCss={{
              justifyContent: 'center',
              flex: 1,
            }}
            buttonProps={{
              corners: 'square',
            }}
            buttonChildren="Buy Now"
          />
          {addToCartEnabled ? (
            <AddToCart
              token={token}
              buttonCss={{
                width: 52,
                p: 0,
                justifyContent: 'center',
              }}
              buttonProps={{ corners: 'square' }}
            />
          ) : null}
        </Flex>
      ) : null}
    </Box>
  )
}
