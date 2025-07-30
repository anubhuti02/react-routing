import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface QuizState {
  currentQuestion: number;
  score: number;
  answers: string[];
  isCompleted: boolean;
}

interface QuizContextType {
  quizState: QuizState;
  nextQuestion: () => void;
  addAnswer: (answer: string) => void;
  resetQuiz: () => void;
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

  const value: QuizContextType = {
    quizState,
    nextQuestion,
    addAnswer,
    resetQuiz,
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