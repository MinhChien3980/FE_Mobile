import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Cart from "../../pages/Cart/Cart";
import Home from "../../pages/Home/Home";
import Products from "../../pages/ProductList/Products";
import Profile from "../../pages/Profile/Profile";

// Screens

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Products") {
              iconName = "category";
            } else if (route.name === "Cart") {
              iconName = "shopping-cart";
            } else if (route.name === "Profile") {
              iconName = "person";
            }

            return <Icon name="iconName" size={size} color={color}></Icon>
          },
          tabBarActiveTintColor: "#6200ee",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{ title: "Trang chủ" }} />
        <Tab.Screen name="Products" component={Products} options={{ title: "Sản phẩm" }} />
        <Tab.Screen name="Cart" component={Cart} options={{ title: "Giỏ hàng" }} />
        <Tab.Screen name="Profile" component={Profile} options={{ title: "Cá nhân" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigator;
