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
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('ding'));
    const [colorPalette, setColorPalette] = useState(props.palette);

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

    const getLetters = string => {
        let letters = string.split('').map((letter) => {
            return {
                letter: letter
            }
        });
        let index = 1;
        for(let a = 0; a < letters.length; a++) {
            if(letters[a].letter !== ' ') {
                letters[a].id = index;
                letters[a].tilt = generateTilt();
                letters[a].color =  getColor(index, colorPalette);
                index++;
            } else {
                letters[a].id = null;
                letters[a].tilt = `0px`;
                letters[a].color = null;
            }
        }
        return letters;
    }

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
            colorsDoNotUpdate.current = true;
        } else {
            colorFirstUpdate.current = false;
        }
    }, [props.palette]);

    const colorsDoNotUpdate = useRef(true)
    useEffect(() => {
        if(!colorsDoNotUpdate.current) {
            let newLetters = letters.map(letter => {
                return {...letter, color: getColor(letter.id, colorPalette)}
            });
            setLetters(newLetters);
        } else {
            colorsDoNotUpdate.current = false;
        }
        
    }, [colorPalette]);

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

    const handleSetColorPalette = palette => {
        colorsDoNotUpdate.current = false;
        setColorPalette(palette);
    }

    const handleToggleWindow = () => {
        if(props.fullWindow) {
            props.toggleWindow(null)
        } else {
            props.toggleWindow('message');
        }
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${props.width}px`, height: `${props.width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div>
                {letters.map(letter => {
                    let letterKey = uuidv4();
                    return <span key={letterKey} style={{display: 'inline-block', fontWeight:'500', textShadow: `-1px 1px ${getColor('border', colorPalette)}, 1px 1px 0 ${getColor('border', colorPalette)}, 1px -1px 0 ${getColor('border', colorPalette)}, -1px -1px 0 ${getColor('border', colorPalette)}`, margin: '1rem', fontSize: `${props.width * .105}px`, transform: `rotate(${letter.tilt})`, color: `${letter.color}`}}>{letter.letter}</span>
                })}
                <ControlBar toggleWindow={handleToggleWindow} fullWindow={props.fullWindow} palette={colorPalette} setPalette={handleSetColorPalette} isOrganizing={isOrganizing} isOrganized={isOrganized} text="Enter your own text" textValue={message} soundValue='ding' changeText={handleChangeText} setSpeed={handleSetSpeed} setSound={handleSetSound} organizedFunction={unalignLetters} unorganizedFunction={() => straightenLetters(0)} unorgButton='Unalign' orgButton='Straighten' />

            </div>
        </div>
    )
}

export default Message;