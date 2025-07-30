export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  answers: Answer[];
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt: Date;
  updatedAt: Date;
  duration: number; // in minutes
  isPublished: boolean;
  createdBy: string; // teacher name or id
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentName: string;
  answers: { questionId: string; selectedAnswers: string[] }[];
  score: number;
  completedAt: Date;
}