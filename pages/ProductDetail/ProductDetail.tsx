import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import {
    View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator,
    Alert, StyleSheet, Button, FlatList
} from 'react-native';
import { getProductById } from '../../api/ProductApiService';
import Products from "../ProductList/Products";
import {RootStackParamList} from "../../App"; // Import API service

// Kiểu dữ liệu cho sản phẩm
interface Product {
    id: number;
    name: string;
    price: number;
    urlImage: string;
    images: string[];
    description: string;
    colors: string[];
    rating: number;
}

const ProductDetail = ({ route }: any) => {
    const { productId } = route.params || {};
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const navigation = useNavigation();

    const handleGoback = ()=> {
       navigation.navigate("Products");
    }

    // Gọi API để lấy chi tiết sản phẩm
    const fetchProductDetails = async () => {
        if (!productId) {
            Alert.alert("Thông báo", "Không tìm thấy mã sản phẩm.");
            navigation.goBack();
            return;
        }
        try {
            const response = await getProductById(productId);
            const data = response.data;

            // Cập nhật thông tin sản phẩm
            setProduct({
                id: data.id,
                name: data.name,
                price: data.price,
                urlImage: data.urlImage,
                images: data.images || [data.urlImage],
                description: data.description,
                colors: data.colors || [],
                rating: data.rating || 0,
            });
            setSelectedImage(data.urlImage);
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
            Alert.alert("Thông báo", "Không thể tải chi tiết sản phẩm.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductDetails();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6b4226" />
                <Text>Đang tải sản phẩm...</Text>
            </View>
        );
    }

    if (!product) {
        return (
            <View style={styles.errorContainer}>
                <Text>Không tìm thấy chi tiết sản phẩm.</Text>
                <Button title="Quay lại" onPress={() => navigation.goBack()} />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: selectedImage }} style={styles.mainImage} />
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={product.images}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setSelectedImage(item)}>
                        <Image source={{ uri: item }} style={styles.thumbnail} />
                    </TouchableOpacity>
                )}
            />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price.toLocaleString()} ₫</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            <View style={styles.colorContainer}>
                <Text>Màu sắc: </Text>
                {product.colors.map((color, index) => (
                    <Text key={index} style={styles.colorText}>{color}</Text>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    mainImage: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
    },
    thumbnail: {
        width: 70,
        height: 70,
        marginRight: 8,
        borderRadius: 8,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    productPrice: {
        fontSize: 18,
        color: '#6b4226',
        marginBottom: 8,
    },
    productDescription: {
        fontSize: 16,
        color: '#666',
        marginBottom: 16,
    },
    colorContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    colorText: {
        marginRight: 8,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProductDetail;
