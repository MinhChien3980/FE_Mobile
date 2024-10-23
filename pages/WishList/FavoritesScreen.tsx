import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Định nghĩa kiểu Product
interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
}

const FavoritesScreen = () => {
    const [favorites, setFavorites] = useState<Product[]>([]);

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

    const removeFavorite = async (product: Product) => {
        const updatedFavorites = favorites.filter((item) => item.id !== product.id);
        setFavorites(updatedFavorites);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        Alert.alert('Thông báo', `${product.name} đã được xóa khỏi danh sách yêu thích.`);
    };

    const renderFavoriteProduct = ({item}: { item: Product }) => {
        return (
            <View style={styles.productContainer}>
                <Image source={{uri: item.image}} style={styles.productImage}/>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>Giá: {item.price} VNĐ</Text>
                <TouchableOpacity onPress={() => removeFavorite(item)}>
                    <Text style={styles.removeButton}>❤️</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Yêu thích</Text>
            {favorites.length === 0 ? (
                <Text style={styles.emptyMessage}>Danh sách yêu thích trống.</Text>
            ) : (
                <FlatList
                    data={favorites}
                    renderItem={renderFavoriteProduct}
                    keyExtractor={(item) => item.id}
                    numColumns={2} // Hiển thị 2 sản phẩm mỗi hàng
                    columnWrapperStyle={styles.row} // Style cho hàng sản phẩm
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1, padding: 20},
    title: {fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10},
    productContainer: {
        flex: 1,
        margin: 10,
        backgroundColor: '#f9f9f9',
        padding: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    productImage: {width: 100, height: 100},
    productName: {fontSize: 16, fontWeight: 'bold', marginVertical: 5},
    productPrice: {fontSize: 14, marginBottom: 10},
    removeButton: {fontSize: 16, color: 'red'},
    row: {justifyContent: 'space-between'}, // Để căn chỉnh đều các sản phẩm
    emptyMessage: {textAlign: 'center', fontSize: 18, color: '#888'},
});

export default FavoritesScreen;
