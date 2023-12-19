import React from 'react';

import { useState, useEffect } from 'react';
import Settings from './settings';
import TypingTest from './TypingTest';

function TypingBox() {

  const [quote, updateQuote] = useState({})

useEffect(
  () => {

    const getNewQuote = async () => {
      try {
        const response = await fetch("https://api.quotable.io/random?minLength=250", {method: 'GET'})
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
    console.log(quote);
  }, [])

  return (
    <div className="typingbox app-section">
      <Settings/>
      <TypingTest quote={quote} />
    </div>
  );
}

export default TypingBox;
