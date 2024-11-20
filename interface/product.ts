export interface Product {
  id: string;
  name: string;
  categoryId: number;
  price: number;
  description?: string;
  mainImg?: string;
  genderId: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  manufacturerName?: string;
}

export interface ProductList {
  products?: Product[];
}
