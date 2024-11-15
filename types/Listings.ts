export interface Listing {
    id: string
    kind: string
    side: string
    status: string | null
    tokenSetId: string | null
    tokenSetSchemaHash: string | null
    contract: string | null
    maker: string | null
    taker: string | null
    price: Price
    validFrom: number
    validUntil: number
    quantityFilled: number
    quantityRemaining: number
    source: Source
    expiration: number
    feeBps: number
    feeBreakdown: FeeBreakdown
    washTradingScore: number
    isReservoir: boolean | null
    isDynamic: boolean
    createdAt: string | null
    updatedAt: string | null
}

export interface Price {
    currency: Currency
    amount: Amount
    netAmount: NetAmount
}

export interface Currency {
    contract: string
    name: string
    symbol: string
    decimals: number
}

export interface Amount {
    raw: string
    decimal: number
    usd: number
    native: number
}

export interface NetAmount {
    raw: string
    decimal: number
    usd: number
    native: number
}

export interface Source {
    id: string
    domain: string | null
    name: string | null
    icon: string | null
    url: string | null
}

export interface FeeBreakdown {
    kind: string
    recipient: string | null
    bps: number
}