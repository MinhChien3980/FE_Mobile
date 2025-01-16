export interface Variant {
  size?: number[]; // Kích cỡ (tuỳ chọn)
  color?: string; // Màu sắc (tuỳ chọn)
  img_details: string[]; // Danh sách hình ảnh chi tiết
  stock: number; // Số lượng hàng tồn kho
  sku: string; // Mã SKU của sản phẩm
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  imgs: string[];
  mainImg: string;
  variant: Variant[];
  category: string;
}

export interface ProductList {
  products?: Product[];
}
