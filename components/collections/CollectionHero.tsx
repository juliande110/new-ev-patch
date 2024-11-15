import React from 'react'
import Image1 from '../../images/CollectionHero.png'
import Image2 from '../../images/Steel Vault 1.png'
import { Box, Button, Flex, Text } from 'components/primitives'
import Image from 'next/image'

function CollectionHero() {
  return (
    // <Flex className='CollectionHero' css={{
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     minHeight: '440px',
    //     backgroundSize: 'cover',

    // }}>

    //   <Flex

    //     style={{
    //       width: '100%',
    //       flexDirection: 'column',
    //       maxWidth: '1440px',

    //     }}
    //   >
    //     <Flex
    //     css={{
    //         marginBottom: '30px',
    //         alignContent: 'center',
    //         gap: '20px',
    //     }}

    //     >
    //           <Image
    //     src={Image2} // The path is relative to the `public` directory
    //     alt="Description of Image"
    //   />
    //         <Text
    //         as={'h1'}
    //         css={{
    //             fontSize: '48px',
    //             lineHeight: '56px',
    //           }}>
    //       Rare Pepe
    //       </Text>
    //     </Flex>

    //     <Text

    //     css={{
    //         fontSize: '14px',
    //         maxWidth: '470px',
    //         marginBottom: '24px',
    //     }}>
    //       A customizable, on-brand marketplace for your community to trade all
    //       of your collections.
    //     </Text>

    //     <Box>
    //         <Text>Multichain Vault</Text>
    //     </Box>
    //     <Box>Timer</Box>
    //   </Flex>
    // </Flex>
    <Box
      className="CollectionHero"
      css={{
        maxWidth: '100%',
      }}
    >
      <Flex
        css={{
          backgroundRepeat: 'no-repeat',
          paddingTop: '160px',
          maxWidth: '1440px',
          height: '500px', // Changed height to 400px as per instructions
          // background:'linear-gradient(180deg, #000 0%, #7A7A7D)',
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
        {/* <Box
          css={{
            width: '100%',
            height: '100%',
            paddingTop: '40px',
            flexDirection: 'column',
            backgroundImage: 'url(/collectionsBack.png)',
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
        </Box> */}
      </Flex>
    </Box>
  )
}

export default CollectionHero
