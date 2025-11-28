import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import Card from '../../components/Card';
import AppButton from '../../components/AppButton';
import {colors, spacing, typography} from '../../theme/theme';

const RewardsScreen = () => {
  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Rewards</Text>
        <Text style={styles.subtitle}>Earn points and unlock achievements</Text>
      </View>

      <Card style={styles.pointsCard}>
        <Text style={styles.pointsTitle}>Your Points</Text>
        <Text style={styles.pointsValue}>300</Text>
        <Text style={styles.pointsSubtitle}>Keep engaging to earn more!</Text>
      </Card>

      <View style={styles.rewards}>
        <Text style={styles.sectionTitle}>Available Rewards</Text>

        <Card style={styles.rewardCard}>
          <View style={styles.rewardHeader}>
            <Text style={styles.rewardTitle}>Welcome Badge</Text>
            <Text style={styles.rewardPoints}>200 pts</Text>
          </View>
          <Text style={styles.rewardDescription}>Your first reward for joining cirQQles!</Text>
          <AppButton
            title="Claim Reward"
            onPress={() => {/* Claim reward */}}
            size="sm"
            style={styles.claimButton}
          />
        </Card>

        <Card style={styles.rewardCard}>
          <View style={styles.rewardHeader}>
            <Text style={styles.rewardTitle}>Social Butterfly</Text>
            <Text style={styles.rewardPoints}>100 pts</Text>
          </View>
          <Text style={styles.rewardDescription}>Make 10 posts to earn this badge</Text>
          <Text style={styles.lockedText}>🔒 Locked</Text>
        </Card>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.xl,
    paddingTop: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  pointsCard: {
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  pointsTitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  pointsValue: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  pointsSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  rewards: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  rewardCard: {
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  rewardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  rewardTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  rewardPoints: {
    fontSize: typography.fontSize.sm,
    color: colors.secondary,
    fontWeight: typography.fontWeight.medium,
  },
  rewardDescription: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    // lineHeight: typography.lineHeight.normal,
    marginBottom: spacing.md,
  },
  claimButton: {
    alignSelf: 'flex-start',
  },
  lockedText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});

export default RewardsScreen;