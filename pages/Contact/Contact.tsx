import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import emailjs from 'emailjs-com';
import style from "../../assets/styles/style";

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility
    const [modalMessage, setModalMessage] = useState(''); // State for the message to show in the modal

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = () => {
        let hasError = false;
        const newErrors = {
            name: '',
            email: '',
            message: '',
        };

        if (!name.trim()) {
            newErrors.name = 'Tên là trường bắt buộc.';
            hasError = true;
        }

        if (!email.trim()) {
            newErrors.email = 'Email là trường bắt buộc.';
            hasError = true;
        } else if (!isValidEmail(email)) {
            newErrors.email = 'Định dạng email không hợp lệ.';
            hasError = true;
        }

        if (!message.trim()) {
            newErrors.message = 'Lời nhắn là trường bắt buộc.';
            hasError = true;
        }

        setErrors(newErrors);

        if (hasError) return;

        const templateParams = {
            name: name,
            email: email,
            message: message,
        };

        // Gửi email qua Gmail sử dụng EmailJS
        emailjs
            .send('service_cf3fddc', 'template_nnz7cip', templateParams, 'KMfc-hJNwRIW-lvJa')
            .then(
                (result) => {
                    setResponse('Gửi liên hệ thành công!');
                    setModalMessage('Gửi liên hệ thành công. Vui lòng chờ phản hồi!');
                    setModalVisible(true); // Show modal on success
                },
                (error) => {
                    setResponse('Lỗi khi gửi email: ' + error.text);
                    setModalMessage('Có lỗi xảy ra khi gửi email: ' + error.text);
                    setModalVisible(true); // Show modal on error
                }
            );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Liên hệ với chúng tôi</Text>
            <Text style={styles.label}>Tên <Text style={styles.required}>*</Text></Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Tên"
            />
            {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

            <Text style={styles.label}>Email <Text style={styles.required}>*</Text></Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

            <Text style={styles.label}>Lời nhắn <Text style={styles.required}>*</Text></Text>
            <View style={styles.messageContainer}>
                <View style={styles.messageArrow} />
                <TextInput
                    style={styles.messageInput}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Lời nhắn của bạn..."
                    multiline
                    numberOfLines={5}
                />
            </View>
            {errors.message ? <Text style={styles.errorText}>{errors.message}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Gửi</Text>
            </TouchableOpacity>
            <Text>{response}</Text>

            {/* Modal for success or error message */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalMessage}>{modalMessage}</Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: style.primaryColor,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    required: {
        color: 'red',
    },
    input: {
        height: 50,
        borderColor: style.primaryColor,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    messageContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    messageArrow: {
        position: 'absolute',
        top: -10,
        left: 20,
        width: 0,
        height: 0,
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: style.primaryColor,
    },
    messageInput: {
        height: 150,
        borderColor: style.primaryColor,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlignVertical: 'top',
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: style.primaryColor,
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#e4dfdf',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },

    // Modal Styles
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background color with transparency
    },
    modalContent: {
        width: '70%', // Reduced the width further for smaller horizontal size
        height: '15%', // Reduced height for smaller modal
        backgroundColor: '#fff', // White background
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        borderColor: '#6B4F4F', // Brown border for the modal
        borderWidth: 3, // Increased border width
    },
    modalMessage: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#6B4F4F', // Brown text color
        textAlign: 'center',
        marginBottom: 10,
    },
    modalButton: {
        backgroundColor: '#4dea41', // Green button
        padding: 8,
        borderRadius: 5,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default ContactForm;
