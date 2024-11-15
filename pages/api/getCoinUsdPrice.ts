import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const coinBaseURL = process.env.NEXT_PUBLIC_COIN_COIN_BASE_URL

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { tokenName } = req.query

  if (req.method === 'GET') {
    try {
      // Construct the external API URL
      const url = `${coinBaseURL}/${tokenName}-USD/spot`
      const { data } = await axios.get(url)

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
