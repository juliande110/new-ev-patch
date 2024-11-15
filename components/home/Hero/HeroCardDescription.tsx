import type { NextPage } from 'next'
import { Box, Flex, Text } from '../../primitives' // Adjust the import path as necessary

type CardType = {
  CardImage?: string
  CardText?: string
  CardLinkTo?: string
  CardLink?: string
}

const HeroCardDescription: NextPage<CardType> = ({
  CardImage,
  CardText,
  CardLinkTo,
  CardLink,
}) => {
  return (
    <Box
      css={{
        alignSelf: 'stretch',
        width: 300,
        height: 470,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        textAlign: 'left',
        fontSize: 24,
        fontFamily: 'Nohemi',
      }}
    >
      <Box
        as="img"
        loading="eager"
        alt=""
        src={CardImage}
        css={{
          alignSelf: 'stretch',
          flex: 1,
          maxWidth: '100%',
          overflow: 'hidden',
          objectFit: 'cover',
        }}
      />
      <Flex
        css={{
          alignSelf: 'stretch',
          backgroundColor: '#1c1c1e',
          border: '4px solid #2f2f32',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          padding: '24px 20px',
          gap: '24px',
        }}
      >
        <Text
          style="h4"
          as="h4"
          css={{
            margin: 0,
            lineHeight: '120%',
            fontWeight: 400,
            background: 'linear-gradient(0deg, #ebebfc, #a2a3ae)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0px 10px 10px rgba(0, 0, 0, 0.1)',
            minHeight: '55px',
          }}
        >
          {CardText}
        </Text>
        <Box
          as="a"
          href={CardLink}
          target="_blank"
          css={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '8px',
            fontSize: '14px',
            fontFamily: 'Inter',
          }}
        >
          <Text
            css={{
              position: 'relative',
              lineHeight: '18.5px',
              fontWeight: 'bold',
              background: 'linear-gradient(0deg, #ebebfc, #a2a3ae)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {CardLinkTo}
          </Text>
          <Box
            as="img"
            loading="eager"
            alt=""
            src="/outline--right.svg"
            css={{
              height: '16px',
              width: '16px',
              position: 'relative',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          />
        </Box>
      </Flex>
    </Box>
  )
}

export default HeroCardDescription
