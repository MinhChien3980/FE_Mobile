import { Colors } from "@/assets/color/color";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Button,
  Box,
  Center,
  FormControl,
  Heading,
  Input,
  VStack,
  Icon,
  Pressable,
} from "native-base";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app";
import { useState } from "react";
interface UserForm {
  password: string;
  confirmPassword: string;
  setErrors: (errors: Record<string, string>) => void;
}

const NewPassword: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleChangePassword = () => {
    setErrors({});
    if (!password) {
      setErrors((prevError: any) => ({
        ...prevError,
        password: "Hãy nhập mật khẩu của bạn",
      }));
      return;
    }
    if (!confirmPassword) {
      setErrors((prevError: any) => ({
        ...prevError,
        confirmPassword: "Hãy nhập lại mật khẩu của bạn",
      }));
      return;
    }
    if (confirmPassword !== password) {
      setErrors((prevError: any) => ({
        ...prevError,
        confirmPassword: "Mật khẩu không khớp",
      }));
      return;
    }
    {
      ("Thay đổi password");
    }
    navigation.navigate("Products");
  };
  return (
    <Center w="100%">
      <Box safeArea mt="10%" p="2" py="8" w="90%">
        <Center>
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Nhập mật khẩu mới
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
            Mật khẩu mới của bạn phải khác với mật khẩu cũ!
          </Heading>
        </Center>

        <VStack space={3} mt="5">
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
          </FormControl>
          <FormControl isRequired isInvalid={"confirmPassword" in errors}>
            <FormControl.Label>Nhập lại khẩu</FormControl.Label>
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
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              w={{
                base: "100%",
                md: "25%",
              }}
              type={showConfirmPassword ? "text" : "password"}
              InputRightElement={
                <Pressable
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Icon
                    as={
                      <MaterialIcons
                        name={
                          showConfirmPassword ? "visibility" : "visibility-off"
                        }
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
            {"confirmPassword" in errors ? (
              <FormControl.ErrorMessage>
                {errors.confirmPassword}
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>
          <Button
            borderRadius="full"
            onPress={handleChangePassword}
            mt="2"
            style={{ backgroundColor: Colors.primary }}
          >
            Thay đổi mật khẩu
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};
export default NewPassword;
