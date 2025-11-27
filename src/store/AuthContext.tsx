import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthState, User, LoginRequest, SignUpRequest} from '../types/auth';
import {login as apiLogin, signUp as apiSignUp, resetPassword as apiResetPassword} from '../services/api/authApi';

interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>;
  signUp: (data: SignUpRequest) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  onboardingCompleted: boolean | null;
  completeOnboarding: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
  });
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean | null>(null);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userString = await AsyncStorage.getItem('user');
      const onboardingStatus = await AsyncStorage.getItem('onboardingCompleted');
      
      setOnboardingCompleted(onboardingStatus === 'true');
      
      if (token && userString) {
        const user = JSON.parse(userString);
        setAuthState({user, token, isLoading: false});
      } else {
        setAuthState({...authState, isLoading: false});
      }
    } catch (error) {
      setAuthState({...authState, isLoading: false});
      setOnboardingCompleted(false);
    }
  };

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await apiLogin(credentials);
      await AsyncStorage.setItem('token', response.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.user));
      setAuthState({user: response.user, token: response.token, isLoading: false});
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (data: SignUpRequest) => {
    try {
      const response = await apiSignUp(data);
      await AsyncStorage.setItem('token', response.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.user));
      setAuthState({user: response.user, token: response.token, isLoading: false});
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    // Don't remove onboarding status on logout
    setAuthState({user: null, token: null, isLoading: false});
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('onboardingCompleted', 'true');
      setOnboardingCompleted(true);
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await apiResetPassword({ email });
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{...authState, login, signUp, logout, resetPassword, onboardingCompleted, completeOnboarding}}>
      {children}
    </AuthContext.Provider>
  );
};