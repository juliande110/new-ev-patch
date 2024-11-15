import type { NextPage } from 'next'
import Image from 'next/image'
import Card from './HeroCardDescription'
import { Settings } from 'react-slick'
import { Box } from 'components/primitives'
import Img from 'components/primitives/Img'
import Slider from 'components/slickSlider'
import { useState } from 'react'
import { CSS } from '@stitches/react'

interface ArrowProps {
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

type CardFrameProps = {
  css?: CSS
}

const CardFrame: NextPage<CardFrameProps> = ({ css }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [showContent, setShowContent] = useState<boolean>(false)

  const cardData = [
    {
      image: '/bitcoinLogo.png',
      Heading: '1% Marketplace Fees',
      linkTo: 'Read More',
      link: 'https://emblem-vault.medium.com/emblem-markets-8ad1957792bf',
    },
    {
      image: '/Satoshi.png',
      Heading: 'Home of Rare Pepe',
      linkTo: 'View Collection',
      link: '/ethereum/collection/0x7e6027a6a84fc1f6db6782c523efe62c923e46ff',
    },
    {
      image: 'github.png',
      Heading: 'Build with the Emblem SDK',
      linkTo: 'Build',
      link: 'https://github.com/EmblemCompany/emblem-vault-sdk',
    },
    {
      image:
        'https://img.reservoir.tools/images/v2/mainnet/z9JRSpLYGu7%2BCZoKWtAuAI37ZMpGmBWtUpAQDl1tI6BrcBXKsZNhjp9zTMM8Cvh1qeoSqFyB2nP6JZxhTbBy4fVECWsOZfOhig9GdGHhlPy5Af%2FTiJggogymY%2FXIpA1yNwksa87tIRXonit%2F26vgnA%3D%3D',
      Heading: 'Apply for the Vaultpad (Crosschain Launchpad)',
      linkTo: 'Apply',
      link: 'https://discord.com/invite/BgDcN2jpCJ',
    },
  ]

  const NextArrow: React.FC<ArrowProps> = (props) => {
    const { onClick } = props
    return (
      <Box
        css={{
          position: 'absolute',
          background: 'linear-gradient(0deg, #2F2F32 0%, #161617 100%)',
          right: 10,
          rotate: '180deg',
          borderRadius: '50%',
          padding: 15,
          top: '50%',
          transform: 'translate(0, 25px)',
          zIndex: '1',
        }}
        onClick={onClick}
      >
        <Img src="./arrow.png" width={40} height={40} alt="" />
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
          left: 5,
          borderRadius: '50%',
          padding: 15,
          top: '50%',
          transform: 'translate(0, -25px)',
          zIndex: '1',
        }}
        onClick={onClick}
      >
        <Img src="./arrow.png" width={40} height={40} alt="" />
      </Box>
    )
  }

  const settings: Settings = {
    className: 'center',
    centerMode: true,
    centerPadding: '30px',
    dots: true,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: isPlaying,
    autoplaySpeed: 2000,
    nextArrow: showContent ? <NextArrow /> : <></>,
    prevArrow: showContent ? <PrevArrow /> : <></>,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    appendDots: (dots) => (
      <Box
        css={{
          display: 'flex !important',
          bottom: 'auto !important',
          justifyContent: 'center',
          position: 'absolute !important',
          width: '100vw !important',
          alignItems: 'center',
          gap: '$3',
          paddingLeft: '$3 !important',
          right: 0,
        }}
      >
        <Image
          src={isPlaying ? '/Pause.png' : '/PLay.png'}
          width={50}
          height={50}
          style={{
            width: '50px !important',
            height: '50px !important',
            cursor: 'pointer',
          }}
          onClick={() => setIsPlaying(!isPlaying)}
          alt="Pause Carousel"
        />
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </Box>
    ),
    customPaging: (i) => (
      <Box
        css={{
          width: '100%',
          border: '3px solid #fff',
        }}
      />
    ),
  }

  return (
    <Box
      onMouseEnter={() => setShowContent(true)}
      onMouseLeave={() => setShowContent(false)}
      className="hero-carousel"
      css={css}
    >
      <Slider {...settings}>
        {cardData.map((card, index) => (
          <Card
            key={index}
            CardImage={card.image}
            CardText={card.Heading}
            CardLinkTo={card.linkTo}
            CardLink={card.link}
          />
        ))}
      </Slider>
    </Box>
  )
}

export default CardFrame
