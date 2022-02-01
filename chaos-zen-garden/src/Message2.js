import React,  {useState, useEffect, useRef} from 'react';
import { useSelector } from 'react-redux';
import useGardenSpecs from './hooks/useGardenSpecs';
import usePieceSpecs from './hooks/usePieceSpecs';
import { sizeActions } from './store/size';
import { organizingCounterActions } from './store/organizing-counter';
import { getColor, soundPlay } from './utils';
import ControlBar from './ControlBar/ControlBar';
import { v4 as uuidv4 } from 'uuid';
import { Howl } from 'howler';

function Message2(props){
    const palette = useSelector((state) => state.palette.palette);
    const [colorPalette, setColorPalette] = useState(palette);
    const [width, volume, fullView, dispatch] = useGardenSpecs();
    const pieceSpecs = usePieceSpecs(1, props.number, props.proportionalVolume, props.shape, props.sound, props.speed, props.text);

    const [message, setMessage] = useState('Plus Ultra, Go Beyond.');

    const fonts = ["='Allison', cursive", "'Architects Daughter', cursive", "'Diplomata SC', cursive", "'Indie Flower', cursive", "'Lobster', cursive", "'Ma Shan Zheng', cursive", "'Ma Shan Zheng', cursive", "'Mystery Quest', cursive", "'Nosifer', cursive", "'Vibur', cursive"]

    const getLetters = string => {
        let letters = string.split('').map((letter) => {
            return {
                letter: letter,
            }
        });
        let index = 1;
        for(let a = 0; a < letters.length; a++) {
            if(letters[a].letter !== ' ') {
                letters[a].id = index;
                letters[a].color =  getColor(index, colorPalette);
                letters[a].font = fonts[Math.floor(Math.random() * fonts.length)]
                index++;
                letters[a].key = uuidv4()
            } else {
                letters[a].id = null;
                letters[a].color = null;
                letters[a].key = uuidv4()
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
                    matchLetters(pieceSpecs.nextIndex);
                }, pieceSpecs.speed);
            }
        } else {
            firstUpdate.current = false;
        }
    }, [pieceSpecs.nextIndex]);
    
    const matchLetters = (idx) => {
        if(idx === 1) {
            pieceSpecs.toggleIsOrganizing();
            dispatch(organizingCounterActions.incrementOrganizingCounter())
            while(letters[idx].font === letters[0].font) {
                idx++;
            }
        }
        let nextIdx = idx + 1;
        while(nextIdx < letters.length && (letters[nextIdx].font === letters[0].font || letters[nextIdx].letter === ' ')) {
            nextIdx++
        } 

        if(letters[nextIdx] === letters.length - 1 && letters[nextIdx].font === letters[0].font) {
            nextIdx++
        }

        let newLetters = letters.map(letter => {
            if(letter.id === letters[idx].id) {
                return {...letter, font: letters[0].font}
            } else return letter;
        });
        soundPlay(pieceSpecs.soundObj, .01, volume, pieceSpecs.proportionalVolume);
        setLetters(newLetters);

        if(nextIdx === letters.length) {
            dispatch(organizingCounterActions.decrementOrganizingCounter());
            setTimeout(() => {
                pieceSpecs.toggleIsOrganized();
                pieceSpecs.toggleIsOrganizing();
            }, pieceSpecs.speed);
        } else {
            pieceSpecs.setNextIndex(nextIdx);
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
            console.log('Message2 is cleaning up');
        }
    }, [fullView])

    const handleChangeText = text => {
        if(pieceSpecs.isOrganized) {
            pieceSpecs.toggleIsOrganized();
        };
        setMessage(text);
        setLetters(getLetters(text));
    }

    const randomizeLetters = () => {
        let newLetters = letters.map(letter => {
            return {...letter, font:fonts[Math.floor(Math.random() * fonts.length)]};
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
                    return <span key={letter.key} style={{display: 'inline-block', fontWeight:'500', textShadow: `-1px 1px ${getColor('border', colorPalette)}, 1px 1px 0 ${getColor('border', colorPalette)}, 1px -1px 0 ${getColor('border', colorPalette)}, -1px -1px 0 ${getColor('border', colorPalette)}`, margin: '1rem', fontFamily: letter.font, fontSize: `${fontSize}px`, color: `${letter.color}`}}>{letter.letter}</span>
                })}
            </span>
        })
    }

    const handleToggleFullView = () => {
        dispatch(sizeActions.setFullView(
            [
                props.id, {
                    type: 'message2',
                    palette: palette,
                    speed: pieceSpecs.speed,
                    sound: pieceSpecs.soundName,
                    proportionalVolume: pieceSpecs.proportionalVolume,
                    number: pieceSpecs.number,
                    shape: pieceSpecs.shape,
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
                <ControlBar id={props.id} toggleFullView={handleToggleFullView} palette={colorPalette} setPalette={handleSetColorPalette} isOrganizing={pieceSpecs.isOrganizing} isOrganized={pieceSpecs.isOrganized} text="Enter your own text" textValue={pieceSpecs.text} soundValue='Sparkle' changeText={handleChangeText} setSpeed={pieceSpecs.setSpeed} setSound={pieceSpecs.setSound} organizedFunction={randomizeLetters} unorganizedFunction={() => matchLetters(1)} unorgButton='Randomize' orgButton='Match' />

            </div>
        </div>
    )
}

export default Message2;