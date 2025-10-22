import React, { useState } from 'react';
import { useQuiz } from './quizcontext';

interface CreateQuizFormData {
  title: string;
  description: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
    points: number;
  }[];
}

const TeacherDashboard: React.FC = () => {
  const { quizzes, createQuiz, deleteQuiz } = useQuiz();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [formData, setFormData] = useState<CreateQuizFormData>({
    title: '',
    description: '',
    questions: []
  });

  const handleCreateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.questions.length > 0) {
      createQuiz({
        title: formData.title,
        description: formData.description,
        questions: formData.questions.map(q => ({
          ...q,
          id: crypto.randomUUID()
        }))
      });
      setFormData({ title: '', description: '', questions: [] });
      setShowCreateForm(false);
    }
  };

  const handleDeleteQuiz = (quizId: string) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      deleteQuiz(quizId);
    }
  };

  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: '',
          options: ['', '', '', ''],
          correctAnswer: 0,
          points: 1
        }
      ]
    }));
  };

  const updateQuestion = (index: number, field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === index ? { ...q, [field]: value } : q
      )
    }));
  };

  const updateQuestionOption = (questionIndex: number, optionIndex: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === questionIndex 
          ? { ...q, options: q.options.map((opt, oi) => oi === optionIndex ? value : opt) }
          : q
      )
    }));
  };

  const removeQuestion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="teacher-dashboard">
      <div className="dashboard-header">
        <h1>Teacher Dashboard</h1>
        <button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="btn-primary"
        >
          {showCreateForm ? 'Cancel' : 'Create New Quiz'}
        </button>
      </div>

      {showCreateForm && (
        <div className="create-quiz-form">
          <h2>Create New Quiz</h2>
          <form onSubmit={handleCreateQuiz}>
            <div className="form-group">
              <label htmlFor="title">Quiz Title:</label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
              />
            </div>

            <div className="questions-section">
              <div className="questions-header">
                <h3>Questions</h3>
                <button type="button" onClick={addQuestion} className="btn-secondary">
                  Add Question
                </button>
              </div>

              {formData.questions.map((question, qIndex) => (
                <div key={qIndex} className="question-form">
                  <div className="question-header">
                    <h4>Question {qIndex + 1}</h4>
                    <button 
                      type="button" 
                      onClick={() => removeQuestion(qIndex)}
                      className="btn-danger-small"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="form-group">
                    <label>Question Text:</label>
                    <input
                      type="text"
                      value={question.question}
                      onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Options:</label>
                    {question.options.map((option, oIndex) => (
                      <div key={oIndex} className="option-input">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updateQuestionOption(qIndex, oIndex, e.target.value)}
                          placeholder={`Option ${oIndex + 1}`}
                          required
                        />
                        <input
                          type="radio"
                          name={`correct-${qIndex}`}
                          checked={question.correctAnswer === oIndex}
                          onChange={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                        />
                        <label>Correct</label>
                      </div>
                    ))}
                  </div>

                  <div className="form-group">
                    <label>Points:</label>
                    <input
                      type="number"
                      value={question.points}
                      onChange={(e) => updateQuestion(qIndex, 'points', parseInt(e.target.value))}
                      min="1"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">Create Quiz</button>
              <button type="button" onClick={() => setShowCreateForm(false)} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="quizzes-list">
        <h2>Your Quizzes ({quizzes.length})</h2>
        {quizzes.length === 0 ? (
          <p className="no-quizzes">No quizzes created yet. Create your first quiz above!</p>
        ) : (
          <div className="quizzes-grid">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="quiz-card">
                <div className="quiz-card-header">
                  <h3>{quiz.title}</h3>
                                     <div className="quiz-actions">
                     <button 
                       onClick={() => handleDeleteQuiz(quiz.id)}
                       className="btn-danger-small"
                     >
                       Delete
                     </button>
                   </div>
                </div>
                <p className="quiz-description">{quiz.description}</p>
                <div className="quiz-meta">
                  <span className="question-count">{quiz.questions.length} questions</span>
                  <span className="created-date">
                    Created: {quiz.createdAt.toLocaleDateString()}
                  </span>
                  {quiz.updatedAt.getTime() !== quiz.createdAt.getTime() && (
                    <span className="updated-date">
                      Updated: {quiz.updatedAt.toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;