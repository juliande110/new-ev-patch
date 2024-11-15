import { faGasPump, faHand } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useBids } from '@reservoir0x/reservoir-kit-ui'
import { AcceptBid } from 'components/buttons'
import CancelBid from 'components/buttons/CancelBid'
import EditBid from 'components/buttons/EditBid'
import LoadingSpinner from 'components/common/LoadingSpinner'
import {
  Box,
  Button,
  Flex,
  FormatCryptoCurrency,
  TableRow,
  Text,
  Tooltip,
} from 'components/primitives'
import { ChainContext } from 'context/ChainContextProvider'
import { useENSResolver, useMarketplaceChain, useTimeSince } from 'hooks'
import Link from 'next/link'
import { FC, useContext, useEffect, useRef, useState } from 'react'
import { MutatorCallback } from 'swr'
import { useIntersectionObserver } from 'usehooks-ts'
import { formatDollar, formatNumber } from 'utils/numbers'
import { OnlyUserOrdersToggle } from './OnlyUserOrdersToggle'
import { zeroAddress } from 'viem'

type Props = {
  address?: string
  token: Parameters<typeof useBids>['0']['token']
  is1155: boolean
  isOwner: boolean
}

export const OffersTable: FC<Props> = ({ token, address, is1155, isOwner }) => {
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const loadMoreObserver = useIntersectionObserver(loadMoreRef, {})
  const [userOnly, setUserOnly] = useState(false)

  let bidsQuery: Parameters<typeof useBids>['0'] = {
    maker: userOnly ? address : undefined,
    token: token,
    includeCriteriaMetadata: true,
    includeRawData: true,
    sortBy: 'price',
  }

  const { chain } = useContext(ChainContext)

  if (chain.community) {
    bidsQuery.community = chain.community
  }

  const {
    data: offers,
    fetchNextPage,
    mutate,
    isValidating,
    isFetchingPage,
    isLoading,
  } = useBids(bidsQuery, { revalidateFirstPage: true })

  const { data: userOffers } = useBids({ ...bidsQuery, maker: address })

  const userHasOffers = userOffers.length > 0

  useEffect(() => {
    const isVisible = !!loadMoreObserver?.isIntersecting
    if (isVisible) {
      fetchNextPage()
    }
  }, [loadMoreObserver?.isIntersecting])

  return (
    <>
      {!isValidating && !isFetchingPage && offers && offers.length === 0 ? (
        <Flex
          direction="column"
          align="center"
          css={{ py: '$6', gap: '$4', width: '100%' }}
        >
          <Text css={{ color: '$gray11' }}>
            <FontAwesomeIcon icon={faHand} size="2xl" />
          </Text>
          <Text css={{ color: '$gray11' }}>No offers made yet</Text>
        </Flex>
      ) : (
        // offers table here
        <Flex direction="column" css={{ gap: '$4', width: '100%' }}>
          {address && userHasOffers ? (
            <OnlyUserOrdersToggle
              checked={userOnly}
              onCheckedChange={(checked) => setUserOnly(checked)}
            />
          ) : null}
          <Flex
            direction="column"
            css={{
              padding: '24px',
              maxHeight: '450px',
              overflowY: 'auto',
              width: '100%',
              outline: 'solid 1px $gray7',
              margin: '1px',
            }}
          >
            <Text
              css={{
                color: 'white',
                fontSize: '16px',
                fontWeight: 500,
                marginBottom: '24px',
              }}
            >
              Offers
            </Text>

            <Box
              css={{
                padding: '0.5px',
                backgroundColor: '#464b50',
                marginBottom: '24px',
              }}
            ></Box>
            <Box
              css={{
                display: 'grid',
                // grid-template-columns: repeat(4, 1fr),
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '2px',
                fontWeight: 400,
                marginBottom: '24px',
                alignItems: 'center',

                '@bp600': {},
              }}
            >
              <Tooltip content={'Unit Price'}>
                <Box
                  css={{
                    width: '100%',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  Unit Price
                </Box>
              </Tooltip>

              <Box
                css={{
                  width: '100%',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                USD Unit Price
              </Box>
              <Box
                css={{
                  width: '100%',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Quantity
              </Box>
              <Box
                css={{
                  width: '100%',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Expiration
              </Box>
              <Box
                css={{
                  width: '100%',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                From
              </Box>
            </Box>
            {offers.map((offer, i) => {
              return (
                <OfferTableRow
                  key={`${offer?.id}-${i}`}
                  offer={offer}
                  tokenString={token}
                  address={address}
                  is1155={is1155}
                  isOwner={isOwner}
                  mutate={mutate}
                />
              )
            })}
            <Box ref={loadMoreRef} css={{ height: 20 }}></Box>
          </Flex>
        </Flex>
      )}

      {isValidating && (
        <Flex align="center" justify="center" css={{ py: '$5' }}>
          <LoadingSpinner />
        </Flex>
      )}
    </>
  )
}

type OfferTableRowProps = {
  offer: ReturnType<typeof useBids>['data'][0]
  tokenString: Parameters<typeof useBids>['0']['token']
  is1155: boolean
  isOwner: boolean
  address?: string
  mutate?: MutatorCallback
}

const OfferTableRow: FC<OfferTableRowProps> = ({
  offer,
  tokenString,
  is1155,
  isOwner,
  address,
  mutate,
}) => {
  const { displayName: fromDisplayName } = useENSResolver(offer.maker)
  const { reservoirBaseUrl } = useMarketplaceChain()
  const expiration = useTimeSince(offer?.expiration)
  const expirationText = expiration ? `Expires ${expiration}` : null

  const isUserOffer = address?.toLowerCase() === offer.maker.toLowerCase()

  const isOracleOrder = offer?.isNativeOffChainCancellable
  const contract = tokenString?.split(':')[0]
  const tokenId = tokenString?.split(':')[1]

  const offerSourceName = offer?.source?.name
  const offerSourceDomain = offer?.source?.domain
  const offerSourceLogo = `${reservoirBaseUrl}/redirect/sources/${
    offerSourceDomain || offerSourceName
  }/logo/v2`

  return (
    <>
      <Box
        css={{
          display: 'grid',
          marginBottom: '24px',
          // grid-template-columns: repeat(4, 1fr),
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '5px',
          fontSize: '14px',
          color: 'White',
          alignItems: 'center',
        }}
      >
        {/* 1 */}
        <Box
          css={{ display: 'flex', flexDirection: 'row' }}
          className="grid-item"
        >
          <Flex align="center" css={{ gap: '$1', height: 36 }}>
            <Tooltip
              side="top"
              open={offer?.price?.netAmount?.decimal ? undefined : false}
              content={
                <Flex justify="between" css={{ gap: '$1' }}>
                  <Text style="body3">Net Amount</Text>
                  <FormatCryptoCurrency
                    amount={offer?.price?.netAmount?.decimal}
                    address={offer?.price?.currency?.contract}
                    decimals={offer?.price?.currency?.decimals}
                    textStyle="subtitle3"
                    logoHeight={14}
                  />
                  <Text>ETH</Text>
                </Flex>
              }
            >
              <Flex
                css={{
                  gap: '$1',
                }}
              >
                <FormatCryptoCurrency
                  amount={offer?.price?.amount?.decimal}
                  address={offer?.price?.currency?.contract}
                  decimals={offer?.price?.currency?.decimals}
                  textStyle="h6"
                  logoHeight={16}
                />
                <Text>ETH</Text>
              </Flex>
            </Tooltip>
          </Flex>
        </Box>

        {/* 2 */}
        <Box
          css={{ display: 'flex', flexDirection: 'row' }}
          className="grid-item"
        >
          <Flex direction="column" align="end" css={{ gap: '$2' }}>
            <Text style="body2" color="subtle">
              {offer.price?.amount?.usd ? (
                <Text style="body2" css={{ color: '$gray11' }} ellipsify>
                  {formatDollar(offer.price?.amount?.usd)}
                </Text>
              ) : null}
            </Text>
          </Flex>
        </Box>

        {/* 3 */}
        <Box
          css={{ display: 'flex', flexDirection: 'row' }}
          className="grid-item"
        >
          {offer?.quantityRemaining ? (
            <Flex
              justify="center"
              align="center"
              css={{
                borderRadius: 4,
                px: '$2',
                py: '$1',
                ml: '$1',
                backgroundColor: '$gray2',
              }}
            >
              <Text css={{ fontSize: '14px ' }}>
                {formatNumber(offer.quantityRemaining, 0, true)}
              </Text>
            </Flex>
          ) : (
            '-'
          )}
        </Box>

        {/* 4 */}
        <Box
          css={{ display: 'flex', flexDirection: 'row' }}
          className="grid-item"
        >
          <Flex direction="column" align="end" css={{ gap: '$2' }}>
            <Flex align="center" css={{ gap: '$2' }}>
              {/* Owner and not user offer */}
              {isOwner && !isUserOffer ? (
                <AcceptBid
                  bidId={offer.id}
                  collectionId={
                    offer.criteria?.data?.collection?.id || contract
                  }
                  tokenId={offer.criteria?.data?.token?.tokenId || tokenId}
                  buttonChildren={
                    <Text style="subtitle2" css={{ color: 'white' }}>
                      Accept
                    </Text>
                  }
                  buttonProps={{ color: 'primary' }}
                  buttonCss={{
                    fontSize: 14,
                    px: '$4',
                    py: '$2',
                    minHeight: 36,
                  }}
                />
              ) : null}
              {/* Not Owner and is user offer, owner of erc 1155 and is your offer */}
              {(!isOwner && isUserOffer) ||
              (isOwner && is1155 && isUserOffer) ? (
                <>
                  {isOracleOrder ? (
                    <EditBid
                      bidId={offer.id}
                      tokenId={offer.criteria?.data?.token?.tokenId || tokenId}
                      collectionId={
                        offer.criteria?.data?.collection?.id || contract
                      }
                      buttonChildren={<Text style="subtitle2">Edit</Text>}
                      buttonCss={{
                        fontSize: 14,
                        px: '$4',
                        py: '$2',
                        minHeight: 36,
                        minWidth: 80,
                        justifyContent: 'center',
                      }}
                      mutate={mutate}
                    />
                  ) : null}

                  <CancelBid
                    bidId={offer?.id as string}
                    mutate={mutate}
                    trigger={
                      <Flex>
                        {!isOracleOrder ? (
                          <Tooltip
                            content={
                              <Text style="body3" as="p">
                                Cancelling this order requires gas.
                              </Text>
                            }
                          >
                            <Button
                              css={{
                                color: '$red11',
                                justifyContent: 'center',
                                fontSize: 14,
                                fontWeight: 500,
                                px: '$4',
                                py: '$2',
                                minHeight: 36,
                              }}
                              color="gray3"
                            >
                              <FontAwesomeIcon
                                color="#697177"
                                icon={faGasPump}
                                width="16"
                                height="16"
                              />
                              Cancel
                            </Button>
                          </Tooltip>
                        ) : (
                          <Button
                            css={{
                              color: '$red11',
                              justifyContent: 'center',
                              fontSize: 14,
                              fontWeight: 500,
                              px: '$4',
                              py: '$2',
                              minHeight: 36,
                            }}
                            color="gray3"
                          >
                            Cancel
                          </Button>
                        )}
                      </Flex>
                    }
                  />
                </>
              ) : null}
            </Flex>
            <Text style="body2" color="subtle">
              {expirationText}
            </Text>
          </Flex>
        </Box>

        {/* 5 */}
        <Box
          css={{ display: 'flex', flexDirection: 'row' }}
          className="grid-item"
        >
          <Flex
            direction="column"
            align="start"
            css={{ height: '100%', gap: '$1' }}
          >
            <Flex align="center" css={{ gap: '$1' }}>
              <img width={16} height={16} src={offerSourceLogo} />
              {offer.maker && offer.maker !== zeroAddress ? (
                <Link
                  href={`/portfolio/${offer.maker}`}
                  style={{ lineHeight: '14.5px' }}
                >
                  <Text
                    style="subtitle2"
                    css={{
                      color: '#5BADFF',
                      '&:hover': {
                        color: '$primary10',
                      },
                    }}
                  >
                    {fromDisplayName}
                  </Text>
                </Link>
              ) : (
                <span>-</span>
              )}
            </Flex>
          </Flex>
        </Box>
      </Box>
    </>
  )
}
