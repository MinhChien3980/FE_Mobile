import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Box, HStack, Icon, IconButton } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Product } from "../../interface/product";
import { productData } from "../../data/products/ProductData";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import SortBar from "../../components/SortBar/SortBar";
import ProductList from "../../components/Product/ProductList/ProductList";
import { RootStackParamList } from "../../App";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

const Products: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [token, setToken] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]); // Danh sách yêu thích
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Lấy danh sách yêu thích từ AsyncStorage
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
        const storedToken = await SecureStore.getItem("userToken");
        if (storedToken !== null) {
          console.log("🚀 ~ fetchToken ~ storedToken:", storedToken);
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Get token error: ", error);
      }
    };

    fetchToken();
    handleClearFilters();
  }, [token]);

  //Hàm áp dụng bộ lọc
  const handleApplyFilter = (filters: any) => {
    console.log("🚀 ~ handleApplyFilter ~ filters:", filters);
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
    setSearchQuery(query);
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

  // Hàm cập nhật danh sách sản phẩm và danh sách yêu thích khi tải sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      setProducts(productData);
      setFilteredProducts(productData);  // Đảm bảo danh sách sản phẩm đã có dữ liệu khi mới load
    };
    fetchProducts();
  }, []);

  // Hàm thêm hoặc xóa sản phẩm yêu thích
  const toggleFavorite = (product: Product) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((item) => item.id === product.id);
      const updatedFavorites = isFavorite
          ? prevFavorites.filter((item) => item.id !== product.id)
          : [...prevFavorites, product];

      // Lưu danh sách yêu thích vào AsyncStorage
      AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      return updatedFavorites;
    });
  };
  // Xóa bộ lọc
  const handleClearFilters = () => {
    setSearchQuery("");
    setFilteredProducts(products);
  };
  // Lắng nghe khi quay lại từ màn hình Favorites
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const fetchFavorites = async () => {
        const favoritesString = await AsyncStorage.getItem("favorites");
        if (favoritesString) {
          setFavorites(JSON.parse(favoritesString));
        }
      };
      fetchFavorites();
    });

    // Dọn dẹp khi không còn cần lắng nghe
    return unsubscribe;
  }, [navigation]);

  return (
      <SafeAreaView style={{ flex: 1 }}>
        <HStack ml="10" m="2%" w="100%" alignSelf="center" space={2} alignItems="center">
          <SearchBar onSearch={handleSearch} />
          <SortBar
              onApplyFilter={handleApplyFilter}
              onClearFilters={handleClearFilters}
          />
        </HStack>

        {/* Nút chuyển sang danh sách yêu thích */}
        <IconButton
            icon={<Icon as={Ionicons} name="heart" />}
            onPress={() => navigation.navigate("Favorites")}
            position="absolute"
            bottom={10}
            right={10}
            borderRadius="full"
            size="lg"
            zIndex={1}
            colorScheme="white"
            backgroundColor="#704F38"
        />
        <Box flex={1} w="100%">
          <ProductList
              products={filteredProducts}  // Truyền filteredProducts thay vì chỉ products
          />
        </Box>
      </SafeAreaView>
  );
};

export default Products;
