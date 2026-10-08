import { useState } from 'react';
import './App.css';

function getCategory(bmi) {
  if (bmi < 18.5) {
    return "Underweight";
  }
  if (bmi < 25.0) {
    return "Normal weight";
  }
  if (bmi < 30.0) {
    return "Overweight";
  } else {
    return "Obese";
  }
}

function App() {
  const [unit, setUnit] = useState('metric');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [error, setError] = useState('');

  let weightUnit = 'kg';
  let heightUnit = 'm';
  if (unit === 'imperial') {
    weightUnit = 'lb';
    heightUnit = 'in';
  }

  function handleReset() {
    setWeight('');
    setHeight('');
    setBmi(null);
    setError('');
  }

  function handleUnitToggle() {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
    handleReset();
  }

  function handleCalculate() {
    const w = Number(weight);
    const h = Number(height);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      setError('Please enter numbers greater than 0 for both weight and height.');
      setBmi(null);
    } else {
      let kg = w;
      let metres = h;
      if (unit === 'imperial') {
        kg = w * 0.453592;
        metres = h * 0.0254;
      }
      setError('');
      setBmi(kg / (metres * metres));
    }
  }

  return (
    <div className="app">
      <h1>BMI Calculator</h1>

      <button type="button" onClick={handleUnitToggle}>
        Switch to {unit === 'metric' ? 'Imperial' : 'Metric'}
      </button>

      <form>
        <label>
          Weight ({weightUnit}):
          <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </label>

        <label>
          Height ({heightUnit}):
          <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} />
        </label>

        {error && <p className="error">{error}</p>}

        <button type="button" onClick={handleCalculate}>Calculate</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>

      {bmi !== null && (
        <div className="result">
          <p>Your BMI: {bmi.toFixed(1)}</p>
          <p>Category: {getCategory(bmi)}</p>
        </div>
      )}
    </div>
  );
}

export default App;