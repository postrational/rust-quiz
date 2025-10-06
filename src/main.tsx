import { CssBaseline } from '@mui/material';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Theme } from './components/Theme';
import './index.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Theme>
      <CssBaseline />
      <App />
    </Theme>
  </StrictMode>,
);
