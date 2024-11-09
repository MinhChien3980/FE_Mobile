export interface userData {
  id: string;
  name: string;
  address: string;
  email: string;
}
export interface userLogin {
  email: string;
  password: string;
}
export interface userRegister {
  name: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  birthdate: string;
}
export interface UserForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  province: string;
  district: string;
  ward: string;
  setErrors: (errors: Record<string, string>) => void;
  setAddress: (address: string) => void;
}
