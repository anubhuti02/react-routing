import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface Quiz {
  id: string;
  title: string;
  subject: string;
  description: string;
  questions: number;
  duration: number;
  passingScore: number;
  status: 'active' | 'draft' | 'archived';
  attempts: number;
  averageScore: number;
  createdAt: string;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface NewQuizData {
  title: string;
  subject: string;
  description: string;
  duration: number;
  passingScore: number;
  questions: Question[];
}

interface QuizState {
  currentQuestion: number;
  score: number;
  answers: string[];
  isCompleted: boolean;
}

interface QuizContextType {
  quizState: QuizState;
  quizzes: Quiz[];
  nextQuestion: () => void;
  addAnswer: (answer: string) => void;
  resetQuiz: () => void;
  addQuiz: (quizData: NewQuizData) => void;
  updateQuizStatus: (quizId: string, status: 'active' | 'draft' | 'archived') => void;
  deleteQuiz: (quizId: string) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    answers: [],
    isCompleted: false,
  });

  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: '1',
      title: 'Mathematics - Algebra Basics',
      subject: 'Mathematics',
      description: 'Test your understanding of basic algebraic concepts',
      questions: 15,
      duration: 30,
      passingScore: 70,
      status: 'active',
      attempts: 45,
      averageScore: 78,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Science - Physics Laws',
      subject: 'Science',
      description: 'Fundamental laws of physics',
      questions: 20,
      duration: 45,
      passingScore: 75,
      status: 'active',
      attempts: 32,
      averageScore: 82,
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      title: 'History - World War II',
      subject: 'History',
      description: 'Major events and consequences of WWII',
      questions: 12,
      duration: 25,
      passingScore: 70,
      status: 'draft',
      attempts: 0,
      averageScore: 0,
      createdAt: '2024-01-20'
    }
  ]);

  const nextQuestion = () => {
    setQuizState(prev => ({
      ...prev,
      currentQuestion: prev.currentQuestion + 1,
    }));
  };

  const addAnswer = (answer: string) => {
    setQuizState(prev => ({
      ...prev,
      answers: [...prev.answers, answer],
    }));
  };

  const resetQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      score: 0,
      answers: [],
      isCompleted: false,
    });
  };

  const addQuiz = (quizData: NewQuizData) => {
    const newQuiz: Quiz = {
      id: Date.now().toString(),
      title: quizData.title,
      subject: quizData.subject,
      description: quizData.description,
      questions: quizData.questions.length,
      duration: quizData.duration,
      passingScore: quizData.passingScore,
      status: 'draft',
      attempts: 0,
      averageScore: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setQuizzes(prev => [newQuiz, ...prev]);
  };

  const updateQuizStatus = (quizId: string, status: 'active' | 'draft' | 'archived') => {
    setQuizzes(prev =>
      prev.map(quiz =>
        quiz.id === quizId ? { ...quiz, status } : quiz
      )
    );
  };

  const deleteQuiz = (quizId: string) => {
    setQuizzes(prev => prev.filter(quiz => quiz.id !== quizId));
  };

  const value: QuizContextType = {
    quizState,
    quizzes,
    nextQuestion,
    addAnswer,
    resetQuiz,
    addQuiz,
    updateQuizStatus,
    deleteQuiz,
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};