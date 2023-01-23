import { Component, Input } from '@angular/core'

import { Transaction } from '../../models/transaction.model'
import { ShoppingCartService } from '../../services/shopping-cart.service'

@Component({
  selector: "app-transactions-list",
  templateUrl: "./transactions-list.component.html",
  styleUrls: ["./transactions-list.component.scss"]
})
export class TransactionsListComponent {
  @Input() transactions: Transaction[] = []
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

  constructor(private shoppingCartService: ShoppingCartService) {}
}
