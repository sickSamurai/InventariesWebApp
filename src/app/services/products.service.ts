import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, tap } from 'rxjs'

import { Product, ProductToDb } from '../models/product.model'

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  apiUrl = "https://localhost:7277/api/products"
  productToSave?: ProductToDb
  products = new BehaviorSubject<Product[]>([])
  productsByCategory = new BehaviorSubject<Product[]>([])

  setProductToSave(product: ProductToDb) {
    this.productToSave = product
  }

  getAllProducts = () => this.products.asObservable()

  getProductsByCategory = () => this.productsByCategory.asObservable()

  createProduct = () =>
    this.httpClient
      .post(this.apiUrl, this.productToSave)
      .pipe(tap(() => this.updateProducts().subscribe()))

  updateProducts = () =>
    this.httpClient
      .get<Product[]>(this.apiUrl)
      .pipe(tap(productsOnDb => this.products.next(productsOnDb)))

  updateProductsByCategory = (categoryId: string) =>
    this.httpClient
      .get<Product[]>(`${this.apiUrl}/${categoryId}`)
      .pipe(tap(productsByCategory => this.productsByCategory.next(productsByCategory)))

  constructor(private httpClient: HttpClient) {}
}
