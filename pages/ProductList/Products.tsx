import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import ProductList from "@/components/Product/ProductList/ProductList";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { Box, HStack, IconButton, Icon } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "@/interface/product";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app";
import SortBar from "@/components/SortBar/SortBar";

const Products: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [token, setToken] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        setToken(storedToken);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    const fetchProducts = () => {
      setProducts([
        {
          id: "1",
          name: "Sản phẩm A",
          categoryId: 1,
          manufacturerId: 1,
          price: 100,
          description: "Mô tả sản phẩm A",
          mainImg:
            "https://img.mwc.com.vn/giay-thoi-trang?w=640&h=640&FileInput=/Resources/Product/2024/10/31/z5985340358313_2b57b9b5d708bb77f22c305dbc655b2d.jpg", // mainImg thay vì image
          genderId: 1,
          stock: 10,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Sản phẩm B",
          categoryId: 2,
          manufacturerId: 2,
          price: 200,
          description: "Mô tả sản phẩm B",
          mainImg:
            "https://img.mwc.com.vn/giay-thoi-trang?w=640&h=640&FileInput=/Resources/Product/2024/10/31/z5985159219986_abb7101693ae82494361dd8227edd8ca.jpg",
          genderId: 2,
          stock: 20,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "3",
          name: "Sản phẩm C",
          categoryId: 3,
          manufacturerId: 1,
          price: 300,
          description: "Mô tả sản phẩm C",
          mainImg:
            "https://img.mwc.com.vn/giay-thoi-trang?w=640&h=640&FileInput=/Resources/Product/2023/10/13/1.png",
          genderId: 1,
          stock: 30,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "4",
          name: "Sản phẩm D",
          categoryId: 2,
          manufacturerId: 3,
          price: 400,
          description: "Mô tả sản phẩm D",
          mainImg:
            "https://img.mwc.com.vn/giay-thoi-trang?w=640&h=640&FileInput=/Resources/Product/2024/08/23/z5759532142121_bf6d3e873358b0e55935f3fde3aa69b9.jpg",
          genderId: 2,
          stock: 40,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "5",
          name: "Sản phẩm E",
          categoryId: 1,
          manufacturerId: 2,
          price: 500,
          description: "Mô tả sản phẩm E",
          mainImg:
            "https://img.mwc.com.vn/giay-thoi-trang?w=640&h=640&FileInput=/Resources/Product/2024/08/30/z5780512523704_0317ec1d431e949b0608a7e2c4ed9b94.jpg",
          genderId: 1,
          stock: 50,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "6",
          name: "Sản phẩm F",
          categoryId: 3,
          manufacturerId: 3,
          price: 600,
          description: "Mô tả sản phẩm F",
          mainImg:
            "https://img.mwc.com.vn/giay-thoi-trang?w=640&h=640&FileInput=/Resources/Product/2024/07/14/mwc%20(3).jpg",
          genderId: 2,
          stock: 60,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "7",
          name: "Sản phẩm G",
          categoryId: 1,
          manufacturerId: 1,
          price: 700,
          description: "Mô tả sản phẩm G",
          mainImg:
            "https://img.mwc.com.vn/giay-thoi-trang?w=640&h=640&FileInput=/Resources/Product/2023/09/27/z4727917607321_1781353cfea9ae5977dc5606e3d01663.jpg",
          genderId: 1,
          stock: 70,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "8",
          name: "Sản phẩm H",
          categoryId: 2,
          manufacturerId: 2,
          price: 800,
          description: "Mô tả sản phẩm H",
          mainImg:
            "https://img.mwc.com.vn/giay-thoi-trang?w=640&h=640&FileInput=/Resources/Product/2023/02/14/z4108902110172_e54d513af689c2575db31dedfb9b9328.jpg",
          genderId: 2,
          stock: 80,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
    };

    fetchToken();
    fetchProducts();
  }, []);

  const handleApplyFilter = (filters: any) => {
    let filteredProducts = [...products];

    // Lọc theo giá
    if (filters.minPrice && filters.maxPrice) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.price >= filters.minPrice && product.price <= filters.maxPrice
      );
    }

    // Lọc theo loại sản phẩm (nếu có)
    if (filters.category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.categoryId === filters.category.id
      );
    }

    // Lọc theo nhà sản xuất (nếu có)
    if (filters.manufacturer) {
      filteredProducts = filteredProducts.filter(
        (product) => product.manufacturerId === filters.manufacturer.id
      );
    }

    setProducts(filteredProducts);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HStack
        ml="10"
        m="2%"
        w="100%"
        alignSelf="center"
        space={2}
        alignItems="center"
      >
        <SearchBar />
        <SortBar onApplyFilter={handleApplyFilter} />
      </HStack>

      <Box flex={1} w="100%">
        <ProductList products={products} />
      </Box>

      <IconButton
        icon={<Icon as={Ionicons} name="heart" />}
        position="absolute"
        bottom={10}
        right={10}
        borderRadius="full"
        size="lg"
        zIndex={1}
        colorScheme="white"
        backgroundColor="#704F38"
        onPress={() => navigation.navigate("Favorites")}
      />
    </SafeAreaView>
  );
};

export default Products;
