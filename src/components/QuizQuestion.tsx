import { Box, Button, Typography } from '@mui/material';
import { MarkdownBlock } from './MarkdownBlock';

interface QuestionData {
  question: string;
  answers: [string, string, string, string];
  correct_answer: 0 | 1 | 2 | 3;
  expected_output: string[];
  explanation: string;
}

export function QuizQuestion({ questionData }: { questionData: QuestionData }) {
  const labels = ['A', 'B', 'C', 'D'];

  return (
    <>
      <Typography variant="h4">Quiz Game</Typography>

      <MarkdownBlock>{questionData.question}</MarkdownBlock>

      <Box sx={{ marginTop: 3 }}>
        {questionData.answers.map((answer, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              marginBottom: 2,
            }}
          >
            <Button variant="outlined" sx={{ minWidth: 50 }}>
              {labels[index]}
            </Button>
            <MarkdownBlock>{answer}</MarkdownBlock>
          </Box>
        ))}
      </Box>

      <MarkdownBlock>{questionData.explanation}</MarkdownBlock>
    </>
  );
}
