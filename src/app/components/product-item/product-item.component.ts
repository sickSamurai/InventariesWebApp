import { Component, Input } from '@angular/core'
import { Product } from 'src/app/models/product.model'

import { ShoppingCartService } from '../../services/shopping-cart.service'

@Component({
  selector: "app-product-item",
  templateUrl: "./product-item.component.html",
  styleUrls: ["./product-item.component.scss"]
})
export class ProductItemComponent {
  @Input() product?: Product

  addToShoppingCart() {
    if (this.product) this.shoppingCartService.addProductToShoppingCart(this.product)
  }

  constructor(private shoppingCartService: ShoppingCartService) {}
}
