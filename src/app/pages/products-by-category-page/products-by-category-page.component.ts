import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Product } from 'src/app/models/product.model'

import { ProductsService } from '../../services/products.service'

@Component({
  selector: "app-products-by-category-page",
  templateUrl: "./products-by-category-page.component.html",
  styleUrls: ["./products-by-category-page.component.scss"]
})
export class ProductsByCategoryPageComponent {
  productsByCategory?: Product[]

  updateProducts() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get("id")
      if (id != null) this.productsService.requestProductsByCategory(id).subscribe()
    })
  }

  private subscribeToProductByCategory() {
    this.productsService
      .getProductsByCategory()
      .subscribe(productOnDb => (this.productsByCategory = productOnDb))
  }

  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute) {
    this.updateProducts()
    this.subscribeToProductByCategory()
  }
}
