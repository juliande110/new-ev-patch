import {
  faArrowLeft,
  faChevronDown,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import {
  TokenMedia,
  useAttributes,
  useBids,
  useCollections,
  useDynamicTokens,
  useListings,
  useTokenActivity,
  useUserTokens,
} from '@reservoir0x/reservoir-kit-ui'
import { paths } from '@reservoir0x/reservoir-sdk'
import { spin } from 'components/common/LoadingSpinner'
import { OpenSeaVerified } from 'components/common/OpenSeaVerified'
import Layout from 'components/Layout'
import { Anchor, Box, Button, Flex, Text } from 'components/primitives'
import { PriceData } from 'components/token/PriceData'
// import RarityRank from 'components/token/RarityRank'
import { TokenActions } from 'components/token/TokenActions'
import { TokenInfo } from 'components/token/TokenInfo'
import { ToastContext } from 'context/ToastContextProvider'
import { useENSResolver, useMarketplaceChain, useMounted } from 'hooks'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NORMALIZE_ROYALTIES } from 'pages/_app'
import { useContext, useEffect, useState } from 'react'
import { jsNumberForAddress } from 'react-jazzicon'
import Jazzicon from 'react-jazzicon/dist/Jazzicon'
import { useMediaQuery } from 'react-responsive'
import supportedChains, { DefaultChain } from 'utils/chains'
import fetcher from 'utils/fetcher'
import { DATE_REGEX, timeTill } from 'utils/till'
import titleCase from 'utils/titleCase'
import { useAccount } from 'wagmi'
import { Head } from 'components/Head'
import { OffersTable } from 'components/token/OffersTable'
import { ListingsTable } from 'components/token/ListingsTable'
import IconButton from 'components/buttons/IconButton'
import StatBox from 'components/emblem/StatBox'
import AssetsModal from 'components/modals/assetsDetailModal'
import OwnersModal from 'components/modals/ownersDetailModal'
import { vaultActivity as VaultActivityType } from 'types/vaultActivity'
import { Owner } from 'types/OwnersData'
import axios from 'axios'

import backgroundImage from 'images/TEST_Vault.png'
import vieIcon from 'images/Buttons.png'
import Image from 'next/image'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

type ActivityTypes = Exclude<
  NonNullable<
    NonNullable<
      Exclude<Parameters<typeof useTokenActivity>['1'], boolean>
    >['types']
  >,
  string
>

const IndexPage: NextPage<Props> = ({ assetId, ssr }) => {
  const assetIdPieces = assetId ? assetId.toString().split(':') : []
  let collectionId = assetIdPieces[0]
  const id = assetIdPieces[1]
  const router = useRouter()
  const { addToast } = useContext(ToastContext)
  const account = useAccount()
  const isMounted = useMounted()
  const isSmallDevice = useMediaQuery({ maxWidth: 1000 }) && isMounted
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [tabValue, setTabValue] = useState('info')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const [activityFiltersOpen, setActivityFiltersOpen] = useState(true)
  const [activityTypes, setActivityTypes] = useState<ActivityTypes>([])
  const [activityNames, setActivityNames] = useState<string[]>([])
  const [assetsModalShow, setAssetsModalShow] = useState<boolean>(false)
  const [ownersModalShow, setOwnersModalShow] = useState<boolean>(false)
  const [vaultActivitise, setVaultActivitise] = useState<VaultActivityType[]>(
    []
  )
  const [owers, setOwners] = useState<Owner[] | undefined>(undefined)
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const { proxyApi } = useMarketplaceChain()
  const contract = collectionId ? collectionId?.split(':')[0] : undefined

  const { data: tokens, mutate } = useDynamicTokens(
    {
      tokens: [`${contract}:${id}`],
      includeAttributes: true,
      includeTopBid: true,
      includeQuantity: true,
    },
    {
      fallbackData: [ssr.tokens ? ssr.tokens : {}],
    }
  )

  const token = tokens && tokens[0] ? tokens[0] : undefined
  const is1155 = token?.token?.kind === 'erc1155'

  const { data: collections } = useCollections(
    {
      includeSecurityConfigs: true,
      includeMintStages: true,
      id: token?.token?.collection?.id,
    },
    {
      fallbackData: [ssr.collection ? ssr.collection : {}],
    }
  )
  const collection = collections && collections[0] ? collections[0] : null

  const { data: userTokens } = useUserTokens(
    is1155 ? account.address : undefined,
    {
      tokens: [`${contract}:${id}`],
      limit: 20,
    }
  )

  const { data: offers } = useBids({
    token: `${token?.token?.collection?.id}:${token?.token?.tokenId}`,
    includeRawData: true,
    sortBy: 'price',
    limit: 1,
  })

  const { data: listings } = useListings({
    token: `${token?.token?.collection?.id}:${token?.token?.tokenId}`,
    includeRawData: true,
    sortBy: 'price',
    limit: 1,
  })

  const offer = offers && offers[0] ? offers[0] : undefined
  const listing = listings && listings[0] ? listings[0] : undefined

  const attributesData = useAttributes(collectionId)

  let countOwned = 0
  if (is1155) {
    countOwned = Number(userTokens?.[0]?.ownership?.tokenCount || 0)
  } else {
    countOwned =
      token?.token?.owner?.toLowerCase() === account?.address?.toLowerCase()
        ? 1
        : 0
  }

  const isOwner = countOwned > 0
  const owner = isOwner ? account?.address : token?.token?.owner
  const { displayName: ownerFormatted } = useENSResolver(token?.token?.owner)

  const tokenName = `${token?.token?.name || `#${token?.token?.tokenId}`}`

  const hasAttributes =
    token?.token?.attributes && token?.token?.attributes.length > 0

  const trigger = (
    <Button
      color="gray3"
      size="small"
      css={{
        justifyContent: 'space-between',
        width: '336px',
        px: '$2',
        py: '$2',
      }}
    >
      {isSmallDevice ? null : (
        <Text style="body1">
          {activityNames.map(titleCase).join(', ') || 'All Events'}
        </Text>
      )}
      <Text css={{ color: '$slate10' }}>
        <FontAwesomeIcon icon={faChevronDown} width={16} height={16} />
      </Text>
    </Button>
  )

  useEffect(() => {
    let tab = tabValue
    const hasAttributesTab = isMounted && isSmallDevice && hasAttributes
    if (hasAttributesTab) {
      tab = 'attributes'
    } else {
      tab = 'info'
    }

    let deeplinkTab: string | null = null
    if (typeof window !== 'undefined') {
      const params = new URL(window.location.href).searchParams
      deeplinkTab = params.get('tab')
    }

    if (deeplinkTab) {
      switch (deeplinkTab) {
        case 'attributes':
          if (hasAttributesTab) {
            tab = 'attributes'
          }
          break
        case 'info':
          tab = 'info'
          break
        case 'activity':
          tab = 'activity'
          break
        case 'listings':
          tab = 'listings'
          break
        case 'offers':
          tab = 'offers'
          break
      }
    }
    setTabValue(tab)
  }, [isSmallDevice])

  useEffect(() => {
    const updatedUrl = new URL(`${window.location.origin}${router.asPath}`)
    updatedUrl.searchParams.set('tab', tabValue)
    router.replace(updatedUrl, undefined, {
      shallow: true,
    })
  }, [tabValue])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/vaultActivity', {
          params: {
            tokenId: token?.token?.tokenId,
          },
        })
        if (response) setVaultActivitise(response?.data as VaultActivityType[])
      } catch (error) {
        console.error('Failed to fetch stats', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/getOwners', {
          params: {
            token: `${collectionId}:${token?.token?.tokenId}`,
          },
        })

        if (response) setOwners(response.data)
      } catch (error) {
        console.error('Failed to fetch stats', error)
      }
      setIsLoaded(true)
    }

    fetchData()
  }, [])

  const pageTitle = token?.token?.name
    ? token.token.name
    : `${token?.token?.tokenId} - ${token?.token?.collection?.name}`

  const toggle = () => {
    return setAssetsModalShow(!assetsModalShow)
  }

  const ownersModalToggle = () => {
    return setOwnersModalShow(!ownersModalShow)
  }

  const copyLink = async () => {
    try {
      const pageLink = `${window.location.origin}${router.asPath}`
      await navigator.clipboard.writeText(pageLink)
      setIsCopied(true)
    } catch (err) {
      console.error('Failed to copy link: ', err)
    }
  }

  return (
    <Layout>
      <Head
        ogImage={token?.token?.image || collection?.banner}
        title={pageTitle}
        description={collection?.description as string}
      />
      {/* Banner */}
      <Flex
        css={{
          alignItems: 'center',
          background:
            'var(--Moods-Green, linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 45.32%), linear-gradient(16deg, #2E504A 11.11%, #101A23 88.89%))',
        }}
      >
        <Flex
          css={{
            width: '1440px',
            justifyContent: 'flex-start',
            marginRight: 'auto',
            marginLeft: 'auto',
          }}
        >
          <Flex
            className="debug"
            justify="center"
            css={{
              maxWidth: '1440px',
              justifyContent: 'flex-start',
              mt: 10,
              pb: 15,
              marginLeft: 'auto',
              marginRight: 'auto',
              gap: 20,
              flexDirection: 'column',
              alignItems: 'center',

              '@md': {
                mt: 48,
                // px: '$3',
                flexDirection: 'row',
                gap: 40,
                alignItems: 'center',
              },
              '@lg': {
                gap: 80,
              },
            }}
          >
            <Box
              css={{
                alignItems: 'center',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Flex
                direction="column"
                css={{
                  maxWidth: '100%',
                  flex: 1,
                  position: 'relative',
                  '@sm': {
                    '>button': {
                      height: 0,
                      opacity: 0,
                      transition: 'opacity .3s',
                    },
                  },
                  ':hover >button': {
                    opacity: 1,
                    transition: 'opacity .3s',
                  },
                }}
              >
                <Box
                  css={{
                    '@sm': {
                      button: {
                        height: 0,
                        opacity: 0,
                        transition: 'opacity .3s',
                      },
                    },
                    ':hover button': {
                      opacity: 1,
                      transition: 'opacity .3s',
                    },
                  }}
                >
                  {/* image here  */}
                  <div className="image-container">
                    <Image
                      src={backgroundImage}
                      alt="Picture of the author"
                      className="background-image"
                    />

                    <TokenMedia
                      token={token?.token}
                      videoOptions={{ autoPlay: true, muted: true }}
                      imageResolution={'large'}
                      className="top-image"
                      style={{
                        width: '100%',
                        height: '90%',
                        overflow: 'hidden',
                        position: 'absolute',
                        top: '40px',
                        objectFit: 'contain',
                        borderRadius: '10px',
                      }}
                      onRefreshToken={() => {
                        mutate?.()
                        addToast?.({
                          title: 'Refresh Metadata',
                          description:
                            'Request to refresh this token was accepted.',
                        })
                      }}
                    />
                  </div>
                </Box>
              </Flex>
              <Box
                css={{
                  marginTop: '20px',
                  '@bp600': {
                    marginTop: '10px',
                    marginBottom: '10px',
                    textAlign: 'center',
                  },
                }}
                onClick={toggle}
              >
                <Image
                  data-tooltip-id="assets-state"
                  src={vieIcon}
                  alt="icon"
                />
              </Box>
            </Box>

            {/* left texet section  */}
            <Flex
              direction="column"
              css={{
                marginTop: '20px',
                '@bp600': {
                  flex: 1,
                  px: '$3',

                  marginTop: '-60px',
                },
              }}
            >
              <Flex
                justify="between"
                align="center"
                css={{
                  mb: 20,

                  maxWidth: '100%',
                }}
              >
                <Flex align="center" css={{ mr: '$2', gap: '$2' }}>
                  <Link
                    href={`/${router.query.chain}/collection/${token?.token?.collection?.id}`}
                    legacyBehavior={true}
                  >
                    <Anchor
                      color="primary"
                      css={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '$2',
                      }}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} height={16} />
                      <Text
                        css={{
                          color: 'inherit',
                          background:
                            'var(--Materials-Steel, linear-gradient(0deg, #EBEBFC 0%, #A2A3AE 100%))',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          fontSize: '15px',
                          fontStyle: 'normal',
                          fontWeight: 500,
                          lineHeight: '100%', // 15px
                        }}
                        style="labelReg"
                        ellipsify
                      >
                        {token?.token?.collection?.name}
                      </Text>
                    </Anchor>
                  </Link>
                  <OpenSeaVerified
                    openseaVerificationStatus={
                      collection?.openseaVerificationStatus
                    }
                  />
                </Flex>
                {/* Refresh Button */}
                <Button
                  onClick={(e) => {
                    if (isRefreshing) {
                      e.preventDefault()
                      return
                    }
                    setIsRefreshing(true)
                    fetcher(
                      `${process.env.NEXT_PUBLIC_RESERVOIR_URL}/tokens/refresh/v2`,
                      undefined,
                      {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          tokens: [`${contract}:${id}`],
                        }),
                      }
                    )
                      .then(({ data, response }) => {
                        if (response.status === 200) {
                          addToast?.({
                            title: 'Refresh Metadata',
                            description:
                              'Request to refresh this token was accepted.',
                          })
                        } else {
                          throw data
                        }
                        setIsRefreshing(false)
                      })
                      .catch((e) => {
                        const ratelimit = DATE_REGEX.exec(e?.message)?.[0]

                        addToast?.({
                          title: 'Refresh Metadata failed',
                          description: ratelimit
                            ? `This token was recently refreshed. The next available refresh is ${timeTill(
                                ratelimit
                              )}.`
                            : `This token was recently refreshed. Please try again later.`,
                        })

                        setIsRefreshing(false)
                        throw e
                      })
                  }}
                  disabled={isRefreshing}
                  color="gray3"
                  size="xs"
                  css={{ cursor: isRefreshing ? 'not-allowed' : 'pointer' }}
                >
                  <Box
                    css={{
                      animation: isRefreshing
                        ? `${spin} 1s cubic-bezier(0.76, 0.35, 0.2, 0.7) infinite`
                        : 'none',
                    }}
                  >
                    <FontAwesomeIcon icon={faRefresh} width={16} height={16} />
                  </Box>
                </Button>
              </Flex>
              <Flex align="center" css={{ gap: '$2' }}>
                <Text
                  style="h1"
                  css={{
                    background:
                      'var(--Materials-Steel, linear-gradient(0deg, #EBEBFC 0%, #A2A3AE 100%))',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: '24px',

                    '@bp700': {
                      fontSize: '48px',
                    },
                  }}
                >
                  {token?.token?.name
                    ?.split('|')[0]
                    ?.toLowerCase()
                    .replace(/^\w/, (c) => c.toUpperCase()) ||
                    ('#' + token?.token?.tokenId).toLowerCase()}
                </Text>
                {/* <Text
                  color="subtle"
                  style="h1"
                  ellipsify
                  css={{
                    decoration: 'none',
                    color: '$gray7',

                    pr: '$1',
                    fontSize: '24px',

                    '@bp600': {
                      fontSize: '48px',
                    },
                  }}
                >
                  {token?.token?.name?.split('|')[1] ||
                    '#' + token?.token?.tokenId}
                </Text> */}
              </Flex>
              {token && (
                <>
                  {!is1155 && owner && (
                    <Flex align="center" css={{ mt: '$2' }}>
                      <Text style="subtitle3" color="subtle" css={{ mr: '$2' }}>
                        Owner
                      </Text>
                      <Jazzicon
                        diameter={16}
                        seed={jsNumberForAddress(owner || '')}
                      />
                      <Link href={`/portfolio/${owner}`} legacyBehavior={true}>
                        <Anchor
                          color="primary"
                          weight="normal"
                          css={{ ml: '$1' }}
                        >
                          {isMounted ? ownerFormatted : ''}
                        </Anchor>
                      </Link>
                    </Flex>
                  )}
                  {/* <RarityRank
                    token={token}
                    collection={collection}
                    collectionAttributes={attributesData?.data}
                  /> */}
                  <PriceData token={token} />
                  {isMounted && (
                    <TokenActions
                      token={token}
                      collection={collection}
                      offer={offer}
                      listing={listing}
                      isOwner={isOwner}
                      mutate={mutate}
                      account={account}
                    />
                  )}
                </>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Flex
        justify="center"
        align="center"
        direction={{ '@initial': 'column', '@md': 'row' }}
      >
        <Flex
          css={{
            width: '100%',
            maxWidth: '1440px',
            background: 'linear-gradient(0deg, #2f2f32, #161617)',
            border: '1px solid #EBEBFC',
            padding: '24px 20px',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'column',
            '@md': {
              flexDirection: 'row',
              padding: '24px 80px',
            },
            bp600: {
              padding: '24px 40px',
            },
          }}
        >
          <Flex
            css={{
              gap: '40px',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            <Flex
              onClick={ownersModalToggle}
              css={{ flexDirection: 'column', gap: 7, cursor: 'pointer' }}
            >
              <Text>Owners</Text>
              <Text>{owers ? owers.length.toLocaleString() : '-'}</Text>
            </Flex>
            <StatBox title="Vaulted" value={token?.token?.supply} />
            <StatBox
              title="Type"
              value={
                collection?.contractKind
                  ? formatTokenType(collection.contractKind)
                  : '-'
              }
            />
          </Flex>
          <Flex
            css={{
              gap: '12px',
              // width: '100%',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: '35px',

              // '@md': { flexDirection: 'row' },
              '@bp600': {
                marginTop: '0px',
              },
            }}
          >
            <IconButton
              onClick={copyLink}
              iconSrc="/Icon/CopyIcon.svg"
              buttonText={isCopied ? 'Copied' : 'Copy Link'}
              hoverTextColor="#000000"
            />
          </Flex>
        </Flex>
      </Flex>

      <Flex
        css={{
          maxWidth: '1440px',
          margin: '0 auto',
          mb: '160px',
          flexDirection: 'row',
        }}
      >
        <Flex
          css={{
            flexDirection: 'column',
            '@bp1000': {
              flexDirection: 'row',
              width: '100%',
              maxWidth: '1440px',
              gap: '13px',
              height: '100%',
            },
          }}
        >
          {/* left section  */}
          <Flex
            css={{
              width: '100%',
              '@bp1000': {
                width: '50%',
              },
            }}
          >
            <Box
              css={{
                maxWidth: '100%',
                overflow: 'visible',
              }}
            >
              {collection && token ? (
                <TokenInfo token={token} collection={collection} />
              ) : null}
            </Box>
          </Flex>

          {/* right section  */}
          <Flex
            css={{
              width: '100%',
              flexDirection: 'column',

              '@bp1000': { width: '50%', flexDirection: 'column' },
            }}
          >
            <Flex
              css={{
                width: '100%',
              }}
            >
              <ListingsTable
                token={`${contract}:${token?.token?.tokenId}`}
                address={account.address}
                is1155={is1155}
                isOwner={isOwner}
              />
            </Flex>
            <Flex css={{ width: '100%' }}>
              <OffersTable
                token={`${contract}:${token?.token?.tokenId}`}
                address={account.address}
                is1155={is1155}
                isOwner={isOwner}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <AssetsModal
        isShow={assetsModalShow}
        token={token}
        collection={collection}
        vaults={vaultActivitise}
        isLoaded={isLoaded}
        toggle={toggle}
      />

      <OwnersModal
        isShow={ownersModalShow}
        owers={owers}
        toggle={ownersModalToggle}
      />
      <ReactTooltip
        id="assets-state"
        place="bottom"
        html={`<div>View Inside Vault</div>`}
      />
    </Layout>
  )
}

type SSRProps = {
  collection?:
    | paths['/collections/v7']['get']['responses']['200']['schema']
    | null
  tokens?: paths['/tokens/v6']['get']['responses']['200']['schema'] | null
}

export const getServerSideProps: GetServerSideProps<{
  assetId?: string
  ssr: SSRProps
}> = async ({ params, res }) => {
  const assetId = params?.assetId ? params.assetId.toString().split(':') : []
  let collectionId = assetId[0]
  const id = assetId[1]
  const { reservoirBaseUrl } =
    supportedChains.find((chain) => params?.chain === chain.routePrefix) ||
    DefaultChain

  const contract = collectionId ? collectionId?.split(':')[0] : undefined

  const headers = {
    headers: {
      'x-api-key': process.env.RESERVOIR_API_KEY || '',
    },
  }

  let tokensQuery: paths['/tokens/v6']['get']['parameters']['query'] = {
    tokens: [`${contract}:${id}`],
    includeAttributes: true,
    includeTopBid: true,
    normalizeRoyalties: NORMALIZE_ROYALTIES,
    includeDynamicPricing: true,
  }

  let tokens: SSRProps['tokens'] = null
  let collection: SSRProps['collection'] = null

  try {
    const tokensPromise = fetcher(
      `${reservoirBaseUrl}/tokens/v6`,
      tokensQuery,
      headers
    )

    const tokensResponse = await tokensPromise
    tokens = tokensResponse.data
      ? (tokensResponse.data as Props['ssr']['tokens'])
      : {}

    let collectionQuery: paths['/collections/v7']['get']['parameters']['query'] =
      {
        id: tokens?.tokens?.[0]?.token?.collection?.id,
        normalizeRoyalties: NORMALIZE_ROYALTIES,
      }

    const collectionsPromise = fetcher(
      `${reservoirBaseUrl}/collections/v7`,
      collectionQuery,
      headers
    )

    const collectionsResponse = await collectionsPromise
    collection = collectionsResponse.data
      ? (collectionsResponse.data as Props['ssr']['collection'])
      : {}

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=30, stale-while-revalidate=60'
    )
  } catch (e) {}

  return {
    props: {
      assetId: params?.assetId as string,
      ssr: { collection, tokens },
    },
  }
}

function formatTokenType(str: string): string {
  // Convert to uppercase
  let upperStr = str.toUpperCase()
  // Insert hyphen before numbers
  let formattedStr = upperStr.replace(/(\d+)/g, '-$1')
  return formattedStr
}

export default IndexPage
