export interface QuestionData {
  question: string;
  answers: [string, string, string, string];
  correct_answer: 0 | 1 | 2 | 3;
  expected_output: string[];
  explanation: string;
}

const questionModules = import.meta.glob<QuestionData>('../../data/questions/rust/formatted/*.yaml', {
  eager: true,
});

// Extract basename without extension (e.g., "../../path/q001.yaml" -> "q001")
function getQuestionId(path: string): string {
  const filename = path.split('/').pop() ?? '';
  return filename.replace('.yaml', '');
}

// Build dictionary of questions keyed by ID (filename without extension)
export const allQuestions: Record<string, QuestionData> = {};
for (const [path, module] of Object.entries(questionModules)) {
  const questionId = getQuestionId(path);
  allQuestions[questionId] = module;
  // Limit to 3 questions for testing
  // if (Object.keys(allQuestions).length >= 3) break;
}

export const questionIds = Object.keys(allQuestions);
