import React from 'react'
import { Link } from 'react-router-dom'

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="nav-title">QuickQuiz</h1>
          <div className="nav-buttons">
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/register" className="nav-btn">Register</Link>
          </div>
        </div>
      </nav>
      
      <main className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Test Your Knowledge</h1>
          <p className="hero-subtitle">
            Take fun, fast, and interactive quizzes to challenge yourself across various topics.
          </p>
          <div className="hero-buttons">
            <Link to="/student-dashboard" className="start-quiz-btn">Start Quiz</Link>
            <Link to="/teacher-dashboard" className="teacher-btn">Teacher Dashboard</Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage