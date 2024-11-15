import type { NextPage } from 'next'
import StatsGrid from './StatsGrid'
import { Box, Flex } from '../../primitives'
import styled from 'styled-components'

const BackgroundsvgIcon = styled.img`
  height: 100%;
  width: 100%;
  mix-blend-mode: overlay;
  z-index: 1;
  object-fit: contain;
  position: absolute;
  left: 0px;
  top: 317px;
  transform: scale(4.659);
`

const StatssectionRoot = styled(Box)`
  padding: 1000px;
  width: 100%;
  border-radius: 1px;
  background-color: #1c1c1e;
  border: 1px solid #2f2f32;
  margin: auto;
  max-width: 1440px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 60px 80px;
  position: relative;

  @media (max-width: 960px) {
    max-width: 100%;
  }

  @media (max-width: 600px) {
    max-width: 540px;
    flex-direction: column;
    padding: 30px 40px;
  }
`

const WrapperBackgroundsvg = styled(Flex)`
  width: 100%;

  position: absolute;
  margin: 0 !important;
  top: 0px;
  left: 0px;
  mix-blend-mode: overlay;
  z-index: 1;
  align-items: center;
  justify-content: center;
`

const StatsSection: NextPage = () => {
  return (
    <Box
      as="section"
      id="StatsSection"
      css={{
        backgroundImage: 'url(/stateBack.svg)',
        backgroundSize: 'cover',
        width: '100%',
        borderRadius: '1px',
        border: '1px solid #2f2f32',
        margin: 'auto',
        maxWidth: '1440px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '60px 80px',
        position: 'relative',
      }}
    >
      <StatsGrid />
      <WrapperBackgroundsvg>
        {/* <BackgroundsvgIcon alt="" src="/backgroundsvg.svg" /> */}
      </WrapperBackgroundsvg>
    </Box>
  )
}

export default StatsSection
