import { AxiosResponse } from "axios";
import ApiSerVice from "./ApiService";
//Class này sẽ gọi lại các api mẫu kèm đường link api cụ thể
class UserApiService extends ApiSerVice {
  async getVerifyCode(value: string) {
    return this.post("", value);
  }
  async getMyInfor(): Promise<AxiosResponse<any>> {
    return this.get("api/users/MyInfo");
  }
  async getUserToken(data: any): Promise<AxiosResponse<any>> {
    // console.log("Test");
    return this.login("api/auth/token", data);
  }
}
export const userApi = new UserApiService();
