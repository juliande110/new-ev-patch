import { FC, useCallback } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import {
  ToggleGroup,
  ToggleGroupItem,
  Box,
  Text,
  Button,
  Flex,
} from '../primitives'
import supportedChains from 'utils/chains'
import { useContext } from 'react'
import { ChainContext } from 'context/ChainContextProvider'
import { TooltipArrow } from 'components/primitives/Tooltip'
import { useMounted } from 'hooks'
import { useRouter } from 'next/router'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from 'components/primitives/Dropdown'

const ChainToggle: FC = () => {
  const router = useRouter()
  const { chain, switchCurrentChain } = useContext(ChainContext)
  const isMounted = useMounted()

  const switchChains = useCallback(
    (chainOption: (typeof supportedChains)[0]) => {
      if (router.query.chain) {
        Object.keys(router.query).forEach((param) => delete router.query[param])
        router.replace(
          {
            pathname: router.pathname,
            query: router.query,
          },
          undefined,
          { shallow: true },
        )
      }
      switchCurrentChain(chainOption.id)
    },
    [router.query, switchCurrentChain],
  )

  if (!isMounted || supportedChains.length === 1) {
    return null
  }

  if (supportedChains.length > 4) {
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button
            css={{
              py: '10px',
              justifyContent: 'space-between',
              width: 'auto',
              minWidth: 'max-content',
              borderRadius: 0,
              border: '1px solid #2F2F32',
              background: '$vanadium',

              '@md': {
                minWidth: 'max-content',
                px: '$4',
              },
            }}
          >
            <img
              src={chain.darkIconUrl}
              style={{ height: 20, paddingRight: '10px' }}
            />

            <Text style="body1">{chain.name}</Text>
            <Box
              css={{
                color: '$gray10',
                transition: 'transform',
                '[data-state=open] &': { transform: 'rotate(180deg)' },
              }}
            >
              {/* <img src="./DownChev.svg" style={{ height: '7px' }} /> */}
            </Box>
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenuContent
          css={{
            mt: '$2',
            zIndex: 1000,
            width: 'auto',
            maxHeight: 300,
            overflow: 'auto',
            borderRadius: 0,
            minWidth: 'max-content',
            background:
              'var(--Materials-Vanadium, linear-gradient(0deg, #2F2F32 0%, #161617 100%))',
            border: '1px solid var(--Materials-Iron, #9C99A6)',
            '@md': {
              minWidth: 'max-content',
            },
          }}
        >
          {supportedChains.map((supportedChain) => (
            <DropdownMenuItem
              key={supportedChain.id}
              css={{ py: '$3', px: '$1', display: 'flex', gap: '$2' }}
              onClick={() => {
                router.query.chain = supportedChain.routePrefix
                router.push(router, undefined, { shallow: true })

                switchCurrentChain(supportedChain.id)
              }}
            >
              <Flex css={{ width: 30 }} justify="center" align="center">
                <img src={supportedChain.darkIconUrl} style={{ height: 20 }} />
              </Flex>
              <Text style="body1">{supportedChain.name}</Text>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu.Root>
    )
  }

  return (
    <ToggleGroup type="single" value={chain.name}>
      {supportedChains.map((chainOption) => (
        <TooltipPrimitive.Root delayDuration={0} key={chainOption.name}>
          <TooltipPrimitive.Trigger>
            <ToggleGroupItem
              asChild
              value={chainOption.name}
              disabled={chainOption.name === chain.name}
              onClick={() => {
                router.query.chain = chainOption.routePrefix
                router.push(router, undefined, { shallow: true })

                switchCurrentChain(chainOption.id)
              }}
            >
              <Box
                css={{
                  width: 56,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <img src={chainOption.darkIconUrl} style={{ height: 20 }} />
              </Box>
            </ToggleGroupItem>
          </TooltipPrimitive.Trigger>
          <TooltipPrimitive.Content
            sideOffset={-4}
            side="top"
            align="center"
            style={{
              zIndex: 100,
              filter: 'drop-shadow(0px 3px 8px rgba(0, 0, 0, 0.3))',
            }}
          >
            <TooltipArrow />
            <Box
              css={{
                zIndex: 9999,
                $$shadowColor: '$colors$panelShadow',
                boxShadow: '0px 1px 5px rgba(0,0,0,0.2)',

                overflow: 'hidden',
              }}
            >
              <Box
                css={{
                  background: '$neutralBgSubtle',
                  p: '$2',
                }}
              >
                <Text style="body3" as="p">
                  {chainOption?.name}
                </Text>
              </Box>
            </Box>
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Root>
      ))}
    </ToggleGroup>
  )
}

export default ChainToggle
