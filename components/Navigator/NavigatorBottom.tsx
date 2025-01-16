import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as SecureStore from "expo-secure-store";
import {
  Center,
  Spinner,
  useToast,
  Button,
  FormControl,
  Input,
  Heading,
  VStack,
  Box,
  HStack,
  Text,
  Modal,
  Link,
  Pressable,
  Icon as NBIcon,
} from "native-base";
import Cart from "../../pages/Cart/Cart";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Products from "../../pages/ProductList/Products";
import Profile from "../../pages/Profile/Profile";
import Register from "../../pages/Register/Register";
import Verify from "../../pages/Verify/Verify";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const strings = {
  login: "Đăng nhập",
  register: "Đăng ký",
  home: "Trang chủ",
  products: "Danh sách sản phẩm",
  cart: "Giỏ hàng",
  profile: "Cá nhân",
};

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = "help";
        if (route.name === "Home") iconName = "home";
        else if (route.name === "Products") iconName = "category";
        else if (route.name === "Cart") iconName = "shopping-cart";
        else if (route.name === "Profile") iconName = "person";
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#6200ee",
      tabBarInactiveTintColor: "gray",
    })}
  >
    <Tab.Screen name="Home" component={Home} options={{ title: strings.home }} />
    <Tab.Screen
      name="Products"
      component={Products}
      options={{ title: strings.products }}
    />
    <Tab.Screen name="Cart" component={Cart} options={{ title: strings.cart }} />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{ title: strings.profile }}
    />
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
    return (
      <Center flex={1}>
        <Spinner size="lg" />
      </Center>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="MainTabs" component={MainTabs} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Verify" component={Verify} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
