import React, { useState } from "react";
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
import { RootStackParamList } from "@/app";
import { launchImageLibrary, ImageLibraryOptions, Asset } from "react-native-image-picker"; 

interface FakeProfileData {
  name: string;
  phoneNumber: string;
  gender: string;
  avatarUrl: string;
  countryCode: string;
}

const fakeProfileData: FakeProfileData = {
  name: "John Doe",
  phoneNumber: "",
  gender: "Select",
  avatarUrl: "../../assets/images/proFake_2.jpeg",
  countryCode: "+1",
};

const ProfileCompletionScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [name, setName] = useState<string>(fakeProfileData.name);
  const [phoneNumber, setPhoneNumber] = useState<string>(
    fakeProfileData.phoneNumber
  );
  const [gender, setGender] = useState<string>(fakeProfileData.gender);
  const [countryCode, setCountryCode] = useState<string>(
    fakeProfileData.countryCode
  );
  const [avatarUrl, setAvatarUrl] = useState<string>(fakeProfileData.avatarUrl);

  // set up lỗi required
  const [nameError, setNameError] = useState<boolean>(false);
  const [phoneNumberError, setPhoneNumberError] = useState<boolean>(false);
  const [genderError, setGenderError] = useState<boolean>(false);

  const handleCompleteProfile = () => {
    let hasError = false;

    // Kiểm tra từng trường xem có bỏ trống không
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

    if (!hasError) {
      console.log("Profile Completed");
    }
  };

  const handleChangeAvatar = () => {
    const options : ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorMessage) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else if (response.assets) {
        const source = response.assets[0].uri; // Accessing uri directly without type assertion
        setAvatarUrl(source || ""); // Update avatar URL with the selected image
      }
    });
  };

  const countryCodes = Array.from({ length: 99 }, (_, i) => `+${i + 1}`);

  const handleBack = () => {
    let hasError = false;
    if (!hasError) {
      console.log("Profile Completed");
    }
    console.log("quay lại trang trước");
    navigation.navigate("Tracking");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text onPress={() => handleBack()}>
          <Ionicons name="arrow-back" size={24} color="black"/>
        </Text>
      </TouchableOpacity>

      <Text style={styles.title}>Complete Your Profile</Text>
      <Text style={styles.subtitle}>
        Don't worry, only you can see your personal data. No one else will be
        able to see it.
      </Text>

      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: avatarUrl }}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.editIconContainer}>
          <Text onPress={handleChangeAvatar}>
            <Ionicons name="pencil" size={16} color="white" />
          </Text>
        </TouchableOpacity>
      </View>

      <Text>Tên</Text>
      <View style={styles.form}>
        <TextInput
          style={[styles.input, nameError && styles.errorInput]}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </View>
      {nameError && (
        <Text style={styles.errorText}>* Thông tin này là bắt buộc</Text>
      )}

      <Text>Số điện thoại</Text>
      <View
        style={[
          styles.phoneInputContainer,
          phoneNumberError && styles.errorInput,
        ]}
      >
        <View style={styles.countryPickerContainer}>
          <Picker
            selectedValue={countryCode}
            onValueChange={(itemValue) => setCountryCode(itemValue)}
            style={styles.countryPicker}
          >
            {countryCodes.map((code) => (
              <Picker.Item key={code} label={code} value={code} />
            ))}
          </Picker>
        </View>
        <TextInput
          style={styles.phoneInput}
          placeholder="Enter Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>
      {phoneNumberError && (
        <Text style={styles.errorText}>* Thông tin này là bắt buộc</Text>
      )}

      <Text>Giới tính</Text>
      <View style={[styles.pickerContainer, genderError && styles.errorInput]}>
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
      </View>
      {genderError && (
        <Text style={[styles.errorText, styles.lastError]}>* Thông tin này là bắt buộc</Text>
      )}

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
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 24,
    paddingHorizontal: 16,
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
    backgroundColor: "#8B4513", // Màu nâu cho icon
    borderRadius: 20,
    padding: 5,
  },
  form: {
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  countryCode: {
    marginRight: 8,
    fontSize: 16,
    color: "#666",
  },
  countryPickerContainer: {
    flex: 0.2,
  },
  countryPicker: {
    height: 35,
    width: "80%",
  },
  phoneInput: {
    flex: 0.7,
    fontSize: 16,
    height: 35,
  },
  pickerContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 16,
  },
  picker: {
    height: 45,
    width: "100%",
  },
  completeButton: {
    backgroundColor: "#8B4513", // Màu nâu cho nút hoàn thành
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
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
  lastError: {
    marginBottom: 24,
  }
});

export default ProfileCompletionScreen;
