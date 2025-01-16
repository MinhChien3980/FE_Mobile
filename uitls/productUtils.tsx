import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Box,
  Icon,
  IconButton,
  VStack,
  Text,
  Image,
  HStack,
  View,
  Pressable,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";
import { Product } from "../interface/product";
import { Colors } from "../assets/color/color";
import { RootStackParamList } from "../components/Navigator/NavigatorBottom";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export const renderProduct = (
  product: Product,
  favorites: Product[],
  toggleFavorite: Function,
  navigation: NavigationProp<RootStackParamList> // Nhận navigation từ props
) => {
  const isFavorite = favorites.some((favorite) => favorite.id === product.id);

  const handleNavigateDetail = (productId: number) => {
    navigation.navigate("ProductDetail", { productId }); // Sử dụng navigation từ props
  };

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
      <Box position="relative" flex={1} m={2} alignItems="center" w="full">
        <Pressable onPress={() => handleNavigateDetail(product.id)}>
          <Box w="full">
            <Image
              source={{ uri: product.productMediaUrls[1] }}
              alt={product.name}
              style={{
                width: 200,
                height: 120,
                borderRadius: 20,
              }}
              resizeMode="cover"
            />
          </Box>
          <Box alignItems="center">
            <Text mt={3} fontSize="xs" fontWeight="bold">
              {product.name}
            </Text>
            <Text
              mt="3"
              fontSize="xs"
              alignItems="center"
              alignContent="center"
            >
              <Box
                flexDir="row"
                alignItems="center"
                justifyContent="space-around"
              >
                <Text fontSize="xs" color="gray.500">
                  {formatCurrency(product.price)}
                </Text>
                <Box ml="10"></Box>
                <Box
                  ml="-3"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-around"
                >
                  <Icon
                    as={Ionicons}
                    name={"star"}
                    color={Colors.yellow}
                    fontSize="xs"
                  />
                  <Text fontSize="xs">4.5</Text>
                </Box>
              </Box>
            </Text>
          </Box>
        </Pressable>
      </Box>
      <IconButton
        borderRadius="full"
        w={1}
        h={1}
        icon={
          <Icon as={Ionicons} name={isFavorite ? "heart" : "heart-outline"} />
        }
        onPress={() => toggleFavorite(product)}
        colorScheme={isFavorite ? "danger" : "gray"}
        variant="ghost"
        position="absolute"
        top={"2%"}
        right={"2%"}
      />
    </Box>
  );
};

export const formatCurrency = (price: number): string => {
  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
