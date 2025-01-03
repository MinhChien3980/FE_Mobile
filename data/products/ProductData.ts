import { Category } from "../../interface/category";
import { Product } from "../../interface/product";
export const categoryList: Category[] = [
  {
    id: 1,
    name: "Running Shoes",
    genderId: 1, // Hoặc một giá trị tương ứng cho genderId
    ageGroupId: 2, // Hoặc một giá trị tương ứng cho ageGroupId
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-02-01"),
  },
  {
    id: 2,
    name: "Casual Shoes",
    genderId: 2, // Giá trị tương ứng cho genderId
    ageGroupId: 3, // Giá trị tương ứng cho ageGroupId
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-02-10"),
  },
  {
    id: 3,
    name: "Basketball Shoes",
    parentCategoryId: 2,
    genderId: 1, // Giá trị tương ứng cho genderId
    ageGroupId: 3, // Giá trị tương ứng cho ageGroupId
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-02-15"),
    description: "Shoes designed for basketball players",
  },
  {
    id: 4,
    name: "Boots",
    genderId: 2, // Giá trị tương ứng cho genderId
    ageGroupId: 2, // Giá trị tương ứng cho ageGroupId
    createdAt: new Date("2023-01-20"),
    updatedAt: new Date("2023-02-20"),
    description: "Sturdy shoes for outdoor activities",
  },
  {
    id: 5,
    name: "Formal Shoes",
    parentCategoryId: 3,
    genderId: 1, // Giá trị tương ứng cho genderId
    ageGroupId: 4, // Giá trị tương ứng cho ageGroupId
    createdAt: new Date("2023-01-25"),
    updatedAt: new Date("2023-02-25"),
    deletedAt: new Date("2024-01-01"),
  },
];
export const productData: Product[] = [
  {
    id: "1",
    name: "Sản phẩm A",
    categoryId: 1,
    price: 100,
    description: "Mô tả sản phẩm A",
    mainImg:
      "https://img.mwc.com.vn/giay-thoi-trang?w=640&h=640&FileInput=/Resources/Product/2024/10/31/z5985340358313_2b57b9b5d708bb77f22c305dbc655b2d.jpg",
    genderId: 1,
    stock: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    manufacturerName: "Nike",
  },
  {
    id: "2",
    name: "Sản phẩm B",
    categoryId: 2,
    price: 200,
    description: "Mô tả sản phẩm B",
    mainImg:
      "https://img.mwc.com.vn/giay-thoi-trang?w=640&h=640&FileInput=/Resources/Product/2024/10/31/z5985159219986_abb7101693ae82494361dd8227edd8ca.jpg",
    genderId: 2,
    stock: 20,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    manufacturerName: "Adidas",
  },
  {
    id: "3",
    name: "Sản phẩm C",
    categoryId: 3,
    price: 300,
    description: "Mô tả sản phẩm C",
    mainImg:
      "https://img.mwc.com.vn/giay-thoi-trang?w=640&h=640&FileInput=/Resources/Product/2023/10/13/1.png",
    genderId: 1,
    stock: 30,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    manufacturerName: "Puma",
  },
  {
    id: "4",
    name: "Sản phẩm D",
    categoryId: 2,
    price: 400,
    description: "Mô tả sản phẩm D",
    mainImg:
      "https://img.mwc.com.vn/giay-thoi-trang?w=640&h=640&FileInput=/Resources/Product/2024/08/23/z5759532142121_bf6d3e873358b0e55935f3fde3aa69b9.jpg",
    genderId: 2,
    stock: 40,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    manufacturerName: "Reebok",
  },
  {
    id: "5",
    name: "Sản phẩm E",
    categoryId: 1,
    price: 500,
    description: "Mô tả sản phẩm E",
    mainImg:
      "https://img.mwc.com.vn/giay-thoi-trang?w=640&h=640&FileInput=/Resources/Product/2024/08/30/z5780512523704_0317ec1d431e949b0608a7e2c4ed9b94.jpg",
    genderId: 1,
    stock: 50,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    manufacturerName: "New Balance",
  },
  {
    id: "6",
    name: "Sản phẩm F",
    categoryId: 3,
    price: 6006666,
    description: "Mô tả sản phẩm F",
    mainImg:
      "https://img.mwc.com.vn/giay-thoi-trang?w=640&h=640&FileInput=/Resources/Product/2024/07/14/mwc%20(3).jpg",
    genderId: 2,
    stock: 60,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    manufacturerName: "Under Armour",
  },
  {
    id: "7",
    name: "Sản phẩm G",
    categoryId: 1,
    price: 700,
    description: "Mô tả sản phẩm G",
    mainImg:
      "https://img.mwc.com.vn/giay-thoi-trang?w=640&h=640&FileInput=/Resources/Product/2023/09/27/z4727917607321_1781353cfea9ae5977dc5606e3d01663.jpg",
    genderId: 1,
    stock: 70,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    manufacturerName: "Converse",
  },
  {
    id: "8",
    name: "Sản phẩm H",
    categoryId: 2,
    price: 800,
    description: "Mô tả sản phẩm H",
    mainImg:
      "https://img.mwc.com.vn/giay-thoi-trang?w=640&h=640&FileInput=/Resources/Product/2023/02/14/z4108902110172_e54d513af689c2575db31dedfb9b9328.jpg",
    genderId: 2,
    stock: 80,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    manufacturerName: "Adidas",
  },
];
