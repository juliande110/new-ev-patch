import React, { FC, useEffect } from 'react'
import { Anchor, Box, Button, Flex, Grid, Text } from 'components/primitives'
import { useENSResolver, useMounted } from '../../hooks'
import Image from 'next/image'
import { Owner } from 'types/OwnersData'

// TODO: testing enviorment

type Props = {
  key: number
  owner: Owner
}

export const OwnerDetail: FC<Props> = ({ key, owner }) => {
  const {
    avatar: ensAvatar,
    name: name,
    shortAddress,
  } = useENSResolver(owner.address)

  return (
    <>
      <Anchor
        href={`https://emblem.markets/portfolio/${owner.address}`}
        target="_blank"
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'background-color 0.2s ease',
          padding: '0 16px',
          '&:hover': {
            backgroundColor: '$gray3',
            cursor: 'pointer',
          },
        }}
      >
        <Flex
          css={{
            gap: 20,
            alignItems: 'center',
            padding: '15px 0',
          }}
        >
          <img
            src={ensAvatar ? ensAvatar : '/SteelVault.png'}
            width={40}
            height={40}
            alt="profile avatar"
          />
          <Flex css={{ flexDirection: 'column' }}>
            <Text style="subtitle1">
              {name !== owner.address ? name : 'Vaulted By:'}
            </Text>
            <Text style="subtitle2">{shortAddress}</Text>
          </Flex>
        </Flex>
        <Text>
          {owner?.ownership?.tokenCount
            ? `${owner?.ownership?.tokenCount} items`
            : '-'}
        </Text>
      </Anchor>
      <Box
        css={{
          backgroundColor: '#1C1C1E',
          height: '0.5px',
          margin: '16px 0',
        }}
      />
    </>
  )
}

export default OwnerDetail
