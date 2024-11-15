export interface AssetMetaData {
  id: number
  addresses: Address[]
  attributes: Attribute[]
  basePath: string
  ciphertext?: any
  cipherTextHash?: any
  description: string
  image: string
  key_attestation?: any
  name: string
  network: string
  pubkey: string
  to: string
  tokenId: string
  tx?: any
  vaultName?: any
  version: number
  animation_url?: any
  background_color?: any
  external_url: string
  youtube_url?: any
  embed: boolean
  ownedImage?: any
  ciphertextV2: string
  live: boolean
  nonce?: any
  signature?: any
  sealed: boolean
  collectionAddress?: any
  targetContract: TargetContract
  targetAsset: TargetAsset
  mintLocked: boolean
  mintLockBlock: number
  fraud: boolean
  v2Backup?: any
  v2BackupKey?: any
  batchId?: any
  batch_index?: any
  coverImage?: any
  move_targetContract?: any
  move_targetAsset?: any
  totalValue: number
  values: Value[]
  status: string
  claimedBy?: any
  ownershipInfo: OwnershipInfo
  curation_status: string
}
export interface OwnershipInfo {
  id: number
  created_at: string
  tokenId: string
  owner: string
  internalTokenId: string
  serialNumber: string
  contract: string
  category: string
  blockUpdated: string
  createdBy: string
  status: string
  claimedBy?: any
  network: string
  balances: Balance[]
}
export interface Balance {
  coin: string
  name: string
  balance: number
  type: string
  external_url: string
  image: string
  project: string
  projectLogo: string
  projectSite: string
  traits: Trait[]
  assetName: string
  series: number
  order: number
  issued: number
  burned: number
  circulating: number
}
export interface Value {
  coin: string
  name: string
  balance: number
  type: string
  external_url: string
  image: string
  project: string
  projectLogo: string
  projectSite: string
  traits: Trait[]
  assetName: string
  series: number
  order: number
  issued: number
  burned: number
  circulating: number
  price: number
  percentage: number
}
export interface Trait {
  trait_type: string
  value: number | string
}
export interface TargetAsset {
  image: string
  projectName: string
  projectLogo: string
  projectSite: string
  burned: number
  divisible: number
  order: number
  quantity: number
  series: number
  remaining: number
  oldImage: string
  raw: Raw
  assetName: string
  name: string
  contentType: ContentType
}
export interface ContentType {
  valid: boolean
  contentType: string
  extension: string
  embed: boolean
}
export interface Raw {
  id: number
  name: string
  title?: any
  image: string
  collection: string
  supply: number
  serie: number
  card: number
  topHolders: number
  pick: boolean
  artist: Artist
  floor: Floor
  lastSale: LastSale
  rank: number
  price: number
  lastPrice: number
}
export interface LastSale {
  value: number
  ref: string
  usd: number
  quantity: number
}
export interface Floor {
  value: number
  ref: string
  quantity: number
}
export interface Artist {
  name: string
  slug: string
}
export interface TargetContract {
  '1': string
  id: number
  created_at: string
  contracts: Contracts
  name: string
  nativeAssets: string[]
  mintable: boolean
  autoLoad: boolean
  addressChain: string
  collectionType: string
  loadTypes: string[]
  description: string
  purchaseMethod: string
  showBalance: boolean
  balanceUrl: string
  price: number
  collectionChain: string
  balanceQty?: any
  imageHandler: string
  loadingImages: string[]
  placeholderImages: string[]
  balanceAfterLive: boolean
  balanceCheckers: string[]
  tokenIdScheme?: any
  vaultCollectionType: string
  attributes: Attribute2[]
  tokenId: string
  serialNumber: string
}
export interface Attribute2 {
  trait_type: string
}
export interface Contracts {
  '1': string
}
export interface Attribute {
  trait_type: string
  value: string
}
export interface Address {
  path: string
  address: string
  coin: string
}