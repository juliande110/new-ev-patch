import { useCollections, useTokens } from '@reservoir0x/reservoir-kit-ui'
import { Flex, Text, Tooltip, Box } from 'components/primitives'
import { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { truncateAddress } from 'utils/truncate'
import * as AssetsType from 'types/AssetsMetaData'
import axios from 'axios'

type Props = {
  token: ReturnType<typeof useTokens>['data'][0] | null
  collection: NonNullable<ReturnType<typeof useCollections>['data']>[0] | null
}

export const TokenTraits: FC<Props> = ({ token, collection }) => {
  const [traits, setTraits] = useState<AssetsType.Trait[]>([])

  const floorPrice = collection?.floorAsk?.price?.amount?.decimal
  const fetchDataFromApi = async () => {
    try {
      const response = await axios.get('/api/assetMetaData', {
        params: {
          contractAddress: token?.token?.contract,
          assetId: token?.token?.tokenId,
        },
      })
      if (response) {
        const assetsMetaData: AssetsType.AssetMetaData = await response.data
        const traits: AssetsType.Trait[] = assetsMetaData.attributes
        setTraits(traits)
      } else {
        console.error('Failed to fetch data from API')
      }
    } catch (error) {
      console.error('Error fetching data from API:', error)
    }
  }

  useEffect(() => {
    fetchDataFromApi()
  }, [])

  return (
    <Flex css={{ marginTop: '20px' }} direction="column">
      <Text
        css={{
          color: 'white',
          fontSize: '16px',
          fontWeight: 500,
          marginBottom: '24px',
        }}
      >
        Traits
      </Text>
      <Box
        css={{
          padding: '0.5px',
          backgroundColor: '#464b50',
          marginBottom: '24px',
        }}
      ></Box>
      <Flex
        className="hey"
        direction="row"
        wrap="wrap"
        css={{
          gap: '14px',
          // marginBottom: '24px',
        }}
      >
        {traits
          ? traits.map((trait: AssetsType.Trait, index: number) => {
              return (
                <TraitCard
                  key={index}
                  collectionId={collection?.id}
                  trait_type={trait.trait_type}
                  value={trait.value.toString()}
                  floorPrice={floorPrice?.toString()}
                />
              )
            })
          : 'No traints'}
      </Flex>
    </Flex>
  )
}

type TraitCardProps = {
  trait_type: string
  value: string
  floorPrice: string | undefined
  collectionId: string | undefined
}
const TraitCard: FC<TraitCardProps> = ({
  trait_type,
  value,
  floorPrice,
  collectionId,
}) => {
  const router = useRouter()

  return (
    <Box
      css={{
        backgroundColor: '$gray2',
        width: '31%',
        p: '$2',
        borderRadius: '1rem',
        boxSizing: 'border-box',
        cursor: 'pointer',
        '@media screen and (max-width: 600px)': {
          width: '47%',
        },
      }}
      onClick={() =>
        router.push(
          `/ethereum/collection/${collectionId}?attributes%5B${trait_type}%5D=${value}`,
        )
      }
    >
      <Flex direction="column" css={{ textAlign: 'center' }}>
        <Text>{trait_type}</Text>
        <Text>{value.length > 10 ? truncateAddress(value) : value}</Text>
        <Text>Floor: {floorPrice ? `${floorPrice}ETH` : '-'}</Text>
      </Flex>
    </Box>
  )
}
