import React from "react";
import { View } from "react-native";
import { useNavigation } from "./NavigationContext";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Login/Login";

export const Navigator: React.FC = () => {
  const { currentScreen } = useNavigation();

  return (
    <View>
      {currentScreen === "Login" && <Login />}
      {currentScreen === "Register" && <Register />}
    </View>
  );
};
