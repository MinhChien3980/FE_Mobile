import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "../interface/product";
import { Box, Icon, IconButton, VStack, Text, Image } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Alert } from "react-native";

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
            <Box position="relative" flex={1} m={2} alignItems="center">
                <TouchableOpacity
                    onPress={() =>
                        Alert.alert(`Chuyển đến Product Detail với id ${product.id}`)
                    }
                >
                    <Image
                        source={{ uri: product.mainImg }}
                        alt={product.name}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 10,
                        }}
                    />

                    <VStack space={1} alignItems="center">
                        <Text fontSize="md" fontWeight="bold">
                            {product.name}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                            Giá: {formatCurrency(product.price)}
                        </Text>
                    </VStack>
                </TouchableOpacity>
                <IconButton
                    icon={
                        <Icon as={Ionicons} name={isFavorite ? "heart" : "heart-outline"} />
                    }
                    onPress={() => toggleFavorite(product)}
                    colorScheme={isFavorite ? "danger" : "gray"}
                    variant="ghost"
                    position="absolute"
                    top={-20}
                    right={-35}
                />
            </Box>
        </Box>
    );
};

export const formatCurrency = (price: number): string => {
    return price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
};
