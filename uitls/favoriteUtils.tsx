// favoritesUtils.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Box, Icon, IconButton, VStack, Text, Image } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "../interface/product";

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
  const isFavorite = favorites.some(
    (item) => String(item.id) === String(product.id)
  );

  const updatedFavorites = isFavorite
    ? favorites.filter((item) => item.id !== product.id)
    : [...favorites, product];

  // Kiểm tra nếu updatedFavorites khác với favorites hiện tại
  if (JSON.stringify(updatedFavorites) !== JSON.stringify(favorites)) {
    setFavorites(updatedFavorites);

    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setTimeout(() => {
        showToast({
          type: "success",
          message: isFavorite
            ? `Đã xóa yêu thích ${product.name}`
            : `Đã yêu thích ${product.name}`,
        });
      }, 50);
    } catch (error) {
      console.error("Failed to save favorites", error);
    }
  }
};
