import { Box, Flex, Text } from 'components/primitives'
import CardFrame from './HeroCardImage'
import Arrow from 'components/primitives/Arrow'

const HeroHome = () => {
  return (
    <Flex
      className="ayush"
      css={{
        display: 'flex',
        justifyContent: 'end',
        background: 'linear-gradient(0deg, #7A7A7D 1%, #000000 100%)',
      }}
    >
      <Box
        css={{
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '20px',
          paddingBottom: '100px',
          paddingLeft: '20px',
          gap: '30px',
          textAlign: 'left',
          fontSize: '48px',
          fontFamily: 'Nohemi',
          maxWidth: 'calc(1440px + (100vw - 1440px)/2)',
          // if width is wide more than 700px
          '@bp700': {
            paddingTop: '50px',
            flexDirection: 'row',
          },
        }}
      >
        <Flex
          css={{
            flexDirection: 'column',
            gap: '20px',
            '@bp1': {
              width: '100%',
            },
          }}
        >
          <Text
            style="h1"
            as="h1"
            css={{
              margin: 0,
              alignSelf: 'stretch',
              position: 'relative',
              background: 'linear-gradient(0deg, #EBEBFC 0%, #A2A3AE 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0px 10px 5px rgba(0, 0, 0, 0.1)',
              '@bp2': {
                fontSize: '38px',
                lineHeight: '46px',
              },
              '@bp3': {
                fontSize: '29px',
                lineHeight: '35px',
              },
              '@bp1': {
                width: '100%',
              },
            }}
          >
            Crosschain Digital Asset Marketplace & Platform
          </Text>
          <Text
            style="body"
            as="p"
            css={{
              position: 'relative',
              fontSize: '15px',
              textTransform: 'capitalize',
              lineHeight: '36px',
              background: 'linear-gradient(0deg, #ebebfc, #a2a3ae)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0px 10px 10px rgba(0, 0, 0, 0.0)',
              paddingRight: '20px',
              paddingBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              '@bp1': {
                width: '100%',
              },
            }}
          >
            Welcome to Emblem Market’s multichain experience.
          </Text>
          <Arrow text="Vault Management" href="https://emblem.finance/" />
          <Arrow text="Documentation" href="https://docs.emblem.wiki/" />
        </Flex>

        {/* right card section */}
        <CardFrame
          css={{
            marginRight: '0',
            width: '670px',
            alignSelf: 'flex-end',
            '@bp1200': {
              width: '70%',
              alignSelf: 'center',
            },
            '@media screen and (max-width: 700px)': {
              alignSelf: 'auto',
              paddingRight: '$4',
              width: 'auto',
            },
          }}
        />
      </Box>
    </Flex>
  )
}

export default HeroHome
