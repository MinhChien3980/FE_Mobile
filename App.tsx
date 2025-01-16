import React from "react";
import { NativeBaseProvider } from "native-base";
import AppNavigator from "./router/Navigator";
import BottomTabNavigator from "./components/Navigator/NavigatorBottom";
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
      {/* <AppNavigator /> */}
      <BottomTabNavigator />
    </NativeBaseProvider>
  );
};

export default App;
