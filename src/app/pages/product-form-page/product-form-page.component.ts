import { Component, OnDestroy } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Subscription } from 'rxjs'
import { ProductToDb } from 'src/app/models/product.model'
import { ProductsService } from 'src/app/services/products.service'

import { ToastComponent } from '../../components/toast/toast.component'
import { Category } from '../../models/category.model'
import { CategoriesService } from '../../services/categories.service'

interface ProductsFormControls {
  name: FormControl<string>
  description: FormControl<string>
  category: FormControl<string>
  price: FormControl<number>
  stock: FormControl<number>
}

@Component({
  selector: "app-product-form-page",
  templateUrl: "./product-form-page.component.html",
  styleUrls: ["./product-form-page.component.scss"]
})
export class ProductFormPageComponent implements OnDestroy {
  categories = new Array<Category>()
  productsForm: FormGroup<ProductsFormControls>
  subscriptionToCategories = new Subscription()

  submitProduct() {
    if (this.productsForm.invalid) return
    const { name, description, category, stock, price } = this.productsForm.value
    this.productsService.setProductToSave(<ProductToDb>{ name, description, category, stock, price })
    const errorMsg = "Hubo un error al crear este producto"
    const successMsg = "Producto creado con éxito"
    this.productsService.createProduct().subscribe({
      next: () => this.snackbar.openFromComponent(ToastComponent, { data: successMsg, duration: 2000 }),
      error: () => this.snackbar.openFromComponent(ToastComponent, { data: errorMsg, duration: 2000 })
    })
  }

  subscribeToCategories() {
    this.subscriptionToCategories = this.categoriesService
      .getCategories()
      .subscribe(categoriesOnDb => (this.categories = categoriesOnDb))
  }

  get priceError() {
    const errors = this.productsForm.controls.price.errors
    if (!errors) return null
    if (errors["required"]) return "Este campo es requerido"
    if (errors["min"]) return "El valor mínimo es 0"
    return null
  }

  get stockError() {
    const errors = this.productsForm.controls.stock.errors
    if (!errors) return null
    if (errors["required"]) return "Este campo es requerido"
    if (errors["min"]) return "El valor mínimo es 0"
    return null
  }

  ngOnDestroy(): void {
    this.subscriptionToCategories.unsubscribe()
  }

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private snackbar: MatSnackBar
  ) {
    this.subscribeToCategories()
    this.productsForm = new FormGroup(<ProductsFormControls>{
      name: new FormControl("", Validators.required),
      description: new FormControl(""),
      category: new FormControl("", Validators.required),
      stock: new FormControl(0, [Validators.required, Validators.min(0)]),
      price: new FormControl(0, [Validators.required, Validators.min(0)])
    })
  }
}
