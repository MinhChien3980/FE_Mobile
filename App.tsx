import React from "react";
import { NativeBaseProvider } from "native-base";
import AppNavigator from "./components/Navigator/NavigatorBottom";
export type RootStackParamList = {
  Home: undefined;
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
  ProductDetail: undefined;
  TabNavigator: undefined;
  Cart: undefined;
};
const App = () => {
  return (
    <NativeBaseProvider>
      <AppNavigator />
    </NativeBaseProvider>
  );
};

export default App;
