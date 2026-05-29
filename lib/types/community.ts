/**
 * Community Type Definitions
 * Defines leaderboard, social, and community-related types
 */

export type RankMetric = 'winRate' | 'profitFactor' | 'totalProfit' | 'consistency' | 'experience';
export type PostType = 'insight' | 'question' | 'discussion' | 'victory' | 'lesson';
export type InteractionType = 'like' | 'comment' | 'bookmark' | 'share';

export interface CommunityUser {
    id: string;
    name: string;
    avatar: string;
    tier: 'free' | 'pro' | 'elite' | 'enterprise';
    stats: CommunityUserStats;
    badges: Badge[];
    following: boolean;
    joinedAt: Date;
}

export interface CommunityUserStats {
    rank: number;
    rankMetric: RankMetric;
    followers: number;
    following: number;
    totalPosts: number;
    winRate: number;
    profitFactor: number;
    totalProfit: number;
    consistency: number;
    experience: number;
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    earnedAt: Date;
}

export interface CommunityPost {
    id: string;
    authorId: string;
    author: CommunityUser;
    type: PostType;
    title: string;
    content: string;
    image?: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    stats: PostStats;
    comments: Comment[];
    liked: boolean;
    bookmarked: boolean;
}

export interface PostStats {
    likes: number;
    comments: number;
    bookmarks: number;
    shares: number;
    views: number;
}

export interface Comment {
    id: string;
    postId: string;
    authorId: string;
    author: CommunityUser;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    likes: number;
    liked: boolean;
    replies: Comment[];
}

export interface Leaderboard {
    period: 'week' | 'month' | 'allTime';
    metric: RankMetric;
    entries: LeaderboardEntry[];
    generatedAt: Date;
}

export interface LeaderboardEntry {
    rank: number;
    user: CommunityUser;
    value: number;
    change?: number;
    trend: 'up' | 'down' | 'neutral';
}

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    requirement: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    progress: number;
    unlocked: boolean;
    unlockedAt?: Date;
}

export interface UserFollowing {
    userId: string;
    followingId: string;
    followedAt: Date;
    notifications: boolean;
}
