export interface User {
  _id: string;
  email: string;
  name: string;
  isVerified: boolean;
  lastLogin?: string;
}