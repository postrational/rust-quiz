import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface QuizState {
  answeredQuestions: string[];
  correctQuestions: string[];

  recordAnswer: (questionId: string, isCorrect: boolean) => void;
  resetProgress: () => void;
  getAccuracy: () => number;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      // Initial state
      answeredQuestions: [],
      correctQuestions: [],

      // Actions
      recordAnswer: (questionId: string, isCorrect: boolean) => {
        set((state) => {
          // Avoid duplicates
          if (state.answeredQuestions.includes(questionId)) {
            return state;
          }

          const newAnswered = [...state.answeredQuestions, questionId];
          const newCorrect = isCorrect ? [...state.correctQuestions, questionId] : state.correctQuestions;

          return {
            answeredQuestions: newAnswered,
            correctQuestions: newCorrect,
          };
        });
      },

      resetProgress: () => {
        set({
          answeredQuestions: [],
          correctQuestions: [],
        });
      },

      getAccuracy: () => {
        const { answeredQuestions, correctQuestions } = get();
        return answeredQuestions.length === 0 ? 0 : (correctQuestions.length / answeredQuestions.length) * 100;
      },
    }),
    {
      name: 'quiz-progress',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
