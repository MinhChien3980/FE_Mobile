import axios, { AxiosResponse } from "axios";
import * as SecureStore from "expo-secure-store";

// Base URL cho API

const baseUrl: string = "http://10.0.1.243:8080/";

// Hàm lấy token từ AsyncStorage
const getToken = async (): Promise<string | null> => {
  return SecureStore.getItemAsync("userToken");
};

// Hàm gọi API chung
const request = async <T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  data?: any,
  useToken: boolean = true // Tham số để xác định có sử dụng token hay không
): Promise<AxiosResponse<T>> => {
  try {
    const config: any = {
      method,
      url: `${baseUrl}${endpoint}`,
      headers: {
        "Content-Type": "application/json",
      },
      ...(data && { data }), // Chỉ thêm data nếu có
    };

    // Nếu cần token, thêm vào header
    if (useToken) {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return await axios(config);
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("API Error: ", error);
    throw error; // Ném lại lỗi để xử lý ở nơi khác nếu cần
  }
};

// Hàm gọi GET API
export const get = async <T>(endpoint: string): Promise<AxiosResponse<T>> => {
  return request<T>("GET", endpoint);
};

// Hàm gọi POST API
export const post = async <T>(
  endpoint: string,
  data: any
): Promise<AxiosResponse<T>> => {
  return request<T>("POST", endpoint, data);
};

// Hàm gọi PUT API
export const put = async <T>(
  endpoint: string,
  data: any
): Promise<AxiosResponse<T>> => {
  return request<T>("PUT", endpoint, data);
};

// Hàm gọi DELETE API
export const del = async <T>(endpoint: string): Promise<AxiosResponse<T>> => {
  return request<T>("DELETE", endpoint);
};

// Hàm gọi login, không cần token
export const login = async <T>(
  endpoint: string,
  data: any
): Promise<AxiosResponse<T>> => {
  return request<T>("POST", endpoint, data, false); // Không dùng token khi login
};
