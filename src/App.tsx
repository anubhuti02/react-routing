import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Quiz, QuizAttempt } from './types';
import Login from './components/Login';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import QuizTaker from './components/QuizTaker';
import QuizResults from './components/QuizResults';
import './App.css';

type AppView = 'login' | 'dashboard' | 'quiz' | 'results';

const AppContent: React.FC = () => {
  const { currentUser } = useApp();
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizAttempt, setQuizAttempt] = useState<QuizAttempt | null>(null);

  const handleTakeQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentView('quiz');
  };

  const handleQuizComplete = (attempt: QuizAttempt) => {
    setQuizAttempt(attempt);
    setCurrentView('results');
  };

  const handleBackToDashboard = () => {
    setSelectedQuiz(null);
    setQuizAttempt(null);
    setCurrentView('dashboard');
  };

  const handleRetakeQuiz = () => {
    if (selectedQuiz) {
      setQuizAttempt(null);
      setCurrentView('quiz');
    }
  };

  const handleExitQuiz = () => {
    const confirmExit = window.confirm(
      'Are you sure you want to exit the quiz? Your progress will be lost.'
    );
    if (confirmExit) {
      handleBackToDashboard();
    }
  };

  // Show login if no user is logged in
  if (!currentUser) {
    return <Login />;
  }

  // Handle different views based on current state
  switch (currentView) {
    case 'quiz':
      if (!selectedQuiz) {
        setCurrentView('dashboard');
        return null;
      }
      return (
        <QuizTaker
          quiz={selectedQuiz}
          onComplete={handleQuizComplete}
          onExit={handleExitQuiz}
        />
      );

    case 'results':
      if (!selectedQuiz || !quizAttempt) {
        setCurrentView('dashboard');
        return null;
      }
      return (
        <QuizResults
          quiz={selectedQuiz}
          attempt={quizAttempt}
          onBackToDashboard={handleBackToDashboard}
          onRetakeQuiz={handleRetakeQuiz}
        />
      );

    case 'dashboard':
    default:
      if (currentUser.role === 'teacher') {
        return <TeacherDashboard />;
      } else {
        return <StudentDashboard onTakeQuiz={handleTakeQuiz} />;
      }
  }
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="app">
        <AppContent />
      </div>
    </AppProvider>
  );
};

export default App;