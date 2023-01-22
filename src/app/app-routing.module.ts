import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CategoryFormPageComponent } from './pages/category-form-page/category-form-page.component'
import { ProductFormPageComponent } from './pages/product-form-page/product-form-page.component'
import { ProductsByCategoryPageComponent } from './pages/products-by-category-page/products-by-category-page.component'
import { ProductsPageComponent } from './pages/products-page/products-page.component'
import { ShoppingCartPageComponent } from './pages/shopping-cart-page/shopping-cart-page.component'

const routes: Routes = [
  { path: '', component: ProductsPageComponent },
  {
    path: 'products-by-categories/:id',
    component: ProductsByCategoryPageComponent,
  },
  { path: 'categoryForm', component: CategoryFormPageComponent },
  { path: 'productForm', component: ProductFormPageComponent },
  { path: 'shoppingCart', component: ShoppingCartPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
