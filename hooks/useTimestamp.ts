export default function getTimestamp (option: string = '') {
  const timestampInSeconds = Math.floor(Date.now() / 1000)
  let endTimestamp

  switch (option) {
    case '30d':
      endTimestamp = timestampInSeconds - 60 * 60 * 24 * 30
      break
    case '7d':
      endTimestamp = timestampInSeconds - 60 * 60 * 24 * 7
      break
    case '24h':
      endTimestamp = timestampInSeconds - 60 * 60 * 24
      break
    case '6h':
      endTimestamp = timestampInSeconds - 60 * 60 * 6
      break
    case '1h':
      endTimestamp = timestampInSeconds - 60 * 60
      break
    case '10m':
      endTimestamp = timestampInSeconds - 60 * 10
      break
  }

  return { timestampInSeconds, endTimestamp }
}