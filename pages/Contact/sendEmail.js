import axios from 'axios';
import {CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN} from '@env';

// Hàm gửi email
const sendEmailFunction = async (from, subject, message) => {
    try {
        // Kiểm tra thông tin đầu vào
        if (!from || !subject || !message) {
            throw new Error("Thông tin đầu vào không hợp lệ.");
        }

        // Lấy access token từ refresh token
        const {data: {access_token}} = await axios.post(
            'https://oauth2.googleapis.com/token',
            new URLSearchParams({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                refresh_token: REFRESH_TOKEN,
                grant_type: 'refresh_token'
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        // Tạo nội dung email theo định dạng RFC 2822
        const email = [
            `From: "${from}" <your-email@gmail.com>`,
            `To: your-email@gmail.com`,  // Email của bạn để nhận email
            `Reply-To: ${from}`, // Đặt "Reply-To" là email người gửi
            `Subject: ${subject}`,
            '',
            `Liên hệ từ: ${from}`,  // Bao gồm email người gửi trong nội dung email
            `Nội dung:${message}`,

        ].join('\n');

        // Mã hóa email thành base64
        const encodedEmail = btoa(unescape(encodeURIComponent(email)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

        // Gửi email qua API Gmail
        const res = await axios.post(
            'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
            {raw: encodedEmail},
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('Email đã được gửi!', res.data);
        return true; // Trả về true nếu gửi thành công
    } catch (error) {
        console.error('Lỗi khi gửi email:', error.response?.data || error.message);
        return false; // Trả về false nếu gửi không thành công
    }
};

export default sendEmailFunction;
