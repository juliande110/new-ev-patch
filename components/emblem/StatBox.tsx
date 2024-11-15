import React from 'react'
import { Box, Flex, Text } from 'components/primitives'
import LoadingSpinner from 'components/common/LoadingSpinner'
import { IconButton } from 'components/buttons/IconButton'

// updateee

interface StatBoxProps {
  title: string
  value: string | number | undefined
  symbol?: string
  percentageChange?: number
  iconSrc?: string
  css?: any
  isLoaded?: boolean
}

const StatBox: React.FC<StatBoxProps> = ({
  title,
  value,
  symbol,
  percentageChange,
  iconSrc,
  css,
  isLoaded,
}) => {
  return (
    <Flex direction="column" css={{ gap: '8px', ...css }}>
      <Box
        css={{
          lineHeight: '140%',
          background: 'linear-gradient(0deg, #ebebfc, #a2a3ae)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {title}
      </Box>
      <Flex
        css={{
          alignItems: 'center',
          gap: '4px',
          '@media (max-width: 1072px)': {
            justifyContent: 'center',
          },
        }}
      >
        {iconSrc && (
          <Box as="img" src={iconSrc} css={{ width: '24px', height: '24px' }} />
        )}
        <Box
          css={{
            lineHeight: '24px',
            textTransform: 'capitalize',
            textShadow: '0px 4px 15px #000',
          }}
        >
          {isLoaded == undefined || isLoaded == true ? (
            `${value} ${symbol ? symbol : ''}`
          ) : (
            <Box
              css={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <LoadingSpinner />
            </Box>
          )}
        </Box>
        {/* Need to Update Background */}
        {percentageChange && (
          <Text
            style="labelSmall"
            css={{ color: '#32d74b', textShadow: '0px 4px 15px #000' }}
          >
            +{percentageChange}%
          </Text>
        )}
      </Flex>
    </Flex>
  )
}

// tranfer to the component library
export default StatBox
