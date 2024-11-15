import type { NextPage } from 'next'
import { Box, Text } from '../../primitives'

type DataType = {
  statName?: string
  statValue?: string
}

const EVLegacyData: NextPage<DataType> = ({ statName, statValue }) => {
  return (
    <Box
      className="hero-item"
      css={{
        gap: '12px',
        display: 'grid',
        textAlign: 'left',
        fontSize: '12px',
        fontFamily: 'Inter',
        '@media screen and (max-width: 960px)': {
          textAlign: 'center',
        },
      }}
    >
      <Text
        style="subtitle2"
        css={{
          lineHeight: '100%',
          fontWeight: 600,
          background: 'linear-gradient(0deg, #ebebfc, #a2a3ae)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {statName}
      </Text>
      <Text
        style="h4"
        as="h4"
        css={{
          background: 'linear-gradient(0deg, #decaab, #fbefdd)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {statValue}
      </Text>
    </Box>
  )
}

export default EVLegacyData
