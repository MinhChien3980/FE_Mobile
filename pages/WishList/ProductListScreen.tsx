// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Image,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   useNavigation,
//   NavigationProp,
//   useFocusEffect,
// } from "@react-navigation/native";
// import { useCallback } from "react";
// import { RootStackParamList } from "../../App";
// import style from "../../assets/styles/style";

// // Define the Product interface
// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   image: any;
// }

// // Sample product list with local images
// const productList: Product[] = [
//   {
//     id: "1",
//     name: "Sản phẩm A",
//     price: 100,
//     image: require("../../assets/images/"),
//   },
//   {
//     id: "2",
//     name: "Sản phẩm B",
//     price: 200,
//     image: require("../../assets/images/proFake_2.jpeg"),
//   },
//   {
//     id: "3",
//     name: "Sản phẩm C",
//     price: 300,
//     image: require("../../assets/images/proFake_3.jpeg"),
//   },
//   {
//     id: "4",
//     name: "Sản phẩm D",
//     price: 400,
//     image: require("../../assets/images/proFake_4.jpeg"),
//   },
// ];

// const ProductListScreen = () => {
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//   const [favorites, setFavorites] = useState<Product[]>([]);

//   const loadFavorites = async () => {
//     try {
//       const savedFavorites = await AsyncStorage.getItem("favorites");
//       if (savedFavorites) {
//         setFavorites(JSON.parse(savedFavorites));
//       }
//     } catch (error) {
//       console.error("Failed to load favorites", error);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       loadFavorites();
//     }, [])
//   );

//   const toggleFavorite = async (product: Product) => {
//     let updatedFavorites: Product[];

//     if (favorites.some((item) => item.id === product.id)) {
//       updatedFavorites = favorites.filter((item) => item.id !== product.id);
//       Alert.alert(
//         "Thông báo",
//         `${product.name} đã được xóa khỏi danh sách yêu thích.`
//       );
//     } else {
//       updatedFavorites = [...favorites, product];
//       Alert.alert(
//         "Thông báo",
//         `${product.name} đã được thêm vào danh sách yêu thích.`
//       );
//     }

//     setFavorites(updatedFavorites);
//     await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
//   };

//   const renderProduct = ({ item }: { item: Product }) => {
//     const isFavorite = favorites.some((favorite) => favorite.id === item.id);

//     return (
//       <View style={styles.productContainer}>
//         <Image source={item.image} style={styles.productImage} />
//         <Text style={styles.productName}>{item.name}</Text>
//         <Text style={styles.productPrice}>Giá: {item.price} VNĐ</Text>
//         <TouchableOpacity onPress={() => toggleFavorite(item)}>
//           <Text style={styles.favoriteButton}>{isFavorite ? "❤️" : "🤍"}</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={productList}
//         renderItem={renderProduct}
//         keyExtractor={(item) => item.id}
//         numColumns={2}
//         columnWrapperStyle={styles.row}
//       />
//       <TouchableOpacity
//         style={styles.goToFavoritesButton}
//         onPress={() => navigation.navigate("Favorites")}
//       >
//         <Text style={styles.goToFavoritesText}>Xem danh sách yêu thích</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   productContainer: {
//     flex: 1,
//     margin: 10,
//     backgroundColor: "#f9f9f9",
//     padding: 10,
//     alignItems: "center",
//   },
//   productImage: { width: 100, height: 100 },
//   productName: { fontSize: 16, fontWeight: "bold" },
//   productPrice: { fontSize: 14, marginBottom: 10 },
//   favoriteButton: { fontSize: 24 },
//   row: { justifyContent: "space-between" },
//   goToFavoritesButton: {
//     marginTop: 20,
//     backgroundColor: style.primaryColor,
//     padding: 10,
//     alignItems: "center",
//   },
//   goToFavoritesText: { color: "#fff", fontWeight: "bold" },
// });

// export default ProductListScreen;
