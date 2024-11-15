import { Box, Flex, Text } from 'components/primitives'
import Slider from 'components/slickSlider'
import { Settings } from 'react-slick'
import { useCollections } from '@reservoir0x/reservoir-kit-ui'
import { FC, useEffect, useState } from 'react'
import LoadingSpinner from 'components/common/LoadingSpinner'
import { RecentSalesCard } from './RecentSaleCard'
import { useMediaQuery } from 'react-responsive'
import { Sale } from 'types/Sales'
import axios from 'axios'
import Img from 'components/primitives/Img'

interface ArrowProps {
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

const RecentSalesCardsSection: FC = () => {
  const isSmallDevice = useMediaQuery({ query: '(max-width: 800px)' })

  const [recentSales, setRecentSales] = useState<Sale[]>()
  const [showContent, setShowContent] = useState<boolean>(false)
  const [collectionId, setCollectionId] = useState<string | undefined>()

  useEffect(() => {
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
    fetchDataFromApi()
  }, [])

  const {
    data: trendingCollections,
    isValidating: isTrendingCollectionsValidating,
    hasNextPage,
  } = useCollections({
    collectionsSetId: collectionId as string,
    sortBy: 'floorAskPrice',
    limit: 20,
  })

  useEffect(() => {
    if (isTrendingCollectionsValidating) return
    let contracts: string[] = []
    contracts = trendingCollections
      ?.filter((collection) => collection?.id)
      .map((collection) => collection?.id) as string[]

    const fetchData = async () => {
      try {
        const response = await axios.get('/api/getRecentSales', {
          params: {
            contract: contracts,
            sortBy: 'time',
            limit: 10,
          },
        })
        if (response) {
          setRecentSales(response?.data?.sales)
        }
      } catch (error) {
        console.error('Failed to fetch stats', error)
      }
    }

    fetchData()
  }, [isTrendingCollectionsValidating])

  const NextArrow: React.FC<ArrowProps> = (props) => {
    const { onClick } = props
    return (
      <Box
        css={{
          position: 'absolute',
          background: 'linear-gradient(0deg, #2F2F32 0%, #161617 100%)',
          right: '-10px',
          rotate: '180deg',
          borderRadius: '50%',
          padding: 10,
          top: '50%',
          transform: 'translate(0, 25px)',
          zIndex: '1',
        }}
        onClick={onClick}
      >
        <Img src="./arrow.png" width={30} height={30} alt="" />
      </Box>
    )
  }

  const PrevArrow: React.FC<ArrowProps> = (props) => {
    const { onClick } = props
    return (
      <Box
        css={{
          position: 'absolute',
          background: 'linear-gradient(0deg, #2F2F32 0%, #161617 100%)',
          left: '-10px',
          borderRadius: '50%',
          padding: 10,
          top: '50%',
          transform: 'translate(0, -25px)',
          zIndex: '1',
        }}
        onClick={onClick}
      >
        <Img src="./arrow.png" width={30} height={30} alt="" />
      </Box>
    )
  }

  const settings: Settings = {
    className: 'center',
    centerMode: true,
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    cssEase: 'linear',
    nextArrow: showContent ? <NextArrow /> : <></>,
    prevArrow: showContent ? <PrevArrow /> : <></>,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToScroll: 3,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToScroll: 2,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <Box
      className="action-cards"
      css={{
        px: '$4',
      }}
    >
      <Flex
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
          Recent Sales
        </Text>
      </Flex>
      <Box
        css={{
          height: '100%',
        }}
      >
        {recentSales ? (
          <Box
            onMouseEnter={() => setShowContent(true)}
            onMouseLeave={() => setShowContent(false)}
            css={{
              marginBottom: '80px',
            }}
          >
            <Box
              css={{
                position: 'absolute',
                height: 400,
                maxWidth: '1440px',
                width: '-webkit-fill-available',
                zIndex: 1,
                background:
                  'linear-gradient(to right, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 70px, rgba(0, 0, 0, 0) calc(100% - 70px), rgba(0, 0, 0, 0.9) 100%)',
                pointerEvents: 'none',
              }}
            />
            <Slider {...settings}>
              {recentSales.map((sale: Sale, index: number) => {
                return <RecentSalesCard key={index} sale={sale} />
              })}
            </Slider>
          </Box>
        ) : (
          <Flex justify="center" align="center" css={{ height: 150 }}>
            <LoadingSpinner css={{ justifySelf: 'center' }} />
          </Flex>
        )}
      </Box>
    </Box>
  )
}

export default RecentSalesCardsSection
