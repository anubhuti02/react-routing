import React, { useState } from 'react'

interface Quiz {
  id: string
  title: string
  subject: string
  questions: number
  duration: number
  status: 'active' | 'draft' | 'archived'
  attempts: number
  averageScore: number
  createdAt: string
}

const QuizList: React.FC = () => {
  const [quizzes] = useState<Quiz[]>([
    {
      id: '1',
      title: 'Mathematics - Algebra Basics',
      subject: 'Mathematics',
      questions: 15,
      duration: 30,
      status: 'active',
      attempts: 45,
      averageScore: 78,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Science - Physics Laws',
      subject: 'Science',
      questions: 20,
      duration: 45,
      status: 'active',
      attempts: 32,
      averageScore: 82,
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      title: 'History - World War II',
      subject: 'History',
      questions: 12,
      duration: 25,
      status: 'draft',
      attempts: 0,
      averageScore: 0,
      createdAt: '2024-01-20'
    }
  ])

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

  return (
    <div className="quiz-list">
      <div className="quiz-list-header">
        <div className="quiz-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Quizzes
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={`filter-btn ${filter === 'draft' ? 'active' : ''}`}
            onClick={() => setFilter('draft')}
          >
            Drafts
          </button>
          <button 
            className={`filter-btn ${filter === 'archived' ? 'active' : ''}`}
            onClick={() => setFilter('archived')}
          >
            Archived
          </button>
        </div>
        <button className="create-quiz-btn primary">
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
              <button className="action-btn secondary">📝 Edit</button>
              <button className="action-btn secondary">📊 View Results</button>
              <button className="action-btn secondary">👥 Assign</button>
              <button className="action-btn danger">🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>

      {filteredQuizzes.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No quizzes found</h3>
          <p>Create your first quiz to get started!</p>
          <button className="create-quiz-btn primary">
            ➕ Create New Quiz
          </button>
        </div>
      )}
    </div>
  )
}

export default QuizList