import { Box, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import shuffle from 'lodash/shuffle';
import { useMemo, useState } from 'react';
import { MarkdownBlock } from './MarkdownBlock';
import { QuestionData } from '../questions';
import { useQuizStore } from '../store/quizStore';

const shuffleAnswers = (answers: string[], correctIndex: number): [string[], number] => {
  const indexed = answers.map((answer, index) => ({ answer, index }));
  const shuffled = shuffle(indexed);

  const shuffledAnswers = shuffled.map((item: { answer: string; index: number }) => item.answer);
  const newCorrectIndex = shuffled.findIndex((item: { answer: string; index: number }) => item.index === correctIndex);

  return [shuffledAnswers, newCorrectIndex];
};

interface QuizQuestionProps {
  questionData: QuestionData;
  questionId: string;
  onNextQuestion: () => void;
}

export function QuizQuestion({ questionData, questionId, onNextQuestion }: QuizQuestionProps) {
  const labels = ['A', 'B', 'C', 'D'];
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const recordAnswer = useQuizStore((state) => state.recordAnswer);

  const [shuffledAnswers, correctAnswerIndex] = useMemo(
    () => shuffleAnswers(questionData.answers, questionData.correct_answer),
    [questionData],
  );

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
    const isCorrect = index === correctAnswerIndex;
    recordAnswer(questionId, isCorrect);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    onNextQuestion();
  };

  return (
    <>
      <MarkdownBlock>{questionData.question}</MarkdownBlock>

      <Box sx={{ marginTop: 3 }}>
        {shuffledAnswers.map((answer, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              marginBottom: 2,
              padding: '0 10px',
              border:
                selectedAnswer === index
                  ? index === correctAnswerIndex
                    ? '2px solid green'
                    : '2px solid red'
                  : '2px solid transparent',
            }}
          >
            <Button
              variant="outlined"
              sx={{ minWidth: 50 }}
              onClick={() => handleAnswerClick(index)}
              disabled={selectedAnswer !== null}
            >
              {labels[index]}
            </Button>
            <MarkdownBlock>{answer}</MarkdownBlock>
          </Box>
        ))}
      </Box>

      {selectedAnswer !== null && (
        <Box sx={{ marginTop: 3 }}>
          {selectedAnswer === correctAnswerIndex ? (
            <Typography variant="h6" color="success.main">
              🎉 Correct! Well done!
            </Typography>
          ) : (
            <Typography variant="h6" color="error.main">
              ❌ Incorrect. The correct answer is {labels[correctAnswerIndex]}.
            </Typography>
          )}

          <MarkdownBlock>{questionData.explanation}</MarkdownBlock>

          <Box sx={{ marginTop: 2, textAlign: 'right' }}>
            <Typography
              component="a"
              href={`https://github.com/postrational/rust-quiz/blob/main/questions/${questionId}.yaml`}
              target="_blank"
              rel="noopener noreferrer"
              variant="body2"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              <EditIcon fontSize="small" />
              Edit on GitHub
            </Typography>
          </Box>

          <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" onClick={handleNextQuestion}>
              Next Question
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}
