import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Quiz } from '../types';

interface StudentDashboardProps {
  onTakeQuiz: (quiz: Quiz) => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ onTakeQuiz }) => {
  const { currentUser, quizzes, getQuizAttempts, logout } = useApp();
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  const subjects = ['all', ...new Set(quizzes.map(quiz => quiz.subject))];
  const filteredQuizzes = selectedSubject === 'all' 
    ? quizzes 
    : quizzes.filter(quiz => quiz.subject === selectedSubject);

  const userAttempts = getQuizAttempts(currentUser!.id);
  const attemptedQuizIds = new Set(userAttempts.map(attempt => attempt.quizId));

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Student Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {currentUser?.name}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="stats-section">
          <div className="stat-card">
            <h3>Available Quizzes</h3>
            <p className="stat-number">{quizzes.length}</p>
          </div>
          <div className="stat-card">
            <h3>Completed Quizzes</h3>
            <p className="stat-number">{userAttempts.length}</p>
          </div>
          <div className="stat-card">
            <h3>Average Score</h3>
            <p className="stat-number">
              {userAttempts.length > 0 
                ? Math.round(userAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / userAttempts.length)
                : 0}%
            </p>
          </div>
        </div>

        <div className="filter-section">
          <h2>Browse Quizzes</h2>
          <div className="subject-filter">
            <label htmlFor="subject-select">Filter by Subject:</label>
            <select
              id="subject-select"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject === 'all' ? 'All Subjects' : subject}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="quizzes-section">
          {filteredQuizzes.length === 0 ? (
            <div className="empty-state">
              <p>No quizzes available{selectedSubject !== 'all' ? ` for ${selectedSubject}` : ''}.</p>
            </div>
          ) : (
            <div className="quiz-grid">
              {filteredQuizzes.map((quiz) => {
                const isCompleted = attemptedQuizIds.has(quiz.id);
                const userAttempt = userAttempts.find(attempt => attempt.quizId === quiz.id);
                
                return (
                  <div key={quiz.id} className={`quiz-card ${isCompleted ? 'completed' : ''}`}>
                    <div className="quiz-header">
                      <h3>{quiz.title}</h3>
                      {isCompleted && (
                        <div className="completion-badge">
                          ✓ Completed
                        </div>
                      )}
                    </div>
                    
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
                    
                    {isCompleted && userAttempt && (
                      <div className="attempt-details">
                        <div className="score">Score: {userAttempt.score}%</div>
                        <div className="completed-date">
                          Completed: {new Date(userAttempt.completedAt).toLocaleDateString()}
                        </div>
                      </div>
                    )}
                    
                    <div className="quiz-actions">
                      <button
                        onClick={() => onTakeQuiz(quiz)}
                        className={`take-quiz-btn ${isCompleted ? 'retake' : ''}`}
                      >
                        {isCompleted ? 'Retake Quiz' : 'Take Quiz'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {userAttempts.length > 0 && (
          <div className="recent-attempts">
            <h2>Recent Quiz Attempts</h2>
            <div className="attempts-list">
              {userAttempts
                .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
                .slice(0, 5)
                .map((attempt) => {
                  const quiz = quizzes.find(q => q.id === attempt.quizId);
                  return (
                    <div key={attempt.id} className="attempt-item">
                      <div className="attempt-info">
                        <h4>{quiz?.title || 'Unknown Quiz'}</h4>
                        <p>{quiz?.subject}</p>
                      </div>
                      <div className="attempt-score">
                        <span className="score">{attempt.score}%</span>
                        <span className="date">
                          {new Date(attempt.completedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;