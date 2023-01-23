import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { Product } from 'src/app/models/product.model'

import { DbProduct } from '../../models/product.model'
import { ProductsService } from '../../services/products.service'
import { ShoppingCartService } from '../../services/shopping-cart.service'

@Component({
  selector: "app-product-item",
  templateUrl: "./product-item.component.html",
  styleUrls: ["./product-item.component.scss"]
})
export class ProductItemComponent {
  @Input() product?: Product

  addToShoppingCart() {
    if (this.product) this.shoppingCartService.addProduct(this.product)
  }

  setupEdition() {
    if (!this.product) return
    const { id, name, description, category, price, stock } = this.product
    const productToEdit = <DbProduct>{ id, name, description, category: category.id, price, stock }
    this.productsService.setProductToEdit(productToEdit)
    this.productsService.setMode("edition")
    this.router.navigateByUrl("/productForm")
  }

  deleteFromShoppingCart() {
    if (this.product) this.shoppingCartService.deleteProduct(this.product.id)
  }

  constructor(
    private shoppingCartService: ShoppingCartService,
    private productsService: ProductsService,
    private router: Router
  ) {}
}
