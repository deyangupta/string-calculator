import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const StringCalculator: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const add = (numbers: string): number => {
    // Handle empty string
    if (numbers.trim() === '') {
      return 0;
    }

    // Handle custom delimiters
    let delimiter = ',';
    let numbersString = numbers;

    // Check for custom delimiter
    if (numbers.startsWith('//')) {
      const delimiterEnd = numbers.indexOf('\n');
      delimiter = numbers.substring(2, delimiterEnd);
      numbersString = numbers.substring(delimiterEnd + 1);
    }

    // Replace newlines with delimiter
    numbersString = numbersString.replace(/\n/g, delimiter);

    // Convert to numbers and check for negatives
    const numberArray = numbersString.split(delimiter)
      .map(num => parseInt(num.trim(), 10));

    // Check for negative numbers
    const negatives = numberArray.filter(num => num < 0);
    if (negatives.length > 0) {
      throw new Error(`negative numbers not allowed: ${negatives.join(', ')}`);
    }

    // Sum the numbers
    return numberArray.reduce((sum, num) => sum + num, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setError(null);
  };

  const handleCalculate = () => {
    try {
      const calculatedResult = add(input);
      setResult(calculatedResult);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResult(null);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">String Calculator</h1>
      
      <div className="flex space-x-2">
        <Input 
          type="text" 
          value={input}
          onChange={handleInputChange}
          placeholder="Enter numbers (no negative numbers!)"
        />
        <Button onClick={handleCalculate}>Calculate</Button>
      </div>

      {result !== null && (
        <div className="bg-green-100 p-3 rounded">
          <p className="text-green-800">Result: {result}</p>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default StringCalculator;