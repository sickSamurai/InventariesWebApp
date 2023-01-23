import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, tap } from 'rxjs'
import { Product } from 'src/app/models/product.model'
import { Transaction } from 'src/app/models/transaction.model'

import { Bill } from '../models/Bill.model'
import { Customer } from '../models/customer.model'
import { TransactionDb } from '../models/transaction.model'
import { ProductsService } from './products.service'

@Injectable({
  providedIn: "root"
})
export class ShoppingCartService {
  billsUrl = "https://localhost:7277/api/bills"
  customersUrl = "https://localhost:7277/api/customers"
  productsInShoppingCart: Product[] = []
  transactions = new BehaviorSubject<Transaction[]>([])

  getTransactions = () => this.transactions.asObservable()

  addProductToShoppingCart(product: Product) {
    this.productsInShoppingCart.push(product)
    this.updateTransactions()
  }

  getProductsUnits = (id: string) =>
    this.productsInShoppingCart.filter(product => product.id == id).length

  updateTransactions() {
    const products = [] as string[]
    const transactions: Transaction[] = []

    this.productsInShoppingCart.forEach(product => {
      if (!products.includes(product.id)) {
        products.push(product.id)
        const units = this.getProductsUnits(product.id)
        transactions.push({ product, units, subtotal: product.price * units })
      }
    })

    this.transactions.next(transactions)
  }

  createCustomer(customer: Customer) {
    return this.httpClient.post(this.customersUrl, { ...customer })
  }

  editCustomer(customer: Customer) {
    return this.httpClient.put(this.customersUrl, { ...customer })
  }

  generateBill(bill: Bill) {
    return this.httpClient
      .post(this.billsUrl, bill)
      .pipe(tap(() => this.productsService.updateProducts().subscribe()))
      .pipe(tap(() => this.transactions.next([])))
  }

  getDbTransactions() {
    return this.transactions.value.map<TransactionDb>(transaction => ({
      product: transaction.product.id,
      units: transaction.units
    }))
  }

  constructor(private httpClient: HttpClient, private productsService: ProductsService) {}
}
