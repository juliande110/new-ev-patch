import { faGasPump, faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useListings } from '@reservoir0x/reservoir-kit-ui'
import { BuyNow } from 'components/buttons'
import AddToCart from 'components/buttons/AddToCart'
import CancelListing from 'components/buttons/CancelListing'
import EditListing from 'components/buttons/EditListing'
import LoadingSpinner from 'components/common/LoadingSpinner'
import {
  Anchor,
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
import { repeat } from 'lodash'
import { list } from 'postcss'

type Props = {
  address?: string
  token: Parameters<typeof useListings>['0']['token']
  is1155: boolean
  isOwner: boolean
}

export const ListingsTable: FC<Props> = ({
  token,
  address,
  is1155,
  isOwner,
}) => {
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const loadMoreObserver = useIntersectionObserver(loadMoreRef, {})
  const [userOnly, setUserOnly] = useState(false)

  let listingsQuery: Parameters<typeof useListings>['0'] = {
    maker: userOnly ? address : undefined,
    token: token,
    includeCriteriaMetadata: true,
    includeRawData: true,
    sortBy: 'price',
  }

  const { chain } = useContext(ChainContext)

  if (chain.community) {
    listingsQuery.community = chain.community
  }

  const {
    data: listings,
    fetchNextPage,
    mutate,
    isValidating,
    isFetchingPage,
    isLoading,
  } = useListings(listingsQuery, { revalidateFirstPage: true })

  const { data: userListings } = useListings({
    ...listingsQuery,
    maker: address,
  })

  const userHasListings = userListings.length > 0

  useEffect(() => {
    const isVisible = !!loadMoreObserver?.isIntersecting
    if (isVisible) {
      fetchNextPage()
    }
  }, [loadMoreObserver?.isIntersecting])

  return (
    <>
      {!isValidating && !isFetchingPage && listings && listings.length === 0 ? (
        <Flex
          direction="column"
          align="center"
          css={{ py: '$6', gap: '$4', width: '100%' }}
        >
          <Text css={{ color: '$gray11' }}>
            <FontAwesomeIcon icon={faTag} size="2xl" />
          </Text>
          <Text css={{ color: '$gray11' }}>No listings yet</Text>
        </Flex>
      ) : (
        <Flex direction="column" css={{ gap: '$4', width: '100%' }}>
          {address && userHasListings && is1155 ? (
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
              Listings
            </Text>

            <Box
              css={{
                padding: '0.5px',
                backgroundColor: '#464b50',
                marginBottom: '24px',
              }}
            ></Box>
            {/* table  */}
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

            {listings.map((listing, i) => {
              return (
                <ListingTableRow
                  key={`${listing?.id}-${i}`}
                  listing={listing}
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

type ListingTableRowProps = {
  listing: ReturnType<typeof useListings>['data'][0]
  tokenString: Parameters<typeof useListings>['0']['token']
  is1155: boolean
  isOwner: boolean
  address?: string
  mutate?: MutatorCallback
}

const ListingTableRow: FC<ListingTableRowProps> = ({
  listing,
  tokenString,
  is1155,
  isOwner,
  address,
  mutate,
}) => {
  const { displayName: fromDisplayName, address: addr } = useENSResolver(
    listing.maker
  )
  const { reservoirBaseUrl } = useMarketplaceChain()

  const expiration = useTimeSince(listing?.expiration)
  const expirationText = expiration ? `${expiration}` : null

  const isUserListing = address?.toLowerCase() === listing.maker.toLowerCase()

  const isOracleOrder = listing?.isNativeOffChainCancellable
  const contract = tokenString?.split(':')[0]
  const tokenId = tokenString?.split(':')[1]

  const listingSourceName = listing?.source?.name
  const listingSourceDomain = listing?.source?.domain
  const listingSourceLogo = `${reservoirBaseUrl}/redirect/sources/${
    listingSourceDomain || listingSourceName
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
          css={{ display: 'flex', flexDirection: 'row', gap: '$1' }}
          className="grid-item"
        >
          <FormatCryptoCurrency
            amount={listing.price?.amount?.decimal}
            address={listing.price?.currency?.contract}
            logoHeight={16}
            // textStyle="h6"
            css={{ fontSize: '14px ' }}
          />
          <Text>{listing.price?.currency?.symbol || 'ETH'}</Text>
        </Box>
        {/* 2 */}
        <Box
          css={{ display: 'flex', flexDirection: 'row', fontSize: '14px' }}
          className="grid-item"
        >
          {listing.price?.amount?.usd ? (
            <Text style="body2" css={{ fontSize: '14px' }} ellipsify>
              {formatDollar(listing.price?.amount?.usd)}
            </Text>
          ) : null}
        </Box>
        {/* 3 */}

        <Box
          css={{ display: 'flex', flexDirection: 'row' }}
          className="grid-item"
        >
          {listing?.quantityRemaining ? (
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
                {formatNumber(listing.quantityRemaining, 0, true)}
              </Text>
            </Flex>
          ) : (
            '-'
          )}
        </Box>
        <Box
          css={{ display: 'flex', flexDirection: 'row', fontSize: '14px' }}
          className="grid-item"
        >
          {expirationText}
        </Box>
        {/* 4 */}

        <Box
          css={{ display: 'flex', flexDirection: 'row', fontSize: '14px' }}
          className="grid-item"
        >
          <Anchor
            href={`/portfolio/${addr}`}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            weight="medium"
          >
            <Flex align="center" css={{ color: '#5BADFF' }}>
              {fromDisplayName}
            </Flex>
          </Anchor>
        </Box>
      </Box>
    </>
  )
}
