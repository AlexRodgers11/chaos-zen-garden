import React,  {useState, useEffect, useRef} from 'react';
import { useSelector } from 'react-redux';
import { sizeActions } from './store/size';
import useGardenSpecs from './hooks/useGardenSpecs';
import usePieceSpecs from './hooks/usePieceSpecs';
import { organizingCounterActions } from './store/organizing-counter';
import { getColor, scaler, soundPlay } from './utils';
import ControlBar from './ControlBar';
import { v4 as uuidv4 } from 'uuid';

function Message(props){
    const palette = useSelector((state) => state.palette.palette);
    const [colorPalette, setColorPalette] = useState(palette);
    const [width, volume, fullView, dispatch] = useGardenSpecs();
    const pieceSpecs = usePieceSpecs({id: 0, dir: 'topLeft'}, props.number, props.proportionalVolume, props.shape, props.sound, props.speed, props.text);

    const [message, setMessage] = useState('Plus Ultra, Go Beyond.');

    const getLetters = string => {
        let letters = string.split('').map((letter) => {
            return {
                letter: letter
            }
        });
        let index = 1;
        for(let a = 0; a < letters.length; a++) {
            let random = (Math.random() * 20 + 5) * (Math.random() > .5 ? 1 : -1);
            if(letters[a].letter !== ' ') {
                letters[a].id = index;
                letters[a].tilt = random
                letters[a].color =  getColor(index, colorPalette);
                letters[a].key = uuidv4();
                letters[a].volumeMultiplier = scaler(5, 25, .003, .01, Math.abs(random));
                index++;
            } else {
                letters[a].id = null;
                letters[a].tilt = `0px`;
                letters[a].color = null;
                letters[a].key = uuidv4();
            }
        }
        return letters;
    }

    const [letters, setLetters] = useState(getLetters(message));

    let firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            if(pieceSpecs.nextIndex < letters.length){
                setTimeout(() => {
                    straightenLetters(pieceSpecs.nextIndex);
                }, pieceSpecs.speed);
            }
        } else {
            firstUpdate.current = false;
        }
    }, [pieceSpecs.nextIndex]);
    
    const straightenLetters = (idx) => {
        if(idx === 0) {
            pieceSpecs.toggleIsOrganizing();
            dispatch(organizingCounterActions.incrementOrganizingCounter())
        }
        let newLetters = letters.map(letter => {
            if(letter.id === letters[idx].id) {
                return {...letter, tilt: 0}
            } else return letter;
        });
        soundPlay(pieceSpecs.soundObj, letters[idx].volumeMultiplier, volume, pieceSpecs.proportionalVolume);
        setLetters(newLetters);
        if(idx + 1 !== letters.length) {
            if(pieceSpecs.nextIndex === letters.length) {
                idx = 0;
            }
            if(letters[idx + 1].letter !== ' ') {
                pieceSpecs.setNextIndex(idx + 1);
            } else {
                pieceSpecs.setNextIndex(idx + 2);
            }
        } else {
            dispatch(organizingCounterActions.decrementOrganizingCounter());
            setTimeout(() => {
                pieceSpecs.toggleIsOrganized();
                pieceSpecs.toggleIsOrganizing();
            }, pieceSpecs.speed)
        }
    }

    let colorFirstUpdate = useRef(true);
    useEffect(() => {
        if(!colorFirstUpdate.current) {
            let newLetters = letters.map(letter => {
                return {...letter, color: getColor(letter.id, palette)}
            });
            setLetters(newLetters);
            setColorPalette(palette);
            colorsDoNotUpdate.current = true;
        } else {
            colorFirstUpdate.current = false;
        }
    }, [palette]);

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

    useEffect(() => {
        return () => {
            console.log('Message is cleaning up');
        }
    }, [fullView])

    const handleChangeText = text => {
        if(pieceSpecs.isOrganized) {
            pieceSpecs.toggleIsOrganized();
        };
        setMessage(text);
        setLetters(getLetters(text));
    }

    const unalignLetters = () => {
        let newLetters = letters.map(letter => {
            let random = (Math.random() * 20 + 5) * (Math.random() > .5 ? 1 : -1);
            if(letter.id) {
                return {
                    ...letter, 
                    tilt: random,
                    volumeMultiplier: scaler(5, 25, .003, .01, Math.abs(random))
                };
            } else {
                return letter;
            }
        });
        setLetters(newLetters);
        pieceSpecs.toggleIsOrganized();
        
    }

    const handleSetColorPalette = palette => {
        colorsDoNotUpdate.current = false;
        setColorPalette(palette);
    }

    const displayWords = letterArr => {
        let fontSize;
        if(letterArr.length > 25) {
            fontSize = width * .035
        } else {
            fontSize = width * .06
        }

        let words = [];
        let start = 0;
        for(let a = 0; a < letterArr.length; a++) {
            if(letterArr[a].letter !== ' ') {

                if(a === letterArr.length - 1) {
                    words.push(letterArr.slice(start, a + 1));
                }
            } else {
                words.push(letterArr.slice(start, a + 1));
                start = a + 1;
            }
        }
        return words.map(word => {
            let wordKey = uuidv4();
            return <span key={wordKey} style={{display: 'inline-block'}}>
                {word.map(letter => {
                    return <span key={letter.key} style={{display: 'inline-block', fontWeight:'500', textShadow: `-1px 1px ${getColor('border', colorPalette)}, 1px 1px 0 ${getColor('border', colorPalette)}, 1px -1px 0 ${getColor('border', colorPalette)}, -1px -1px 0 ${getColor('border', colorPalette)}`, margin: '1rem', fontSize: `${fontSize}px`, transform: `rotate(${letter.tilt}deg)`, color: `${letter.color}`}}>{letter.letter}</span>
                })}
            </span>
        })
    }

    const handleToggleFullView = () => {
        dispatch(sizeActions.setFullView(
            [
                props.id, {
                    type: 'message',
                    palette: palette,
                    speed: pieceSpecs.speed,
                    sound: pieceSpecs.soundName,
                    proportionalVolume: pieceSpecs.proportionalVolume,
                    number: pieceSpecs.number,
                    shape: pieceSpecs.shape ,
                    text: pieceSpecs.text
                }
            ]
        ));
    }

    return (
        <div style={{margin: fullView ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${width}px`, height: `${width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', width: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%'}}>
                    <div style={{ width: '100%'}}>
                        {displayWords(letters)}
                    </div>
                </div>
                <ControlBar id={props.id} toggleFullView={handleToggleFullView} changeProportionalVolume={pieceSpecs.setProportionalVolume} proportionalVolume={pieceSpecs.proportionalVolume} palette={colorPalette} setPalette={handleSetColorPalette} isOrganizing={pieceSpecs.isOrganizing} isOrganized={pieceSpecs.isOrganized} text="Enter your own text" textValue={message} soundValue='Robot' changeText={handleChangeText} setSpeed={pieceSpecs.setSpeed} setSound={pieceSpecs.setSound} organizedFunction={unalignLetters} unorganizedFunction={() => straightenLetters(0)} unorgButton='Unalign' orgButton='Straighten' />
            </div>
        </div>
    )
}

export default Message;