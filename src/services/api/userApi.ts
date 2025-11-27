import apiClient, { mockDelay } from './apiClient';
import {
  UserProfile,
  UpdateUserRequest,
  UpdateUserResponse,
} from '../../types/api';

// Mock user data
const mockUserProfiles: UserProfile[] = [
  {
    id: '2',
    email: 'user@example.com',
    name: 'John Doe',
    bio: 'Welcome to cirQQles!',
    avatar: 'https://example.com/avatar.jpg',
    createdAt: '2023-01-01T00:00:00Z',
  },
];

// Get user profile
export const getUserProfile = async (userId: string): Promise<UserProfile> => {
  await mockDelay();

  const user = mockUserProfiles.find(u => u.id === userId);
  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

// Update user profile
export const updateUserProfile = async (
  userId: string,
  data: UpdateUserRequest
): Promise<UpdateUserResponse> => {
  await mockDelay();

  const userIndex = mockUserProfiles.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    throw new Error('User not found');
  }

  // Update the user
  mockUserProfiles[userIndex] = {
    ...mockUserProfiles[userIndex],
    ...(data.name !== undefined && { name: data.name }),
    ...(data.bio !== undefined && { bio: data.bio }),
    ...(data.avatar !== undefined && { avatar: data.avatar }),
  } as UserProfile;

  return {
    user: mockUserProfiles[userIndex],
  };
};