export interface Owner {
  ownership: Ownership
  address: string | undefined
}

export interface DisplayOwner {
  address: string | undefined
  itemsCount: number
  name: string | null
  profileImage: string | null
}

interface Ownership {
  floorAskPrice: FloorAskPrice
  onSaleCount: string | null
  tokenCount: string | null
  topBidValue: string | null
  totalBidValue: string | null
}

interface FloorAskPrice {
  amount: Amount
  currency: Currency
}

interface Amount {
  decimal: number
  native: number
  raw: string | null
  usd: number
}

interface Currency {
  contract: string | null
  decimals: number
  name: string | null
  symbol: string | null
}
