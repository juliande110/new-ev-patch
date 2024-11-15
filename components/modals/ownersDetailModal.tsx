import React, { FC, useEffect } from 'react'
import Modal from 'react-modal'
import { Anchor, Box, Button, Flex, Grid, Text } from 'components/primitives'
import Image from 'next/image'
import { Owner } from 'types/OwnersData'
import LoadingSpinner from 'components/common/LoadingSpinner'
import OwnerDetail from './owner'
import logo1 from 'public/Group1.png'

const customStyles = {
  content: {
    inset: '80px 15px',
    padding: '0',
    margin: '0 auto',
    maxWidth: '700px',
    backgroundColor: 'black',
    height: 'fit-content',
  },
}

Modal.setAppElement('#__next')

type Props = {
  isShow: boolean
  owers: Owner[] | undefined
  toggle(): void
}

export const OwnersModal: FC<Props> = ({ isShow, owers, toggle }) => {
  useEffect(() => {
    let body = document.body
    if (isShow) {
      body.style.overflowY = 'hidden'
    } else {
      body.style.overflowY = 'scroll'
    }
  }, [isShow])

  return (
    <Modal
      isOpen={isShow}
      style={customStyles}
      onRequestClose={toggle}
      shouldCloseOnOverlayClick={true}
    >
      <Flex
        css={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #DECAAB',
        }}
      >
        <Flex
          css={{
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            padding: '20px 24px',
            marginBottom: '20px',
          }}
        >
          <Text style="h3">Owned by</Text>
          <Button
            css={{ fontSize: '12px', padding: '8px 15px ' }}
            onClick={toggle}
          >
            X
          </Button>
        </Flex>
      </Flex>
      <Flex css={{ flexDirection: 'column', px: '$6' }}>
        {owers ? (
          owers.map((owner, index) => <OwnerDetail key={index} owner={owner} />)
        ) : (
          <LoadingSpinner />
        )}
      </Flex>
    </Modal>
  )
}

export default OwnersModal
