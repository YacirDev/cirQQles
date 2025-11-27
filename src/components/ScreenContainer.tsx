import React from 'react';
import {View, StyleSheet, ViewStyle, SafeAreaView} from 'react-native';
import {colors, spacing} from '../theme/theme';

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  safeArea?: boolean;
  padding?: keyof typeof spacing;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
  safeArea = true,
  padding = 'md',
}) => {
  const Container = safeArea ? SafeAreaView : View;

  return (
    <Container style={[styles.container, {padding: spacing[padding]}, style]}>
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default ScreenContainer;