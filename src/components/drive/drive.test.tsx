import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Drive from './Drive';

describe('<Drive />', () => {
  test('it should mount', () => {
    render(<Drive />);
    
    const drive = screen.getByTestId('Drive');

    expect(drive).toBeInTheDocument();
  });
});