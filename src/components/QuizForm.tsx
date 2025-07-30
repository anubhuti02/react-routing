import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { Question, Answer } from '../types/quiz';

interface QuizFormData {
  title: string;
  description: string;
  duration: number;
  isPublished: boolean;
  createdBy: string;
  questions: Question[];
}

const QuizForm: React.FC = () => {
  const { createQuiz } = useQuiz();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<QuizFormData>({
    title: '',
    description: '',
    duration: 30,
    isPublished: false,
    createdBy: 'Teacher',
    questions: [],
  });

  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    text: '',
    type: 'multiple-choice',
    points: 1,
    answers: [],
  });

  const [currentAnswer, setCurrentAnswer] = useState({ text: '', isCorrect: false });

  const addAnswer = () => {
    if (currentAnswer.text.trim()) {
      const newAnswer: Answer = {
        id: crypto.randomUUID(),
        text: currentAnswer.text,
        isCorrect: currentAnswer.isCorrect,
      };
      setCurrentQuestion(prev => ({
        ...prev,
        answers: [...(prev.answers || []), newAnswer],
      }));
      setCurrentAnswer({ text: '', isCorrect: false });
    }
  };

  const removeAnswer = (answerId: string) => {
    setCurrentQuestion(prev => ({
      ...prev,
      answers: prev.answers?.filter(answer => answer.id !== answerId) || [],
    }));
  };

  const addQuestion = () => {
    if (currentQuestion.text && (currentQuestion.type === 'short-answer' || (currentQuestion.answers?.length || 0) > 0)) {
      const newQuestion: Question = {
        id: crypto.randomUUID(),
        text: currentQuestion.text,
        type: currentQuestion.type || 'multiple-choice',
        answers: currentQuestion.answers || [],
        points: currentQuestion.points || 1,
      };
      setFormData(prev => ({
        ...prev,
        questions: [...prev.questions, newQuestion],
      }));
      setCurrentQuestion({
        text: '',
        type: 'multiple-choice',
        points: 1,
        answers: [],
      });
    }
  };

  const removeQuestion = (questionId: string) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.questions.length > 0) {
      createQuiz(formData);
      alert('Quiz created successfully!');
      navigate('/');
    } else {
      alert('Please fill in the title and add at least one question.');
    }
  };

  return (
    <div className="quiz-form">
      <h2>Create New Quiz</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Quiz Basic Info */}
        <div className="form-section">
          <h3>Quiz Information</h3>
          <div className="form-group">
            <label htmlFor="title">Quiz Title *</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="duration">Duration (minutes)</label>
            <input
              type="number"
              id="duration"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
              min="1"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="createdBy">Teacher Name</label>
            <input
              type="text"
              id="createdBy"
              value={formData.createdBy}
              onChange={(e) => setFormData(prev => ({ ...prev, createdBy: e.target.value }))}
            />
          </div>
          
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
              />
              Publish immediately
            </label>
          </div>
        </div>

        {/* Question Builder */}
        <div className="form-section">
          <h3>Add Question</h3>
          <div className="form-group">
            <label htmlFor="questionText">Question Text</label>
            <input
              type="text"
              id="questionText"
              value={currentQuestion.text || ''}
              onChange={(e) => setCurrentQuestion(prev => ({ ...prev, text: e.target.value }))}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="questionType">Question Type</label>
            <select
              id="questionType"
              value={currentQuestion.type || 'multiple-choice'}
              onChange={(e) => setCurrentQuestion(prev => ({ 
                ...prev, 
                type: e.target.value as 'multiple-choice' | 'true-false' | 'short-answer'
              }))}
            >
              <option value="multiple-choice">Multiple Choice</option>
              <option value="true-false">True/False</option>
              <option value="short-answer">Short Answer</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="points">Points</label>
            <input
              type="number"
              id="points"
              value={currentQuestion.points || 1}
              onChange={(e) => setCurrentQuestion(prev => ({ ...prev, points: parseInt(e.target.value) }))}
              min="1"
            />
          </div>

          {/* Answer Builder */}
          {currentQuestion.type !== 'short-answer' && (
            <div className="answer-builder">
              <h4>Answers</h4>
              <div className="answer-input">
                <input
                  type="text"
                  placeholder="Answer text"
                  value={currentAnswer.text}
                  onChange={(e) => setCurrentAnswer(prev => ({ ...prev, text: e.target.value }))}
                />
                <label>
                  <input
                    type="checkbox"
                    checked={currentAnswer.isCorrect}
                    onChange={(e) => setCurrentAnswer(prev => ({ ...prev, isCorrect: e.target.checked }))}
                  />
                  Correct answer
                </label>
                <button type="button" onClick={addAnswer}>Add Answer</button>
              </div>
              
              <div className="answers-list">
                {currentQuestion.answers?.map((answer) => (
                  <div key={answer.id} className={`answer-item ${answer.isCorrect ? 'correct' : ''}`}>
                    <span>{answer.text}</span>
                    {answer.isCorrect && <span className="correct-badge">✓</span>}
                    <button type="button" onClick={() => removeAnswer(answer.id)}>Remove</button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <button type="button" onClick={addQuestion} className="add-question-btn">
            Add Question
          </button>
        </div>

        {/* Questions List */}
        {formData.questions.length > 0 && (
          <div className="form-section">
            <h3>Questions ({formData.questions.length})</h3>
            <div className="questions-list">
              {formData.questions.map((question, index) => (
                <div key={question.id} className="question-item">
                  <h4>Question {index + 1}: {question.text}</h4>
                  <p>Type: {question.type} | Points: {question.points}</p>
                  <div className="question-answers">
                    {question.answers.map((answer) => (
                      <div key={answer.id} className={`answer ${answer.isCorrect ? 'correct' : ''}`}>
                        {answer.text} {answer.isCorrect && '✓'}
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => removeQuestion(question.id)}>
                    Remove Question
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button type="submit" className="create-quiz-btn">
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default QuizForm;