import { useState, useEffect } from "react";

/**
 * TODO:
 * Properly document as is
 * Analyze the scope of desired functions
 * Live count words per minute
 * Hide the input field
 * Make transition between current characters more smooth
 * Research into DOM manipulation. Current method os O(N^2) instead of O(N).
 * Add Graph to show user their statistics
 * Show user if they are currently clicked on the typing test
 * Allow users to select quote length **Beyond current scope*
 * Show the current character from the beginning, not after they start typing
 * Make current character into the blinking line instead of text decoration.
 * Better style the loading quote text
 */

/**
 * FIXME:
 * 
 */

/**
 * Returns a list representing each character in a received quote.
 * @param {object} quote - quote response object
 * @returns {list} - the list of each character
 */
const getCharList = (quote) => {

    const quoteText = quote.content;

    // return null if the request was invalid
    if (quoteText === null || quoteText === undefined) {
        return null;
    }
    
    // split the quote to get each character
    const charList = quoteText.split("");
    
    return charList;
}

/**
 * Updates the styling of each character when the user correctly progresses in the typing test.
 * @param {number} currIndex - The user's current index (character to be typed)
 */
const styleCurrIndexTo = (currIndex) => {

    // gets the container of the test characters, and then obtains it's span tagged children.
    const allChars = document.getElementById("test-characters").querySelectorAll('span');

    // iterate over each character in the typing test
    allChars.forEach(
        (characterSpan, index) => {
            
            // style the next character the user has to type
            if (index === currIndex) {
                characterSpan.classList.remove('untyped', 'typed', 'incorrect');
                characterSpan.classList.add('current');
            } 

            // styles every character before the next character the user will type
            else if (index < currIndex) {
                characterSpan.classList.remove('untyped', 'current', 'incorrect');
                characterSpan.classList.add('typed');
            }

            // styles every character after the character the user will type.
            else {
                characterSpan.classList.remove('typed', 'current', 'incorrect');
                characterSpan.classList.add('untyped');
            }
        }
    )
}

/**
 * Updates the styling of each character when a user makes an incorrect keystroke
 * @param {number} currIndex - The current index of the user (the incorrectly typed character)
 */
const styleWrongCharTo = (currIndex) => {

    // gets the container of the test characters, and then obtains it's span tagged children.
    const allChars = document.getElementById("test-characters").querySelectorAll('span');

    // iterate over each character in the typing test
    allChars.forEach(
        (characterSpan, index) => {

            // if the current character is the incorrectly typed character, style appropriately
            if (index === currIndex) {
                characterSpan.classList.remove('untyped', 'typed', 'current');
                characterSpan.classList.add('incorrect');
            } 

            // if current character precedes the incorrectly typed character, style appropriately
            else if (index < currIndex) {
                characterSpan.classList.remove('untyped', 'current', 'incorrect');
                characterSpan.classList.add('typed');
            }

            // if the current character is after incorrectly typed character, style appropriately
            else {
                characterSpan.classList.remove('typed', 'current', 'incorrect');
                characterSpan.classList.add('untyped');
            }
        }
    )
}

function calculateWPM(startTime, endTime, charactersTyped) {
    // Calculate the total time in minutes
    const totalTimeInSeconds = (endTime - startTime) / 1000; // Convert milliseconds to seconds
    const totalTimeInMinutes = totalTimeInSeconds / 60;
  
    // Determine the total number of words typed
    const wordsTyped = charactersTyped / 5 // average word length of 4.7
    console.log(endTime - startTime);
    console.log(endTime)
    console.log(startTime)
    console.log(wordsTyped);
    // Calculate words per minute (WPM)
    const wpm = Math.round((wordsTyped * 60 * 1000) / ((endTime - startTime)));
  
    return wpm;
  }

// stores the starting time.
let startTime = Date.now();

/**
 * Typing Test component.
 * @param {object} quote - quote object
 * @returns typing test component
 */
function TypingTest({ quote }) {

    // updates the current index through the quote
    const [currIndex, updateIndex] = useState(0);

    // stores the current values typed by the user
    const [inputValue, updateInputValue] = useState('');

    // stores the current size of the 'hidden input' box for comparison.
    const [oldInputSize, setInputSize] = useState(0);

    const charList = getCharList(quote);

    /**
     * Increment the state index variable.
     */
    const increment = () => {
        updateIndex(() => currIndex + 1);
    }

    /**
     * Decrement the state index variable.
     */
    const decrement = () => {
        updateIndex(() => currIndex - 1);
    }

    /**
     * Handle when the input box changes
     * @param {event} event 
     */
    const handleInputChange = (event) => {

        // store the current value in the input box
        const newString = event.target.value;

        // update the 'hidden text box's input value
        updateInputValue(newString);
        
        // if a new character was added, do work
        if (newString.length > oldInputSize) {

            // if user typed the correct character, increment the index and update the styling.
            if (newString.charAt(newString.length - 1) === charList[currIndex]) {

                increment();
                styleCurrIndexTo(currIndex+1);
            }

            // if user typed the wrong character, do not increment the index and update the styling.
            else {
                
                styleWrongCharTo(currIndex);
            }
            
        }

        // Only decrement index if the new string is shorter (backspace), it's not the first index,
        // and the first character is not a space. This avoids going back to the previous word.
        else if (newString.length < oldInputSize && currIndex > 0 && charList[currIndex - 1] !== ' ') {

            decrement();

            // update the character styling for currIndex - 2, 
            styleCurrIndexTo(currIndex-1);
        }

        // perform final update to the input's size
        setInputSize(newString.length);
    }

    if (currIndex === 1) {
        startTime = Date.now();
    }
     
    
    if (charList === null) {
        return (
            <div className="typing-test">
                Loading Quote.
            </div>
        )
    }

    // if the last index was reached, return the WPM and a button to do a new test.
    if (currIndex === charList.length) {

        return (
            <div className="typing-test">
                WPM: {calculateWPM(startTime, Date.now(), charList.length)}
                <br/>
                <button onClick={()=>(window.location.reload())}>New Test</button>
            </div>
        )
    }

    // if there is a quote displayed, automatically focus onto the typing test.

    // get the hidden text box used for storing typed characters
    const input = document.getElementById('hidden-text-box');
    
    // if the input box is on the screen, focus the user onto it.
    if (input != null) {
        input.focus();
    }
    
    return (

        <div className="typing-test">
            
            {currIndex}
            <br/>

            <label 
                for="hidden-text-box" 
                id="test-characters"
            >

                {
                    charList.map(
                        (item, index) => {

                            if (index === 0) {
                                return (
                                    <span 
                                        key={index}
                                        className="current"
                                    >
                                        {item}
                                    </span>
                                )
                            }
                            return (
                            <span 
                                key={index}
                                className="untyped"
                            >
                                {item}
                            </span>
                        )}
                    )
                }

            </label>

            <input 
                id="hidden-text-box" 
                width="0" 
                height="0" 
                type="text" 
                value={inputValue} 
                onChange={handleInputChange}
            />
            
        </div>

    );
}

export default TypingTest