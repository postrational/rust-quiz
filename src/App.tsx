import { useState } from 'react';
import { Box, Paper } from '@mui/material';
import './App.css';
import { QuestionData, QuizQuestion } from './components/QuizQuestion';

const questionModules = import.meta.glob<{ default: QuestionData }>('../../data/questions/rust/formatted/*.json', {
  eager: true,
});

export const allQuestions = Object.values(questionModules).map((m) => m.default);

export function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() =>
    Math.floor(Math.random() * allQuestions.length)
  );

  const handleNextQuestion = () => {
    const randomIndex = Math.floor(Math.random() * allQuestions.length);
    setCurrentQuestionIndex(randomIndex);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: { xs: '70%', sm: '70%' },
          minWidth: '1000px',
          minHeight: '400px',
          padding: 3,
        }}
      >
        <QuizQuestion questionData={allQuestions[currentQuestionIndex]} onNextQuestion={handleNextQuestion} />
      </Paper>
    </Box>
  );
}
