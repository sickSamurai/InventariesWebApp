import { Component } from '@angular/core'

import { Transaction } from '../../models/transaction.model'
import { ShoppingCartService } from '../../services/shopping-cart.service'

@Component({
  selector: "app-shopping-cart-page",
  templateUrl: "./shopping-cart-page.component.html",
  styleUrls: ["./shopping-cart-page.component.scss"]
})
export class ShoppingCartPageComponent {
  transactions = [] as Transaction[]

  concreteSell() {}

  constructor(private shoppingCartService: ShoppingCartService) {
    this.shoppingCartService
      .getTransactions()
      .subscribe(transactions => (this.transactions = transactions))
  }
}
