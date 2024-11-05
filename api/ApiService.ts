import axios, {AxiosResponse} from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Class này sẽ chứa các api mẫu dùng chung
//Như là crud kèm theo token, riêng cái login thì chỉ cần gửi data là email và pass
export default class ApiSerVice {
    private readonly baseUrl: string = "http://10.0.2.2:8088";

    // Hàm chung để gọi GET API
    protected async get(endpoint: string): Promise<AxiosResponse<any>> {
        const token = await this.getToken();
        return axios({
            url: `${this.baseUrl}${endpoint}`,
            method: "GET",
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined, // Nếu không có token, để undefined
            },
        });
    }

    // Hàm chung để gọi POST API
    protected async post(
        endpoint: string,
        data: any
    ): Promise<AxiosResponse<any>> {
        const token = await this.getToken();
        return axios({
            url: `${this.baseUrl}${endpoint}`,
            method: "POST",
            data,
            headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : undefined, // Nếu không có token, để undefined
            },
        });
    }

    // Hàm gọi login, không cần token
    protected async login(
        endpoint: string,
        data: any
    ): Promise<AxiosResponse<any>> {
        return axios({
            url: `${this.baseUrl}${endpoint}`,
            method: "POST",
            data,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    // Hàm chung để gọi PUT API
    protected async put(
        endpoint: string,
        data: any
    ): Promise<AxiosResponse<any>> {
        const token = await this.getToken();
        return axios({
            url: `${this.baseUrl}${endpoint}`,
            method: "PUT",
            data,
            headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : undefined, // Nếu không có token, để undefined
            },
        });
    }

    // Hàm chung để gọi DELETE API
    protected async delete(endpoint: string): Promise<AxiosResponse<any>> {
        const token = await this.getToken();
        return axios({
            url: `${this.baseUrl}${endpoint}`,
            method: "DELETE",
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined, // Nếu không có token, để undefined
            },
        });
    }

    // Lấy token từ AsyncStorage
    private async getToken(): Promise<string | null> {
        return await AsyncStorage.getItem("token");
    }
}
