import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import ProductList from "@/components/Product/ProductList/ProductList";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import {
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "@/interface/product";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app";
import SortBar from "@/components/SortBar/SortBar";

const Products: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        setToken(storedToken);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };
    fetchToken();
  }, []);
  // Danh sách sản phẩm mẫu mặc định
  const products: Product[] = [
    {
      id: "1",
      name: "Sản phẩm A",
      price: 100,
      image: require("../../assets/images/proFake_1.jpeg"),
    },
    {
      id: "2",
      name: "Sản phẩm B",
      price: 200,
      image: require("../../assets/images/proFake_2.jpeg"),
    },
    {
      id: "3",
      name: "Sản phẩm C",
      price: 300,
      image: require("../../assets/images/proFake_3.jpeg"),
    },
    {
      id: "4",
      name: "Sản phẩm D",
      price: 300,
      image: require("../../assets/images/proFake_3.jpeg"),
    },
    {
      id: "5",
      name: "Sản phẩm E",
      price: 300,
      image: require("../../assets/images/proFake_3.jpeg"),
    },
    {
      id: "6",
      name: "Sản phẩm F",
      price: 300,
      image: require("../../assets/images/proFake_3.jpeg"),
    },
    {
      id: "7",
      name: "Sản phẩm G",
      price: 300,
      image: require("../../assets/images/proFake_3.jpeg"),
    },
    {
      id: "8",
      name: "Sản phẩm H",
      price: 300,
      image: require("../../assets/images/proFake_3.jpeg"),
    },
  ];

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
          <SortBar />
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
