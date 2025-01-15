import React, { useState } from "react";
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
    const [addresses, setAddresses] = useState([
        { id: "1", label: "Home", address: "1901 Thornridge Cir, Shiloh, Hawaii 81063" },
        { id: "2", label: "Office", address: "4517 Washington Ave, Manchester, Kentucky 39495" },
        { id: "3", label: "Parent's House", address: "8502 Preston Rd, Inglewood, Maine 98380" },
        { id: "4", label: "Friend's House", address: "2464 Royal Ln, Mesa, New Jersey 45463" },
    ]);

    const [selectedAddress, setSelectedAddress] = useState(route.params.currentAddress);
    const [newAddressLabel, setNewAddressLabel] = useState("Nhà riêng");
    const [newAddress, setNewAddress] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [isAddingNew, setIsAddingNew] = useState(false);

    const navigation = useNavigation();

    const handleApply = () => {
        route.params.updateAddress(selectedAddress);
        navigation.goBack();
    };

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
            Alert.alert("Address Added", "Your new address has been added successfully.");
        } else {
            Alert.alert("Error", "Please fill in all address fields.");
        }
    };

    const resetFormFields = () => {
        setNewAddress("");
        setSelectedProvince("");
        setSelectedDistrict("");
        setSelectedWard("");
        setIsAddingNew(false);
    };

    const renderItem = ({ item }) => (
        <View style={styles.addressContainer}>
            <TouchableOpacity
                style={styles.radioContainer}
                onPress={() => setSelectedAddress(item.address)}
            >
                <Icon
                    name={selectedAddress === item.address ? "radio-button-checked" : "radio-button-unchecked"}
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
            <Text style={styles.header}>Shipping Address</Text>
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
                        <Picker.Item label="Hà Nội" value="Hà Nội" />
                        <Picker.Item label="Hồ Chí Minh" value="Hồ Chí Minh" />
                    </Picker>

                    <Picker
                        selectedValue={selectedDistrict}
                        onValueChange={(itemValue) => setSelectedDistrict(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select District" value="" />
                        <Picker.Item label="Ba Đình" value="Ba Đình" />
                        <Picker.Item label="Tây Hồ" value="Tây Hồ" />
                    </Picker>

                    <Picker
                        selectedValue={selectedWard}
                        onValueChange={(itemValue) => setSelectedWard(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select Ward" value="" />
                        <Picker.Item label="Phúc Xá" value="Phúc Xá" />
                        <Picker.Item label="Nguyễn Trung Trực" value="Nguyễn Trung Trực" />
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
        backgroundColor: "#fff",
        padding: 16,
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
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
