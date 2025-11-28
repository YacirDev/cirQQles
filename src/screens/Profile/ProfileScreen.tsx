import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useAuth} from '../../store/AuthContext';
import {getUserProfile} from '../../services/api/userApi';
import {UserProfile} from '../../types/api';
import ScreenContainer from '../../components/ScreenContainer';
import Card from '../../components/Card';
import AppButton from '../../components/AppButton';
import {colors, spacing, typography} from '../../theme/theme';

const ProfileScreen = () => {
  const {user, logout} = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.id) {
        try {
          const userProfile = await getUserProfile(user.id);
          console.log('profile screen ------------>>',user);
          
          setProfile(userProfile);
        } catch (error) {
          console.error('Failed to fetch profile:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [user?.id]);

  if (loading) {
    return (
      <ScreenContainer style={styles.centered}>
        <Text style={styles.title}>Loading...</Text>
      </ScreenContainer>
    );
  }
console.log('profile data ----------->>',profile);
console.log('user data ----------->>',user);

  return (
    <ScreenContainer>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(user?.name || profile?.name || 'U').charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.name}>{user?.name || profile?.name}</Text>
          <Text style={styles.email}>{user?.email || profile?.email}</Text>
        </View>

        <Card style={styles.infoCard}>
          <Text style={styles.sectionTitle}>About</Text>
          {profile?.bio && (
            <Text style={styles.bio}>{profile.bio}</Text>
          )}
          <Text style={styles.memberSince}>
            Member since {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
          </Text>
        </Card>

        <Card style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>10</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>20</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
          </View>
        </Card>

        <View style={styles.actions}>
          <AppButton
            title="Edit Profile"
            onPress={() => {/* Navigate to edit profile */}}
            style={styles.actionButton}
          />
          <AppButton
            title="Settings"
            onPress={() => {/* Navigate to settings */}}
            variant="outline"
            style={styles.actionButton}
          />
          <AppButton
            title="Sign Out"
            onPress={logout}
            variant="ghost"
            size="sm"
            style={styles.signOutButton}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingTop: spacing.md,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.background,
  },
  name: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  email: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  infoCard: {
    marginBottom: spacing.lg,
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  bio: {
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    // lineHeight: typography.lineHeight.normal,
    marginBottom: spacing.md,
  },
  memberSince: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  statsCard: {
    marginBottom: spacing.lg,
    padding: spacing.lg,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  actions: {
    marginBottom: spacing.xl,
  },
  actionButton: {
    marginBottom: spacing.md,
  },
  signOutButton: {
    alignSelf: 'center',
  },
  title: {
    fontSize: typography.fontSize.lg,
    color: colors.textPrimary,
  },
});

export default ProfileScreen;