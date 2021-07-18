import React,  {useState, useEffect, useRef} from 'react';
import useToggle from './hooks/useToggle';

function Message(props){
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [nextIndex, setNextIndex] = useState(1);
    // const [letters, setLetters] = useState(['s', 'e', 'r', 'e', 'n', 'i', 't', 'y']);
    const generateTilt = () => {
        let x = Math.floor(Math.random() * 2) === 0 ? -1 : 1;
        let tilt = x * Math.random() * 50;
        return `${tilt}deg`
        
    }
    const [letters, setLetters] = useState([{id: 1, letter: 's', tilt: generateTilt()}, {id: 2, letter: 'e', tilt: generateTilt()}, {id: 3, letter: 'r', tilt: generateTilt()}, {id: 4, letter: 'e', tilt: generateTilt()}, {id: 5, letter: 'n', tilt: generateTilt()}, {id: 6, letter: 'i', tilt: generateTilt()}, {id: 7, letter: 't', tilt: generateTilt()}, {id: 8, letter: 'y', tilt: generateTilt()}]);

    const straightenLetters = (idx) => {
    }

    const unalignLetters = () => {
    }

    return (
        <div style={{border: '1px solid black', height: `${props.width * .33}px`}}>
            <p>Message Test</p>
            <div>
                {letters.map(letter => {
                    return <span style={{display: 'inline-block', margin: '1rem', fontSize: `${props.width * .33 * .1}px`, transform: `rotate(${letter.tilt})`}}>{letter.letter}</span>
                })}
            </div>
            <button onClick={isOrganized ? unalignLetters : () => straightenLetters(0)}>{isOrganized ? 'Unalign' : 'Straighten'}</button>
        </div>
    )
}

export default Message;