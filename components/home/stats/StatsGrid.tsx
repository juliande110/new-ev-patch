import { NextPage } from 'next'
import LegacyData from './EVLegacyData'
import { Box } from '../../primitives'
import axios from 'axios'
import { useEffect, useState } from 'react'

const StatsGrid: NextPage = () => {
  const [stats, setStats] = useState({
    protocols: '',
    blockchains: '',
    legacy_stats: {
      volume: {
        amount: '',
        currency: '',
      },
      minted: '',
      unvaulted: '',
      holders: '',
    },
    curated_stats: {
      collections: '',
      vaulted: '',
      minted: '',
      unvaulted: '',
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/emblemStats')
        setStats(response.data)
      } catch (error) {
        console.error('Failed to fetch stats', error)
      }
    }

    fetchData()
  }, [])

  return (
    <Box
      as="section"
      id="InsideData"
      css={{
        flex: 1,
        overflowX: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'left',
        fontSize: '12px',
        display: 'flex',
        fontFamily: 'Inter',
        gap: '20px',
        '@media screen and (max-width: 960px)': {
          display: 'grid',
          gridTemplateColumns: '2fr 2fr',
          gridGap: 40,
        },
        '@media screen and (max-width: 420px)': {
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <LegacyData
        statName="Total Volume"
        statValue={`${stats.legacy_stats.volume.amount} ${stats.legacy_stats.volume.currency}`}
      />
      <LegacyData
        statName="Total Vaults"
        statValue={`${stats.curated_stats.vaulted}`}
      />
      <LegacyData
        statName="Collections"
        statValue={`${stats.curated_stats.collections}`}
      />
      <LegacyData
        statName="Supported Protocols"
        statValue={`${stats.protocols}`}
      />
      <LegacyData
        statName="Blockchain deployments"
        statValue={`${stats.blockchains}`}
      />
    </Box>
  )
}

export default StatsGrid
