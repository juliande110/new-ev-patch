import type { NextApiRequest, NextApiResponse } from 'next'
import fetcher from 'utils/fetcher'

const reservoirBaseUrl = process.env.NEXT_PUBLIC_RESERVOIR_URL

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query

  if (req.method === 'GET') {
    try {
      // Construct the external API URL
      let count = 0
      const url = `${reservoirBaseUrl}/users/activity/v6`
      let ActivityQuery = {
        ...query,
        continuation: undefined,
      }
      const headers = {
        headers: {
          'x-api-key': process.env.RESERVOIR_API_KEY || '',
        },
      }
      do {
        const {
          data: { activities: activities, continuation: continuation },
        } = await fetcher(url, ActivityQuery, headers)
        count += activities.length
        ActivityQuery.continuation = continuation
      } while (ActivityQuery.continuation)

      res.status(200).json(count)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
