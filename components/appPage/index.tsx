import { useState } from 'react'
import { Box, Flex, Text } from 'components/primitives'
import Card from './card'
import AppSection from './appSection'
import EmblemFinanceAppSection from 'components/home/apps'
import SectionHeader from './sectionHeader'
import AppCarousel from './appCarousel'

const AppPage = () => {
  return (
    <Flex
      css={{
        padding: '180px 0 180px 0',
        flexDirection: 'column',
        maxWidth: '1440px',
        // width: '100%',
        margin: '0 auto',
        gap: '60px',
        overflow: 'hidden',

        '@bp600': {
          // padding: '180px 0 180px 0',
        },
      }}
    >
      {' '}
      {/* Adjusted flexDirection to column */}
      <Flex
        css={{
          width: '1440px',
          height: '400px', // Changed height to 400px as per instructions
          background: 'linear-gradient(180deg, #000 0%, #7A7A7D)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Changed to center align items
          justifyContent: 'center', // Changed to center justify content
          letterSpacing: 'normal',
          margin: ' 0 auto', // Added 180px margin to top and centered the Box horizontally
          textAlign: 'left', // Changed text alignment to left
          // '@media screen and (max-width: 1125px)': {
          //   height: 'auto',
          //   minHeight: '400px', // Adjusted minHeight to match new height
          // },
          '@bp600': {
            // paddingLeft: '40px',
          },
        }}
      >
        <Box
          css={{
            width: '100%',
            height: '100%',
            paddingTop: '40px', // Added 40px padding on the top
            flexDirection: 'column',
            alignItems: 'flex-start', // Changed to align items to the start (left)
            justifyContent: 'center', // Kept center justify content
            maxWidth: '1440px', // Set content max width to 1440px as per instructions
            textAlign: 'left', // Changed to align the text to the left
            margin: '0 auto', // Center the content
            '@media screen and (max-width: 750px)': {
              gap: '20px 0px',
            },
          }}
        >
          <Flex
            css={{
              alignSelf: 'flex-start', // Changed to align self to the start (left)
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start', // Changed to justify content to the start (left)
              maxWidth: '100%',
            }}
          >
            <Box
              css={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                boxSizing: 'border-box',
                gap: '12px 0px',
                maxWidth: '100%',
                paddingLeft: '15px',

                '@bp600': {
                  paddingLeft: '40px',
                },
              }}
            >
              <Text
                css={{
                  width: '350px',
                  position: 'relative',
                  lineHeight: '100%',
                  fontWeight: '600',
                  color: '$yellow40',
                  display: 'inline-block',
                  maxWidth: '100%',
                }}
                style="labelSmall"
              >
                Tools, Products, and Features
              </Text>
              <Text
                style="h1"
                css={{
                  width: '553px',
                  fontSize: '48px',
                  lineHeight: '120%',
                  textAlign: 'left', // Ensured text aligns left
                  '@media screen and (max-width: 1050px)': {
                    fontSize: '38px',
                    lineHeight: '46px',
                  },
                  '@media screen and (max-width: 450px)': {
                    fontSize: '29px',
                    lineHeight: '35px',
                  },
                }}
              >
                Emblem Applications
              </Text>
              <Text
                style="body"
                css={{
                  width: '400px',
                  display: 'inline-block',
                  maxWidth: '100%',
                }}
              >
                Utilize Emblem Vault APIs and SDK to build cutting edge
                crosschain solutions for your multichain project.
              </Text>
            </Box>
          </Flex>
        </Box>
      </Flex>
      {/* New row for Cards */}
      <Flex
        css={{
          gap: '20px',
          width: '100%',
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
          margin: '0 auto',
          '@media screen and (max-width: 750px)': {
            flexDirection: 'column',
            padding: '10px', // Added 10px padding on mobile
          },
        }}
      >
        <Card
          eMBLEMTOOLS="Vault Creation & Management"
          appsByEmblem="Emblem.Vision"
          decentralizedApplications="Emblem Vaults newest and most advanced crosschain digital asset management platform."
          icon="/EmojiCobalt.png"
        />
        <Card
          eMBLEMTOOLS="Community Apps"
          appsByEmblem="TelaVault"
          decentralizedApplications="Coming Soon"
          icon="/EmojiSteel.png"
        />
      </Flex>
      {/* <SectionHeader
        titleText="Apps by Emblem"
        buttonText="View All"
        buttonLink="/"
      /> */}
      <EmblemFinanceAppSection />
      {/* <SectionHeader
        titleText="Emblem SDK"
        buttonText="View SDK"
        buttonLink="https://github.com/EmblemCompany/emblem-vault-sdk"
      /> */}
      <AppCarousel />
      {/* <SectionHeader
        titleText="Apps with Emblem"
        buttonText="View All"
        buttonLink="/"
      /> */}
      <AppSection />
    </Flex>
  )
}

export default AppPage
