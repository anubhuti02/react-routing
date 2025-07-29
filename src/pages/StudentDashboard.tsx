import React from 'react'
import { Link } from 'react-router-dom'

const StudentDashboard: React.FC = () => {
  return (
    <div className="dashboard-page">
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="nav-title">QuickQuiz</h1>
          <div className="nav-buttons">
            <Link to="/" className="nav-btn">Home</Link>
            <Link to="/teacher-dashboard" className="nav-btn">Teacher View</Link>
          </div>
        </div>
      </nav>
      
      <main className="dashboard-content">
        <div className="dashboard-card">
          <h2>Dashboard</h2>
          <p>Welcome to your dashboard! Here you can manage your quizzes and view your progress.</p>
        </div>
      </main>
    </div>
  )
}

export default StudentDashboard