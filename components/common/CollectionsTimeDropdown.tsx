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

const sortingOptions: string[] = [
  'allTime',
  '30d',
  '7d',
  '24h',
  '6h',
  '1h',
  '10m',
]

const nameForSortingOption = (option: string, compact: boolean) => {
  switch (option) {
    case 'allTime':
      return compact ? 'allTime' : 'All Time'
    case '30d':
      return compact ? '30d' : '30 days'
    case '7d':
      return compact ? '7d' : '7 days'
    case '24h':
      return compact ? '24h' : '24 hours'
    case '6h':
      return compact ? '6h' : '6 hours'
    case '1h':
      return compact ? '1h' : '1 hour'
    case '10m':
      return compact ? '10m' : '10 minutes'
  }
}

type Props = {
  compact?: boolean
  option: string
  onOptionSelected: (option: CollectionsSortingOption) => void
}

const CollectionsTimeDropdown: FC<Props> = ({
  compact = true,
  option,
  onOptionSelected,
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          color="gray3"
          css={{
            height: '40px',
            padding: '16px 20px',
            borderRadius: '999px',
            justifyContent: 'space-between',
            background: 'var(--Eclipse-Dark, #000)',
            border: '1.2px solid var(--Materials-Vanadium, #FFFFFF)',
            // color:'White',
            '@md': {
              width: '120px',
              minWidth: 'max-content',
              px: '$4',
            },
            '[data-state=open] &': {
              color: '#FFF', // Make text white when dropdown is open
            },
            '&:hover': {
              borderRadius: '999px',
              border: '1px solid var(--Materials-Vanadium, #2F2F32)',
              background:
                'var(--Materials-Vanadium, linear-gradient(0deg, #2F2F32 0%, #161617 100%))',
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
            {nameForSortingOption(option, compact)}
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
        {sortingOptions.map((optionItem) => (
          <DropdownMenuItem
            key={optionItem}
            css={{ py: '$3' }}
            onClick={() =>
              onOptionSelected(optionItem as CollectionsSortingOption)
            }
          >
            {nameForSortingOption(optionItem, false)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu.Root>
  )
}

export default CollectionsTimeDropdown
