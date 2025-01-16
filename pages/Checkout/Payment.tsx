import React, { useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Thêm icon FontAwesome
import { RootStackParamList } from "../../components/Navigator/NavigatorBottom";

const Payment: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const handleSelectPaymentOption = (paymentMethod: string) => {
    setSelectedPayment(paymentMethod);
  };

  const handleConfirmPayment = () => {
    // Điều hướng đến trang OrderSuccess khi thanh toán thành công
    navigation.navigate("OrderSuccess");
  };

  return (
    <View style={styles.paymentContainer}>
      {/* Back button to navigate to Checkout page */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>{"< Payment Methods"}</Text>
      </TouchableOpacity>

      {/* Credit & Debit Card Section */}
      <Text style={styles.heading}>Credit & Debit Card</Text>
      <TouchableOpacity
        style={styles.cardOption}
        onPress={() => navigation.navigate("Addcard")}
      >
        <Text style={styles.cardText}>💳 Add Card</Text>
        <Text style={styles.arrow}>{" >"}</Text>
      </TouchableOpacity>

      {/* More Payment Options Section */}
      <Text style={styles.heading}>More Payment Options</Text>
      {["Paypal", "Apple Pay", "Google Pay"].map((method) => (
        <TouchableOpacity
          key={method}
          style={styles.paymentOption}
          onPress={() => handleSelectPaymentOption(method)}
        >
          <Icon
            name={
              method === "Apple Pay"
                ? "apple"
                : method === "Google Pay"
                ? "google"
                : "paypal"
            }
            size={30}
            color="#555"
            style={styles.paymentImage}
          />
          <Text style={styles.paymentText}>{method}</Text>
          {selectedPayment === method && (
            <Text style={styles.selectedText}>Selected</Text>
          )}
        </TouchableOpacity>
      ))}

      {/* Confirm Payment Button */}
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmPayment}
      >
        <Text style={styles.confirmButtonText}>Confirm Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  paymentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: "#007BFF",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 15,
    color: "#333",
  },
  cardOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    color: "#555",
  },
  arrow: {
    fontSize: 18,
    color: "#007BFF",
    marginLeft: 5,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  paymentImage: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  paymentText: {
    fontSize: 16,
    color: "#555",
  },
  selectedText: {
    fontSize: 14,
    color: "#28a745",
    marginLeft: 10,
  },
  confirmButton: {
    backgroundColor: "#6b4226",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Payment;
