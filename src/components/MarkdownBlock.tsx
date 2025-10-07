import { useState, type ReactNode } from 'react';
import { Box, useTheme, IconButton, Tooltip, Snackbar } from '@mui/material';
import { ContentCopy, PlayArrow } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark as dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockButtonProps {
  title: string;
  onClick: () => void;
  icon: ReactNode;
}

function CodeBlockButton({ title, onClick, icon }: CodeBlockButtonProps) {
  return (
    <Tooltip title={title}>
      <IconButton
        size="small"
        onClick={onClick}
        sx={{
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}

export function MarkdownBlock({ children }: { children: string }) {
  const theme = useTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setSnackbarOpen(true);
  };

  const handleRunRust = (code: string) => {
    const encodedCode = encodeURIComponent(code);
    window.open(`https://play.integer32.com/?edition=2024&code=${encodedCode}`, '_blank');
  };

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
            const code = (children as string).replace(/\n$/, '');
            const language = match?.[1] ?? '';
            const isRust = language === 'rust' || language === 'rs';

            return match ? (
              <Box sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    display: 'flex',
                    gap: 0.5,
                    zIndex: 1,
                  }}
                >
                  <CodeBlockButton
                    title="Copy code"
                    onClick={() => handleCopy(code)}
                    icon={<ContentCopy fontSize="small" />}
                  />
                  {isRust && (
                    <CodeBlockButton
                      title="Run in Rust Playground"
                      onClick={() => handleRunRust(code)}
                      icon={<PlayArrow fontSize="small" />}
                    />
                  )}
                </Box>
                <SyntaxHighlighter PreTag="div" language={language} style={dark}>
                  {code}
                </SyntaxHighlighter>
              </Box>
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Code copied!"
      />
    </Box>
  );
}
