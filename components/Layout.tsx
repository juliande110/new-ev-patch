import { Box } from 'components/primitives'
import { FC, ReactNode } from 'react'
import Navbar from './navbar'
import UnsupportedChainBanner from './UnsupportedChainBanner'
import NewFooter from './home/NewFooter'
import { GoogleAnalytics } from '@next/third-parties/google'

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Box
        css={{
          background: '#000000',
          height: '100%',
          minHeight: '100vh',
        }}
      >
        <Navbar />
        {/* <Box css={{ maxWidth: 4500, mx: 'auto' }}></Box> */}
        <UnsupportedChainBanner />
        <main>{children}</main>
        <NewFooter />
        <GoogleAnalytics gaId="G-VS05SDWP14" />
      </Box>
    </>
  )
}

export default Layout
