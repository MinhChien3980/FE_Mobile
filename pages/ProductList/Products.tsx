import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Box, HStack, IconButton, Icon, Button } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RootStackParamList } from "../../App";
import { Product } from "../../interface/product";
import { productData } from "../../data/products/ProductData";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import SortBar from "../../components/SortBar/SortBar";
import ProductList from "../../components/Product/ProductList/ProductList";

const Products: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [token, setToken] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  //Khi vừa chuyển đến "Danh sách sản phẩm" sẽ:
  //-Xóa đi bộ lọc (nếu có)
  //-Lấy token và danh sách sản phẩm
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const productDataString = await AsyncStorage.getItem("products");
  //     console.log("🚀 ~ fetchProducts ~ productDataString:", productDataString);
  //     if (productDataString) {
  //       const productData: Product[] = JSON.parse(productDataString);
  //       setProducts(productData);
  //       setFilteredProducts(productData);
  //       console.log("🚀 ~ fetchProducts ~ productData:", productData);
  //     }
  //   };

  //   fetchProducts();
  // }, []);
  useEffect(() => {
    handleClearFilters();
    const fetchProducts = async () => {
      setProducts(productData);
    };
    fetchProducts();
  }, [products]);
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        console.log("🚀 ~ fetchToken ~ storedToken:", storedToken);
        setToken(storedToken);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
    handleClearFilters();
  }, []);

  //Hàm áp dụng bộ lọc
  const handleApplyFilter = (filters: any) => {
    let filteredProductsList = [...products]; //Lấy dữ liệu từ products đã fetch đưa vào filteredProductsList
    console.log(
      "🚀 ~ handleApplyFilter ~ filteredProductsList:",
      filteredProductsList.length
    );

    if (filters.minPrice && filters.maxPrice) {
      filteredProductsList = filteredProductsList.filter(
        (product) =>
          product.price >= filters.minPrice && product.price <= filters.maxPrice
      );
    }

    if (filters.category) {
      filteredProductsList = filteredProductsList.filter(
        (product) => product.categoryId === filters.category.id
      );
    }

    if (filters.manufacturer) {
      filteredProductsList = filteredProductsList.filter(
        (product) => product.manufacturerName === filters.manufacturer
      );
    }

    setFilteredProducts(filteredProductsList);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query); // Cập nhật từ khoá tìm kiếm

    let filtered = products;

    if (query !== "") {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description?.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };
  // Xóa bộ lọc
  const handleClearFilters = () => {
    setSearchQuery("");
    setFilteredProducts(products);
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
        <SearchBar onSearch={handleSearch} />
        <SortBar
          onApplyFilter={handleApplyFilter}
          onClearFilters={handleClearFilters}
        />
      </HStack>

      <Box flex={1} w="100%">
        <ProductList products={filteredProducts} />
        {/* Hiển thị sản phẩm đã lọc */}
      </Box>
      {/* Chuyển trang sang Sản phẩm yêu thích */}
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
        onPress={() => navigation.navigate("Verify")}
      />
    </SafeAreaView>
  );
};

export default Products;
