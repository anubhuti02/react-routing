import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
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
  createQuiz: (quiz: Omit<Quiz, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateQuiz: (id: string, quiz: Partial<Quiz>) => void;
  deleteQuiz: (id: string) => void;
  getQuiz: (id: string) => Quiz | undefined;
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

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

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

  const createQuiz = (quizData: Omit<Quiz, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newQuiz: Quiz = {
      ...quizData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setQuizzes(prev => [...prev, newQuiz]);
  };

  const updateQuiz = (id: string, updates: Partial<Quiz>) => {
    setQuizzes(prev => prev.map(quiz => 
      quiz.id === id 
        ? { ...quiz, ...updates, updatedAt: new Date() }
        : quiz
    ));
  };

  const deleteQuiz = (id: string) => {
    setQuizzes(prev => prev.filter(quiz => quiz.id !== id));
  };

  const getQuiz = (id: string): Quiz | undefined => {
    return quizzes.find(quiz => quiz.id === id);
  };

  const value: QuizContextType = {
    quizState,
    quizzes,
    nextQuestion,
    addAnswer,
    resetQuiz,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    getQuiz,
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