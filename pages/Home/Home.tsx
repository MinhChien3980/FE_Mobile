import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { HStack } from "native-base";
import style from "../../assets/styles/style";
import SlideBanner from "./SlideBaner";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import SortBar from "../../components/SortBar/SortBar";
import { Category } from "../../interface/category";
import { Product } from "../../interface/product";
import { productData } from "../../data/products/ProductData";
import ProductList from "../../components/Product/ProductList/ProductList";
import { FlatList } from "react-native";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<any>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [data, setData] = useState<any[]>([]);
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

      const extractedCategories = Array.from(categorySet).map(
        (categoryName, index) => ({
          id: index + 1,
          name: categoryName,
          genderId: 1,
          ageGroupId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      );

      setCategories(extractedCategories);
      return extractedCategories;
    };

    const loadProducts = () => {
      setProducts(productData);
    };

    const prepareDataForFlatList = () => {
      const categories = extractCategories();
      loadProducts();

      const combinedData = [
        { type: "searchSort" },
        { type: "banner" },
        ...categories.map((category) => ({
          type: "category",
          category,
          products: productData.filter((p) => p.category === category.name),
        })),
      ];

      setData(combinedData);
    };

    prepareDataForFlatList();
  }, []);

  const renderItem = ({ item }: { item: any }) => {
    if (item.type === "searchSort") {
      return (
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
      );
    }

    if (item.type === "banner") {
      return <SlideBanner />;
    }

    if (item.type === "category") {
      return (
        <View style={styles.categorySection}>
          <Text style={styles.categoryText}>{item.category.name}</Text>
          <ProductList products={item.products} />
        </View>
      );
    }

    return null;
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => `${item.type}-${index}`}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 15,
  },
  categorySection: {
    marginTop: 20,
  },
  categoryText: {
    fontWeight: "bold",
    fontSize: 18,
    color: style.primaryColor,
    marginBottom: 10,
  },
});

export default Home;
