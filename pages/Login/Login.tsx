import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Icon,
  Input,
  Link,
  Stack,
  VStack,
  Text,
  WarningOutlineIcon,
} from "native-base";
import React, { useState } from "react";
import { Alert } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = React.useState({});

  const login = async () => {
    if (!email || !password) {
      Alert.alert("Lỗi đăng nhập", "Hãy điền đầy đủ thông tin đăng nhập!");
      return; // Thêm return để dừng thực hiện nếu thiếu thông tin
    }

    try {
      const response = await fetch("https://your-api-url.com/loginApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        // Nếu phản hồi không thành công, ném ra lỗi
        const errorData = await response.json();
        throw new Error(errorData.message || "Vui lòng thử lại");
      }

      const data = await response.json();
      Alert.alert("Chào mừng", "Đăng nhập thành công!");
      // Bạn có thể lưu token vào AsyncStorage nếu cần
    } catch (error: any) {
      Alert.alert("Thất bại", error.message || "Lỗi kết nối");
    }
  };

  return (
    <Center mt="50%" w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Chào mừng
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Hãy đăng nhập để tiếp tục
        </Heading>

        <VStack space={3} mt="5">
          <FormControl isRequired isInvalid={"name" in errors}>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              value={email}
              keyboardType="email-address"
              onChangeText={(emailInput) => setEmail(emailInput)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Mật khẩu</FormControl.Label>
            <Input
              type="password"
              value={password}
              onChangeText={(passwordInput) => setPassword(passwordInput)}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Try different from previous passwords.
            </FormControl.ErrorMessage>

            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Quên mật khẩu?
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={login}>
            Đăng nhập
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              Chưa có tài khoản?{" "}
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              href="#"
            >
              Đăng kí ngay
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}
