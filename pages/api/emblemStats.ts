import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const response = await axios.get(
        'https://emblemvault-io-v3-6156a7b1ac82.herokuapp.com/stats',
      )
      const data = {
        protocols: response.data.protocols,
        blockchains: response.data.blockchains,
        legacy_stats: {
          volume: {
            amount: response.data.legacy_stats.volume.amount,
            currency: response.data.legacy_stats.volume.currency,
          },
          minted: response.data.legacy_stats.minted,
          unvaulted: response.data.legacy_stats.unvaulted,
          holders: response.data.legacy_stats.holders,
        },
        curated_stats: {
          collections: response.data.curated_stats.collections,
          vaulted: response.data.curated_stats.vaulted,
          minted: response.data.curated_stats.minted,
          unvaulted: response.data.curated_stats.unvaulted,
        },
      }

      // Respond with the structured data
      res.status(200).json(data)
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
