import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Cart from "../pages/Cart/Cart";
import Addcard from "../pages/Checkout/Addcard";
import Address from "../pages/Checkout/Address";
import Checkout from "../pages/Checkout/Checkout";
import OrderSuccess from "../pages/Checkout/OrderSuccess";
import Payment from "../pages/Checkout/Payment";
import Shipping from "../pages/Checkout/Shipping";
import Contact from "../pages/Contact/Contact";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import NewPassword from "../pages/NewPassword/NewPassword";
import OrderHistory from "../pages/Order/OrderHistory";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Products from "../pages/ProductList/Products";
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Register/Register";
import Tracking from "../pages/tracking/Tracking";
import Verify from "../pages/Verify/Verify";
import FavouritesScreen from "../pages/WishList/FavouritesScreen";

// Import your screens

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ title: "Detail" }} />
        <Stack.Screen name="Products" component={Products} options={{ title: "Danh sách sản phẩm" }} />
        <Stack.Screen name="Home" component={Home} options={{ title: "Trang chủ" }} />
        <Stack.Screen name="NewPassword" component={NewPassword} options={{ title: "Mật khẩu mới" }} />
        <Stack.Screen name="Profile" component={Profile} options={{ title: "Thông tin cá nhân" }} />
        <Stack.Screen name="Order" component={OrderHistory} options={{ title: "Lịch sử mua hàng" }} />
        <Stack.Screen name="Tracking" component={Tracking} options={{ title: "Track order" }} />
        <Stack.Screen name="Favorites" component={FavouritesScreen} options={{ title: "Danh sách yêu thích" }} />
        <Stack.Screen name="Verify" component={Verify} options={{ title: "Xác nhận mã" }} />
        <Stack.Screen name="Login" component={Login} options={{ title: "Đăng nhập" }} />
        <Stack.Screen name="Register" component={Register} options={{ title: "Đăng ký" }} />
        <Stack.Screen name="Cart" component={Cart} options={{ title: "Giỏ hàng" }} />
        <Stack.Screen name="Checkout" component={Checkout} options={{ title: "Checkout" }} />
        <Stack.Screen name="Address" component={Address} options={{ title: "Address" }} />
        <Stack.Screen name="Shipping" component={Shipping} options={{ title: "Shipping" }} />
        <Stack.Screen name="Payment" component={Payment} options={{ title: "Payment" }} />
        <Stack.Screen name="Addcard" component={Addcard} options={{ title: "AddCard" }} />
        <Stack.Screen name="Ordersuccess" component={OrderSuccess} options={{ title: "OrderSuccess" }} />
        <Stack.Screen name="Contact" component={Contact} options={{ title: "Liên hệ" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
