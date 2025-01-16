import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Rating } from "react-native-ratings";
import { get } from "../../api/ApiService";

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../components/Navigator/NavigatorBottom";
import { Product } from "../../interface/product";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ProductDetail = () => {
  type ProductDetailNavigationProp = StackNavigationProp<
    RootStackParamList,
    "ProductDetail"
  >;

  const navigation = useNavigation<ProductDetailNavigationProp>();
  const route = useRoute();
  const { productId } = route.params as { productId: number };
  const [product, setProduct] = useState<Product>();
  const [selectedSize, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [review, setReview] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await get(`api/products/${productId}`);

        const productData = fetchedProduct.data as { data: Product };

        console.log("🚀 ~ fetchProduct ~ fetchedProduct:", productData.data);
        setProduct(productData.data);
      } catch (err) {
        setError("Product not found.");
      }
    };
    fetchProduct();
  }, [productId]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      setError("Please select a color.");
      return;
    }

    // Tạo giỏ hàng trong state hoặc sử dụng AsyncStorage/localStorage để lưu
    const cartItem = {
      id: product?.id,
      name: product?.name,
      price: product?.price,
      quantity,
    };

    // Lấy giỏ hàng hiện tại từ localStorage (hoặc AsyncStorage trong React Native)
    const currentCart = JSON.parse((await AsyncStorage.getItem("cart")) || "[]");

    // Thêm sản phẩm vào giỏ hàng
    currentCart.push(cartItem);

    // Lưu lại giỏ hàng vào localStorage
    localStorage.setItem("cart", JSON.stringify(currentCart));

    navigation.navigate("Cart");
  };

  const handleReviewSubmit = () => {
    // Logic for submitting a review (could be an API call or local state)
    console.log("Review submitted:", review);
    setReview(""); // Reset the review input after submission
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.productMediaUrls[0] }}
          style={styles.mainImage}
        />
      </View>

      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price} VND</Text>
      <Text style={styles.description}>{product.description}</Text>

      <View style={styles.selectionContainer}>
        <Text style={styles.selectionTitle}>Select Size:</Text>
        <View style={styles.colorOptionsContainer}>
          {product.size.map((size: string) => (
            <TouchableOpacity
              key={size}
              style={[selectedSize === size && styles.selectedOption]}
              onPress={() => setSelectedColor(size)}
            >
              <View style={[styles.colorSwatch, { backgroundColor: "#ccc" }]} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.selectionContainer}>
        <Text style={styles.selectionTitle}>Select Quantity:</Text>
        <TextInput
          style={styles.quantityInput}
          value={String(quantity)}
          onChangeText={(text) => setQuantity(Number(text))}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPriceLabel}>Total Price:</Text>
        <Text style={styles.totalPrice}>{product.price * quantity} VND</Text>
      </View>

      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={handleAddToCart}
      >
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>

      <View style={styles.ratingContainer}>
        <Text style={styles.ratingTitle}>Rating:</Text>
        <Rating
          startingValue={3}
          imageSize={20}
          readonly
          style={styles.starsContainer}
        />
      </View>

      <View style={styles.reviewContainer}>
        <Text style={styles.reviewInputTitle}>Leave a Review:</Text>
        <TextInput
          style={styles.reviewInput}
          value={review}
          onChangeText={setReview}
          placeholder="Write your review here..."
          multiline
        />
        <TouchableOpacity
          style={styles.submitReviewButton}
          onPress={handleReviewSubmit}
        >
          <Text style={styles.submitReviewButtonText}>Submit Review</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  errorText: {
    textAlign: "center",
    color: "red",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    fontSize: 16,
    color: "#6b4226",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  mainImage: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6b4226",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0a0a0a",
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: "#0a0a0a",
    marginBottom: 16,
  },
  selectionContainer: {
    marginBottom: 16,
  },
  selectionTitle: {
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#6b4226",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  option: {
    padding: 8,
    //borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#6b4226",
  },
  selectedOption: {
    backgroundColor: "#9b6744",
  },
  optionText: {
    color: "#6b4226",
  },
  colorOptionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  colorOption: {
    marginRight: 8,
    marginBottom: 8,
  },
  colorSwatch: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: "#6b4226",
    padding: 8,
    borderRadius: 4,
    width: 100,
  },
  totalPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  totalPriceLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6b4226",
  },
  totalPrice: {
    fontSize: 16,
    color: "#6b4226",
  },
  addToCartButton: {
    backgroundColor: "#6b4226",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  ratingContainer: {
    marginVertical: 16,
  },
  ratingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6b4226",
  },
  starsContainer: {
    flexDirection: "row",
  },
  reviewContainer: {
    marginBottom: 16,
  },
  reviewUser: {
    fontWeight: "bold",
    color: "#6b4226",
  },
  reviewComment: {
    fontStyle: "italic",
    color: "#6b4226",
  },
  reviewRating: {
    fontSize: 14,
    color: "#6b4226",
  },
  reviewInputContainer: {
    marginVertical: 16,
  },
  reviewInputTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6b4226",
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: "#6b4226",
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
    height: 100,
    textAlignVertical: "top",
  },
  submitReviewButton: {
    backgroundColor: "#6b4226",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitReviewButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ProductDetail;
