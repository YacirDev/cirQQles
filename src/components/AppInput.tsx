import React, {useState} from 'react';
import {TextInput, StyleSheet, TextInputProps, View, Text} from 'react-native';
import {colors, spacing, borderRadius, typography, shadows} from '../theme/theme';

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string | undefined;
  containerStyle?: any;
  icon?: string;
}

const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  containerStyle,
  icon,
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getInputContainerStyle = () => {
    const baseStyle = [styles.inputContainer];
    
    if (error) {
      return [...baseStyle, styles.inputContainerError];
    }
    
    if (isFocused) {
      return [...baseStyle, styles.inputContainerFocused];
    }
    
    return baseStyle;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={getInputContainerStyle()}>
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <TextInput
          style={[styles.input, icon ? styles.inputWithIcon : undefined, style]}
          placeholderTextColor={colors.textSecondary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background,
    ...shadows.light,
    transition: 'all 0.2s ease',
  },
  inputContainerFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
    ...shadows.medium,
  },
  inputContainerError: {
    borderColor: colors.error,
    borderWidth: 2,
  },
  icon: {
    fontSize: typography.fontSize.lg,
    marginLeft: spacing.md,
    color: colors.textSecondary,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.sm + 2, // Reduced height for more attractive look
    paddingHorizontal: spacing.md,
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.regular,
  },
  inputWithIcon: {
    paddingLeft: 0,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    fontSize: typography.fontSize.xs,
    color: colors.error,
    marginTop: spacing.xs,
  },
});

export default AppInput;