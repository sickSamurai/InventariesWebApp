import { Component, Input } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'

import { Transaction, TransactionView } from '../../models/transaction.model'
import { ShoppingCartService } from '../../services/shopping-cart.service'

@Component({
  selector: "app-transactions-list",
  templateUrl: "./transactions-list.component.html",
  styleUrls: ["./transactions-list.component.scss"]
})
export class TransactionsListComponent {
  @Input() transactions: Transaction[] = []
  dataSource: MatTableDataSource<TransactionView> = new MatTableDataSource()
  displayedColumns = ["productName", "units", "subtotal"]

  getTotal = () =>
    this.transactions
      .map(transaction => transaction.subtotal)
      .reduce((previous, current) => previous + current)

  getTransactionViews(transactions: Transaction[]) {
    return transactions.map(transaction => ({
      productName: transaction.product.name,
      units: transaction.units,
      subtotal: transaction.subtotal
    }))
  }

  constructor(private shoppingCartService: ShoppingCartService) {
    this.shoppingCartService
      .getTransactions()
      .subscribe(transactions => (this.dataSource.data = this.getTransactionViews(transactions)))
  }
}
