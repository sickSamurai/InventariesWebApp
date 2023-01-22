import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AngularMaterialModule } from './angular-material/angular-material.module'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NavbarComponent } from './components/navbar/navbar.component'
import { CategoryFormPageComponent } from './pages/category-form-page/category-form-page.component'
import { CategoryListPageComponent } from './pages/category-list-page/category-list-page.component'
import { ProductFormPageComponent } from './pages/product-form-page/product-form-page.component'
import { ProductsByCategoryPageComponent } from './pages/products-by-category-page/products-by-category-page.component'
import { ProductsPageComponent } from './pages/products-page/products-page.component'
import { ShoppingCartPageComponent } from './pages/shopping-cart-page/shopping-cart-page.component'

@NgModule({
  declarations: [
    AppComponent,
    ProductFormPageComponent,
    CategoryFormPageComponent,
    ShoppingCartPageComponent,
    ProductsPageComponent,
    ProductsByCategoryPageComponent,
    CategoryListPageComponent,
    NavbarComponent
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, AngularMaterialModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
