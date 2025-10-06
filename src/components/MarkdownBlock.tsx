import { Box, useTheme } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark as dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function MarkdownBlock({ children }: { children: string }) {
  const theme = useTheme();

  const inlineCodeStyle = {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
    padding: '2px 6px',
    borderRadius: '4px',
  };

  return (
    <Box sx={{ textAlign: 'left' }}>
      <ReactMarkdown
        components={{
          code(props) {
            const { children, className } = props;
            const match = /language-(\w+)/.exec(className ?? '');
            return match ? (
              <SyntaxHighlighter PreTag="div" language={match[1]} style={dark}>
                {(children as string).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} style={inlineCodeStyle}>
                {children}
              </code>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </Box>
  );
}
