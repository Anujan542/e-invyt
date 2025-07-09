import axiosInstance from '@/utils/axios';
import type { SignupInput, LoginInput, ForgotPasswordInput, ResetPasswordInput } from './auth.types';

export const signup = (data: SignupInput) => axiosInstance.post('/auth/signup', data);

export const login = (data: LoginInput) => axiosInstance.post('/auth/login', data);

export const verifyEmail = (code: string) => axiosInstance.post('/auth/verify-email', { code });

export const checkAuth = () => axiosInstance.get('/auth/check-auth');

export const logout = () => axiosInstance.post('/auth/logout');

export const forgotPassword = (data: ForgotPasswordInput) =>
  axiosInstance.post('/auth/forgot-password', data);

export const resetPassword = ({
  data,
  token,
}: {
  data: ResetPasswordInput;
  token: string;
}) => axiosInstance.post(`/auth/reset-password/${token}`, data);