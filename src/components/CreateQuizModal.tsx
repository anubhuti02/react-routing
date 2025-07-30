import React, { useState } from 'react'

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

interface CreateQuizModalProps {
  onClose: () => void
  onCreateQuiz: (quizData: NewQuizData) => void
}

const CreateQuizModal: React.FC<CreateQuizModalProps> = ({ onClose, onCreateQuiz }) => {
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState(30)
  const [passingScore, setPassingScore] = useState(70)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const quizData: NewQuizData = {
      title,
      subject,
      description,
      duration,
      passingScore,
      questions: [] // Simplified for now
    }
    onCreateQuiz(quizData)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Quiz</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Duration (minutes)"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            required
          />
          <input
            type="number"
            placeholder="Passing Score (%)"
            value={passingScore}
            onChange={(e) => setPassingScore(Number(e.target.value))}
            required
          />
          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Create Quiz</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateQuizModal