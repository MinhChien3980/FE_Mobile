import React, { useState, useCallback } from "react";
import { FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useNavigation,
  NavigationProp,
  useFocusEffect,
} from "@react-navigation/native";
import {
  Box,
  VStack,
  Image,
  IconButton,
  Icon,
  Button,
  Text,
  View,
} from "native-base";
import { RootStackParamList } from "@/app";
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

  const toggleFavorite = async (product: Product) => {
    let updatedFavorites: Product[];

    if (favorites.some((item) => item.id === product.id)) {
      updatedFavorites = favorites.filter((item) => item.id !== product.id);
      showToast({
        type: "success",
        message: `${product.name} đã được xóa khỏi danh sách yêu thích.`,
      });
    } else {
      updatedFavorites = [...favorites, product];
      showToast({
        type: "success",
        message: `${product.name} đã được thêm vào danh sách yêu thích.`,
      });
    }

    setFavorites(updatedFavorites);
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

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
            // borderWidth="1"
            // borderRadius="100"
            icon={
              <Icon
                as={Ionicons}
                name={isFavorite ? "heart" : "heart-outline"}
              />
            }
            onPress={() => toggleFavorite(item)}
            colorScheme={isFavorite ? "danger" : "gray"}
            variant="ghost"
            position="absolute" // Đặt vị trí tuyệt đối
            top={-20} // Khoảng cách từ trên
            right={-35} // Khoảng cách từ bên phải
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
      <VStack
        flex={1}
        p={4}
        bg="coolGray.100"
        alignItems="center"
        justifyContent="center"
      >
        <Text>Không có sản phẩm</Text>
      </VStack>
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
      />
    </VStack>
  );
};

export default ProductList;
