import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import {MainTabParamList} from '../types/navigation';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import PostsScreen from '../screens/Posts/PostsScreen';
import RewardsScreen from '../screens/Rewards/RewardsScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import {colors, shadows} from '../theme/theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          shadowColor: colors.shadowLight,
          elevation: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, focused, size}) => (
            <Text style={{color, fontSize: size}}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarLabel: 'Posts',
          tabBarIcon: ({color, focused, size}) => (
            <Text style={{color, fontSize: size}}>📰</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{
          tabBarLabel: 'Rewards',
          tabBarIcon: ({color, focused, size}) => (
            <Text style={{color, fontSize: size}}>🎁</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, focused, size}) => (
            <Text style={{color, fontSize: size}}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;