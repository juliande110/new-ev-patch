import { useCollections, useTokens } from '@reservoir0x/reservoir-kit-ui'
import { Anchor, Button, Flex, Text, Tooltip, Box } from 'components/primitives'
import { ComponentPropsWithoutRef, FC, useRef, useState, useMemo } from 'react'
import { TokenTraits } from 'components/token/TokenTraits'
import { styled } from '../../stitches.config'
import { useTheme } from 'next-themes'
import { useMarketplaceChain, useMounted, useDateFns } from 'hooks'
import { truncateAddress } from 'utils/truncate'
import ReactMarkdown from 'react-markdown'
import { OpenSeaVerified } from 'components/common/OpenSeaVerified'
import { useRouter } from 'next/router'
import optimizeImage from 'utils/optimizeImage'
import supportedChains, { DefaultChain } from 'utils/chains'

type Props = {
  token: ReturnType<typeof useTokens>['data'][0] | null
  collection: NonNullable<ReturnType<typeof useCollections>['data']>[0] | null
}

export const TokenInfo: FC<Props> = ({ token, collection }) => {
  const marketplaceChain = useMarketplaceChain()
  const { theme } = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  const descriptionRef = useRef<HTMLParagraphElement | null>(null)
  const isMounted = useMounted()
  const router = useRouter()

  const collectionChain =
    supportedChains.find(
      (chain) => router.query?.chain === chain.routePrefix,
    ) || DefaultChain

  let chainName = collectionChain?.name

  const hasSecurityConfig =
    typeof collection?.securityConfig?.transferSecurityLevel === 'number'

  const tokenStandard = `${token?.token?.kind}${hasSecurityConfig ? 'C' : ''}`

  const CollectionAction = styled(Flex, {
    px: '$4',
    py: '$3',
    borderRadius: 0,
    color: '$gray12',
    background:
      'var(--Materials-Vanadium, linear-gradient(0deg, #2F2F32 0%, #161617 100%));',
    cursor: 'pointer',
    height: 40,
    alignItems: 'center',
    '&:hover': {
      background:
        'var(--Materials-Titanium, linear-gradient(0deg, #F4EBDD 0%, #B0ABA2 100%));',
    },
  })

  const collectionImage = useMemo(() => {
    return optimizeImage(
      token?.token?.collection?.image || collection?.image,
      50,
    )
  }, [token?.token?.collection?.image, collection?.image])

  const etherscanImage = (
    <img
      src={
        isMounted && theme === 'dark'
          ? '/icons/etherscan-logo-light-circle.svg'
          : '/icons/etherscan-logo-circle.svg'
      }
      alt={`${
        marketplaceChain.blockExplorers?.default.name || 'Ethereum'
      } Icon`}
      height={16}
      width={16}
    />
  )

  const blockExplorerUrl = `${
    marketplaceChain?.blockExplorers?.default.url || 'https://etherscan.io'
  }/token/${token?.token?.contract}?a=${token?.token?.tokenId}`
  const twitterLink = collection?.twitterUsername
    ? `https://twitter.com/${collection?.twitterUsername}`
    : null

  const expandedCss: ComponentPropsWithoutRef<typeof Flex>['css'] = {
    maxWidth: '100%',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    verticalAlign: 'top',
    '*': {
      display: 'inline',
    },
  }

  let isLongDescription = false

  if (descriptionRef.current) {
    isLongDescription = descriptionRef.current.offsetHeight > 50
  }

  return (
    <Flex
      className="hey"
      direction="column"
      css={{
        outline: 'solid 1px $gray7',
        margin: '1px',
        padding: '24px',
        maxWidth: 'inherit',
        minHeight: '100%',
        paddingBottom: '24px',
        // marginBottom: '24px',
      }}
    >
      <Text
        css={{
          color: 'white',
          fontSize: '16px',
          fontWeight: 500,
          marginBottom: '24px',
        }}
      >
        Description
      </Text>
      <Box
        css={{
          padding: '0.5px',
          backgroundColor: '#464b50',
          marginBottom: '24px',
        }}
      ></Box>
      {/* table  */}
      <Flex
        css={{
          gap: '$2',
          marginBottom: '24px',
        }}
        align="center"
      >
        <img
          src={collectionImage}
          style={{ width: 43, height: 43, border: '2px solid #EBEBFC' }}
        />
        By
        <Text
          style="h6"
          ellipsify
          css={{
            // paddingLeft: '12px',
            background:
              'var(--Materials-Titanium, linear-gradient(0deg, #F4EBDD 0%, #B0ABA2 100%))',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {token?.token?.collection?.name || collection?.name}
        </Text>
        <OpenSeaVerified
          openseaVerificationStatus={collection?.openseaVerificationStatus}
        />
      </Flex>
      <Flex
        direction="column"
        css={{
          fontSize: '12px',
          fontFamily: 400,
          overflow: 'hidden',
          marginbottom: '24px',
          a: { textDecoration: 'underline' },
        }}
      >
        <Flex direction="column" css={isExpanded ? undefined : expandedCss}>
          <Text ref={descriptionRef}>
            <ReactMarkdown linkTarget="_blank">
              {collection?.description as string}
            </ReactMarkdown>
          </Text>
        </Flex>
        {isLongDescription && (
          <Button
            color="ghost"
            size="xs"
            css={{
              width: 'max-content',
              color: '$primary11',
              fontWeight: 500,
              height: 28,
              minHeight: 28,
              px: 0,
            }}
            onClick={() => {
              setIsExpanded(!isExpanded)
            }}
          >
            {isExpanded ? 'read less' : 'read more'}
          </Button>
        )}
      </Flex>

      {/* token traits card lists */}
      <TokenTraits token={token} collection={collection} />
      <Text
        css={{
          color: 'white',
          fontSize: '16px',
          fontWeight: 500,
          marginBottom: '24px',
          marginTop: '24px',
        }}
      >
        Details
      </Text>
      <Box
        css={{
          padding: '0.5px',
          backgroundColor: '#464b50',
          marginBottom: '24px',
        }}
      ></Box>
      <Flex direction="column" css={{ width: '100%', gap: '$4' }}>
        <Flex justify="between" css={{ width: '100%' }}>
          <Text
            style="subtitle1"
            css={{ color: '$gray11', fontWeight: 'normal' }}
          >
            Contract Address
          </Text>
          <Anchor
            href={blockExplorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            weight="medium"
          >
            <Flex
              align="center"
              css={{ textDecoration: 'underline', color: '#5BADFF' }}
            >
              {truncateAddress(token?.token?.contract as string)}
            </Flex>
          </Anchor>
        </Flex>
        <Flex justify="between" css={{ width: '100%' }}>
          <Text
            style="subtitle1"
            css={{
              color: '$gray11',
              fontWeight: 'normal',
              whiteSpace: 'nowrap',
              mr: '$2',
            }}
          >
            Token ID
          </Text>

          <Anchor
            href={blockExplorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            weight="medium"
          >
            <Flex
              align="center"
              css={{ textDecoration: 'underline', color: '#5BADFF' }}
            >
              {truncateAddress(token?.token?.tokenId as string)}
            </Flex>
          </Anchor>
        </Flex>

        <Flex justify="between" css={{ width: '100%' }}>
          <Text
            style="subtitle1"
            css={{ color: '$gray11', fontWeight: 'normal' }}
          >
            Token Standard
          </Text>
          <Text style="subtitle1" css={{ textTransform: 'uppercase' }}>
            {formatTokenType(tokenStandard)}
          </Text>
        </Flex>

        <Flex justify="between" css={{ width: '100%' }}>
          <Text
            style="subtitle1"
            css={{ color: '$gray11', fontWeight: 'normal' }}
          >
            Chain
          </Text>
          <Text style="subtitle1">{chainName}</Text>
        </Flex>

        <Flex justify="between" css={{ width: '100%' }}>
          <Text
            style="subtitle1"
            css={{ color: '$gray11', fontWeight: 'normal' }}
          >
            Last Updated
          </Text>
          <Text style="subtitle1">{useDateFns(token?.updatedAt)}</Text>
        </Flex>

        {/* <Flex justify="between" css={{ width: '100%' }}>
            <Flex align="center" css={{ gap: '$2' }}>
              <Text
                style="subtitle1"
                css={{ color: '$gray11', fontWeight: 'normal' }}
              >
                Creator Royalties
              </Text>
              <Tooltip
                content={
                  <Text style="body3" as="p">
                    A fee on every order that goes to the collection creator.
                  </Text>
                }
                style={{ maxWidth: '210px' }}
              >
                <Text css={{ color: '$gray11' }}>
                  <FontAwesomeIcon icon={faInfoCircle} width={16} height={16} />
                </Text>
              </Tooltip>
            </Flex>
            <Text style="subtitle1">
              {collection?.royalties?.bps
                ? collection?.royalties?.bps * 0.01
                : 0}
              %
            </Text>
          </Flex> */}
      </Flex>
    </Flex>
  )
}

function formatTokenType(str: string): string {
  // Convert to uppercase
  let upperStr = str.toUpperCase()
  // Insert hyphen before numbers
  let formattedStr = upperStr.replace(/(\d+)/g, '-$1')
  return formattedStr
}
