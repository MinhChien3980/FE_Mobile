import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

interface Product {
    id: string;
    name: string;
    price: number;
    image: any;
    images: any[];
    description: string;
    sizes: string[];
    colors: string[];
    rating: number;
    reviews: { user: string; comment: string; rating: number }[];
}

const ProductDetail: React.FC = () => {
    const navigation = useNavigation();
    const [productId] = useState<string>("1");
    const [product, setProduct] = useState<Product | null>(null);
    const [review, setReview] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const [reviews, setReviews] = useState<{ user: string; comment: string; rating: number }[]>([]);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        fetchProductDetails();
        fetchReviews();
    }, []);

    const fetchProductDetails = async () => {
        const data = {
            id: "1",
            name: "Sản phẩm A",
            price: 100000,
            image: require("../../assets/images/proFake_1.jpeg"),
            images: [
                require("../../assets/images/proFake_1.jpeg"),
                require("../../assets/images/proFake_2.jpeg"),
                require("../../assets/images/proFake_3.jpeg"),
            ],
            description: "Mô tả sản phẩm A. Đây là một sản phẩm chất lượng cao.",
            sizes: ["S", "M", "L", "XL"],
            colors: ["red", "green", "yellow", "blue", "black"],
            rating: 4.5,
            reviews: [
                { user: "Người dùng 1", comment: "Sản phẩm tuyệt vời!", rating: 5 },
                { user: "Người dùng 2", comment: "Chất lượng rất tốt", rating: 4 },
            ],
        };

        setProduct(data);
        setSelectedImage(data.image); // Cập nhật ảnh chính
    };

    const fetchReviews = async () => {
        const data = { reviews: product?.reviews || [] };
        setReviews(data.reviews);
        calculateAverageRating(data.reviews);
    };

    const calculateAverageRating = (reviews: { user: string; comment: string; rating: number }[]) => {
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = totalRating / reviews.length;
        setProduct((prevProduct) => {
            if (prevProduct) {
                return { ...prevProduct, rating: averageRating };
            }
            return prevProduct;
        });
    };

    const handleReviewSubmit = async () => {
        if (review.trim() === "") {
            Alert.alert("Thông báo", "Vui lòng nhập nội dung đánh giá!");
            return;
        }

        if (rating === 0) {
            Alert.alert("Thông báo", "Vui lòng chọn mức đánh giá!");
            return;
        }

        if (rating > 5) {
            Alert.alert("Thông báo", "Điểm đánh giá không thể lớn hơn 5!");
            return;
        }

        const newReview = { user: "Người dùng ẩn danh", comment: review, rating };
        const updatedReviews = [...reviews, newReview];
        setReviews(updatedReviews);
        setReview("");
        setRating(0);
        calculateAverageRating(updatedReviews);
    };

    // phương thức addtocart
    const handleAddToCart = () => {
        navigation.navigate("Cart");
        Alert.alert("Thông báo", "Sản phẩm đã được thêm vào giỏ hàng!");
    };

    const handleFavoriteToggle = () => {
        setIsFavorite(!isFavorite);
    };

    const handleBack = () => {
        navigation.goBack();
    };

    // tính điểm đánh giá
    const renderStars = (currentRating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity
                    key={i}
                    onPress={() => setRating(i)}
                >
                    <Icon
                        name={i <= currentRating ? "star" : "star-o"}
                        size={20}
                        color={i <= currentRating ? "#FFD700" : "#8B4513"}
                    />
                </TouchableOpacity>
            );
        }
        return stars;
    };

    if (!product) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Không tìm thấy sản phẩm.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack}>
                    <Text style={styles.backButton}>Quay lại</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFavoriteToggle}>
                    <Icon
                        name={isFavorite ? "heart" : "heart-o"}
                        size={30}
                        color={isFavorite ? "red" : "#8B4513"}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.imageContainer}>
                <Image source={selectedImage} style={styles.mainImage} />
            </View>

            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>{product.price.toLocaleString()} VND</Text>
            <Text style={styles.description}>{product.description}</Text>

            {/* Size selection with brown highlight */}
            <View style={styles.selectionContainer}>
                <Text style={styles.selectionTitle}>Chọn Size:</Text>
                <View style={styles.optionsContainer}>
                    {product.sizes.map((size) => (
                        <TouchableOpacity
                            key={size}
                            style={[styles.option, selectedSize === size && styles.selectedOption]}
                            onPress={() => setSelectedSize(size)}
                        >
                            <Text style={styles.optionText}>{size}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Color selection with color swatches */}
            <View style={styles.selectionContainer}>
                <Text style={styles.selectionTitle}>Chọn Màu:</Text>
                <View style={styles.colorOptionsContainer}>
                    {product.colors.map((color) => (
                        <TouchableOpacity
                            key={color}
                            style={[styles.colorOption, selectedColor === color && { borderWidth: 2, borderColor: "#6b4226" }]}
                            onPress={() => setSelectedColor(color)}
                        >
                            <View
                                style={[styles.colorSwatch, { backgroundColor: color }]}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Quantity input */}
            <View style={styles.selectionContainer}>
                <Text style={styles.selectionTitle}>Số lượng:</Text>
                <TextInput
                    style={styles.quantityInput}
                    value={quantity.toString()}
                    keyboardType="numeric"
                    onChangeText={(text) => setQuantity(Number(text))}
                />
            </View>

            <View style={styles.totalPriceContainer}>
                <Text style={styles.totalPriceLabel}>Tổng giá:</Text>
                <Text style={styles.totalPrice}>{(product.price * quantity).toLocaleString()} VND</Text>
            </View>

            <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                <Text style={styles.addToCartButtonText}>Thêm vào giỏ hàng</Text>
            </TouchableOpacity>

            <View style={styles.ratingContainer}>
                <Text style={styles.ratingTitle}>Đánh giá:</Text>
                <View style={styles.starsContainer}>
                    {renderStars(product.rating)}
                </View>
            </View>

            {reviews.map((review, index) => (
                <View key={index} style={styles.reviewContainer}>
                    <Text style={styles.reviewUser}>{review.user}</Text>
                    <Text style={styles.reviewComment}>{review.comment}</Text>
                    <Text style={styles.reviewRating}>Đánh giá: {review.rating} / 5</Text>
                </View>
            ))}

            <View style={styles.reviewInputContainer}>
                <Text style={styles.reviewInputTitle}>Viết đánh giá của bạn:</Text>
                <TextInput
                    style={styles.reviewInput}
                    placeholder="Nhập đánh giá..."
                    value={review}
                    onChangeText={setReview}
                />
                <View style={styles.starsContainer}>
                    {renderStars(rating)}
                </View>
                <TouchableOpacity style={styles.submitReviewButton} onPress={handleReviewSubmit}>
                    <Text style={styles.submitReviewButtonText}>Gửi đánh giá</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
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
        borderRadius: 4,
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
