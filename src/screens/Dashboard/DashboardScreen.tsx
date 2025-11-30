import React from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {useAuth} from '../../store/AuthContext';
import AppButton from '../../components/AppButton';
import Card from '../../components/Card';
import {colors, spacing, typography, borderRadius} from '../../theme/theme';

const mockUser = {name: 'Yasir Ahmed'};
const mockStats = {postsCount: 12, rewardsPoints: 240, circlesJoined: 5};
const mockActivity = [
  {title: 'Joined “Design Circle”', time: '2h ago'},
  {title: 'Commented on a post', time: '5h ago'},
  {title: 'Shared an update', time: 'Yesterday'},
  {title: 'Earned 40 reward points', time: '2 days ago'},
];

const DashboardScreen = () => {
  const {user} = useAuth();
  const displayName = user?.name || mockUser.name;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcome}>Welcome back, {displayName.split(' ')[0]}</Text>
            <Text style={styles.subtitle}>Here’s your cirQQles overview</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <Card style={styles.statCard} shadow="medium">
            <Text style={styles.statLabel}>Posts</Text>
            <Text style={styles.statValue}>{mockStats.postsCount}</Text>
          </Card>
          <Card style={styles.statCard} shadow="medium">
            <Text style={styles.statLabel}>Rewards Points</Text>
            <Text style={styles.statValue}>{mockStats.rewardsPoints}</Text>
          </Card>
          <Card style={styles.statCard} shadow="medium">
            <Text style={styles.statLabel}>Circles Joined</Text>
            <Text style={styles.statValue}>{mockStats.circlesJoined}</Text>
          </Card>
        </View>

        {/* <Card style={styles.sectionCard} shadow="medium">
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Account</Text>
            <Text style={styles.sectionSubtitle}>Manage your profile and access</Text>
          </View>
          <View style={styles.buttonStack}>
            <AppButton title="View Profile" onPress={() => {}} style={styles.stackButton} />
            <AppButton
              title="Sign Out"
              onPress={() => {}}
              variant="secondary"
              style={[styles.stackButton, styles.secondaryButton]}
            />
          </View>
        </Card> */}

        <Card style={styles.sectionCard} shadow="medium">
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <Text style={styles.sectionSubtitle}>Latest actions across your circles</Text>
          </View>
          <View>
            {mockActivity.map((item, index) => (
              <View
                key={`${item.title}-${index}`}
                style={[
                  styles.activityItem,
                  index !== mockActivity.length - 1 && styles.activityItemSpacing,
                ]}>
                <View style={styles.activityDot} />
                <View style={styles.activityTextContainer}>
                  <Text style={styles.activityTitle}>{item.title}</Text>
                  <Text style={styles.activityTime}>{item.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </Card>

        <Card style={styles.sectionCard} shadow="medium">
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Rewards</Text>
            <Text style={styles.sectionSubtitle}>Keep earning through engagement</Text>
          </View>
          <View style={styles.rewardsRow}>
            <View style={styles.rewardsInfo}>
              <Text style={styles.rewardsPoints}>{mockStats.rewardsPoints}</Text>
              <Text style={styles.rewardsLabel}>Current points</Text>
            </View>
            <AppButton title="View Rewards" onPress={() => {}} style={styles.rewardsButton} />
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    backgroundColor: colors.surface,
  },
  header: {
    marginBottom: spacing.xl,
  },
  welcome: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    marginRight: spacing.sm,
    borderRadius: borderRadius.xl,
  },
  statLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  sectionCard: {
    borderRadius: borderRadius.xl,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  buttonStack: {},
  stackButton: {
    marginBottom: spacing.sm,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityItemSpacing: {
    marginBottom: spacing.md,
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    marginRight: spacing.md,
  },
  activityTextContainer: {
    flex: 1,
  },
  activityTitle: {
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    marginBottom: spacing.xs / 2,
  },
  activityTime: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  rewardsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rewardsInfo: {
    flexDirection: 'column',
    flex: 1,
  },
  rewardsPoints: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  rewardsLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs / 2,
  },
  rewardsButton: {
    flexBasis: '45%',
  },
});

export default DashboardScreen;
