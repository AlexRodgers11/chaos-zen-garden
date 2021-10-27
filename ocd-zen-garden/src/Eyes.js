import React, {useEffect, useRef, useState} from 'react';
import { useSelector } from 'react-redux';
import useGardenSpecs from './hooks/useGardenSpecs';
import usePieceSpecs from './hooks/usePieceSpecs';
import { sizeActions } from './store/size';
import { organizingCounterActions } from './store/organizing-counter';
import { v4 as uuidv4 } from 'uuid';
import { getColor, scaler, soundPlay } from './utils';
import ControlBar from './ControlBar';

function Eyes(props) {
    const palette = useSelector((state) => state.palette.palette);
    const [colorPalette, setColorPalette] = useState(palette);
    const [width, volume, fullView, dispatch] = useGardenSpecs();
    const pieceSpecs = usePieceSpecs(0, props.number, props.proportionalVolume, props.shape, props.sound, props.speed, props.text);

    const createStartingSquaresArray = num => {
        let squares = [];
        for(let i = 1; i < num ** 2 + 1; i++) {
            let left = 5 + Math.random() * 35;
            let top = 5 + Math.random() * 35;
            squares.push({
                id: i, 
                color: getColor(i, colorPalette),
                left: left * (Math.random() > .5 ? 1 : -1),
                top: top * (Math.random() > .5 ? 1 : -1),
                volumeMultiplier: scaler(10, 80, .003, .01, left + top),
                key: uuidv4()
            })
        }
        return squares
        
    }

    const [squares, setSquares] = useState(createStartingSquaresArray(pieceSpecs.number));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            setTimeout(() => {
                center(pieceSpecs.nextIndex);
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

    const center = idx => {
        if(idx === 0) {
            pieceSpecs.toggleIsOrganizing();
            dispatch(organizingCounterActions.incrementOrganizingCounter())
        }
        let newSquares = squares.map(square => {
            if(square.id === squares[idx].id) {
                square.top = 0;
                square.left = 0
            }
            return square
        });
        let nextIdx = idx + 1;

        soundPlay(pieceSpecs.soundObj, squares[idx].volumeMultiplier, volume, pieceSpecs.proportionalVolume);
        setSquares(newSquares);
        if(nextIdx < squares.length) {
            pieceSpecs.setNextIndex(nextIdx);
        } else {
            dispatch(organizingCounterActions.decrementOrganizingCounter());
            setTimeout(() => {
                pieceSpecs.toggleIsOrganizing();
                pieceSpecs.toggleIsOrganized();
            }, pieceSpecs.speed);
        }
    };

    const randomize = () => {
        let newSquares = squares.map(square => {
            let left = 5 + Math.random() * 35;
            let top = 5 + Math.random() * 35;
            return {...square, 
                left: left * (Math.random() > .5 ? 1 : -1),
                top: top * (Math.random() > .5 ? 1 : -1),
                volumeMultiplier: scaler(10, 80, .03, .001, left + top),
            };
        });
        setSquares(newSquares);
        pieceSpecs.toggleIsOrganized();
    };

    const handleSetNumRows = num => {
        pieceSpecs.setNumber(Number(num));
        setSquares(createStartingSquaresArray(Number(num)))
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

    const handleToggleFullView = () => {
        dispatch(sizeActions.setFullView(
            [
                props.id, {
                    type: 'eyes',
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
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%'}}>
                    <div>
                        {displaySquares().map(squareLine => {
                            let lineKey = uuidv4()
                            return <div key={lineKey} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{squareLine.map(square => {
                                let squareKey = uuidv4()
                                return <div key={square.key} style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor:`${square.color}`, border: `1px solid ${getColor('border', colorPalette)}`, width: `${Math.floor(width * .70 * (1 / (pieceSpecs.number + 2)))}px`, height: `${Math.floor(width * .70 * (1 / (pieceSpecs.number + 2)))}px`, margin: `${Math.floor((width * .70 * (1 / (pieceSpecs.number + 2)) / (pieceSpecs.number + 2)))}px`}}><div style={{position: 'relative', height: '20%', width: '20%', left: `${square.left}%`, top: `${square.top}%`, border: `1px solid ${getColor('border', colorPalette)}`, backgroundColor: '#303030'}}></div></div>
                            })}</div>
                        })}
                    </div>
                </div>
                <ControlBar id={props.id} toggleFullView={handleToggleFullView} changeProportionalVolume={pieceSpecs.setProportionalVolume} proportionalVolume={pieceSpecs.proportionalVolume} palette={colorPalette} setPalette={handleSetColorPalette} minNum={3} maxNum={20} number={pieceSpecs.number} setNumber={handleSetNumRows} isOrganizing={pieceSpecs.isOrganizing} isOrganized={pieceSpecs.isOrganized} setSpeed={pieceSpecs.setSpeed} setSound={pieceSpecs.setSound} soundValue='Sparkle' organizedFunction={randomize} unorganizedFunction={() => center(0)} unorgButton='Randomize' orgButton='Center'/>
            </div>
        </div>
    )
}

export default Eyes;