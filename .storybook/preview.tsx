import '../src/index.css'; // Your global styles
import type { Decorator } from '@storybook/react';
import React from 'react';

// --------------------
// Example Provider
// --------------------
// If you have a ThemeProvider, Redux Provider, or other contexts, import them here
// import { ThemeProvider } from '../src/theme';

// Simple dummy ThemeProvider for demonstration (remove if not needed)
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>{children}</>
);

// --------------------
// Decorators
// --------------------
export const decorators: Decorator[] = [
  (Story) => (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  ),
];

// --------------------
// Global Storybook Parameters
// --------------------
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'padded',
};
