import React from "react";
import { View } from "react-native";
import { useNavigation } from "./NavigationContext";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";

export const Navigator: React.FC = () => {
  const { currentScreen } = useNavigation();

  return (
    <View>
      {/* Set các màn hình ở đây để tiện cho chuyển màn hình */}
      {currentScreen === "Login" && <Login />}
      {currentScreen === "Register" && <Register />}
    </View>
  );
};
