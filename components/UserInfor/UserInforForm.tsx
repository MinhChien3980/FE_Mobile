import {
  Button,
  FormControl,
  Icon,
  Input,
  Pressable,
  VStack,
  Text,
  Select,
  CheckIcon,
  WarningOutlineIcon,
  ScrollView,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Platform } from "react-native";
import { userData, userRegister } from "@/interface/user";
import DateTimePicker from "@react-native-community/datetimepicker";
interface UserInforProps {
  isRegister: boolean;
  onSubmit: (data: any) => void;
  userData?: userRegister;
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
  //Error
  const [errors, setErrors] = useState<any>({});
  // Address
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [address, setAddress] = useState(userData?.address || "");
  //BirthDate
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  //Name
  const [name, setName] = useState(userData?.name || "");
  //Phone
  const [phone, setPhone] = useState(userData?.phone || "");
  //Thay đổi
  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    if (selectedDate) {
      // setDateString(selectedDate.toISOString);
      setDate(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShow(!show);
  };
  //Validation thông tin người dùng/ tài khoản
  const validate = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const phoneRegex = /^(?:\+84|0)(\d{9})$/;

    setErrors({});

    const validations = [
      {
        condition: !name,
        message: "Hãy nhập tên của bạn",
        field: "name",
      },
      {
        condition: !phone,
        message: "Hãy nhập số điện thoại",
        field: "phone",
      },
      {
        condition: phone && !phoneRegex.test(phone),
        message: "Số điện thoại không hợp lệ",
        field: "phone",
      },
      {
        condition: !email,
        message: "Hãy nhập email của bạn",
        field: "email",
      },
      {
        condition: email && !emailRegex.test(email),
        message: "Email không hợp lệ",
        field: "email",
      },
      {
        condition: !password,
        message: "Hãy nhập mật khẩu của bạn",
        field: "password",
      },
      {
        condition: password && !passwordRegex.test(password),
        message:
          "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ in hoa, chữ in thường và số",
        field: "password",
      },
      {
        condition: isRegister && !rePass,
        message: "Hãy nhập lại mật khẩu của bạn",
        field: "rePass",
      },
      {
        condition: isRegister && password !== rePass,
        message: "Mật khẩu không khớp",
        field: "rePass",
      },
      {
        condition: !province,
        message: "Hãy chọn tỉnh của bạn",
        field: "province",
      },
      {
        condition: !district,
        message: "Hãy chọn quận/huyện của bạn",
        field: "district",
      },
      {
        condition: !ward,
        message: "Hãy chọn phường/xã của bạn",
        field: "ward",
      },
    ];

    for (const { condition, message, field } of validations) {
      if (condition) {
        setErrors((prevError: any) => ({ ...prevError, [field]: message }));
        isValid = false;
        break;
      }
      setAddress(province + ", " + district + ", " + ward);
    }
    console.log(address);

    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      const data: userRegister = {
        email: email,
        name: name,
        address: address,
        password: password,
        birthdate: date + "",
        phone: phone,
      };

      onSubmit(data);
    }
  };

  return (
    <VStack space={3} mt="5">
      <FormControl isRequired isInvalid={"name" in errors}>
        <FormControl.Label>Tên người dùng</FormControl.Label>
        <Input
          variant="rounded"
          value={name}
          onChangeText={setName}
          w={{
            base: "100%",
            md: "25%",
          }}
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="person" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          keyboardType="default"
        />
        {"name" in errors ? (
          <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
        ) : null}
      </FormControl>
      <FormControl isRequired isInvalid={"phone" in errors}>
        <FormControl.Label>Số điện thoại</FormControl.Label>
        <Input
          variant="rounded"
          value={phone}
          onChangeText={setPhone}
          w={{
            base: "100%",
            md: "25%",
          }}
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="phone" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          keyboardType="phone-pad"
        />
        {"phone" in errors ? (
          <FormControl.ErrorMessage>{errors.phone}</FormControl.ErrorMessage>
        ) : null}
      </FormControl>
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
          <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>
        ) : null}
      </FormControl>
      <FormControl isRequired isInvalid={"password" in errors}>
        <FormControl.Label>Mật khẩu</FormControl.Label>
        <Input
          variant="rounded"
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
            variant="rounded"
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
      <FormControl isRequired isInvalid={"birthdate" in errors}>
        <FormControl.Label>Ngày sinh</FormControl.Label>
        <Input
          variant="rounded"
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="calendar-month" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          onPress={showDatepicker}
          value={date + ""}
          onChangeText={setRePass}
        />
        {"birthdate" in errors ? (
          <FormControl.ErrorMessage>
            {errors.birthdate}
          </FormControl.ErrorMessage>
        ) : null}
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
        {"birthdate" in errors ? (
          <FormControl.ErrorMessage>
            {errors.birthdate}
          </FormControl.ErrorMessage>
        ) : null}
      </FormControl>
      {/* //Chọn tỉnh */}
      <FormControl isRequired isInvalid={"province" in errors}>
        <FormControl.Label>Tỉnh</FormControl.Label>
        <Select
          variant="rounded"
          selectedValue={province}
          minWidth="200"
          // accessibilityLabel="Choose Service"
          placeholder="Chọn tỉnh"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(itemValue) => setProvince(itemValue)}
        >
          <Select.Item label="UX Research" value="ux" />
          <Select.Item label="Web Development" value="web" />
          <Select.Item label="Cross Platform Development" value="cross" />
          <Select.Item label="UI Designing" value="ui" />
          <Select.Item label="Backend Development" value="backend" />
        </Select>
        {"province" in errors ? (
          <FormControl.ErrorMessage>{errors.province}</FormControl.ErrorMessage>
        ) : null}
      </FormControl>
      {/* //Chọn quận/huyện */}
      <FormControl isRequired isInvalid={"district" in errors}>
        <FormControl.Label>Quận/huyện</FormControl.Label>
        <Select
          variant="rounded"
          selectedValue={district}
          minWidth="200"
          // accessibilityLabel="Choose Service"
          placeholder="Chọn quận/huyện"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(itemValue) => setDistrict(itemValue)}
        >
          <Select.Item label="UX Research" value="ux" />
          <Select.Item label="Web Development" value="web" />
          <Select.Item label="Cross Platform Development" value="cross" />
          <Select.Item label="UI Designing" value="ui" />
          <Select.Item label="Backend Development" value="backend" />
        </Select>
        {"district" in errors ? (
          <FormControl.ErrorMessage>{errors.district}</FormControl.ErrorMessage>
        ) : null}
      </FormControl>
      {/* //Chọn phường/xã */}
      <FormControl isRequired isInvalid={"ward" in errors}>
        <FormControl.Label>Phường/xã</FormControl.Label>
        <Select
          variant="rounded"
          selectedValue={ward}
          minWidth="200"
          // accessibilityLabel="Choose Service"
          placeholder="Chọn phường/xã"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(itemValue) => setWard(itemValue)}
        >
          <Select.Item label="UX Research" value="ux" />
          <Select.Item label="Web Development" value="web" />
          <Select.Item label="Cross Platform Development" value="cross" />
          <Select.Item label="UI Designing" value="ui" />
          <Select.Item label="Backend Development" value="backend" />
        </Select>
        {"ward" in errors ? (
          <FormControl.ErrorMessage>{errors.ward}</FormControl.ErrorMessage>
        ) : null}
      </FormControl>

      <Button
        marginTop={5}
        style={{
          borderRadius: 20,
          padding: 12,
          backgroundColor: "#704F38",
        }}
        mt="2"
        colorScheme="indigo"
        onPress={handleSubmit}
      >
        {buttonLabel}
      </Button>
    </VStack>
  );
};

export default UserInfor;
