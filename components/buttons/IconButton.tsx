import React from 'react'
import Button from 'components/primitives/Button'
import Box from 'components/primitives/Box'
import { FC } from 'react'

type Props = {
  onClick: () => void
  iconSrc: string
  buttonText: string
  borderColor?: string
  background?: string
  textColor?: string
  hoverTextColor?: string
  hoverBackground?: string
}

export const IconButton: FC<Props> = ({
  onClick,
  iconSrc,
  buttonText,
  borderColor = '#EBEBFC',
  background = 'linear-gradient(0deg, #2f2f32, #161617)',
  textColor = '#FFFFFF',
  hoverTextColor = '',
  hoverBackground = '',
}) => {
  return (
    <Button
      css={{
        background: background,
        border: `1px solid ${borderColor}`,
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        padding: '16px 14px 16px 10px',
        gap: '8px',
        color: textColor,
        '&:hover': {
          color: hoverTextColor,
          background: hoverBackground,
        },
      }}
      onClick={onClick}
    >
      <Box as="img" src={iconSrc} css={{ width: '24px', height: '24px' }} />
      <Box css={{ lineHeight: '8.5px', fontWeight: '500', color: textColor }}>
        {buttonText}
      </Box>
    </Button>
  )
}

export default IconButton
