import React, { FC, useEffect } from 'react'
import Modal from 'react-modal'
import { Anchor, Box, Button, Flex, Grid, Text } from 'components/primitives'
import {
  useCollections,
  TokenMedia,
  useDynamicTokens,
} from '@reservoir0x/reservoir-kit-ui'
import { filter, max, over, pad, transform } from 'lodash'
import Image from 'next/image'
import { vaultActivity as VaultActivityType } from 'types/vaultActivity'
import LoadingSpinner from 'components/common/LoadingSpinner'
import backgroundImage from 'public/gold bg.png'
import heroCard from 'public/backgroundhack.png'
import logo from 'public/Vector.png'
import logo1 from 'public/Group1.png'
// import { text } from 'stream/consumers'

const customStyles = {
  content: {
    inset: '80px 15px',
    padding: '0',
    margin: '0 auto',
    maxWidth: '700px',
    backgroundColor: 'black',
    height: 'fit-content',
  },
}

Modal.setAppElement('#__next')

type Props = {
  isShow: boolean
  token: ReturnType<typeof useDynamicTokens>['data'][0] | undefined
  collection: NonNullable<ReturnType<typeof useCollections>['data']>[0] | null
  vaults: VaultActivityType[]
  isLoaded: boolean
  toggle(): void
}

export const AssetsModal: FC<Props> = ({
  isShow,
  token,
  collection,
  vaults = [],
  isLoaded,
  toggle,
}) => {
  useEffect(() => {
    let body = document.body
    if (isShow) {
      body.style.overflowY = 'hidden'
    } else {
      body.style.overflowY = 'scroll'
    }
  }, [isShow])

  return (
    <Modal
      isOpen={isShow}
      style={customStyles}
      onRequestClose={toggle} // This enables closing the modal when clicking outside
      shouldCloseOnOverlayClick={true} // Ensure that clicking the overlay will close the modal
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
            <Image src={logo} alt=""></Image>
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
            <Image src={logo1} alt={''}></Image>
          </Box>
          <Button
            css={{ fontSize: '12px', padding: '8px 13px ' }}
            onClick={toggle}
          >
            X
          </Button>
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
            {token?.token?.name
              ?.split('|')[0]
              ?.toLowerCase()
              .replace(/^\w/, (c) => c.toUpperCase()) ||
              ('#' + token?.token?.tokenId).toLowerCase()}
          </Text>
          <Text
            css={{ fontSize: '15px', marginBottom: '16px', fontWeight: 600 }}
          >
            {token?.token?.name?.split('|')[1]}
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
              zIndex: '1',
              borderRadius: '100%',
            }}
          >
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
              backgroundImage: `url(/backgroundsvg.svg)`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              width: '100%',
            }}
          >
            <TokenMedia
              token={token?.token}
              videoOptions={{ autoPlay: true, muted: true }}
              imageResolution={'large'}
              className="top-image"
              style={{
                width: '90%',
                height: 'auto',
                marginLeft: '5%',
                overflow: 'hidden',
                objectFit: 'contain',
                borderRadius: '10px',
                zIndex: 1,
                maxWidth: '500px',
              }}
            />
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
          {isLoaded &&
            `This Vault is Backed by ${vaults.length} ${
              token?.token?.name
                ?.split('|')[0]
                ?.toLowerCase()
                .replace(/^\w/, (c) => c.toUpperCase()) ||
              ('#' + token?.token?.tokenId).toLowerCase()
            }`}
        </Text>

        {/* sixth box  */}
        <Box
          css={{
            maxWidth: '470px',
            paddingInline: 10
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
            <Text>{collection?.description as string}</Text>
          </Flex>
        </Box>

        {/* tabs box  */}
        <Box
          css={{
            width: '100%',
            maxWidth: '470px',
            marginTop: '40px',
            fontSize: '24px',
            paddingInline: 10
          }}
        >
          <Flex
            css={{
              gap: '25px',
            }}
          >
            <Text
              css={{
                fontSize: '24px',
                cursor: 'pointer',
              }}
            >
              Backing Vault
            </Text>
            {/* <Text
              css={{
                fontSize: '24px',
                cursor: 'pointer',
              }}
            >
              Offers
            </Text> */}
          </Flex>
          <Box
            css={{
              backgroundColor: '#48484A',
              height: '0.5px',
              margin: '16px 0',
            }}
          ></Box>
          {isLoaded && Array.isArray(vaults) ? (
            vaults.map((item: VaultActivityType, index: number) => {
              return (
                <Box key={index}>
                  <Flex
                    css={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '14px',
                    }}
                  >
                    <Anchor
                      href={`https://emblem.finance/nft2?id=${item?.tokenId}`}
                      css={{
                        fontSize: '14px',
                        '&:hover': { color: '#DECAAB' },
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Text css={{ fontSize: '14px' }}>
                        Vault: {item?.tokenId}
                      </Text>
                    </Anchor>
                    <Anchor
                      href={item?.explorer}
                      color="primary"
                      css={{ '&:hover': { color: '#DECAAB' } }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Text css={{ fontSize: '14px' }}>Explorer</Text>
                    </Anchor>
                  </Flex>
                  <Box
                    css={{
                      backgroundColor: '#1C1C1E',
                      height: '0.5px',
                      margin: '16px 0',
                    }}
                  ></Box>
                </Box>
              )
            })
          ) : (
            <Flex
              css={{
                height: '200px',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LoadingSpinner />
            </Flex>
          )}
          <Flex
            css={{
              justifyContent: 'space-between',
              gap: '10px',
              marginBlockEnd: '20px',
              '@media (max-width: 550px)': {
                width: '100%',
                flexDirection: 'column',
                justifyContent: 'center'
              },
            }}
          >
            <Anchor
              href={`https://emblem.finance/nft2?id=${token?.token?.tokenId}`}
              target="_blank"
              rel="noopener noreferrer"
              css={{
                '@media (max-width: 550px)': {
                  width: '100%'
                },
              }}
            >
              <Button 
                type="button"
                css={{
                  display: 'flex',
                  justifyContent: 'center',
                  '@media (max-width: 550px)': {
                    width: '100%'
                  },
                }}  
              >
                Emblem.Finance
              </Button>
            </Anchor>
            <Anchor
              href={`https://opensea.io/assets/ethereum/${token?.token?.contract}/${token?.token?.tokenId}`}
              target="_blank"
              rel="noopener noreferrer"
              css={{
                '@media (max-width: 550px)': {
                  width: '100%'
                },
              }}
            >
              <Button 
                type="button"
                css={{
                  display: 'flex',
                  justifyContent: 'center',
                  '@media (max-width: 550px)': {
                    width: '100%'
                  },
                }}  
              >
                Opensea
              </Button>
            </Anchor>
            <Anchor
              href={`https://looksrare.org/collections/${token?.token?.contract}/${token?.token?.tokenId}`}
              target="_blank"
              rel="noopener noreferrer"
              css={{
                '@media (max-width: 550px)': {
                  width: '100%'
                },
              }}
            >
              <Button 
                type="button"
                css={{
                  display: 'flex',
                  justifyContent: 'center',
                  '@media (max-width: 550px)': {
                    width: '100%'
                  },
                }}  
              >
                LooksRare
              </Button>
            </Anchor>
          </Flex>
        </Box>
      </Flex>
    </Modal>
  )
}

export default AssetsModal
