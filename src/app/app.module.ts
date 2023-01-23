import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AngularMaterialModule } from './angular-material/angular-material.module'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NavbarComponent } from './components/navbar/navbar.component'
import { ToastComponent } from './components/toast/toast.component'
import { CategoryFormPageComponent } from './pages/category-form-page/category-form-page.component'
import { CategoryListPageComponent } from './pages/category-list-page/category-list-page.component'
import { ProductFormPageComponent } from './pages/product-form-page/product-form-page.component'
import { ProductsByCategoryPageComponent } from './pages/products-by-category-page/products-by-category-page.component'
import { ProductsPageComponent } from './pages/products-page/products-page.component'
import { ShoppingCartPageComponent } from './pages/shopping-cart-page/shopping-cart-page.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { EmptyShoppingCartComponent } from './components/empty-shopping-cart/empty-shopping-cart.component'

@NgModule({
  declarations: [
    AppComponent,
    ProductFormPageComponent,
    CategoryFormPageComponent,
    ShoppingCartPageComponent,
    ProductsPageComponent,
    ProductsByCategoryPageComponent,
    CategoryListPageComponent,
    NavbarComponent,
    ToastComponent,
    ProductItemComponent,
    ProductListComponent,
    TransactionsListComponent,
    CustomerFormComponent,
    EmptyShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
