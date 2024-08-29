import React, { useState } from 'react';
import "./styles.css"

function StockSentiment() {
  const [ticker, setTicker] = useState(''); // To store the user input
  const [compound, setCompound] = useState(null); // To store the compound score
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://127.0.0.1:5000/sentiment?ticker=${ticker}`);
      const data = await response.json();

      if (response.ok) {
        // Display the average compound score from the backend
        setCompound(data.average_compound_score);
        setError('');
      } else {
        // Handle case where backend returns an error
        setCompound(null);
        setError(data.error || 'No sentiment data found for this ticker');
      }
    } catch (error) {
      setError('Error fetching data');
    }
  };

  return (
    <div>
      <h1 className='prompt'>Get Sentiment Score</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={ticker} 
          onChange={(e) => setTicker(e.target.value)} 
          placeholder="Enter Stock Ticker" 
        />
        <button type="submit">Get Sentiment</button>
      </form>
      
      {(compound !== null && compound > 0) && <p className='output-positive'>Compound Score: {compound}</p>}
      {(compound !== null && compound < 0) && <p className='output-negative'>Compound Score: {compound}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default StockSentiment;
