import React, {useEffect, useRef, useState} from 'react';
import { useSelector } from 'react-redux';
import useGardenSpecs from './hooks/useGardenSpecs';
import usePieceSpecs from './hooks/usePieceSpecs';
import { sizeActions } from './store/size';
import { organizingCounterActions } from './store/organizing-counter'; 
import { v4 as uuidv4 } from 'uuid';
import { getColor, getSound, scaler, soundPlay } from './utils';
import ControlBar from './ControlBar';

function Squares(props) {
    const palette = useSelector((state) => state.palette.palette);
    const [colorPalette, setColorPalette] = useState(palette);
    const [width, volume, fullView, dispatch] = useGardenSpecs();
    const pieceSpecs = usePieceSpecs({id: 0, dir: 'topLeft'}, props.number, props.proportionalVolume, props.shape, props.sound, props.speed, props.text);


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

    const [squares, setSquares] = useState(createStartingSquaresArray(pieceSpecs.number));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            if(pieceSpecs.nextIndex.id < squares.length || pieceSpecs.nextIndex.dir !== 'topLeft'){
                setTimeout(() => {
                    sharpen(pieceSpecs.nextIndex.id, pieceSpecs.nextIndex.dir);
                }, pieceSpecs.speed);
            } else {
                pieceSpecs.toggleIsOrganizing();
                pieceSpecs.toggleIsOrganized();
                dispatch(organizingCounterActions.decrementOrganizingCounter());
            }
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

    const sharpen = (idx, dir) => {
        if(idx === 0 && dir === 'topLeft') {
            pieceSpecs.toggleIsOrganizing();
            dispatch(organizingCounterActions.incrementOrganizingCounter())
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
                soundPlay(pieceSpecs.soundObj, scaler(5, 15, .0075, .01, squares[idx].topLeft), volume, pieceSpecs.proportionalVolume);
                break;
            case 'topRight':
                soundPlay(pieceSpecs.soundObj, scaler(5, 15, .0075, .01, squares[idx].topRight), volume, pieceSpecs.proportionalVolume);
                break;
            case 'bottomLeft':
                soundPlay(pieceSpecs.soundObj, scaler(5, 15, .0075, .01, squares[idx].bottomLeft), volume, pieceSpecs.proportionalVolume);
                break;
            case 'bottomRight':
                soundPlay(pieceSpecs.soundObj, scaler(5, 15, .0075, .01, squares[idx].bottomRight), volume, pieceSpecs.proportionalVolume);
                break;
        }
        
        setSquares(newSquares);
        pieceSpecs.setNextIndex({id: dir === 'bottomRight' ? idx + 1 : idx, dir: getNextDir(dir)})        
    }

    const dull = () => {
        let newSquares = squares.map(square => {
            return {...square, topLeft: Math.random() * 15, topRight: Math.random() * 15, bottomLeft: Math.random() * 15, bottomRight: Math.random() * 15}
        })
        setSquares(newSquares);
        pieceSpecs.toggleIsOrganized();
    }

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
                    type: 'squares',
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
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%'}}>
                    <div>
                        {displaySquares().map(squareLine => {
                            let lineKey = uuidv4()
                            return <div key={lineKey}>{squareLine.map(square => {
                                return <div key={square.key} style={{display: 'inline-block', backgroundColor:`${square.color}`, border: `1px solid ${getColor('border', colorPalette)}`, borderRadius: `${square.topLeft}% ${square.topRight}% ${square.bottomRight}% ${square.bottomLeft}%`, width: `${width * .70 * (1 / (pieceSpecs.number + 2))}px`, height: `${width * .70 * (1 / (pieceSpecs.number + 2))}px`, margin: `${(width * .70 * (1 / (pieceSpecs.number + 2)) / (pieceSpecs.number + 2))}px`}}></div>
                            })}</div>
                        })}
                    </div>
                </div>
                <ControlBar id={props.id} toggleFullView={handleToggleFullView} changeProportionalVolume={pieceSpecs.setProportionalVolume} proportionalVolume={pieceSpecs.proportionalVolume} palette={colorPalette} setPalette={handleSetColorPalette} minNum={3} maxNum={9} number={pieceSpecs.number} setNumber={handleSetNumRows} isOrganizing={pieceSpecs.isOrganizing} isOrganized={pieceSpecs.isOrganized} setSpeed={pieceSpecs.setSpeed} setSound={pieceSpecs.setSound} soundValue='Ding' organizedFunction={dull} unorganizedFunction={() => sharpen(0, 'topLeft')} unorgButton='Dull' orgButton='Sharpen'/>
            </div>
        </div>
    )
}

export default Squares;