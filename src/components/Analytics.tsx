import React, { useState } from 'react'

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7days')

  const performanceData = [
    { subject: 'Mathematics', avgScore: 78, attempts: 145, improvement: 5.2 },
    { subject: 'Science', avgScore: 82, attempts: 132, improvement: 3.1 },
    { subject: 'History', avgScore: 75, attempts: 98, improvement: -1.3 },
    { subject: 'English', avgScore: 88, attempts: 167, improvement: 7.8 },
    { subject: 'Geography', avgScore: 71, attempts: 89, improvement: 2.4 }
  ]

  const weeklyData = [
    { day: 'Mon', quizzes: 23, students: 45 },
    { day: 'Tue', quizzes: 31, students: 52 },
    { day: 'Wed', quizzes: 28, students: 48 },
    { day: 'Thu', quizzes: 35, students: 61 },
    { day: 'Fri', quizzes: 42, students: 73 },
    { day: 'Sat', quizzes: 18, students: 32 },
    { day: 'Sun', quizzes: 15, students: 28 }
  ]

  const topPerformers = [
    { name: 'Jane Smith', score: 95, quizzes: 12 },
    { name: 'Alex Johnson', score: 92, quizzes: 15 },
    { name: 'Emily Davis', score: 90, quizzes: 10 },
    { name: 'Michael Brown', score: 88, quizzes: 14 },
    { name: 'Sarah Wilson', score: 87, quizzes: 13 }
  ]

  const getImprovementIcon = (improvement: number) => {
    if (improvement > 0) return '📈'
    if (improvement < 0) return '📉'
    return '➡️'
  }

  const getImprovementColor = (improvement: number) => {
    if (improvement > 0) return 'improvement-positive'
    if (improvement < 0) return 'improvement-negative'
    return 'improvement-neutral'
  }

  return (
    <div className="analytics">
      <div className="analytics-header">
        <div className="time-range-selector">
          <button 
            className={`time-btn ${timeRange === '7days' ? 'active' : ''}`}
            onClick={() => setTimeRange('7days')}
          >
            Last 7 Days
          </button>
          <button 
            className={`time-btn ${timeRange === '30days' ? 'active' : ''}`}
            onClick={() => setTimeRange('30days')}
          >
            Last 30 Days
          </button>
          <button 
            className={`time-btn ${timeRange === '90days' ? 'active' : ''}`}
            onClick={() => setTimeRange('90days')}
          >
            Last 3 Months
          </button>
        </div>
        
        <button className="export-btn secondary">
          📤 Export Report
        </button>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Subject Performance</h3>
          <div className="subject-performance">
            {performanceData.map(subject => (
              <div key={subject.subject} className="subject-item">
                <div className="subject-header">
                  <span className="subject-name">{subject.subject}</span>
                  <span className={`improvement ${getImprovementColor(subject.improvement)}`}>
                    {getImprovementIcon(subject.improvement)} {Math.abs(subject.improvement)}%
                  </span>
                </div>
                <div className="subject-metrics">
                  <div className="metric">
                    <span className="metric-label">Avg Score</span>
                    <span className="metric-value">{subject.avgScore}%</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Attempts</span>
                    <span className="metric-value">{subject.attempts}</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${subject.avgScore}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-card">
          <h3>Weekly Activity</h3>
          <div className="chart-container">
            <div className="bar-chart">
              {weeklyData.map(day => (
                <div key={day.day} className="bar-group">
                  <div className="bars">
                    <div 
                      className="bar quizzes"
                      style={{ height: `${(day.quizzes / 50) * 100}%` }}
                      title={`${day.quizzes} quizzes`}
                    ></div>
                    <div 
                      className="bar students"
                      style={{ height: `${(day.students / 80) * 100}%` }}
                      title={`${day.students} students`}
                    ></div>
                  </div>
                  <span className="bar-label">{day.day}</span>
                </div>
              ))}
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color quizzes"></span>
                <span>Quizzes</span>
              </div>
              <div className="legend-item">
                <span className="legend-color students"></span>
                <span>Students</span>
              </div>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Top Performers</h3>
          <div className="top-performers">
            {topPerformers.map((student, index) => (
              <div key={student.name} className="performer-item">
                <div className="rank">{index + 1}</div>
                <div className="performer-info">
                  <div className="performer-name">{student.name}</div>
                  <div className="performer-stats">
                    {student.score}% avg • {student.quizzes} quizzes
                  </div>
                </div>
                <div className="performance-badge">
                  {index === 0 && '🥇'}
                  {index === 1 && '🥈'}
                  {index === 2 && '🥉'}
                  {index > 2 && '⭐'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-card">
          <h3>Quiz Completion Rates</h3>
          <div className="completion-stats">
            <div className="completion-item">
              <div className="completion-header">
                <span>Mathematics</span>
                <span>78%</span>
              </div>
              <div className="completion-bar">
                <div className="completion-fill" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div className="completion-item">
              <div className="completion-header">
                <span>Science</span>
                <span>85%</span>
              </div>
              <div className="completion-bar">
                <div className="completion-fill" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="completion-item">
              <div className="completion-header">
                <span>History</span>
                <span>65%</span>
              </div>
              <div className="completion-bar">
                <div className="completion-fill" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div className="completion-item">
              <div className="completion-header">
                <span>English</span>
                <span>92%</span>
              </div>
              <div className="completion-bar">
                <div className="completion-fill" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Performance Insights</h3>
          <div className="insights">
            <div className="insight-item positive">
              <div className="insight-icon">📈</div>
              <div className="insight-content">
                <h4>Improving Trend</h4>
                <p>English quiz scores improved by 7.8% this week</p>
              </div>
            </div>
            <div className="insight-item warning">
              <div className="insight-icon">⚠️</div>
              <div className="insight-content">
                <h4>Needs Attention</h4>
                <p>History quiz completion rate dropped to 65%</p>
              </div>
            </div>
            <div className="insight-item info">
              <div className="insight-icon">💡</div>
              <div className="insight-content">
                <h4>Recommendation</h4>
                <p>Consider adding more practice questions for Mathematics</p>
              </div>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Response Time Analysis</h3>
          <div className="response-time-stats">
            <div className="time-stat">
              <span className="time-label">Average Response Time</span>
              <span className="time-value">2.3 min</span>
            </div>
            <div className="time-stat">
              <span className="time-label">Fastest Response</span>
              <span className="time-value">45 sec</span>
            </div>
            <div className="time-stat">
              <span className="time-label">Most Common Time</span>
              <span className="time-value">1.8 min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics