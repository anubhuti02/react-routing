import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Quiz, Question, Answer } from '../types/quiz';

interface QuizState {
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
  loading: boolean;
  error: string | null;
}

type QuizAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_QUIZZES'; payload: Quiz[] }
  | { type: 'ADD_QUIZ'; payload: Quiz }
  | { type: 'UPDATE_QUIZ'; payload: Quiz }
  | { type: 'DELETE_QUIZ'; payload: string }
  | { type: 'SET_CURRENT_QUIZ'; payload: Quiz | null };

const initialState: QuizState = {
  quizzes: [],
  currentQuiz: null,
  loading: false,
  error: null,
};

const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_QUIZZES':
      return { ...state, quizzes: action.payload };
    case 'ADD_QUIZ':
      return { ...state, quizzes: [...state.quizzes, action.payload] };
    case 'UPDATE_QUIZ':
      return {
        ...state,
        quizzes: state.quizzes.map(quiz =>
          quiz.id === action.payload.id ? action.payload : quiz
        ),
      };
    case 'DELETE_QUIZ':
      return {
        ...state,
        quizzes: state.quizzes.filter(quiz => quiz.id !== action.payload),
      };
    case 'SET_CURRENT_QUIZ':
      return { ...state, currentQuiz: action.payload };
    default:
      return state;
  }
};

interface QuizContextType extends QuizState {
  createQuiz: (quiz: Omit<Quiz, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateQuiz: (quiz: Quiz) => void;
  deleteQuiz: (id: string) => void;
  setCurrentQuiz: (quiz: Quiz | null) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const createQuiz = (quizData: Omit<Quiz, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newQuiz: Quiz = {
      ...quizData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    dispatch({ type: 'ADD_QUIZ', payload: newQuiz });
  };

  const updateQuiz = (quiz: Quiz) => {
    const updatedQuiz = { ...quiz, updatedAt: new Date() };
    dispatch({ type: 'UPDATE_QUIZ', payload: updatedQuiz });
  };

  const deleteQuiz = (id: string) => {
    dispatch({ type: 'DELETE_QUIZ', payload: id });
  };

  const setCurrentQuiz = (quiz: Quiz | null) => {
    dispatch({ type: 'SET_CURRENT_QUIZ', payload: quiz });
  };

  const value: QuizContextType = {
    ...state,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    setCurrentQuiz,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};