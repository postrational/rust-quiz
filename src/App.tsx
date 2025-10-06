import { useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import './App.css';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizStats } from './components/QuizStats';
import { allQuestions, questionIds, selectNextQuestion } from './questions';
import { useQuizStore } from './store/quizStore';

export function App() {
  const answeredQuestions = useQuizStore((state) => state.answeredQuestions);
  const correctQuestions = useQuizStore((state) => state.correctQuestions);
  const resetProgress = useQuizStore((state) => state.resetProgress);

  const [currentQuestionId, setCurrentQuestionId] = useState(
    () => selectNextQuestion(answeredQuestions, correctQuestions) ?? questionIds[0],
  );

  const handleNextQuestion = () => {
    const nextId = selectNextQuestion(answeredQuestions, correctQuestions);
    if (nextId) {
      setCurrentQuestionId(nextId);
    }
  };

  const handlePlayAgain = () => {
    resetProgress();
    setCurrentQuestionId(questionIds[Math.floor(Math.random() * questionIds.length)]);
  };

  const allQuestionsCorrect = correctQuestions.length === questionIds.length;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: { xs: 0, sm: 2 },
      }}
    >
      <Box
        sx={{
          width: {
            xs: '100%',
            sm: '100%',
            md: '100%',
            lg: '1000px',
          },
          maxWidth: '1000px',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            minHeight: '400px',
            padding: { xs: 1, sm: 3 },
          }}
        >
          <Typography variant="h4" gutterBottom>Rust Quiz</Typography>

          <QuizStats />

          {allQuestionsCorrect ? (
            <Box sx={{ textAlign: 'center', marginTop: 4 }}>
              <Typography variant="h5" color="success.main" gutterBottom>
                🎉 Congratulations!
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 3 }}>
                You have answered all questions correctly!
              </Typography>
              <Button variant="contained" size="large" onClick={handlePlayAgain}>
                Play Again
              </Button>
            </Box>
          ) : (
            <QuizQuestion
              questionData={allQuestions[currentQuestionId]}
              questionId={currentQuestionId}
              onNextQuestion={handleNextQuestion}
            />
          )}
        </Paper>
      </Box>
    </Box>
  );
}
