import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider } from "native-base";

import Products from "./pages/ProductList/Products";
import NewPassword from "./pages/NewPassword/NewPassword";
import Profile from "./pages/Profile/Profile";
import OrderHistory from "./pages/Order/OrderHistory";
import Tracking from "./pages/tracking/Tracking";
import FavouritesScreen from "./pages/WishList/FavouritesScreen";
import Verify from "./pages/Verify/Verify";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail/ProductDetail";

import Cart from "./pages/Cart/Cart";
import checkout from "./pages/Checkout/Checkout";
import address from "./pages/Checkout/Address";
import shipping from "./pages/Checkout/Shipping";
import payment from "./pages/Checkout/Payment";
import addcard from "./pages/Checkout/Addcard";
import orderSuccess from "./pages/Checkout/OrderSuccess";
import Contact from "./pages/Contact/Contact";

const Stack = createStackNavigator();

// Định nghĩa kiểu dữ liệu cho navigation
export type RootStackParamList = {
  ProductList: undefined;
  Favorites: undefined;
  Register: undefined;
  Login: undefined;
  Verify: undefined;
  Home: undefined;
  Products: undefined;
  Profile: undefined;
  Order: undefined;
  Tracking: undefined;
  NewPassword: undefined;
  ProductDetail: undefined;
};

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Contact">
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetail}
            options={{ title: "Detail" }}
          />
          <Stack.Screen
            name="Products"
            component={Products}
            options={{ title: "Danh sách sản phẩm" }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: "Trang chu" }}
          />
          <Stack.Screen
            name="NewPassword"
            component={NewPassword}
            options={{ title: "Mật khẩu mới" }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ title: "Thông tin cá nhân" }}
          />
          <Stack.Screen
            name="Order"
            component={OrderHistory}
            options={{ title: "Lịch sử mua hàng" }}
          />
          <Stack.Screen
            name="Tracking"
            component={Tracking}
            options={{ title: "Track order" }}
          />
          <Stack.Screen
            name="Favorites"
            component={FavouritesScreen}
            options={{ title: "Danh sách yêu thích" }}
          />
          <Stack.Screen
            name="Verify"
            component={Verify}
            options={{ title: "Xác nhận mã" }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Đăng nhập" }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ title: "Đăng ký" }}
          />

          <Stack.Screen
              name="Cart"
              component={Cart}
              options={{ title: "Giỏ hàng" }}
          />
          <Stack.Screen
              name="Checkout"
              component={checkout}
              options={{ title: "Checkout" }}
          />
          <Stack.Screen
              name="Address"
              component={address}
              options={{ title: "Address" }}
          />
          <Stack.Screen
              name="Shipping"
              component={shipping}
              options={{ title: "Shipping" }}
          />
          <Stack.Screen
              name="Payment"
              component={payment}
              options={{ title: "Payment" }}
          />
          <Stack.Screen
              name="Addcard"
              component={addcard}
              options={{ title: "AddCard" }}
          />
          <Stack.Screen
              name="Ordersuccess"
              component={orderSuccess}
              options={{ title: "OrderSuccess" }}
          />

          <Stack.Screen name="Contact" component={Contact} options={{title: "Liên hệ"}}/>

        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
