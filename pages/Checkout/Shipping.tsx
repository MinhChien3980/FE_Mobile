import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const Shipping = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { currentShipping, updateShipping } = route.params; // Lấy giá trị từ params

    const [selectedShipping, setSelectedShipping] = React.useState(currentShipping);

    const handleSelectShipping = (shippingMethod: string) => {
        setSelectedShipping(shippingMethod);
    };

    const handleConfirmShipping = () => {
        if (!selectedShipping) {
            Alert.alert("Chưa chọn phương thức vận chuyển", "Vui lòng chọn một phương thức vận chuyển.");
            return;
        }
        updateShipping(selectedShipping); // Cập nhật phương thức vận chuyển lên Checkout
        navigation.goBack(); // Trở về trang Checkout
    };

    return (
        <View style={styles.container}>
            {/*<View style={styles.headerContainer}>*/}
            {/*    <Text style={styles.header}>Choose Shipping</Text>*/}
            {/*</View>*/}

            <View style={styles.optionsContainer}>
                {/* Các phương thức vận chuyển */}
                {["Economy", "Regular", "Cargo", "Friend's House"].map((method) => (
                    <TouchableOpacity
                        key={method}
                        style={[styles.shippingOption, selectedShipping === method && styles.selectedOption]}
                        onPress={() => handleSelectShipping(method)}
                    >
                        <FontAwesome
                            name={method === "Economy" ? "truck" : method === "Regular" ? "archive" : method === "Cargo" ? "ship" : "home"}
                            size={24}
                            color={selectedShipping === method ? "#fff" : "#6b4226"}
                        />
                        <Text style={styles.optionText}>{method}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.footerContainer}>
                {/* Nút xác nhận */}
                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmShipping}>
                    <Text style={styles.confirmButtonText}>Apply</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.goBackButtonText}>Back to Checkout</Text>
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
    headerContainer: {
        backgroundColor: "#6b4226",
        padding: 20,
        alignItems: "center",
    },
    header: {
        fontSize: 24,
        color: "#fff",
        fontWeight: "bold",
    },
    optionsContainer: {
        padding: 20,
    },
    shippingOption: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    selectedOption: {
        backgroundColor: "#936b4f",
    },
    optionText: {
        fontSize: 18,
        marginLeft: 10,
        color: "#6b4226",
    },
    footerContainer: {
        padding: 20,
        backgroundColor: "#f8f8f8",
        alignItems: "center",
    },
    confirmButton: {
        backgroundColor: "#6b4226",
        paddingVertical: 15,
        borderRadius: 20,
        width: "100%",
        alignItems: "center",
        marginBottom: 10,
    },
    confirmButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
    goBackButton: {
        paddingVertical: 15,
        alignItems: "center",
        borderRadius: 20,
    },
    goBackButtonText: {
        fontSize: 16,
        color: "#6b4226",
        fontWeight: "bold",
    },
});

export default Shipping;
