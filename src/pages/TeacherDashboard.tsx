import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { Link } from 'react-router-dom';

const TeacherDashboard: React.FC = () => {
  const { quizzes, deleteQuiz } = useQuiz();

  const handleDeleteQuiz = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteQuiz(id);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="teacher-dashboard">
      <div className="dashboard-header">
        <h1>Teacher Dashboard</h1>
        <Link to="/create-quiz" className="create-quiz-link">
          <button className="create-quiz-btn">Create New Quiz</button>
        </Link>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Quizzes</h3>
          <p className="stat-number">{quizzes.length}</p>
        </div>
        <div className="stat-card">
          <h3>Published</h3>
          <p className="stat-number">{quizzes.filter(q => q.isPublished).length}</p>
        </div>
        <div className="stat-card">
          <h3>Drafts</h3>
          <p className="stat-number">{quizzes.filter(q => !q.isPublished).length}</p>
        </div>
      </div>

      <div className="quizzes-section">
        <h2>Your Quizzes</h2>
        
        {quizzes.length === 0 ? (
          <div className="empty-state">
            <h3>No quizzes yet</h3>
            <p>Create your first quiz to get started!</p>
            <Link to="/create-quiz">
              <button className="create-quiz-btn">Create Your First Quiz</button>
            </Link>
          </div>
        ) : (
          <div className="quizzes-grid">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="quiz-card">
                <div className="quiz-header">
                  <h3>{quiz.title}</h3>
                  <span className={`status-badge ${quiz.isPublished ? 'published' : 'draft'}`}>
                    {quiz.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
                
                <p className="quiz-description">{quiz.description}</p>
                
                <div className="quiz-details">
                  <div className="detail-item">
                    <span className="label">Questions:</span>
                    <span className="value">{quiz.questions.length}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Duration:</span>
                    <span className="value">{quiz.duration} min</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Total Points:</span>
                    <span className="value">
                      {quiz.questions.reduce((sum, q) => sum + q.points, 0)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Created:</span>
                    <span className="value">{formatDate(quiz.createdAt)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Updated:</span>
                    <span className="value">{formatDate(quiz.updatedAt)}</span>
                  </div>
                </div>

                <div className="quiz-questions-preview">
                  <h4>Questions Preview:</h4>
                  {quiz.questions.slice(0, 3).map((question, index) => (
                    <div key={question.id} className="question-preview">
                      <span className="question-number">{index + 1}.</span>
                      <span className="question-text">{question.text}</span>
                      <span className="question-type">({question.type})</span>
                    </div>
                  ))}
                  {quiz.questions.length > 3 && (
                    <p className="more-questions">
                      +{quiz.questions.length - 3} more questions
                    </p>
                  )}
                </div>

                <div className="quiz-actions">
                  <Link to={`/quiz/${quiz.id}`}>
                    <button className="action-btn view-btn">View</button>
                  </Link>
                  <Link to={`/edit-quiz/${quiz.id}`}>
                    <button className="action-btn edit-btn">Edit</button>
                  </Link>
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => handleDeleteQuiz(quiz.id, quiz.title)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;