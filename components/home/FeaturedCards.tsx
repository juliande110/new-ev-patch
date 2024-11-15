import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTrendingCollections } from '@reservoir0x/reservoir-kit-ui'
import { Box, Flex, FormatCryptoCurrency, Text } from 'components/primitives'
import Img from 'components/primitives/Img'
import { useMarketplaceChain } from 'hooks'
import Link from 'next/link'

export type TrendingCollections = ReturnType<
  typeof useTrendingCollections
>['data']

type FeaturedCardsProps = {
  collections: TrendingCollections
  loading?: boolean
}

export const FeaturedCards: React.FC<FeaturedCardsProps> = ({
  collections,
  loading,
}) => {
  const marketplaceChain = useMarketplaceChain()

  if (!collections) return null

  return (
    <>
      {!loading && collections.length === 0 ? (
        <Flex
          direction="column"
          align="center"
          css={{ py: '$6', gap: '$4', width: '100%' }}
        >
          <Text css={{ color: '$gray11' }}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" />
          </Text>
          <Text css={{ color: '$gray11' }}>No collections found</Text>
        </Flex>
      ) : (
        <Flex
          direction="row"
          align="center"
          justify="start"
          css={{
            width: '100%',
            maxWidth: 1440,
            overflowY: 'hidden', // Always hide vertical scroll
            overflowX: 'auto',
            padding: '10px 5px',
            margin: '0 auto',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {collections.map((collection, index) => {
            const bannerImage =
              collection?.banner ||
              collection?.image ||
              collection.sampleImages?.[0]

            const collectionImage =
              collection?.image ||
              collection?.banner ||
              collection.sampleImages?.[0]

            const isFirstCard = index === 0 // Check if it is the first card
            const isLastCard = index === collections.length - 1 // Check if it is the last card

            return (
              <Link
                key={collection.id}
                href={`/${marketplaceChain.routePrefix}/collection/${collection.id}`}
              >
                <Flex
                  direction="column"
                  css={{
                    flex: '0 0 auto', // This prevents cards from shrinking
                    width: '230px',
                    height: '355px',
                    borderRadius: 0,
                    cursor: 'pointer',
                    background: '$grey90',
                    $$shadowColor: '$colors$panelShadow',
                    boxShadow: '0px 0px 12px 0px $$shadowColor',
                    p: '0px',
                    border: '4px solid $greycool',
                    scrollSnapAlign: 'start', // This aligns the cards to the snap points
                    // marginLeft: isFirstCard ? '12px' : '0', // Apply conditional left margin for the first card
                    marginRight: isLastCard ? '0' : '12px', // Apply conditional right margin for the last card
                  }}
                >
                  <Flex
                    css={{
                      mb: '0px',
                      width: '100%',
                      height: '100%',
                      position: 'relative',
                    }}
                  >
                    <Flex
                      css={{
                        height: '230px',
                        width: '230px',
                        border: '6px solid $mithrilSteel',
                      }}
                    >
                      <Img
                        src={bannerImage as string}
                        alt={collection.name as string}
                        height={230}
                        width={230}
                        style={{
                          objectFit: 'cover',
                          borderRadius: 0,
                        }}
                      />
                    </Flex>
                    {/* Small image TODO: add collection image */}
                    {/* <Img
                      src={collectionImage as string}
                      alt={collection.name as string}
                      height={50}
                      width={50}
                      css={{
                        height: '50px',
                        width: '50px',
                        position: 'absolute',
                        inset: '240px 0px 5px 5px',
                        border: '2px solid bronze',
                        borderRadius: 8,
                      }}
                    /> */}
                  </Flex>
                  <Flex
                    direction="column"
                    css={{
                      width: '100%',
                      // height: '100%',
                    }}
                  >
                    <Box
                      css={{
                        maxWidth: 355,
                        lineHeight: 1.5,
                        fontSize: 16,
                        flex: 1,
                        fontWeight: 400,
                        display: '-webkit-box',
                        color: '$gray80',
                        fontFamily: '$body',
                        WebkitLineClamp: 3,
                        padding: '16px 12px',
                        WebkitBoxOrient: 'vertical',
                        gap: 6,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        '& a': {
                          fontWeight: 500,
                          cursor: 'pointer',
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      <Flex
                        align="center"
                        css={{
                          width: 'fit-content',
                        }}
                      >
                        <Text style="h6" as="h6" ellipsify>
                          {collection?.name}
                        </Text>
                      </Flex>
                      <Flex direction="column">
                        <Box css={{ padding: '' }}>
                          <Text
                            style="subtitle2"
                            color="subtle"
                            as="p"
                            css={{}}
                          >
                            Series 1 | Card 11
                          </Text>
                          <Flex>
                            <FormatCryptoCurrency
                              amount={
                                collection?.floorAsk?.price?.amount?.native ?? 0
                              }
                              textStyle={'subtitle3'}
                              logoHeight={12}
                              address={
                                collection?.floorAsk?.price?.currency?.contract
                              }
                              css={{
                                background:
                                  'linear-gradient(to bottom, #EBEBFC, #A2A3AE)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                              }}
                            />{' '}
                            <Text
                              css={{
                                marginLeft: 8,
                              }}
                            >
                              ETH
                            </Text>
                          </Flex>
                        </Box>
                        {/* 
                        <Box css={{}}>
                          <Text style="subtitle2" color="subtle" as="p">
                            Last Sale
                          </Text>
                          <Text style="h6" as="h4" css={{ mt: 2 }}>
                            {collection.count?.toLocaleString()}
                          </Text>
                        </Box> */}
                      </Flex>
                    </Box>
                  </Flex>
                </Flex>
              </Link>
            )
          })}
        </Flex>
      )}
    </>
  )
}
