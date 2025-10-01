import { Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark as dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function MarkdownBlock({ children }: { children: string }) {
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
              <code className={className}>{children}</code>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </Box>
  );
}
