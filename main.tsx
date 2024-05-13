import ReactDOM from 'react-dom/client';
import {ThemeConfig} from '@cellebrite/design-system';
import './utils/i18n';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {startMockServiceWorker} from 'utils/start-mock-mode';

if (import.meta.env.VITE_ENABLE_MSW === 'true') {
  startMockServiceWorker();
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement!).render(
  <Router basename={import.meta.env.VITE_PUBLIC_BASE_URL}>
    <ThemeConfig isLightMode>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeConfig>
  </Router>,
);
