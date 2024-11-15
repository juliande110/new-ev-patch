import CryptoCurrencyIcon from 'components/primitives/CryptoCurrencyIcon'
import {
  Box,
  Button,
  Flex,
  FormatCrypto,
  FormatCurrency,
  Text,
} from 'components/primitives'
import { mainnet, polygon, optimism } from 'wagmi/chains'
import {
  useAccount,
  useContractReads,
  erc20ABI,
  useBalance,
  useContractRead,
} from 'wagmi'
import { useMemo, useState, useEffect, FC } from 'react'
import { zeroAddress, formatUnits } from 'viem'
import { useCoinConversion } from '@reservoir0x/reservoir-kit-ui'
import { styled } from '../../stitches.config'
import axios from 'axios'

const StyledImg = styled('img', {})

const currencies = [
  {
    address: zeroAddress,
    symbol: 'ETH',
    decimals: mainnet.nativeCurrency.decimals,
    chain: {
      id: mainnet.id,
      name: mainnet.name,
    },
    coinGeckoId: 'ethereum',
  },
  {
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    symbol: 'WETH',
    decimals: mainnet.nativeCurrency.decimals,
    chain: {
      id: mainnet.id,
      name: mainnet.name,
    },
    coinGeckoId: 'weth',
  },
  {
    address: '0x3D658390460295FB963f54dC0899cfb1c30776Df',
    symbol: 'COVAL',
    decimals: 8,
    chain: {
      id: mainnet.id,
      name: mainnet.name,
    },
    coinGeckoId: 'circuits-of-value',
  },
  {
    address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
    symbol: 'WETH',
    decimals: polygon.nativeCurrency.decimals,
    chain: {
      id: polygon.id,
      name: polygon.name,
    },
    coinGeckoId: 'weth',
  },
  {
    address: '0x4200000000000000000000000000000000000006',
    symbol: 'WETH',
    decimals: optimism.nativeCurrency.decimals,
    chain: {
      id: optimism.id,
      name: optimism.name,
    },
    coinGeckoId: 'weth',
  },
]

type EnhancedCurrency = (typeof currencies)[0] & {
  usdPrice: number
  balance: string | number | bigint
}

const nonNativeCurrencies = currencies.filter(
  (currency) => currency.address !== zeroAddress
)

const currencySymbols = currencies.map((currency) => currency.symbol).join(',')
const currencyCoingeckoIds = currencies
  .map((currency) => currency.coinGeckoId)
  .join(',')

const Wallet = () => {
  const [viewAll, setViewAll] = useState<boolean>(false)
  const [covalUsdPrice, setCovalUsdPrice] = useState<number | undefined>()
  const { address } = useAccount()
  const { data: nonNativeBalances } = useContractReads({
    contracts: nonNativeCurrencies.map((currency) => ({
      abi: erc20ABI,
      address: currency.address as `0x${string}`,
      chainId: currency.chain.id,
      functionName: 'balanceOf',
      args: [address as any],
    })),
    watch: true,
    enabled: address ? true : false,
    allowFailure: false,
  })

  const ethBalance = useBalance({
    address,
    chainId: mainnet.id,
  })

  const usdConversions = useCoinConversion(
    'USD',
    currencySymbols,
    currencyCoingeckoIds
  )

  const { data: covalBalance } = useContractRead({
    address: '0x3D658390460295FB963f54dC0899cfb1c30776Df',
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    chainId: mainnet.id,
    watch: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/getCoinUsdPrice', {
          params: {
            tokenName: 'COVAL',
          },
        })
        if (data) {
          setCovalUsdPrice(Number(data.amount))
        }
      } catch (error) {
        console.error('Failed to fetch stats', error)
      }
    }

    fetchData()
  }, [])

  const enhancedCurrencies = useMemo(() => {
    const currencyToUsdConversions = usdConversions.reduce((map, data) => {
      map[data.symbol] = data
      map[(data as any).coinGeckoId] = data
      return map
    }, {} as Record<string, (typeof usdConversions)[0]>)

    return currencies.map((currency, i) => {
      let balance: string | number | bigint = 0n
      if (currency.address === zeroAddress) {
        switch (currency.chain.id) {
          case mainnet.id: {
            balance = ethBalance.data?.value || 0n
            break
          }
        }
      } else {
        const index = nonNativeCurrencies.findIndex(
          (nonNativeCurrency) =>
            nonNativeCurrency.chain.id === currency.chain.id &&
            nonNativeCurrency.symbol === currency.symbol &&
            nonNativeCurrency.coinGeckoId === currency.coinGeckoId
        )

        if (currency.symbol === 'COVAL') {
          balance = covalBalance ?? '0'
        } else {
          balance =
            nonNativeBalances &&
            nonNativeBalances[index] &&
            (typeof nonNativeBalances[index] === 'string' ||
              typeof nonNativeBalances[index] === 'number' ||
              typeof nonNativeBalances[index] === 'bigint')
              ? (nonNativeBalances[index] as string | number | bigint)
              : 0n
        }
      }

      let usdPrice
      if (currency.symbol === 'COVAL') {
        usdPrice =
          Number(formatUnits(BigInt(balance), currency?.decimals || 18)) *
          (covalUsdPrice ? covalUsdPrice : 0)
      } else {
        const conversion =
          currencyToUsdConversions[
            currency.coinGeckoId.length > 0
              ? currency.coinGeckoId
              : currency.symbol.toLowerCase()
          ]
        usdPrice =
          Number(formatUnits(BigInt(balance), currency?.decimals || 18)) *
          (conversion?.price || 0)
      }
      return {
        ...currency,
        usdPrice,
        balance,
      }
    }) as EnhancedCurrency[]
  }, [
    usdConversions,
    nonNativeBalances,
    ethBalance,
    covalBalance,
    covalUsdPrice,
  ])

  const totalUsdBalance = useMemo(() => {
    return enhancedCurrencies.reduce(
      (total, { usdPrice }) => total + usdPrice,
      0
    )
  }, [enhancedCurrencies])

  const visibleCurrencies = viewAll
    ? enhancedCurrencies
    : enhancedCurrencies.slice(0, 3)

  return (
    <Flex
      direction="column"
      align="center"
      css={{
        background:
          'var(--Materials-Vanadium, linear-gradient(0deg, #2F2F32 0%, #161617 100%))',
        border: '1px solid #3A3A3C',
        mt: '$3',
      }}
    >
      <Box css={{ width: '100%', height: 1, background: '$gray1' }}></Box>
      <Flex direction="column" align="center" css={{ p: '$4', width: '100%' }}>
        <Text style="body2" color="subtle" css={{ mb: '$2', mt: '$2' }}>
          Total Balance
        </Text>
        <FormatCurrency
          style="h4"
          amount={totalUsdBalance}
          css={{ mb: '$4' }}
        />
        <Button
          css={{ width: '100%', justifyContent: 'center' }}
          onClick={() => {
            window.open('https://app.uniswap.org/', '_blank')
          }}
        >
          Add Funds
        </Button>
        {visibleCurrencies.map((currency, i) => {
          return (
            <Flex
              key={i}
              css={{ width: '100%', mt: 28, gap: '$3' }}
              align="center"
            >
              <Flex
                css={{
                  width: 40,
                  height: 40,
                  background: '$gray3',
                  flexShrink: 0,
                }}
                align="center"
                justify="center"
              >
                <CryptoImage coinGeckoId={currency.coinGeckoId} />
                {/* <CryptoCurrencyIcon
                  address={currency.address}
                  chainId={currency.chain.id}
                  css={{ height: 24 }}
                /> */}
              </Flex>
              <Flex direction="column" justify="center" css={{ width: '100%' }}>
                <Flex justify="between">
                  <Text style="body1">{currency.symbol}</Text>
                  <FormatCrypto
                    label=""
                    amount={currency.balance}
                    decimals={currency.decimals}
                    textStyle="body1"
                    symbol={
                      currency.symbol === 'COVAL' ? currency.symbol : 'ETH'
                    }
                  />
                </Flex>
                <Flex justify="between">
                  <Text style="body1" color="subtle">
                    {currency.chain.name}
                  </Text>
                  <Text style="body1" color="subtle"></Text>
                  <FormatCurrency amount={currency.usdPrice} />
                </Flex>
              </Flex>
            </Flex>
          )
        })}
        <Button
          css={{
            width: '100%',
            justifyContent: 'center',
            mt: 24,
            mb: '$3',
            border: '1px solid #3A3A3C',
            background: ' #1C1C1E',
            fontWeight: 'bold', // Make text bold
          }}
          color="gray3"
          onClick={() => {
            setViewAll(!viewAll)
          }}
        >
          View {viewAll ? 'Fewer' : 'All'} Tokens
        </Button>
      </Flex>
    </Flex>
  )
}

type Props = {
  coinGeckoId: string
}

const CryptoImage: FC<Props> = ({ coinGeckoId }) => {
  const [imageSrc, setImageSrc] = useState<string>('')
  useEffect(() => {
    const getCryptoImage = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinGeckoId}`
        )
        return setImageSrc(response.data.image.small)
      } catch (error) {
        console.error('Error fetching image:', error)
        return null
      }
    }

    getCryptoImage()
  }, [coinGeckoId])

  return (
    <StyledImg
      src={imageSrc}
      css={{
        height: 24,
      }}
    />
  )
}

export default Wallet
