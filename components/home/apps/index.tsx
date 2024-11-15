import { NextPage } from 'next'
import { Flex, Box } from '../../primitives' // Adjusted the import path as needed.
import AppSection from './AppSection' // Assuming AppSection is already using primitives or does not need modification.

const Apps: NextPage = () => {
  return (
    <Box
      css={{
        alignSelf: 'stretch',
        display: 'flex',
        flexDirection: 'row', // Default to row for larger screens
        flexWrap: 'wrap',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        gap: '12px',
        width: '100%',
        padding: '0 24px', // Add padding to the sides to match the rest of the content

        // Media query for tablet screens and below
        '@media (max-width: 768px)': {
          flexDirection: 'column', // Stack vertically on smaller screens
          alignItems: 'center', // Center align the items for aesthetics
        },
      }}
    >
      <Flex
        css={{
          alignSelf: 'stretch', // This makes the Flex container stretch to the full width of its parent
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between', // Changed from 'flex-start' to 'space-between' to add auto gap between items
          gap: '12px',
          width: '100%', // Ensures it fills up the container

          '@media screen and (max-width: 1072px)': {
            display: 'grid',
            gridTemplateColumns: '2fr 2fr',
            gridGap: '40px',
          },
          '@media (max-width: 768px)': {
            display: 'flex',
          },
        }}
      >
        <Box css={{ flex: 1, minHeight: '100%' }}>
          <AppSection
            iconMain="/icon-main.svg"
            appName="Mint Vault"
            openHref="https://emblem.finance/createcurated"
            openTarget="_blank"
          />
        </Box>
        <Box css={{ flex: 1, minHeight: '100%' }}>
          <AppSection
            iconMain="/icon-main-1.svg"
            appName="My Vaults"
            openHref="https://emblem.finance/vaults"
            openTarget="_blank"
          />
        </Box>
        <Box css={{ flex: 1, minHeight: '100%' }}>
          <AppSection
            iconMain="/icon-main-2.svg"
            appName="Vaultpad"
            openHref="https://discord.gg/TrWu7mSuqj"
            openTarget="_blank"
          />
        </Box>
      </Flex>
    </Box>
  )
}

export default Apps
