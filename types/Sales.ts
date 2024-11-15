export interface Sale {
    id: string
    saleId: string
    token: Token
    orderId: string | null
    orderSource: string | null
    orderSide: string | null
    orderKind: string | null
    from: string | null
    to: string | null
    amount: string | null
    fillSource: string | null
    block: number
    txHash: string | null
    logIndex: number
    batchIndex: number
    timestamp: number
    price: Price
    washTradingScore: number
    isDeleted: boolean
    createdAt: string | null
    updatedAt: string | null
}

export interface Token {
    contract: string
    tokenId: string
    name: string | null
    collection: Collection
}

export interface Collection {
    id: string | null
    name: string | null
} 

export interface Price {
    currency: Currency
    amount: Amount
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
}