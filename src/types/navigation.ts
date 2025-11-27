export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  PasswordReset: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Posts: undefined;
  Rewards: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Onboarding: undefined;
  AuthStack: AuthStackParamList;
  MainTabs: MainTabParamList;
};