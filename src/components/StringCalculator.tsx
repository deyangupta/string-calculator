import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const StringCalculator: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCalculate = () => {
    // Basic implementation to be expanded
    setResult(input ? input.split(',').reduce((sum, num) => sum + parseInt(num, 10), 0) : 0);
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">String Calculator</h1>
      
      <div className="flex space-x-2">
        <Input 
          type="text" 
          value={input}
          onChange={handleInputChange}
          placeholder="Enter comma-separated numbers"
        />
        <Button onClick={handleCalculate}>Calculate</Button>
      </div>

      {result !== null && (
        <div className="bg-green-100 p-3 rounded">
          <p className="text-green-800">Result: {result}</p>
        </div>
      )}
    </div>
  );
};

export default StringCalculator;