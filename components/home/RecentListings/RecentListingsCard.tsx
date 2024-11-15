import { useEffect, useState } from 'react'
import { useDynamicTokens } from '@reservoir0x/reservoir-kit-ui'
import { Box, Flex, FormatCryptoCurrency, Text } from 'components/primitives'
import { Listing } from 'types/Listings'
import { useMarketplaceChain } from 'hooks'
import Link from 'next/link'
import axios from 'axios'

type RecentListingsCardProps = {
  listing: Listing
}

export const RecentListingsCard: React.FC<RecentListingsCardProps> = ({
  listing,
}) => {
  const [bannerImage, setBannerImage] = useState<string>('/SteelVault.png')
  const marketplaceChain = useMarketplaceChain()

  if (!listing) return null

  let tokenQuery: Parameters<typeof useDynamicTokens>['0'] = {
    tokenSetId: listing?.tokenSetId ? listing?.tokenSetId : undefined,
    includeLastSale: true,
  }
  

  const { data: tokens } = useDynamicTokens(tokenQuery)
  const token = tokens[0]?.token
  const tokenPrice = tokens[0]?.market?.floorAsk?.price?.amount?.decimal ? tokens[0]?.market?.floorAsk?.price?.amount?.decimal: '-' 
  const collection = token?.collection

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await axios.get(token?.image as string)
        if (response.data) {
          setBannerImage(token?.image as string)
        } else {
          console.error('Failed to fetch data from API')
        }
      } catch (error) {
        console.error('Error fetching data from API:', error)
      }
    }
    fetchDataFromApi()
  }, [token?.image])

  return (
    <Link
      href={`/${marketplaceChain.routePrefix}/asset/${collection?.id}:${token?.tokenId}`}
    >
      <Flex
        direction="column"
        className="actions-card"
        css={{
          flex: '0 0 auto', // This prevents cards from shrinking
          borderRadius: 0,
          cursor: 'pointer',
          background: '$grey90',
          $$shadowColor: '$colors$panelShadow',
          boxShadow: '0px 0px 12px 0px $$shadowColor',
          p: 0,
          border: '4px solid $greycool',
          scrollSnapAlign: 'start',
          marginRight: '10px'
        }}
      >
        <Flex
          css={{
            mb: '0px',
            width: '100%',
            height: '100%',
            justifyContent: 'center'
          }}
        >
          <Flex
            css={{
              width: '100%',
              border: '6px solid $mithrilSteel',
            }}
          >
            <img
              src={bannerImage as string}
              alt={collection?.name as string}
              style={{
                objectFit: 'cover',
                borderRadius: 0,
                width: '100%',
                height: '284px',
              }}
            />
          </Flex>
        </Flex>
        <Flex
          direction="column"
          css={{
            width: '100%',
            // height: '100%',
          }}
        >
          <Box
            css={{
              maxWidth: 355,
              lineHeight: 1.5,
              fontSize: 16,
              flex: 1,
              fontWeight: 400,
              display: '-webkit-box',
              color: '$gray80',
              fontFamily: '$body',
              WebkitLineClamp: 3,
              padding: '16px 12px',
              WebkitBoxOrient: 'vertical',
              gap: 6,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              '& a': {
                fontWeight: 500,
                cursor: 'pointer',
                textDecoration: 'underline',
              },
            }}
          >
            <Flex
              align="center"
              css={{
                width: 'fit-content',
              }}
            >
              <Text style="h6" as="h6" ellipsify>
                {token?.name ? truncate(token?.name, 22) : '-'}
              </Text>
            </Flex>
            <Text style="subtitle2" color="subtle" as="p">
              {collection?.name ? truncate(collection?.name, 25) : '-'}
            </Text>
            <Text style="subtitle2" color="subtle" as="p">
              Listed Price: {tokenPrice ? truncate(tokenPrice.toString(), 18) + 'ETH' : '-'}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Link>
  )
}

const truncate = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str
  }

  return `${str.slice(0, maxLength - 3)} ....`
}
