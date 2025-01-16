// favoritesUtils.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "../../interface/product";
import { Box, Icon, IconButton, VStack, Text, Image } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export const loadFavorites = async () => {
    try {
        const savedFavorites = await AsyncStorage.getItem("favorites");
        if (savedFavorites) {
            return JSON.parse(savedFavorites);
        }
        return [];
    } catch (error) {
        console.error("Failed to load favorites", error);
        return [];
    }
};

export const toggleFavorite = async (
    product: Product,
    favorites: Product[],
    setFavorites: React.Dispatch<React.SetStateAction<Product[]>>,
    showToast: Function
) => {
    const isFavorite = favorites.some((item) => String(item.id) === String(product.id));

    // Tạo danh sách yêu thích mới
    const updatedFavorites = isFavorite
        ? favorites.filter((item) => item.id !== product.id) // Xóa sản phẩm
        : [...favorites, product]; // Thêm sản phẩm nếu chưa có

    console.log("Updated Favorites:", updatedFavorites); // Debugging step

    // Cập nhật state favorites ngay lập tức
    setFavorites(updatedFavorites);

    try {
        // Lưu danh sách yêu thích vào AsyncStorage
        await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));

        // Hiển thị thông báo sau khi cập nhật
        setTimeout(() => {
            showToast({
                type: "success",
                message: isFavorite
                    ? `Đã xóa yêu thích ${product.name}`
                    : `Đã yêu thích ${product.name}`,
            });
        }, 50);
    } catch (error) {
        console.error("Failed to save favorites:", error);
    }
};
