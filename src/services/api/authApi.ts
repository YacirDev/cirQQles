import apiClient, { mockDelay } from './apiClient';
import {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
  PasswordResetRequest,
  PasswordResetResponse,
  LogoutResponse,
} from '../../types/api';

// Mock data
const mockUsers = [
  { id: '1', email: 'user@example.com', name: 'John Doe', password: 'password' },
];

let userIdCounter = 2;

// Login
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  await mockDelay();

  // Mock validation
  const user = mockUsers.find(u => u.email === data.email && u.password === data.password);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const token = `mock-jwt-token-${user.id}`;
  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    token,
  };
};

// Sign Up
export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  await mockDelay();

  // Check if user exists
  const existingUser = mockUsers.find(u => u.email === data.email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Create new user
  const newUser = {
    id: userIdCounter.toString(),
    email: data.email,
    name: data.name,
    password: data.password,
  };
  mockUsers.push(newUser);
  userIdCounter++;

  const token = `mock-jwt-token-${newUser.id}`;
  return {
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    },
    token,
  };
};

// Password Reset
export const resetPassword = async (data: PasswordResetRequest): Promise<PasswordResetResponse> => {
  await mockDelay();

  // Mock check if email exists
  const user = mockUsers.find(u => u.email === data.email);
  if (!user) {
    throw new Error('Email not found');
  }

  return {
    message: 'Password reset email sent successfully',
  };
};

// Logout
export const logout = async (): Promise<LogoutResponse> => {
  await mockDelay();

  return {
    message: 'Logged out successfully',
  };
};