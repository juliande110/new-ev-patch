import { Button, Flex } from 'components/primitives'
import { Content } from 'components/primitives/Dialog'
import { useState, useEffect } from 'react'
import {
  Root as DialogRoot,
  DialogTrigger,
  DialogPortal,
} from '@radix-ui/react-dialog'
import * as RadixDialog from '@radix-ui/react-dialog'
import {
  faMagnifyingGlass,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GlobalSearch from './GlobalSearch'

const MobileSearch = () => {
  const [isOpen, setIsopen] = useState<boolean>(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
    }
  }, [isOpen])
  const children = (
    <Flex
      css={{
        flexDirection: 'column',
        pt: '$4',
      }}
    >
      <GlobalSearch placeholder="Search collections and addresses" />
      <Flex
        css={{
          position: 'absolute',
          top: 17.5,
        }}
        align="center"
        justify="between"
      >
        <RadixDialog.Close>
          <Flex
            css={{
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              alignItems: 'center',
              backgroundColor: '$gray3',
              color: '$gray12',
              '&:hover': {
                backgroundColor: '$gray4',
              },
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} width={16} height={16} />
          </Flex>
        </RadixDialog.Close>
      </Flex>
    </Flex>
  )
  return (
    <DialogRoot open={isOpen} onOpenChange={setIsopen}>
      <DialogTrigger asChild={isOpen}>
        <Button
          css={{ justifyContent: 'center', width: '44px', height: '44px' }}
          type="button"
          size="small"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} width={16} height={16} />
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <Content
          onInteractOutside={(e) => {
            e.preventDefault()
          }}
          css={{
            width: '100%',
            height: '100%',
            borderRadius: '0px',
            border: '0px',
            minWidth: '100%',
            maxWidth: '100vw',
            maxHeight: '100vh',
            top: '0%',
            zIndex: 9999,
          }}
        >
          {children}
        </Content>
      </DialogPortal>
    </DialogRoot>
  )
}

export default MobileSearch
