import { Component, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { Category } from 'src/app/models/category.model'
import { CategoriesService } from 'src/app/services/categories.service'

@Component({
  selector: "app-drawer",
  templateUrl: "./drawer.component.html",
  styleUrls: ["./drawer.component.scss"]
})
export class CategoriesSidebarComponent implements OnDestroy {
  categories: Category[] = []
  opened = false
  subscriptionToCategoriesChanges = new Subscription()
  open = () => (this.opened = true)
  close = () => (this.opened = false)

  ngOnDestroy(): void {
    this.subscriptionToCategoriesChanges.unsubscribe()
  }

  constructor(private categoriesService: CategoriesService) {
    this.subscriptionToCategoriesChanges = this.categoriesService.updateCategories().subscribe()
    this.categoriesService
      .getCategories()
      .subscribe(categoriesOnDb => (this.categories = categoriesOnDb))
  }
}
