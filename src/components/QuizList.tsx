import React, { useState } from 'react'

interface Quiz {
  id: string
  title: string
  subject: string
  description: string
  questions: number
  duration: number
  passingScore: number
  status: 'active' | 'draft' | 'archived'
  attempts: number
  averageScore: number
  createdAt: string
}

interface QuizListProps {
  quizzes: Quiz[]
  onCreateQuiz: () => void
  onUpdateStatus: (quizId: string, newStatus: 'active' | 'draft' | 'archived') => void
  onDeleteQuiz: (quizId: string) => void
}

const QuizList: React.FC<QuizListProps> = ({ 
  quizzes, 
  onCreateQuiz, 
  onUpdateStatus, 
  onDeleteQuiz 
}) => {
  const [filter, setFilter] = useState('all')

  const filteredQuizzes = quizzes.filter(quiz => {
    if (filter === 'all') return true
    return quiz.status === filter
  })

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      active: 'status-badge active',
      draft: 'status-badge draft',
      archived: 'status-badge archived'
    }
    return statusClasses[status as keyof typeof statusClasses] || 'status-badge'
  }

  const handleStatusChange = (quizId: string, currentStatus: string) => {
    let newStatus: 'active' | 'draft' | 'archived'
    
    if (currentStatus === 'draft') {
      newStatus = 'active'
    } else if (currentStatus === 'active') {
      newStatus = 'archived'
    } else {
      newStatus = 'draft'
    }
    
    onUpdateStatus(quizId, newStatus)
  }

  const getStatusActionText = (status: string) => {
    switch (status) {
      case 'draft': return 'Activate'
      case 'active': return 'Archive'
      case 'archived': return 'Reactivate'
      default: return 'Update'
    }
  }

  return (
    <div className="quiz-list">
      <div className="quiz-list-header">
        <div className="quiz-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Quizzes ({quizzes.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active ({quizzes.filter(q => q.status === 'active').length})
          </button>
          <button 
            className={`filter-btn ${filter === 'draft' ? 'active' : ''}`}
            onClick={() => setFilter('draft')}
          >
            Drafts ({quizzes.filter(q => q.status === 'draft').length})
          </button>
          <button 
            className={`filter-btn ${filter === 'archived' ? 'active' : ''}`}
            onClick={() => setFilter('archived')}
          >
            Archived ({quizzes.filter(q => q.status === 'archived').length})
          </button>
        </div>
        <button className="create-quiz-btn primary" onClick={onCreateQuiz}>
          ➕ Create New Quiz
        </button>
      </div>

      <div className="quiz-grid">
        {filteredQuizzes.map(quiz => (
          <div key={quiz.id} className="quiz-card">
            <div className="quiz-card-header">
              <h3>{quiz.title}</h3>
              <span className={getStatusBadge(quiz.status)}>
                {quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
              </span>
            </div>
            
            <div className="quiz-card-body">
              {quiz.description && (
                <p className="quiz-description">{quiz.description}</p>
              )}
              
              <div className="quiz-meta">
                <div className="meta-item">
                  <span className="meta-label">Subject:</span>
                  <span className="meta-value">{quiz.subject}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Questions:</span>
                  <span className="meta-value">{quiz.questions}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Duration:</span>
                  <span className="meta-value">{quiz.duration} min</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Passing Score:</span>
                  <span className="meta-value">{quiz.passingScore}%</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Created:</span>
                  <span className="meta-value">{new Date(quiz.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="quiz-stats">
                <div className="stat-item">
                  <span className="stat-number">{quiz.attempts}</span>
                  <span className="stat-label">Attempts</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{quiz.averageScore}%</span>
                  <span className="stat-label">Avg Score</span>
                </div>
              </div>
            </div>

            <div className="quiz-card-actions">
              <button className="action-btn secondary small">📝 Edit</button>
              <button className="action-btn secondary small">📊 Results</button>
              <button 
                className="action-btn secondary small"
                onClick={() => handleStatusChange(quiz.id, quiz.status)}
              >
                {quiz.status === 'draft' && '🚀'}
                {quiz.status === 'active' && '📦'}
                {quiz.status === 'archived' && '🔄'}
                {' ' + getStatusActionText(quiz.status)}
              </button>
              <button className="action-btn secondary small">👥 Assign</button>
              <button 
                className="action-btn danger small"
                onClick={() => onDeleteQuiz(quiz.id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredQuizzes.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No quizzes found</h3>
          {filter === 'all' ? (
            <p>Create your first quiz to get started!</p>
          ) : (
            <p>No {filter} quizzes available. Try changing the filter or create a new quiz.</p>
          )}
          <button className="create-quiz-btn primary" onClick={onCreateQuiz}>
            ➕ Create New Quiz
          </button>
        </div>
      )}
    </div>
  )
}

export default QuizList