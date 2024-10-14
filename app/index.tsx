import React from "react";
import { NativeBaseProvider, Text, Box } from "native-base";
import Login from "@/pages/Login/Login";
import { NavigationProvider } from "@/router/NavigationContext";
import { Navigator } from "@/router/Navigator";
import { SafeAreaView } from "react-native";

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Navigator />
        </SafeAreaView>
      </NavigationProvider>
    </NativeBaseProvider>
  );
}
