import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, tap } from 'rxjs'

import { DailyReport } from '../models/daily-report'
import { Transaction } from '../models/transaction.model'

@Injectable({
  providedIn: "root"
})
export class DailyReportsService {
  apiUrl = "https://localhost:7277/api/dailyReports"
  transactions = new BehaviorSubject<Transaction[]>([])
  total = new BehaviorSubject<number>(0)

  getTransactions = () => this.transactions.asObservable()

  getTotal = () => this.total.asObservable()

  getDailyReport = () =>
    this.httpClient.get<DailyReport>(this.apiUrl).pipe(
      tap(response => {
        this.transactions.next(response.transactions)
        this.total.next(response.total)
      })
    )

  constructor(private httpClient: HttpClient) {}
}
