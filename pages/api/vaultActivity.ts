import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { tokenId } = req.query

  if (req.method === 'GET') {
    try {
      // Construct the external API URL
      const url = `https://v2.emblemvault.io/allBackingIdsForTokenId/${tokenId}`
      const response = await axios.get(url)
      // Respond with the data
      res.status(200).json(response.data)
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
