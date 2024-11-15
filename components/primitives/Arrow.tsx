import { Box, Flex, Text } from 'components/primitives'
import RightArrow from 'components/icons/RightArrow'

const FrameComponent = ({ text, href }: { text: string; href: string }) => {
  return (
    <Box
      as="a"
      href={href}
      css={{
        transition: 'all 0.3s ease-in-out',
        textDecoration: 'none',
        '&:hover': {
          transform: 'scale(1.05)',
          color: 'blue',
        },
      }}
    >
      <Flex
        css={{
          position: 'relative',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '8px',
          textAlign: 'left',
          fontSize: '14px',
          fontFamily: '$body',
        }}
      >
        <Text
          style="h4"
          as="h4"
          css={{
            position: 'relative',
            fontWeight: '500',
            background: 'linear-gradient(0deg, #B0AAA1 0%, #F2E9DB 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            WebkitTextStroke: '1px $mithril',
          }}
        >
          {text}
        </Text>
        <Box
          as={RightArrow}
          css={{
            width: '16px',
            height: '16px',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        />
      </Flex>
    </Box>
  )
}

export default FrameComponent
