import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductListScreen from "../pages/WishList/ProductListScreen";
import FavoritesScreen from "../pages/WishList/FavoritesScreen";
import { NativeBaseProvider } from "native-base";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import Verify from "@/pages/Verify/Verify";
import EmailForm from "@/pages/Contact/EmailForm";
import ProductList from "@/components/Product/ProductList/ProductList";
import Products from "@/pages/ProductList/Products";
import Tracking from "@/pages/tracking/Tracking";
import OrderHistory from "@/pages/Order/OrderHistory";
import Profile from "@/pages/Profile/Profile";
import NewPassword from "@/pages/NewPassword/NewPassword";

const Stack = createStackNavigator();

// Định nghĩa kiểu dữ liệu cho navigation
export type RootStackParamList = {
  ProductList: undefined;
  Favorites: undefined;
  Register: undefined;
  Login: undefined;
  Verify: undefined;

  Products: undefined;
  Profile: undefined;
  Order: undefined;
  Tracking: undefined;
  NewPassword: undefined;
};

const App = () => {
  return (
    <NativeBaseProvider>
      <Stack.Navigator initialRouteName="Products">
        <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{title: "Trang chủ"}}
                />
        <Stack.Screen
          name="Products"
          component={Products}
          options={{ title: "Danh sách sản phẩm" }}
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
          name="ProductListScreen"
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
          options={{ title: "Đăng ký" }}
        />
        <Stack.Screen
          name="Contact"
          component={EmailForm}
          options={{ title: "Liên hệ" }}
        />
      </Stack.Navigator>
    </NativeBaseProvider>
  );

};

export default App;
