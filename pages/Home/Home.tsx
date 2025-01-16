import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { HStack, Button, Box, Pressable, Icon, Text } from "native-base";
import style from "../../assets/styles/style";
import SlideBanner from "./SlideBaner";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import SortBar from "../../components/SortBar/SortBar";
import { Category } from "../../interface/category";
import { Product } from "../../interface/product";
import { productData } from "../../data/products/ProductData";
import ProductList from "../../components/Product/ProductList/ProductList";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../../App";

const Home = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<any>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<number>(6); // Số sản phẩm hiển thị ban đầu

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleApplyFilter = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setFilters({});
  };

  useEffect(() => {
    const extractCategories = () => {
      const categorySet = new Set<string>();
      productData.forEach((product) => {
        categorySet.add(product.category);
      });

      setCategories(
        Array.from(categorySet).map((categoryName, index) => ({
          id: index + 1,
          name: categoryName,
          genderId: 1,
          ageGroupId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }))
      );
    };

    const loadProducts = () => {
      setProducts(productData);
    };

    extractCategories();
    loadProducts();
  }, []);

  const getProductsByCategory = (categoryName: string) => {
    return products.filter((product) => product.category === categoryName);
  };

  const loadMoreProducts = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 10);
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.locationContainer}>
        <Text style={styles.locationText}>Location</Text>
        <View style={styles.locationDetailsContainer}>
          <Icon name="place" size={20} color={style.primaryColor} />
          <Text style={styles.countryText}>Thủ Đức, Việt Nam</Text>
        </View>
        <View style={styles.headerContainer}>
          <Icon name="notifications" size={24} color={style.primaryColor} />
        </View>
      </View> */}
      <View>
        <HStack
          //   mt="15%"
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
      </View>
      <SlideBanner />
      <View>
        <Text style={styles.categoryText}>Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <HStack space={3}>
            {categories.length > 0 ? (
              categories.map((category) => (
                <Button key={category.id} variant="outline" size="sm">
                  <Text>{category.name}</Text>
                </Button>
              ))
            ) : (
              <Text>No categories available</Text>
            )}
          </HStack>
        </ScrollView>
      </View>

      {/* Display Products for each Category */}
      <ScrollView>
        {categories.map((category) => {
          const categoryProducts = getProductsByCategory(category.name);
          const visibleCategoryProducts = categoryProducts.slice(
            0,
            visibleProducts
          );

          return (
            <View key={category.id}>
              <Text style={styles.categoryText}>{category.name}</Text>
              {visibleCategoryProducts.length > 0 ? (
                <>
                  <ProductList products={visibleCategoryProducts} />
                  {visibleCategoryProducts.length < categoryProducts.length && (
                    <TouchableOpacity
                      onPress={loadMoreProducts}
                      style={styles.loadMoreButton}
                    >
                      <Text style={styles.loadMoreText}>Xem thêm</Text>
                    </TouchableOpacity>
                  )}
                </>
              ) : (
                <Text>No products available in this category</Text>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    right: 0,
    padding: 15,
  },
  locationContainer: {
    marginBottom: 20,
  },
  locationText: {
    fontSize: 18,
    marginBottom: 2,
    marginLeft: 5,
  },
  locationDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  countryText: {
    fontSize: 18,
    marginLeft: 5,
  },
  categoryText: {
    fontWeight: "bold",
    marginTop: 10,
    color: style.primaryColor,
    marginBottom: 15,
  },
  loadMoreButton: {
    marginTop: 10,
    alignSelf: "center",
    padding: 10,
    backgroundColor: style.primaryColor,
    borderRadius: 5,
  },
  loadMoreText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Home;
