import React, { useEffect, useRef, useState} from 'react';
import { useSelector } from 'react-redux';
import useGardenSpecs from './hooks/useGardenSpecs';
import usePieceSpecs from './hooks/usePieceSpecs';
import { sizeActions } from './store/size';
import { organizingCounterActions } from './store/organizing-counter';
import { getColor, scaler, soundPlay } from './utils';
import ControlBar from './ControlBar';
import { v4 as uuidv4 } from 'uuid';

function Meters(props) {
    const palette = useSelector((state) => state.palette.palette);
    const [colorPalette, setColorPalette] = useState(palette);
    const [width, volume, fullView, dispatch] = useGardenSpecs();
    const pieceSpecs = usePieceSpecs(0, props.number, props.proportionalVolume, props.shape, props.sound, props.speed, props.text);
    
    const createStartingLinesArray = num => {
        let startingLineArray = [];
        for(let i = 0; i < num; i++) {
            let random = 5 + Math.random() * 95;
            startingLineArray.push({
                id: i + 1,
                color: getColor(i + 1, colorPalette),
                topPercent: random,
                volumeMultiplier: scaler(5, 100, .0025, .01, random),
                key: uuidv4()
            })
        }
        return startingLineArray;
    }

    const [lines, setLines] = useState(createStartingLinesArray(pieceSpecs.number));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current && pieceSpecs.nextIndex < lines.length) {
            setTimeout(() => {
                balance(pieceSpecs.nextIndex)
            }, pieceSpecs.speed)
        } else {
            firstUpdate.current = false;
        }
    }, [pieceSpecs.nextIndex]);

    const colorsFirstUpdate = useRef(true)
    useEffect(() => {
        if(!firstUpdate.current) {
            let newLines = lines.map(line => {
                return {...line, color: getColor(line.id, palette)}
            });
            setLines(newLines);
            setColorPalette(palette);
            colorsDoNotUpdate.current = true;
        } else {
            colorsFirstUpdate.current = false;
        }
    }, [palette]);

    const colorsDoNotUpdate = useRef(true)
    useEffect(() => {
        if(!colorsDoNotUpdate.current) {
            let newLines = lines.map(line => {
                return {...line, color: getColor(line.id, colorPalette)}
            });
            setLines(newLines);
        } else {
            colorsDoNotUpdate.current = false;
        }
        
    }, [colorPalette]);

    const balance = idx => {
        if(idx === 0) {
            pieceSpecs.toggleIsOrganizing();
            dispatch(organizingCounterActions.incrementOrganizingCounter())
        }
        let newLines = lines.map(line => {
            if(lines[idx].id === line.id) {
                return {...line, topPercent: 30}
            } else {
                return line;
            }
        });
        soundPlay(pieceSpecs.soundObj, lines[idx].volumeMultiplier, volume, pieceSpecs.proportionalVolume);
        setLines(newLines);
        pieceSpecs.setNextIndex(idx + 1);
        if(idx + 1 === lines.length) {
            dispatch(organizingCounterActions.decrementOrganizingCounter());
            setTimeout(() => {
                pieceSpecs.toggleIsOrganized();
                pieceSpecs.toggleIsOrganizing();
            }, pieceSpecs.speed);
        }
    }

    const unbalance = () => {
        let newLines = lines.map(line => {
            let random = 5 + Math.random() * 95;
            return {
                ...line, 
                topPercent: random,
                volumeMultiplier: scaler(5, 100, .0025, .01, random),
            }
        })
        setLines(newLines);
        pieceSpecs.toggleIsOrganized();
    }

    const handleSetColorPalette = palette => {
        colorsDoNotUpdate.current = false;
        setColorPalette(palette);
    }

    const handleSetNumLines = num => {
        pieceSpecs.setNumber(Number(num));
        setLines(createStartingLinesArray(Number(num)))
    }

    const handleToggleFullView = () => {
        dispatch(sizeActions.setFullView(
            [
                props.id, {
                    type: 'meters',
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
                        {lines.map(line => {
                            return <div key={line.key} style={{display: 'inline-block', width: `${Math.floor(width * .65 / ((pieceSpecs.number * 3) + 1.5))}px`, border: `.75px solid ${getColor('border', colorPalette)}`, height: .55 * width, margin: `${Math.floor(width * .65 * 1.35 / ((pieceSpecs.number * 3) + 1.5))}px`, backgroundColor: `${line.color}`}}><div style={{width: '100%', height: `${line.topPercent}%`, backgroundColor: '#303030', borderBottom: `1px solid ${getColor('border', colorPalette)}`}}></div></div>
                        })}
                    </div>
                </div>
                <ControlBar id={props.id} toggleFullView={handleToggleFullView} changeProportionalVolume={pieceSpecs.setProportionalVolume} proportionalVolume={pieceSpecs.proportionalVolume} palette={colorPalette} setPalette={handleSetColorPalette} setNumber={handleSetNumLines} minNum={7} maxNum={35} number={pieceSpecs.number} isOrganizing={pieceSpecs.isOrganizing} isOrganized={pieceSpecs.isOrganized} setSpeed={pieceSpecs.setSpeed} setSound={pieceSpecs.setSound} soundValue='Whoop' organizedFunction={unbalance} unorganizedFunction={() => balance(0)} unorgButton='Unbalance' orgButton='Balance' />

            </div>
        </div>
    )
}

export default Meters;