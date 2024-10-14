import {
  Button,
  FormControl,
  Icon,
  Input,
  Pressable,
  VStack,
  Text,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

interface UserInforProps {
  isRegister: boolean;
  onSubmit: (data: any) => void;
  userData?: { email?: string; password?: string };
  buttonLabel: string;
}
// Component này có thể dùng ở trang đăng kí và trang account/profile(dùng để thay đổi thông tin người dùng)
const UserInfor = ({
  isRegister,
  onSubmit,
  userData,
  buttonLabel,
}: UserInforProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(userData?.email || "");
  const [password, setPassword] = useState(userData?.password || "");
  const [rePass, setRePass] = useState("");
  const [errors, setErrors] = useState<any>({});

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

    // Kiểm tra khi đăng kí thì mới cần nhập lại mật khẩu
    if (isRegister && !rePass) {
      setErrors((prevError: any) => ({
        ...prevError,
        rePass: "Hãy nhập lại mật khẩu của bạn",
      }));
      isValid = false;
    } else if (isRegister && password !== rePass) {
      setErrors((prevError: any) => ({
        ...prevError,
        rePass: "Mật khẩu không khớp",
      }));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      const data = { email, password };
      onSubmit(data);
    }
  };

  return (
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
          <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>
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
          <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage>
        ) : null}
      </FormControl>

      {isRegister && (
        <FormControl isRequired isInvalid={"rePass" in errors}>
          <FormControl.Label>Nhập lại mật khẩu</FormControl.Label>
          <Input
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="password" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            type="password"
            value={rePass}
            onChangeText={setRePass}
          />
          {"rePass" in errors ? (
            <FormControl.ErrorMessage>{errors.rePass}</FormControl.ErrorMessage>
          ) : null}
        </FormControl>
      )}

      <Button mt="2" colorScheme="indigo" onPress={handleSubmit}>
        {buttonLabel}
      </Button>
    </VStack>
  );
};

export default UserInfor;
