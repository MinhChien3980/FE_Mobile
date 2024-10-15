import React, { createContext, useContext, useState, ReactNode } from "react";

// NavigationContext sẽ bao gồm :
// Màn hình hiện tại
// Hàm navigate truyền vào tên màn hình để chuyển đến dó
// Hàm goBack để trở về màn hình trước đó (Tương tự như Stack trong java: cái nào vào trước sẽ lấy ra sau cùng)
interface NavigationContextType {
  currentScreen: string;
  navigate: (screen: string) => void;
  goBack: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Set màn hình mặc định khi vừa mở app
  const [screenStack, setScreenStack] = useState<string[]>(["Login"]);
  // Khi gọi hàm sẽ thêm màn hình vào trong stack
  const navigate = (screen: string) => {
    setScreenStack((prevStack) => [...prevStack, screen]);
  };

  const goBack = () => {
    // Xóa màn hình hiện tại và quay về màn hình trước đó
    setScreenStack((prevStack) => prevStack.slice(0, -1));
  };

  const currentScreen = screenStack[screenStack.length - 1];

  return (
    <NavigationContext.Provider value={{ currentScreen, navigate, goBack }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error(
      "useNavigation phải được sử dụng bên trong NavigationProvider"
    );
  }
  return context;
};
