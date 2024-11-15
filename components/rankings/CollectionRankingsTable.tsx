import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCollections } from '@reservoir0x/reservoir-kit-ui'
import { OpenSeaVerified } from 'components/common/OpenSeaVerified'
import { NAVBAR_HEIGHT } from 'components/navbar'
import {
  Box,
  Button,
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
import { ComponentPropsWithoutRef, FC, useMemo } from 'react'
import { useMediaQuery } from 'react-responsive'
import optimizeImage from 'utils/optimizeImage'

type TrendingCollections = NonNullable<
  ReturnType<typeof useCollections>['data']
>

type Props = {
  collections: TrendingCollections
  loading?: boolean
  volumeKey: 'allTime' | '1day' | '7day' | '30day'
}
const gridColumns = {
  gridTemplateColumns: '520px repeat(5, 0.5fr) 250px',
  '@md': {
    gridTemplateColumns: '420px 1fr 1fr 1fr',
  },

  '@lg': {
    gridTemplateColumns: '360px repeat(5, 0.5fr) 250px',
  },

  '@xl': {
    gridTemplateColumns: '520px repeat(5, 0.5fr) 250px',
  },
}

export const CollectionRankingsTable: FC<Props> = ({
  collections,
  loading,
  volumeKey,
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
          <Flex
            direction="column"
            css={{
              // maxHeight: '305px',
              position: 'relative',
              '@bp600': {
                flexDirection: 'row',
                flexWrap: 'wrap',
              },
            }}
          >
            {collections.slice(0, 9).map((collection, i) => {
              return (
                <RankingsTableRow
                  key={collection.id}
                  collection={collection}
                  rank={i + 1}
                  volumeKey={volumeKey}
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
  volumeKey: ComponentPropsWithoutRef<
    typeof CollectionRankingsTable
  >['volumeKey']
}

const RankingsTableRow: FC<RankingsTableRowProps> = ({
  collection,
  rank,
  volumeKey,
}) => {
  const { routePrefix } = useMarketplaceChain()
  const isSmallDevice = useMediaQuery({ maxWidth: 900 })

  const collectionImage = useMemo(() => {
    return optimizeImage(collection.image as string, 250)
  }, [collection.image])

  const getVolumeValue = useMemo(() => {
    switch (volumeKey) {
      case 'allTime':
        return collection?.volume?.['allTime']
      case '1day':
        return collection?.volume?.['1day']
      case '7day':
        return collection?.volume?.['7day']
      case '30day':
        return collection?.volume?.['30day']
      default:
        return undefined
    }
  }, [collection, volumeKey])

  return (
    // trdingin collection table

    <Box
      key={collection.id}
      css={{
        marginBottom: 24,

        // if widht is more than 600px

        '@bp600': {
          width: '33%',
        },
      }}
    >
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
            <Text css={{ minWidth: 15 }} style="body1">
              {rank}
            </Text>
            <Img
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
            <Flex direction="column" css={{ gap: '$1', minWidth: 0 }}>
              <Flex justify="start" direction="row" css={{ gap: '4px' }}>
                <Text
                  css={{
                    display: 'inline-block',
                    minWidth: 0,
                  }}
                  style="h5"
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
              <Text
                css={{
                  display: 'inline-block',
                  minWidth: 0,
                }}
                style="body1"
                ellipsify
              >
                Floor {collection?.floorAsk?.price?.amount?.decimal ?? 'N/A'}{' '}
                ETH
              </Text>
            </Flex>
            <Flex css={{ flexGrow: 1 }} />
            <Flex direction="column" css={{ gap: '$1' }}>
              <Button
                color="secondary"
                size="medium"
                corners="pill"
                css={{ gap: '8px', paddingLeft: '26px', color: 'white' }} // Reduced left padding
              >
                <img src="./ETH.svg" alt="Ethereum Logo" width={8} height={8} />
                {getVolumeValue?.toFixed(2) ?? 'N/A'}ETH
              </Button>
            </Flex>
          </Flex>
        </Link>
      </TableCell>
    </Box>
  )
}

const headings = [
  'Collection',
  'Floor Price',
  'Volume',
  '1D Change',
  '7D Change',
  'Supply',
  'Sample Tokens',
]

const TableHeading: React.FC<Pick<Props, 'volumeKey'>> = ({ volumeKey }) => (
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
        css={{ textAlign: i === headings.length - 1 ? 'right' : 'left' }}
      >
        <Text style="subtitle3" color="subtle">
          {heading === 'Volume' && `${volumeKey.replace('day', 'D')} `}
          {heading}
        </Text>
      </TableCell>
    ))}
  </HeaderRow>
)
