// Auth API Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetResponse {
  message: string;
}

export interface LogoutResponse {
  message: string;
}

// User API Types
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
}

export interface UpdateUserRequest {
  name?: string;
  bio?: string;
  avatar?: string;
}

export interface UpdateUserResponse {
  user: UserProfile;
}

// Posts API Types
export interface Post {
  id: string;
  userId: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  likes: number;
  comments: number;
}

export interface CreatePostRequest {
  content: string;
  imageUrl?: string;
}

export interface CreatePostResponse {
  post: Post;
}

export interface GetPostsResponse {
  posts: Post[];
  hasMore: boolean;
}

// Rewards API Types
export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  imageUrl?: string;
  claimed: boolean;
}

export interface ClaimRewardRequest {
  rewardId: string;
}

export interface ClaimRewardResponse {
  success: boolean;
  message: string;
}

export interface GetRewardsResponse {
  rewards: Reward[];
}

// Generic API Response
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  code?: string;
}