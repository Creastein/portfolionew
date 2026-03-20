import React from 'react';

import App from './App';
import './i18n/config';

import { ViteReactSSG } from 'vite-react-ssg';

import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home isLoading={false} /> },
      { path: 'home', element: <Home isLoading={false} /> },
      { path: 'work', element: <Home isLoading={false} /> },
      { path: 'projects', element: <CaseStudy /> },
      { path: 'case-study/:id', element: <CaseStudy /> },
      { path: '*', element: <Home isLoading={false} /> },
    ]
  }
];

export const createRoot = ViteReactSSG(
  { routes },
  ({ isClient }) => {
    // Manual service worker registration for PWA compatibility with SSG
    if (isClient && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
          .then(reg => console.log('SW registered:', reg))
          .catch(err => console.log('SW error:', err));
      });
    }
  }
);