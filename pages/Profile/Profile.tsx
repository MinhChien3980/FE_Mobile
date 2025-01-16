import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { RootStackParamList } from "../../App";

const ProfileCompletionScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [name, setName] = useState<string>("John Doe");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [gender, setGender] = useState<string>("Select");
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  // Lỗi required
  const [nameError, setNameError] = useState<boolean>(false);
  const [phoneNumberError, setPhoneNumberError] = useState<boolean>(false);
  const [genderError, setGenderError] = useState<boolean>(false);
  const [addressError, setAddressError] = useState<boolean>(false);

  // State cho API địa chỉ
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  const [province, setProvince] = useState<string>("Select");
  const [district, setDistrict] = useState<string>("Select");
  const [ward, setWard] = useState<string>("Select");

  useEffect(() => {
    (async () => {
      const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();

    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await fetch("https://provinces.open-api.vn/api/?depth=3");
      const data = await response.json();
      setProvinces(data);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  useEffect(() => {
    if (province !== "Select") {
      const selectedProvince = provinces.find(
          (prov) => prov.code === Number(province)
      );
      setDistricts(selectedProvince?.districts || []);
      setDistrict("Select");
      setWard("Select");
    }
  }, [province]);

  useEffect(() => {
    if (district !== "Select") {
      const selectedDistrict = districts.find(
          (dist) => dist.code === Number(district)
      );
      setWards(selectedDistrict?.wards || []);
      setWard("Select");
    }
  }, [district]);

  const handleCompleteProfile = () => {
    let hasError = false;

    if (!name.trim()) {
      setNameError(true);
      hasError = true;
    } else {
      setNameError(false);
    }

    if (!phoneNumber.trim()) {
      setPhoneNumberError(true);
      hasError = true;
    } else {
      setPhoneNumberError(false);
    }

    if (gender === "Select") {
      setGenderError(true);
      hasError = true;
    } else {
      setGenderError(false);
    }

    if (province === "Select" || district === "Select" || ward === "Select") {
      setAddressError(true);
      hasError = true;
    } else {
      setAddressError(false);
    }

    if (!hasError) {
      console.log("Profile Completed");
    }
  };

  const handleChangeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0].uri) {
      setAvatarUrl(result.assets[0].uri);
    }
  };

  return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton}>
          <Text onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Text>
        </TouchableOpacity>

        <Text style={styles.title}>Complete Your Profile</Text>

        <View style={styles.avatarContainer}>
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          <TouchableOpacity style={styles.editIconContainer}>
            <Text onPress={handleChangeAvatar}>
              <Ionicons name="pencil" size={16} color="white" />
            </Text>
          </TouchableOpacity>
        </View>

        <Text>Tên</Text>
        <TextInput
            style={[styles.input, nameError && styles.errorInput]}
            placeholder="Name"
            value={name}
            onChangeText={setName}
        />
        {nameError && <Text style={styles.errorText}>* Thông tin này là bắt buộc</Text>}

        <Text>Số điện thoại</Text>
        <TextInput
            style={[styles.input, phoneNumberError && styles.errorInput]}
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="numeric"
        />
        {phoneNumberError && <Text style={styles.errorText}>* Thông tin này là bắt buộc</Text>}

        <Text>Giới tính</Text>
        <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.picker}
        >
          <Picker.Item label="Chọn" value="Select" />
          <Picker.Item label="Nam" value="Male" />
          <Picker.Item label="Nữ" value="Female" />
          <Picker.Item label="Khác" value="Other" />
        </Picker>
        {genderError && <Text style={styles.errorText}>* Thông tin này là bắt buộc</Text>}

        <Text style={styles.address}>Tỉnh/Thành phố</Text>
        <Picker
            selectedValue={province}
            onValueChange={(itemValue) => setProvince(itemValue)}
            style={styles.picker}
        >
          <Picker.Item label="Chọn Tỉnh/Thành phố" value="Select" />
          {provinces.map((prov) => (
              <Picker.Item
                  key={prov.code}
                  label={prov.name}
                  value={String(prov.code)}
              />
          ))}
        </Picker>

        <Text style={styles.address}>Quận/Huyện</Text>
        <Picker
            selectedValue={district}
            onValueChange={(itemValue) => setDistrict(itemValue)}
            style={styles.picker}
            enabled={province !== "Select"}
        >
          <Picker.Item label="Chọn Quận/Huyện" value="Select" />
          {districts.map((dist) => (
              <Picker.Item
                  key={dist.code}
                  label={dist.name}
                  value={String(dist.code)}
              />
          ))}
        </Picker>

        <Text style = {styles.address} >Phường/Xã</Text>
        <Picker
            selectedValue={ward}
            onValueChange={(itemValue) => setWard(itemValue)}
            style={styles.picker}
            enabled={district !== "Select"}
        >
          <Picker.Item label="Chọn Phường/Xã" value="Select" />
          {wards.map((w) => (
              <Picker.Item key={w.code} label={w.name} value={String(w.code)} />
          ))}
        </Picker>
        {addressError && <Text style={styles.errorText}>* Thông tin địa chỉ là bắt buộc</Text>}

        <TouchableOpacity
            style={styles.completeButton}
            onPress={handleCompleteProfile}
        >
          <Text style={styles.completeButtonText}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  avatarContainer: {
    alignSelf: "center",
    marginBottom: 24,
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e0e0e0",
  },
  editIconContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#8B4513",
    borderRadius: 20,
    padding: 5,
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 2,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  picker: {
    height: 45,
    width: "100%",
  },
  completeButton: {
    backgroundColor: "#8B4513",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10
  },
  completeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -12,
    marginBottom: 16,
  },
  errorInput: {
    borderColor: "red",
  },
  address: {
    marginTop: 10
  }
});

export default ProfileCompletionScreen;
