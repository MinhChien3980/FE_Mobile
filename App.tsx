import React from "react";
import { NativeBaseProvider } from "native-base";
import AppNavigator from "./router/Navigator";
import BottomTabNavigator from "./components/Navigator/NavigatorBottom";

const App = () => {
  return (
    <NativeBaseProvider>
      {/* <AppNavigator /> */}
      <BottomTabNavigator/>
    </NativeBaseProvider>
  );
};

export default App;
