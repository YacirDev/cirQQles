import apiClient, { mockDelay } from './apiClient';
import {
  Reward,
  ClaimRewardRequest,
  ClaimRewardResponse,
  GetRewardsResponse,
} from '../../types/api';

// Mock rewards data
const mockRewards: Reward[] = [
  {
    id: '1',
    title: 'Welcome Badge',
    description: 'Your first reward for joining cirQQles!',
    pointsRequired: 0,
    claimed: true,
  },
  {
    id: '2',
    title: 'Social Butterfly',
    description: 'Make 10 posts to earn this badge',
    pointsRequired: 100,
    claimed: false,
  },
  {
    id: '3',
    title: 'Community Champion',
    description: 'Help 50 community members',
    pointsRequired: 500,
    imageUrl: 'https://example.com/reward.jpg',
    claimed: false,
  },
];

// Get rewards
export const getRewards = async (): Promise<GetRewardsResponse> => {
  await mockDelay();

  return {
    rewards: mockRewards,
  };
};

// Claim reward
export const claimReward = async (data: ClaimRewardRequest): Promise<ClaimRewardResponse> => {
  await mockDelay();

  const reward = mockRewards.find(r => r.id === data.rewardId);
  if (!reward) {
    throw new Error('Reward not found');
  }

  if (reward.claimed) {
    throw new Error('Reward already claimed');
  }

  // Mock claiming
  reward.claimed = true;

  return {
    success: true,
    message: `Successfully claimed ${reward.title}!`,
  };
};