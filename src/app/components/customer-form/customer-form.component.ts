import { Component, EventEmitter, Output } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Customer } from 'src/app/models/customer.model'

import { ShoppingCartService } from '../../services/shopping-cart.service'

interface CustomerFormControls {
  id: FormControl<string>
  name: FormControl<string>
  phone: FormControl<string>
  email: FormControl<string>
  address: FormControl<string>
}

@Component({
  selector: "app-customer-form",
  templateUrl: "./customer-form.component.html",
  styleUrls: ["./customer-form.component.scss"]
})
export class CustomerFormComponent {
  customerForm: FormGroup<CustomerFormControls>
  @Output() customerSubmit = new EventEmitter<Customer>()

  generateBill(customer: string) {
    const errorMsg =
      "¡Algunos productos no tienen suficientes unidades en la bodega, revisa bien los datos!"
    this.shoppingCartService
      .generateBill({ customer, transactions: this.shoppingCartService.getDbTransactions() })
      .subscribe({
        error: () => this.snackBar.open(errorMsg, undefined, { duration: 2000 })
      })
  }

  submitTransactions() {
    if (this.customerForm.invalid) return
    const { id, name, phone, email, address } = this.customerForm.value
    if (!id || !name) return
    this.shoppingCartService.createCustomer(<Customer>{ id, name, phone, email, address }).subscribe({
      next: () => this.generateBill(id),
      error: () =>
        this.shoppingCartService
          .editCustomer(<Customer>{ id, name, phone, email, address })
          .subscribe(() => this.generateBill(id))
    })
  }

  constructor(private shoppingCartService: ShoppingCartService, private snackBar: MatSnackBar) {
    this.customerForm = new FormGroup(<CustomerFormControls>{
      id: new FormControl("", Validators.required),
      name: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.pattern("[0-9]+")),
      email: new FormControl("", Validators.email),
      address: new FormControl("")
    })
  }
}
