import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define Product interface
interface Product {
    id: string;
    name: string;
    price: number;
    image: any;
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

    const toggleFavorite = async (product: Product) => {
        const updatedFavorites = favorites.filter((item) => item.id !== product.id);
        setFavorites(updatedFavorites);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        Alert.alert('Thông báo', `${product.name} đã được xóa khỏi danh sách yêu thích.`);
    };

    const renderFavoriteProduct = ({item}: { item: Product }) => {
        return (
            <View style={styles.productContainer}>
                <Image source={item.image} style={styles.productImage}/>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>Giá: {item.price} VNĐ</Text>
                <TouchableOpacity onPress={() => toggleFavorite(item)}>
                    <Text style={styles.favoriteButton}>🤎</Text>
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
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1, padding: 20},
    title: {fontSize: 24, fontWeight: 'bold', textAlign: 'center'},
    productContainer: {flex: 1, margin: 10, backgroundColor: '#f9f9f9', padding: 10, alignItems: 'center'},
    productImage: {width: 100, height: 100},
    productName: {fontSize: 18, fontWeight: 'bold'},
    productPrice: {fontSize: 16},
    favoriteButton: {fontSize: 24, color: 'red'}, // Use the heart icon like in ProductListScreen
    emptyMessage: {textAlign: 'center', fontSize: 18, color: '#888'},
    row: {justifyContent: 'space-between'},
});

export default FavoritesScreen;
