import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import QuizCreator from './QuizCreator';

const TeacherDashboard: React.FC = () => {
  const { currentUser, quizzes, logout } = useApp();
  const [showQuizCreator, setShowQuizCreator] = useState(false);

  const myQuizzes = quizzes.filter(quiz => quiz.createdBy === currentUser?.id);

  const handleLogout = () => {
    logout();
  };

  if (showQuizCreator) {
    return (
      <QuizCreator onClose={() => setShowQuizCreator(false)} />
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Teacher Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {currentUser?.name}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="action-section">
          <button 
            onClick={() => setShowQuizCreator(true)}
            className="create-quiz-btn"
          >
            Create New Quiz
          </button>
        </div>

        <div className="quizzes-section">
          <h2>My Quizzes ({myQuizzes.length})</h2>
          
          {myQuizzes.length === 0 ? (
            <div className="empty-state">
              <p>You haven't created any quizzes yet.</p>
              <p>Click "Create New Quiz" to get started!</p>
            </div>
          ) : (
            <div className="quiz-grid">
              {myQuizzes.map((quiz) => (
                <div key={quiz.id} className="quiz-card">
                  <h3>{quiz.title}</h3>
                  <p className="quiz-subject">Subject: {quiz.subject}</p>
                  <p className="quiz-description">{quiz.description}</p>
                  <div className="quiz-details">
                    <span className="question-count">
                      {quiz.questions.length} questions
                    </span>
                    <span className="time-limit">
                      {quiz.timeLimit} minutes
                    </span>
                  </div>
                  <div className="quiz-date">
                    Created: {new Date(quiz.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;