import { Box, LinearProgress, Typography } from '@mui/material';
import { useQuizStore } from '../store/quizStore';
import { questionIds } from '../questions';

export function QuizStats() {
  const correctQuestions = useQuizStore((state) => state.correctQuestions);
  const getAccuracy = useQuizStore((state) => state.getAccuracy);

  const totalQuestions = questionIds.length;
  const totalCorrect = correctQuestions.length;
  const accuracy = getAccuracy();
  const progress = (totalCorrect / totalQuestions) * 100;

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        marginBottom: 3,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Progress
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          {totalCorrect} / {totalQuestions}
        </Typography>
      </Box>

      <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 1, marginBottom: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {totalCorrect > 0 ? (
          <>
            <Typography variant="body2" color="text.secondary">
              Accuracy
            </Typography>
            <Typography
              variant="body2"
              fontWeight="bold"
              color={accuracy >= 80 ? 'success.main' : accuracy >= 50 ? 'warning.main' : 'error.main'}
            >
              {`${accuracy.toFixed(1)}%`}
            </Typography>
          </>
        ) : (
          <Typography variant="body2" color="text.secondary">
            &nbsp;{' '}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
