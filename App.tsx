import React from "react";
import { NativeBaseProvider } from "native-base";
import AppNavigator from "./components/Navigator/NavigatorBottom";

const App = () => {
  return (
    <NativeBaseProvider>
      <AppNavigator />
    </NativeBaseProvider>
  );
};

export default App;
