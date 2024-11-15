import { Flex, Box, Text, Button, Anchor } from '../primitives'
import Image from 'next/image'

interface AssetFrameProps {
  imgSrc: string
  mainText: string
  subText: string
  link: string
}

const AssetFrame: React.FC<AssetFrameProps> = ({
  imgSrc,
  mainText,
  subText,
  link,
}) => {
  return (
    <Flex
      css={{
        flexDirection: 'row',
        gap: '20px',
        justifyContent: 'space-between',
        alignItems: 'center', // Added for vertical center alignment of all items including the button
        width: '100%',
        maxWidth: '1440px',
        paddingRight: '16px',
        paddingBottom: '12px',
        borderBottom: '1px solid #2F2F32', // Added grey line at the bottom of the whole frame
      }}
    >
      <Flex
        css={{
          alignItems: 'center',
          gap: '24px',
          flex: '1 0 auto',
        }}
      >
        <Box as="a" href={link}>
          <Image src={imgSrc} alt="" width={59.7} height={60} />
        </Box>
        <Flex css={{ flexDirection: 'column', gap: '12px', flex: '1' }}>
          <Box as="a" href={link}>
            <Text
              style="h3"
              css={{
                fontSize: '20px',

                lineHeight: '100%',
                fontWeight: '400',
              }}
            >
              {mainText}
            </Text>
          </Box>
          <Text
            css={{
              fontSize: '15px',
              lineHeight: '24px',
              textTransform: 'capitalize',
            }}
          >
            {subText}
          </Text>
        </Flex>
      </Flex>
      <Anchor
        href={link}
        target="_blank"
        css={{ textDecoration: 'none', color: 'var(--eclipse-light)' }}
      >
        <Button
          css={{
            cursor: 'pointer',
            border: '1px solid #F4EBDD',
            padding: '16px 20px',
            backgroundColor: 'transparent',
            height: '40px',
            borderRadius: '999px',
            background: 'linear-gradient(0deg, #2f2f32, #161617)',
            color: 'white',
          }}
        >
          Open
        </Button>
      </Anchor>
    </Flex>
  )
}

export default AssetFrame
