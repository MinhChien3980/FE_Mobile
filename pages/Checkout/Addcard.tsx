import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const AddCard: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Add Your Card</Text>
            <TextInput style={styles.input} placeholder="Card Number" keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Cardholder Name" />
            <TextInput style={styles.input} placeholder="Expiration Date" />
            <TextInput style={styles.input} placeholder="CVV" keyboardType="numeric" />

            <TouchableOpacity style={styles.button} onPress={() => alert("Card Added!")}>
                <Text style={styles.buttonText}>Add Card</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f9f9f9",
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 15,
        color: "#333",
    },
    input: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ddd",
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
});

export default AddCard;
