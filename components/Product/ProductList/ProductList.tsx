import React, { useState, useCallback, useEffect } from "react";
import { FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useFocusEffect,
} from "@react-navigation/native";
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

interface ProductListProps {
  products: Product[] | null; // Dữ liệu truyền vào
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const showToast = useShowToast();
  const [favorites, setFavorites] = useState<Product[]>([]);

  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem("favorites");
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error("Failed to load favorites", error);
    }
  };

  useFocusEffect(
      useCallback(() => {
        loadFavorites();
      }, [])
  );

  // Xử lý thêm hoặc xóa sản phẩm yêu thích
  const toggleFavorite = async (product: Product) => {
    const isFavorite = favorites.some((item) => String(item.id) === String(product.id));

    const updatedFavorites = isFavorite
        ? favorites.filter((item) => item.id !== product.id)
        : [...favorites, product];

    setFavorites(updatedFavorites);

    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      showToast({
        type: "success",
        message: isFavorite
            ? `${product.name} đã được xóa khỏi danh sách yêu thích.`
            : `${product.name} đã được thêm vào danh sách yêu thích.`,
      });
    } catch (error) {
      console.error("Failed to save favorites", error);
    }
  };

  // Hàm render từng sản phẩm trong FlatList
  const renderProduct = ({ item }: { item: Product }) => {
    const isFavorite = favorites.some((favorite) => favorite.id === item.id);

    return (
        <Box
            flex={1}
            m={2}
            p={3}
            backgroundColor="white"
            borderRadius="lg"
            shadow={2}
            alignItems="center"
        >
          <Box position="relative" flex={1} m={2} alignItems="center">
            <Image
                source={item.image}
                alt={item.name}
                width={100}
                height={100}
                borderRadius="lg"
            />
            <IconButton
                icon={
                  <Icon
                      as={Ionicons}
                      name={isFavorite ? "heart" : "heart-outline"}
                  />
                }
                onPress={() => toggleFavorite(item)}
                colorScheme={isFavorite ? "danger" : "gray"}
                variant="ghost"
                position="absolute"
                top={-20}
                right={-35}
            />
          </Box>

          <VStack space={1} alignItems="center">
            <Text fontSize="md" fontWeight="bold">
              {item.name}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Giá: {item.price} VNĐ
            </Text>
          </VStack>
        </Box>
    );
  };

  if (!products || products.length === 0) {
    return (
        <Center flex={1} p={4} bg="coolGray.100">
          <Text>Không có sản phẩm</Text>
        </Center>
    );
  }

  return (
      <VStack flex={1} p={4} bg="coolGray.100">
        <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            initialNumToRender={6}
            windowSize={5}
        />
      </VStack>
  );
};

export default ProductList;
