import { useCollections, useDynamicTokens } from '@reservoir0x/reservoir-kit-ui'
import { Box, Flex, FormatCryptoCurrency, Text } from 'components/primitives'
import { Activity } from 'types/RecentlyVaults'
import { useMarketplaceChain } from 'hooks'
import Link from 'next/link'

type FeaturedCardsProps = {
  asset: Activity
  loading?: boolean
}

export const RecentlyVaultedCard: React.FC<FeaturedCardsProps> = ({
  asset,
  loading,
}) => {
  const marketplaceChain = useMarketplaceChain()

  if (!asset) return null

  const { data: collections, isValidating: isTrendingCollectionsValidating } =
    useCollections({
      name: asset?.curatedCollectionName,
      sortBy: 'updatedAt',
      limit: 100,
    })
  const collection = collections.find((collection) => {
    const curatedCollectionName =
      asset?.curatedCollectionName === 'Rare Pepe'
        ? 'Rare Pepe (2016 - 2018)'
        : asset?.curatedCollectionName
    return collection?.name === curatedCollectionName
  })
  return <VaultCard parentCollection={collection} asset={asset} />
}

type Props = {
  parentCollection:
    | NonNullable<ReturnType<typeof useCollections>['data']>[0]
    | undefined
  asset: Activity
}
const VaultCard: React.FC<Props> = ({ parentCollection, asset }) => {
  const marketplaceChain = useMarketplaceChain()
  const { data: tokens } = useDynamicTokens({
    collection: parentCollection?.id,
    tokenName: asset?.assetName,
  })

  const token = tokens[0]?.token

  return (
    <Link
      href={`/${marketplaceChain.routePrefix}/asset/${parentCollection?.id}:${token?.tokenId}`}
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
              border: '6px solid $mithrilSteel',
            }}
          >
            <img
              src={
                asset?.assetImage
                  ? asset?.assetImage
                  : ('SteelVault.png' as string)
              }
              alt={asset.assetName as string}
              style={{
                width: '100%',
                height: '284px',
                objectFit: 'cover',
                borderRadius: 0,
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
                {asset?.assetName ? truncate(asset?.assetName, 25) : '-'}
              </Text>
            </Flex>
            <Flex direction="column">
              <Box css={{ padding: '' }}>
                <Text style="subtitle2" color="subtle" as="p">
                  {asset?.curatedCollectionName
                    ? truncate(asset?.curatedCollectionName, 25)
                    : '-'}
                </Text>
              </Box>
            </Flex>
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
