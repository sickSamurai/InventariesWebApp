import { Component } from '@angular/core'

import { Category } from '../../models/category.model'
import { CategoriesService } from '../../services/categories.service'

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {
  categories = new Array<Category>()

  constructor(private categoriesService: CategoriesService) {
    this.categoriesService.updateCategories().subscribe()
    this.categoriesService
      .getCategories()
      .subscribe(categoriesOnDb => (this.categories = categoriesOnDb))
  }
}
