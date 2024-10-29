import { AxiosResponse } from "axios";
import { get, login, post } from "./ApiService";

export const getVerifyCode = async (
  value: string
): Promise<AxiosResponse<any>> => {
  return post("", value);
};

export const getMyInfo = async (): Promise<AxiosResponse<any>> => {
  return get("api/users/MyInfo");
};

export const getUserToken = async (data: any): Promise<AxiosResponse<any>> => {
  return login("api/auth/token", data);
};
