import { Component, OnDestroy } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Subscription } from 'rxjs'
import { DbProduct } from 'src/app/models/product.model'
import { ProductsService } from 'src/app/services/products.service'

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
  categoriesChangesSubscription = new Subscription()
  modeChangesSubscription = new Subscription()
  mode: "creation" | "edition" = "creation"
  titles = { "creation": "Crea un nuevo producto", "edition": "Edita el producto" }

  submitProduct = () => {
    if (this.mode == "creation") this.createProduct()
    else this.editProduct()
  }

  createProduct() {
    if (this.productsForm.invalid) return
    const { name, description, category, stock, price } = this.productsForm.value
    const errorMsg = "Hubo un error al crear este producto"
    const successMsg = "Producto creado con éxito"
    this.productsService
      .createProduct(<DbProduct>{ name, description, category, stock, price })
      .subscribe({
        next: () => this.snackbar.open(successMsg, undefined, { duration: 2000 }),
        error: () => this.snackbar.open(errorMsg, undefined, { duration: 2000 })
      })
  }

  editProduct() {
    const successMsg = "Edición exitosa"
    const errorMsg = "Hubo un error al momento de hacer la edición"
    if (this.productsForm.invalid) return
    let { name, description, category, price, stock } = this.productsForm.value
    const id = this.productsService.productToEdit?.id
    if (!id || !name || !price || !stock || !category) return
    const updatedData: DbProduct = { id, name, description, category, price, stock }
    this.productsService.setProductToEdit(updatedData)
    this.productsService.editProduct().subscribe({
      next: () => this.snackbar.open(successMsg, undefined, { duration: 2000 }),
      error: () => this.snackbar.open(errorMsg, undefined, { duration: 2000 })
    })
  }

  subscribeToCategoriesChanges() {
    this.categoriesChangesSubscription = this.categoriesService
      .getCategories()
      .subscribe(categoriesOnDb => (this.categories = categoriesOnDb))
  }

  subscribeToModeChanges() {
    this.modeChangesSubscription = this.productsService.getMode().subscribe(mode => {
      this.mode = mode
      if (mode === "creation") this.productsForm.reset()
      else {
        if (!this.productsService.productToEdit) throw new Error("product to edit data is null")
        let { name, category, price, stock, description } = this.productsService.productToEdit
        if (!category) throw new Error("product to edit data is corrupted")
        if (!description) description = ""
        this.productsForm.setValue({ name, description, category: category, price, stock })
      }
    })
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
    this.categoriesChangesSubscription.unsubscribe()
    this.modeChangesSubscription.unsubscribe()
  }

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private snackbar: MatSnackBar
  ) {
    this.productsForm = new FormGroup(<ProductsFormControls>{
      name: new FormControl("", Validators.required),
      description: new FormControl(""),
      category: new FormControl("", Validators.required),
      stock: new FormControl(0, [Validators.required, Validators.min(0)]),
      price: new FormControl(0, [Validators.required, Validators.min(0)])
    })
    this.subscribeToModeChanges()
    this.subscribeToCategoriesChanges()
  }
}
