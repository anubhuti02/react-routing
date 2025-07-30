import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import TeacherDashboard from './pages/TeacherDashboard';
import CreateQuizPage from './pages/CreateQuizPage';
import './App.css';

const App: React.FC = () => {
  return (
    <QuizProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<TeacherDashboard />} />
            <Route path="/create-quiz" element={<CreateQuizPage />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </Router>
    </QuizProvider>
  );
};

export default App;