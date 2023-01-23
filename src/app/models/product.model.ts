import { Category } from './category.model'

export interface Product {
  id: string
  name: string
  description?: string
  category: Category
  stock: number
  price: number
}

export interface DbProduct {
  id: string
  name: string
  description?: string
  category: string
  stock: number
  price: number
}
