import React, {useEffect, useRef, useState} from 'react';
import useToggle from './hooks/useToggle';
import { v4 as uuidv4 } from 'uuid';
import { getColor, getSound, scaler } from './utils';
import ControlBar from './ControlBar';
import { Howl } from 'howler';

function Eyes(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [numRows, setNumRows] = useState(5);
    const [nextIndex, setNextIndex] = useState(0);
    const [colorPalette, setColorPalette] = useState(props.palette);
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('Sparkle'));

    const createStartingSquaresArray = num => {
        let squares = [];
        for(let i = 1; i < num ** 2 + 1; i++) {
            let left = 5 + Math.random() * 35;
            let top = 5 + Math.random() * 35;
            squares.push({
                id: i, 
                color: getColor(i, colorPalette),
                left: left * (Math.random > .5 ? 1 : -1),
                top: top * (Math.random > .5 ? 1 : -1),
                volumeMultiplier: scaler(10, 80, .3, 1, left + top),
                key: uuidv4()
            })
        }
        return squares
        
    }

    const [squares, setSquares] = useState(createStartingSquaresArray(numRows));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            if(nextIndex < squares.length){
                setTimeout(() => {
                    center(nextIndex);
                }, speed);
            } else {
                toggleIsOrganizing();
                toggleIsOrganized();
            }
        } else {firstUpdate.current = false}
    }, [nextIndex])
    
    const colorsFirstUpdate = useRef(true)
    useEffect(() => {
        if(!colorsFirstUpdate.current) {
            let newSquares = squares.map(square => {
                return {...square, color: getColor(square.id, props.palette)}
            });
            setColorPalette(props.palette);
            setSquares(newSquares);
            colorsDoNotUpdate.current = true;
        } else {
            colorsFirstUpdate.current = false;
        }
        
    }, [props.palette]);

    const colorsDoNotUpdate = useRef(true)
    useEffect(() => {
        if(!colorsDoNotUpdate.current) {
            let newSquares = squares.map(square => {
                return {...square, color: getColor(square.id, colorPalette)}
            });
            setSquares(newSquares);
        } else {
            colorsDoNotUpdate.current = false;
        }
        
    }, [colorPalette]);

    const soundPlay = (soundObj, multiplier) => {
        const sound = new Howl({
            src: soundObj.src,
            sprite: soundObj.sprite,
            volume: props.volume * .01 * multiplier
        });
        sound.play(soundObj.spriteName);
    }

    const center = idx => {
        if(idx === 0) toggleIsOrganizing();
        let newSquares = squares.map(square => {
            if(square.id === squares[idx].id) {
                square.top = 0;
                square.left = 0
            }
            return square
        });
        let nextIdx = idx + 1;

        soundPlay(sound, squares[idx].volumeMultiplier);
        setSquares(newSquares);
        if(nextIdx < squares.length) {
            setNextIndex(nextIdx);
        } else {
            setTimeout(() => {
                toggleIsOrganizing();
                toggleIsOrganized();
            }, speed);
        }
    };

    const randomize = () => {
        let newSquares = squares.map(square => {
            let left = 5 + Math.random() * 35;
            let top = 5 + Math.random() * 35;
            return {...square, 
                left: left * (Math.random > .5 ? 1 : -1),
                top: top * (Math.random > .5 ? 1 : -1),
                volumeMultiplier: scaler(10, 80, .3, 1, left + top),
            };
        });
        setSquares(newSquares);
        toggleIsOrganized();
    };

    const handleSetSpeed = time => {
        setSpeed(time);
    }

    const handleSetSound = sound => {
        setSound(getSound(sound));
    }
    const handleSetNumRows = num => {
        setNumRows(Number(num));
        setSquares(createStartingSquaresArray(Number(num)))
    }

    const handleSetColorPalette = palette => {
        colorsDoNotUpdate.current = false;
        setColorPalette(palette);
    }

    const handleChangeVolume = volume => {
        props.changeVolume(volume);
    }

    const displaySquares = () => {
        let squareLines = []
        let newLine = []
        for(let k = 0; k < numRows**2; k++){
            newLine.push(squares[k]);
            if(newLine.length === numRows){
                squareLines.push(newLine);
                newLine = []
            }
        }
        return squareLines;
    }

    const handleToggleWindow = () => {
        if(props.fullWindow) {
            props.toggleWindow(null)
        } else {
            props.toggleWindow('eyes');
        }
    }

    return (
        <div style={{margin: props.fullWindow ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${props.width}px`, height: `${props.width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%'}}>
                    <div>
                        {displaySquares().map(squareLine => {
                            let lineKey = uuidv4()
                            return <div key={lineKey} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{squareLine.map(square => {
                                let squareKey = uuidv4()
                                return <div key={square.key} style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor:`${square.color}`, border: `1px solid ${getColor('border', colorPalette)}`, width: `${Math.floor(props.width * .70 * (1 / (numRows + 2)))}px`, height: `${Math.floor(props.width * .70 * (1 / (numRows + 2)))}px`, margin: `${Math.floor((props.width * .70 * (1 / (numRows + 2)) / (numRows + 2)))}px`}}><div style={{position: 'relative', height: '20%', width: '20%', left: `${square.left}%`, top: `${square.top}%`, border: `1px solid ${getColor('border', colorPalette)}`, backgroundColor: '#303030'}}></div></div>
                            })}</div>
                        })}
                    </div>
                </div>
                <ControlBar toggleWindow={handleToggleWindow} fullWindow={props.fullWindow} disableFullWindow={props.disableFullWindow} setModalContent={props.setModalContent} volume={props.volume} changeVolume={handleChangeVolume} palette={colorPalette} setPalette={handleSetColorPalette} minNum={3} maxNum={20} number={numRows} setNumber={handleSetNumRows} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='Sparkle' organizedFunction={randomize} unorganizedFunction={() => center(0)} unorgButton='Randomize' orgButton='Center'/>
            </div>
        </div>
    )
}

export default Eyes;