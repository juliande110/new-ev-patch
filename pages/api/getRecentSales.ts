import type { NextApiRequest, NextApiResponse } from 'next'
import fetcher from 'utils/fetcher'

const reservoirBaseUrl = process.env.NEXT_PUBLIC_RESERVOIR_URL

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // Construct the external API URL
      const url = `${reservoirBaseUrl}/sales/v6`
      const headers = {
        headers: {
          'x-api-key': process.env.RESERVOIR_API_KEY || '',
        },
      }
      const { data } = await fetcher(url, req.query, headers)

      // Respond with the data
      res.status(200).json(data)
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
