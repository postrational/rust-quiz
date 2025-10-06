import { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import './App.css';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizStats } from './components/QuizStats';
import { allQuestions, questionIds } from './questions';

export function App() {
  const [currentQuestionId, setCurrentQuestionId] = useState(
    () => questionIds[Math.floor(Math.random() * questionIds.length)],
  );

  const handleNextQuestion = () => {
    const randomId = questionIds[Math.floor(Math.random() * questionIds.length)];
    setCurrentQuestionId(randomId);
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
      <Box sx={{ width: { xs: '70%', sm: '70%' }, minWidth: '1000px' }}>
        <Paper
          elevation={3}
          sx={{
            minHeight: '400px',
            padding: 3,
          }}
        >
          <Typography variant="h4">Quiz Game</Typography>

          <QuizStats />

          <QuizQuestion
            questionData={allQuestions[currentQuestionId]}
            questionId={currentQuestionId}
            onNextQuestion={handleNextQuestion}
          />
        </Paper>
      </Box>
    </Box>
  );
}
