import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [from, setFrom] = useState();
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('KZT');
  const [result, setResult] = useState(0);
  const [rates, setRates] = useState({});

  const currencies = ['USD', 'KZT', 'GBP', 'RUB', 'EUR']

  const baseURL =
    'http://api.exchangeratesapi.io/v1/latest?access_key=02fc92d50ffe2b124d04cfe86c2f6a4b&symbols=EUR,USD,KZT,GBP,RUB';

  async function updateCurrency(url) {
    const response = await fetch(url);

    if (response.ok) {
      const json = await response.json();
      const data = JSON.parse(JSON.stringify(json.rates));

      setRates({...rates, data})
    }
  }

  useEffect(() => {
    updateCurrency(baseURL);
  }, []);

  function handleConvert() {
    const temp = rates.data[toCurrency] / rates.data[fromCurrency] * from
    setResult(temp)
  }

  return (
    <div className='container'>
      <h1>My converter</h1>
      <div className='converter-window'>
          <input type='number' value={from} onChange={e => setFrom(e.target.value)} align='middle'></input>
          <select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
            {currencies.map(item => <option key={item}>{item}</option>)}
          </select>
          <select value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
            {currencies.map(item => <option key={item}>{item}</option>)}
          </select>
      </div>
      <h3 className='result'>{result}</h3>
      <button className='convert-button' onClick={() => handleConvert()}>Convert</button>
    </div>
  );
}

export default App;
