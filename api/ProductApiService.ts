import { AxiosResponse } from "axios";
import { get, post } from "./ApiService";

export const getAllProducts = async (): Promise<AxiosResponse<any>> => {
    return get("api/products/all");
};

export const getProductById = async (Id: string): Promise<AxiosResponse<any>> => {
    return get(`api/products/{Id}`);
};

export const createProduct = async (productData: any): Promise<AxiosResponse<any>> => {
    return post("api/products", productData);
};

export const deleteProduct = async (productId: number): Promise<AxiosResponse<any>> => {
    return post("api/products/delete", { id: productId });
};
