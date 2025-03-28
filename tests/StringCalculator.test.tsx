import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StringCalculator from '../src/components/StringCalculator';

describe('StringCalculator', () => {
  test('handles empty string', () => {
    render(<StringCalculator />);
    const input = screen.getByPlaceholderText(/enter/i);
    const calculateButton = screen.getByText(/calculate/i);
    
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(calculateButton);
    
    expect(screen.getByText('Result: 0')).toBeInTheDocument();
  });

  test('adds comma-separated numbers', () => {
    render(<StringCalculator />);
    const input = screen.getByPlaceholderText(/enter/i);
    const calculateButton = screen.getByText(/calculate/i);
    
    fireEvent.change(input, { target: { value: '1,2,3' } });
    fireEvent.click(calculateButton);
    
    expect(screen.getByText('Result: 6')).toBeInTheDocument();
  });
});