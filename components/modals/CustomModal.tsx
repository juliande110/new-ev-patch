import { FC, ReactNode } from 'react'
import { Content, Overlay } from 'components/primitives/Dialog'
import {
  Root as DialogRoot,
  DialogTrigger,
  DialogPortal,
} from '@radix-ui/react-dialog'

type Props = {
  trigger: ReactNode
  children: ReactNode
  open?: boolean
}

export const CustomModal: FC<Props> = ({ trigger, children, open }) => {
  return (
    <DialogRoot modal={true} open={open}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogPortal>
        <Content
          onInteractOutside={(e) => {
            e.preventDefault()
          }}
          css={{
            width: '400px',
            maxHeight: '600px',
            border: '2px solid $gray4',
            padding: '20px',
          }}
        >
          {children}
        </Content>
      </DialogPortal>
    </DialogRoot>
  )
}
