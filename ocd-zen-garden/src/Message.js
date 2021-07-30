import React,  {useState, useEffect, useRef} from 'react';
import useToggle from './hooks/useToggle';
import { getColor } from './utils';
import ControlBar from './ControlBar';

function Message(props){
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [nextIndex, setNextIndex] = useState(0);
    // const [letters, setLetters] = useState(['s', 'e', 'r', 'e', 'n', 'i', 't', 'y']);
    const [speed, setSpeed] = useState(1000);
    const [colorPalette, setColorPalette] = useState(props.palette);

    const generateTilt = () => {
        let x = Math.floor(Math.random() * 2) === 0 ? -1 : 1;
        let tilt = x * Math.random() * 55;
        return `${tilt}deg`
        
    }

    const [message, setMessage] = useState('Plus Ultra');

    const getLetters = string => {
        return string.split('').map((letter, idx) => {
            return {
                id: idx, 
                letter: letter,
                tilt: generateTilt(),
                color: (getColor(idx, 'baseColors'))
            }
        })
    }

    // const [letters, setLetters] = useState([{id: 1, letter: 's', tilt: generateTilt(), color: getColor(1, 'baseColors')}, {id: 2, letter: 'e', tilt: generateTilt(), color: getColor(2, 'baseColors')}, {id: 3, letter: 'r', tilt: generateTilt(), color: getColor(3, 'baseColors')}, {id: 4, letter: 'e', tilt: generateTilt(), color: getColor(4, 'baseColors')}, {id: 5, letter: 'n', tilt: generateTilt(), color: getColor(5, 'baseColors')}, {id: 6, letter: 'i', tilt: generateTilt(), color: getColor(6, 'baseColors')}, {id: 7, letter: 't', tilt: generateTilt(), color: getColor(7, 'baseColors')}, {id: 8, letter: 'y', tilt: generateTilt(), color: getColor(8, 'baseColors')}]);
    const [letters, setLetters] = useState(getLetters(message));

    let firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            if(nextIndex < letters.length){
                setTimeout(() => {
                    straightenLetters(nextIndex);
                }, speed);
            }
        } else {
            firstUpdate.current = false;
        }
    }, [letters]);
    
    const straightenLetters = (idx) => {
        let newLetters = letters.map(letter => {
            if(letter.id === letters[idx].id) {
                return {...letter, tilt: `0deg`}
            } else return letter;
        });
        // setLetters(newLetters);
        if(letters[nextIndex].letter !== ' ') {
            setNextIndex(idx + 1);
        } else {
            setNextIndex(idx + 2);
            console.log('found a space');
        }
        setLetters(newLetters);
        // setNextIndex(idx + 1);
        if(idx + 1 === letters.length) {
            setTimeout(() => {
                toggleIsOrganized();
            }, speed)
        }
    }

    const unalignLetters = () => {
        let newLetters = letters.map(letter => {
            return {...letter, tilt: generateTilt()};
        });
        setLetters(newLetters);
        toggleIsOrganized();
    }

    const handleSetSpeed = time => {
        setSpeed(time);
    }

    return (
        <div style={{border: '1px solid black', height: `${props.width * .33}px`}}>
            <p>Message Test</p>
            <div>
                {letters.map(letter => {
                    return <span style={{display: 'inline-block', margin: '1rem', fontSize: `${props.width * .33 * .1}px`, transform: `rotate(${letter.tilt})`, color: `${letter.color}`}}>{letter.letter}</span>
                })}
            </div>
            {/* <button onClick={isOrganized ? unalignLetters : () => straightenLetters(0)}>{isOrganized ? 'Unalign' : 'Straighten'}</button> */}
            <ControlBar isOrganized={isOrganized} setSpeed={handleSetSpeed} organizedFunction={unalignLetters} unorganizedFunction={() => straightenLetters(0)} unorgButton='Unalign' orgButton='Straighten' />
        </div>
    )
}

export default Message;