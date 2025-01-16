import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Address = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [addresses, setAddresses] = useState([
    {
      id: "1",
      label: "Home",
      address: "1901 Thornridge Cir, Shiloh, Hawaii 81063",
    },
    {
      id: "2",
      label: "Office",
      address: "4517 Washington Ave, Manchester, Kentucky 39495",
    },
    {
      id: "3",
      label: "Parent's House",
      address: "8502 Preston Rd, Inglewood, Maine 98380",
    },
    {
      id: "4",
      label: "Friend's House",
      address: "2464 Royal Ln, Mesa, New Jersey 45463",
    },
  ]);

  const [selectedAddress, setSelectedAddress] = useState(
    route.params?.currentAddress
  );
  const [newAddressLabel, setNewAddressLabel] = useState("Nhà riêng");
  const [newAddress, setNewAddress] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  interface Province {
    code: number;
    name: string;
    districts: {
      code: number;
      name: string;
      wards: { code: number; name: string }[];
    }[];
  }

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<
    { code: number; name: string; wards: { code: number; name: string }[] }[]
  >([]);
  const [wards, setWards] = useState<{ code: number; name: string }[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Fetch provinces from the API
  const fetchProvinces = async () => {
    try {
      const response = await fetch(
        "https://provinces.open-api.vn/api/?depth=3"
      );
      const data = await response.json();
      setProvinces(data);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  // Update districts when the province changes
  useEffect(() => {
    if (selectedProvince !== "") {
      const selectedProvinceData = provinces.find(
        (prov) => prov.code === Number(selectedProvince)
      );
      setDistricts(selectedProvinceData?.districts || []);
      setSelectedDistrict(""); // Reset district when province changes
      setSelectedWard(""); // Reset ward when district changes
    }
  }, [selectedProvince, provinces]);

  // Update wards when the district changes
  useEffect(() => {
    if (selectedDistrict !== "") {
      const selectedDistrictData = districts.find(
        (dist) => dist.code === Number(selectedDistrict)
      );
      setWards(selectedDistrictData?.wards || []);
      setSelectedWard(""); // Reset ward when district changes
    }
  }, [selectedDistrict, districts]);

  // Fetch provinces on component mount
  useEffect(() => {
    fetchProvinces();
  }, []);

  // Handle Apply for updating the address
  const handleApply = () => {
    route.params?.updateAddress(selectedAddress);
    navigation.goBack();
  };

  // Handle adding a new address
  const handleAddNewAddress = () => {
    if (newAddress && selectedProvince && selectedDistrict && selectedWard) {
      const newId = (addresses.length + 1).toString();
      const newAddressItem = {
        id: newId,
        label: newAddressLabel,
        address: `${newAddress}, ${selectedWard}, ${selectedDistrict}, ${selectedProvince}`,
      };
      setAddresses((prevAddresses) => [...prevAddresses, newAddressItem]);
      resetFormFields();
      Alert.alert(
        "Address Added",
        "Your new address has been added successfully."
      );
    } else {
      Alert.alert("Error", "Please fill in all address fields.");
    }
  };

  // Reset form fields after adding a new address
  const resetFormFields = () => {
    setNewAddress("");
    setSelectedProvince("");
    setSelectedDistrict("");
    setSelectedWard("");
    setIsAddingNew(false);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.addressContainer}>
      <TouchableOpacity
        style={styles.radioContainer}
        onPress={() => setSelectedAddress(item.address)}
      >
        <Icon
          name={
            selectedAddress === item.address
              ? "radio-button-checked"
              : "radio-button-unchecked"
          }
          size={24}
          color="#6b4226"
        />
      </TouchableOpacity>
      <View style={styles.addressDetails}>
        <Text style={styles.addressLabel}>{item.label}</Text>
        <Text style={styles.addressText}>{item.address}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>{"< Address List"}</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Shipping Address</Text>
      </View>

      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsAddingNew(true)}
      >
        <Text style={styles.addButtonText}>Add New Address</Text>
      </TouchableOpacity>

      {isAddingNew && (
        <View style={styles.newAddressForm}>
          <Picker
            selectedValue={newAddressLabel}
            onValueChange={(itemValue) => setNewAddressLabel(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Nhà riêng" value="Nhà riêng" />
            <Picker.Item label="Công ty" value="Công ty" />
            <Picker.Item label="Địa chỉ khác" value="Địa chỉ khác" />
          </Picker>

          <TextInput
            style={styles.input}
            placeholder="Enter address"
            value={newAddress}
            onChangeText={setNewAddress}
          />

          <Picker
            selectedValue={selectedProvince}
            onValueChange={(itemValue) => setSelectedProvince(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Province" value="" />
            {provinces.map((province) => (
              <Picker.Item
                key={province.code}
                label={province.name}
                value={province.code}
              />
            ))}
          </Picker>

          <Picker
            selectedValue={selectedDistrict}
            onValueChange={(itemValue) => setSelectedDistrict(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select District" value="" />
            {districts.map((district) => (
              <Picker.Item
                key={district.code}
                label={district.name}
                value={district.code}
              />
            ))}
          </Picker>

          <Picker
            selectedValue={selectedWard}
            onValueChange={(itemValue) => setSelectedWard(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Ward" value="" />
            {wards.map((ward) => (
              <Picker.Item
                key={ward.code}
                label={ward.name}
                value={ward.code}
              />
            ))}
          </Picker>

          <TouchableOpacity
            style={styles.applyButton}
            onPress={handleAddNewAddress}
          >
            <Text style={styles.applyButtonText}>Add Address</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: "#007BFF",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  radioContainer: {
    marginRight: 12,
  },
  addressDetails: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: "#555",
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 8,
  },
  addButton: {
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#6b4226",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  addButtonText: {
    fontSize: 16,
    color: "#6b4226",
    fontWeight: "bold",
  },
  newAddressForm: {
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 12,
  },
  applyButton: {
    backgroundColor: "#6b4226",
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  applyButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Address;
