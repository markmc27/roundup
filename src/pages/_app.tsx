/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const StarlingApp = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <Component {...pageProps} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default StarlingApp;
