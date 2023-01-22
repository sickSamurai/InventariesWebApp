import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { Category } from '../../models/category.model'
import { CategoriesService } from '../../services/categories.service'

type CategoryFormControls = {
  name: FormControl
  description: FormControl
}

@Component({
  selector: "app-category-form-page",
  templateUrl: "./category-form-page.component.html",
  styleUrls: ["./category-form-page.component.scss"]
})
export class CategoryFormPageComponent {
  categoryForm: FormGroup<CategoryFormControls>

  createCategory() {
    if (this.categoryForm.invalid) return
    const { name, description } = this.categoryForm.value
    const categoryToSave = <Category>{ name, description }
    this.categoriesService.setCategoryToSave(categoryToSave)
    this.categoriesService.createCategory().subscribe({
      next: (err, category) => {}
    })
  }

  constructor(private categoriesService: CategoriesService) {
    this.categoryForm = new FormGroup(<CategoryFormControls>{
      name: new FormControl("", [Validators.required]),
      description: new FormControl("")
    })
  }
}
