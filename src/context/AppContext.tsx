import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Quiz, QuizAttempt } from '../types';
import { loadSampleQuizzes } from '../data/sampleQuizzes';

interface AppContextType {
  currentUser: User | null;
  quizzes: Quiz[];
  quizAttempts: QuizAttempt[];
  login: (user: User) => void;
  logout: () => void;
  addQuiz: (quiz: Quiz) => void;
  getQuizzesBySubject: (subject: string) => Quiz[];
  addQuizAttempt: (attempt: QuizAttempt) => void;
  getQuizAttempts: (studentId: string) => QuizAttempt[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    // Load sample quizzes if none exist
    loadSampleQuizzes();
    
    const savedUser = localStorage.getItem('currentUser');
    const savedQuizzes = localStorage.getItem('quizzes');
    const savedAttempts = localStorage.getItem('quizAttempts');

    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    if (savedQuizzes) {
      setQuizzes(JSON.parse(savedQuizzes));
    }
    if (savedAttempts) {
      setQuizAttempts(JSON.parse(savedAttempts));
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
  }, [quizzes]);

  useEffect(() => {
    localStorage.setItem('quizAttempts', JSON.stringify(quizAttempts));
  }, [quizAttempts]);

  const login = (user: User) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addQuiz = (quiz: Quiz) => {
    setQuizzes(prev => [...prev, quiz]);
  };

  const getQuizzesBySubject = (subject: string) => {
    return quizzes.filter(quiz => quiz.subject === subject);
  };

  const addQuizAttempt = (attempt: QuizAttempt) => {
    setQuizAttempts(prev => [...prev, attempt]);
  };

  const getQuizAttempts = (studentId: string) => {
    return quizAttempts.filter(attempt => attempt.studentId === studentId);
  };

  const value: AppContextType = {
    currentUser,
    quizzes,
    quizAttempts,
    login,
    logout,
    addQuiz,
    getQuizzesBySubject,
    addQuizAttempt,
    getQuizAttempts,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};