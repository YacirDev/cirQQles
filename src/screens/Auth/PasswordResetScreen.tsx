import React, {useState} from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAuth} from '../../store/AuthContext';
import {AuthStackParamList} from '../../types/navigation';
import ScreenContainer from '../../components/ScreenContainer';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import {colors, spacing, typography} from '../../theme/theme';

const PasswordResetScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [email, setEmail] = useState('');
  const {resetPassword, isLoading} = useAuth();

  const handleReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    try {
      await resetPassword(email);
      Alert.alert('Success', 'Password reset email sent');
    } catch (error) {
      Alert.alert('Error', 'Failed to send reset email');
    }
  };

  return (
    <ScreenContainer style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle} numberOfLines={2}>
        Enter your email address and we'll send you a link to reset your password.
      </Text>

      <AppInput
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        icon="📧"
      />

      <AppButton
        title="Send Reset Link"
        onPress={handleReset}
        loading={isLoading}
        style={styles.button}
      />

      <AppButton
        title="Back to Sign In"
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
    paddingHorizontal: 0,
    paddingBottom: 0,
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
    lineHeight: 20,
  },
  button: {
    marginBottom: spacing.lg,
  },
});

export default PasswordResetScreen;
