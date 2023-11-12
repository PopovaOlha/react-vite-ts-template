import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it } from 'vitest';
import App from './App';

describe('<App />', () => {
  it('renders nav links', () => {
    render(<App />);
    expect(screen.getAllByTestId('nav-link')).toHaveLength(3);
  });
});
