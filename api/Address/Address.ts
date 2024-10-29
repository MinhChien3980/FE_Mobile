import axios, { AxiosResponse } from "axios";
import { ProvinceInterface, WardInterface } from "./AddressInterface";

// Hàm gọi API để lấy danh sách các tỉnh
export const getProvinces = async (): Promise<
  AxiosResponse<ProvinceInterface>
> => {
  try {
    const response = await axios.get<ProvinceInterface>(
      "https://open.oapi.vn/location/provinces"
    );
    return response;
  } catch (error) {
    console.error("Error fetching provinces: ", error);
    throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
  }
};
export const getWardsByDistrictId = async (
  districtId: string
): Promise<AxiosResponse<WardInterface>> => {
  try {
    // Make a GET request to the API with the districtId parameter
    const response = await axios.get<WardInterface>(
      `https://open.oapi.vn/location/wards?districtId=${districtId}`
    );

    // Return the Axios response which will be typed as WardInterface
    return response;
  } catch (error) {
    console.error("Error fetching wards:", error);
    throw error;
  }
};
