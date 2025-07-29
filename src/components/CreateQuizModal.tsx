import React, { useState } from 'react'

interface CreateQuizModalProps {
  onClose: () => void
}

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
}

const CreateQuizModal: React.FC<CreateQuizModalProps> = ({ onClose }) => {
  const [quizData, setQuizData] = useState({
    title: '',
    subject: '',
    description: '',
    duration: 30,
    passingScore: 70
  })

  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0
  })

  const handleQuizDataChange = (field: string, value: string | number) => {
    setQuizData(prev => ({ ...prev, [field]: value }))
  }

  const handleQuestionChange = (field: string, value: string | number) => {
    setCurrentQuestion(prev => ({ ...prev, [field]: value }))
  }

  const handleOptionChange = (index: number, value: string) => {
    setCurrentQuestion(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => i === index ? value : opt)
    }))
  }

  const addQuestion = () => {
    if (currentQuestion.question && currentQuestion.options.every(opt => opt.trim())) {
      const newQuestion: Question = {
        id: Date.now().toString(),
        ...currentQuestion
      }
      setQuestions(prev => [...prev, newQuestion])
      setCurrentQuestion({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0
      })
    }
  }

  const removeQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id))
  }

  const handleSubmit = () => {
    if (quizData.title && quizData.subject && questions.length > 0) {
      // Here you would typically send the data to your backend
      console.log('Quiz Data:', { ...quizData, questions })
      onClose()
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create New Quiz</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="quiz-form">
            <div className="form-section">
              <h3>Quiz Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Quiz Title</label>
                  <input
                    type="text"
                    value={quizData.title}
                    onChange={(e) => handleQuizDataChange('title', e.target.value)}
                    placeholder="Enter quiz title"
                  />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <select
                    value={quizData.subject}
                    onChange={(e) => handleQuizDataChange('subject', e.target.value)}
                  >
                    <option value="">Select Subject</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="History">History</option>
                    <option value="English">English</option>
                    <option value="Geography">Geography</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={quizData.description}
                  onChange={(e) => handleQuizDataChange('description', e.target.value)}
                  placeholder="Brief description of the quiz"
                  rows={3}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Duration (minutes)</label>
                  <input
                    type="number"
                    value={quizData.duration}
                    onChange={(e) => handleQuizDataChange('duration', parseInt(e.target.value))}
                    min="5"
                    max="180"
                  />
                </div>
                <div className="form-group">
                  <label>Passing Score (%)</label>
                  <input
                    type="number"
                    value={quizData.passingScore}
                    onChange={(e) => handleQuizDataChange('passingScore', parseInt(e.target.value))}
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Add Questions</h3>
              <div className="question-form">
                <div className="form-group">
                  <label>Question</label>
                  <input
                    type="text"
                    value={currentQuestion.question}
                    onChange={(e) => handleQuestionChange('question', e.target.value)}
                    placeholder="Enter your question"
                  />
                </div>

                <div className="options-grid">
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="option-group">
                      <label>
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={currentQuestion.correctAnswer === index}
                          onChange={() => handleQuestionChange('correctAnswer', index)}
                        />
                        Option {index + 1}
                      </label>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Enter option ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>

                <button 
                  className="add-question-btn"
                  onClick={addQuestion}
                  disabled={!currentQuestion.question || !currentQuestion.options.every(opt => opt.trim())}
                >
                  ➕ Add Question
                </button>
              </div>

              {questions.length > 0 && (
                <div className="questions-list">
                  <h4>Added Questions ({questions.length})</h4>
                  {questions.map((question, index) => (
                    <div key={question.id} className="question-item">
                      <div className="question-header">
                        <span className="question-number">{index + 1}.</span>
                        <span className="question-text">{question.question}</span>
                        <button 
                          className="remove-btn"
                          onClick={() => removeQuestion(question.id)}
                        >
                          🗑️
                        </button>
                      </div>
                      <div className="question-options">
                        {question.options.map((option, optIndex) => (
                          <span 
                            key={optIndex} 
                            className={`option ${optIndex === question.correctAnswer ? 'correct' : ''}`}
                          >
                            {option}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn secondary" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="btn primary"
            onClick={handleSubmit}
            disabled={!quizData.title || !quizData.subject || questions.length === 0}
          >
            Create Quiz
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateQuizModal