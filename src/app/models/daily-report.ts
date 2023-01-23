import { Transaction } from './transaction.model'

export interface DailyReport {
  transactions: Transaction[]
  total: number
}
