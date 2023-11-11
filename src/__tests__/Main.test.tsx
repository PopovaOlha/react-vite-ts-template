import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Main from '../pages/Main';

jest.mock('../api/api', () => ({
  searchApi: {
    search: jest.fn(() =>
      Promise.resolve({
        results: [
          {
            id: '1',
            name: 'Mocked Item',
            description: 'Mocked Description',
            image: 'mocked-image.jpg',
            url: 'mocked-url',
          },
        ],
      })
    ),
  },
}));

describe('Компонент Main', () => {
  it('запрашивает и отображает результаты поиска при вводе', async () => {
    render(<Main />);

    userEvent.type(screen.getByPlaceholderText('Search...'), 'test');
    userEvent.click(screen.getByText('Search'));

    await act(async () => {
      expect(screen.getByText('Mocked Item')).toBeInTheDocument();
      expect(screen.getByText('Mocked Description')).toBeInTheDocument();
    });
  });
});
