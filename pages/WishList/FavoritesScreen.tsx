import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Định nghĩa kiểu Product tương tự
interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
}

const FavoritesScreen = () => {
    const [favorites, setFavorites] = useState<Product[]>([]); // Sử dụng kiểu Product[]

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const savedFavorites = await AsyncStorage.getItem('favorites');
            if (savedFavorites) {
                setFavorites(JSON.parse(savedFavorites));
            }
        } catch (error) {
            console.error('Failed to load favorites', error);
        }
    };

    const removeFavorite = async (product: Product) => { // Thêm kiểu Product cho product
        const updatedFavorites = favorites.filter((item) => item.id !== product.id);
        setFavorites(updatedFavorites);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        Alert.alert('Thông báo', `${product.name} đã được xóa khỏi danh sách yêu thích.`);
    };

    const renderFavoriteProduct = ({item}: { item: Product }) => { // Thêm kiểu dữ liệu cho item
        return (
            <View style={styles.productContainer}>
                <Image source={{uri: item.image}} style={styles.productImage}/>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>Giá: {item.price} VNĐ</Text>
                <TouchableOpacity onPress={() => removeFavorite(item)}>
                    <Text style={styles.removeButton}>Xóa khỏi yêu thích</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Danh sách yêu thích</Text>
            {favorites.length === 0 ? (
                <Text style={styles.emptyMessage}>Danh sách yêu thích trống.</Text>
            ) : (
                <FlatList
                    data={favorites}
                    renderItem={renderFavoriteProduct}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1, padding: 20},
    title: {fontSize: 24, fontWeight: 'bold', textAlign: 'center'},
    productContainer: {flexDirection: 'row', alignItems: 'center', paddingVertical: 10},
    productImage: {width: 80, height: 80},
    productName: {fontSize: 18, fontWeight: 'bold'},
    productPrice: {fontSize: 16},
    removeButton: {fontSize: 16, color: 'red'},
    emptyMessage: {textAlign: 'center', fontSize: 18, color: '#888'},
});

export default FavoritesScreen;
