import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList } from "react-native";
import { Box, Center, Text } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "../../interface/product";
import { renderProduct } from "../../uitls/productUtils";
import useShowToast from "../../components/Toast/Toast";


const FavouritesScreen: React.FC = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const showToast = useShowToast();

  useEffect(() => {
    const fetchFavorites = async () => {
      const favoritesString = await AsyncStorage.getItem("favorites");
      if (favoritesString) {
        setFavorites(JSON.parse(favoritesString));
      }
    };
    fetchFavorites();
  }, []);

  const toggleFavorite = async (product: Product) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((favorite) => favorite.id === product.id);
      const updatedFavorites = isFavorite
          ? prevFavorites.filter((favorite) => favorite.id !== product.id)
          : [...prevFavorites, product];

      AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      showToast({
        type: "success",
        message: isFavorite
            ? `Đã xóa yêu thích ${product.name}`
            : `Đã yêu thích ${product.name}`,
      });

      return updatedFavorites;
    });
  };

  return (
      <SafeAreaView style={{ flex: 1 }}>
        <Box flex={1} p={4} bg="coolGray.100">
          {favorites.length === 0 ? (
              <Center flex={1}>
                <Text>Chưa có sản phẩm yêu thích</Text>
              </Center>
          ) : (
              <FlatList
                  data={favorites}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) =>
                      renderProduct(item, favorites, toggleFavorite)
                  }
                  numColumns={2}
                  columnWrapperStyle={{ justifyContent: "space-between" }}
              />
          )}
        </Box>
      </SafeAreaView>
  );
};

export default FavouritesScreen;
