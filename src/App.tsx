import { useState } from 'react';
import { Box, Paper } from '@mui/material';
import './App.css';
import { QuestionData, QuizQuestion } from './components/QuizQuestion';

const questionModules = import.meta.glob<{ default: QuestionData }>('../../data/questions/rust/formatted/*.json', {
  eager: true,
});

// Extract basename without extension (e.g., "../../path/q001.json" -> "q001")
function getQuestionId(path: string): string {
  const filename = path.split('/').pop() || '';
  return filename.replace('.json', '');
}

// Build dictionary of questions keyed by ID (filename without extension)
export const allQuestions: Record<string, QuestionData> = {};
for (const [path, module] of Object.entries(questionModules)) {
  const questionId = getQuestionId(path);
  allQuestions[questionId] = module.default;
}

export const questionIds = Object.keys(allQuestions);

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
      <Paper
        elevation={3}
        sx={{
          width: { xs: '70%', sm: '70%' },
          minWidth: '1000px',
          minHeight: '400px',
          padding: 3,
        }}
      >
        <QuizQuestion
          questionData={allQuestions[currentQuestionId]}
          questionId={currentQuestionId}
          onNextQuestion={handleNextQuestion}
        />
      </Paper>
    </Box>
  );
}
