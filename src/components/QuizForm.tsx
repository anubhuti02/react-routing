import React, { useState } from 'react';
// CORRECT: Using type-only imports for types
import type { Question } from '../types/quiz';

interface QuizFormProps {
  onSubmit: (questions: Question[]) => void;
}

export const QuizForm: React.FC<QuizFormProps> = ({ onSubmit }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');

  const addQuestion = () => {
    if (currentQuestion.trim()) {
      const newQuestion: Question = {
        id: Date.now().toString(),
        text: currentQuestion,
        answers: []
      };
      setQuestions([...questions, newQuestion]);
      setCurrentQuestion('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(questions);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="question">Question:</label>
        <input
          id="question"
          type="text"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
        />
        <button type="button" onClick={addQuestion}>
          Add Question
        </button>
      </div>
      <div>
        <h3>Questions ({questions.length})</h3>
        {questions.map((question) => (
          <div key={question.id}>
            <p>{question.text}</p>
          </div>
        ))}
      </div>
      <button type="submit">Submit Quiz</button>
    </form>
  );
};