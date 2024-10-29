import { SafeAreaView, View } from "react-native";
import ProductList from "@/components/Product/ProductList/ProductList";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Icon,
  IconButton,
  ScrollView,
  Text,
} from "native-base";
import SortBar from "@/components/SortBar/SortBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import { Product } from "@/interface/product";
import { Ionicons } from "@expo/vector-icons";
import { background } from "native-base/lib/typescript/theme/styled-system";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app";

const Products: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const scrollViewRef = useRef<typeof ScrollView>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("token").then((value) => {
      setToken(value);
    });
  }, []);
  // Default sample product list
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
      id: "3",
      name: "Sản phẩm C",
      price: 300,
      image: require("../../assets/images/proFake_3.jpeg"),
    },
    {
      id: "3",
      name: "Sản phẩm C",
      price: 300,
      image: require("../../assets/images/proFake_3.jpeg"),
    },
    {
      id: "3",
      name: "Sản phẩm C",
      price: 300,
      image: require("../../assets/images/proFake_3.jpeg"),
    },
  ];
  return (
    <SafeAreaView>
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
      <ScrollView>
        <Center w="100%">
          <Box safeArea p="0" w="100%" maxW="100%" py="">
            <ProductList products={products} />
          </Box>
        </Center>
      </ScrollView>
      <IconButton
        icon={<Icon as={Ionicons} name="heart" />}
        position="absolute"
        bottom={0}
        right={2}
        borderRadius="full"
        size="lg"
        zIndex={999}
        colorScheme="white"
        style={{ backgroundColor: "#704F38" }}
        // borderWidth="1"
        borderColor="gray.400"
        onPress={() => navigation.navigate("Favorites")}
      />
    </SafeAreaView>
  );
};
export default Products;
