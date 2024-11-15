import { NextPage } from 'next'
import { Text, Flex, Box, Button } from '../../components/primitives'
import Layout from 'components/Layout'
import { useMediaQuery } from 'react-responsive'
import { use, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useAccount } from 'wagmi'
import { TabsList, TabsTrigger, TabsContent } from 'components/primitives/Tab'
import * as Tabs from '@radix-ui/react-tabs'
import {
  AcceptBidModal,
  AcceptBidStep,
  useUserCollections,
  useUserTokens,
} from '@reservoir0x/reservoir-kit-ui'
import { useENSResolver, useMounted } from '../../hooks'
import { TokenTable, TokenTableRef } from 'components/portfolio/TokenTable'
import { ConnectWalletButton } from 'components/ConnectWalletButton'
import { MobileTokenFilters } from 'components/common/MobileTokenFilters'
import { TokenFilters } from 'components/common/TokenFilters'
import { FilterButton } from 'components/common/FilterButton'
import { ListingsTable } from 'components/portfolio/ListingsTable'
import { OffersTable } from 'components/portfolio/OffersTable'
import { faCopy, faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Head } from 'components/Head'
import BatchActionsFooter from 'components/portfolio/BatchActionsFooter'
import BatchListings from 'components/portfolio/BatchListings'
import { ChainContext } from 'context/ChainContextProvider'
import PortfolioSortDropdown, {
  PortfolioSortingOption,
} from 'components/common/PortfolioSortDropdown'
import { ActivityFilters } from 'components/common/ActivityFilters'
import { MobileActivityFilters } from 'components/common/MobileActivityFilters'
import { UserActivityTable } from 'components/portfolio/UserActivityTable'
import { useCollectionActivity } from '@reservoir0x/reservoir-kit-ui'
import { useRouter } from 'next/router'
import { ItemView, ViewToggle } from 'components/portfolio/ViewToggle'
import { ToastContext } from 'context/ToastContextProvider'
import EditProfileModal from 'components/modals/editProfileModal'
import StatBox from 'components/emblem/StatBox'
import IconButton from 'components/buttons/IconButton'
import axios from 'axios'

type ActivityTypes = Exclude<
  NonNullable<
    NonNullable<
      Exclude<Parameters<typeof useCollectionActivity>['0'], boolean>
    >['types']
  >,
  string
>

export type UserToken = ReturnType<typeof useUserTokens>['data'][0]

const IndexPage: NextPage = () => {
  const router = useRouter()
  const { address: accountAddress, isConnected } = useAccount()
  const address = router.query.address
    ? (router.query.address[0] as `0x${string}`)
    : accountAddress
  const [tabValue, setTabValue] = useState('items')
  const [itemView, setItemView] = useState<ItemView>('list')

  const [activityTypes, setActivityTypes] = useState<ActivityTypes>(['sale'])
  const [activityFiltersOpen, setActivityFiltersOpen] = useState(true)
  const [tokenFiltersOpen, setTokenFiltersOpen] = useState(false)
  const [hideSpam, setHideSpam] = useState<boolean>(true)
  const [profile, setProfile] = useState<any>({})
  const [filterCollection, setFilterCollection] = useState<string | undefined>(
    undefined
  )
  const [sortByType, setSortByType] =
    useState<PortfolioSortingOption>('acquiredAt')
  const [editProfileModalShow, setEditProfileModalShow] =
    useState<boolean>(false)

  const isSmallDevice = useMediaQuery({ maxWidth: 905 })
  const isMounted = useMounted()
  const { addToast } = useContext(ToastContext)
  const isOwner =
    !router.query.address || router.query.address[0] === accountAddress

  const {
    avatar: ensAvatar,
    bannerImage: bannerImage,
    displayName,
    shortAddress,
    twitterHandle,
  } = useENSResolver(address)

  let collectionQuery: Parameters<typeof useUserCollections>['1'] = {
    limit: 100,
    excludeSpam: hideSpam,
  }

  const { chain } = useContext(ChainContext)

  if (chain.collectionSetId) {
    collectionQuery.collectionsSetId = chain.collectionSetId
  } else if (chain.community) {
    collectionQuery.community = chain.community
  }

  const {
    data: collections,
    isLoading: collectionsLoading,
    fetchNextPage,
  } = useUserCollections(isMounted ? (address as string) : '', collectionQuery)

  // Batch listing logic
  const [showListingPage, setShowListingPage] = useState(false)
  const [batchAcceptBidModalOpen, setBatchAcceptBidModalOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState<UserToken[]>([])
  const [collectionId, setCollectionId] = useState<string | undefined>()
  const [totalSalesCount, setTotalSalesCount] = useState<number | undefined>()
  const [totalVaults, setTotalVaults] = useState<number | undefined>()

  const sellableItems = useMemo(
    () =>
      selectedItems
        .filter((item) => item.token?.topBid?.id !== null)
        .map((item) => ({
          tokenId: item.token?.tokenId as string,
          collectionId: item.token?.collection?.id as string,
        })),
    [selectedItems]
  )

  const tokenTableRef = useRef<TokenTableRef>(null)

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await axios.get('/api/collectionId')
        if (response) {
          const data = await response.data
          setCollectionId(data.collectionSetID)
        } else {
          console.error('Failed to fetch data from API')
        }
      } catch (error) {
        console.error('Error fetching data from API:', error)
      }
    }
    fetchDataFromApi()
  }, [])

  useEffect(() => {
    if (!collectionId) return
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/getUserSalesCount', {
          params: {
            collectionsSetId: collectionId,
            users: address,
            types: 'sale',
            includeMetadata: false,
            limit: 1000,
          },
        })

        if (response) setTotalSalesCount(response.data)
      } catch (error) {
        console.error('Failed to fetch stats', error)
      }
    }

    fetchData()
  }, [collectionId])

  useEffect(() => {
    if (!collectionId) return
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/getTokens', {
          params: {
            collectionsSetId: collectionId,
            user: address,
            limit: 200,
          },
        })

        if (response) setTotalVaults(response.data)
      } catch (error) {
        console.error('Failed to fetch stats', error)
      }
    }

    fetchData()
  }, [collectionId])

  useEffect(() => {
    setSelectedItems([])
  }, [chain])

  useEffect(() => {
    setSelectedItems([])
    setShowListingPage(false)
    setBatchAcceptBidModalOpen(false)
  }, [address])

  useEffect(() => {
    let tab = tabValue

    let deeplinkTab: string | null = null
    if (typeof window !== 'undefined') {
      const params = new URL(window.location.href).searchParams
      deeplinkTab = params.get('tab')
    }

    if (deeplinkTab) {
      switch (deeplinkTab) {
        case 'items':
          tab = 'items'
          break
        case 'collections':
          tab = 'collections'
          break
        case 'listings':
          tab = 'listings'
          break
        case 'offers':
          tab = 'offers'
          break
        case 'activity':
          tab = 'activity'
          break
      }
    }
    setTabValue(tab)
  }, [isSmallDevice, router.asPath])

  useEffect(() => {
    if (router.query.tab != tabValue) {
      router.query.tab = tabValue
      router.push(router, undefined, { shallow: true })
    }
  }, [tabValue, router])

  const editProfileModalToggle = () => {
    return setEditProfileModalShow(!editProfileModalShow)
  }

  if (!isMounted) {
    return null
  }

  return (
    <>
      <Head />
      <Layout>
        <Flex
          css={{
            height: '360px',
            background:
              'var(--Moods-Cyan, linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 45.32%), linear-gradient(16deg, #1B446A 11.11%, #102123 88.89%))',
            boxShadow: '0px 1.4px 5.251px 0px #000',
          }}
        >
          <img
            src={bannerImage}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            alt=""
          />
        </Flex>
        {/* Collection Stats */}
        <Flex
          justify="center"
          align="center"
          direction={{ '@initial': 'column', '@md': 'row' }}
          css={{
            maxWidth: '1400px',
            margin: 'auto',
            marginTop: '-131.5px',
            '@media screen and (max-width: 900px)': {},
          }}
        >
          <Box
            css={{
              zIndex: 0,
              marginLeft: -55,
              position: 'relative',
              '@media screen and (max-width: 900px)': {
                marginLeft: '0',
              },
            }}
          >
            <img
              src="/ProfileAvatar.png"
              style={{
                maxWidth: '280px',
              }}
            />
            {ensAvatar ? (
              <img
                src={ensAvatar}
                style={{
                  position: 'absolute',
                  top: 85,
                  left: 94,
                  height: 90,
                  width: 90,
                  objectFit: 'cover',
                }}
              />
            ) : (
              <></>
            )}
          </Box>
          <Flex
            css={{
              gap: 30,
              marginLeft: -140,
              marginTop: -20,
              width: '100%',
              background: 'linear-gradient(0deg, #2f2f32, #161617)',
              border: '1px solid #EBEBFC',
              padding: '24px 80px',
              pl: 100,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              '@media screen and (max-width: 900px)': {
                flexDirection: 'column',
                marginLeft: '0',
                marginTop: '-150px',
              },
            }}
          >
            <Flex
              css={{
                gap: '40px',
                flexDirection: 'row',
                '@media (max-width: 900px)': {
                  mt: 90,
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                },
              }}
            >
              <Box
                css={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'start',
                  gap: 2,
                }}
              >
                <Text style="h4">{displayName}</Text>
                <Text>{shortAddress}</Text>
              </Box>
              <StatBox
                title="Total Vaults"
                value={totalVaults ? totalVaults : '-'}
              />
              <StatBox
                title="Total Sales"
                value={totalSalesCount ? totalSalesCount : '-'}
              />
            </Flex>
            <Flex
              css={{
                gap: '12px',
                alignItems: 'center',
                flexDirection: 'column',
                '@md': { flexDirection: 'row' },
              }}
            >
              <IconButton
                iconSrc="/Icon/Xwebsite.svg"
                onClick={() =>
                  window.open(
                    `https://x.com/${
                      twitterHandle ? twitterHandle : 'EmblemVault'
                    }`,
                    '_blank'
                  )
                }
                buttonText={'Follow'}
                hoverTextColor="#000000"
              />
              <IconButton
                iconSrc="/Icon/CopyIcon.svg"
                onClick={editProfileModalToggle}
                buttonText={'Edit Profile'}
                hoverTextColor="#000000"
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex
          direction="column"
          css={{
            maxWidth: '1440px',
            mx: 'auto',
            '@sm': {
              px: '$5',
            },
          }}
        >
          {!isOwner || isConnected ? (
            <>
              {showListingPage && !isSmallDevice ? (
                <BatchListings
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                  setShowListingPage={setShowListingPage}
                />
              ) : (
                <Flex
                  css={{
                    gap: 20,
                    alignItems: 'start',
                    pb: '$6',
                    '@media screen and (max-width: 900px)': {
                      flexDirection: 'column',
                      alignItems: 'center',
                    },
                  }}
                >
                  <Flex
                    css={{
                      width: '100%',
                    }}
                  >
                    <Tabs.Root
                      style={{ width: '100%' }}
                      defaultValue="items"
                      value={tabValue}
                      onValueChange={(value) => setTabValue(value)}
                    >
                      <Flex
                        css={{
                          overflowX: 'scroll',
                          zIndex: 100,
                          '@sm': { overflowX: 'auto' },
                        }}
                      >
                        <TabsList
                          style={{
                            whiteSpace: 'nowrap',
                            width: '100%',
                          }}
                        >
                          <TabsTrigger value="items">Items</TabsTrigger>
                          <TabsTrigger value="listings">Listings</TabsTrigger>
                          <TabsTrigger value="offers">Offers Made</TabsTrigger>
                          <TabsTrigger value="activity">Activity</TabsTrigger>
                        </TabsList>
                      </Flex>
                      <TabsContent value="items">
                        <Flex
                          css={{
                            gap: tokenFiltersOpen ? '$5' : '0',
                            position: 'relative',
                            pb: 180,
                          }}
                        >
                          {isSmallDevice ? (
                            <MobileTokenFilters
                              hideSpam={hideSpam}
                              setHideSpam={setHideSpam}
                              collections={collections}
                              filterCollection={filterCollection}
                              setFilterCollection={setFilterCollection}
                              loadMoreCollections={fetchNextPage}
                            />
                          ) : (
                            <TokenFilters
                              hideSpam={hideSpam}
                              setHideSpam={setHideSpam}
                              isLoading={collectionsLoading}
                              isOwner={isOwner}
                              open={tokenFiltersOpen}
                              setOpen={setTokenFiltersOpen}
                              collections={collections}
                              filterCollection={filterCollection}
                              setFilterCollection={setFilterCollection}
                              loadMoreCollections={fetchNextPage}
                            />
                          )}
                          <Box
                            css={{
                              flex: 1,
                              maxWidth: '100%',
                            }}
                          >
                            {isSmallDevice && (
                              <Flex justify="between" css={{ gap: '$3' }}>
                                <PortfolioSortDropdown
                                  option={sortByType}
                                  onOptionSelected={(option) => {
                                    setSortByType(option)
                                  }}
                                />
                                <ViewToggle
                                  itemView={itemView}
                                  setItemView={setItemView}
                                />
                              </Flex>
                            )}
                            <Flex
                              justify="between"
                              css={{ marginBottom: '$4' }}
                            >
                              {!isSmallDevice &&
                                !collectionsLoading &&
                                collections.length > 0 && (
                                  <FilterButton
                                    open={tokenFiltersOpen}
                                    setOpen={setTokenFiltersOpen}
                                  />
                                )}
                              {!isSmallDevice && !collectionsLoading && (
                                <Flex
                                  align="center"
                                  justify="between"
                                  css={{ gap: '$3' }}
                                >
                                  <PortfolioSortDropdown
                                    option={sortByType}
                                    onOptionSelected={(option) => {
                                      setSortByType(option)
                                    }}
                                  />
                                  <ViewToggle
                                    itemView={itemView}
                                    setItemView={setItemView}
                                  />
                                </Flex>
                              )}
                            </Flex>
                            <TokenTable
                              hideSpam={hideSpam}
                              ref={tokenTableRef}
                              isLoading={collectionsLoading}
                              address={address}
                              filterCollection={filterCollection}
                              sortBy={sortByType}
                              selectedItems={selectedItems}
                              setSelectedItems={setSelectedItems}
                              isOwner={isOwner}
                              itemView={itemView}
                            />
                          </Box>
                          {!isSmallDevice && (
                            <BatchActionsFooter
                              selectedItems={selectedItems}
                              setSelectedItems={setSelectedItems}
                              setShowListingPage={setShowListingPage}
                              setOpenAcceptBidModal={setBatchAcceptBidModalOpen}
                              isOwner={isOwner}
                            />
                          )}
                        </Flex>
                      </TabsContent>
                      <TabsContent value="listings">
                        <ListingsTable address={address} isOwner={isOwner} />
                      </TabsContent>
                      <TabsContent value="offers">
                        <OffersTable address={address} isOwner={isOwner} />
                      </TabsContent>
                      <TabsContent value="activity">
                        <Flex
                          css={{
                            gap: activityFiltersOpen ? '$5' : '',
                            position: 'relative',
                          }}
                        >
                          {!isSmallDevice && (
                            <ActivityFilters
                              open={activityFiltersOpen}
                              setOpen={setActivityFiltersOpen}
                              activityTypes={activityTypes}
                              setActivityTypes={setActivityTypes}
                            />
                          )}
                          <Box
                            css={{
                              flex: 1,
                              gap: '$4',
                              pb: '$5',
                            }}
                          >
                            {isSmallDevice ? (
                              <MobileActivityFilters
                                activityTypes={activityTypes}
                                setActivityTypes={setActivityTypes}
                              />
                            ) : (
                              <FilterButton
                                open={activityFiltersOpen}
                                setOpen={setActivityFiltersOpen}
                              />
                            )}
                            <UserActivityTable
                              user={address}
                              activityTypes={activityTypes}
                            />
                          </Box>
                        </Flex>
                      </TabsContent>
                    </Tabs.Root>
                  </Flex>
                </Flex>
              )}
            </>
          ) : (
            <Flex
              direction="column"
              align="center"
              css={{ mx: 'auto', py: '120px', maxWidth: '350px', gap: '$4' }}
            >
              <Text style="h4" css={{ mb: '$3' }}>
                Sell your NFT instantly
              </Text>
              <Text css={{ color: '$gray11' }}>
                <FontAwesomeIcon icon={faWallet} size="2xl" />
              </Text>
              <Text
                style="body1"
                css={{ color: '$gray11', textAlign: 'center', mb: '$4' }}
              >
                Connect wallet to instant sell your token across all major
                marketplaces.
              </Text>
              <ConnectWalletButton />
            </Flex>
          )}
        </Flex>
        <AcceptBidModal
          trigger={null}
          openState={[batchAcceptBidModalOpen, setBatchAcceptBidModalOpen]}
          tokens={sellableItems}
          onClose={(data, stepData, currentStep) => {
            if (tokenTableRef && currentStep == AcceptBidStep.Complete) {
              tokenTableRef.current?.mutate()
              setSelectedItems([])
            }
          }}
          onBidAcceptError={(error: any) => {
            if (error?.type === 'price mismatch') {
              addToast?.({
                title: 'Could not accept offer',
                description: 'Offer was lower than expected.',
              })
              return
            }
            // Handle user rejection
            if (error?.code === 4001) {
              addToast?.({
                title: 'User canceled transaction',
                description: 'You have canceled the transaction.',
              })
              return
            }
            addToast?.({
              title: 'Could not accept offer',
              description: 'The transaction was not completed.',
            })
          }}
        />
      </Layout>
      <EditProfileModal
        isShow={editProfileModalShow}
        toggle={editProfileModalToggle}
        profile={{
          ensAvatar,
          bannerImage,
          displayName,
          shortAddress,
          twitterHandle,
        }}
      />
    </>
  )
}

export default IndexPage
