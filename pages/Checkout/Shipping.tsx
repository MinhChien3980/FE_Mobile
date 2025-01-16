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

const Shipping = () => {
  const route = useRoute();
  const [shippingMethods, setShippingMethods] = useState([
    { id: "1", label: "Economy", method: "Economy" },
    { id: "2", label: "Regular", method: "Regular" },
    { id: "3", label: "Cargo", method: "Cargo" },
    { id: "4", label: "Friend's House", method: "Friend's House" },
  ]);

  const [selectedShipping, setSelectedShipping] = useState(
    route.params.currentShipping
  );
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newShippingMethod, setNewShippingMethod] = useState("");
  const [shippingCost, setShippingCost] = useState("");

  const navigation = useNavigation();

  const handleApply = () => {
    if (!selectedShipping) {
      Alert.alert(
        "Chưa chọn phương thức vận chuyển",
        "Vui lòng chọn phương thức vận chuyển."
      );
      return;
    }
    route.params.updateShipping(selectedShipping);
    navigation.goBack();
  };

  const handleAddNewShipping = () => {
    if (newShippingMethod && shippingCost) {
      const newId = (shippingMethods.length + 1).toString();
      const newShippingItem = {
        id: newId,
        label: newShippingMethod,
        method: newShippingMethod,
      };
      setShippingMethods((prevMethods) => [...prevMethods, newShippingItem]);
      setShippingCost("");
      setNewShippingMethod("");
      setIsAddingNew(false);
      Alert.alert(
        "Shipping Method Added",
        "Your new shipping method has been added successfully."
      );
    } else {
      Alert.alert("Error", "Please fill in all fields.");
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.shippingContainer}>
      <TouchableOpacity
        style={styles.radioContainer}
        onPress={() => setSelectedShipping(item.method)}
      >
        <Icon
          name={
            selectedShipping === item.method
              ? "radio-button-checked"
              : "radio-button-unchecked"
          }
          size={24}
          color="#6b4226"
        />
      </TouchableOpacity>
      <View style={styles.shippingDetails}>
        <Text style={styles.shippingLabel}>{item.label}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Choose Shipping Method</Text>
      <FlatList
        data={shippingMethods}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {isAddingNew && (
        <View style={styles.newShippingForm}>
          <TextInput
            style={styles.input}
            placeholder="Enter shipping method"
            value={newShippingMethod}
            onChangeText={setNewShippingMethod}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter shipping cost"
            keyboardType="numeric"
            value={shippingCost}
            onChangeText={setShippingCost}
          />
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
  shippingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  radioContainer: {
    marginRight: 12,
  },
  shippingDetails: {
    flex: 1,
  },
  shippingLabel: {
    fontSize: 16,
    fontWeight: "bold",
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
  newShippingForm: {
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

export default Shipping;
