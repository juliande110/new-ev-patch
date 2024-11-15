import { Box, Flex, Text } from 'components/primitives'
import Slider from 'components/slickSlider'
import { Settings } from 'react-slick'
import { FC, useEffect, useState } from 'react'
import LoadingSpinner from 'components/common/LoadingSpinner'
import { RecentlyVaultedCard } from './RecentlyVaultedCard'
import { useMediaQuery } from 'react-responsive'
import { RecentlyVaults, Activity } from 'types/RecentlyVaults'
import axios from 'axios'
import Img from 'components/primitives/Img'

interface ArrowProps {
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

const RecentVaultedCardsSection: FC = () => {
  const isSmallDevice = useMediaQuery({ query: '(max-width: 800px)' })

  const [recentlyVaults, setRecentlyVaults] = useState<RecentlyVaults>()
  const [showContent, setShowContent] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: recentlyVaults } = await axios.get('/api/activities', {
          params: {
            query: {
              action: 'minted',
            },
          },
        })
        if (recentlyVaults) setRecentlyVaults(recentlyVaults as RecentlyVaults)
      } catch (error) {
        console.error('Failed to fetch stats', error)
      }
    }

    fetchData()
  }, [])

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
    slidesToScroll: 5,
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
          Recently Vaulted
        </Text>
      </Flex>
      {recentlyVaults ? (
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
              height: 375,
              maxWidth: '1440px',
              width: '-webkit-fill-available',
              zIndex: 1,
              background:
                'linear-gradient(to right, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 70px, rgba(0, 0, 0, 0) calc(100% - 70px), rgba(0, 0, 0, 0.9) 100%)',
              pointerEvents: 'none',
            }}
          />
          <Slider {...settings}>
            {recentlyVaults?.activities.map(
              (vault: Activity, index: number) => {
                return <RecentlyVaultedCard key={index} asset={vault} />
              }
            )}
          </Slider>
        </Box>
      ) : (
        <Flex align="center" justify="center">
          <LoadingSpinner />
        </Flex>
      )}
    </Box>
  )
}

export default RecentVaultedCardsSection
