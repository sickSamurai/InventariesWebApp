import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'

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
    const successMsg = "Categoría insertada exitosamente"
    const errorMsg = "¡Error! ya hay una categoría con ese nombre"
    const { name, description } = this.categoryForm.value
    const categoryToSave = <Category>{ name, description }
    this.categoriesService.setCategoryToSave(categoryToSave)
    this.categoriesService.createCategory().subscribe({
      next: () => this.snackBar.open(successMsg, undefined, { duration: 2000 }),
      error: () => this.snackBar.open(errorMsg, undefined, { duration: 2000 })
    })
  }

  constructor(private categoriesService: CategoriesService, private snackBar: MatSnackBar) {
    this.categoryForm = new FormGroup(<CategoryFormControls>{
      name: new FormControl("", [Validators.required]),
      description: new FormControl("")
    })
  }
}
