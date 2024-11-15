import { mainnet } from 'wagmi/chains'
import useSWR from 'swr'
import { useAccount } from 'wagmi'
import { truncateAddress, truncateEns } from 'utils/truncate'

export default (address?: string, chainId: number = 1) => {
  const { address: accountAddress } = useAccount()
  const addressLowercase = address?.toLowerCase()
  const isENSAvailable = chainId === mainnet.id
  const isAccountAddress =
    accountAddress && address?.toLowerCase() === accountAddress?.toLowerCase()

  const response = useSWR(
    `${process.env.NEXT_PUBLIC_EMBLEMVAULT_API_URL}/users/${addressLowercase}`,
    (url: string) => {
      if (!isENSAvailable || !address) {
        return null
      }
      return fetch(url).then((response) => response.json())
    },
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  )

  const shortAddress = address ? truncateAddress(address) : ''
  const shortName = response.data?.name
    ? response.data?.name === address
      ? truncateAddress(response.data.name)
      : truncateEns(response.data.name)
    : null
  let displayName = ''

  if (isAccountAddress) {
    displayName = 'You'
  } else if (response.data?.name) {
    displayName = shortName || ''
  } else if (address) {
    displayName = shortAddress
  }

  return {
    ...response,
    address,
    name: response.data?.name,
    shortName,
    displayName,
    shortAddress,
    bannerImage: response.data?.banner_image,
    avatar: response.data?.profile_image,
    bio: response.data?.bio,
    twitterHandle: response.data?.twitterHandle,
  }
}
