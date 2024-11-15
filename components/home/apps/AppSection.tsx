import { NextPage } from 'next'
import { Flex, Box, Text, Anchor } from '../../primitives' // Adjust the import path as needed.

type App1Type = {
  iconMain?: string
  appName?: string
  openHref: string
  openTarget?: string
}

const AppSection: NextPage<App1Type> = ({
  iconMain,
  appName,
  openHref,
  openTarget,
}) => {
  return (
    <Flex
      css={{
        flexDirection: 'row', // Ensures all elements are in one row on desktop
        alignItems: 'center',
        justifyContent: 'space-between', // Changed from flex-start to space-between to fill 100% width
        minWidth: '330px',
        maxWidth: '100%',
        textAlign: 'left',
        fontSize: '20px',
        color: '#fff',
        fontFamily: 'Nohemi',
        flex: 1,
        paddingRight: '16px',
      }}
    >
      <Anchor href={openHref} target={openTarget}>
        <Box
          as="img"
          src={iconMain}
          alt=""
          css={{ height: '60px', width: '59.7px', marginRight: '24px' }} // Added marginRight to move text 24px away from icon
          loading="eager"
        />
      </Anchor>
      <Flex
        css={{
          flexDirection: 'column', // Allows appName and Utilities to stack vertically
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexGrow: 1, // Allows this flex container to grow and fill the space between icon and button
          gap: '8px', // Adds padding between the two Text components
        }}
      >
        <Text
          style="h5"
          as="a"
          href={openHref}
          target={openTarget}
          css={{
            position: 'relative',
            lineHeight: '100%',
            fontSize: '20px',
          }}
        >
          {appName}
        </Text>
        <Text
          style="body1"
          as="a"
          href="https://emblem.finance"
          target={openTarget}
          css={{
            alignSelf: 'stretch',
            position: 'relative',
            textTransform: 'capitalize',
            paddingRight: '4px',
          }}
        >
          Emblem.Finance
        </Text>
      </Flex>
      <Box
        as="button"
        css={{
          cursor: 'pointer',
          border: '1px solid #f4ebdd',
          padding: '16px 21px 16px 19px',
          backgroundColor: 'transparent',
          height: '41px',
          borderRadius: '999px',
          background: 'linear-gradient(0deg, #2f2f32, #161617)',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          '&:hover': {
            backgroundColor: 'rgba(219, 209, 196, 0.09)',
            border: '1px solid #dbd1c4',
            boxSizing: 'border-box',
          },
        }}
      >
        <Anchor
          href={openHref}
          target={openTarget}
          style={{
            position: 'relative',
            fontSize: '14px',
            lineHeight: '8.5px',
            fontWeight: '500',
            color: '#fff',
            textDecoration: 'none',
          }}
        >
          Open
        </Anchor>
      </Box>
    </Flex>
  )
}

export default AppSection
