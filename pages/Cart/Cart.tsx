import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HStack, Button, Box } from 'native-base';
import style from '../../assets/styles/style';

const initialCartItems = [
    { id: '1', name: 'Product 1', price: 200, quantity: 2 },
    { id: '2', name: 'Product 2', price: 100, quantity: 1 },
];

const Cart = () => {
    const [cartItems, setCartItems] = useState(initialCartItems);

    const handleIncreaseQuantity = (id: string) => {
        setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    };

    const handleDecreaseQuantity = (id: string) => {
        setCartItems(cartItems.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
    };

    const handleRemoveItem = (id: string) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const handleClearAll = () => {
        setCartItems([]);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            if (item.price && item.quantity) {
                return total + item.price * item.quantity;
            }
            return total;
        }, 0);
    };

    const formatPrice = (price: number) => {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    return (
        <View style={styles.container}>
            <View style={styles.locationContainer}>
                <Text style={styles.locationText}>Giỏ Hàng</Text>
                <View style={styles.locationDetailsContainer}>
                    <Icon name="shopping-cart" size={20} color={style.primaryColor} />
                    <Text style={styles.countryText}>Thủ Đức, Việt Nam</Text>
                </View>
                <View style={styles.headerContainer}>
                    <Icon name="notifications" size={24} color={style.primaryColor} />
                </View>
            </View>

            {/* Nút Clear All */}
            <View>
                <HStack
                    ml="10"
                    m="2%"
                    w="100%"
                    alignSelf="center"
                    space={2}
                    alignItems="center"
                >
                    <Button variant="outline" size="sm" onPress={handleClearAll}>
                        <Text>Clear All</Text>
                    </Button>
                </HStack>
            </View>

            {/* Giỏ hàng */}
            <ScrollView>
                {cartItems.length === 0 ? (
                    <Text style={styles.emptyCartText}>Giỏ hàng trống</Text>
                ) : (
                    cartItems.map((item) => (
                        <Box key={item.id} p={4} borderWidth={1} borderRadius="md" marginBottom={4} borderColor="coolGray.200">
                            <HStack space={4} alignItems="center">
                                <Text flex={1}>{item.name}</Text>
                                <Text>{formatPrice(item.price)}</Text>
                                <HStack space={2} alignItems="center">
                                    <Button size="sm" onPress={() => handleDecreaseQuantity(item.id)}>-</Button>
                                    <Text>{item.quantity}</Text>
                                    <Button size="sm" onPress={() => handleIncreaseQuantity(item.id)}>+</Button>
                                </HStack>
                                <Button size="sm" onPress={() => handleRemoveItem(item.id)}>Xóa</Button>
                            </HStack>
                        </Box>
                    ))
                )}

                {/* Tổng tiền */}
                <Box mt={4} alignItems="flex-end">
                    <Text fontSize="xl">Tổng Tiền: {formatPrice(calculateTotal())}</Text>
                </Box>

                {/* Nút thanh toán */}
                <Button mt={6} colorScheme="blue">
                    Tiến Hành Thanh Toán
                </Button>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    countryText: {
        fontSize: 18,
        marginLeft: 5,
    },
    loadMoreButton: {
        marginTop: 10,
        alignSelf: 'center',
        padding: 10,
        backgroundColor: style.primaryColor,
        borderRadius: 5,
    },
    loadMoreText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    emptyCartText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'gray',
        marginTop: 20,
    },
});

export default Cart;