import { NextPage } from 'next'
import { Flex, Box, Text, Button } from '../primitives'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface AppCarouselProps {
  titleText: string
  buttonText: string
  buttonLink: string
}

const SectionHeader: NextPage<AppCarouselProps> = ({
  titleText,
  buttonText,
  buttonLink,
}) => {
  return (
    <Flex>
      <Box
        css={{
          width: '100%',
          flexDirection: 'column',
          gap: '54px',
          '@media(max-width: 750px)': { gap: '27px' },
        }}
      >
        <Flex
          css={{
            alignSelf: 'stretch',
            justifyContent: 'space-between',
            gap: '20px',
            width: '100%',
          }}
        >
          <Text
            style="h1"
            css={{
              fontSize: '32px',
              lineHeight: '120%',
              flex: '1',
            }}
          >
            {titleText}
          </Text>
          <Link href={buttonLink} passHref>
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
                marginLeft: 'auto',
              }}
            >
              {buttonText}
            </Button>
          </Link>
        </Flex>
      </Box>
    </Flex>
  )
}

export default SectionHeader
