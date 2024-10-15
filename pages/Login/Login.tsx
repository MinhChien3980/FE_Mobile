import { useNavigation } from "@/router/NavigationContext";
import { MaterialIcons } from "@expo/vector-icons";
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
import { Alert, Pressable } from "react-native";

export default function Login() {
  const { navigate, goBack } = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = React.useState({});
  const handleNavigate = () => {
    navigate("Register");
    console.log("Bấm nút");
  };
  const validate = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    // Reset errors trước khi kiểm tra
    setErrors({});

    // Kiểm tra email
    if (!email) {
      setErrors((prevError: any) => ({
        ...prevError,
        email: "Hãy nhập email của bạn",
      }));
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setErrors((prevError: any) => ({
        ...prevError,
        email: "Email không hợp lệ",
      }));
      isValid = false;
    }

    // Kiểm tra mật khẩu
    if (!password) {
      setErrors((prevError: any) => ({
        ...prevError,
        password: "Hãy nhập mật khẩu của bạn",
      }));
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      setErrors((prevError: any) => ({
        ...prevError,
        password:
          "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ in hoa, chữ in thường và số",
      }));
      isValid = false;
    }

    return isValid;
  };
  const handleLogin = async () => {
    //Kiểm tra dữ liệu nhập vào có hợp lệ không
    if (validate()) {
      try {
        const response = await fetch("đăng nhập", {
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
          const errorData = await response.json();
          throw new Error(errorData.message || "Vui lòng thử lại");
        }

        const data = await response.json();
        Alert.alert("Chào mừng", "Đăng nhập thành công!");
      } catch (error: any) {
        Alert.alert("Thất bại", error.message || "Lỗi kết nối");
      }
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
          <FormControl isRequired isInvalid={"email" in errors}>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              value={email}
              onChangeText={setEmail}
              w={{
                base: "100%",
                md: "25%",
              }}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="email" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              keyboardType="email-address"
            />
            {"email" in errors ? (
              <FormControl.ErrorMessage>
                {errors.email}
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>
          <FormControl isRequired isInvalid={"password" in errors}>
            <FormControl.Label>Mật khẩu</FormControl.Label>
            <Input
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="password" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              value={password}
              onChangeText={setPassword}
              w={{
                base: "100%",
                md: "25%",
              }}
              type={showPassword ? "text" : "password"}
              InputRightElement={
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={showPassword ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
              placeholder=""
            />
            {"password" in errors ? (
              <FormControl.ErrorMessage>
                {errors.password}
              </FormControl.ErrorMessage>
            ) : null}
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
          <Button mt="2" colorScheme="indigo" onPress={handleLogin}>
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
              onPress={() => handleNavigate()}
            >
              Đăng kí ngay
            </Link>
          </HStack>
        </VStack>
      </Box>
      <Link
        _text={{
          color: "red.500",
          fontWeight: "medium",
          fontSize: "sm",
        }}
        onPress={goBack}
      >
        Quay về trang trước đó
      </Link>
    </Center>
  );
}
