import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView} from 'react-native';
import sendEmailFunction from './sendEmail';
import style from '../../style';

const EmailForm = () => {
    const [fromEmail, setFromEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSendEmail = async () => {
        if (!fromEmail || !subject || !message) {
            Alert.alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        const success = await sendEmailFunction(fromEmail, subject, message);

        if (success) {
            Alert.alert("Thành công", "Email đã được gửi!");
            setFromEmail('');
            setSubject('');
            setMessage('');
        } else {
            Alert.alert("Thất bại", "Không thể gửi email. Vui lòng thử lại sau.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Contact Us</Text>

            <TextInput
                placeholder="Email của bạn"
                value={fromEmail}
                onChangeText={setFromEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Tiêu đề"
                value={subject}
                onChangeText={setSubject}
                style={styles.input}
            />
            <TextInput
                placeholder="Nội dung"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
                style={[styles.input, {height: 100}]}
            />

            <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
                <Text style={styles.buttonText}>Gửi Email</Text>
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
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: style.primaryColor,
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
});

export default EmailForm;
