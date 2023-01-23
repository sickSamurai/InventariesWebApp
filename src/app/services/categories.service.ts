import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, tap } from 'rxjs'

import { Category } from '../models/category.model'
import { DbResponse } from '../models/db-response'

@Injectable({
  providedIn: "root"
})
export class CategoriesService {
  apiUrl = "https://localhost:7277/api/categories"
  categories = new BehaviorSubject<Category[]>([])
  categoryToSave?: Category

  setCategoryToSave(category: Category) {
    this.categoryToSave = category
  }

  getCategories = () => this.categories.asObservable()

  updateCategories = () =>
    this.httpClient
      .get<Category[]>(this.apiUrl)
      .pipe(tap(categoriesOnDb => this.categories.next(categoriesOnDb)))

  createCategory = () =>
    this.httpClient
      .post<DbResponse>(this.apiUrl, this.categoryToSave)
      .pipe(tap(() => this.updateCategories().subscribe()))

  constructor(private httpClient: HttpClient) {}
}
