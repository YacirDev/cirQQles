import apiClient, { mockDelay } from './apiClient';
import {
  Post,
  CreatePostRequest,
  CreatePostResponse,
  GetPostsResponse,
} from '../../types/api';

// Mock posts data
const mockPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    content: 'Welcome to cirQQles! This is my first post.',
    createdAt: '2023-01-01T10:00:00Z',
    likes: 5,
    comments: 2,
  },
  {
    id: '2',
    userId: '1',
    content: 'Excited to share my journey here.',
    imageUrl: 'https://example.com/image.jpg',
    createdAt: '2023-01-02T14:30:00Z',
    likes: 12,
    comments: 5,
  },
];

let postIdCounter = 3;

// Get posts
export const getPosts = async (page: number = 1, limit: number = 10): Promise<GetPostsResponse> => {
  await mockDelay();

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const posts = mockPosts.slice(startIndex, endIndex);

  return {
    posts,
    hasMore: endIndex < mockPosts.length,
  };
};

// Create post
export const createPost = async (data: CreatePostRequest): Promise<CreatePostResponse> => {
  await mockDelay();

  // Mock user ID from token (in real app, get from auth)
  const userId = '1'; // Mock

  const newPost: Post = {
    id: postIdCounter.toString(),
    userId,
    content: data.content,
    ...(data.imageUrl && { imageUrl: data.imageUrl }),
    createdAt: new Date().toISOString(),
    likes: 0,
    comments: 0,
  } as Post;

  mockPosts.unshift(newPost); // Add to beginning
  postIdCounter++;

  return {
    post: newPost,
  };
};

// Get post by ID
export const getPost = async (postId: string): Promise<Post> => {
  await mockDelay();

  const post = mockPosts.find(p => p.id === postId);
  if (!post) {
    throw new Error('Post not found');
  }

  return post;
};