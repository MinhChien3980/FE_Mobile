import React from "react";
import { NativeBaseProvider, Text, Box } from "native-base";
import Login from "@/pages/Login/Login";

export default function App() {
  return (
    <NativeBaseProvider>
      <Login></Login>
    </NativeBaseProvider>
  );
}
