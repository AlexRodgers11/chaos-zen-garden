import React, {useEffect, useRef, useState} from 'react';
import { useSelector } from 'react-redux';
import useToggle from './hooks/useToggle';
import { v4 as uuidv4 } from 'uuid';
import { getColor, getSound, scaler, soundPlay } from './utils';
import ControlBar from './ControlBar';

function Squares(props) {
    const palette = useSelector((state) => state.palette.palette);
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [numRows, setNumRows] = useState(5);
    const [nextIndex, setNextIndex] = useState({id: 0, dir: 'topLeft'});
    const [colorPalette, setColorPalette] = useState(palette);
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('Ding'));
    const [proportionalVolume, setProportionalVolume] = useState('proportional');

    const createStartingSquaresArray = num => {
        let squares = [];
        for(let i = 1; i < num ** 2 + 1; i++) {
            squares.push({
                id: i, 
                color: getColor(i, colorPalette),
                topLeft: Math.random() * 10 + 5,
                topRight: Math.random() * 10 + 5,
                bottomLeft: Math.random() * 10 + 5,
                bottomRight: Math.random() * 10 + 5,
                key: uuidv4()
            })
        }
        return squares
        
    }

    const getNextDir = dir => {
        switch(dir) {
            case 'topLeft':
                return 'topRight'
            case 'topRight':
                return 'bottomLeft'
            case 'bottomLeft':
                return 'bottomRight'
            case 'bottomRight':
                return 'topLeft'
        }
    }

    const [squares, setSquares] = useState(createStartingSquaresArray(numRows));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            if(nextIndex.id < squares.length || nextIndex.dir !== 'topLeft'){
                setTimeout(() => {
                    sharpen(nextIndex.id, nextIndex.dir);
                }, speed);
            } else {
                toggleIsOrganizing();
                toggleIsOrganized();
                props.setNumOrganizing(-1);
            }
        } else {firstUpdate.current = false}
    }, [nextIndex])
    
    const colorsFirstUpdate = useRef(true)
    useEffect(() => {
        if(!colorsFirstUpdate.current) {
            let newSquares = squares.map(square => {
                return {...square, color: getColor(square.id, palette)}
            });
            setColorPalette(palette);
            setSquares(newSquares);
            colorsDoNotUpdate.current = true;
        } else {
            colorsFirstUpdate.current = false;
        }
        
    }, [palette]);

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

    // const soundPlay = (soundObj, multiplier) => {
    //     const sound = new Howl({
    //         src: soundObj.src,
    //         sprite: soundObj.sprite,
    //         volume: props.volume * .01 * multiplier
    //     });
    //     sound.play(soundObj.spriteName);
    // }

    const sharpen = (idx, dir) => {
        if(idx === 0 && dir === 'topLeft') {
            toggleIsOrganizing();
            props.setNumOrganizing(1);
        } 
        let newSquares = squares.map(square => {
            if(square.id === squares[idx].id) {
                return {...square, [dir]: 0}
            } else {
                return square;
            }
        });
        switch(dir) {
            case 'topLeft':
                soundPlay(sound, scaler(5, 15, .0075, .01, squares[idx].topLeft), props.volume, proportionalVolume);
                break;
            case 'topRight':
                soundPlay(sound, scaler(5, 15, .0075, .01, squares[idx].topRight), props.volume, proportionalVolume);
                break;
            case 'bottomLeft':
                soundPlay(sound, scaler(5, 15, .0075, .01, squares[idx].bottomLeft), props.volume, proportionalVolume);
                break;
            case 'bottomRight':
                soundPlay(sound, scaler(5, 15, .0075, .01, squares[idx].bottomRight), props.volume, proportionalVolume);
                break;
        }
        
        setSquares(newSquares);
        setNextIndex({id: dir === 'bottomRight' ? idx + 1 : idx, dir: getNextDir(dir)})        
    }

    const dull = () => {
        let newSquares = squares.map(square => {
            return {...square, topLeft: Math.random() * 15, topRight: Math.random() * 15, bottomLeft: Math.random() * 15, bottomRight: Math.random() * 15}
        })
        setSquares(newSquares);
        toggleIsOrganized();
    }

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

    const handleChangeProportionalVolume = selection => {
        setProportionalVolume(selection);
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

    return (
        <div style={{margin: props.fullWindow ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${props.width}px`, height: `${props.width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%'}}>
                    <div>
                        {displaySquares().map(squareLine => {
                            let lineKey = uuidv4()
                            return <div key={lineKey}>{squareLine.map(square => {
                                // return <div style={{display: 'inline-block', backgroundColor:`${square.color}`, border: `1px solid ${getColor('border', colorPalette)}`, borderRadius: `${square.topLeft}% ${square.topRight}% ${square.bottomRight}% ${square.bottomLeft}%`, width: `${props.width * (1 / 9)}px`, height: `${props.width * (1 / 9)}px`, margin: `${props.width * (1 / 81)}px`}}></div>
                                return <div key={square.key} style={{display: 'inline-block', backgroundColor:`${square.color}`, border: `1px solid ${getColor('border', colorPalette)}`, borderRadius: `${square.topLeft}% ${square.topRight}% ${square.bottomRight}% ${square.bottomLeft}%`, width: `${props.width * .70 * (1 / (numRows + 2))}px`, height: `${props.width * .70 * (1 / (numRows + 2))}px`, margin: `${(props.width * .70 * (1 / (numRows + 2)) / (numRows + 2))}px`}}></div>
                            })}</div>
                        })}
                    </div>
                </div>
                <ControlBar width={props.width} piece='squares' loggedIn={props.loggedIn} setNumOrganizing={props.setNumOrganizing} toggleHighlightUserIcon={props.toggleHighlightUserIcon} setModalContent={props.setModalContent} changeProportionalVolume={handleChangeProportionalVolume} proportionalVolume={proportionalVolume} volume={props.volume} changeVolume={handleChangeVolume} palette={colorPalette} setPalette={handleSetColorPalette} minNum={3} maxNum={9} number={numRows} setNumber={handleSetNumRows} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='Ding' organizedFunction={dull} unorganizedFunction={() => sharpen(0, 'topLeft')} unorgButton='Dull' orgButton='Sharpen'/>
            </div>
        </div>
    )
}

export default Squares;