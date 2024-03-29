import React, {useEffect, useRef, useState} from 'react';
import { useSelector } from 'react-redux';
import useGardenSpecs from './hooks/useGardenSpecs';
import usePieceSpecs from './hooks/usePieceSpecs';
import { sizeActions } from './store/size';
import { organizingCounterActions } from './store/organizing-counter';
import useToggle from './hooks/useToggle';
import { v4 as uuidv4 } from 'uuid';
import { getColor, scaler, soundPlay } from './utils';
import ControlBar from './ControlBar/ControlBar';


function Holes(props) {
    const palette = useSelector((state) => state.palette.palette);
    const [colorPalette, setColorPalette] = useState(palette);
    const [width, volume, fullView, dispatch] = useGardenSpecs();
    const pieceSpecs = usePieceSpecs(0, props.number, props.proportionalVolume, props.shape, props.sound, props.speed, props.text);

    const createStartingSquaresArray = num => {
        let squares = [];
        for(let i = 1; i < num ** 2 + 1; i++) {
            squares.push({
                id: i, 
                color: getColor(i, colorPalette),
                key: uuidv4()
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
            let size = 30 + Math.random() * 70
            holes.push({
                id: i,
                filled: filled,
                left: Math.random() * horizontalMultiplier,
                top: Math.random() * verticalMultiplier,
                size: size,
                volumeMultiplier: scaler(30, 100, .002, .01, size)
            })
        };
        if(punctureCount < 3) {
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

    const [squares, setSquares] = useState(createStartingSquaresArray(pieceSpecs.number));
    const [holes, setHoles] = useState(createStartingHolesArray(pieceSpecs.number));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            setTimeout(() => {
                fill(pieceSpecs.nextIndex)
            }, pieceSpecs.speed);
        } else {firstUpdate.current = false}
    }, [pieceSpecs.nextIndex])
    
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

    useEffect(() => {
        return () => {
            console.log('Holes is cleaning up');
        }
    }, [fullView])

    const fill = idx => {
        if(idx === 0) {
            pieceSpecs.toggleIsOrganizing();
            dispatch(organizingCounterActions.incrementOrganizingCounter())
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
        
        soundPlay(pieceSpecs.soundObj, holes[idx].volumeMultiplier, volume, pieceSpecs.proportionalVolume);
        setHoles(newHoles);
        if(nextIdx < holes.length) {
            pieceSpecs.setNextIndex(nextIdx);
        } else {
            dispatch(organizingCounterActions.decrementOrganizingCounter());
            setTimeout(() => {
                pieceSpecs.toggleIsOrganizing();
                pieceSpecs.toggleIsOrganized();
            }, pieceSpecs.speed);
        }
    };

    const puncture = () => {
        let newHoles = holes.map(hole => {
            let size = 30 + Math.random() * 70
            return {
                ...hole,
                filled: Math.random() < .25 ? false : true,
                left: Math.random(),
                top: Math.random(),
                size: size,
                volumeMultiplier: scaler(30, 70, .002, .01, size)
            }
        });
        setHoles(newHoles);
        pieceSpecs.toggleIsOrganized();
    };

    const handleSetNumRows = num => {
        pieceSpecs.setNumber(Number(num));
        setSquares(createStartingSquaresArray(Number(num)));
        setHoles(createStartingHolesArray(Number(num)));
    }

    const handleSetColorPalette = palette => {
        colorsDoNotUpdate.current = false;
        setColorPalette(palette);
    }

    const displaySquares = () => {
        let squareLines = []
        let newLine = []
        for(let k = 0; k < pieceSpecs.number**2; k++){
            newLine.push(squares[k]);
            if(newLine.length === pieceSpecs.number){
                squareLines.push(newLine);
                newLine = []
            }
        }
        return squareLines;
    }

    const displayHoles = () => {
        let holeLines = []
        let newLine = []
        for(let k = 0; k < (pieceSpecs.number + Math.ceil(pieceSpecs.number / 3))**2; k++){
            newLine.push(holes[k]);
            if(newLine.length === pieceSpecs.number + Math.ceil(pieceSpecs.number / 3)){
                holeLines.push(newLine);
                newLine = []
            }
        }
        return holeLines;
    }

    const handleToggleFullView = () => {
        dispatch(sizeActions.setFullView(
            [
                props.id, {
                    type: 'holes',
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
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                    <div style={{position: 'absolute'}}> 
                    <div style={{position: 'absolute', zIndex: 2, width: '100%', height: '100%'}}>
                        {displayHoles().map(holeLine => {
                            let holeLineKey = uuidv4()
                            return <div key={holeLineKey} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{holeLine.map(hole => {
                                return <div style={{display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: `${(width * .70 * (1 / (pieceSpecs.number + 2)) * pieceSpecs.number) / (pieceSpecs.number + Math.ceil(pieceSpecs.number / 3))}px`, height: `${(width * .70 * (1 / (pieceSpecs.number + 2)) * pieceSpecs.number) / (pieceSpecs.number + Math.ceil(pieceSpecs.number / 3))}px`, margin: 'none'}}>
                                    <div style={{position: 'relative', left: `${hole.left * (hole.size - 15)}%`, top: `${hole.top * (hole.size - 15)}%`, display: `${hole.filled ? 'none' : 'inline-block'}`, borderRadius: '50%', backgroundColor: `${getColor('base', colorPalette)}`, width: `${hole.size}%`, height: `${hole.size}%`}}></div>
                                </div>
                            })}</div>
                        })}
                    </div>

                        {displaySquares().map(squareLine => {
                            let lineKey = uuidv4()
                            return <div key={lineKey} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{squareLine.map(square => {
                                return <div key={square.key} style={{display: 'inline-block', alignItems: 'center', justifyContent: 'center', backgroundColor:`${square.color}`, width: `${width * .70 * (1 / (pieceSpecs.number + 2))}px`, height: `${width * .70 * (1 / (pieceSpecs.number + 2))}px`, margin: 'none'}}></div>
                            })}</div>
                        })}
                    </div>
                </div>
                <ControlBar id={props.id} toggleFullView={handleToggleFullView} changeProportionalVolume={pieceSpecs.setProportionalVolume} proportionalVolume={pieceSpecs.proportionalVolume} palette={colorPalette} setPalette={handleSetColorPalette} minNum={3} maxNum={20} number={pieceSpecs.number} setNumber={handleSetNumRows} isOrganizing={pieceSpecs.isOrganizing} isOrganized={pieceSpecs.isOrganized} setSpeed={pieceSpecs.setSpeed} setSound={pieceSpecs.setSound} soundValue='Ding' organizedFunction={puncture} unorganizedFunction={() => fill(0)} unorgButton='Puncture' orgButton='Fill'/>
            </div>
        </div>
    )
}

export default Holes;