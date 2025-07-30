import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { Quiz, QuizAttempt, QuizState } from '../types';

interface QuizTakerProps {
  quiz: Quiz;
  onComplete: (attempt: QuizAttempt) => void;
  onExit: () => void;
}

const QuizTaker: React.FC<QuizTakerProps> = ({ quiz, onComplete, onExit }) => {
  const { currentUser, addQuizAttempt } = useApp();
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: new Array(quiz.questions.length).fill(-1),
    timeRemaining: quiz.timeLimit * 60, // convert minutes to seconds
    isCompleted: false,
  });
  const [startTime] = useState(Date.now());

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const calculateScore = useCallback(() => {
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (quizState.answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    return Math.round((correctAnswers / quiz.questions.length) * 100);
  }, [quiz.questions, quizState.answers]);

  const completeQuiz = useCallback(() => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const score = calculateScore();
    
    const attempt: QuizAttempt = {
      id: Date.now().toString(),
      quizId: quiz.id,
      studentId: currentUser!.id,
      answers: quizState.answers,
      score,
      completedAt: new Date(),
      timeSpent,
    };

    addQuizAttempt(attempt);
    setQuizState(prev => ({ ...prev, isCompleted: true }));
    onComplete(attempt);
  }, [quiz.id, currentUser, quizState.answers, addQuizAttempt, onComplete, startTime, calculateScore]);

  // Timer using setInterval as requested
  useEffect(() => {
    if (quizState.isCompleted) return;

    const timer = setInterval(() => {
      setQuizState(prev => {
        if (prev.timeRemaining <= 1) {
          // Time's up - auto-complete the quiz
          setTimeout(completeQuiz, 0);
          return { ...prev, timeRemaining: 0 };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizState.isCompleted, completeQuiz]);

  const handleAnswerSelect = (answerIndex: number) => {
    setQuizState(prev => ({
      ...prev,
      answers: prev.answers.map((answer, index) => 
        index === prev.currentQuestionIndex ? answerIndex : answer
      )
    }));
  };

  const goToNextQuestion = () => {
    if (quizState.currentQuestionIndex < quiz.questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    }
  };

  const goToPreviousQuestion = () => {
    if (quizState.currentQuestionIndex > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1
      }));
    }
  };

  const handleSubmitQuiz = () => {
    const unansweredQuestions = quizState.answers.filter(answer => answer === -1).length;
    
    if (unansweredQuestions > 0) {
      const confirm = window.confirm(
        `You have ${unansweredQuestions} unanswered question(s). Are you sure you want to submit?`
      );
      if (!confirm) return;
    }
    
    completeQuiz();
  };

  const currentQuestion = quiz.questions[quizState.currentQuestionIndex];
  const currentAnswer = quizState.answers[quizState.currentQuestionIndex];
  const progress = ((quizState.currentQuestionIndex + 1) / quiz.questions.length) * 100;

  if (quizState.isCompleted) {
    return null; // Parent component will handle showing results
  }

  return (
    <div className="quiz-taker-container">
      <div className="quiz-header">
        <div className="quiz-info">
          <h1>{quiz.title}</h1>
          <p>{quiz.subject}</p>
        </div>
        
        <div className="quiz-controls">
          <div className={`timer ${quizState.timeRemaining <= 60 ? 'warning' : ''}`}>
            <span className="timer-icon">⏱️</span>
            <span className="time">{formatTime(quizState.timeRemaining)}</span>
          </div>
          
          <button onClick={onExit} className="exit-btn">
            Exit Quiz
          </button>
        </div>
      </div>

      <div className="quiz-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="progress-text">
          Question {quizState.currentQuestionIndex + 1} of {quiz.questions.length}
        </span>
      </div>

      <div className="question-container">
        <div className="question-header">
          <h2>Question {quizState.currentQuestionIndex + 1}</h2>
        </div>
        
        <div className="question-content">
          <p className="question-text">{currentQuestion.question}</p>
          
          <div className="options-container">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`option ${currentAnswer === index ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(index)}
              >
                <div className="option-radio">
                  <input
                    type="radio"
                    name="answer"
                    checked={currentAnswer === index}
                    onChange={() => handleAnswerSelect(index)}
                  />
                </div>
                <div className="option-text">
                  <span className="option-label">{String.fromCharCode(65 + index)}.</span>
                  <span className="option-content">{option}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="question-navigation">
        <div className="nav-buttons">
          <button
            onClick={goToPreviousQuestion}
            disabled={quizState.currentQuestionIndex === 0}
            className="nav-btn prev-btn"
          >
            ← Previous
          </button>
          
          {quizState.currentQuestionIndex === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmitQuiz}
              className="submit-btn"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={goToNextQuestion}
              className="nav-btn next-btn"
            >
              Next →
            </button>
          )}
        </div>

        <div className="question-overview">
          <h3>Questions Overview</h3>
          <div className="question-grid">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                className={`question-btn ${
                  index === quizState.currentQuestionIndex ? 'current' : ''
                } ${quizState.answers[index] !== -1 ? 'answered' : 'unanswered'}`}
                onClick={() => setQuizState(prev => ({ 
                  ...prev, 
                  currentQuestionIndex: index 
                }))}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizTaker;