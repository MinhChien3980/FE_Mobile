import { UserForm } from "@/interface/user";

export const validateUserForm = ({
  name,
  email,
  phone,
  password,
  confirmPassword,
  province,
  district,
  ward,
  setErrors,
}: UserForm): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  const phoneRegex = /^(?:\+84|0)(\d{9})$/;

  let isValid = true;
  setErrors({}); // Reset errors

  // Tiến hành kiểm tra các trường hợp và lưu thông tin lỗi vào `setErrors`
  const validations = [
    { condition: !name, message: "Hãy nhập tên của bạn", field: "name" },
    { condition: !phone, message: "Hãy nhập số điện thoại", field: "phone" },
    {
      condition: phone && !phoneRegex.test(phone),
      message: "Số điện thoại không hợp lệ",
      field: "phone",
    },
    { condition: !email, message: "Hãy nhập email của bạn", field: "email" },
    {
      condition: email && !emailRegex.test(email),
      message: "Email không hợp lệ",
      field: "email",
    },
    {
      condition: !password,
      message: "Hãy nhập mật khẩu của bạn",
      field: "password",
    },
    {
      condition: password && !passwordRegex.test(password),
      message:
        "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ in hoa, chữ in thường và số",
      field: "password",
    },
    {
      condition: !confirmPassword,
      message: "Hãy nhập lại mật khẩu của bạn",
      field: "rePass",
    },
    {
      condition: password !== confirmPassword,
      message: "Mật khẩu không khớp",
      field: "rePass",
    },
    {
      condition: !province,
      message: "Hãy chọn tỉnh của bạn",
      field: "province",
    },
    {
      condition: !district,
      message: "Hãy chọn quận/huyện của bạn",
      field: "district",
    },
    { condition: !ward, message: "Hãy chọn phường/xã của bạn", field: "ward" },
  ];

  // Lưu trữ các lỗi
  const errorMessages: Record<string, string> = {};

  // Kiểm tra từng validation và cập nhật lỗi
  for (const validation of validations) {
    const { condition, message, field } = validation;
    if (condition) {
      errorMessages[field] = message;
      isValid = false;
      break; // Dừng lại khi có lỗi đầu tiên
    }
  }

  // Gọi setErrors để cập nhật trạng thái lỗi
  setErrors(errorMessages);

  return isValid; // Trả về trạng thái hợp lệ của form
};
