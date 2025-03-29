import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import StringCalculator from '../src/components/StringCalculator';

describe('StringCalculator UI', () => {
  it('renders the calculator UI', () => {
    render(<StringCalculator />);
    expect(screen.getByText('🧮 String Calculator')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Calculate' })).toBeInTheDocument();
  });

  it('shows result for valid input', () => {
    render(<StringCalculator />);
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '1,2,3' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Calculate' }));
    expect(screen.getByText('✅ Result: 6')).toBeInTheDocument();
  });

  it('handles newline in input', () => {
    render(<StringCalculator />);
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '1\n2,3' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Calculate' }));
    expect(screen.getByText('✅ Result: 6')).toBeInTheDocument();
  });

  it('shows error on negative numbers', () => {
    render(<StringCalculator />);
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '1,-2,-3' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Calculate' }));
    expect(
      screen.getByText('❌ Error: negative numbers not allowed: -2, -3')
    ).toBeInTheDocument();
  });

  it('supports custom delimiter', () => {
    render(<StringCalculator />);
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '//;\n2;3;5' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Calculate' }));
    expect(screen.getByText('✅ Result: 10')).toBeInTheDocument();
  });
});