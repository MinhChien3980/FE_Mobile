import React, { useState } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native"; // Import navigation


import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
} from "react-native";

const fakeData = [
    {
        id: "1",
        name: "Nike Air Force 1",
        category: "Shoes",
        price: 100,
        description: "Classic white sneakers.",
        main_img: require("../../assets/images/proFake_1.jpeg"),
        variant: [
            {
                color: "White",
                size: "42",
                stock: 10,
                img_detail: "proFake_1.jpeg",
            },
        ],
    },
    {
        id: "2",
        name: "Adidas Ultraboost",
        category: "Shoes",
        price: 150,
        description: "Comfortable running shoes with responsive cushioning.",
        main_img: require("../../assets/images/proFake_2.jpeg"),
        variant: [
            {
                color: "Black",
                size: "44",
                stock: 8,
                img_detail: "proFake_2.jpeg",
            },
        ],
    },
];

const Cart = () => {
    const [cart, setCart] = useState(fakeData.map((item) => ({...item, quantity:1})));
    const [promoCode, setPromoCode] = useState("");
    const deliveryFee = 25;
    const navigation = useNavigation(); // Khởi tạo navigation


    const handleProceedToCheckout = () => {
        if (cart.length === 0) {
            Alert.alert("Your cart is empty!", "Please add items to your cart before checking out.");
        } else {
            navigation.navigate("Checkout", { cart, totalCost }); // Truyền dữ liệu đến trang Checkout
        }
    };

    const handleQuantityChange = (id, type) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity:
                            type === "increase"
                                ? Math.min(item.quantity + 1, 10)
                                : Math.max(item.quantity - 1, 1),
                    }
                    : item
            )
        );
    };

    const handleRemove = (id) => {
        Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Remove",
                style: "destructive",
                onPress: () => setCart((prevCart) => prevCart.filter((item) => item.id !== id)),
            },
        ]);
    };

    const calculateSubTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const applyDiscount = () => {
        return promoCode.toLowerCase() === "discount" ? 35 : 0;
    };

    const totalCost = calculateSubTotal() + deliveryFee - applyDiscount();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Cart</Text>

            <ScrollView style={styles.cartList}>
                {cart.length > 0 ? (
                    cart.map((item) => (
                        <Swipeable
                            key={item.id}
                            renderRightActions={() => (
                                <TouchableOpacity
                                    style={styles.removeSwipeButton}
                                    onPress={() => handleRemove(item.id)}
                                >
                                    <MaterialCommunityIcons name="trash-can" size={24} color="#EC4646FF" />
                                </TouchableOpacity>
                            )}
                        >
                            <View style={styles.cartItem}>
                                <Image source={{ uri: item.main_img }} style={styles.itemImage} />
                                <View style={styles.itemDetails}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemCategory}>Category: {item.category}</Text>
                                    <Text style={styles.itemPrice}>${item.price}</Text>
                                    <View style={styles.quantityContainer}>
                                        <TouchableOpacity
                                            style={styles.quantityButton}
                                            onPress={() => handleQuantityChange(item.id, "decrease")}
                                        >
                                            <Text style={styles.quantityButtonText}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.quantityText}>{item.quantity}</Text>
                                        <TouchableOpacity
                                            style={styles.quantityButton}
                                            onPress={() => handleQuantityChange(item.id, "increase")}
                                        >
                                            <Text style={styles.quantityButtonText}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Swipeable>
                    ))
                ) : (
                    <Text style={styles.emptyCartText}>Your cart is empty!</Text>
                )}
            </ScrollView>

            <View style={styles.footer}>
                <TextInput
                    style={styles.promoInput}
                    placeholder="Promo Code"
                    value={promoCode}
                    onChangeText={setPromoCode}
                />
                <TouchableOpacity
                    style={styles.applyButton}
                    onPress={() =>
                        promoCode
                            ? Alert.alert("Promo Code Applied", `Discount: $${applyDiscount()}`)
                            : Alert.alert("Invalid Code", "Please enter a valid promo code")
                    }
                >
                    <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>

                <View style={styles.summary}>
                    <Text style={styles.summaryText}>Sub-Total: ${calculateSubTotal().toFixed(2)}</Text>
                    <Text style={styles.summaryText}>Delivery Fee: ${deliveryFee}</Text>
                    <Text style={styles.summaryText}>Discount: -${applyDiscount().toFixed(2)}</Text>
                    <Text style={styles.totalText}>Total Cost: ${totalCost.toFixed(2)}</Text>
                </View>

                <TouchableOpacity
                    style={styles.checkoutButton}
                    onPress={handleProceedToCheckout}
                >
                    <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        margin: 20,
        textAlign: "center",
    },
    cartList: {
        flex: 1,
        marginHorizontal: 20,
    },
    cartItem: {
        flexDirection: "row",
        marginBottom: 20,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        padding: 10,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    itemDetails: {
        flex: 1,
        marginLeft: 10,
    },
    itemName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    itemCategory: {
        fontSize: 14,
        color: "#777",
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 5,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    quantityButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ccc",
        marginHorizontal: 5,
    },
    quantityButtonText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    quantityText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    removeButton: {
        justifyContent: "center",
        alignItems: "center",
    },
    removeButtonText: {
        fontSize: 20,
        color: "red",
    },
    emptyCartText: {
        fontSize: 18,
        textAlign: "center",
        color: "#777",
        marginVertical: 20,
    },
    footer: {
        padding: 20,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#ddd",
    },
    promoInput: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    applyButton: {
        backgroundColor: "#6b4226",
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
    },
    applyButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    summary: {
        marginVertical: 10,
    },
    summaryText: {
        fontSize: 16,
        marginVertical: 2,
    },
    totalText: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 5,
    },
    checkoutButton: {
        backgroundColor: "#6b4226",
        borderRadius: 10,
        padding: 15,
        alignItems: "center",
        marginTop: 10,
    },
    checkoutButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    removeSwipeButton: {
        backgroundColor: "#f8a8a8",
        justifyContent: "center",
        alignItems: "center",
        width: 70,
        height: "85%",
        borderRadius: 10,
    },
    removeSwipeText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },

});

export default Cart;
