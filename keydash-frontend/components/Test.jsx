import { useRef, useState, useEffect } from "react";
import cx from 'classnames';



const Test = ({quote, isLoading}) => {

    const currLetter = useRef(null);
    const currWord = useRef(null);
    const [letterIndex, setLetterIndex] = useState(0);
    const [wordIndex, setWordIndex] = useState(0);
    const [words, setWords] = useState(null);

    // update the test to the beginning state when the quote changes
    useEffect(() => {
        setWords(
            quote?.content.split(" ").map((word, wordIndex) => {
        
                return word.split("").map((letter, letterIndex) => {
                    
                    // set the first letter of the first word to be selected
                    return {
                        key: letter,
                        status: wordIndex == 0 && letterIndex == 0 ? "selected" : "untyped",
                        isExtra: false,
                    }
                })
            })
        )
        // set the letter and word index to the beginning.
        setWordIndex(0)
        setLetterIndex(0)
    }, [quote])

    


    const handleKeyDown = (event) => {

        const pressedKey = event.key;
        const expectSpace = letterIndex == words[wordIndex].length;
        const expectedKey = expectSpace ? ' ' : words[wordIndex][letterIndex].key;

        // if space was pressed, default behavior is for screen to scroll.
        // do not let the screen scroll down.
        if (event.key === ' ') {
            event.preventDefault();
        }


        // only do work if the words were rendered
        if (!isLoading) {

            const tempWords = words;

            console.log("Pressed Key:" + pressedKey);
            console.log("Expected Key:" + expectedKey);
            console.log("Word index: " + wordIndex);
            console.log("Letter index: " + letterIndex);

            // handle backspace
            if (pressedKey == "Backspace") {

                const isFirstLetter = letterIndex == 0;
                const isFirstWord = wordIndex == 0;

                if (isFirstLetter) {

                    if (!isFirstWord) {
                        tempWords[wordIndex][letterIndex].status = 'untyped';

                        // last letter of the previous word is now selected
                        tempWords[wordIndex-1][tempWords[wordIndex - 1].length - 1].status = 'selected';
                        setLetterIndex(words[wordIndex-1].length - 1);
                        setWordIndex(wordIndex - 1);
                    }
                }
                if (expectedKey == ' ') {

                    // if the last character is extra, remove it
                    if (tempWords[wordIndex][letterIndex - 1].isExtra) {
                        tempWords[wordIndex].pop();
                    }
                    else {
                        tempWords[wordIndex][letterIndex - 1].status = 'selected';
                    }
                    // if not, just select the last letter
                    setLetterIndex(letterIndex - 1);
                }
                else {

                    // remove it if it's an extra letter
                    if (tempWords[wordIndex][letterIndex].isExtra) {
                        tempWords[wordIndex].pop();
                    }
                    // if not, make it untyped
                    else {
                        tempWords[wordIndex][letterIndex].status = 'untyped';
                    }

                    tempWords[wordIndex][letterIndex - 1].status = 'selected';
                    setLetterIndex(letterIndex - 1);
                }
                
            }
            else {

                const isLastLetter = letterIndex == words[wordIndex].length;

                if (pressedKey == expectedKey) {
                    
                    // is a space, go to next word if possible
                    if (isLastLetter) {

                        // style the next selected letter if there are words left
                        if (wordIndex + 1 < tempWords.length) {
                            tempWords[wordIndex + 1][0].status = 'selected'
                        }
                        setWordIndex(wordIndex + 1);
                        setLetterIndex(0);

                    }

                    else {

                        tempWords[wordIndex][letterIndex].status = 'correct'
                        // style the next letter if it's not a space
                        if (letterIndex + 1 < tempWords[wordIndex].length) {
                            tempWords[wordIndex][letterIndex + 1].status = 'selected'
                        }
                        setLetterIndex(letterIndex + 1);
                    }
                }

                // alphanumeric characters have a length of 1. Ignore all other
                // characters except space (skip to next word)
                else if (pressedKey.length == 1 || pressedKey == ' ') {
                    if (isLastLetter) {

                        tempWords[wordIndex].push(
                            {
                                key: pressedKey,
                                status: "extra",
                                isExtra: true,
                            }
                        )

                        setLetterIndex(letterIndex + 1);
                    }

                    // skip the rest of the word if space is hit too early
                    else if (pressedKey == ' ') {

                        for (let i = letterIndex; i < tempWords[wordIndex].length; i++) {
                            tempWords[wordIndex][i].status = 'incorrect';
                        }

                        // if there's a word after, style the first letter in that word
                        if (wordIndex + 1 < tempWords.length) {
                            tempWords[wordIndex + 1][0].status = 'selected';
                        }

                        setLetterIndex(0);
                        setWordIndex(wordIndex + 1); 
                    }
                    else {
                        tempWords[wordIndex][letterIndex].status = 'incorrect';
                        
                        // only style the next letter if there is a next letter in the word
                        if (letterIndex + 1 < tempWords[wordIndex].length) {
                            tempWords[wordIndex][letterIndex + 1].status = 'selected';
                        }
                        setLetterIndex(letterIndex + 1);
                    }
                }
            }

            // update words state for the next render
            setWords(tempWords);
        }
    }

    return (
        <>
            <p>Here is the test: </p>
            
            
            <div tabIndex="0" onKeyDown={handleKeyDown}>
                {!isLoading && words?.map((word, currWord)=> {
                    return (
                        <div key={currWord}>
                            {word.map((letter, currLetter) => {
                                return <span className={letter.status} key={currLetter}>{letter.key}</span>
                            })}
                        </div>
                    )
                })}
            </div>
            <div>
                {isLoading && <p>Loading</p>}
            </div>
            
            
        </>
    )
}

export default Test;