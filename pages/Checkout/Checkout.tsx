import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../components/Navigator/NavigatorBottom";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  productMedia: string[];
}

const Checkout = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // Lưu danh sách giỏ hàng
  const [loading, setLoading] = useState(true); // Trạng thái tải
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Hàm gọi API
  const fetchCartItems = async () => {
    try {
      const response = await axios.get("https://api.example.com/cart");
      setCartItems(response.data); // Lưu dữ liệu giỏ hàng vào state
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu giỏ hàng:", error);
    } finally {
      setLoading(false); // Tắt trạng thái tải
    }
  };

  // Gọi API khi component được render
  useEffect(() => {
    fetchCartItems();
  }, []);

  // Tính tổng tiền
  const calculateTotalCost = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
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
      <Text style={styles.header}>Checkout</Text>
      <ScrollView style={styles.orderListContainer}>
        <Text style={styles.sectionTitle}>Order List</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#6b4226" />
        ) : cartItems.length > 0 ? (
          cartItems.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Image
                source={{ uri: item.productMedia[0] }}
                style={styles.orderItemImage}
              />
              <View style={styles.orderItemDetails}>
                <Text style={styles.orderItemName}>{item.name}</Text>
                <Text style={styles.orderItemPrice}>
                  ${item.price.toFixed(2)}
                </Text>
                <Text style={styles.orderItemQuantity}>
                  Quantity: {item.quantity}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text>No items in cart.</Text>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ${calculateTotalCost()}</Text>
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.paymentButtonText}>Continue to Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6b4226",
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  orderListContainer: { flex: 1, marginBottom: 20 },
  orderItem: {
    flexDirection: "row",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  orderItemImage: { width: 60, height: 60, marginRight: 10 },
  orderItemDetails: { flex: 1 },
  orderItemName: { fontSize: 16, fontWeight: "bold" },
  orderItemPrice: { fontSize: 14, color: "#555" },
  orderItemQuantity: { fontSize: 14, color: "#777" },
  footer: { padding: 16, backgroundColor: "#f8f8f8", alignItems: "center" },
  totalText: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  paymentButton: {
    backgroundColor: "#6b4226",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  paymentButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default Checkout;
