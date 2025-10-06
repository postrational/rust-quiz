import { Box, Button, Typography } from '@mui/material';
import _ from 'lodash';
import { useMemo, useState } from 'react';
import { MarkdownBlock } from './MarkdownBlock';

export interface QuestionData {
  question: string;
  answers: [string, string, string, string];
  correct_answer: 0 | 1 | 2 | 3;
  expected_output: string[];
  explanation: string;
}

const shuffleAnswers = (answers: string[], correctIndex: number): [string[], number] => {
  const indexed = answers.map((answer, index) => ({ answer, index }));
  const shuffled = _.shuffle(indexed);

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

  const [shuffledAnswers, correctAnswerIndex] = useMemo(
    () => shuffleAnswers(questionData.answers, questionData.correct_answer),
    [questionData],
  );

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    onNextQuestion();
  };

  return (
    <>
      <Typography variant="h4">Quiz Game</Typography>

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

          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'right' }}>
            (Question ID: {questionId})
          </Typography>

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
