import { useState, useEffect, useRef } from "react";
import Test from '../components/Test';

const TestPage = () => {

    const [selectedTest, setSelectedTest] = useState("quote");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quote, setQuote] = useState(null);
    const [getNewTest, setGetNewTest] = useState(true)
    const hasFetchedQuote = useRef(false);
    const [isTestComplete, setTestCompletion] = useState(false);

    // gets a new quote
    const fetchQuote = async () => {


        setIsLoading(true);

        try {
          setIsLoading(true);
          const response = await fetch('https://api.quotable.io/random');
          const result = await response.json();
          setIsLoading(false);
          setError(null)
          setQuote(result); 
          hasFetchedQuote.current = false;
        } catch (error) {
          setError(error);
        }

        setGetNewTest(false);
    };
    
    // gets a new test whenever getNewTest is updated.
    useEffect(() => {
      if (getNewTest && !hasFetchedQuote.current) {
        fetchQuote();
        hasFetchedQuote.current = true; // Mark as fetched
      }
    }, [getNewTest, hasFetchedQuote])

    const handleRestartTest = () => {

      setTestCompletion(false);
      setGetNewTest(true);
    }
    
    if (error) {
        return (
            <>
            Error was found: {error.message}
            Refresh to try again.
            </>
        )
    }

    if (isTestComplete) {
      return (
        <>
          <p>Test is complete, here are stats</p>
          <button onClick={handleRestartTest}>Click to restart</button>
        </>
      )
    }

    return (
        <>
        <Test quote={quote} isLoading={isLoading} setTestCompletion={setTestCompletion}/>
        </>
    )
}

export default TestPage;