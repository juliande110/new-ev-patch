import type { NextPage } from 'next'
import { Box, Flex, Text } from 'components/primitives'

export type CardType = {
  eMBLEMTOOLS?: string
  appsByEmblem?: string
  decentralizedApplications?: string
  icon?: string
}

const Card: NextPage<CardType> = ({
  eMBLEMTOOLS,
  appsByEmblem,
  decentralizedApplications,
  icon,
}) => {
  return (
    <Flex
      css={{
        flex: 1,
        border: '4px solid #2F2F32',
        boxSizing: 'border-box',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: '40px',
        minWidth: '464px',
        maxWidth: '100%',
        textAlign: 'left',
        '@media screen and (max-width: 750px)': {
          flexWrap: 'wrap',
          justifyContent: 'center',
          minWidth: '100%',
        },
      }}
    >
      <Box
        css={{
          width: '350px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          gap: '12px 0px',
          minWidth: '350px',
          minHeight: '160px',
          maxWidth: '100%',
          '@media screen and (max-width: 750px)': {
            flex: 1,
            minWidth: '100%',
            minHeight: 'auto',
          },
        }}
      >
        <Text
          css={{
            alignSelf: 'stretch',
            position: 'relative',
            lineHeight: '100%',
            fontWeight: '600',
            color: '$yellow40',
          }}
        >
          {eMBLEMTOOLS}
        </Text>
        <Text
          style="h4"
          css={{
            margin: 0,
            width: '233px',
            position: 'relative',
            display: 'inline-block',
            '@media screen and (max-width: 450px)': {
              lineHeight: '23px',
            },
          }}
        >
          {appsByEmblem}
        </Text>
        <Text
          style="body"
          css={{
            width: '350px',
            position: 'relative',
            lineHeight: '140%',
            display: 'inline-block',
          }}
        >
          {decentralizedApplications}
        </Text>
      </Box>
      <Box
        as="img"
        css={{
          height: '160px',
          width: '159.3px',
          position: 'relative',
          '@media screen and (max-width: 750px)': {
            marginTop: '40px',
            marginBottom: '20px',
          },
        }}
        loading="lazy"
        alt=""
        src={icon}
      />
    </Flex>
  )
}

export default Card
