/**
 * Masterclass Type Definitions
 * Defines educational content, lessons, and learning progress types
 */

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type LessonFormat = 'video' | 'interactive' | 'quiz' | 'practical' | 'case-study';
export type ProgressStatus = 'not-started' | 'in-progress' | 'completed' | 'reviewing';

export interface MasterclassModule {
    id: string;
    title: string;
    description: string;
    level: DifficultyLevel;
    order: number;
    lessons: Lesson[];
    duration: number; // minutes
    completed: boolean;
    progress: number; // percentage
    prerequisites?: string[];
    tags: string[];
}

export interface Lesson {
    id: string;
    moduleId: string;
    title: string;
    description: string;
    format: LessonFormat;
    duration: number; // minutes
    order: number;
    content: LessonContent;
    resources: Resource[];
    quiz?: Quiz;
    status: ProgressStatus;
    completedAt?: Date;
    score?: number;
}

export interface LessonContent {
    type: 'text' | 'video' | 'interactive' | 'mixed';
    text?: string;
    videoUrl?: string;
    codeSnippets?: CodeSnippet[];
    images?: string[];
    html?: string;
}

export interface CodeSnippet {
    language: string;
    code: string;
    description: string;
}

export interface Resource {
    id: string;
    title: string;
    type: 'pdf' | 'link' | 'file' | 'video';
    url: string;
    description?: string;
}

export interface Quiz {
    id: string;
    lessonId: string;
    title: string;
    description: string;
    questions: QuizQuestion[];
    passingScore: number; // percentage
    attempts: QuizAttempt[];
    bestScore: number;
}

export interface QuizQuestion {
    id: string;
    quizId: string;
    type: 'multiple-choice' | 'short-answer' | 'fill-blank' | 'code';
    question: string;
    options?: string[];
    correctAnswer: string | string[];
    explanation: string;
    order: number;
}

export interface QuizAttempt {
    id: string;
    quizId: string;
    userId: string;
    answers: Record<string, string | string[]>;
    score: number;
    completedAt: Date;
    timeSpent: number; // seconds
}

export interface LearningPath {
    id: string;
    userId: string;
    title: string;
    description: string;
    modules: MasterclassModule[];
    progress: number;
    startedAt: Date;
    estimatedCompletion?: Date;
    completedAt?: Date;
    status: 'active' | 'paused' | 'completed';
}

export interface Certificate {
    id: string;
    userId: string;
    moduleId: string;
    issuedAt: Date;
    expiresAt?: Date;
    certificateNumber: string;
    displayName: string;
}

export interface Milestone {
    id: string;
    userId: string;
    type: 'module_complete' | 'quiz_pass' | 'streak' | 'skill_mastery';
    title: string;
    description: string;
    achievedAt: Date;
    reward?: {
        points: number;
        badge?: string;
    };
}
