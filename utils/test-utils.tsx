import {JSXElementConstructor, ReactElement} from 'react';
import {render, RenderOptions, RenderResult} from '@testing-library/react';
import {NotistackProvider, ThemeConfig} from '@cellebrite/design-system';
import '../utils/i18n';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {BrowserRouter as Router} from 'react-router-dom';

const queryClient = new QueryClient();

const AllTheProviders: JSXElementConstructor<{children: ReactElement}> = ({children}): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <ThemeConfig isLightMode>
      <NotistackProvider>
        <Router>{children}</Router>
      </NotistackProvider>
    </ThemeConfig>
  </QueryClientProvider>
);

const customRender = (ui: ReactElement, options?: RenderOptions): RenderResult =>
  render(ui, {wrapper: AllTheProviders, ...options});

export * from '@testing-library/react';
export {customRender as render};
