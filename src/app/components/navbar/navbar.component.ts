import { Component } from '@angular/core'
import { DailyReportsService } from 'src/app/services/daily-report.service'

import { Category } from '../../models/category.model'
import { CategoriesService } from '../../services/categories.service'

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {
  categories = new Array<Category>()

  updateReport() {
    this.reportsService.getDailyReport().subscribe()
  }

  constructor(
    private categoriesService: CategoriesService,
    private reportsService: DailyReportsService
  ) {
    this.categoriesService.updateCategories().subscribe()
    this.categoriesService
      .getCategories()
      .subscribe(categoriesOnDb => (this.categories = categoriesOnDb))
  }
}
