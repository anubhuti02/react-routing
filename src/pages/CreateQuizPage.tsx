import React from 'react';
import { Link } from 'react-router-dom';
import QuizForm from '../components/QuizForm';

const CreateQuizPage: React.FC = () => {
  return (
    <div className="create-quiz-page">
      <div className="page-header">
        <Link to="/" className="back-link">
          ← Back to Dashboard
        </Link>
      </div>
      <QuizForm />
    </div>
  );
};

export default CreateQuizPage;