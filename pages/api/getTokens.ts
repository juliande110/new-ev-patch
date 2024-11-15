import type { NextApiRequest, NextApiResponse } from 'next'
import fetcher from 'utils/fetcher'

const reservoirBaseUrl = process.env.NEXT_PUBLIC_RESERVOIR_URL

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { collectionsSetId, user, limit } = req.query

  if (req.method === 'GET') {
    try {
      // Construct the external API URL
      let count = 0
      const url = `${reservoirBaseUrl}/users/${user}/tokens/v10`
      let TokenQuery = {
        collectionsSetId: collectionsSetId,
        limit: limit,
        continuation: undefined,
      }
      const headers = {
        headers: {
          'x-api-key': process.env.RESERVOIR_API_KEY || '',
        },
      }
      do {
        const {
          data: { tokens: tokens, continuation: continuation },
        } = await fetcher(url, TokenQuery, headers)
        count += tokens.length
        TokenQuery.continuation = continuation
      } while (TokenQuery.continuation)

      res.status(200).json(count)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
