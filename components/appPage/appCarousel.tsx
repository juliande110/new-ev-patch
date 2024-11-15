import React from 'react'
import { Box, Flex, Text } from 'components/primitives'
import { link } from 'fs'

interface SectionProps {
  backgroundImage: string
  title: string
  link?: string
}

const Section: React.FC<SectionProps> = ({ backgroundImage, title, link }) => (
  <Box
    as="a"
    href={link}
    css={{
      position: 'relative',
      width: '33.33%', // Changed to cover 33.33% of the screen width to fit 3 in a row
      height: '270px', // Changed height to 270px to match the new max height requirement
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: '20px',
      marginRight: '0px', // Changed to have no gap on the right, ensuring 33.33% width coverage
      border: '1px solid var(--Materials-Bronze, #A48A84)', // Added border with fallback color
      background:
        'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 33.7%, rgba(0, 0, 0, 0.50) 100%)', // Added background gradient
      ':last-child': {
        marginRight: '0px', // Ensure the last child also has no gap on the right
      },
      '@media screen and (max-width: 750px)': {
        width: '100%', // Ensure 100% width coverage on mobile
        marginRight: '0px', // Ensure no right margin on mobile for all images
      },
      ':hover': {
        opacity: '1', // Remove opacity on hover
      },
    }}
  >
    <Box
      css={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: '0.3',
        zIndex: '0',
        transition: 'opacity 0.3s ease', // Smooth transition for opacity change
      }}
    />
    <Flex
      css={{
        position: 'relative',
        zIndex: '1',
        flexDirection: 'column', // Ensures text elements stack on top of each other
      }}
    >
      <Text style="h5" css={{ color: '#FFF', marginBottom: '10px' }}>
        {title}
      </Text>
    </Flex>
  </Box>
)

const sectionsData = [
  {
    backgroundImage: '/native_create.webp',
    title: 'Native Vault Create ',
    link: 'https://github.com/EmblemCompany/emblem-vault-sdk',
  },
  {
    backgroundImage: '/native_mint.webp',
    title: 'Native Vault Mint',
    link: 'https://github.com/EmblemCompany/emblem-vault-sdk',
  },
  {
    backgroundImage: '/Native_unvault_.webp',
    title: 'Native Unvault',
    link: 'https://github.com/EmblemCompany/emblem-vault-sdk',
  },
  // Removed one item to make it only 3 items
]

const ResponsiveRow: React.FC = () => (
  <Flex
    css={{
      width: '100%', // Ensured Flex container also covers 100% of the screen width
      flexDirection: 'row', // Keep as row to fit all 3 in the same row
      flexWrap: 'nowrap', // Changed to nowrap to ensure all sections are in the same row
      gap: '12px', // Added 12px gap between each image
      '@media screen and (max-width: 750px)': {
        flexDirection: 'column', // Change to column on mobile for better display
        gap: '12px', // Ensure gap is also applied in mobile view
      },
    }}
  >
    {sectionsData.map((section, index) => (
      <Section key={index} {...section} />
    ))}
  </Flex>
)

export default ResponsiveRow
