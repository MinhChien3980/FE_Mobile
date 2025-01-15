import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icon library

const OrderSuccess: React.FC = () => {
    const navigation = useNavigation(); // Initialize navigation

    const handleBackToShopping = () => {
        // Navigate back to the product list or any other screen you want
        navigation.navigate('Products'); // Adjust the screen name if needed
    };

    return (
        <View style={styles.container}>
            {/* Icon for Order Success */}
            <Icon name="check-circle" size={150} color="#6b4226" style={styles.icon} />

            <Text style={styles.successText}>Order Successful!</Text>
            <Text style={styles.detailsText}>Thank you for your purchase.</Text>

            <TouchableOpacity style={styles.button} onPress={handleBackToShopping}>
                <Text style={styles.buttonText}>Back to Shopping</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f9f9f9",
        alignItems: 'center',
        justifyContent: 'center',
    },
    successText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#6b4226",
        marginBottom: 20,
    },
    detailsText: {
        fontSize: 16,
        color: "#333",
        marginBottom: 30,
    },
    button: {
        backgroundColor: "#6b4226",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
    icon: {
        marginBottom: 20,
    },
});

export default OrderSuccess;
