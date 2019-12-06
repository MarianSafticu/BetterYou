export interface User {
  username: string;
  profileName: string;
  email: string;
  password: string;
  birthDate: Date;
  isVerified?: boolean;
  token: string;
}
