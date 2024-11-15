import { NextPage } from 'next'
import { Flex, Box, Text, Anchor } from '../primitives' // Adjusted import path as needed.

type SectionTitleProps = {
  title: string
}

const SectionTitle = ({ title }: SectionTitleProps) => (
  <Text
    css={{
      marginBottom: '40px',
      color: '#AEAEB2',
      fontSize: '14px',
      lineHeight: '50px',
      fontWeight: '400',
      borderLeft: '1px solid #48484A',
      paddingLeft: '20px',
      height: '50px',
    }}
  >
    {title}
  </Text>
)

type SectionLinkProps = {
  name: string
  href: string
  target?: string
}

const SectionLink = ({ name, href, target = '_blank' }: SectionLinkProps) => (
  <Anchor
    href={href}
    target={target}
    rel="noopener noreferrer"
    css={{
      marginTop: '16px',
      fontSize: '14px',
      fontWeight: '400',
      color: '#636366',
      lineHeight: '140%',
      textDecoration: 'none',
      '&:hover': {
        color: '$mithril',
      },
    }}
  >
    {name}
  </Anchor>
)

const DesktopFooter: NextPage = () => {
  return (
    <Flex
      as="footer"
      direction="column"
      align="center"
      justify="center"
      css={{
        width: '100%',
        maxWidth: '1440px',
        backgroundColor: '#000',
        boxSizing: 'border-box',
        fontFamily: 'Inter',
        px: '$4',
        fontSize: '14px',
        margin: '0 auto',
        '@media (max-width: 768px)': {
          paddingBlock: '24px',
        },
      }}
    >
      <Flex
        direction="row"
        align="start"
        justify="start"
        css={{
          alignSelf: 'stretch',
          gap: '12px',
          '@media (max-width: 768px)': {
            flexDirection: 'column', // Stack on mobile
            gap: '20px', // Reduce gap for mobile
          },
        }}
      >
        {/* Bio Section */}
        <Flex direction="column" css={{ width: '100%' }}>
          <img
            src="/NewLogoEV.svg"
            alt="Logo"
            style={{
              width: '134px',
              height: '24px',
              marginTop: '14px',
              marginBottom: '70px',
            }}
          />
          <Text
            css={{
              textAlign: 'left',
              color: '#636366',
              marginTop: '10px',
              fontSize: '15px',
              lineHeight: '160%',
              paddingRight: '10px',
            }}
          >
            A crosschain digital asset management experience.
          </Text>
        </Flex>

        {[
          {
            title: 'Ecosystem',
            links: [
              {
                name: 'Emblem Finance',
                href: 'https://emblem.finance/createcurated',
              },
              { name: 'Emblem.Markets', href: 'https://www.emblem.markets/' },
              {
                name: 'Emblem.SDK',
                href: 'https://docs.emblem.wiki/tools/emblem-sdk',
              },
              { name: 'Emblem.Pro', href: 'http://Emblem.Pro' },
              {
                name: 'COVAL',
                href: 'https://www.coingecko.com/en/coins/circuits-of-value',
              },
            ],
          },
          {
            title: 'Tools',
            links: [
              {
                name: 'APIs',
                href: 'https://docs.emblem.wiki/apis/api-documentation',
              },
              {
                name: 'Github',
                href: 'https://github.com/EmblemCompany/emblem-vault-solidity/tree/RC1.1/contracts',
              },
              {
                name: 'Vault Activity',
                href: 'https://emblem.finance/createcurated',
              },
              {
                name: 'Leaderboard',
                href: 'https://emblem.finance/createcurated',
              },
            ],
          },
          {
            title: 'Education',
            links: [
              {
                name: 'ToS',
                href: 'https://docs.emblem.wiki/terms-of-service',
              },
              {
                name: 'Docs',
                href: 'https://docs.emblem.wiki/',
              },
              {
                name: 'Blogs',
                href: 'https://medium.com/@emblem-vault',
              },
              {
                name: 'Shows',
                href: 'https://www.youtube.com/playlist?list=PLSFKZ82mnEvDz0k4kxPRGwMcObatIRwjp',
              },
              {
                name: 'How its Done',
                href: 'https://docs.emblem.wiki/deep-dive/how-its-done',
              },
              {
                name: 'Video Tutorials',
                href: 'https://www.youtube.com/playlist?list=PLSFKZ82mnEvBNJsqpZs0ErvnLPJaZzp2Z',
              },
            ],
          },

          {
            title: 'Socials',
            links: [
              {
                name: 'X',
                href: 'https://twitter.com/EmblemVault',
              },
              {
                name: 'Discord',
                href: 'https://discord.gg/cxyqvgw7K2',
              },
              {
                name: 'Medium',
                href: 'https://medium.com/@emblem-vault',
              },
              {
                name: 'Youtube',
                href: 'https://www.youtube.com/@emblemvault',
              },
              {
                name: 'Podcast',
                href: 'https://open.spotify.com/show/2RUFot0EJqF9RWHknWX0GY',
              },
              {
                name: 'Sales Bot',
                href: 'https://twitter.com/emblemsalesbot',
              },
            ],
          },
        ].map((section, index) => (
          <Flex
            key={index}
            direction="column"
            css={{ gap: '10px', width: '100%' }}
          >
            <SectionTitle title={section.title} />
            {section.links.map((link, linkIndex) => (
              <SectionLink
                key={linkIndex}
                name={link.name}
                href={link.href}
                target="_blank"
              />
            ))}
          </Flex>
        ))}
      </Flex>
      <Flex
        css={{
          flexDirection: 'row',
          alignItems: 'center',

          justifyContent: 'center',
          gap: '12px',
          marginTop: '80px',
          marginBottom: '80px',
          width: '100%',
          opacity: '0.75',

          // '@media (max-width: 768px)': {
          //   marginTop: '40px',
          //   marginBottom: '40px',
          // },
        }}
      >
        <Text
          css={{
            position: 'relative',
            lineHeight: '8.5px',
            fontWeight: '500',
            // background: 'linear-gradient(60deg, #FFFFFF, #2F2F32)',
            WebkitBackgroundClip: 'text',
            // WebkitTextFillColor: 'transparent',
            color: '#FFFFFF',
          }}
        >
          Established 2016{' '}
        </Text>

        <img alt="Emblem Logo" src="/NewLogoEV.svg" style={{}} />
      </Flex>
    </Flex>
  )
}

export default DesktopFooter
