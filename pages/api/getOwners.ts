import type { NextApiRequest, NextApiResponse } from 'next'
import fetcher from 'utils/fetcher'
import axios from 'axios'

const reservoirBaseUrl = process.env.NEXT_PUBLIC_RESERVOIR_URL

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { token } = req.query

  if (req.method === 'GET') {
    try {
      // Construct the external API URL
      const url = `${reservoirBaseUrl}/owners/v2`
      let tokensQuery = {
        token: token,
        limit: 500,
      }
      const headers = {
        headers: {
          'x-api-key': process.env.RESERVOIR_API_KEY || '',
        },
      }
      const { data } = await fetcher(url, tokensQuery, headers)

      // Respond with the data
      res.status(200).json(data.owners)
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
