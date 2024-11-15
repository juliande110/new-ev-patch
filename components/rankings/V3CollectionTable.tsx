import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCollections } from '@reservoir0x/reservoir-kit-ui'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { OpenSeaVerified } from 'components/common/OpenSeaVerified'
import { NAVBAR_HEIGHT } from 'components/navbar'
import {
  Box,
  Flex,
  FormatCryptoCurrency,
  HeaderRow,
  TableCell,
  TableRow,
  Text,
} from 'components/primitives'
import Img from 'components/primitives/Img'
import { PercentChange } from 'components/primitives/PercentChange'
import { useMarketplaceChain } from 'hooks'
import Link from 'next/link'
import {
  ComponentPropsWithoutRef,
  FC,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useMediaQuery } from 'react-responsive'
import optimizeImage from 'utils/optimizeImage'
import axios from 'axios'

type TrendingCollections = NonNullable<
  ReturnType<typeof useCollections>['data']
>

type SortOption =
  | 'Collection'
  | 'Floor Price'
  | 'Volume'
  | 'Change'
  | 'Total Vaults'
  | 'Sales'
  | 'Owners'

type Props = {
  collections: TrendingCollections
  loading?: boolean
  volumeKey: keyof NonNullable<TrendingCollections[0]['volume']>
  startTime?: number | undefined
  endTime?: number | undefined
  handleSort?: (key: SortOption, direction: boolean) => void
  sortByKey: SortOption
  sortDirection: boolean
}
const gridColumns = {
  gridTemplateColumns: '60% 40%',
  '@md': {
    gridTemplateColumns: '50% 25% 25%',
  },
  '@lg': {
    gridTemplateColumns: '20% repeat(6, 0.5fr) 0px',
  },
  '@xl': {
    gridTemplateColumns: '20% repeat(6, 0.5fr) 0px',
  },
}

export const V3CollectionTable: FC<Props> = ({
  collections,
  loading,
  volumeKey,
  startTime,
  endTime,
  handleSort,
  sortByKey,
  sortDirection,
}) => {
  const isSmallDevice = useMediaQuery({ maxWidth: 900 })
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
        <Flex direction="column" css={{ width: '100%', pb: '$2' }}>
          {isSmallDevice ? (
            <Flex
              justify="between"
              css={{ mb: '$4', '@md': { display: 'none' } }}
            >
              <Text style="subtitle3" color="subtle">
                Collection
              </Text>
              <Text style="subtitle3" color="subtle">
                Volume
              </Text>
            </Flex>
          ) : (
            <TableHeading
              volumeKey={volumeKey}
              sortByKey={sortByKey}
              collections={[]}
              handleSort={handleSort}
              sortDirection={sortDirection}
            />
          )}
          <Flex direction="column" css={{ position: 'relative' }}>
            {collections.map((collection, i) => {
              return (
                <RankingsTableRow
                  key={collection.id}
                  collection={collection}
                  rank={i + 1}
                  volumeKey={volumeKey}
                  startTime={startTime}
                  endTime={endTime}
                />
              )
            })}
          </Flex>
        </Flex>
      )}
    </>
  )
}

type RankingsTableRowProps = {
  collection: TrendingCollections[0]
  rank: number
  volumeKey: ComponentPropsWithoutRef<typeof V3CollectionTable>['volumeKey']
  startTime?: number | undefined
  endTime?: number | undefined
}

const RankingsTableRow: FC<RankingsTableRowProps> = ({
  collection,
  rank,
  volumeKey,
  startTime,
  endTime,
}) => {
  const { routePrefix } = useMarketplaceChain()
  const isSmallDevice = useMediaQuery({ maxWidth: 900 })
  const [salesCount, setSalesCount] = useState<string>('-')

  useEffect(() => {
    if (volumeKey === 'allTime') return
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/getSalesCount', {
          params: {
            contract: collection.id,
            startTimestamp: startTime,
            endTimestamp: endTime,
            sortBy: 'time',
            limit: 1000,
          },
        })
        if (response) setSalesCount(response.data as string)
      } catch (error) {
        console.error('Failed to fetch stats', error)
      }
    }

    fetchData()
  }, [])
  const collectionImage = useMemo(() => {
    return optimizeImage(collection.image as string, 250)
  }, [collection.image])

  const getVolumeValue = useMemo(() => {
    switch (volumeKey) {
      case '1day':
        return collection?.volumeChange?.['1day']
      case '7day':
        return collection?.volumeChange?.['7day']
      case '30day':
        return collection?.volumeChange?.['30day']
      case 'allTime':
        return collection?.volumeChange?.['30day']
    }
  }, [collection, volumeKey])

  if (isSmallDevice) {
    return (
      <TableRow
        className="collection-link-teest"
        key={collection.id}
        css={{
          ...gridColumns,
        }}
      >
        {/* 1 collection  */}
        <TableCell css={{ minWidth: 0 }}>
          <Link
            href={`/${routePrefix}/collection/${collection.id}`}
            style={{ display: 'inline-block', width: '100%', minWidth: 0 }}
          >
            <Flex
              align="center"
              css={{
                gap: '$4',
                cursor: 'pointer',
                minWidth: 0,
                overflow: 'hidden',
                width: '100$',
              }}
            >
              <Text
                className="first"
                css={{ minWidth: 15 }}
                style="h6"
                color="subtle"
              >
                {rank}
              </Text>
              <Img
                className="second"
                src={collectionImage}
                css={{
                  borderRadius: 8,
                  width: 52,
                  height: 52,
                  objectFit: 'cover',
                }}
                alt="Collection Image"
                width={52}
                height={52}
                unoptimized
              />

              <Flex css={{ gap: '$1', minWidth: 0 }} align="center">
                <Text
                  css={{
                    display: 'inline-block',
                    minWidth: 0,
                  }}
                  style="h6"
                  ellipsify
                >
                  {collection?.name}
                </Text>
                <OpenSeaVerified
                  openseaVerificationStatus={
                    collection?.openseaVerificationStatus
                  }
                />
              </Flex>
            </Flex>
          </Link>
        </TableCell>

        {/* 2 floor price  */}
        <TableCell desktopOnly>
          <Flex
            direction="row"
            align="start"
            justify="start"
            css={{ height: '100%' }}
          >
            {collection?.floorAsk?.price?.amount?.decimal ? (
              <>
                <FormatCryptoCurrency
                  amount={collection?.floorAsk?.price?.amount?.decimal}
                  address={collection?.floorAsk?.price?.currency?.contract}
                  decimals={collection?.floorAsk?.price?.currency?.decimals}
                  textStyle="subtitle1"
                  logoHeight={14}
                />{' '}
                ETH
              </>
            ) : (
              '-'
            )}
          </Flex>
        </TableCell>

        {/* 3 volume  */}
        <TableCell
          css={{
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Text style="subtitle1">
            {/* @ts-ignore */}
            {collection?.volume[volumeKey]
              ? `${Number(collection.volume[volumeKey]).toLocaleString()} ETH`
              : '-'}
          </Text>
        </TableCell>
      </TableRow>
    )
  } else {
    return (
      <TableRow
        className="collection-link-teest"
        key={collection.id}
        css={{
          ...gridColumns,
        }}
      >
        {/* 1 collection  */}
        <TableCell css={{ minWidth: 0 }}>
          <Link
            href={`/${routePrefix}/collection/${collection.id}`}
            style={{ display: 'inline-block', width: '100%', minWidth: 0 }}
          >
            <Flex
              align="center"
              css={{
                gap: '$4',
                cursor: 'pointer',
                minWidth: 0,
                overflow: 'hidden',
                width: '100$',
              }}
            >
              <Text
                className="first"
                css={{ minWidth: 15 }}
                style="h6"
                color="subtle"
              >
                {rank}
              </Text>
              <Img
                className="second"
                src={collectionImage}
                css={{
                  borderRadius: 8,
                  width: 52,
                  height: 52,
                  objectFit: 'cover',
                }}
                alt="Collection Image"
                width={52}
                height={52}
                unoptimized
              />

              <Flex css={{ gap: '$1', minWidth: 0 }} align="center">
                <Text
                  css={{
                    display: 'inline-block',
                    minWidth: 0,
                  }}
                  style="h6"
                  ellipsify
                >
                  {collection?.name}
                </Text>
                <OpenSeaVerified
                  openseaVerificationStatus={
                    collection?.openseaVerificationStatus
                  }
                />
              </Flex>
            </Flex>
          </Link>
        </TableCell>

        {/* 2 floor price  */}
        <TableCell>
          <Flex
            direction="row"
            align="start"
            justify="start"
            css={{ height: '100%' }}
          >
            {collection?.floorAsk?.price?.amount?.decimal ? (
              <>
                <FormatCryptoCurrency
                  amount={collection?.floorAsk?.price?.amount?.decimal}
                  address={collection?.floorAsk?.price?.currency?.contract}
                  decimals={collection?.floorAsk?.price?.currency?.decimals}
                  textStyle="subtitle1"
                  logoHeight={14}
                />{' '}
                ETH
              </>
            ) : (
              '-'
            )}
          </Flex>
        </TableCell>

        {/* 4 vault volume  */}
        <TableCell
          css={{
            '@media(max-width: 1200px)': {
              display: 'flex',
              justifyContent: 'end',
            },
          }}
        >
          <Text style="subtitle1">
            {/* @ts-ignore */}
            {collection?.volume[volumeKey]
              ? `${Number(collection.volume[volumeKey]).toLocaleString()} ETH`
              : '-'}
          </Text>
        </TableCell>

        {/* 5 vault change  */}
        <TableCell desktopOnly>
          {getVolumeValue ? (
            <PercentChange style="subtitle1" value={getVolumeValue} />
          ) : (
            '-'
          )}
        </TableCell>

        {/* total vaults  */}
        <TableCell desktopOnly>
          <Text style="subtitle1">
            {Number(collection?.tokenCount)?.toLocaleString()}
          </Text>
        </TableCell>

        {/* sales  */}
        <TableCell desktopOnly>
          <Text style="subtitle1">
            {volumeKey === 'allTime' ? collection?.onSaleCount : salesCount}
          </Text>
        </TableCell>

        {/* owners  */}
        <TableCell desktopOnly>
          <Text style="subtitle1">
            {Number(collection?.ownerCount)?.toLocaleString()}
          </Text>
        </TableCell>
      </TableRow>
    )
  }
}

const headings = [
  'Collection',
  'Floor Price',
  'Volume',
  'Change',
  'Unique Vaults',
  'Sales',
  'Owners',
] as SortOption[]

const TableHeading: React.FC<Props> = ({
  volumeKey,
  sortByKey,
  handleSort,
  sortDirection,
}) => (
  <HeaderRow
    css={{
      display: 'none',
      ...gridColumns,
      '@md': { display: 'grid', ...gridColumns['@md'] },
      position: 'sticky',
      top: NAVBAR_HEIGHT,
      backgroundColor: '$neutralBg',
      zIndex: 1,
    }}
  >
    {headings.map((heading, i) => (
      <TableCell
        desktopOnly={i > 2}
        key={heading}
        css={{
          textAlign: 'left',
          '@media(max-width: 1200px)': {
            justifyContent: heading === 'Volume' ? 'end' : 'start',
            display: heading === 'Volume' ? 'flex' : '',
          },
        }}
      >
        <Flex
          css={{
            gap: 5,
            alignItems: 'center',
            '&:hover': {
              cursor: 'pointer',
            },
          }}
          onClick={() => {
            if (heading === 'Collection' || !handleSort) return
            if (heading === sortByKey)
              return handleSort(heading, !sortDirection)
            handleSort(heading, true)
          }}
        >
          <Text style="subtitle3" color="subtle">
            {heading}
          </Text>
          {heading === 'Collection' ? (
            <></>
          ) : (
            <FontAwesomeIcon
              icon={
                heading === sortByKey && sortDirection
                  ? faChevronUp
                  : faChevronDown
              }
              width={16}
            />
          )}
        </Flex>
      </TableCell>
    ))}
  </HeaderRow>
)
