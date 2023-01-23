import { TransactionDb } from './transaction.model'

export interface Bill {
  customer: string
  transactions: TransactionDb[]
}
