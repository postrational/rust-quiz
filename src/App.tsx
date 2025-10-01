import { Box, Paper } from '@mui/material';
import './App.css';
import { QuestionData, QuizQuestion } from './components/QuizQuestion';

export function App() {
  const question_data: QuestionData = {
    question:
      '```rust\nuse std::cell::Cell;\n\nfn main() {\n    let x = Cell::new(42);\n    let y = &x;\n    let z = &x;\n    \n    y.set(100);\n    println!("{}", z.get());\n    z.set(200);\n    println!("{}", y.get());\n    println!("{}", x.get());\n}\n```\n\nWhat does this code output?',
    answers: ['100, 200, 200', '42, 100, 200', 'Compilation error - multiple mutable references', '100, 200, 42'],
    correct_answer: 0,
    expected_output: ['100', '200', '200'],
    explanation:
      "This question tests understanding of `Cell<T>` and interior mutability in Rust. `Cell<T>` is a type that provides interior mutability for `Copy` types, allowing mutation through shared (immutable) references.\n\nIn this code, `x` is a `Cell<i32>` initially containing the value 42. Both `y` and `z` are immutable references (`&Cell<i32>`) to the same `Cell`. Despite being immutable references, they can mutate the cell's contents using the `set()` method and read values using the `get()` method.\n\nWhen `y.set(100)` is called, it changes the cell's internal value to 100. Since `y`, `z`, and `x` all refer to the same `Cell`, when `z.get()` is called, it reads the current value of 100. Next, `z.set(200)` changes the value to 200, so both `y.get()` and `x.get()` return 200.\n\nThe key takeaway is that `Cell` allows mutation through shared references without violating Rust's borrowing rules. It achieves this by only allowing you to get or set the entire value (which must be `Copy`), never providing direct mutable access to the contents. This is different from `RefCell`, which uses runtime borrow checking and can work with non-`Copy` types. `Cell` is useful when you need simple interior mutability for small `Copy` types without the overhead of runtime checks.",
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
        <QuizQuestion questionData={question_data} />
      </Paper>
    </Box>
  );
}
