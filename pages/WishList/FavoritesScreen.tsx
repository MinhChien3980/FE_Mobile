import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Box, HStack } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { Product } from "../../interface/product";
import { loadFavorites } from "../../uitls/favoriteUtils";
import ProductList from "../../components/Product/ProductList/ProductList";

const FavoritesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [token, setToken] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteList = await loadFavorites();
        setFavorites(favoriteList);
        // console.log("🚀 ~ fetchFavorites ~ favoriteList:", favoriteList);
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    fetchFavorites();
  }, [favorites]);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        setToken(storedToken);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, []);
  const removeFavorite = useCallback((productId: string) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (item) => item.id !== productId
      );
      // Cập nhật AsyncStorage chỉ khi danh sách thay đổi
      if (updatedFavorites.length !== prevFavorites.length) {
        AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      }
      return updatedFavorites;
    });
  }, []);
  //Hàm áp dụng bộ lọc

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HStack
        ml="10"
        m="2%"
        w="100%"
        alignSelf="center"
        space={2}
        alignItems="center"
      ></HStack>

      <Box flex={1} w="100%">
        <ProductList products={favorites} />
      </Box>
    </SafeAreaView>
  );
};

export default FavoritesScreen;
