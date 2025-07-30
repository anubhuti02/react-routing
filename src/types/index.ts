export interface User {
  id: string;
  name: string;
  email: string;
  role: 'teacher' | 'student';
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option (0-3)
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  description: string;
  questions: Question[];
  timeLimit: number; // in minutes
  createdBy: string; // teacher id
  createdAt: Date;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  answers: number[]; // array of selected option indices
  score: number;
  completedAt: Date;
  timeSpent: number; // in seconds
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: number[];
  timeRemaining: number; // in seconds
  isCompleted: boolean;
}