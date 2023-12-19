import { useState, useEffect } from "react";

/*
Need to:

Convert quote into list of characters Done

Handle when the user presses the keyboard
    Highlight the characters when a user presses the keyboard
    Turn char to red when a user presses the wrong key

Create a list representing what's actually showing on the screen

*/

const getCharList = (quote) => {

    const quoteText = quote.content;

    if (quoteText == null) {
        return null;
    }
    
    const charList = quoteText.split("");
    


    return charList;
}

const getWordList = (quote) => {

    const quoteText = quote.content;

    const wordList = quoteText.split(' ');

    return wordList;
}

const updateCharStyling = (currIndex) => {

    // update the styling for each character
    const allChars = document.getElementById("test-characters").querySelectorAll('span');

    allChars.forEach(
        (characterSpan, index) => {
            // only update styles if the character before is not a space to not change prev word.

            
            if (index == currIndex + 1) {
                characterSpan.classList.remove('untyped', 'typed');
                characterSpan.classList.add('current');
            } 
            else if (index < currIndex + 1) {
                characterSpan.classList.remove('untyped', 'current');
                characterSpan.classList.add('typed');
            }
            else {
                characterSpan.classList.remove('typed', 'current');
                characterSpan.classList.add('untyped');
            }
            
        })
}



function TypingTest({ quote }) {

    const [currIndex, updateIndex] = useState(0);
    const [inputValue, updateInputValue] = useState('');
    const [oldInputSize, setInputSize] = useState(0);

    const charList = getCharList(quote);

    // increment the index
    const increment = () => {
        updateIndex(() => currIndex + 1);
    }

    // decrement the index
    const decrement = () => {
        updateIndex(() => currIndex - 1);
    }

    // handle when the input value in the text box is changed.
    const handleInputChange = (event) => {

        const newString = event.target.value;
        updateInputValue(newString);
        
        // updates the index
        if (newString.length > oldInputSize) {

                // do work if the guess is right
            if (newString.charAt(newString.length - 1) == charList[currIndex]) {

                increment();
            }
            else {
                // Do work if the guess is wrong

            }
            updateCharStyling(currIndex);
        }

        // Only decrement if the new string is shorter, it's not the first index,
        // and the first character is not a space. This avoids going back to the previous word.
        else if (newString.length < oldInputSize && currIndex > 0 && charList[currIndex - 1] != ' ') {

            decrement();
            updateCharStyling(currIndex-2);
        }

        
        
        
        
        // perform final update to the input's size
        setInputSize(newString.length);
    }
    
    const content = quote.content;
    if (charList == null) {
        return (
        <div className="typing-test">
            Loading Quote.
        </div>
        )
    }
    return (

        <div className="typing-test">
        
            
            {currIndex}
            <br/> 
            <label for="hidden-text-box" id="test-characters">
            {charList.map(
                (item, index) => {
                    return (
                    <span key={index}
                          className="untyped">
                        {item}
                    </span>
                )}
            )}
            </label>
            <input id="hidden-text-box" type="text" value={inputValue} onChange={handleInputChange}/>
            
        </div>

    );
}

export default TypingTest