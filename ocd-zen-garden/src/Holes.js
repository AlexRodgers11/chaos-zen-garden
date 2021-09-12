import React, {useEffect, useRef, useState} from 'react';
import useToggle from './hooks/useToggle';
import { getColor, getSound } from './utils';
import ControlBar from './ControlBar';
import { Howl } from 'howler';


function Holes(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [numRows, setNumRows] = useState(9);
    const [nextIndex, setNextIndex] = useState(0);
    const [colorPalette, setColorPalette] = useState(props.palette);
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('Ding'));

    const createStartingSquaresArray = num => {
        let squares = [];
        for(let i = 1; i < num ** 2 + 1; i++) {
            let verticalMultiplier = Math.random() >= .5 ? 1 : -1;
            let horizontalMultiplier = Math.random() >= .5 ? 1 : -1;
            squares.push({
                id: i, 
                color: getColor(i, colorPalette)
            })
        }
        return squares
        
    }
    const createStartingHolesArray = num => {
        let holes = [];
        let punctureCount = 0;
        for(let i = 1; i < (num + Math.ceil(num / 3)) ** 2 + 1; i++) {
            let filled = Math.random() < .25 ? false : true;
            if (!filled) {
                punctureCount++
            }
            let verticalMultiplier = Math.random() >= .5 ? 1 : -1;
            let horizontalMultiplier = Math.random() >= .5 ? 1 : -1;
            holes.push({
                id: i,
                filled: filled,
                left: Math.random() * horizontalMultiplier,
                top: Math.random() * verticalMultiplier,
                size: 30 + Math.random() * 70
            })
        };
        if(punctureCount < 3) {
            console.log('holes redone')
            let randomId = Math.floor(Math.random() * num + Math.ceil(num / 3) ** 2);
            let randomId2 = Math.floor(Math.random() * num + Math.ceil(num / 3) ** 2);
            let randomId3 = Math.floor(Math.random() * num + Math.ceil(num / 3) ** 2);
            while(randomId2 === randomId3 || randomId2 === randomId3) {
                randomId2 = Math.floor(Math.random() * num + Math.ceil(num / 3) ** 2);
            }
            while(randomId3 === randomId) {
                randomId3 = Math.floor(Math.random() * num + Math.ceil(num / 3) ** 2);
            }
            let newHoles = holes.map(hole => {
                if((hole.id === randomId || hole.id === randomId2) || hole.id === randomId3) {
                    hole.filled = false;
                } 
                return hole
            });
            return newHoles;
        }
        return holes;
    }

    const [squares, setSquares] = useState(createStartingSquaresArray(numRows));
    const [holes, setHoles] = useState(createStartingHolesArray(numRows));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            if(nextIndex < holes.length){
                setTimeout(() => {
                    fill(nextIndex)
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



    const fill = idx => {
        if(idx === 0) {
            toggleIsOrganizing();
            while(holes[idx].filled) {
                idx++
            };
        };
        let newHoles = holes.map(hole => {
            if(hole.id === holes[idx].id) {
                hole.filled = true
            }
            return hole
        });
        let nextIdx = idx + 1;
        if(nextIdx < holes.length) {
            while(nextIdx < holes.length) {
                if(holes[nextIdx].filled) {
                    nextIdx++
                } else {
                    break;
                }
            }
        }
        
        soundPlay(sound);
        setHoles(newHoles);
        if(nextIdx < holes.length) {
            setNextIndex(nextIdx);
        } else {
            setTimeout(() => {
                toggleIsOrganizing();
                toggleIsOrganized();
            }, speed);
        }
    };

    const puncture = () => {
        // let newHoles = holes.map(hole => {
        //     return {
        //         ...hole,
        //         filled: Math.random() < .25 ? false : true,
        //         left: Math.random(),
        //         top: Math.random(),
        //         size: 30 + Math.random() * 70
        //     }
        // });
        
        setHoles(createStartingHolesArray(numRows))
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
        setSquares(createStartingSquaresArray(Number(num)));
        setHoles(createStartingHolesArray(Number(num)));
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

    const displayHoles = () => {
        let holeLines = []
        let newLine = []
        for(let k = 0; k < (numRows + Math.ceil(numRows / 3))**2; k++){
            newLine.push(holes[k]);
            if(newLine.length === numRows + Math.ceil(numRows / 3)){
                holeLines.push(newLine);
                newLine = []
            }
        }
        return holeLines;
    }

    const handleToggleWindow = () => {
        if(props.fullWindow) {
            props.toggleWindow(null)
        } else {
            props.toggleWindow('holes');
        }
    }

    return (
        <div style={{margin: props.fullWindow ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${props.width}px`, height: `${props.width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                    <div style={{position: 'absolute'}}> 
                    <div style={{position: 'absolute', zIndex: 2, width: '100%', height: '100%'}}>
                        {displayHoles().map(holeLine => {
                            return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{holeLine.map(hole => {
                                return <div style={{display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: `${(props.width * .70 * (1 / (numRows + 2)) * numRows) / (numRows + Math.ceil(numRows / 3))}px`, height: `${(props.width * .70 * (1 / (numRows + 2)) * numRows) / (numRows + Math.ceil(numRows / 3))}px`, margin: 'none'}}>
                                    {/* <div style={{position: 'relative', left: `${hole.left * (hole.size - 5)}%`, top: `${hole.top * (hole.size - 5)}%`, display: `${hole.filled ? 'none' : 'inline-block'}`, borderRadius: '50%', backgroundColor: `${getColor('base', colorPalette)}`, width: `${hole.size}%`, height: `${hole.size}%`}}></div> */}
                                    <div style={{position: 'relative', left: `${hole.left * (hole.size - 15)}%`, top: `${hole.top * (hole.size - 15)}%`, display: `${hole.filled ? 'none' : 'inline-block'}`, borderRadius: '50%', backgroundColor: `${getColor('base', colorPalette)}`, width: `${hole.size}%`, height: `${hole.size}%`}}></div>
                                </div>
                            })}</div>
                        })}
                    </div>

                        {displaySquares().map(squareLine => {
                            return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{squareLine.map(square => {
                                return <div style={{display: 'inline-block', alignItems: 'center', justifyContent: 'center', backgroundColor:`${square.color}`, width: `${props.width * .70 * (1 / (numRows + 2))}px`, height: `${props.width * .70 * (1 / (numRows + 2))}px`, margin: 'none'}}></div>
                            })}</div>
                        })}
                    </div>
                </div>
                <ControlBar toggleWindow={handleToggleWindow} fullWindow={props.fullWindow} disableFullWindow={props.disableFullWindow} volume={props.volume} changeVolume={handleChangeVolume} palette={colorPalette} setPalette={handleSetColorPalette} minNum={3} maxNum={20} number={numRows} setNumber={handleSetNumRows} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='Ding' organizedFunction={puncture} unorganizedFunction={() => fill(0)} unorgButton='Puncture' orgButton='Fill'/>
            </div>
        </div>
    )
}

export default Holes;