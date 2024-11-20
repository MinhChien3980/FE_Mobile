import React, { useState, useCallback, useEffect } from "react";
import { FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  Box,
  VStack,
  Image,
  IconButton,
  Icon,
  Text,
  Center,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import useShowToast from "@/components/Toast/Toast";
import { Product } from "@/interface/product";
import { loadFavorites, toggleFavorite } from "@/uitls/favoriteUtils";
import { renderProduct } from "@/uitls/productUtils";

interface ProductListProps {
  products: Product[] | null;
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const showToast = useShowToast();
  const [favorites, setFavorites] = useState<Product[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchFavorites = async () => {
        const loadedFavorites = await loadFavorites();
        setFavorites(loadedFavorites);
      };
      fetchFavorites();
    }, [])
  );

  return (
    <VStack flex={1} p={4} bg="coolGray.100">
      {products && products.length > 0 ? (
        <FlatList
          data={products}
          renderItem={({ item }) =>
            renderProduct(item, favorites, (product: Product) =>
              toggleFavorite(product, favorites, setFavorites, showToast)
            )
          }
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          initialNumToRender={6}
          windowSize={5}
        />
      ) : (
        <Center flex={1} p={4} bg="coolGray.100">
          <Text>Không có sản phẩm</Text>
        </Center>
      )}
    </VStack>
  );
};

export default ProductList;
