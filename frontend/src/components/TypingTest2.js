import { useState, useEffect, useRef } from "react";

/**
 * TODO:
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
 * 
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
 * Returns a list representing each word in a received quote.
 * @param {object} quote - quote response object
 * @returns {list} - the list of each character
 */
const getWordList = (quote) => {

    const quoteText = quote.content;

    // return null if the request was invalid
    if (quoteText === null || quoteText === undefined) {
        return null;
    }
    
    // split the quote to get each character
    const wordList = quoteText.split(" ");
    
    return wordList;
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

function formatWord(word) {

    console.log(word.split(''));
    return word.split('').map((item) => {
        return (<span className="letter">{item}</span>);
    })
}

function calculateWPM(startTime, endTime, charactersTyped) {
    // Calculate the total time in minutes
    const totalTimeInSeconds = (endTime - startTime) / 1000; // Convert milliseconds to seconds
    const totalTimeInMinutes = totalTimeInSeconds / 60;
  
    // Determine the total number of words typed
    const wordsTyped = charactersTyped / 5 // average word length of 4.7

    // Calculate words per minute (WPM)
    const wpm = Math.round((wordsTyped * 60 * 1000) / ((endTime - startTime)));
  
    return wpm;
  }


// stores the starting time.
let startTime = Date.now();

function isNotNull(element) {
    return (element !== undefined && element !== null);
}

/**
 * Typing Test component.
 * @param {object} quote - quote object
 * @returns typing test component
 */
function TypingTest2({ quote, setTestCompletion }) {

    
    
    const [currIndex, updateIndex] = useState(0);

    const testBoxReference = useRef();

    // remember to delete
    const charList = getCharList(quote);
    
    const wordList = getWordList(quote);

    
    function addClass(element, name) {

        if (element !== undefined && element !== null) {
            if (!element.className.includes(name)) {
                element.className += ' ' + name;
            }
        }
    }

    function removeClass(element, name) {
        element.className = element.className.replace(name, '');
    }


    const handleKeyDown = (event) => {

        const key = event.key;
        const currentLetter = document.querySelector('.letter.current');
        const expected = currentLetter.innerHTML;

        const isLetter = key.length === 1 && key !== ' ';

        console.log({key, expected});

        if (isLetter) {
            if (currentLetter !== undefined && currentLetter !== null) {

                addClass(currentLetter, key === expected ? 'correct' : 'incorrect');
                console.log(currentLetter);

            }
        }
    }

    useEffect(
        () => {

            const testBox = document.getElementById("test-container");
            console.log(testBox);

            testBox.addEventListener("keydown", handleKeyDown);
            console.log("Added Listener");

            if (isNotNull(wordList)) {
                
                addClass(testBox.querySelector('.word'), 'current');
                addClass(testBox.querySelector('.letter'), 'current');
            }
            return () => {
                testBox.removeEventListener("keydown", handleKeyDown);;
                
            };
        },
        [quote]
    )

    function resetTest() {

        setTestCompletion(true);
        updateIndex(0);
    }

    if (currIndex === 1) {
        startTime = Date.now();
    }
     
    
    if (charList === null) {
        return (
            <div id="test-container" className="typing-test">
                Loading Quote.
            </div>
        )
    }

    // if the last index was reached, return the WPM and a button to do a new test.
    if (currIndex === charList.length) {

        return (
            <div id="test-container" className="typing-test">
                WPM: {calculateWPM(startTime, Date.now(), charList.length)}
                <br/>
                <button onClick={resetTest}>New Test</button>
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

        <div id="test-container" className="typing-test">
            
            {/* WPM: {calculateWPM(startTime, Date.now(), currIndex)} */}
            {currIndex}
            <br/>

            
            
            <div className="test-characters" tabIndex="0" ref={testBoxReference}>
                <div className="test-characters-content">

                    {
                        wordList.map(
                            (item, index) => {

                                return (
                                    <div className="word">
                                        {formatWord(item)}
                                    </div>
                                )
                            
                            }
                        )
                    }
                </div>
                <div id="carat"></div>
                <div id="focus-error">Click here to focus</div>
            </div>
            
        </div>

    );
}

export default TypingTest2;