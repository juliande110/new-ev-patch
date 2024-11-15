import { paths } from '@reservoir0x/reservoir-sdk'
import { Head } from 'components/Head'
import Layout from 'components/Layout'
import { Box, Button, Flex, Text } from 'components/primitives'
import { Settings } from 'react-slick'
import { ChainContext } from 'context/ChainContextProvider'
import { useMarketplaceChain, useMounted } from 'hooks'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import {
  ComponentPropsWithoutRef,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react'
import supportedChains, { DefaultChain } from 'utils/chains'

import * as Tabs from '@radix-ui/react-tabs'
import {
  useCollections,
  useTrendingCollections,
  useTrendingMints,
} from '@reservoir0x/reservoir-kit-ui'
import ChainToggle from 'components/common/ChainToggle'
import CollectionsTimeDropdown, {
  CollectionsSortingOption,
} from 'components/common/CollectionsTimeDropdown'
import LoadingSpinner from 'components/common/LoadingSpinner'
import MintsPeriodDropdown, {
  MintsSortingOption,
} from 'components/common/MintsPeriodDropdown'
import RecentSalesCardsSection from 'components/home/RecentSales'
import RecentListingsCardsSection from 'components/home/RecentListings'
import RecentlyVaultedSection from 'components/home/RecentVaulted'
import { TabsContent, TabsList, TabsTrigger } from 'components/primitives/Tab'
import { CollectionRankingsTable } from 'components/rankings/CollectionRankingsTable'
import { MintRankingsTable } from 'components/rankings/MintRankingsTable'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { useMediaQuery } from 'react-responsive'
import fetcher from 'utils/fetcher'
import StatsSection from 'components/home/stats'
import AppSection from 'components/home/apps'
import NewFooter from 'components/home/NewFooter'
import HeroHome from 'components/home/Hero/Splash'
import axios from 'axios'
import css from 'styled-jsx/css'
import { orderBy } from 'lodash'
import Img from 'components/primitives/Img'

type TabValue = 'collections' | 'mints'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>
type TrendingCollections = NonNullable<
  ReturnType<typeof useCollections>['data']
>

const Home: NextPage<Props> = ({ ssr }) => {
  const router = useRouter()
  const marketplaceChain = useMarketplaceChain()
  const isMounted = useMounted()

  // not sure if there is a better way to fix this
  const { theme: nextTheme } = useTheme()
  const [theme, setTheme] = useState<string | null>(null)
  useEffect(() => {
    if (nextTheme) {
      setTheme(nextTheme)
    }
  }, [nextTheme])

  const isSSR = typeof window === 'undefined'
  const isSmallDevice = useMediaQuery({ query: '(max-width: 800px)' })

  const [tab, setTab] = useState<TabValue>('collections')
  const [collectionId, setCollectionId] = useState<string | null>(null)
  const [sortByTime, setSortByTime] = useState<string>('7d')

  const [sortByPeriod, setSortByPeriod] = useState<MintsSortingOption>('24h')
  const [startTimestamp, setStartTimestamp] = useState<number>(0)
  const [endTimestamp, setEndTimestamp] = useState<number>(0)
  const [allCollections, setAllcollections] = useState<TrendingCollections>([])

  let mintsQuery: Parameters<typeof useTrendingMints>['0'] = {
    limit: 20,
    period: sortByPeriod,
    type: 'any',
  }

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
    fetchDataFromApi()
  }, [])

  useEffect(() => {
    if (collectionId) {
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
    }
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
    } else {
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
    }
  })

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
  //sort trending collections by volume
  displayCollecions.sort((a, b) => {
    const volumeA = a.volume?.[volumeKey]
    const volumeB = b.volume?.[volumeKey]

    if (volumeA === undefined) return 1
    if (volumeB === undefined) return -1
    return volumeB - volumeA
  })

  return (
    <Layout>
      <HeroHome />
      <Box
        css={{
          marginBottom: '80px',
          p: 0,
          height: '100%',
          maxWidth: 1440,
          margin: '80px auto 0 auto',
        }}
      >
        {/* Recently Vaulted  */}
        <RecentlyVaultedSection />

        {/* Trending Table */}
        <Tabs.Root
          onValueChange={(tab) => setTab(tab as TabValue)}
          defaultValue="collections"
        >
          <Flex
            justify="between"
            align="start"
            css={{
              px: '$4',
            }}
          >
            <Text style="h3" as="h3">
              Trending
            </Text>
            {!isSmallDevice && (
              <Flex
                align="center"
                css={{
                  gap: '$4',
                }}
              >
                {tab === 'collections' ? (
                  <CollectionsTimeDropdown
                    compact={isSmallDevice && isMounted}
                    option={sortByTime}
                    onOptionSelected={(option) => {
                      setSortByTime(option)
                    }}
                  />
                ) : (
                  <MintsPeriodDropdown
                    option={sortByPeriod}
                    onOptionSelected={setSortByPeriod}
                  />
                )}
                {/* <ChainToggle /> */}
              </Flex>
            )}
          </Flex>
          {isSmallDevice && (
            <Flex
              justify="between"
              align="center"
              css={{
                gap: 24,
                mb: '$4',
                px: '$4',
              }}
            >
              <Flex align="center" css={{ gap: '$4' }}>
                {tab === 'collections' ? (
                  <CollectionsTimeDropdown
                    compact={isSmallDevice && isMounted}
                    option={sortByTime}
                    onOptionSelected={(option) => {
                      setSortByTime(option)
                    }}
                  />
                ) : (
                  <MintsPeriodDropdown
                    option={sortByPeriod}
                    onOptionSelected={setSortByPeriod}
                  />
                )}
                {/* <ChainToggle /> */}
              </Flex>
            </Flex>
          )}
          <TabsContent value="collections">
            <Box
              css={{
                height: '100%',
              }}
            >
              <Flex direction="row" justify="center">
                {isTrendingCollectionsValidating ? (
                  <LoadingSpinner />
                ) : (
                  <CollectionRankingsTable
                    // @ts-ignore
                    collections={displayCollecions.slice(0, 9) || []}
                    volumeKey={volumeKey}
                    loading={isTrendingCollectionsValidating}
                  />
                )}
              </Flex>
            </Box>
          </TabsContent>
        </Tabs.Root>
      </Box>

      {/* Recent Cales Cards */}
      <Box
        css={{
          margin: '80px auto 0 auto', // Added 80px margin to the top
          maxWidth: 1440,
          p: 0,
          height: '100%',
          '@bp800': {
            px: '$0',
          },
          '@xl': {
            px: '$0',
          },
        }}
      >
        {/* <RecentSalesCardsSection /> */}
        {/* ---- */}
        {/* Stats Section */}
        <Box css={{ mb: '80px' }}>
          <StatsSection />
        </Box>
        {/* ---- */}
        {/* Recent Listings */}
        <RecentListingsCardsSection />
        {/* --- */}
        {/* Apps Section */}
        <Box css={{ mb: '100px' }}>
          <Flex
            justify="between"
            align="start"
            css={{
              mb: '40px',
              px: '$4',
            }}
          >
            <Text
              css={{
                background: 'linear-gradient(to bottom, #EBEBFC, #A2A3AE)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                // marginLeft: '50px',
              }}
              style="h3"
              as="h3"
            >
              Apps
            </Text>
          </Flex>
          <AppSection />
        </Box>
        {/* ----- */}
        {/* app section  */}
        {/* Featured Cards */}
        <Box
          css={{
            mb: 140,
          }}
        >
          {/* Hide Until Featured Cards are Implemented */}
          {/* <Flex
            justify="between"
            align="start"
            css={{
              mb: '40px',
            }}
          >
            <Text
              css={{
                background: 'linear-gradient(to bottom, #EBEBFC, #A2A3AE)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                // marginLeft: '50px',
              }}
              style="h3"
              as="h3"
            >
              New Collections
            </Text>
          </Flex>
          <Box
            css={{
              height: '100%',
            }}
          >
            <FeaturedCards collections={featuredCollections} />
          </Box> */}
        </Box>
      </Box>
      {/* <AppsPage /> */}
    </Layout>
  )
}

type TrendingCollectionsSchema =
  paths['/collections/trending/v1']['get']['responses']['200']['schema']
type TrendingMintsSchema =
  paths['/collections/trending-mints/v1']['get']['responses']['200']['schema']
type Volume = {
  '1day': number
  '7day': number
  '30day': number
  allTime: number
}

type TrendingCollection = {
  id: string
  volume: Volume
  volumeChange: {
    '1day': number | null
    '7day': number | null
    '30day': number | null
  }
  // other properties...
}

export const getServerSideProps: GetServerSideProps<{
  ssr: {
    trendingMints: TrendingMintsSchema
    trendingCollections: TrendingCollectionsSchema
    featuredCollections: TrendingCollectionsSchema
  }
}> = async ({ params, res }) => {
  const chainPrefix = params?.chain || ''
  const chain =
    supportedChains.find((chain) => chain.routePrefix === chainPrefix) ||
    DefaultChain

  const headers: RequestInit = {
    headers: {
      'x-api-key': process.env.RESERVOIR_API_KEY || '',
    },
  }

  let trendingCollectionsQuery: paths['/collections/trending/v1']['get']['parameters']['query'] =
    {
      period: '24h',
      limit: 20,
      sortBy: 'volume',
    }

  const trendingCollectionsPromise = fetcher(
    `${chain.reservoirBaseUrl}/collections/trending/v1`,
    trendingCollectionsQuery,
    headers
  )

  let featuredCollectionQuery: paths['/collections/trending/v1']['get']['parameters']['query'] =
    {
      period: '24h',
      limit: 20,
      sortBy: 'sales',
    }

  const featuredCollectionsPromise = fetcher(
    `${chain.reservoirBaseUrl}/collections/trending/v1`,
    featuredCollectionQuery,
    headers
  )

  let trendingMintsQuery: paths['/collections/trending-mints/v1']['get']['parameters']['query'] =
    {
      period: '24h',
      limit: 20,
      type: 'any',
    }

  const trendingMintsPromise = fetcher(
    `${chain.reservoirBaseUrl}/collections/trending-mints/v1`,
    trendingMintsQuery,
    headers
  )

  const promises = await Promise.allSettled([
    trendingCollectionsPromise,
    featuredCollectionsPromise,
    trendingMintsPromise,
  ]).catch((e) => {
    console.error(e)
  })
  const trendingCollections: Props['ssr']['trendingCollections'] =
    promises?.[0].status === 'fulfilled' && promises[0].value.data
      ? (promises[0].value.data as Props['ssr']['trendingCollections'])
      : {}
  const featuredCollections: Props['ssr']['featuredCollections'] =
    promises?.[1].status === 'fulfilled' && promises[1].value.data
      ? (promises[1].value.data as Props['ssr']['featuredCollections'])
      : {}

  const trendingMints: Props['ssr']['trendingMints'] =
    promises?.[1].status === 'fulfilled' && promises[1].value.data
      ? (promises[1].value.data as Props['ssr']['trendingMints'])
      : {}

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=120, stale-while-revalidate=180'
  )

  return {
    props: { ssr: { trendingCollections, trendingMints, featuredCollections } },
  }
}

export default Home
