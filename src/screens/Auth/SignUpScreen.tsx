import React, {useState} from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SignUpRequest} from '../../types/auth';
import {AuthStackParamList} from '../../types/navigation';
import {useAuth} from '../../store/AuthContext';
import ScreenContainer from '../../components/ScreenContainer';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import {colors, spacing, typography} from '../../theme/theme';

const SignUpScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [form, setForm] = useState<SignUpRequest>({
    name: '',
    email: '',
    password: '',
  });
  const {signUp, isLoading} = useAuth();

  const handleSignUp = async () => {
    if (!form.name || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    try {
      await signUp(form);
      Alert.alert('Success', 'Account created successfully');
    } catch (error) {
      Alert.alert('Error', 'Sign up failed');
    }
  };

  return (
    <ScreenContainer style={styles.container}>
      <Text style={styles.title}>Join cirQQles</Text>
      <Text style={styles.subtitle} numberOfLines={2}>Create your account to get started</Text>

      <AppInput
        label="Full Name"
        placeholder="Enter your full name"
        value={form.name}
        onChangeText={(text: string) => setForm({...form, name: text})}
        icon="👤"
      />

      <AppInput
        label="Email"
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text: string) => setForm({...form, email: text})}
        keyboardType="email-address"
        autoCapitalize="none"
        icon="📧"
      />

      <AppInput
        label="Password"
        placeholder="Create a password"
        value={form.password}
        onChangeText={(text: string) => setForm({...form, password: text})}
        secureTextEntry
        icon="🔒"
      />

      <AppButton
        title="Create Account"
        onPress={handleSignUp}
        loading={isLoading}
        style={styles.button}
      />

      <AppButton
        title="Already have an account? Sign In"
        onPress={() => navigation.navigate('Login')}
        variant="ghost"
        size="sm"
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xxl,
    lineHeight: typography.lineHeight.normal,
  },
  button: {
    marginBottom: spacing.lg,
  },
});

export default SignUpScreen;