import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import axios from "axios"; // Nhập axios để gửi yêu cầu HTTP
import style from "../../../style";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    // Kiểm tra xem tất cả các trường đã được điền chưa
    if (!name || !email || !phone || !message) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    // Gửi email đến server
    axios
      .post("http://localhost:5000/send-email", {
        to: email, // Địa chỉ email nhận
        subject: `Contact Form Submission from ${name}`, // Chủ đề email
        text: `Name: ${name}\nPhone: ${phone}\nMessage: ${message}`, // Nội dung email
      })
      .then((response) => {
        Alert.alert("Success", "Your message has been sent!");
        clearForm(); // Xóa nội dung các trường nhập liệu
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to send your message.");
        console.error(error);
      });
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Contact Us</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Send Message</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: style.primaryColor,
  },
  input: {
    height: 50,
    borderColor: style.primaryColor,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: style.primaryColor,
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#e4dfdf",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Contact;
