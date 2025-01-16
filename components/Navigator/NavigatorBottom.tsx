import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as SecureStore from "expo-secure-store";
import Cart from "../../pages/Cart/Cart";
import Home from "../../pages/Home/Home";
import Products from "../../pages/ProductList/Products";
import Profile from "../../pages/Profile/Profile";
import Login from "../../pages/Login/Login";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = "help";

        if (route.name === "Home") {
          iconName = "home";
        } else if (route.name === "Products") {
          iconName = "category";
        } else if (route.name === "Cart") {
          iconName = "shopping-cart";
        } else if (route.name === "Profile") {
          iconName = "person";
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#6200ee",
      tabBarInactiveTintColor: "gray",
    })}
  >
    <Tab.Screen name="Home" component={Home} options={{ title: "Trang chủ" }} />
    <Tab.Screen
      name="Products"
      component={Products}
      options={{ title: "Sản phẩm" }}
    />
    <Tab.Screen name="Cart" component={Cart} options={{ title: "Giỏ hàng" }} />
    <Tab.Screen name="Profile" component={Profile} options={{ title: "Cá nhân" }} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");
        setIsLoggedIn(!!token);
      } catch (error) {
        console.error("Failed to retrieve token", error);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="MainTabs" component={MainTabs} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
