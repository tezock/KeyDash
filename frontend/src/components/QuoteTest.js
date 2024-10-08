import React from 'react';

import { useState, useEffect } from 'react';
import Settings from './Settings';

import TypingTest from './TypingTest';
import WPMGraph from './WPMGraph';

function QuoteTest() {

  const [quote, updateQuote] = useState({});
  const [quoteLength, setQuoteLength] = useState(250);
  const [isTestCompleted, setTestCompletion] = useState(false);
  const [isSettingsVisible, setSettingsVisibility] = useState(true);

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
    setTestCompletion(false);

    console.log("Got New Quote!")
  }, [quoteLength, isTestCompleted])
  
  
  return (
    <div className="typingbox app-section">
      
      {isSettingsVisible && <Settings setQuoteLength={setQuoteLength} />}
      <TypingTest quote={quote} setTestCompletion={setTestCompletion} isTestCompleted={isTestCompleted} setSettingsVisibility={setSettingsVisibility}/>
      {/* <WPMGraph/> */}
    </div>
  );
}

export default QuoteTest;
