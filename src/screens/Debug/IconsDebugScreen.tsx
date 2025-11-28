// IconsDebugScreen removed — debug code no longer needed
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, spacing, typography} from '../../theme/theme';

const IconsDebugScreen = () => (
  <View style={styles.container}>
    <Text style={styles.h1}>Icons debug removed</Text>
    <Text style={styles.sub}>This temporary debug screen has been removed.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background, padding: spacing.md},
  h1: {fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold},
  sub: {fontSize: typography.fontSize.md, color: colors.textSecondary, marginTop: spacing.sm},
});

export default IconsDebugScreen;
