import { Product } from './product.model'

export interface Transaction {
  id?: string
  product: Product
  units: number
  subtotal: number
}

export interface TransactionDb {
  product: string
  units: number
}

export interface TransactionView {
  productName: string
  units: number
  subtotal: number
}
