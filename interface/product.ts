export interface Product {
  id: string;
  name: string;
  categoryId: number;
  manufacturerId: number;
  price: number;
  description?: string;
  mainImg?: string;
  genderId: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface ProductList {
  products?: Product[];
}
