import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider } from "native-base";

import Products from "./pages/ProductList/Products";
import NewPassword from "./pages/NewPassword/NewPassword";
import Profile from "./pages/Profile/Profile";
import OrderHistory from "./pages/Order/OrderHistory";
import Tracking from "./pages/tracking/Tracking";
import FavoritesScreen from "./pages/WishList/FavoritesScreen";
import Verify from "./pages/Verify/Verify";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail/ProductDetail";

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
        <Stack.Navigator initialRouteName="Home">
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
            component={FavoritesScreen}
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
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
