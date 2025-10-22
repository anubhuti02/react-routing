import { QuizProvider } from './context/quizContext';
import { QuizForm } from './components/QuizForm';
import type { Question } from './types/quiz';

function App() {
  const handleQuizSubmit = (questions: Question[]) => {
    console.log('Quiz submitted:', questions);
  };

  return (
    <QuizProvider>
      <div style={{ padding: '20px' }}>
        <h1>Quiz App</h1>
        <QuizForm onSubmit={handleQuizSubmit} />
      </div>
    </QuizProvider>
  );
}

export default App;