import React,  {useState, useEffect, useRef} from 'react';
import useToggle from './hooks/useToggle';
import { getColor, getSound } from './utils';
import ControlBar from './ControlBar';
import { v4 as uuidv4 } from 'uuid';
import { Howl } from 'howler';
// import Ding from './assets/ding.wav';

function Message(props){
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [nextIndex, setNextIndex] = useState(0);
    // const [letters, setLetters] = useState(['s', 'e', 'r', 'e', 'n', 'i', 't', 'y']);
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('ding'));
    const [colorPalette, setColorPalette] = useState(props.palette);
    
    // const soundPlay = src => {
    //     const sound = new Howl({
    //         src: src,
    //         sprite: {
    //             ding: [0, 350]
    //         }
    //     });
    //     sound.play('ding');
    // }

    const soundPlay = soundObj => {
        const sound = new Howl({
            src: soundObj.src,
            sprite: soundObj.sprite
        });
        sound.play(soundObj.spriteName);
    }

    const generateTilt = () => {
        let x = Math.floor(Math.random() * 2) === 0 ? -1 : 1;
        let tilt = x * Math.random() * 25;
        return `${tilt}deg`
        
    }

    const [message, setMessage] = useState('Plus Ultra');

    // const getLetters = string => {
    //     return string.split('').map((letter, idx) => {
    //         return {
    //             id: idx, 
    //             letter: letter,
    //             tilt: generateTilt(),
    //             color: (getColor(idx, 'baseColors'))
    //         }
    //     })
    // }

    const getLetters = string => {
        let letters = string.split('').map((letter) => {
            return {
                // id: idx, 
                letter: letter,
                // tilt: generateTilt(),
                // color: (getColor(idx, 'baseColors'))
            }
        });
        let index = 1;
        for(let a = 0; a < letters.length; a++) {
            if(letters[a].letter !== ' ') {
                letters[a].id = index;
                letters[a].tilt = generateTilt();
                letters[a].color =  getColor(index, 'baseColors');
                index++;
            } else {
                letters[a].id = null;
                letters[a].tilt = `0px`;
                letters[a].color = null;
            }
        }
        return letters;
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
    }, [nextIndex]);
    
    // const straightenLetters = (idx) => {
    //     let newLetters = letters.map(letter => {
    //         if(letter.id === letters[idx].id) {
    //             return {...letter, tilt: `0deg`}
    //         } else return letter;
    //     });
    //     // if(letters[nextIndex].letter !== ' ') {
    //     //     setNextIndex(idx + 1);
    //     // } else {
    //     //     setNextIndex(idx + 2);
    //     //     console.log('found a space');
    //     // }
    //     soundPlay(Ding);
    //     setLetters(newLetters);
    //     setNextIndex(idx + 1);
    //     // setNextIndex(idx + 1);
    //     if(idx + 1 === letters.length) {
    //         setTimeout(() => {
    //             toggleIsOrganized();
    //         }, speed)
    //     }
    // }

    const straightenLetters = (idx) => {
        if(idx === 0) {
            toggleIsOrganizing();
        }
        let newLetters = letters.map(letter => {
            if(letter.id === letters[idx].id) {
                return {...letter, tilt: `0deg`}
            } else return letter;
        });
        soundPlay(sound);
        setLetters(newLetters);
        if(idx + 1 !== letters.length) {
            if(nextIndex === letters.length) {
                idx = 0;
            }
            if(letters[idx + 1].letter !== ' ') {
                setNextIndex(idx + 1);
            } else {
                setNextIndex(idx + 2);
                console.log('found a space');
            }
        } else {
            setTimeout(() => {
                toggleIsOrganized();
                toggleIsOrganizing();
            }, speed)
        }
    }

    let colorFirstUpdate = useRef(true);
    useEffect(() => {
        if(!colorFirstUpdate.current) {
            let newLetters = letters.map(letter => {
                return {...letter, color: getColor(letter.id, props.palette)}
            });
            setLetters(newLetters);
            setColorPalette(props.palette);
        } else {
            colorFirstUpdate.current = false;
        }
    }, [props.palette]);

    const handleChangeText = text => {
        if(isOrganized) {
            toggleIsOrganized();
        };
        setMessage(text);
        setLetters(getLetters(text));
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

    const handleSetSound = sound => {
        setSound(getSound(sound));
    }

    return (
        <div style={{border: '1px solid black', height: `${props.width * .33}px`}}>
            <div>
                {letters.map(letter => {
                    let letterKey = uuidv4();
                    return <span key={letterKey} style={{display: 'inline-block', textShadow: `-1px 1px  #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000`, margin: '1rem', fontSize: `${props.width * .33 * .1}px`, transform: `rotate(${letter.tilt})`, color: `${letter.color}`}}>{letter.letter}</span>
                })}
            </div>
            {/* <button onClick={isOrganized ? unalignLetters : () => straightenLetters(0)}>{isOrganized ? 'Unalign' : 'Straighten'}</button> */}
            <ControlBar isOrganizing={isOrganizing} isOrganized={isOrganized} text="Enter your own text" textValue={message} soundValue='ding' changeText={handleChangeText} setSpeed={handleSetSpeed} setSound={handleSetSound} organizedFunction={unalignLetters} unorganizedFunction={() => straightenLetters(0)} unorgButton='Unalign' orgButton='Straighten' />
        </div>
    )
}

export default Message;