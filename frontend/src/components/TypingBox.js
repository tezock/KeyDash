import React from 'react';

import { useState, useEffect } from 'react';
import Settings from './Settings';
//import TypingTest from './TypingTest2';
import TypingTest2 from './TypingTest2';

function TypingBox() {

  const [quote, updateQuote] = useState({})
  const [quoteLength, setQuoteLength] = useState(250)

  useEffect(
  () => {

    const getNewQuote = async () => {
      try {
        const response = await fetch(`https://api.quotable.io/random?minLength=${quoteLength}`, {method: 'GET'})
        if (!response.ok) {
          throw new Error('Error loading quote. Try again later.');
        }

        const newQuote = await response.json();
        updateQuote(newQuote);
      }
      catch (error) {
        updateQuote(error.message)
      }    
    };

    getNewQuote();
    
    console.log("Got New Quote!")
  }, [quoteLength])
  
  return (
    <div className="typingbox app-section">
      Test
      <Settings setQuoteLength={setQuoteLength} />
      <TypingTest2 quote={quote} />
    </div>
  );
}

export default TypingBox;
