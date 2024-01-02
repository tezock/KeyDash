import { useState, useEffect, useRef } from "react";
import WPMGraph from "./WPMGraph";

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

    
    return word.split('').map((item) => {
        return (<span className="letter">{item}</span>);
    })
}

function calculateWPM(startTime, endTime, charactersTyped) {
    // Calculate the total time in minutes
    const totalTimeInSeconds = (endTime - startTime) / 1000; // Convert milliseconds to seconds
    const totalTimeInMinutes = totalTimeInSeconds / 60;
  
    // Determine the total number of words typed
    const wordsTyped = charactersTyped / 4.7 // average word length of 4.7

    // Calculate words per minute (WPM)
    const wpm = Math.round((wordsTyped * 60 * 1000) / ((endTime - startTime)));
  
    return wpm;
  }


// stores the starting time.
let startTime = Date.now();

let runningWord = 1;

function isNull(element) {
    return (element === undefined || element === null);
}

let numWrong = 0;
let numCorrect = 0;
let wpmArr = [];
let timeArr = [];

let runningWPM = 0;

function addGraphData() {

    const currWPM = calculateWPM(startTime, Date.now(), numCorrect);
    if (currWPM !== 0) {
        wpmArr.push(currWPM);
        timeArr.push(timeArr.length);
    }

    console.log("----");
    console.log("When Added: " + numCorrect);
    console.log("WPM: " + currWPM)
    console.log("Time Diff: " + (Date.now() - startTime));
    console.log("----")

    // console.log(wpmArr);
    // console.log(timeArr);
}

/**
 * Typing Test component.
 * @param {object} quote - quote object
 * @returns typing test component
 */
function TypingTest2({ quote, setTestCompletion, isTestCompleted }) {

    
    
    const [currIndex, updateIndex] = useState(0);
    const [currWord, updateWord] = useState(runningWord);
    const [testCompletion, setTestStatus] = useState(false);

    const testBoxReference = useRef();

    // remember to delete
    let charList = getCharList(quote);
    
    let wordList = getWordList(quote);

    // adds a class to a given element if it's not null
    function addClass(element, name) {

        if (!isNull(element)) {
            if (!element.className.includes(name)) {
                element.className += ' ' + name;
            }
        }
    }

    // removes a class from a given element if it's not null
    function removeClass(element, name) {
        if (!isNull(element)) {
            element.className = element.className.replace(name, '');
        }
        
    }

    // check if a given element has a given class.
    function hasClass(element, name) {
        if (!isNull(element)) {
            return element.className.includes(name);
        }
        return false;
    }


    // handles the event when the keyboard is pressed.
    const handleKeyDown = (event) => {

        // the value typed
        const key = event.key;

        const currentWord = document.querySelector('.word.current');
        const currentLetter = document.querySelector('.letter.current');

        // store the expected letter if there is one. If not, store a spacebar as we have reached
        // the end of a word.
        const expected = !isNull(currentLetter) ? currentLetter.innerHTML : ' ';

        const isLetter = key.length === 1 && key !== ' ';
        const isSpace = key === ' ';
        const isBackspace = key === 'Backspace';

        // checks if the current letter is the first letter in the current word.
        const isFirstLetter = !isNull(currentWord) && !isNull(currentLetter) ? currentLetter === currentWord.firstChild : false;

        // handles when the user types a letter
        if (isLetter) {
            if (!isNull(currentLetter)) {

                addClass(currentLetter, key === expected ? 'correct' : 'incorrect');
                removeClass(currentLetter, 'current');

                if (key === expected) {
                    numCorrect++;
                    console.log(numCorrect);

                    if (numCorrect == 1) {
                        startTime = Date.now();
                        console.log("Stored starting time!");
                    }
                }

                else {
                    numWrong++;
                }

                if (!isNull(currentLetter.nextSibling)) {
                    addClass(currentLetter.nextSibling, 'current');
                }
                
                // if there is no next letter and no next word, we have finished the test!
                if (isNull(currentLetter.nextSibling) && isNull(currentWord.nextSibling)) {
                    setTestStatus(true);
                }
            }
            else {

                const incorrectLetter = document.createElement('span');
                incorrectLetter.innerHTML = key;
                incorrectLetter.className ='letter incorrect extra';
                currentWord.appendChild(incorrectLetter);
            }
        }

        // handles when the user types a space
        if (isSpace) {

            if (expected !== ' ') {

                const lettersToInvalidate = [...document.querySelectorAll('.word.current .letter:not(.correct)')];

                lettersToInvalidate.forEach(
                    (letter) => {
                        addClass(letter, 'incorrect');
                        
                    }
                )

                numWrong += lettersToInvalidate.length;
            } 

            // if a space was expected, increment
            else if (expected === ' ') {

                numCorrect++;
            }

            removeClass(currentWord, 'current');
            addClass(currentWord.nextSibling, 'current');

            if (!isNull(currentLetter)) {
                removeClass(currentLetter, 'current');
            }
            addClass(currentWord.nextSibling.firstChild, 'current');
            // increment();
            // console.log("Increment!" + currWord);
        }

        // handles when the user presses backspace
        if (isBackspace) {

            // handles when the current letter is the first letter in the word
            if (!isNull(currentLetter) && isFirstLetter && !isNull(currentWord.previousSibling)) {

                // always decrement, as the previous character will be a space.
                //numCorrect--;

                removeClass(currentWord, 'current');
                addClass(currentWord.previousSibling, 'current');
                removeClass(currentLetter, 'current');

                // wait until done to remove this code. Was encountering error where it went back 1
                // index too far.
                // addClass(currentWord.previousSibling.lastChild, 'current');
                // removeClass(currentWord.previousSibling.lastChild, 'incorrect')
                // removeClass(currentWord.previousSibling.lastChild, 'correct');

                // decrement();
            }

            // handles when current letter is not the first letter in the word
            else if (!isNull(currentLetter) && !isFirstLetter) {

                // move back one letter, invalidate letter
                removeClass(currentLetter, 'current');
                addClass(currentLetter.previousSibling, 'current');

                removeClass(currentLetter.previousSibling, 'incorrect')
                removeClass(currentLetter.previousSibling, 'correct');
            }

            // handles when the user backspaces from the last letter in the current word
            else if (isNull(currentLetter)) {

                addClass(currentWord.lastChild, 'current');
                removeClass(currentWord.lastChild, 'incorrect')
                removeClass(currentWord.lastChild, 'correct');
            }
            
        }

        // move cursor
        const nextLetter = document.querySelector('.letter.current');
        const nextWord = document.querySelector('.word.current');
        const cursor = document.getElementById('carat');

        // scrolls the text down if necessary
        if (!isNull(nextLetter)) {
            const outer = -document.getElementById("main-test-container").getBoundingClientRect().top;
            const inner = -nextLetter.getBoundingClientRect().top;

            // if the user passes the second line
            if (outer - inner >= 80) {

                const words = document.getElementById('character-content-box');
                const margin = parseInt(words.style.marginTop || '0px');
                
                if (!isNull(words)) {
                    words.style.marginTop = (margin - 40) + 'px';
                }
            }
        }

        // move the cursor if it isn't null. If not checked, runtime error occurs.

        if (!isNull(cursor)) {

            if (!isNull(nextLetter)) {
                cursor.style.top = nextLetter.getBoundingClientRect().top + 'px';
                cursor.style.left = nextLetter.getBoundingClientRect().left + 'px';
            } else {
                cursor.style.top = nextWord.getBoundingClientRect().top + 'px';
                cursor.style.left = nextWord.getBoundingClientRect().right + 'px';
            }

            // scroll the text up if necessary if the next (prev due to backspace) word isn't null.
            if (!isNull(nextWord)) {
                const outer = -document.getElementById("main-test-container").getBoundingClientRect().top;
                const inner = -nextWord.getBoundingClientRect().top;

                // if the user passes the second line
                if (outer - inner < 0) {

                    const words = document.getElementById('character-content-box');
                    const margin = parseInt(words.style.marginTop || '0px');
                    words.style.marginTop = (margin + 40) + 'px';
                }
            }

            // move cursor again in case the text went up
            // move the cursor
            if (!isNull(nextLetter)) {
                cursor.style.top = nextLetter.getBoundingClientRect().top + 'px';
                cursor.style.left = nextLetter.getBoundingClientRect().left + 'px';
            } else {
                cursor.style.top = nextWord.getBoundingClientRect().top + 'px';
                cursor.style.left = nextWord.getBoundingClientRect().right + 'px';
            }
        }
    }

    useEffect(
        () => {

            const testBox = document.getElementById("test-container");
            

            testBox.addEventListener("keydown", handleKeyDown);

            runningWPM = setInterval(addGraphData, 1000);

            if (!isNull(wordList)) {

                addClass(testBox.querySelector('.word'), 'current');
                addClass(testBox.querySelector('.letter'), 'current');

                 // move cursor
                const nextLetter = document.querySelector('.letter.current');
                const nextWord = document.querySelector('.word.current');
                const cursor = document.getElementById('carat');
        
                // move the cursor
                if (!isNull(nextLetter)) {
                    cursor.style.top = nextLetter.getBoundingClientRect().top + 'px';
                    cursor.style.left = nextLetter.getBoundingClientRect().left + 'px';
                } else {
                    cursor.style.top = nextWord.getBoundingClientRect().top + 'px';
                    cursor.style.left = nextWord.getBoundingClientRect().right + 'px';
                }

                // focus on the text box
                document.getElementById("main-test-container").focus();
                    }
            return () => {
                testBox.removeEventListener("keydown", handleKeyDown);;
                clearInterval(runningWPM)
                
            };
        },
        [quote]
    )

    function resetTest() {
        charList = null;
        wordList = null;
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

    if (testCompletion) {

        clearInterval(runningWPM)
        addGraphData();
        console.log(wpmArr);
        console.log(timeArr);

        return (
            <div id="test-container" className="typing-test">
                WPM: {calculateWPM(startTime, Date.now(), numCorrect)}
                {" "}Accuracy: {Math.floor((numCorrect * 100 / (numWrong + numCorrect)))}%
                <br/>
                <WPMGraph wpmArr={wpmArr} timeArr={timeArr} />
                <button onClick={resetTest}>New Test</button>
            </div>
        )
    }
    
    return (

        <div id="test-container" className="typing-test">
            
            {/* WPM: {calculateWPM(startTime, Date.now(), currIndex)} */}
            {currWord } / {wordList.length}
            <br/>

            
            
            <div id="main-test-container" className="test-characters" tabIndex="0" ref={testBoxReference}>
                <div id="character-content-box" className="test-characters-content">

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