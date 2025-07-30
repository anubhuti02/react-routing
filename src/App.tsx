import { QuizProvider } from './quizcontext'
import TeacherDashboard from './pages/TeacherDashboard'

function App() {
  return (
    <QuizProvider>
      <div className="App">
        <TeacherDashboard />
      </div>
    </QuizProvider>
  )
}

export default App