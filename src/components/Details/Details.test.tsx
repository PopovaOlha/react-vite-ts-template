import React from 'react';
import { render, screen } from '@testing-library/react';
import Details from '../Details/Details';
import data from 'assets/data/DataItems';

const randomIdx: number = Math.floor(Math.random() * data.length);
const dataForTest = data[randomIdx];
console.log(dataForTest);

describe('<Details />', () => {
  it('renders card', () => {
    render(<Details />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getAllByText(/hut/i)).not.toHaveLength(0);
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });
});
