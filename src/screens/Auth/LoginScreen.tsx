import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LoginRequest} from '../../types/auth';
import {AuthStackParamList} from '../../types/navigation';
import {useAuth} from '../../store/AuthContext';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import {colors, spacing, typography, borderRadius, shadows} from '../../theme/theme';

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [form, setForm] = useState<LoginRequest>({email: '', password: ''});
  const [errors, setErrors] = useState<{email?: string; password?: string; general?: string}>({});
  const {login, isLoading} = useAuth();

  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};
    
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    try {
      setErrors({});
      await login(form);
    } catch (error) {
      setErrors({general: 'Invalid email or password. Please try again.'});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Login to continue to cirQQles</Text>
          </View>

          {/* Login Form Card */}
          <View style={styles.formCard}>
            {/* General Error Message */}
            {errors.general && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>⚠️ {errors.general}</Text>
              </View>
            )}

            <AppInput
              label="Email Address"
              placeholder="Enter your email"
              value={form.email}
              onChangeText={(text: string) => {
                setForm({...form, email: text});
                if (errors.email) {
                  const newErrors = {...errors};
                  delete newErrors.email;
                  setErrors(newErrors);
                }
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              icon="📧 "
              error={errors.email}
              containerStyle={styles.inputContainer}
            />

            <AppInput
              label="Password"
              placeholder="Enter your password"
              value={form.password}
              onChangeText={(text: string) => {
                setForm({...form, password: text});
                if (errors.password) {
                  const newErrors = {...errors};
                  delete newErrors.password;
                  setErrors(newErrors);
                }
              }}
              secureTextEntry
              autoComplete="password"
              icon="🔒 "
              error={errors.password}
              containerStyle={styles.inputContainer}
            />

            {/* Forgot Password Link */}
            <TouchableOpacity 
              style={styles.forgotPasswordContainer}
              onPress={() => navigation.navigate('PasswordReset')}
            >
              <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <AppButton
              title="Login"
              onPress={handleLogin}
              loading={isLoading}
              disabled={isLoading}
              size="md"
              style={styles.loginButton}
            />
          </View>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.fontSize.lg * 1.4,
  },
  formCard: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    ...shadows.medium,
  },
  errorContainer: {
    backgroundColor: colors.error + '10',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: spacing.xl,
    paddingVertical: spacing.xs,
  },
  forgotPasswordText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
  },
  loginButton: {
    width: '100%',
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.sm, // Further reduced height for more attractive look
    ...shadows.medium,
    backgroundColor: colors.primary,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  signUpText: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  signUpLink: {
    fontSize: typography.fontSize.md,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
});

export default LoginScreen;