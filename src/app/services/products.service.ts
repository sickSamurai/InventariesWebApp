import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, tap } from 'rxjs'

import { DbProduct, Product } from '../models/product.model'

type Mode = "edition" | "creation"

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  apiUrl = "https://localhost:7277/api/products"
  products = new BehaviorSubject<Product[]>([])
  productsByCategory = new BehaviorSubject<Product[]>([])
  mode = new BehaviorSubject<Mode>("creation")
  productToEdit?: DbProduct

  setMode(mode: Mode) {
    this.mode.next(mode)
  }

  setProductToEdit(product: DbProduct) {
    this.productToEdit = product
  }

  getMode = () => this.mode.asObservable()

  getAllProducts = () => this.products.asObservable()

  getProductsByCategory = () => this.productsByCategory.asObservable()

  createProduct = (productToSave: DbProduct) =>
    this.httpClient.post(this.apiUrl, productToSave).pipe(tap(() => this.requestProducts().subscribe()))

  editProduct = () =>
    this.httpClient
      .put(this.apiUrl, this.productToEdit)
      .pipe(tap(() => this.requestProducts().subscribe()))

  requestProducts = () =>
    this.httpClient
      .get<Product[]>(this.apiUrl)
      .pipe(tap(productsOnDb => this.products.next(productsOnDb)))

  requestProductsByCategory = (categoryId: string) =>
    this.httpClient
      .get<Product[]>(`${this.apiUrl}/${categoryId}`)
      .pipe(tap(productsByCategory => this.productsByCategory.next(productsByCategory)))

  constructor(private httpClient: HttpClient) {}
}
