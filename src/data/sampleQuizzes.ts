import { Quiz } from '../types';

export const sampleQuizzes: Quiz[] = [
  {
    id: 'quiz-1',
    title: 'Basic Mathematics',
    subject: 'Mathematics',
    description: 'Test your knowledge of basic mathematical operations and concepts.',
    timeLimit: 15,
    createdBy: 'teacher-1',
    createdAt: new Date('2024-01-15'),
    questions: [
      {
        id: 'q1',
        question: 'What is 15 + 27?',
        options: ['40', '41', '42', '43'],
        correctAnswer: 2
      },
      {
        id: 'q2',
        question: 'What is 8 × 7?',
        options: ['54', '55', '56', '57'],
        correctAnswer: 2
      },
      {
        id: 'q3',
        question: 'What is 144 ÷ 12?',
        options: ['11', '12', '13', '14'],
        correctAnswer: 1
      },
      {
        id: 'q4',
        question: 'What is the square root of 64?',
        options: ['6', '7', '8', '9'],
        correctAnswer: 2
      },
      {
        id: 'q5',
        question: 'What is 2³ (2 to the power of 3)?',
        options: ['6', '8', '9', '12'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'quiz-2',
    title: 'World Geography',
    subject: 'Geography',
    description: 'Test your knowledge of countries, capitals, and geographical features.',
    timeLimit: 20,
    createdBy: 'teacher-1',
    createdAt: new Date('2024-01-20'),
    questions: [
      {
        id: 'q6',
        question: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Madrid'],
        correctAnswer: 2
      },
      {
        id: 'q7',
        question: 'Which is the largest continent?',
        options: ['Africa', 'Asia', 'North America', 'Europe'],
        correctAnswer: 1
      },
      {
        id: 'q8',
        question: 'What is the longest river in the world?',
        options: ['Amazon', 'Nile', 'Mississippi', 'Yangtze'],
        correctAnswer: 1
      },
      {
        id: 'q9',
        question: 'Which country has the most natural lakes?',
        options: ['Canada', 'Finland', 'Norway', 'Sweden'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'quiz-3',
    title: 'Basic Science',
    subject: 'Science',
    description: 'Test your knowledge of basic scientific concepts and principles.',
    timeLimit: 25,
    createdBy: 'teacher-2',
    createdAt: new Date('2024-01-25'),
    questions: [
      {
        id: 'q10',
        question: 'What is the chemical symbol for water?',
        options: ['H2O', 'CO2', 'NaCl', 'O2'],
        correctAnswer: 0
      },
      {
        id: 'q11',
        question: 'How many planets are in our solar system?',
        options: ['7', '8', '9', '10'],
        correctAnswer: 1
      },
      {
        id: 'q12',
        question: 'What gas do plants absorb from the atmosphere during photosynthesis?',
        options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
        correctAnswer: 2
      },
      {
        id: 'q13',
        question: 'What is the smallest unit of matter?',
        options: ['Molecule', 'Atom', 'Cell', 'Electron'],
        correctAnswer: 1
      },
      {
        id: 'q14',
        question: 'At what temperature does water boil (in Celsius)?',
        options: ['90°C', '95°C', '100°C', '105°C'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'quiz-4',
    title: 'English Grammar',
    subject: 'English',
    description: 'Test your understanding of English grammar rules and usage.',
    timeLimit: 18,
    createdBy: 'teacher-3',
    createdAt: new Date('2024-02-01'),
    questions: [
      {
        id: 'q15',
        question: 'Which of the following is a proper noun?',
        options: ['city', 'London', 'river', 'mountain'],
        correctAnswer: 1
      },
      {
        id: 'q16',
        question: 'What is the past tense of "go"?',
        options: ['goed', 'went', 'gone', 'going'],
        correctAnswer: 1
      },
      {
        id: 'q17',
        question: 'Which sentence is grammatically correct?',
        options: ['I have ate breakfast', 'I have eaten breakfast', 'I has eaten breakfast', 'I ate have breakfast'],
        correctAnswer: 1
      },
      {
        id: 'q18',
        question: 'What type of word is "quickly"?',
        options: ['Noun', 'Verb', 'Adjective', 'Adverb'],
        correctAnswer: 3
      }
    ]
  }
];

export const loadSampleQuizzes = () => {
  const existing = localStorage.getItem('quizzes');
  if (!existing || JSON.parse(existing).length === 0) {
    localStorage.setItem('quizzes', JSON.stringify(sampleQuizzes));
  }
};