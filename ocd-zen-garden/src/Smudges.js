import React, {useEffect, useRef, useState} from 'react';
import useToggle from './hooks/useToggle';
import { getColor, getSound } from './utils';
import ControlBar from './ControlBar';
import { Howl } from 'howler';
import { GiSplurt } from 'react-icons/gi';
import { RiBubbleChartFill } from 'react-icons/ri';
import Smudge from './Smudge';
import { BsLayoutTextWindowReverse } from 'react-icons/bs';

function Smudges(props) {
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
            let verticalMultiplier = Math.random() >= .5 ? 1 : -1;
            let horizontalMultiplier = Math.random() >= .5 ? 1 : -1;
            squares.push({
                id: i, 
                color: getColor(i, colorPalette),
                left: Math.random(),
                top: Math.random(),
                size: 20 + Math.random() * 40,
                contaminated: Math.random() > .35 ? true : false,
                rotation: Math.random()
            })
        }
        return squares
        
    }

    const [squares, setSquares] = useState(createStartingSquaresArray(numRows));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            // if(nextIndex.id < squares.length || nextIndex.dir !== 'topLeft'){
            if(nextIndex < squares.length){
                setTimeout(() => {
                    // clean(nextIndex.id, nextIndex.dir);
                    clean(nextIndex);
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

    const soundPlay = soundObj => {
        const sound = new Howl({
            src: soundObj.src,
            sprite: soundObj.sprite,
            volume: props.volume * .01
        });
        sound.play(soundObj.spriteName);
    }

    const clean = idx => {
        if(idx === 0) {
            toggleIsOrganizing();
            while(!squares[idx].contaminated) {
                idx++
            };
        };
        let newSquares = squares.map(square => {
            if(square.id === squares[idx].id) {
                square.contaminated = false
            }
            return square
        });
        let nextIdx = idx + 1;
        console.log(nextIdx)
        if(nextIdx < squares.length) {
            while(!squares[nextIdx].contaminated && nextIdx < squares.length - 1) {
                nextIdx++
                if(idx >= squares.length) {
                    break;
                }
            }
        }
        
        soundPlay(sound);
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

    const contaminate = () => {
        let newSquares = squares.map(square => {
            return {...square, 
                left: Math.random(), 
                top: Math.random(), size: 20 + Math.random() * 40,
                contaminated: Math.random() > .35 ? true : false,
                rotation: Math.random()};
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
            props.toggleWindow('smudges');
        }
    }

    return (
        <div style={{margin: props.fullWindow ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${props.width}px`, height: `${props.width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%'}}>
                    <div>
                        {displaySquares().map(squareLine => {
                            // return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{squareLine.map(square => {
                            return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{squareLine.map(square => {
                                // return <div style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor:`${square.color}`, border: `1px solid ${getColor('border', colorPalette)}`, width: `${props.width * .70 * (1 / (numRows + 2))}px`, height: `${props.width * .70 * (1 / (numRows + 2))}px`, margin: `${(props.width * .70 * (1 / (numRows + 2)) / (numRows + 2))}px`}}><div style={{position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: `${square.size}%`, width: `${square.size}%`, left: `${square.horizontalOffset < 0 ? square.horizontalOffset * ((100 - square.size) / 2) : 0}%`, right: `${square.horizontalOffset > 0 ? square.horizontalOffset * ((100 - square.size) / 2) : 0}%`}}><GiSplurt size='100%'/></div></div>
                                return <div style={{display: 'inline-block', alignItems: 'center', justifyContent: 'center', backgroundColor:`${square.color}`, border: `1px solid ${getColor('border', colorPalette)}`, width: `${props.width * .70 * (1 / (numRows + 2))}px`, height: `${props.width * .70 * (1 / (numRows + 2))}px`, margin: `${(props.width * .70 * (1 / (numRows + 2)) / (numRows + 2))}px`}}><div style={{position: 'relative', display: `${square.contaminated ? 'flex' : 'none'}`, justifyContent: 'center', alignItems: 'center', height: `${square.size}%`, width: `${square.size}%`, left: `${square.left * (100 - square.size)}%`, top: `${square.top * (100 - square.size)}%`, transform: `rotate(${square.rotation}turn)`}}><GiSplurt size='100%'/></div></div>
                                // return <div style={{display: 'inline-block', alignItems: 'center', justifyContent: 'center', backgroundColor:`${square.color}`, border: `1px solid ${getColor('border', colorPalette)}`, width: `${props.width * .70 * (1 / (numRows + 2))}px`, height: `${props.width * .70 * (1 / (numRows + 2))}px`, margin: `${(props.width * .70 * (1 / (numRows + 2)) / (numRows + 2))}px`}}><div style={{position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: `${square.size}%`, width: `${square.size}%`, left: `${square.left * (100 - square.size)}%`, top: `${square.top * (100 - square.size)}%`}}><Smudge size={square.size * .5}/></div></div>
                            })}</div>
                        })}
                    </div>
                </div>
                <ControlBar toggleWindow={handleToggleWindow} fullWindow={props.fullWindow} disableFullWindow={props.disableFullWindow} volume={props.volume} changeVolume={handleChangeVolume} palette={colorPalette} setPalette={handleSetColorPalette} minNum={3} maxNum={9} number={numRows} setNumber={handleSetNumRows} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='Sparkle' organizedFunction={contaminate} unorganizedFunction={() => clean(0)} unorgButton='Contaminate' orgButton='Clean'/>
            </div>
        </div>
    )
}

export default Smudges;