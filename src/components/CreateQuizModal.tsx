import React, { useState } from 'react'

interface CreateQuizModalProps {
  onClose: () => void
  onCreateQuiz: (quizData: NewQuizData) => void
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

const CreateQuizModal: React.FC<CreateQuizModalProps> = ({ onClose, onCreateQuiz }) => {
  console.log('CreateQuizModal rendered with props:', { onClose: typeof onClose, onCreateQuiz: typeof onCreateQuiz })
  
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

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string>('')

  const handleQuizDataChange = (field: string, value: string | number) => {
    console.log('Quiz data changed:', field, value)
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
    console.log('Adding question:', currentQuestion)
    if (currentQuestion.question.trim() && currentQuestion.options.every(opt => opt.trim())) {
      const newQuestion: Question = {
        id: Date.now().toString(),
        question: currentQuestion.question.trim(),
        options: currentQuestion.options.map(opt => opt.trim()),
        correctAnswer: currentQuestion.correctAnswer
      }
      setQuestions(prev => {
        const updated = [...prev, newQuestion]
        console.log('Questions updated:', updated)
        return updated
      })
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submit button clicked!')
    console.log('Current quiz data:', quizData)
    console.log('Current questions:', questions)
    
    setError('')
    
    // Validate required fields
    if (!quizData.title.trim()) {
      setError('Please enter a quiz title')
      return
    }
    
    if (!quizData.subject) {
      setError('Please select a subject')
      return
    }
    
    if (questions.length === 0) {
      setError('Please add at least one question')
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare the quiz data
      const newQuizData: NewQuizData = {
        title: quizData.title.trim(),
        subject: quizData.subject,
        description: quizData.description.trim(),
        duration: quizData.duration,
        passingScore: quizData.passingScore,
        questions: questions
      }

      console.log('Calling onCreateQuiz with:', newQuizData)
      
      // Call the parent's onCreateQuiz function
      if (typeof onCreateQuiz === 'function') {
        onCreateQuiz(newQuizData)
        console.log('onCreateQuiz called successfully!')
      } else {
        console.error('onCreateQuiz is not a function:', onCreateQuiz)
        setError('Error: Invalid onCreateQuiz function')
        return
      }
      
    } catch (error) {
      console.error('Error creating quiz:', error)
      setError('Error creating quiz. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = quizData.title.trim() && quizData.subject && questions.length > 0

  console.log('Form validity:', { 
    title: quizData.title.trim(), 
    subject: quizData.subject, 
    questionsCount: questions.length,
    isValid: isFormValid 
  })

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create New Quiz</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div className="error-message" style={{ 
                background: 'rgba(239, 68, 68, 0.1)', 
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#ef4444',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}>
                {error}
              </div>
            )}
            
            <div className="quiz-form">
              <div className="form-section">
                <h3>Quiz Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Quiz Title *</label>
                    <input
                      type="text"
                      value={quizData.title}
                      onChange={(e) => handleQuizDataChange('title', e.target.value)}
                      placeholder="Enter quiz title"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Subject *</label>
                    <select
                      value={quizData.subject}
                      onChange={(e) => handleQuizDataChange('subject', e.target.value)}
                      required
                    >
                      <option value="">Select Subject</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science</option>
                      <option value="History">History</option>
                      <option value="English">English</option>
                      <option value="Geography">Geography</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Biology">Biology</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Physics">Physics</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={quizData.description}
                    onChange={(e) => handleQuizDataChange('description', e.target.value)}
                    placeholder="Brief description of the quiz (optional)"
                    rows={3}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Duration (minutes)</label>
                    <input
                      type="number"
                      value={quizData.duration}
                      onChange={(e) => handleQuizDataChange('duration', parseInt(e.target.value) || 30)}
                      min="5"
                      max="180"
                    />
                  </div>
                  <div className="form-group">
                    <label>Passing Score (%)</label>
                    <input
                      type="number"
                      value={quizData.passingScore}
                      onChange={(e) => handleQuizDataChange('passingScore', parseInt(e.target.value) || 70)}
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Add Questions ({questions.length} added)</h3>
                <div className="question-form">
                  <div className="form-group">
                    <label>Question *</label>
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
                          Option {index + 1} {currentQuestion.correctAnswer === index && '(Correct)'}
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
                    type="button"
                    className="add-question-btn"
                    onClick={addQuestion}
                    disabled={!currentQuestion.question.trim() || !currentQuestion.options.every(opt => opt.trim())}
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
                          <span className="question-number">Q{index + 1}.</span>
                          <span className="question-text">{question.question}</span>
                          <button 
                            type="button"
                            className="remove-btn"
                            onClick={() => removeQuestion(question.id)}
                            title="Remove question"
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
                              {String.fromCharCode(65 + optIndex)}. {option}
                              {optIndex === question.correctAnswer && ' ✓'}
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
            <button 
              type="button" 
              className="btn secondary" 
              onClick={onClose} 
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="btn primary"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Quiz'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateQuizModal