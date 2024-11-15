import { useCollections } from '@reservoir0x/reservoir-kit-ui'
import { paths } from '@reservoir0x/reservoir-sdk'
import Layout from 'components/Layout'
import CollectionsTimeDropdown from 'components/common/CollectionsTimeDropdown'
import LoadingSpinner from 'components/common/LoadingSpinner'
import { Box, Flex, Text } from 'components/primitives'
import { CollectionRankingsTable } from 'components/rankings/CollectionRankingsTable'
import { ChainContext } from 'context/ChainContextProvider'
import { useMounted } from 'hooks'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  ComponentPropsWithoutRef,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useMediaQuery } from 'react-responsive'
import supportedChains, { DefaultChain } from 'utils/chains'
import fetcher from 'utils/fetcher'
import { NORMALIZE_ROYALTIES } from '../../../_app'
import { V3CollectionTable } from 'components/rankings/V3CollectionTable'
import axios from 'axios'
import StatsSection from 'components/home/stats'

type TrendingCollections = NonNullable<
  ReturnType<typeof useCollections>['data']
>

type SortOption = 'Collection' | 'Floor Price' | 'Volume' | 'Change' | 'Total Vaults' | 'Sales' | 'Owners';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const IndexPage: NextPage<Props> = ({ ssr }) => {
  const router = useRouter()
  const isSSR = typeof window === 'undefined'
  const isMounted = useMounted()
  const compactToggleNames = useMediaQuery({ query: '(max-width: 800px)' })
  const [sortByTime, setSortByTime] = useState<string>('7d')
  const [collectionId, setCollectionId] = useState<string | null>(null)
  const [allCollections, setAllcollections] = useState<TrendingCollections>([])
  const [startTimestamp, setStartTimestamp] = useState<number>(0)
  const [endTimestamp, setEndTimestamp] = useState<number>(0)
  const [sortByKey, setSortByKey] = useState<SortOption>('Volume')
  const [sortDirection, setSortDirection] = useState<boolean>(true)

  const { chain, switchCurrentChain } = useContext(ChainContext)

  useEffect(() => {
    if (router.query.chain) {
      let chainIndex: number | undefined
      for (let i = 0; i < supportedChains.length; i++) {
        if (supportedChains[i].routePrefix == router.query.chain) {
          chainIndex = supportedChains[i].id
        }
      }
      if (chainIndex !== -1 && chainIndex) {
        switchCurrentChain(chainIndex)
      }
    }
  }, [router.query])

  const fetchDataFromApi = async () => {
    try {
      const response = await axios.get('/api/collectionId')
      if (response) {
        const data = await response.data
        setCollectionId(data.collectionSetID)
      } else {
        console.error('Failed to fetch data from API')
      }
    } catch (error) {
      console.error('Error fetching data from API:', error)
    }
  }

  useEffect(() => {
    getTimestamp
    fetchDataFromApi()
  }, [])

  useEffect(() => {
    if (!collectionId) return
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/getTotalCollections', {
          params: {
            collectionsSetId: collectionId,
            sortBy: 'updatedAt',
            limit: 1000,
          },
        })
        if (response)
          setAllcollections(response.data.collections as TrendingCollections)
      } catch (error) {
        console.error('Failed to fetch stats', error)
      }
    }

    fetchData()
  }, [collectionId])

  const getTimestamp = useMemo(() => {
    const timestampInSeconds = Math.floor(Date.now() / 1000)
    switch (sortByTime) {
      case '30d':
        setStartTimestamp(timestampInSeconds - 60 * 60 * 24 * 30)
        break
      case '7d':
        setStartTimestamp(timestampInSeconds - 60 * 60 * 24 * 7)
        break
      case '24h':
        setStartTimestamp(timestampInSeconds - 60 * 60 * 24)
        break
      case '6h':
        setStartTimestamp(timestampInSeconds - 60 * 60 * 6)
        break
      case '1h':
        setStartTimestamp(timestampInSeconds - 60 * 60)
        break
      case '10m':
        setStartTimestamp(timestampInSeconds - 60 * 10)
        break
      default:
        break
    }

    setEndTimestamp(timestampInSeconds)
    return
  }, [sortByTime])

  let volumeKey: ComponentPropsWithoutRef<
    typeof CollectionRankingsTable
  >['volumeKey'] = '1day'

  switch (sortByTime) {
    case 'allTime':
      volumeKey = 'allTime'
      break
    case '30d':
      volumeKey = '30day'
      break
    case '7d':
      volumeKey = '7day'
      break
    case '24h':
      volumeKey = '1day'
      break
  }

  const {
    data: trendingCollections,
    isValidating: isTrendingCollectionsValidating,
  } = useCollections({
    collectionsSetId: collectionId as string,
    startTimestamp: sortByTime === 'allTime' ? undefined : startTimestamp,
    endTimestamp: endTimestamp,
    sortBy: 'updatedAt',
    limit: 1000,
  })

  const displayCollecions = allCollections.map((collection) => {
    const matchedCollection = trendingCollections.filter(
      (newCollection) => collection?.id === newCollection?.id
    )
    if (matchedCollection.length > 0) {
      return {
        ...collection,
        volume: matchedCollection[0].volume,
        volumeChange: matchedCollection[0].volumeChange,
      }
    }
    return {
      ...collection,
      volume: {
        '1day': 0,
        '7day': 0,
        '30day': 0,
        allTime: 0,
      },
      volumeChange: {
        '1day': null,
        '7day': null,
        '30day': null,
      },
    }
  })

  const handleChangeSort = (key: SortOption, direction: boolean): void => {
    setSortByKey(key)
    setSortDirection(direction)
  }

  return (
    <Layout>
      {/* <Head /> */}
      {/* <CollectionHero></CollectionHero> */}
      <Box>
        <StatsSection />
      </Box>
      <Box
        css={{
          p: 24,
          mt: '50px',
          height: '100%',
          '@bp800': {
            p: '$5',
          },

          '@xl': {
            px: '$6',
          },
        }}
      >
        <Flex
          direction="column"
          css={{
            maxWidth: '1440px',
            margin: 'auto',
          }}
        >
          <Flex
            justify="between"
            align="start"
            css={{
              flexDirection: 'column',
              gap: 24,
              mb: '$4',
              '@bp800': {
                alignItems: 'center',
                flexDirection: 'row',
              },
            }}
          >
            <Text style="h4" as="h4">
              Top Collections
            </Text>
            <Flex align="center" css={{ gap: '$4' }}>
              <CollectionsTimeDropdown
                compact={compactToggleNames && isMounted}
                option={sortByTime}
                onOptionSelected={(option) => {
                  setSortByTime(option)
                }}
              />
              {/* <ChainToggle /> */}
            </Flex>
          </Flex>
          {isSSR || !isMounted ? null : !isTrendingCollectionsValidating ? (
            <V3CollectionTable
              collections={(
                displayCollecions.sort((a, b) => {
                  let volumeA
                  let volumeB
                  switch(sortByKey) {
                    case 'Volume':
                      {/* @ts-ignore */}
                      volumeA = a.volume[volumeKey]
                      {/* @ts-ignore */}
                      volumeB = b.volume[volumeKey]
                      break
                    case 'Floor Price':
                      volumeA = a.floorAsk?.price?.amount?.decimal
                      volumeB = b.floorAsk?.price?.amount?.decimal
                      break
                    case 'Change':
                      {/* @ts-ignore */}
                      volumeA = volumeKey === 'allTime' ? a.volumeChange?.['30day'] : a.volumeChange?.[volumeKey]
                      {/* @ts-ignore */}
                      volumeB = volumeKey === 'allTime' ? b.volumeChange?.['30day'] : b.volumeChange?.[volumeKey]
                      break
                    case 'Total Vaults':
                      volumeA = a.tokenCount
                      volumeB = b.tokenCount
                      break
                    case 'Sales':
                      volumeA = a.onSaleCount
                      volumeB = b.onSaleCount
                      break
                    case 'Owners':
                      volumeA = a.ownerCount
                      volumeB = b.ownerCount
                      break
                    default:
                      break
                  }

                  if(!sortDirection) {
                    if (volumeA === undefined || volumeA === null) return -1
                    if (volumeB === undefined || volumeB === null) return 1
                    {/* @ts-ignore */}
                    return volumeA - volumeB
                  }

                  if (volumeA === undefined || volumeA === null) return 1
                  if (volumeB === undefined || volumeB === null) return -1
                  {/* @ts-ignore */}
                  return volumeB - volumeA
                }) as TrendingCollections) || []}
              volumeKey={volumeKey}
              loading={isTrendingCollectionsValidating}
              startTime={sortByTime === 'allTime' ? undefined : startTimestamp}
              endTime={endTimestamp}
              handleSort={handleChangeSort}
              sortByKey={sortByKey}
              sortDirection={sortDirection}
            />
          ) : (
            <Flex align="center" justify="center" css={{ py: '$4' }}>
              <LoadingSpinner />
            </Flex>
          )}
        </Flex>
      </Box>
    </Layout>
  )
}

type CollectionSchema =
  paths['/collections/v7']['get']['responses']['200']['schema']

export const getServerSideProps: GetServerSideProps<{
  ssr: {
    collection: CollectionSchema
  }
}> = async ({ res, params }) => {
  const collectionQuery: paths['/collections/v7']['get']['parameters']['query'] =
    {
      sortBy: '1DayVolume',
      normalizeRoyalties: NORMALIZE_ROYALTIES,
      limit: 50,
    }
  const chainPrefix = params?.chain || ''
  const chain =
    supportedChains.find((chain) => chain.routePrefix === chainPrefix) ||
    DefaultChain
  const query = { ...collectionQuery }
  if (chain.collectionSetId) {
    query.collectionsSetId = chain.collectionSetId
  } else if (chain.community) {
    query.community = chain.community
  }
  const response = await fetcher(
    `${chain.reservoirBaseUrl}/collections/v7`,
    query,
    {
      headers: {
        'x-api-key': process.env.RESERVOIR_API_KEY || '',
      },
    }
  )

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=30, stale-while-revalidate=60'
  )

  return {
    props: { ssr: { collection: response.data } },
  }
}

export default IndexPage
