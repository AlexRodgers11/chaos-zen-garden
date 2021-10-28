import React, {useEffect, useRef, useState} from 'react';
import {  useSelector } from 'react-redux';
import useGardenSpecs from './hooks/useGardenSpecs';
import usePieceSpecs from './hooks/usePieceSpecs';
import { sizeActions } from './store/size';
import { organizingCounterActions } from './store/organizing-counter';
import { v4 as uuidv4 } from 'uuid';
import { getColor, scaler, soundPlay } from './utils';
import ControlBar from './ControlBar';


function Opaque(props) {
    const palette = useSelector((state) => state.palette.palette);
    const [colorPalette, setColorPalette] = useState(palette);
    const [width, volume, fullView, dispatch] = useGardenSpecs();
    const pieceSpecs = usePieceSpecs(0, props.number, props.proportionalVolume, props.shape, props.sound, props.speed, props.text);

    const createStartingSquaresArray = num => {
        let squares = [];
        for(let i = 1; i < num ** 2 + 1; i++) {
            let random = .05 + Math.random() * .9;
            squares.push({
                id: i, 
                color: getColor(i, colorPalette),
                opacity: random,
                volumeMultiplier: scaler(.05, .95, .0035, .01, 1 - random),
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
                sharpen(pieceSpecs.nextIndex)
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

    const sharpen = idx => {
        if(idx === 0) {
            pieceSpecs.toggleIsOrganizing();
            dispatch(organizingCounterActions.incrementOrganizingCounter())
        };
        let newSquares = squares.map(square => {
            if(square.id === squares[idx].id) {
                square.opacity = 1;
            }
            return square
        });

        
        soundPlay(pieceSpecs.soundObj, squares[idx].volumeMultiplier, volume, pieceSpecs.proportionalVolume);
        setSquares(newSquares);
        if(idx < squares.length - 1) {
            pieceSpecs.setNextIndex(idx + 1);
        } else {
            dispatch(organizingCounterActions.decrementOrganizingCounter());
            setTimeout(() => {
                pieceSpecs.toggleIsOrganizing();
                pieceSpecs.toggleIsOrganized();
            }, pieceSpecs.speed);
        }
    };

    const fade = () => {
        let newSquares = squares.map(square => {
            let random = .05 + Math.random() * .9;
            return {
                ...square, 
                opacity: random,
                volumeMultiplier: scaler(.05, .95, .0035, .01, 1 - random)
            }
        });
        setSquares(newSquares)
        pieceSpecs.toggleIsOrganized();
    };

    const handleSetNumRows = num => {
        pieceSpecs.setNumber(Number(num));
        setSquares(createStartingSquaresArray(Number(num)));
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
                    type: 'opaque',
                    palette: palette,
                    speed: pieceSpecs.speed,
                    sound: pieceSpecs.soundName,
                    proportionalVolume: pieceSpecs.proportionalVolume,
                    number: pieceSpecs.number,
                    shape: pieceSpecs.shape ,
                    text: pieceSpecs.shape
                }
            ]
        ));
    }

    return (
        <div style={{margin: fullView ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${width}px`, height: `${width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                    {displaySquares().map(squareLine => {
                        let lineKey = uuidv4()
                        return <div key={lineKey} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{squareLine.map(square => {
                            let squareKey = uuidv4()
                            return <div key={square.key} style={{display: 'inline-block', alignItems: 'center', justifyContent: 'center', backgroundColor:`${square.color}`, width: `${Math.floor(width * .70 * (1 / (pieceSpecs.number + 2)))}px`, height: `${Math.floor(width * .70 * (1 / (pieceSpecs.number + 2)))}px`, margin: 'none', opacity: square.opacity}}></div>
                        })}</div>
                    })}
                </div>
                <ControlBar id={props.id} toggleFullView={handleToggleFullView} changeProportionalVolume={pieceSpecs.setProportionalVolume} proportionalVolume={pieceSpecs.proportionalVolume} palette={colorPalette} setPalette={handleSetColorPalette} minNum={3} maxNum={20} number={pieceSpecs.number} setNumber={handleSetNumRows} isOrganizing={pieceSpecs.isOrganizing} isOrganized={pieceSpecs.isOrganized} setSpeed={pieceSpecs.setSpeed} setSound={pieceSpecs.setSound} soundValue='Ding' organizedFunction={fade} unorganizedFunction={() => sharpen(0)} unorgButton='Fade' orgButton='Sharpen'/>
            </div>
        </div>
    )
}

export default Opaque;