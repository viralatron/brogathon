import React, { useEffect, useState } from "react";

import wordList from './resources/words.json';
import Word from "./Word";

const CHAR_LIMIT = 47;

const getWord = () => {
    const index = Math.floor(Math.random() * wordList.length);

    const word = wordList[index];

    return word.toLowerCase();
}
const App = () => {
    const [typedKeys, setTypedKeys] = useState([]);
    const [validKeys, setValidKeys] = useState([]);
    const [word, setWord] = useState('');

    const isValidKey = (key, word) => {
        if(!word || !key) return false;
        const result = word.split('').includes(key);

        return result;
    };

    const handleKeyDown = (e) => {
        e.preventDefault();
    
        const { key } = e;

        setTypedKeys((prev) => [...prev, key].slice(-1 * CHAR_LIMIT));

        if(isValidKey(key, word)){
            
            setValidKeys((prev) => {
                const isValidLenth = prev.length <= word.length;
                const isNextChar = isValidLenth && word[prev.length] == key;
                
                return (isNextChar) ? [...prev, key] : prev;
            });
        }
        
        console.log('key', key);
    };

    useEffect(() => {
        setWord(getWord());
    }, []);

    return(
        <div className="container" tabIndex="0" onKeyDown={handleKeyDown}>
            <div className="valid-keys">
                <Word word={word} validKeys={validKeys} />
            </div>
            <div className="typed-keys">{ typedKeys ? typedKeys.join(' ') : null}</div>
            <div className="completed-words">
                <ol>
                    <li>alface</li>
                    <li>twitter</li>
                    <li>profissional</li>
                </ol>
            </div>
        </div>
    );
}

export default App;