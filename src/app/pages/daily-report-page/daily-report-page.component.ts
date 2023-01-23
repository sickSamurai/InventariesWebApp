import { Component } from '@angular/core'
import { Transaction } from 'src/app/models/transaction.model'

import { DailyReportsService } from '../../services/daily-report.service'

@Component({
  selector: "app-daily-report-page",
  templateUrl: "./daily-report-page.component.html",
  styleUrls: ["./daily-report-page.component.scss"]
})
export class DailyReportPageComponent {
  transactions = new Array<Transaction>()

  constructor(private dailyReportsService: DailyReportsService) {
    this.dailyReportsService
      .getTransactions()
      .subscribe(transactions => (this.transactions = transactions))
  }
}
