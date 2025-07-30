import React from 'react';
import { Quiz, QuizAttempt } from '../types';

interface QuizResultsProps {
  quiz: Quiz;
  attempt: QuizAttempt;
  onBackToDashboard: () => void;
  onRetakeQuiz: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ 
  quiz, 
  attempt, 
  onBackToDashboard, 
  onRetakeQuiz 
}) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return '#22c55e'; // green
    if (score >= 60) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const getScoreMessage = (score: number): string => {
    if (score >= 90) return 'Excellent! Outstanding performance!';
    if (score >= 80) return 'Great job! Well done!';
    if (score >= 70) return 'Good work! Keep it up!';
    if (score >= 60) return 'Not bad! Room for improvement.';
    return 'Keep practicing! You can do better next time.';
  };

  const correctAnswers = attempt.answers.filter((answer, index) => 
    answer === quiz.questions[index].correctAnswer
  ).length;

  return (
    <div className="quiz-results-container">
      <div className="results-header">
        <h1>Quiz Completed!</h1>
        <div className="quiz-info">
          <h2>{quiz.title}</h2>
          <p className="subject">{quiz.subject}</p>
        </div>
      </div>

      <div className="score-section">
        <div className="score-circle" style={{ borderColor: getScoreColor(attempt.score) }}>
          <div className="score-number" style={{ color: getScoreColor(attempt.score) }}>
            {attempt.score}%
          </div>
          <div className="score-label">Your Score</div>
        </div>
        
        <div className="score-message">
          <p className="message-text">{getScoreMessage(attempt.score)}</p>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-item">
          <div className="stat-label">Questions Answered</div>
          <div className="stat-value">{correctAnswers} / {quiz.questions.length}</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-label">Time Spent</div>
          <div className="stat-value">{formatTime(attempt.timeSpent)}</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-label">Completed On</div>
          <div className="stat-value">
            {new Date(attempt.completedAt).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="review-section">
        <h3>Review Your Answers</h3>
        <div className="questions-review">
          {quiz.questions.map((question, index) => {
            const userAnswer = attempt.answers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            const wasAnswered = userAnswer !== -1;
            
            return (
              <div key={question.id} className={`review-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="question-number">
                  <span className="number">{index + 1}</span>
                  <span className={`status ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {isCorrect ? '✓' : '✗'}
                  </span>
                </div>
                
                <div className="question-content">
                  <p className="question-text">{question.question}</p>
                  
                  <div className="options-review">
                    {question.options.map((option, optIndex) => {
                      let className = 'option-review';
                      
                      if (optIndex === question.correctAnswer) {
                        className += ' correct-answer';
                      }
                      
                      if (optIndex === userAnswer && !isCorrect) {
                        className += ' user-wrong-answer';
                      }
                      
                      if (optIndex === userAnswer && isCorrect) {
                        className += ' user-correct-answer';
                      }
                      
                      return (
                        <div key={optIndex} className={className}>
                          <span className="option-label">
                            {String.fromCharCode(65 + optIndex)}.
                          </span>
                          <span className="option-text">{option}</span>
                          {optIndex === question.correctAnswer && (
                            <span className="correct-indicator">✓ Correct</span>
                          )}
                          {optIndex === userAnswer && userAnswer !== question.correctAnswer && (
                            <span className="wrong-indicator">Your answer</span>
                          )}
                        </div>
                      );
                    })}
                    
                    {!wasAnswered && (
                      <div className="no-answer">
                        <span className="no-answer-text">No answer selected</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="actions-section">
        <button onClick={onBackToDashboard} className="back-btn">
          Back to Dashboard
        </button>
        <button onClick={onRetakeQuiz} className="retake-btn">
          Retake Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizResults;