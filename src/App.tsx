import { useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import './App.css';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizStats } from './components/QuizStats';
import { allQuestions, questionIds } from './questions';
import { useQuizStore } from './store/quizStore';

function getUnansweredQuestions(answeredQuestions: string[]): string[] {
  return questionIds.filter((id) => !answeredQuestions.includes(id));
}

function getIncorrectlyAnsweredQuestions(answeredQuestions: string[], correctQuestions: string[]): string[] {
  return answeredQuestions.filter((id) => !correctQuestions.includes(id));
}

export function App() {
  const answeredQuestions = useQuizStore((state) => state.answeredQuestions);
  const correctQuestions = useQuizStore((state) => state.correctQuestions);
  const resetProgress = useQuizStore((state) => state.resetProgress);

  const selectNextQuestion = () => {
    const unanswered = getUnansweredQuestions(answeredQuestions);
    const incorrect = getIncorrectlyAnsweredQuestions(answeredQuestions, correctQuestions);

    // Prioritize unanswered questions
    if (unanswered.length > 0) {
      return unanswered[Math.floor(Math.random() * unanswered.length)];
    }

    // Then show incorrectly answered questions
    if (incorrect.length > 0) {
      return incorrect[Math.floor(Math.random() * incorrect.length)];
    }

    // All questions answered correctly - return null
    return null;
  };

  const [currentQuestionId, setCurrentQuestionId] = useState(() => selectNextQuestion() ?? questionIds[0]);

  const handleNextQuestion = () => {
    const nextId = selectNextQuestion();
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
