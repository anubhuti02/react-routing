import React from 'react';
import { QuizProvider } from './quizcontext';
import TeacherDashboard from './teacherdashboard';

const App: React.FC = () => {
  return (
    <QuizProvider>
      <div className="app">
        <TeacherDashboard />
      </div>
    </QuizProvider>
  );
};

export default App;