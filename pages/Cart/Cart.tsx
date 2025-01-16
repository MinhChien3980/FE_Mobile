import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { HStack, Button, Box } from "native-base";
import { getMyInfo } from "../../api/UserApiService";
import { get, getWithData, post } from "../../api/ApiService";

const initialCartItems = [
  { id: "1", name: "Product 1", price: 200, quantity: 2 },
  { id: "2", name: "Product 2", price: 100, quantity: 1 },
];

const Cart = ({ navigation }: any) => {
  const [cartItems, setCartItems] = useState<any[]>([]); // Giỏ hàng
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState<string | null>(null); // Lỗi khi tải dữ liệu

  // Hàm gọi API để lấy giỏ hàng
  const handleGetCartItems = async () => {
    try {
      setLoading(true); // Bắt đầu tải dữ liệu
      const fetchUser = await getMyInfo();
      const userId = fetchUser.data.data.id;

      const response = await get("api/cart/user?userId=" + userId);
      const fetchedCartItems = (response.data as { data: { cartItems: any[] } })
        .data.cartItems;
      console.log(
        "🚀 ~ handleGetCartItems ~ fetchedCartItems:",
        fetchedCartItems
      );

      setCartItems(fetchedCartItems); // Cập nhật giỏ hàng
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError("Không thể tải dữ liệu giỏ hàng.");
    } finally {
      setLoading(false); // Kết thúc tải dữ liệu
    }
  };

  // Gọi API khi component được render
  useEffect(() => {
    handleGetCartItems();
  }, []);

  const handleIncreaseQuantity = (id: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (id: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    setCartItems([]);
  };

  // const calculateTotal = () => {
  //   return cartItems.reduce(
  //     (total, item) => total + item.price * item.quantity,
  //     0
  //   );
  // };
  let grandTotal = 0;
  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const handleProceedToCheckout = () => {
    navigation.navigate("Checkout"); // Pass cartItems to Checkout
  };

  return (
    <View style={styles.container}>
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>Giỏ Hàng</Text>
        <View style={styles.locationDetailsContainer}>
          <Icon
            name="shopping-cart"
            size={20}
            color={styles.primaryColor.color}
          />
          <Text style={styles.countryText}>Thủ Đức, Việt Nam</Text>
        </View>
        <View style={styles.headerContainer}>
          <Icon
            name="notifications"
            size={24}
            color={styles.primaryColor.color}
          />
        </View>
      </View>

      {/* {loading ? (
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : ( */}
      <>
        <View>
          <HStack
            ml="10"
            m="2%"
            w="100%"
            alignSelf="center"
            space={2}
            alignItems="center"
          >
            <Button
              variant="outline"
              size="sm"
              style={styles.clearButton}
              onPress={handleClearAll}
            >
              <Text style={styles.buttonText}>Xóa hết</Text>
            </Button>
          </HStack>
        </View>

        <ScrollView>
          {cartItems.length === 0 ? (
            <Text style={styles.emptyCartText}>Giỏ hàng trống</Text>
          ) : (
            cartItems.map(
              (item) => (
                (grandTotal += item.product.price * item.quantity),
                (
                  <Box
                    key={item.id}
                    p={4}
                    borderWidth={1}
                    borderRadius="md"
                    marginBottom={4}
                    borderColor={styles.borderColor.color}
                  >
                    {/* <Text>Cart Item Id : {item.id}</Text> */}

                    <HStack space={4} alignItems="center">
                      <Text style={[styles.itemText, { flex: 1 }]}>
                        {item.product.name}
                      </Text>
                      <Text style={styles.itemText}>
                        {formatPrice(item.product.price)}
                      </Text>
                      <HStack space={2} alignItems="center">
                        <Button
                          size="sm"
                          style={styles.quantityButton}
                          onPress={() => handleDecreaseQuantity(item.id)}
                        >
                          <Text style={styles.buttonText}>-</Text>
                        </Button>
                        <Text style={styles.itemText}>{item.quantity}</Text>
                        <Button
                          size="sm"
                          style={styles.quantityButton}
                          onPress={() => handleIncreaseQuantity(item.id)}
                        >
                          <Text style={styles.buttonText}>+</Text>
                        </Button>
                      </HStack>
                      <Button
                        size="sm"
                        style={styles.removeButton}
                        onPress={() => handleRemoveItem(item.id)}
                      >
                        <Text style={styles.buttonText}>Xóa</Text>
                      </Button>
                    </HStack>
                  </Box>
                )
              )
            )
          )}

          <Box mt={4} alignItems="flex-end">
            <Text style={styles.totalText}>
              Tổng Tiền: {formatPrice(grandTotal)}
            </Text>
          </Box>

          <Button
            mt={6}
            style={styles.checkoutButton}
            onPress={handleProceedToCheckout}
          >
            <Text style={styles.checkoutText}>Tiến Hành Thanh Toán</Text>
          </Button>
        </ScrollView>
      </>
      {/* )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F3ECE2",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    right: 0,
    padding: 15,
  },
  locationContainer: {
    marginBottom: 20,
  },
  locationText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6B4226",
  },
  locationDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  countryText: {
    fontSize: 16,
    marginLeft: 5,
    color: "#6B4226",
  },
  emptyCartText: {
    textAlign: "center",
    fontSize: 18,
    color: "gray",
    marginTop: 20,
  },
  clearButton: {
    borderColor: "#6B4226",
  },
  buttonText: {
    color: "#6B4226",
  },
  itemText: {
    color: "#4E342E",
  },
  borderColor: {
    color: "#D7CCC8",
  },
  quantityButton: {
    backgroundColor: "#8d6043",
  },
  removeButton: {
    backgroundColor: "#8d6043",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4E342E",
  },
  checkoutButton: {
    backgroundColor: "#6B4226",
  },
  checkoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  primaryColor: {
    color: "#6B4226",
  },
});

export default Cart;
