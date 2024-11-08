import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "@/interface/product";
import { Box, Icon, IconButton, VStack, Text, Image } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export const renderProduct = (
  item: Product,
  favorites: Product[],
  toggleFavorite: Function
) => {
  const isFavorite = favorites.some((favorite) => favorite.id === item.id);

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
      <Box position="relative" flex={1} m={2} alignItems="center">
        <Image
          source={{ uri: item.mainImg }}
          alt={item.name}
          style={{
            width: 100,
            height: 100,
            borderRadius: 10,
          }}
        />
        <IconButton
          icon={
            <Icon as={Ionicons} name={isFavorite ? "heart" : "heart-outline"} />
          }
          onPress={() => toggleFavorite(item)}
          colorScheme={isFavorite ? "danger" : "gray"}
          variant="ghost"
          position="absolute"
          top={-20}
          right={-35}
        />
      </Box>

      <VStack space={1} alignItems="center">
        <Text fontSize="md" fontWeight="bold">
          {item.name}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Giá: {formatCurrency(item.price)}
        </Text>
      </VStack>
    </Box>
  );
};
export const formatCurrency = (price: number): string => {
  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
