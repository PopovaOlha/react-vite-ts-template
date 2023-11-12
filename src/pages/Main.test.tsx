import { render } from '@testing-library/react';
import React from 'react';
import { describe, it } from 'vitest';
import App from '../App';

describe('<App />', () => {
  it('clicking on a search result navigates to details page', async () => {
    render(<App />);
  });
});
