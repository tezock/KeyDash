import React from 'react';

import { useState, useEffect } from 'react';



const res = await fetch("https://api.quotable.io/quotes/random?minLength=200", {method: 'GET'})
.then(
  res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Response Not Okay')
  }
)
.catch(
  error => {
    return ("Error loading quote. Try again.");
  }
)

// const getQuoteResponse = async () => {
  
//   const response = await fetch("https://api.quotable.io/quotes/random?minLength=200", {method: 'GET'})
//   .then(
//     (response) => {

//       if (response.ok) {
//         console.log(response.json())
//         return response.json();
//       }

//       throw new Error('Error loading quote. Try again later.');
//     }
//   )
//   .catch(
//     (error) => {

//       return (error);
//     }
//   )
// }

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
    <div className="typingbox">
      {quote.content}
      Full json
      <br />
      {JSON.stringify(quote)}
    </div>
  );
}

export default TypingBox;
