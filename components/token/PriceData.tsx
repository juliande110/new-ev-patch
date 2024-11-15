import { useTokens } from '@reservoir0x/reservoir-kit-ui'
import {
  Flex,
  FormatCryptoCurrency,
  Text,
  Tooltip,
} from 'components/primitives'
import { useMarketplaceChain } from 'hooks'
import { FC } from 'react'
import { formatDollar } from 'utils/numbers'

type Props = {
  token: ReturnType<typeof useTokens>['data'][0] | null
}

export const PriceData: FC<Props> = ({ token }) => {
  const { reservoirBaseUrl } = useMarketplaceChain()
  const listSourceName = token?.market?.floorAsk?.source?.name as
    | string
    | undefined
  const listSourceDomain = token?.market?.floorAsk?.source?.domain as
    | string
    | undefined

  const offerSourceName = token?.market?.topBid?.source?.name as
    | string
    | undefined
  const offerSourceDomain = token?.market?.topBid?.source?.domain as
    | string
    | undefined

  const listSourceLogo = `${reservoirBaseUrl}/redirect/sources/${
    listSourceDomain || listSourceName
  }/logo/v2`

  const offerSourceLogo = `${reservoirBaseUrl}/redirect/sources/${
    offerSourceDomain || offerSourceName
  }/logo/v2`

  const listSourceRedirect = `${reservoirBaseUrl}/redirect/sources/${
    listSourceDomain || listSourceName
  }/tokens/${token?.token?.contract}:${token?.token?.tokenId}/link/v2`

  const offerSourceRedirect = `${reservoirBaseUrl}/redirect/sources/${
    offerSourceDomain || offerSourceName
  }/tokens/${token?.token?.contract}:${token?.token?.tokenId}/link/v2`

  return (
    <Flex css={{ gap: '$4', pt: '$4', pb: '$5', justifyContent: 'space-around' }}>
      <Flex direction="column" align="start" css={{ gap: '$1' }}>
        <Text css={{}}>Current Price</Text>
        <Flex
          css={{
            flexDirection: 'column',
            alignItems: 'center',
            '@bp500': { flexDirection: 'row', gap: '$2' },
          }}
        >
          <Flex css={{gap: 5}}>
            <FormatCryptoCurrency
              label=""
              amount={token?.market?.floorAsk?.price?.amount?.decimal}
              address={token?.market?.floorAsk?.price?.currency?.contract}
              decimals={token?.market?.floorAsk?.price?.currency?.decimals}
              textStyle="h4"
              logoHeight={20}
              maximumFractionDigits={4}
              css={{
                background:
                  'var(--Materials-Titanium, linear-gradient(0deg, #F4EBDD 0%, #B0ABA2 100%))',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            />
            <Text
              css={{
              }}
              as="h4"
              style="h4"
            >
              ETH
            </Text>
          </Flex>
          {token?.market?.floorAsk?.price?.amount?.usd ? (
            <Text
              style="h5"
              css={{
                background:
                  'var(--Materials-Steel, linear-gradient(0deg, #EBEBFC 0%, #A2A3AE 100%))',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign:' left'
              }}
              ellipsify
            >
              {`(${formatDollar(
                token?.market?.floorAsk?.price?.amount?.usd as number,
              )})`}
            </Text>
          ) : null}
        </Flex>
      </Flex>
      <Flex direction="column" align="start" css={{ gap: '$1' }}>
        <Text style="subtitle2">Top Offer</Text>
        <Flex
          css={{
            flexDirection: 'column',
            alignItems: 'center',
            '@bp500': { flexDirection: 'row', gap: '$2' },
          }}
        >
          <Tooltip
            side="top"
            open={
              token?.market?.topBid?.price?.netAmount?.decimal
                ? undefined
                : false
            }
            content={
              <Flex justify="between" css={{ gap: '$2' }}>
                <Text style="body3">Net Amount</Text>
                <FormatCryptoCurrency
                  label=" "
                  amount={token?.market?.topBid?.price?.netAmount?.decimal}
                  address={token?.market?.topBid?.price?.currency?.contract}
                  decimals={token?.market?.topBid?.price?.currency?.decimals}
                  textStyle="subtitle3"
                  logoHeight={14}
                />
              </Flex>
            }
          >
            <Flex css={{gap: 5}}>
              <FormatCryptoCurrency
                label=" "
                amount={token?.market?.topBid?.price?.amount?.decimal}
                address={token?.market?.topBid?.price?.currency?.contract}
                decimals={token?.market?.topBid?.price?.currency?.decimals}
                textStyle="h4"
                logoHeight={20}
                css={{
                  background:
                    'var(--Materials-Titanium, linear-gradient(0deg, #F4EBDD 0%, #B0ABA2 100%))',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              />
              <Text
                css={{
                }}
                as="h4"
                style="h4"
              >
                ETH
              </Text>
            </Flex>
          </Tooltip>

          {token?.market?.topBid?.price?.amount?.usd ? (
            <Text
              style="h5"
              css={{
                background:
                  'var(--Materials-Steel, linear-gradient(0deg, #EBEBFC 0%, #A2A3AE 100%))',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              ellipsify
            >
              {`(${formatDollar(token?.market?.topBid?.price?.amount?.usd)})`}
            </Text>
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  )
}
