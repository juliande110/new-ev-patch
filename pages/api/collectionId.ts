import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const response = await axios.get(
        'https://emblemvault-io-v3-6156a7b1ac82.herokuapp.com/reservoir/collection-sets/latest',
      )
      const collectionSetID = response.data.collectionSetID

      // Respond with the collectionSetID
      res.status(200).json({ collectionSetID })
    } catch (error) {
      // Handle any errors that occur during the API call
      res.status(500).json({ error: 'Failed to fetch data' })
    }
  } else {
    // Handle any requests that aren't GET
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
