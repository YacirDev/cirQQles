import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuth} from '../store/AuthContext';
import {AuthStackParamList, RootStackParamList} from '../types/navigation';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import PasswordResetScreen from '../screens/Auth/PasswordResetScreen';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import TabNavigator from './TabNavigator';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{headerShown: false}}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    <AuthStack.Screen name="PasswordReset" component={PasswordResetScreen} />
  </AuthStack.Navigator>
);

const AppNavigator = () => {
  const {user, isLoading, onboardingCompleted, completeOnboarding} = useAuth();

  // Show loading state while checking auth and onboarding status
  if (isLoading || onboardingCompleted === null) {
    return null; // You could add a loading screen here
  }

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {!onboardingCompleted ? (
        <RootStack.Screen name="Onboarding">
          {() => <OnboardingScreen onComplete={completeOnboarding} />}
        </RootStack.Screen>
      ) : !user ? (
        <RootStack.Screen name="AuthStack" component={AuthNavigator} />
      ) : (
        <RootStack.Screen name="MainTabs" component={TabNavigator} />
      )}
    </RootStack.Navigator>
  );
};

export default AppNavigator;