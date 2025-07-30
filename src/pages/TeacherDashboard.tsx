import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import QuizList from '../components/QuizList'
import CreateQuizModal from '../components/CreateQuizModal'
import StudentManagement from '../components/StudentManagement'
import Analytics from '../components/Analytics'

// Define types
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

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
}

interface NewQuizData {
  title: string
  subject: string
  description: string
  duration: number
  passingScore: number
  questions: Question[]
}

const TeacherDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [showCreateModal, setShowCreateModal] = useState(false)
  
  // Initialize with mock data
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: '1',
      title: 'Mathematics - Algebra Basics',
      subject: 'Mathematics',
      description: 'Test your understanding of basic algebraic concepts',
      questions: 15,
      duration: 30,
      passingScore: 70,
      status: 'active',
      attempts: 45,
      averageScore: 78,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Science - Physics Laws',
      subject: 'Science',
      description: 'Fundamental laws of physics',
      questions: 20,
      duration: 45,
      passingScore: 75,
      status: 'active',
      attempts: 32,
      averageScore: 82,
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      title: 'History - World War II',
      subject: 'History',
      description: 'Major events and consequences of WWII',
      questions: 12,
      duration: 25,
      passingScore: 70,
      status: 'draft',
      attempts: 0,
      averageScore: 0,
      createdAt: '2024-01-20'
    }
  ])

  // Function to create a new quiz
  const handleCreateQuiz = (newQuizData: NewQuizData) => {
    const newQuiz: Quiz = {
      id: Date.now().toString(), // Generate unique ID
      title: newQuizData.title,
      subject: newQuizData.subject,
      description: newQuizData.description,
      questions: newQuizData.questions.length,
      duration: newQuizData.duration,
      passingScore: newQuizData.passingScore,
      status: 'draft', // New quizzes start as draft
      attempts: 0,
      averageScore: 0,
      createdAt: new Date().toISOString().split('T')[0] // Current date
    }

    // Add the new quiz to the list
    setQuizzes(prevQuizzes => [newQuiz, ...prevQuizzes])
    
    // Close the modal
    setShowCreateModal(false)
    
    // Switch to quizzes tab to show the newly created quiz
    setActiveTab('quizzes')
    
    // You would typically also save this to your backend here
    console.log('New quiz created:', newQuiz)
    console.log('Quiz questions:', newQuizData.questions)
  }

  // Function to update quiz status
  const handleUpdateQuizStatus = (quizId: string, newStatus: 'active' | 'draft' | 'archived') => {
    setQuizzes(prevQuizzes =>
      prevQuizzes.map(quiz =>
        quiz.id === quizId ? { ...quiz, status: newStatus } : quiz
      )
    )
  }

  // Function to delete a quiz
  const handleDeleteQuiz = (quizId: string) => {
    if (window.confirm('Are you sure you want to delete this quiz? This action cannot be undone.')) {
      setQuizzes(prevQuizzes => prevQuizzes.filter(quiz => quiz.id !== quizId))
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview quizzes={quizzes} onCreateQuiz={() => setShowCreateModal(true)} />
      case 'quizzes':
        return (
          <QuizList 
            quizzes={quizzes}
            onCreateQuiz={() => setShowCreateModal(true)}
            onUpdateStatus={handleUpdateQuizStatus}
            onDeleteQuiz={handleDeleteQuiz}
          />
        )
      case 'students':
        return <StudentManagement />
      case 'analytics':
        return <Analytics />
      default:
        return <DashboardOverview quizzes={quizzes} onCreateQuiz={() => setShowCreateModal(true)} />
    }
  }

  return (
    <div className="teacher-dashboard">
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="nav-title">QuickQuiz - Teacher Portal</h1>
          <div className="nav-buttons">
            <Link to="/" className="nav-btn">Home</Link>
            <Link to="/student-dashboard" className="nav-btn">Student View</Link>
            <button className="nav-btn logout-btn">Logout</button>
          </div>
        </div>
      </nav>
      
      <div className="dashboard-layout">
        <aside className="sidebar">
          <div className="sidebar-header">
            <h3>Teacher Dashboard</h3>
          </div>
          <nav className="sidebar-nav">
            <button 
              className={`sidebar-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              📊 Overview
            </button>
            <button 
              className={`sidebar-btn ${activeTab === 'quizzes' ? 'active' : ''}`}
              onClick={() => setActiveTab('quizzes')}
            >
              📝 Quizzes ({quizzes.length})
            </button>
            <button 
              className={`sidebar-btn ${activeTab === 'students' ? 'active' : ''}`}
              onClick={() => setActiveTab('students')}
            >
              👥 Students
            </button>
            <button 
              className={`sidebar-btn ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              📈 Analytics
            </button>
          </nav>
          <div className="sidebar-actions">
            <button 
              className="create-quiz-btn"
              onClick={() => setShowCreateModal(true)}
            >
              ➕ Create New Quiz
            </button>
          </div>
        </aside>
        
        <main className="main-content">
          <div className="content-header">
            <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
            {activeTab === 'quizzes' && (
              <div className="header-actions">
                <button 
                  className="create-quiz-btn primary"
                  onClick={() => setShowCreateModal(true)}
                >
                  ➕ Create New Quiz
                </button>
              </div>
            )}
          </div>
          <div className="content-body">
            {renderTabContent()}
          </div>
        </main>
      </div>

      {showCreateModal && (
        <CreateQuizModal 
          onClose={() => setShowCreateModal(false)}
          onCreateQuiz={handleCreateQuiz}
        />
      )}
    </div>
  )
}

interface DashboardOverviewProps {
  quizzes: Quiz[]
  onCreateQuiz: () => void
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ quizzes, onCreateQuiz }) => {
  // Calculate dynamic statistics
  const totalQuizzes = quizzes.length
  const activeQuizzes = quizzes.filter(q => q.status === 'active').length
  const totalAttempts = quizzes.reduce((sum, quiz) => sum + quiz.attempts, 0)
  const averageScore = quizzes.length > 0 
    ? Math.round(quizzes.reduce((sum, quiz) => sum + quiz.averageScore, 0) / quizzes.length)
    : 0

  return (
    <div className="overview-section">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>Total Quizzes</h3>
            <p className="stat-number">{totalQuizzes}</p>
            <small className="stat-detail">{activeQuizzes} active</small>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Total Students</h3>
            <p className="stat-number">156</p>
            <small className="stat-detail">+5 this week</small>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Total Attempts</h3>
            <p className="stat-number">{totalAttempts}</p>
            <small className="stat-detail">Across all quizzes</small>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Average Score</h3>
            <p className="stat-number">{averageScore}%</p>
            <small className="stat-detail">Overall performance</small>
          </div>
        </div>
      </div>

      <div className="recent-activities">
        <h3>Recent Activities</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">📝</div>
            <div className="activity-content">
              <p><strong>Math Quiz Chapter 5</strong> was completed by <strong>John Doe</strong></p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">👥</div>
            <div className="activity-content">
              <p><strong>5 new students</strong> enrolled in your course</p>
              <span className="activity-time">4 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">📊</div>
            <div className="activity-content">
              <p><strong>Science Quiz</strong> average score improved to <strong>85%</strong></p>
              <span className="activity-time">1 day ago</span>
            </div>
          </div>
          {quizzes.length > 0 && (
            <div className="activity-item">
              <div className="activity-icon">➕</div>
              <div className="activity-content">
                <p><strong>Latest Quiz:</strong> {quizzes[0].title}</p>
                <span className="activity-time">{new Date(quizzes[0].createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn primary" onClick={onCreateQuiz}>
            ➕ Create New Quiz
          </button>
          <button className="action-btn secondary">
            📤 Export Results
          </button>
          <button className="action-btn secondary">
            👥 Manage Students
          </button>
          <button className="action-btn secondary">
            📊 View Reports
          </button>
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard