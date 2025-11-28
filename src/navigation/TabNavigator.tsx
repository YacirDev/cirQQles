import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// Icons removed from tab bar: using emoji in labels instead
import {MainTabParamList} from '../types/navigation';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import PostsScreen from '../screens/Posts/PostsScreen';
import RewardsScreen from '../screens/Rewards/RewardsScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import {colors, spacing, typography, borderRadius} from '../theme/theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => {
        const emojiMap: Record<string, string> = {
          Dashboard: '🏠',
          Posts: '📰',
          Rewards: '🎁',
          Profile: '👤',
        };

        const labelMap: Record<string, string> = {
          Dashboard: 'Dashboard',
          Posts: 'Posts',
          Rewards: 'Rewards',
          Profile: 'Profile',
        };

        return {
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          height: 60,
          paddingTop: spacing.xs,
          paddingBottom: spacing.xs,
          // Rounded top-left and top-right corners
          borderTopLeftRadius: borderRadius.lg,
          borderTopRightRadius: borderRadius.lg,
          overflow: 'hidden', // ensure rounding clips the children
        },
        tabBarShowLabel: false,
        tabBarLabelStyle: {
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
        },
        tabBarIcon: ({color, size, focused}) => {
          const emoji = emojiMap[route.name] ?? '❓';
          const label = labelMap[route.name] ?? route.name;
          return (
            <View style={styles.tabItem}>
              <Text style={[styles.emoji, {color, fontSize: focused ? 20 : 18}]}>{emoji}</Text>
              <Text style={[styles.label, {color}]}>{label}</Text>
            </View>
          );
        },
        };
      }}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{tabBarLabel: 'Dashboard 🏠'}} />
      <Tab.Screen name="Posts" component={PostsScreen} options={{tabBarLabel: 'Posts 📰'}} />
      <Tab.Screen name="Rewards" component={RewardsScreen} options={{tabBarLabel: 'Rewards 🎁'}} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{tabBarLabel: 'Profile 👤'}} />
      {/* Debug: screen removed */}
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    lineHeight: 24,
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
});
