import React from 'react'

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
  onUpdateStatus: (quizId: string, status: 'active' | 'draft' | 'archived') => void
  onDeleteQuiz: (quizId: string) => void
}

const QuizList: React.FC<QuizListProps> = ({ quizzes, onCreateQuiz, onUpdateStatus, onDeleteQuiz }) => {
  return (
    <div className="quiz-list">
      <h3>Quiz List ({quizzes.length})</h3>
      {quizzes.map(quiz => (
        <div key={quiz.id} className="quiz-item">
          <h4>{quiz.title}</h4>
          <p>{quiz.description}</p>
          <span>Status: {quiz.status}</span>
          <button onClick={() => onUpdateStatus(quiz.id, 'active')}>Activate</button>
          <button onClick={() => onDeleteQuiz(quiz.id)}>Delete</button>
        </div>
      ))}
      <button onClick={onCreateQuiz}>Create New Quiz</button>
    </div>
  )
}

export default QuizList