import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Import các màn hình
import Home from "../../pages/Home/Home";
import Products from "../../pages/ProductList/Products";
import Cart from "../../pages/Cart/Cart";
import Favorites from "../../pages/WishList/FavouritesScreen";
import Profile from "../../pages/Profile/Profile";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";

// Tạo các navigator
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator cho các tab chính
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: string = "";

        if (route.name === "Home") iconName = "home";
        else if (route.name === "Products") iconName = "list";
        else if (route.name === "Cart") iconName = "cart";
        else if (route.name === "Favorites") iconName = "heart";
        else if (route.name === "Profile") iconName = "person";

        const iconColor = focused ? "#704F38" : "#aaa";

        return <Ionicons name={iconName} size={size} color={iconColor} />;
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: "600",
      },
      tabBarActiveTintColor: "#704F38",
      tabBarInactiveTintColor: "#aaa",
      tabBarStyle: {
        backgroundColor: "#fff",
        borderTopColor: "#ccc",
        height: 60,
        paddingBottom: 5,
      },
    })}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Products" component={Products} />
    <Tab.Screen name="Cart" component={Cart} />
    <Tab.Screen name="Favorites" component={Favorites} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

// Stack Navigator cho điều hướng chính
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Màn hình Login */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        {/* Màn hình Register */}
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />

        {/* Tab Navigator (Main App) */}
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
