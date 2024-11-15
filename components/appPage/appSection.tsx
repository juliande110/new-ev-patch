import { NextPage } from 'next'
import { Flex, Box, Text, Button } from '../primitives'
import AssetFrame from './assetFrame' // Import the new component

const AppSection: NextPage = () => {
  return (
    <Flex
      css={
        {
          // paddingBottom: '60px', // Added 54px spacing underneath this section
        }
      }
    >
      <Box
        css={{
          width: '100%', // Changed from fixed width to 100%
          flexDirection: 'column',
          gap: '54px',
          '@media(max-width: 750px)': { gap: '27px' },
        }}
      >
        <Flex
          css={
            {
              // alignSelf: 'stretch',
              // justifyContent: 'space-between',
              // gap: '20px',
              // paddingBottom: '54px',
              // width: '100%', // Ensure the container stretches to 100% width
            }
          }
        >
          {/* <Text
            style="h1"
            css={{
              fontSize: '32px',
              lineHeight: '120%',
              flex: '1', // Allow text to fill available space
            }}
          >
            Apps by Emblemn
          </Text>
          <Button
            css={{
              cursor: 'pointer',
              color: '#636366',
              border: '1px solid #2F2F32',
              padding: '10px 20px',
              backgroundColor: 'black',
              minWidth: '94px',
              borderRadius: '999px',
              whiteSpace: 'nowrap',
              '@hover': {
                backgroundColor: '#333',
                border: '1px solid #616166',
              },
              marginLeft: 'auto', // Push the button to the right
            }}
          >
            View All
          </Button> */}
        </Flex>
        <Flex
          css={{
            flexDirection: 'column',
            gap: '12px',
            '@media (max-width: 960px)': {
              flexDirection: 'column',
              gap: '12px',
            },
            width: '100%', // Ensure it takes 100% of the screen width
            color: 'white',
          }}
        >
          <Flex
            css={{
              flexDirection: 'row',
              gap: '12px',
              '@media (max-width: 960px)': {
                flexDirection: 'column', // Stack on mobile
                width: '100%', // Take 100% of screen on mobile
              },
              width: '100%', // Ensure it takes 100% of the screen width
            }}
          >
            {/* First row of AssetFrame components */}
            <AssetFrame
              imgSrc="/EmojiCobalt.png"
              mainText="Coming Soon"
              subText="TeleVault"
              link="https://discord.gg/TrWu7mSuqj"
            />
            <AssetFrame
              imgSrc="/EmojiCobalt.png"
              mainText="Pepe Directory"
              subText="pepe.wtf"
              link="https://pepe.wtf/"
            />
            <AssetFrame
              imgSrc="/EmojiCobalt.png"
              mainText="Historical NFT Directory 
              "
              subText="hnft.wtf 
              "
              link="https://hnft.wtf/"
            />
          </Flex>
          {/* <Flex
            css={{
              flexDirection: 'row',
              gap: '12px',
              '@media (max-width: 960px)': {
                flexDirection: 'column', // Stack on mobile
                width: '100%', // Take 100% of screen on mobile
              },
              width: '100%', // Ensure it takes 100% of the screen width
            }}
          >
            {/* Second row of AssetFrame components 
            <AssetFrame
              imgSrc="/EmojiCobalt.png"
              mainText="Leaderboard"
              subText="Emblem.Finance"
              link="https://emblem.finance/createcurated"
            />
            <AssetFrame
              imgSrc="/EmojiCobalt.png"
              mainText="Bulk Mint"
              subText="Emblem.Finance"
              link="https://emblem.finance/activity"
            />
            <AssetFrame
              imgSrc="/EmojiCobalt.png"
              mainText="Vaultpad"
              subText="Emblem.Finance"
              link="https://emblem.finance/vaults"
            />
          </Flex> */}
        </Flex>
      </Box>
    </Flex>
  )
}

export default AppSection
