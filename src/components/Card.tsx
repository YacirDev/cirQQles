import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {colors, spacing, borderRadius, shadows} from '../theme/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof spacing;
  shadow?: 'light' | 'medium' | 'none';
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = 'md',
  shadow = 'light',
}) => {
  const getShadowStyle = () => {
    switch (shadow) {
      case 'medium':
        return shadows.medium;
      case 'none':
        return {};
      default:
        return shadows.light;
    }
  };

  return (
    <View style={[styles.card, {padding: spacing[padding]}, getShadowStyle(), style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
});

export default Card;