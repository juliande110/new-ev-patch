import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const link = process.env.NEXT_PUBLIC_RECENT_ACTIVITY_URL

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const param = req.query

  if (req.method === 'GET') {
    try {
      // Construct the external API URL
      const response = await axios.get(`${link}`, {
        params: param,
      })
      // Respond with the data
      res.status(200).json(response.data)
    } catch (error) {
      console.error('Failed to fetch data:', error)
      res.status(500).json({ error: 'Failed to fetch data' })
    }
  } else {
    // Handle any requests that aren't GET
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
