# KeyDash

KeyDash is a site inspired by [MonkeyType](https://monkeytype.com/) and [KeyBr](https://www.keybr.com/) 
for the purpose of practicing web development through a means that I find interesting: typing tests!

## Current Site

Still Under Construction...

Mostly working on the frontend via React.js.

To run on your local machine, fork the repository then run the following:
### `npm install`
### `npm start`

#### Home Page
![keydash-home](https://github.com/tezock/KeyDash/assets/105029396/e731d66c-1e85-4122-bcfd-7fd90c17f152)

#### Test Completion Page
![keydash-graph](https://github.com/tezock/KeyDash/assets/105029396/2d1bed58-dab6-47ab-a715-84a986305885)

## Features:

-Scrolling up and down through typing test

-Quotes provided by the Quotable API

-Interface for completed tests presenting users with their results

## Bugfixes:

-Accounted for backspacing from the first character in the test. Text didn't render when backspace pressed at the beginning.

-Proper styling when backspacing to previous word. Going back to a previous word went 1 index back too far.

-Scrolling up to previous lines now properly working.

-Checked for null cursor pointer to avoid runtime error when tests are completed.

-Accounted for spaces when calculating WPM. Was previously receiving WPM results 20% lower than expected.

### Notes:

-Pesticide is helpful!

-Struggled with automatic scrolling, as I previously used an 'invisible/hidden form' to track user input, using
a label tag to represent the characters in the typing test. However, when this scales to longer tests
(or if users want to do tests for a given length of time), the fault of this system is exposed as the
text may not always stay on the screen. Solved by using event handlers and a div which has a hidden
overflow CSS property, so that only the necessary lines are shown, and when the user progresses to the
third line, the test shifts itself up automatically.

-Kept running into issues with null references when selecting the first word and letter in a given test.
At first, I used a useEffect hook to add a 'selected' class onto these items, but an issue kept persisting where
not only did I repeatedly add the same class onto an element, but the correct class could also not be rendered entirely.
Solved by re-rendering the page when the quote fully renders. Because the quotes may be called asyncrhonously via
an API, the first render may not always render the necessary text to be selected. Thus, when I update the
page when the quote updates, I properly update the necesary items in the DOM.

-Watch out for both 'undefined' and 'null' values. Helps a lot to make a helper function that checks
both

-Built a a working version of the input field! However, I made it more 'stateful' than intended.
Only up from here!

-Refactoring in web dev is a pain.. first time using branches to manage version control! Previously
I'd just made a copy of the file to keep the original version, but this method simplifies the process.


