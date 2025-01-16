// ShoeSize enum
export enum ShoeSize {
  SIZE_35 = 35,
  SIZE_36 = 36,
  SIZE_37 = 37,
  SIZE_38 = 38,
  SIZE_39 = 39,
  SIZE_40 = 40,
  SIZE_41 = 41,
  SIZE_42 = 42,
  SIZE_43 = 43,
  SIZE_44 = 44,
  SIZE_45 = 45,
  SIZE_46 = 46,
}

// AgeGroupCategory enum
export enum AgeGroupCategory {
  YOUNG = "YOUNG",
  MID = "MID",
  OLD = "OLD",
}

// Gender enum
export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  UNISEX = "UNISEX",
}

// Discount interface
export interface Discount {
  id: number;
  code: string;
  description: string;
  discountPercentage: number;
  validDate: string; // ISO 8601 date format
  invalidDate: string; // ISO 8601 date format
  createdAt: string; // ISO 8601 date format
  updatedAt: string; // ISO 8601 date format
  deletedAt?: string | null; // Optional ISO 8601 date format
}

// Category interface
export interface Category {
  id: number;
  name: string;
  description: string;
  products: Product[]; // List of related products
  age: AgeGroupCategory;
  gender: Gender;
  createdAt: string; // ISO 8601 date format
  updatedAt: string; // ISO 8601 date format
  deletedAt?: string | null; // Optional ISO 8601 date format
}

// ProductMedia interface
export interface ProductMedia {
  id: number;
  url: string;
  type: string;
}

// Wishlist interface (assuming basic structure)
export interface Wishlist {
  id: number;
  name: string;
}

// Product interface
export interface Product {
  id: number;
  name: string;
  // category: any; // Reference to Category
  description: string;
  price: number;
  size: any[]; // List of shoe sizes
  productMediaUrls: any[]; // List of media items
  status: any;
  stock: number;
  createdAt: any; // ISO 8601 date format
  updatedAt: any; // ISO 8601 date format
  deletedAt?: string | null; // Optional ISO 8601 date format
}
