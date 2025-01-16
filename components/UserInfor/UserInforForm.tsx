import React, { Component } from "react";
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
import { Platform } from "react-native";
import { userRegister } from "../../interface/user";
import { Colors } from "../../assets/color/color";

interface UserInforProps {
  isRegister: boolean;
  onSubmit: (data: any) => void;
  userData?: userRegister;
  buttonLabel: string;
}

interface UserInforState {
  showPassword: boolean;
  email: string;
  password: string;
  confirmPassword: string;
  errors: any;
  provinces: any[];
  districts: any[];
  wards: any[];
  province: string;
  district: string;
  ward: string;
  address: string;
  name: string;
  phone: string;
  date: Date;
  show: boolean;
}

class UserInfor extends Component<UserInforProps, UserInforState> {
  constructor(props: UserInforProps) {
    super(props);
    this.state = {
      showPassword: false,
      email: props.userData?.email || "",
      password: props.userData?.password || "",
      confirmPassword: "",
      errors: {},
      provinces: [],
      districts: [],
      wards: [],
      province: "",
      district: "",
      ward: "",
      address: props.userData?.address || "",
      name: props.userData?.name || "",
      phone: props.userData?.phone || "",
      date: new Date(),
      show: false,
    };
  }

  componentDidMount() {
    this.fetchProvinces();
  }

  fetchProvinces = async () => {
    try {
      const response = await fetch("https://provinces.open-api.vn/api/?depth=3");
      const data = await response.json();
      this.setState({ provinces: data });
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  handleProvinceChange = (itemValue: string) => {
    this.setState({ province: itemValue, district: "", ward: "" }, this.updateDistricts);
  };

  updateDistricts = () => {
    const { province, provinces } = this.state;
    const selectedProvince = provinces.find((p: any) => p.name === province);
    if (selectedProvince) {
      this.setState({ districts: selectedProvince.districts });
    }
  };

  handleDistrictChange = (itemValue: string) => {
    this.setState({ district: itemValue }, this.updateWards);
  };

  updateWards = () => {
    const { district, districts } = this.state;
    const selectedDistrict = districts.find((d: any) => d.name === district);
    if (selectedDistrict) {
      this.setState({ wards: selectedDistrict.wards });
    }
  };

  onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({ show: Platform.OS === "ios", date: currentDate });
  };

  showDatepicker = () => {
    this.setState({ show: !this.state.show });
  };

  validate = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const phoneRegex = /^(?:\+84|0)(\d{9})$/;

    this.setState({ errors: {} });

    const validations = [
      { condition: !this.state.name, message: "Hãy nhập tên của bạn", field: "name" },
      { condition: !this.state.phone, message: "Hãy nhập số điện thoại", field: "phone" },
      { condition: this.state.phone && !phoneRegex.test(this.state.phone), message: "Số điện thoại không hợp lệ", field: "phone" },
      { condition: !this.state.email, message: "Hãy nhập email của bạn", field: "email" },
      { condition: this.state.email && !emailRegex.test(this.state.email), message: "Email không hợp lệ", field: "email" },
      { condition: !this.state.password, message: "Hãy nhập mật khẩu của bạn", field: "password" },
      { condition: this.state.password && !passwordRegex.test(this.state.password), message: "Mật khẩu không hợp lệ", field: "password" },
      { condition: this.props.isRegister && !this.state.confirmPassword, message: "Hãy nhập lại mật khẩu của bạn", field: "rePass" },
      { condition: this.props.isRegister && this.state.password !== this.state.confirmPassword, message: "Mật khẩu không khớp", field: "rePass" },
      { condition: !this.state.province, message: "Hãy chọn tỉnh của bạn", field: "province" },
      { condition: !this.state.district, message: "Hãy chọn quận/huyện của bạn", field: "district" },
      { condition: !this.state.ward, message: "Hãy chọn phường/xã của bạn", field: "ward" },
    ];

    for (const { condition, message, field } of validations) {
      if (condition) {
        this.setState((prevState) => ({
          errors: { ...prevState.errors, [field]: message },
        }));
        isValid = false;
        break;
      }
      this.setState({
        address: `${this.state.province}, ${this.state.district}, ${this.state.ward}`,
      });
    }

    return isValid;
  };

  handleSubmit = () => {
    if (this.validate()) {
      const data: userRegister = {
        email: this.state.email,
        name: this.state.name,
        address: this.state.address,
        password: this.state.password,
        birthdate: this.state.date + "",
        phone: this.state.phone,
      };
      this.props.onSubmit(data);
    }
  };

  render() {
    const { provinces, districts, wards, errors } = this.state;

    return (
        <VStack space={3} mt="5">
          {/* Name Field */}
          <FormControl isRequired isInvalid={"name" in errors}>
            <FormControl.Label>Tên người dùng</FormControl.Label>
            <Input
                variant="rounded"
                value={this.state.name}
                onChangeText={(text) => this.setState({ name: text })}
                w={{ base: "100%", md: "25%" }}
                InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />}
                keyboardType="default"
            />
            {"name" in errors ? <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage> : null}
          </FormControl>

          {/* Phone Field */}
          <FormControl isRequired isInvalid={"phone" in errors}>
            <FormControl.Label>Số điện thoại</FormControl.Label>
            <Input
                variant="rounded"
                value={this.state.phone}
                onChangeText={(text) => this.setState({ phone: text })}
                w={{ base: "100%", md: "25%" }}
                InputLeftElement={<Icon as={<MaterialIcons name="phone" />} size={5} ml="2" color="muted.400" />}
                keyboardType="phone-pad"
            />
            {"phone" in errors ? <FormControl.ErrorMessage>{errors.phone}</FormControl.ErrorMessage> : null}
          </FormControl>

          {/* Email Field */}
          <FormControl isRequired isInvalid={"email" in errors}>
            <FormControl.Label>Email</FormControl.Label>
            <Input
                variant="rounded"
                value={this.state.email}
                onChangeText={(text) => this.setState({ email: text })}
                w={{ base: "100%", md: "25%" }}
                InputLeftElement={<Icon as={<MaterialIcons name="email" />} size={5} ml="2" color="muted.400" />}
                keyboardType="email-address"
            />
            {"email" in errors ? <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage> : null}
          </FormControl>

          {/* Password Field */}
          <FormControl isRequired isInvalid={"password" in errors}>
            <FormControl.Label>Mật khẩu</FormControl.Label>
            <Input
                variant="rounded"
                InputLeftElement={<Icon as={<MaterialIcons name="password" />} size={5} ml="2" color="muted.400" />}
                value={this.state.password}
                onChangeText={(text) => this.setState({ password: text })}
                w={{ base: "100%", md: "25%" }}
                type={this.state.showPassword ? "text" : "password"}
                InputRightElement={
                  <Pressable onPress={() => this.setState({ showPassword: !this.state.showPassword })}>
                    <Icon as={<MaterialIcons name={this.state.showPassword ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                  </Pressable>
                }
                placeholder=""
            />
            {"password" in errors ? <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage> : null}
          </FormControl>

          {/*tỉnh*/}
          <FormControl isRequired isInvalid={"province" in errors}>
            <FormControl.Label>Tỉnh</FormControl.Label>
            <Select
                variant="rounded"
                selectedValue={this.state.province}
                minWidth="200"
                placeholder="Chọn tỉnh"
                _selectedItem={{ bg: "teal.600", endIcon: <CheckIcon size="5" /> }}
                mt={1}
                onValueChange={this.handleProvinceChange}
            >
              {provinces.map((item: any) => (
                  <Select.Item key={item.code} label={item.name} value={item.name} />
              ))}
            </Select>
            {"province" in errors ? <FormControl.ErrorMessage>{errors.province}</FormControl.ErrorMessage> : null}
          </FormControl>

          {/*Huyện*/}
          <FormControl isRequired isInvalid={"district" in errors}>
            <FormControl.Label>Quận/huyện</FormControl.Label>
            <Select
                variant="rounded"
                selectedValue={this.state.district}
                minWidth="200"
                placeholder="Chọn quận/huyện"
                _selectedItem={{ bg: "teal.600", endIcon: <CheckIcon size="5" /> }}
                mt={1}
                onValueChange={this.handleDistrictChange}
            >
              {districts.map((item: any) => (
                  <Select.Item key={item.code} label={item.name} value={item.name} />
              ))}
            </Select>
            {"district" in errors ? <FormControl.ErrorMessage>{errors.district}</FormControl.ErrorMessage> : null}
          </FormControl>

          {/*xã*/}
          <FormControl isRequired isInvalid={"ward" in errors}>
            <FormControl.Label>Phường/xã</FormControl.Label>
            <Select
                variant="rounded"
                selectedValue={this.state.ward}
                minWidth="200"
                placeholder="Chọn phường/xã"
                _selectedItem={{ bg: "teal.600", endIcon: <CheckIcon size="5" /> }}
                mt={1}
                onValueChange={(itemValue: string) => this.setState({ ward: itemValue })}
            >
              {wards.map((item: any) => (
                  <Select.Item key={item.code} label={item.name} value={item.name} />
              ))}
            </Select>
            {"ward" in errors ? <FormControl.ErrorMessage>{errors.ward}</FormControl.ErrorMessage> : null}
          </FormControl>

          {/* Submit Button */}
          <Button
              marginTop={5}
              style={{ borderRadius: 20, padding: 12, backgroundColor: Colors.primary }}
              mt="2"
              colorScheme="indigo"
              onPress={this.handleSubmit}
          >
            {this.props.buttonLabel}
          </Button>
        </VStack>
    );
  }
}

export default UserInfor;
