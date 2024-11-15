import {
  useCollections,
  useTrendingCollections,
} from '@reservoir0x/reservoir-kit-ui'
import { Text, Button, Box } from '../primitives'
import {
  DropdownMenuItem,
  DropdownMenuContent,
} from 'components/primitives/Dropdown'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

export type CollectionsSortingOption = NonNullable<
  Exclude<
    Parameters<typeof useTrendingCollections>[0],
    false | undefined
  >['period']
>

type paymentToken = import('@reservoir0x/reservoir-sdk').PaymentToken & {
  usdPrice?: number | undefined
  usdPriceRaw?: bigint | undefined
  usdTotalPriceRaw?: bigint | undefined
  usdTotalFormatted?: string | undefined
  usdBalanceRaw?: bigint | undefined
  balance?: string | number | bigint | undefined
  currencyTotalRaw?: bigint | undefined
  currencyTotalFormatted?: string | undefined
  maxItems?: number | undefined
  capacityPerRequest?: bigint | undefined
}

type Props = {
  setPaymentCurrency: React.Dispatch<
    React.SetStateAction<
      | (import('@reservoir0x/reservoir-sdk').PaymentToken & {
          usdPrice?: number | undefined
          usdPriceRaw?: bigint | undefined
          usdTotalPriceRaw?: bigint | undefined
          usdTotalFormatted?: string | undefined
          usdBalanceRaw?: bigint | undefined
          balance?: string | number | bigint | undefined
          currencyTotalRaw?: bigint | undefined
          currencyTotalFormatted?: string | undefined
          maxItems?: number | undefined
          capacityPerRequest?: bigint | undefined
        })
      | undefined
    >
  >
  paymentTokens: (import('@reservoir0x/reservoir-sdk').PaymentToken & {
    usdPrice?: number | undefined
    usdPriceRaw?: bigint | undefined
    usdTotalPriceRaw?: bigint | undefined
    usdTotalFormatted?: string | undefined
    usdBalanceRaw?: bigint | undefined
    balance?: string | number | bigint | undefined
    currencyTotalRaw?: bigint | undefined
    currencyTotalFormatted?: string | undefined
    maxItems?: number | undefined
    capacityPerRequest?: bigint | undefined
  })[]
  paymentCurrency:
    | (import('@reservoir0x/reservoir-sdk').PaymentToken & {
        usdPrice?: number | undefined
        usdPriceRaw?: bigint | undefined
        usdTotalPriceRaw?: bigint | undefined
        usdTotalFormatted?: string | undefined
        usdBalanceRaw?: bigint | undefined
        balance?: string | number | bigint | undefined
        currencyTotalRaw?: bigint | undefined
        currencyTotalFormatted?: string | undefined
        maxItems?: number | undefined
        capacityPerRequest?: bigint | undefined
      })
    | undefined
}

const SelectCurrencyDropDown: FC<Props> = ({
  setPaymentCurrency,
  paymentTokens,
  paymentCurrency,
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          color="gray3"
          css={{
            height: '40px',
            padding: '16px 20px',
            justifyContent: 'space-between',
            background: 'var(--Eclipse-Dark, #000)',
            // color:'White',
            '@md': {
              width: '120px',
              minWidth: 'max-content',
              px: '$4',
            },
            '&:hover': {
              background: 'var(--Eclipse-Dark, #000)',
            },
          }}
        >
          <Text
            style="body1"
            css={{
              color: '#FFFFFF',
              '[data-state=open] &': { color: '#FFF' }, // Change text color to white when dropdown is open
              '&:hover': {
                color: '#FFF', // Ensure text color is white on hover
              },
            }}
          >
            {paymentCurrency?.name}
          </Text>
          <Box
            css={{
              color: '$FFFFFF',
              transition: 'transform',
              '[data-state=open] &': {
                transform: 'rotate(180deg)',
                color: '#FFF', // Change icon color to white when dropdown is open
              },
              '&:hover': {
                color: '#FFF', // Ensure icon color is white on hover
              },
            }}
          >
            <FontAwesomeIcon icon={faChevronDown} width={16} />
          </Box>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenuContent
        css={{
          width: '130px',
          mt: '$2',
          zIndex: 1000,
          borderRadius: '0',
          border: '1px solid var(--Materials-Vanadium, #2F2F32)',
          background:
            'var(--Materials-Vanadium, linear-gradient(0deg, #2F2F32 0%, #161617 100%))',
        }}
      >
        {paymentTokens.map((token: paymentToken, index: number) => (
          <DropdownMenuItem
            key={index}
            css={{ py: '$3' }}
            onClick={() => setPaymentCurrency(token)}
          >
            {token.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu.Root>
  )
}

export default SelectCurrencyDropDown
