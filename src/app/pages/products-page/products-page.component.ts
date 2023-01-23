import { Component } from '@angular/core'
import { Product } from 'src/app/models/product.model'

import { ProductsService } from '../../services/products.service'

@Component({
  selector: "app-products-page",
  templateUrl: "./products-page.component.html",
  styleUrls: ["./products-page.component.scss"]
})
export class ProductsPageComponent {
  products: Product[] = []

  constructor(private productsService: ProductsService) {
    this.productsService.getAllProducts().subscribe(allProducts => (this.products = allProducts))
    this.productsService.updateProducts().subscribe()
  }
}
