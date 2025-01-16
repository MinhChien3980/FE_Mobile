import React, { useEffect, useState, useCallback, useMemo, lazy } from "react";
import { SafeAreaView } from "react-native";
import { Box, HStack, IconButton, Icon } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { Product } from "../../interface/product";
import { productData } from "../../data/products/ProductData";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import SortBar from "../../components/SortBar/SortBar";
import ProductList from "../../components/Product/ProductList/ProductList";
import * as SecureStore from "expo-secure-store";

const Products: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [token, setToken] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<any>({});

  // Fetch token once
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await SecureStore.getItem("userToken");
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Get token error: ", error);
      }
    };
    fetchToken();
  }, []);

  // Fetch products only once
  useEffect(() => {
    setProducts(productData);
    setFilteredProducts(productData); // Initialize filtered list
  }, []);

  // Apply filters and search query
  const handleApplyFilter = useCallback((newFilters: any) => {
    setFilters(newFilters);
  }, []);

  // Perform filtering when searchQuery or filters change
  const filteredProductsList = useMemo(() => {
    let result = [...products];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        // ||
        // product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      console.log("🚀 ~ filteredProductsList ~ seacrh :", result.length);
    }

    // Apply other filters
    if (filters.minPrice && filters.maxPrice) {
      result = result.filter(
        (product) =>
          product.price >= filters.minPrice && product.price <= filters.maxPrice
      );
      console.log("🚀 ~ filteredProductsList ~ price :", result.length);
    }

    if (filters.category) {
      result = result.filter(
        (product) => product.category === filters.category.name
      );
      console.log("🚀 ~ filteredProductsList ~ category :", result.length);
    }

    return result;
  }, [products, searchQuery, filters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setFilters({});
  };

  return (
    <SafeAreaView style={{ flex: 1, width: "100%" }}>
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
        <ProductList products={filteredProductsList} />
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
