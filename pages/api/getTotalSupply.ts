import type { NextApiRequest, NextApiResponse } from 'next'
import fetcher from 'utils/fetcher'
import axios from 'axios'

const reservoirBaseUrl = process.env.NEXT_PUBLIC_RESERVOIR_URL

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { collectionId } = req.query

  if (req.method === 'GET') {
    try {
      // Construct the external API URL
      let allData: any = []
      let count = 0
      const url = `${reservoirBaseUrl}/tokens/v7`
      let tokensQuery = {
        collection: collectionId,
        continuation: undefined,
        sortBy: 'updatedAt',
        sortDirection: 'asc',
        limit: 1000,
      }
      const headers = {
        headers: {
          'x-api-key': process.env.RESERVOIR_API_KEY || '',
        },
      }
      do {
        const {
          data: { tokens: tokens, continuation: continuation },
        } = await fetcher(url, tokensQuery, headers)
        for await (const token of tokens) {
          count += Number(token.token.supply)
        }
        tokensQuery.continuation = continuation
        // allData.push(tokens)
      } while (tokensQuery.continuation)

      // Respond with the data
      res.status(200).json(count)
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error('Failed to fetch data:', error)
      res.status(500).json({ error: 'Failed to fetch data' })
    }
  } else {
    // Handle any requests that aren't GET
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
