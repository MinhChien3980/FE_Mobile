export interface Product {
  id: string;
  name: string;
  price: number;
  image: any;
}
export interface ProductList {
  products?: Product[];
}
