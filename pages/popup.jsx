import React from 'react'
import { Anchor, Box, Button, Flex, Grid, Text } from 'components/primitives'
import { filter, max, over, pad, transform } from 'lodash'
import Image from 'next/image'
import backgroundImage from 'public/gold bg.png'
import heroCard from 'public/ILLUMINATIPE 1.png'
import logo from 'public/Vector.png'
import logo1 from 'public/Group1.png'
import { css } from '@stitches/react'
// import { text } from 'stream/consumers'

// pages/popup.jsx

function popup() {
  return (
    <Box
      css={{
        width: '700px',
        maxHeight: '1811px',
        margin: '0 auto',
        fontSize: '12px',
        // padding: '20px 24px',
        fontWeight: 500,
        backgroundColor: 'black',
        transform: 'scale(0.9)',
        // outlineOffset: '-20px',
        // outline-offset: -10px;
      }}
    >
      {/* first box  */}
      <Flex
        css={{
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundImage: 'linear-gradient(0deg, #2F2F32 30%, #161617 100%);',
          padding: '19px',
          border: '1px solid white',
        }}
      >
        <Text css={{ fontSize: '12px' }}>Vault Network</Text>
        <Flex
          css={{
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Box
            css={{
              maxWidth: '14px',
            }}
          >
            <Image src={logo}></Image>
          </Box>
          <Text css={{ fontSize: '12px' }}>Ethereum Network</Text>
        </Flex>
      </Flex>

      <Flex
        css={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '1px solid #DECAAB',
        }}
      >
        {/* second box  */}
        <Flex
          css={{
            justifyContent: 'space-between',
            // border: '1px solid #DECAAB',
            width: '100%',
            alignItems: 'center',
            padding: '20px 24px',
            marginBottom: '20px',
          }}
        >
          <Box>
            <Image src={logo1}></Image>
          </Box>
          <Button css={{ fontSize: '12px', padding: '8px 13px ' }}>X</Button>
        </Flex>

        {/* third box  */}
        <Flex
          css={{
            // justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Text
            css={{
              fontSize: '48px',
              marginBottom: '16px',
              letterSpacing: '-3px',
            }}
          >
            ILLUMINATIPEPE
          </Text>
          <Text
            css={{ fontSize: '15px', marginBottom: '16px', fontWeight: 600 }}
          >
            Series 12 Card 33
          </Text>
        </Flex>

        {/* fourth image box  */}

        <Flex
          css={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            css={{
              position: 'absolute',
              filter: 'blur(100px)',
              // opacity: '0.5',
              transform: 'scale(0.9)',
              zIndex: '1',
              borderRadius: '100%',
              // overflow: 'auto',
            }}
          >
            {/* <Image src={heroCard} alt="a"></Image> */}
            <Box
              className="#FFD700"
              css={{
                backgroundColor: '#FFD700',
                width: '400px',
                height: '590px',
              }}
            ></Box>
          </Box>
          <Box
            css={{
              position: 'absolute',
              zIndex: '20',
            }}
          >
            <Image src={heroCard} alt="a"></Image>
          </Box>
          <Box
            css={{
              zIndex: '10',
            }}
          >
            <Image src={backgroundImage} alt="a"></Image>
          </Box>
        </Flex>

        {/* fifth box  */}
        <Text
          css={{
            marginBottom: '16px',
            marginTop: '16px',
            fontWeight: 600,
          }}
        >
          This Vault is Backed by 9 Illuminatipepe{' '}
        </Text>

        {/* sixth box  */}
        <Box
          css={{
            maxWidth: '470px',
          }}
        >
          <Text css={{ fontWeight: 600, fontSize: '16px' }}>Details</Text>
          <Box
            css={{
              backgroundColor: '#48484A',
              height: '0.5px',
              margin: '16px 0',
            }}
          ></Box>
          <Flex
            css={{
              flexDirection: 'column',
            }}
          >
            <Box
              css={{
                marginBottom: '12px',
              }}
            >
              <Text>Curated Rare PP Collection</Text>
            </Box>
            <Box
              css={{
                marginBottom: '24px',
              }}
            >
              <Text>
                This vault contains one Illuminatiipepe from the Etherum Network
              </Text>
            </Box>
            <Text>
              This curated Emblem Vault Contains 1 Rare Pepe NFT that was minted
              on Bitcoin using the Counterparty protocol. Rare Pepe is a
              collection of 1,774 unique cards with carying designs and rarities
              that were created by more than 300 artists from 2016 to 2018.
            </Text>
          </Flex>
        </Box>

        {/* tabs box  */}

        <Box
          css={{
            width: '100%',
            maxWidth: '470px',
            marginTop: '40px',
            fontSize: '24px',
          }}
        >
          <Box>
            <Text
              css={{
                fontSize: '24px',
                letterSpacing: '-3px',
              }}
            >
              Backing Vault
            </Text>
          </Box>
          <Box
            css={{
              backgroundColor: '#48484A',
              height: '0.5px',
              margin: '16px 0',
            }}
          ></Box>
          {/* -- */}

          <Box>
            <Flex
              css={{
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '14px',
              }}
            >
              <Text css={{ fontSize: '14px' }}>Vault: 91243890124</Text>
              <Text css={{ fontSize: '14px' }}>Explorer</Text>
            </Flex>
            <Box
              css={{
                backgroundColor: '#1C1C1E',
                height: '0.5px',
                margin: '16px 0',
              }}
            ></Box>
          </Box>
          <Box>
            <Flex
              css={{
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '14px',
              }}
            >
              <Text css={{ fontSize: '14px' }}>Vault: 91243890124</Text>
              <Text css={{ fontSize: '14px' }}>Explorer</Text>
            </Flex>
            <Box
              css={{
                backgroundColor: '#1C1C1E',
                height: '0.5px',
                margin: '16px 0',
              }}
            ></Box>
          </Box>
          <Box>
            <Flex
              css={{
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '14px',
              }}
            >
              <Text css={{ fontSize: '14px' }}>Vault: 91243890124</Text>
              <Text css={{ fontSize: '14px' }}>Explorer</Text>
            </Flex>
            <Box
              css={{
                backgroundColor: '#1C1C1E',
                height: '0.5px',
                margin: '16px 0',
              }}
            ></Box>
          </Box>
          <Box>
            <Flex
              css={{
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '14px',
              }}
            >
              <Text css={{ fontSize: '14px' }}>Vault: 91243890124</Text>
              <Text css={{ fontSize: '14px' }}>Explorer</Text>
            </Flex>
            <Box
              css={{
                backgroundColor: '#1C1C1E',
                height: '0.5px',
                margin: '16px 0',
              }}
            ></Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default popup
