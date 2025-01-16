import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  Image,
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
  Modal,
  View,
  useToast,
} from "native-base";
import React, { useState } from "react";
import { Alert, Pressable, StyleSheet } from "react-native";
import useShowToast from "../../components/Toast/Toast";
import { userLogin } from "../../interface/user";
import { getMyInfo, getUserToken } from "../../api/UserApiService";
import { Colors } from "../../assets/color/color";
import * as SecureStore from "expo-secure-store";
import { post } from "../../api/ApiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../components/Navigator/Auth";
import { RootStackParamList } from "../../components/Navigator/NavigatorBottom";
export default function Login() {
  const showToast = useShowToast();

  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { setIsLoggedIn } = useAuth();
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
      return;
    } else if (!emailRegex.test(email)) {
      setErrors((prevError: any) => ({
        ...prevError,
        email: "Email không hợp lệ",
      }));
      isValid = false;
      return;
    }

    // Kiểm tra mật khẩu
    if (!password) {
      setErrors((prevError: any) => ({
        ...prevError,
        password: "Hãy nhập mật khẩu của bạn",
      }));
      isValid = false;
      return;
    }
    // else if (!passwordRegex.test(password)) {
    //   setErrors((prevError: any) => ({
    //     ...prevError,
    //     password:
    //       "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ in hoa, chữ in thường và số",
    //   }));
    //   isValid = false;
    //   return;
    // }

    return isValid;
  };
  const handleLogin = () => {
    //Kiểm tra dữ liệu nhập vào có hợp lệ không
    if (validate()) {
      login();
    }
  };
  const login = async () => {
    // navigation.navigate("Home");
    const loginData: userLogin = { email, password };

    console.log("🚀 ~ login ~ loginData:", loginData);
    try {
      const response = await getUserToken(loginData);
      if (response.status === 200) {
        // console.log("🚀 ~ login ~ response:", response);
        const data = response.data.data;
        // console.log("🚀 ~ login ~ response:", response);
        const token = data.token;
        console.log("🚀 ~ login ~ token:", token);

        if (token) {
          processToken(token);

          showToast({
            type: "success",
            message: "Đăng nhập thành công",
          });
          navigation.reset({
            index: 0,
            routes: [{ name: "TabNavigator" }], // Đặt Login là màn hình đầu tiên
          });
          // navigation.navigate("TabNavigator");
        }
      }
    } catch (error: any) {
      // Kiểm tra nếu lỗi là từ response
      // const errorMessage =
      //   error.response?.data?.message || error.message || "Lỗi kết nối";
      // showToast({
      //   type: "error",
      //   message: errorMessage,
      // });
      // Alert.alert("Thất bại", errorMessage);
      // console.log(error);

      setIsLoggedIn(true);
    }
  };
  const processToken = async (token: any) => {
    console.log("🚀 ~ processToken ~ token:", token);
    await SecureStore.setItemAsync("userToken", token);
    const response = await getMyInfo();

    if (response.status === 200) {
      const data = response.data.data;

      AsyncStorage.setItem("fName", "fName" + data.id);
      const name = await AsyncStorage.getItem("fName");
      console.log("🚀 ~ processToken ~ data", name);
    }
  };
  const handleResetPassword = () => {
    navigation.navigate("Verify");
    // if (validate()) {
    //   console.log("Gửi mail: " + email);
    // }
  };

  return (
    <Center mt="20%" w="100%">
      <Box safeArea p="2" py="8" w="100%" maxW="290">
        <Center mb="3">
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
        </Center>

        <VStack space={3} mt="5">
          <FormControl isRequired isInvalid={"email" in errors}>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              variant="rounded"
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
              variant="rounded"
              style={{ borderRadius: 20 }}
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
                color: "amber.900",
              }}
              alignSelf="flex-end"
              mt="1"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              Quên mật khẩu?
            </Link>
          </FormControl>
          <Button
            mt="2"
            colorScheme="indigo"
            onPress={() => handleLogin()}
            style={{
              borderRadius: 20,
              padding: 12,
              backgroundColor: Colors.primary,
            }}
          >
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
                color: "amber.900",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              onPress={() => navigation.navigate("Register")}
            >
              Đăng kí ngay
            </Link>
          </HStack>
        </VStack>
      </Box>
      <View></View>
      {/* <Link
        _text={{
          color: "red.500",
          fontWeight: "medium",
          fontSize: "sm",
        }}
        onPress={() => navigation.goBack}
      >
        Quay về trang trước đó
      </Link> */}
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        avoidKeyboard
        justifyContent="flex-end"
        bottom="4"
        size="lg"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Quên mật khẩu?</Modal.Header>
          <Modal.Body>
            Nhập email để thay đổi mật khẩu của bạn
            <FormControl mt="3">
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
          </Modal.Body>
          <Modal.Footer>
            <Button flex="1" onPress={() => handleResetPassword()}>
              Lấy lại mật khẩu
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
}
