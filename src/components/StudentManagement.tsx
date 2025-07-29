import React, { useState } from 'react'

interface Student {
  id: string
  name: string
  email: string
  enrolledDate: string
  quizzesCompleted: number
  averageScore: number
  lastActivity: string
  status: 'active' | 'inactive'
}

const StudentManagement: React.FC = () => {
  const [students] = useState<Student[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      enrolledDate: '2024-01-15',
      quizzesCompleted: 8,
      averageScore: 85,
      lastActivity: '2024-01-25',
      status: 'active'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      enrolledDate: '2024-01-10',
      quizzesCompleted: 12,
      averageScore: 92,
      lastActivity: '2024-01-24',
      status: 'active'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      enrolledDate: '2024-01-20',
      quizzesCompleted: 5,
      averageScore: 78,
      lastActivity: '2024-01-22',
      status: 'active'
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      enrolledDate: '2024-01-08',
      quizzesCompleted: 15,
      averageScore: 88,
      lastActivity: '2024-01-20',
      status: 'inactive'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredStudents = students
    .filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === 'all' || student.status === filterStatus
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'score':
          return b.averageScore - a.averageScore
        case 'quizzes':
          return b.quizzesCompleted - a.quizzesCompleted
        case 'enrolled':
          return new Date(b.enrolledDate).getTime() - new Date(a.enrolledDate).getTime()
        default:
          return 0
      }
    })

  const getStatusBadge = (status: string) => {
    return status === 'active' ? 'status-badge active' : 'status-badge inactive'
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'score-excellent'
    if (score >= 80) return 'score-good'
    if (score >= 70) return 'score-average'
    return 'score-poor'
  }

  return (
    <div className="student-management">
      <div className="student-management-header">
        <div className="search-and-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search students by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filters">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="name">Sort by Name</option>
              <option value="score">Sort by Score</option>
              <option value="quizzes">Sort by Quizzes</option>
              <option value="enrolled">Sort by Enrolled Date</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Students</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
        </div>
        
        <button className="add-student-btn primary">
          ➕ Add Student
        </button>
      </div>

      <div className="students-table">
        <div className="table-header">
          <div className="header-cell">Student</div>
          <div className="header-cell">Status</div>
          <div className="header-cell">Quizzes Completed</div>
          <div className="header-cell">Average Score</div>
          <div className="header-cell">Last Activity</div>
          <div className="header-cell">Actions</div>
        </div>
        
        <div className="table-body">
          {filteredStudents.map(student => (
            <div key={student.id} className="table-row">
              <div className="student-info">
                <div className="student-avatar">
                  {student.name.charAt(0).toUpperCase()}
                </div>
                <div className="student-details">
                  <div className="student-name">{student.name}</div>
                  <div className="student-email">{student.email}</div>
                </div>
              </div>
              
              <div className="cell">
                <span className={getStatusBadge(student.status)}>
                  {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                </span>
              </div>
              
              <div className="cell">
                <span className="quiz-count">{student.quizzesCompleted}</span>
              </div>
              
              <div className="cell">
                <span className={`score ${getScoreColor(student.averageScore)}`}>
                  {student.averageScore}%
                </span>
              </div>
              
              <div className="cell">
                <span className="last-activity">
                  {new Date(student.lastActivity).toLocaleDateString()}
                </span>
              </div>
              
              <div className="cell actions">
                <button className="action-btn secondary small">👁️ View</button>
                <button className="action-btn secondary small">📊 Results</button>
                <button className="action-btn secondary small">✉️ Message</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredStudents.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <h3>No students found</h3>
          <p>Try adjusting your search or filter criteria.</p>
        </div>
      )}

      <div className="student-stats">
        <div className="stat-summary">
          <div className="summary-item">
            <span className="summary-number">{students.length}</span>
            <span className="summary-label">Total Students</span>
          </div>
          <div className="summary-item">
            <span className="summary-number">{students.filter(s => s.status === 'active').length}</span>
            <span className="summary-label">Active Students</span>
          </div>
          <div className="summary-item">
            <span className="summary-number">
              {Math.round(students.reduce((acc, s) => acc + s.averageScore, 0) / students.length)}%
            </span>
            <span className="summary-label">Overall Average</span>
          </div>
          <div className="summary-item">
            <span className="summary-number">
              {students.reduce((acc, s) => acc + s.quizzesCompleted, 0)}
            </span>
            <span className="summary-label">Total Quiz Attempts</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentManagement