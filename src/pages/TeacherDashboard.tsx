import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import QuizList from '../components/QuizList'
import CreateQuizModal from '../components/CreateQuizModal'
import StudentManagement from '../components/StudentManagement'
import Analytics from '../components/Analytics'

const TeacherDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />
      case 'quizzes':
        return <QuizList />
      case 'students':
        return <StudentManagement />
      case 'analytics':
        return <Analytics />
      default:
        return <DashboardOverview />
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
              📝 Quizzes
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
          </div>
          <div className="content-body">
            {renderTabContent()}
          </div>
        </main>
      </div>

      {showCreateModal && (
        <CreateQuizModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  )
}

const DashboardOverview: React.FC = () => {
  return (
    <div className="overview-section">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>Total Quizzes</h3>
            <p className="stat-number">12</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Total Students</h3>
            <p className="stat-number">156</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Completed Attempts</h3>
            <p className="stat-number">432</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Average Score</h3>
            <p className="stat-number">78%</p>
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
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn primary">
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