import React, {useEffect, useRef, useState} from 'react';
import { useSelector } from 'react-redux';
import useGardenSpecs from './hooks/useGardenSpecs';
import usePieceSpecs from './hooks/usePieceSpecs';
import { sizeActions } from './store/size';
import { organizingCounterActions } from './store/organizing-counter';
import { v4 as uuidv4 } from 'uuid';
import { getColor, getSound, scaler, soundPlay } from './utils';
import ControlBar from './ControlBar/ControlBar';

function Triangles(props) {
    const palette = useSelector((state) => state.palette.palette);
    const [colorPalette, setColorPalette] = useState(palette);
    const [width, volume, fullView, dispatch] = useGardenSpecs();
    const pieceSpecs = usePieceSpecs(0, props.number, props.proportionalVolume, props.shape, props.sound, props.speed, props.text);



    const createStartingTrianglesArray = num => {
        let triangles = [];
        for(let i = 1; i < num ** 2 + 1; i++) {
            let random = .05 + Math.random() * .45
            let remainder = 1 - random;
            let side = Math.random() > .5 ? 'right' : 'left'
            triangles.push({
                id: i, 
                color: getColor(i, colorPalette),
                left: side === 'left' ? random : remainder,
                right: side === 'right' ? random : remainder,
                volumeMultiplier: scaler(.5, .95, .002, .01, remainder),
                key: uuidv4()
            })
        }
        return triangles
    }

    const [triangles, setTriangles] = useState(createStartingTrianglesArray(pieceSpecs.number));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            if(pieceSpecs.nextIndex < triangles.length){
                setTimeout(() => {
                    center(pieceSpecs.nextIndex);
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
            let newTriangles = triangles.map(triangle => {
                return {...triangle, color: getColor(triangle.id, palette)}
            });
            setColorPalette(palette);
            setTriangles(newTriangles);
            colorsDoNotUpdate.current = true;
        } else {
            colorsFirstUpdate.current = false;
        }
        
    }, [palette]);

    const colorsDoNotUpdate = useRef(true)
    useEffect(() => {
        if(!colorsDoNotUpdate.current) {
            let newTriangles = triangles.map(triangle => {
                return {...triangle, color: getColor(triangle.id, colorPalette)}
            });
            setTriangles(newTriangles);
        } else {
            colorsDoNotUpdate.current = false;
        }
        
    }, [colorPalette]);

    const center = (idx) => {
        if(idx === 0) {
            pieceSpecs.toggleIsOrganizing();
            dispatch(organizingCounterActions.incrementOrganizingCounter())
        }
        let newTriangles = triangles.map(triangle => {
            if(triangle.id === triangles[idx].id) {
                return {...triangle, left: .5, right: .5}
            } else {
                return triangle;
            }
        });
        soundPlay(pieceSpecs.soundObj, triangles[idx].volumeMultiplier, volume, pieceSpecs.proportionalVolume);
        setTriangles(newTriangles);
        pieceSpecs.setNextIndex(idx + 1)        
    }

    const uncenter = () => {
        let newTriangles = triangles.map(triangle => {
            let random = .05 + Math.random() * .45
            let remainder = 1 - random;
            let side = Math.random() > .5 ? 'right' : 'left';
            return {
                ...triangle,
                left: side === 'left' ? random : remainder,
                right: side === 'right' ? random : remainder,
                volumeMultiplier: scaler(.5, .95, .002, .01, remainder),
            }
        })
        setTriangles(newTriangles);
        pieceSpecs.toggleIsOrganized();
    }

    const handleSetNumRows = num => {
        pieceSpecs.setNumber(Number(num));
        setTriangles(createStartingTrianglesArray(Number(num)))
    }

    const handleSetColorPalette = palette => {
        colorsDoNotUpdate.current = false;
        setColorPalette(palette);
    }

    const displayTriangles = () => {
        let triangleLines = []
        let newLine = []
        for(let k = 0; k < pieceSpecs.number**2; k++){
            newLine.push(triangles[k]);
            if(newLine.length === pieceSpecs.number){
                triangleLines.push(newLine);
                newLine = []
            }
        }
        return triangleLines;
    }

    const handleToggleFullView = () => {
        dispatch(sizeActions.setFullView(
            [
                props.id, {
                    type: 'triangles',
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
                        {displayTriangles().map(triangleLine => {
                            let lineKey = uuidv4()
                            return <div key={lineKey} style={{height: `${width / (pieceSpecs.number * 1.4)}px`, width: `${width}px`}}>{triangleLine.map(triangle => {
                                let bottom = width / (pieceSpecs.number * 1.80)
                                return <div key={triangle.key} style={{display: 'inline-block', borderBottom: `${bottom + 1.5}px solid ${getColor('border', colorPalette)}`, borderLeft: `${triangle.left * bottom + 1.5}px solid transparent`, borderRight: `${triangle.right * bottom + 1.5}px solid transparent`, height: '0', width: '0', margin: `${width * (1 / 81)}px`}}><div style={{position: 'relative', display: 'inline-block', borderBottom: `${bottom}px solid ${triangle.color}`, borderLeft: `${triangle.left * bottom}px solid transparent`, borderRight: `${triangle.right * bottom}px solid transparent`, height: '0', width: '0', right:`${triangle.left * bottom}px`, top:'.75px'}}></div></div>
                            })}</div>
                        })}
                    </div>
                </div>
                <ControlBar id={props.id} toggleFullView={handleToggleFullView} changeProportionalVolume={pieceSpecs.setProportionalVolume} proportionalVolume={pieceSpecs.proportionalVolume} palette={colorPalette} setPalette={handleSetColorPalette} minNum={3} maxNum={12} number={pieceSpecs.number} setNumber={handleSetNumRows} isOrganizing={pieceSpecs.isOrganizing} isOrganized={pieceSpecs.isOrganized} setSpeed={pieceSpecs.setSpeed} setSound={pieceSpecs.setSound} soundValue='Chirp' organizedFunction={uncenter} unorganizedFunction={() => center(0)} unorgButton='Uncenter' orgButton='Center'/>
            </div>
        </div>
    )
}

export default Triangles;