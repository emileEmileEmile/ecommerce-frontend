import api from './api';
import type { LoginInput, RegisterInput, AuthResponse } from '../types/auth';

export const login = async (data: LoginInput): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', data);
  return response.data;
};

export const register = async (data: RegisterInput): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register',data);
  return response.data;
};