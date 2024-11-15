import type { NextPage } from 'next'
import styled from 'styled-components'

const AssetsSymbol = styled.img`
  width: 24.03px;
  position: relative;
  height: 24px;
`
const EmblemVaultIcon = styled.img`
  width: 102.79px;
  position: relative;
  height: 11.78px;
`
const AssetsLogo = styled.div`
  top: 13px;
  left: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 7.2px;
`
const AssetsLogoWrapper = styled.div`
  align-self: stretch;
  position: relative;
  height: 50px;
`
const ExploreEmblemMarkets = styled.div`
  align-self: stretch;
  position: relative;
  line-height: 24px;
  text-transform: capitalize;
`
const FrameParent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 12px 0px 0px;
  gap: 40px;
  font-size: 15px;
  color: #636366;
`
const FrameChild = styled.div`
  width: 1px;
  position: relative;
  background-color: #48484a;
  height: 50px;
  overflow: hidden;
  flex-shrink: 0;
`
const Ecosystem = styled.div`
  flex: 1;
  position: relative;
  line-height: 140%;
`
const FrameContainer = styled.div`
  width: 230px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 12px 0px 0px;
  box-sizing: border-box;
  gap: 12px;
`
const Emblemfinance = styled.a`
  align-self: stretch;
  position: relative;
  line-height: 24px;
  text-transform: capitalize;
  color: inherit;
  text-decoration: none;
`
const EmblemfinanceParent = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  font-size: 15px;
  color: #636366;
`
const FrameGroup = styled.div`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 40px;
  width: 230px; /* Set the width to match other columns */
`
const FrameParent1 = styled.div`
  width: 230px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 12px 0px 0px;
  box-sizing: border-box;
  gap: 26px;
`
const Col = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 12px;
`
const EmblemVault = styled.div`
  position: relative;
  line-height: 8.5px;
  font-weight: 500;
  background: linear-gradient(0deg, #2f2f32, #161617);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
const AssetsLogo1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 7.2px;
`
const BaseFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
`
const Desktop = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 80px;
`
const DesktopFooterRoot = styled.div`
  text-decoration: none;
  width: 100%;
  position: relative;
  background-color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 240px;
  box-sizing: border-box;
  text-align: left;
  font-size: 14px;
  color: #aeaeb2;
  font-family: Inter;
  @media screen and (max-width: 1200px) {
    width: auto;
    align-self: unset;
    flex-direction: column;
  }
`

const DesktopFooter: NextPage = () => {
  return (
    <DesktopFooterRoot>
      <Desktop>
        <Col>
          <FrameGroup>
            <AssetsLogoWrapper>
              <AssetsLogo>
                <AssetsSymbol alt="" src="/emblemIcon.svg" />
                <EmblemVaultIcon alt="" src="/EmblemVaultText.svg" />
              </AssetsLogo>
            </AssetsLogoWrapper>
            <ExploreEmblemMarkets>
              Explore Emblem Markets unique multichain experience. Buy, Sell,
              and Trade digital assets from any blockchain on any blockchain.
              Powered by Emblem Vault technology.
            </ExploreEmblemMarkets>
          </FrameGroup>
          <FrameGroup>
            <FrameContainer>
              <FrameChild />
              <Ecosystem>Ecosystem</Ecosystem>
            </FrameContainer>
            <EmblemfinanceParent>
              <Emblemfinance
                href="https://emblem.finance/featured"
                target="_blank"
              >
                Emblem.Finance
              </Emblemfinance>
              <Emblemfinance href="https://www.emblem.markets/" target="_blank">
                Emblem.Markets
              </Emblemfinance>
              <Emblemfinance href="https://www.emblem.pro/" target="_blank">
                Emblem.Pro
              </Emblemfinance>
              <Emblemfinance
                href="https://www.coingecko.com/en/coins/circuits-of-value"
                target="_blank"
              >
                COVAL
              </Emblemfinance>
            </EmblemfinanceParent>
          </FrameGroup>
          <FrameGroup>
            <FrameContainer>
              <FrameChild />
              <Ecosystem>Tools</Ecosystem>
            </FrameContainer>
            <EmblemfinanceParent>
              <Emblemfinance
                href="https://docs.emblem.wiki/apis/api-documentation"
                target="_blank"
              >
                APIs
              </Emblemfinance>
              <Emblemfinance
                href="https://emblem.finance/vaults"
                target="_blank"
              >
                Vault Management
              </Emblemfinance>
              <Emblemfinance
                href="https://github.com/EmblemCompany/emblem-vault-solidity/tree/RC1.1/contracts"
                target="_blank"
              >
                Github
              </Emblemfinance>
            </EmblemfinanceParent>
          </FrameGroup>
          <FrameGroup>
            <FrameParent1>
              <FrameChild />
              <Ecosystem>Ecosystem</Ecosystem>
            </FrameParent1>
            <EmblemfinanceParent>
              <ExploreEmblemMarkets>About</ExploreEmblemMarkets>
              <Emblemfinance
                href="https://www.youtube.com/playlist?list=PLSFKZ82mnEvDp-JiNr2kAgQWlPVOCi7MT"
                target="_blank"
              >
                Video Archive
              </Emblemfinance>
              <Emblemfinance
                href="https://www.youtube.com/playlist?list=PLSFKZ82mnEvDz0k4kxPRGwMcObatIRwjp"
                target="_blank"
              >
                Shows
              </Emblemfinance>
            </EmblemfinanceParent>
          </FrameGroup>
          <FrameGroup>
            <FrameContainer>
              <FrameChild />
              <Ecosystem>Info</Ecosystem>
            </FrameContainer>
            <EmblemfinanceParent>
              <Emblemfinance
                href="https://docs.emblem.wiki/terms-of-service"
                target="_blank"
              >
                Terms of Services
              </Emblemfinance>
              <Emblemfinance href="https://docs.emblem.wiki/" target="_blank">
                Documentation
              </Emblemfinance>
              <Emblemfinance
                href="https://www.youtube.com/playlist?list=PLSFKZ82mnEvBNJsqpZs0ErvnLPJaZzp2Z"
                target="_blank"
              >
                Tutorials
              </Emblemfinance>
              <Emblemfinance
                href="https://www.nfthistory.org/wiki/Emblem_Vault"
                target="_blank"
              >
                Wiki
              </Emblemfinance>
              <Emblemfinance
                href="https://www.nfthistory.org/wiki/Emblem_Vault"
                target="_blank"
              >
                Sales Bot
              </Emblemfinance>
              <Emblemfinance
                href="https://twitter.com/DocumentingNFT"
                target="_blank"
              >
                Documenting NFTs
              </Emblemfinance>
            </EmblemfinanceParent>
          </FrameGroup>
          <FrameGroup>
            <FrameContainer>
              <FrameChild />
              <Ecosystem>Socials</Ecosystem>
            </FrameContainer>
            <EmblemfinanceParent>
              <Emblemfinance
                href="https://twitter.com/emblemvault"
                target="_blank"
              >
                X
              </Emblemfinance>
              <Emblemfinance
                href="https://discord.gg/N6sj6f8WNU"
                target="_blank"
              >
                Discord
              </Emblemfinance>
              <Emblemfinance
                href="https://www.youtube.com/@emblemvault"
                target="_blank"
              >
                Youtube
              </Emblemfinance>
              <Emblemfinance
                href="https://emblem-vault.medium.com/"
                target="_blank"
              >
                Medium
              </Emblemfinance>
              <Emblemfinance
                href="https://podcasters.spotify.com/pod/show/thevaultpod/"
                target="_blank"
              >
                Podcast
              </Emblemfinance>
            </EmblemfinanceParent>
          </FrameGroup>
        </Col>
        <BaseFooter>
          <EmblemVault>2019 - 2023 Emblem Vault</EmblemVault>
          <AssetsLogo1>
            <AssetsSymbol alt="" src="/EmblemLogoDark.svg" />
            <EmblemVaultIcon alt="" src="/EmblemTextDark.svg" />
          </AssetsLogo1>
        </BaseFooter>
      </Desktop>
    </DesktopFooterRoot>
  )
}

export default DesktopFooter
