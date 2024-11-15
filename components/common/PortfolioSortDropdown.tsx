import { useUserTokens } from '@reservoir0x/reservoir-kit-ui'
import { Text, Button, Box } from '../primitives'
import {
  DropdownMenuItem,
  DropdownMenuContent,
} from 'components/primitives/Dropdown'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { FC, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useMediaQuery } from 'react-responsive'

export type PortfolioSortingOption = NonNullable<
  Exclude<Parameters<typeof useUserTokens>[1], false | undefined>['sortBy']
>

const sortingOptions: PortfolioSortingOption[] = [
  'acquiredAt',
  'lastAppraisalValue',
]

const nameForSortingOption = (
  option: PortfolioSortingOption,
  compact: boolean,
) => {
  switch (option) {
    case 'acquiredAt':
      return 'Recently Received'
    case 'lastAppraisalValue':
      return 'Highest Last Sale'
  }
}

type Props = {
  option: PortfolioSortingOption
  onOptionSelected: (option: PortfolioSortingOption) => void
}

const PortfolioSortDropdown: FC<Props> = ({ option, onOptionSelected }) => {
  const isSmallDevice = useMediaQuery({ maxWidth: 905 })
  const buttonRef = useRef<any>(null)
  const [sortWidth, setSortWidth] = useState(
    buttonRef.current?.offsetWidth ?? '220px',
  )

  const handleResize = () => {
    if (isSmallDevice) {
      setSortWidth(
        buttonRef?.current?.offsetWidth
          ? buttonRef?.current?.offsetWidth
          : '220px',
      )
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize, false)
  }, [])

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          color="gray3"
          css={{
            height: '50px',
            padding: '20px 10px 20px 20px',
            fontSize: '14px',
            fontWeight: 500,
            color: '#FFFFFF',
            gap: '24px',
            border: '1px solid var(--Materials-Vanadium, #2F2F32)',
            background:
              'var(--Materials-Vanadium, linear-gradient(0deg, #2F2F32 0%, #161617 100%))',
          }}
          ref={buttonRef}
        >
          <Text style="body1">{nameForSortingOption(option, false)}</Text>
          <Box
            css={{
              color: '$gray10',
              transition: 'transform',
              '[data-state=open] &': { transform: 'rotate(180deg)' },
            }}
          >
            <FontAwesomeIcon icon={faChevronDown} width={16} />
          </Box>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenuContent
        css={{
          mt: '$2',
          zIndex: 1000,
          width: sortWidth,
          minWidth: 'max-content',
          maxWidth: 280,
          '@md': {
            width: '220px',
            minWidth: 'max-content',
            px: '$4',
          },
        }}
      >
        {sortingOptions.map((optionItem) => (
          <DropdownMenuItem
            key={optionItem}
            css={{ py: '$3' }}
            onClick={() =>
              onOptionSelected(optionItem as PortfolioSortingOption)
            }
          >
            {nameForSortingOption(optionItem, false)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu.Root>
  )
}

export default PortfolioSortDropdown
