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

  test('supports new line delimiters', () => {
    render(<StringCalculator />);
    const input = screen.getByPlaceholderText(/enter/i);
    const calculateButton = screen.getByText(/calculate/i);
    
    fireEvent.change(input, { target: { value: '1\n2,3' } });
    fireEvent.click(calculateButton);
    
    expect(screen.getByText('Result: 6')).toBeInTheDocument();
  });

  test('supports custom delimiters', () => {
    render(<StringCalculator />);
    const input = screen.getByPlaceholderText(/enter/i);
    const calculateButton = screen.getByText(/calculate/i);
    
    fireEvent.change(input, { target: { value: '//;\n1;2;3' } });
    fireEvent.click(calculateButton);
    
    expect(screen.getByText('Result: 6')).toBeInTheDocument();
  });

  test('throws error for negative numbers', () => {
    render(<StringCalculator />);
    const input = screen.getByPlaceholderText(/enter/i);
    const calculateButton = screen.getByText(/calculate/i);
    
    fireEvent.change(input, { target: { value: '1,-2,3' } });
    fireEvent.click(calculateButton);
    
    expect(screen.getByText(/negative numbers not allowed: -2/i)).toBeInTheDocument();
  });
});