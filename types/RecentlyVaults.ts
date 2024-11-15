export interface RecentlyVaults {
    activities: Activity[]
    pageInfo: PageInfo
}

export interface Activity {
    id: number
    internalTokenID: string
    curatedCollectionName: string | undefined
    assetName: string | undefined
    assetImage: string | null
    actionTimestamp: string | null
    action: string
}

export interface PageInfo {
    hasNextPage: boolean
    hasPrevPage: boolean
    nextCursor: string | null
    pageSize: number
    prevCursor: string | null
}