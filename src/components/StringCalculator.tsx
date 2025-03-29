import React, { useState } from 'react';

// Logic Function
function add(numbers: string): number {
  if (!numbers) return 0;

  let delimiter = /,|\n/;
  let customDelimiterMatch = numbers.match(/^\/\/(.+)\n/);

  if (customDelimiterMatch) {
    const customDelimiter = customDelimiterMatch[1];
    delimiter = new RegExp(customDelimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    numbers = numbers.slice(customDelimiterMatch[0].length);
  }

  const numArray = numbers.split(delimiter).map(n => parseInt(n, 10));
  const negativeNumbers = numArray.filter(n => n < 0);

  if (negativeNumbers.length > 0) {
    throw new Error(`negative numbers not allowed: ${negativeNumbers.join(', ')}`);
  }

  return numArray.reduce((sum, num) => sum + (isNaN(num) ? 0 : num), 0);
}

// React Component
const StringCalculator: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    try {
      const sum = add(input);
      setResult(sum);
      setError(null);
    } catch (err: any) {
      setResult(null);
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h2>🧮 String Calculator</h2>
      <textarea
        rows={4}
        cols={50}
        placeholder='Enter numbers (e.g. 1,2\n3 or //;\n1;2)'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '100%', padding: '8px' }}
      />
      <button
        onClick={handleCalculate}
        style={{ marginTop: '10px', padding: '8px 16px', cursor: 'pointer' }}
      >
        Calculate
      </button>
      <div style={{ marginTop: '15px' }}>
        {error && <p style={{ color: 'red' }}>❌ Error: {error}</p>}
        {result !== null && <p>✅ Result: {result}</p>}
      </div>
    </div>
  );
};

export default StringCalculator;