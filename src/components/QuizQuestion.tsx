import { Box, Button, Typography, useTheme, Theme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import shuffle from 'lodash/shuffle';
import { useMemo, useState } from 'react';
import { MarkdownBlock } from './MarkdownBlock';
import { QuestionData } from '../questions';
import { useQuizStore } from '../store/quizStore';

const shuffleAnswers = (answers: string[], correctIndex: number): [string[], number] => {
  const indexed = answers.map((answer, index) => ({ answer, index }));
  const shuffled = shuffle(indexed);

  const shuffledAnswers = shuffled.map((item) => item.answer);
  const newCorrectIndex = shuffled.findIndex((item) => item.index === correctIndex);

  return [shuffledAnswers, newCorrectIndex];
};

const getStyles = (theme: Theme) => ({
  answerBox: (isAnswered: boolean, isSelected: boolean, isCorrect: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    marginBottom: 2,
    padding: '0 10px',
    border: isSelected
      ? isCorrect
        ? `2px solid ${theme.palette.success.main}`
        : `2px solid ${theme.palette.error.main}`
      : '2px solid transparent',
    cursor: isAnswered ? 'default' : 'pointer',
    ...(!isAnswered && {
      '&:hover': {
        backgroundColor: 'action.hover',
      },
    }),
  }),
  editLink: {
    color: 'primary.main',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 0.5,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

interface QuizQuestionProps {
  questionData: QuestionData;
  questionId: string;
  onNextQuestion: () => void;
}

export function QuizQuestion({ questionData, questionId, onNextQuestion }: QuizQuestionProps) {
  const styles = getStyles(useTheme());
  const labels = ['A', 'B', 'C', 'D'];
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const recordAnswer = useQuizStore((state) => state.recordAnswer);

  const [shuffledAnswers, correctAnswer] = useMemo(
    () => shuffleAnswers(questionData.answers, questionData.correct_answer),
    [questionData],
  );

  const handleAnswerClick = (index: number) => {
    const isCorrect = index === correctAnswer;
    setSelectedAnswer(index);
    recordAnswer(questionId, isCorrect);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    onNextQuestion();
  };

  const isAnswered = selectedAnswer !== null;

  return (
    <>
      <MarkdownBlock>{questionData.question}</MarkdownBlock>

      <Box sx={{ marginTop: 3 }}>
        {shuffledAnswers.map((answer, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = correctAnswer === index;

          return (
            <Box
              key={index}
              onClick={() => !isAnswered && handleAnswerClick(index)}
              sx={styles.answerBox(isAnswered, isSelected, isCorrect)}
            >
              <Button
                variant="outlined"
                sx={{ minWidth: 50 }}
                onClick={() => handleAnswerClick(index)}
                disabled={isAnswered}
              >
                {labels[index]}
              </Button>
              <MarkdownBlock>{answer}</MarkdownBlock>
            </Box>
          );
        })}
      </Box>

      {isAnswered && (
        <Box sx={{ marginTop: 3 }}>
          {selectedAnswer === correctAnswer ? (
            <Typography variant="h6" color="success.main">
              🎉 Correct! Well done!
            </Typography>
          ) : (
            <Typography variant="h6" color="error.main">
              ❌ Incorrect. The correct answer is {labels[correctAnswer]}.
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
              sx={styles.editLink}
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
