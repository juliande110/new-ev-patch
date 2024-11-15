import { Box, Button } from 'components/primitives'
import {
  DropdownMenuItem,
  DropdownMenuContent,
} from 'components/primitives/Dropdown'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { faChevronDown, faSort } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMounted } from 'hooks'
import { useMediaQuery } from 'react-responsive'
import { CSS } from '@stitches/react'

type Options =
  | 'Price Low to High'
  | 'Price High to Low'
  | 'Recently Listed'
  | 'Recently Sold'
  | 'Recently Vaulted'

const options: { [x: string]: { sortBy: string; sortDirection: string } } = {
  'Price Low to High': { sortBy: 'floorAskPrice', sortDirection: 'asc' },
  'Price High to Low': { sortBy: 'floorAskPrice', sortDirection: 'desc' },
  'Recently Listed': { sortBy: 'listedAt', sortDirection: 'desc' },
  'Recently Sold': { sortBy: 'lastSaleAt', sortDirection: 'desc' },
  'Recently Vaulted': { sortBy: 'updatedAt', sortDirection: 'desc' },
}

type Props = {
  css?: CSS
}

export const SortTokens: FC<Props> = ({ css }) => {
  const router = useRouter()
  const [sortSelection, setSortSelection] =
    useState<Options>('Price Low to High')

  const isMounted = useMounted()
  const isSmallDevice = useMediaQuery({ maxWidth: 905 }) && isMounted

  useEffect(() => {
    const sortBy = router?.query['sortBy']?.toString()
    const key = router?.query['key']?.toString()
    const sortDirection = router?.query['sortDirection']?.toString()
    if (!key) return
    if (sortBy === 'floorAskPrice' && sortDirection === 'desc') {
      setSortSelection('Price High to Low')
      return
    } else if (sortBy === 'floorAskPrice' && sortDirection === 'asc') {
      return setSortSelection('Price Low to High')
    }
    setSortSelection(key as Options)
  }, [router.query])

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          color="gray3"
          css={{
            height: '40px',
            padding: '16px 10px',
            fontSize: '14px',
            fontWeight: 500,
            color: '#FFFFFF',
            gap: '24px',
            border: '1px solid var(--Materials-Vanadium, #2F2F32)',
            background:
              'var(--Materials-Vanadium, linear-gradient(0deg, #2F2F32 0%, #161617 100%))',
          }}
        >
          {isSmallDevice ? (
            <FontAwesomeIcon icon={faSort} width={16} height={16} />
          ) : (
            <>
              <span>{sortSelection}</span>
              <Box
                css={{
                  transition: 'transform',
                  '[data-state=open] &': { transform: 'rotate(180deg)' },
                }}
              >
                <FontAwesomeIcon icon={faChevronDown} width={16} />
              </Box>
            </>
          )}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenuContent css={{ width: '220px', mt: '$2', zIndex: 1000 }}>
        {Object.keys(options).map((key) => (
          <DropdownMenuItem
            key={key}
            css={{ py: '$3' }}
            onClick={() => {
              router.push(
                {
                  query: {
                    ...router.query,
                    ['sortBy']: options[key].sortBy,
                    ['sortDirection']: options[key].sortDirection,
                    ['key']: key,
                  },
                },
                undefined,
                {
                  shallow: true,
                }
              )
            }}
            aria-label={`Sort by ${key}`}
          >
            {key}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu.Root>
  )
}
