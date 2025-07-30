import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Quiz, Question } from '../types';

interface QuizCreatorProps {
  onClose: () => void;
}

const SUBJECTS = [
  'Mathematics', 'Science', 'History', 'Geography', 'English', 
  'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Economics'
];

const QuizCreator: React.FC<QuizCreatorProps> = ({ onClose }) => {
  const { currentUser, addQuiz } = useApp();
  const [quizData, setQuizData] = useState({
    title: '',
    subject: '',
    description: '',
    timeLimit: 30,
  });
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
  });

  const handleQuizDataChange = (field: string, value: string | number) => {
    setQuizData(prev => ({ ...prev, [field]: value }));
  };

  const handleQuestionChange = (field: string, value: string | number) => {
    setCurrentQuestion(prev => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (index: number, value: string) => {
    setCurrentQuestion(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => i === index ? value : opt)
    }));
  };

  const addQuestion = () => {
    if (currentQuestion.question.trim() && currentQuestion.options.every(opt => opt.trim())) {
      const newQuestion: Question = {
        id: Date.now().toString(),
        question: currentQuestion.question.trim(),
        options: currentQuestion.options.map(opt => opt.trim()),
        correctAnswer: currentQuestion.correctAnswer,
      };
      
      setQuestions(prev => [...prev, newQuestion]);
      setCurrentQuestion({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
      });
    }
  };

  const removeQuestion = (index: number) => {
    setQuestions(prev => prev.filter((_, i) => i !== index));
  };

  const createQuiz = () => {
    if (quizData.title.trim() && quizData.subject && quizData.description.trim() && questions.length > 0) {
      const newQuiz: Quiz = {
        id: Date.now().toString(),
        title: quizData.title.trim(),
        subject: quizData.subject,
        description: quizData.description.trim(),
        questions,
        timeLimit: quizData.timeLimit,
        createdBy: currentUser!.id,
        createdAt: new Date(),
      };
      
      addQuiz(newQuiz);
      onClose();
    }
  };

  return (
    <div className="quiz-creator-container">
      <div className="quiz-creator-header">
        <h1>Create New Quiz</h1>
        <button onClick={onClose} className="close-btn">×</button>
      </div>

      <div className="quiz-creator-content">
        <div className="quiz-info-section">
          <h2>Quiz Information</h2>
          
          <div className="form-group">
            <label htmlFor="title">Quiz Title:</label>
            <input
              type="text"
              id="title"
              value={quizData.title}
              onChange={(e) => handleQuizDataChange('title', e.target.value)}
              placeholder="Enter quiz title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <select
              id="subject"
              value={quizData.subject}
              onChange={(e) => handleQuizDataChange('subject', e.target.value)}
              required
            >
              <option value="">Select a subject</option>
              {SUBJECTS.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={quizData.description}
              onChange={(e) => handleQuizDataChange('description', e.target.value)}
              placeholder="Enter quiz description"
              rows={3}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="timeLimit">Time Limit (minutes):</label>
            <input
              type="number"
              id="timeLimit"
              value={quizData.timeLimit}
              onChange={(e) => handleQuizDataChange('timeLimit', parseInt(e.target.value))}
              min="1"
              max="180"
              required
            />
          </div>
        </div>

        <div className="questions-section">
          <h2>Questions ({questions.length})</h2>
          
          <div className="question-form">
            <h3>Add New Question</h3>
            
            <div className="form-group">
              <label htmlFor="question">Question:</label>
              <textarea
                id="question"
                value={currentQuestion.question}
                onChange={(e) => handleQuestionChange('question', e.target.value)}
                placeholder="Enter your question"
                rows={2}
                required
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
                    Option {index + 1}:
                  </label>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Enter option ${index + 1}`}
                    required
                  />
                </div>
              ))}
            </div>

            <button onClick={addQuestion} className="add-question-btn">
              Add Question
            </button>
          </div>

          <div className="questions-list">
            {questions.map((question, index) => (
              <div key={question.id} className="question-item">
                <div className="question-header">
                  <h4>Question {index + 1}</h4>
                  <button onClick={() => removeQuestion(index)} className="remove-btn">
                    Remove
                  </button>
                </div>
                <p className="question-text">{question.question}</p>
                <div className="options-list">
                  {question.options.map((option, optIndex) => (
                    <div 
                      key={optIndex} 
                      className={`option ${optIndex === question.correctAnswer ? 'correct' : ''}`}
                    >
                      {optIndex + 1}. {option}
                      {optIndex === question.correctAnswer && ' ✓'}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="quiz-creator-actions">
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button 
            onClick={createQuiz} 
            className="create-btn"
            disabled={!quizData.title || !quizData.subject || !quizData.description || questions.length === 0}
          >
            Create Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizCreator;