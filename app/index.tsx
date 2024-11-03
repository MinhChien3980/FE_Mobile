import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductListScreen from "../pages/WishList/ProductListScreen";
import FavoritesScreen from "../pages/WishList/FavoritesScreen";
import { NativeBaseProvider } from "native-base";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import Verify from "@/pages/Verify";
import Tracking from "@/pages/tracking/Tracking";
import OrderHistory from "@/pages/Order/OrderHistory";
import Profile from "@/pages/Profile/Profile";

const Stack = createStackNavigator();

// Định nghĩa kiểu dữ liệu cho navigation
export type RootStackParamList = {
  ProductList: undefined;
  Favorites: undefined;
  Register: undefined;
  Login: undefined;
  Verify: undefined;
  Profile: undefined;
  Order: undefined;
  Tracking: undefined;
};

const App = () => {
  return (
    <NativeBaseProvider>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen
          name="Order"
          component={OrderHistory}
          options={{ title: "lịch sử mua hàng" }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: "thông tin cá nhân" }}
        />
        <Stack.Screen
          name="Tracking"
          component={Tracking}
          options={{ title: "track order" }}
        />
        <Stack.Screen
          name="FavorProductListScreenites"
          component={ProductListScreen}
          options={{ title: "Danh sách sản phẩm" }}
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
          options={{ title: "Đăng kí" }}
        />
      </Stack.Navigator>
    </NativeBaseProvider>
  );
};

export default App;
