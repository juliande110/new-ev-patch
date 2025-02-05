import { useAttributes } from '@reservoir0x/reservoir-kit-ui'
import { Box, Flex } from 'components/primitives'
import { FC } from 'react'
import { AttributeSelector } from './AttributeSelector'
import * as Collapsible from '@radix-ui/react-collapsible'
import { CollapsibleContent } from 'components/primitives/Collapsible'
import { NAVBAR_HEIGHT } from 'components/navbar'
import LoadingSpinner from 'components/common/LoadingSpinner'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  attributes: ReturnType<typeof useAttributes>['data'] | undefined
  scrollToTop: () => void
}

export const AttributeFilters: FC<Props> = ({
  attributes,
  open,
  setOpen,
  scrollToTop,
}) => {
  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      style={{
        transition: 'width .5s',
        width: open ? 230 : 0,
      }}
    >
      <CollapsibleContent
        css={{
          position: 'sticky',
          top: 16 + 80,
          height: `calc(100vh - ${NAVBAR_HEIGHT}px - 32px)`,
          overflow: 'auto',
          marginBottom: 16,
          background: 'transparent',
          border: 'none',
          borderRadius: 0,
        }}
      >
        <Box
          css={{
            '& > div:first-of-type': {
              pt: 0,
            },
          }}
        >
          {attributes &&
            attributes
              .filter((attribute) => attribute.kind != 'number')
              .map((attribute) => (
                <AttributeSelector
                  key={attribute.key}
                  attribute={attribute}
                  scrollToTop={scrollToTop}
                />
              ))}
          {(!attributes || !attributes.length) && (
            <Flex justify="center" align="center" css={{ height: 150 }}>
              <LoadingSpinner css={{ justifySelf: 'center' }} />
            </Flex>
          )}
        </Box>
      </CollapsibleContent>
    </Collapsible.Root>
  )
}
