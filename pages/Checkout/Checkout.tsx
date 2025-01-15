import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Checkout = () => {
    const [address, setAddress] = useState("1901 Thornridge Cir, Shiloh, Hawaii 81063");
    const [shippingType, setShippingType] = useState("Economy");
    const navigation = useNavigation();

    const cartItems = [
        {
            id: "1",
            name: "Brown Jacket",
            category: "Clothing",
            price: 83.97,
            quantity: 1,
            main_img: require("../../assets/images/proFake_3.jpeg"),
        },
        {
            id: "2",
            name: "Brown Suite",
            category: "Clothing",
            price: 120,
            quantity: 1,
            main_img: require("../../assets/images/proFake_2.jpeg"),
        },
        {
            id: "3",
            name: "Brown Jacket",
            category: "Clothing",
            price: 83.97,
            quantity: 1,
            main_img: require("../../assets/images/proFake_3.jpeg"),
        },
    ];

    const calculateTotalCost = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handlePlaceOrder = () => {
        navigation.navigate("Payment");
        // Alert.alert(
        //     "Order Placed Successfully",
        //     `Thank you for your purchase! Your order is being processed.`,
        //     [{ text: "OK" }]
        // );
    };

    return (
        <View style={styles.container}>
            {/* Header Section */}
            {/*<View style={styles.headerSection}>*/}
            {/*    <Text style={styles.headerTitle}>Checkout</Text>*/}
            {/*</View>*/}

            {/* Shipping Address Section */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Shipping Address</Text>
                <View style={styles.shippingAddressBox}>
                    <Text style={styles.addressText}>{address}</Text>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("Address", {
                                currentAddress: address,
                                updateAddress: (newAddress) => setAddress(newAddress),
                            })
                        }
                    >
                        <Text style={styles.changeText}>Change</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Shipping Type Section */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Choose Shipping Type</Text>
                <View style={styles.shippingTypeBox}>
                    <Text style={styles.shippingTypeText}>{shippingType}</Text>
                    <Text style={styles.estimatedArrivalText}>Estimated Arrival: 25 August 2023</Text>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("Shipping", {
                                currentShipping: shippingType,
                                updateShipping: setShippingType,
                            })
                        }
                    >
                        <Text style={styles.changeText}>Change</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Order List Section */}
            <ScrollView style={styles.orderListContainer}>
                <Text style={styles.sectionTitle}>Order List</Text>
                {cartItems.map((item) => (
                    <View key={item.id} style={styles.orderItem}>
                        <Image source={item.main_img} style={styles.orderItemImage} />
                        <View style={styles.orderItemDetails}>
                            <Text style={styles.orderItemName}>{item.name}</Text>
                            <Text style={styles.orderItemPrice}>${item.price.toFixed(2)}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Footer Section */}
            <View style={styles.footerSection}>
                <Text style={styles.totalText}>Total: ${calculateTotalCost().toFixed(2)}</Text>
                <TouchableOpacity style={styles.paymentButton} onPress={handlePlaceOrder}>
                    <Text style={styles.paymentButtonText}>Continue to Payment</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    headerSection: {
        backgroundColor: "#6b4226",
        padding: 20,
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 24,
        color: "#fff",
        fontWeight: "bold",
    },
    sectionContainer: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    shippingAddressBox: {
        padding: 15,
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    addressText: {
        fontSize: 16,
        marginBottom: 10,
    },
    shippingTypeBox: {
        padding: 15,
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    shippingTypeText: {
        fontSize: 16,
        marginBottom: 10,
    },
    estimatedArrivalText: {
        fontSize: 14,
        color: "#555",
    },
    changeText: {
        fontSize: 16,
        color: "#6b4226",
    },
    orderListContainer: {
        flex: 1,
        marginBottom: 20,
    },
    orderItem: {
        flexDirection: "row",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    orderItemImage: {
        width: 60,
        height: 60,
        marginRight: 10,
    },
    orderItemDetails: {
        flex: 1,
        justifyContent: "center",
    },
    orderItemName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    orderItemPrice: {
        fontSize: 14,
        color: "#555",
    },
    footerSection: {
        padding: 20,
        backgroundColor: "#f8f8f8",
        alignItems: "center",
    },
    totalText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    paymentButton: {
        backgroundColor: "#6b4226",
        paddingVertical: 15,
        borderRadius: 20,
        width: "100%",
        alignItems: "center",
        marginTop: 20,
    },
    paymentButtonText: {
        fontSize: 16,
        color: "#fff",
    },
});

export default Checkout;
