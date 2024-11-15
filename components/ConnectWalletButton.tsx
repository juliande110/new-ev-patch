import { ConnectButton } from '@rainbow-me/rainbowkit'
import Box from 'components/primitives/Box'
import Button from 'components/primitives/Button'
import { FC, useEffect, useState } from 'react'

type Props = {}

export const ConnectWalletButton: FC<Props> = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const openModal = async (openConnectModal: () => Promise<void>) => {
    await openConnectModal()
    let elementByClass: HTMLElement | null =
      document.querySelector('._12cbo8i4')
    if (elementByClass && elementByClass.parentNode) {
      const isExist = !!document.querySelector('[name="checkbox"]')
      if (isExist) return
      elementByClass.insertAdjacentHTML(
        'beforebegin',
        '<div id="connect-modal"><input type="checkbox" name="checkbox" /></div>',
      )
    }
  }
  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        return (
          <Box
            style={{
              flex: '1',
              display: 'flex',
              justifyContent: 'flex',
            }}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <Button
                    css={{ flex: 1, justifyContent: 'center' }}
                    // corners="rounded"
                    onClick={() =>
                      openModal(() => Promise.resolve(openConnectModal()))
                    }
                    type="button"
                  >
                    Connect Wallet
                  </Button>
                )
              }
            })()}
          </Box>
        )
      }}
    </ConnectButton.Custom>
  )
}
