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

export const renderProduct = (
  product: Product,
  favorites: Product[],
  toggleFavorite: Function
) => {
  const isFavorite = favorites.some((favorite) => favorite.id === product.id);

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
        <Pressable onPress={() => Alert.alert(`${product.id}`)}>
          <Box w="full">
            <Image
              source={{ uri: product.mainImg }}
              alt={product.name}
              style={{
                width: 200,
                height: 120,
                borderRadius: 20,
              }}
              resizeMode="cover"
            />
          </Box>

          <Box
            // space={1}
            // w="full"
            alignItems="center"
            // justifyContent="space-between"
            // flexDirection="column"
          >
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
                // style={{}}
                flexDir="row"
                alignItems="center"
                justifyContent="space-around"
              >
                <Text fontSize="xs" color="gray.500">
                  {formatCurrency(product.price)}
                </Text>
                <Box ml="10"></Box>
                <Box
                  // style={{}}
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
        // borderWidth={0.1}
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
