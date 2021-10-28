import React, {useEffect, useRef, useState} from 'react';
import { useSelector } from 'react-redux';
import useGardenSpecs from './hooks/useGardenSpecs';
import usePieceSpecs from './hooks/usePieceSpecs';
import { sizeActions } from './store/size';
import { organizingCounterActions } from './store/organizing-counter';
import { v4 as uuidv4 } from 'uuid';
import { getColor, scaler, soundPlay } from './utils';
import ControlBar from './ControlBar';
import { GiFoxHead } from 'react-icons/gi';

function Pogs(props) {
    const palette = useSelector((state) => state.palette.palette);
    const [colorPalette, setColorPalette] = useState(palette);
    const [width, volume, fullView, dispatch] = useGardenSpecs();
    const pieceSpecs = usePieceSpecs(0, props.number, props.proportionalVolume, props.shape, props.sound, props.speed, props.text);

    const createStartingPogsArray = num => {
        let pogs = [];
        for(let i = 1; i < num ** 2 + 1; i++) {
            let x = .7 + Math.random() * .3 * (Math.random() > .5 ? 1 : -1);
            let y = .7 + Math.random() * .3 * (Math.random() > .5 ? 1 : -1);
            let tilt = 30 + Math.random() * 45
            pogs.push({
                id: i, 
                color: getColor(i, colorPalette),
                tilt: tilt,
                x: x,
                y: y,
                volumeMultplier1: scaler(.4, 2, .003, .01, x + y),
                volumeMultplier2: scaler(30, 75, .003, .01, tilt),
                z: Math.random() > .5 ? 1 : -1,
                key: uuidv4()
            })
        }
        return pogs
        
    }

    const [pogs, setPogs] = useState(createStartingPogsArray(pieceSpecs.number));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            if(pieceSpecs.nextIndex < pogs.length){
                setTimeout(() => {
                    align(pieceSpecs.nextIndex);
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
            let newPogs = pogs.map(pog => {
                return {...pog, color: getColor(pog.id, palette)}
            });
            setColorPalette(palette);
            setPogs(newPogs);
            colorsDoNotUpdate.current = true;
        } else {
            colorsFirstUpdate.current = false;
        }
        
    }, [palette]);

    const colorsDoNotUpdate = useRef(true)
    useEffect(() => {
        if(!colorsDoNotUpdate.current) {
            let newPogs = pogs.map(pog => {
                return {...pog, color: getColor(pog.id, colorPalette)}
            });
            setPogs(newPogs);
        } else {
            colorsDoNotUpdate.current = false;
        }
        
    }, [colorPalette]);

    const align = idx => {
        if(idx === 0) {
            pieceSpecs.toggleIsOrganizing();
            dispatch(organizingCounterActions.incrementOrganizingCounter())
        }
        let newPogs = pogs.map(pog => {
            if(pog.id === pogs[idx].id) {
                return {...pog, x: 0, y: 0}
            } else {
                return pog;
            }
        });
        soundPlay(pieceSpecs.soundObj, pogs[idx].volumeMultplier1, volume, pieceSpecs.proportionalVolume);
        setPogs(newPogs);
        setTimeout(() => {
            let newPogs = pogs.map(pog => {
                if(pog.id === pogs[idx].id) {
                    return {...pog, z: 0, tilt: 0}
                } else {
                    return pog;
                }
            });
            soundPlay(pieceSpecs.soundObj, pogs[idx].volumeMultplier2, volume, pieceSpecs.proportionalVolume);
            setPogs(newPogs);
            pieceSpecs.setNextIndex(idx + 1);
        }, pieceSpecs.speed)
        
        
        
    }

    const twist = () => {
        let newPogs = pogs.map(pog => {
            let x = .7 + Math.random() * .3 * (Math.random() > .5 ? 1 : -1);
            let y = .7 + Math.random() * .3 * (Math.random() > .5 ? 1 : -1);
            let tilt = 30 + Math.random() * 45;
            return ({
                ...pog,
                tilt: tilt,
                x: x,
                y: y,
                volumeMultplier1: scaler(.4, 2, .003, .01, x + y),
                volumeMultplier2: scaler(30, 75, .003, .01, tilt),
                z: Math.random() > .5 ? 1 : -1,
            })
        })
        setPogs(newPogs);
        pieceSpecs.toggleIsOrganized();
    }

    const handleSetNumRows = num => {
        pieceSpecs.setNumber(Number(num));
        setPogs(createStartingPogsArray(Number(num)))
    }

    const handleSetColorPalette = palette => {
        colorsDoNotUpdate.current = false;
        setColorPalette(palette);
    }

    const displayPogs = () => {
        let pogLines = []
        let newLine = []
        for(let k = 0; k < pieceSpecs.number**2; k++){
            newLine.push(pogs[k]);
            if(newLine.length === pieceSpecs.number){
                pogLines.push(newLine);
                newLine = []
            }
        }
        return pogLines;
    }

    const handleToggleFullView = () => {
        dispatch(sizeActions.setFullView(
            [
                props.id, {
                    type: 'pogs',
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
                        {displayPogs().map(pogLine => {
                            let lineKey = uuidv4()
                            return <div key={lineKey}>{pogLine.map(pog => {
                                return <div key={pog.key} style={{display: 'inline-flex', alignItems: 'center', justifyContent:'center', backgroundColor:`${pog.color}`, border: `1px solid ${getColor('border', colorPalette)}`, width: `${Math.floor(width * .70 * (1 / (pieceSpecs.number + 1.5)))}px`, height: `${Math.floor(width * .70 * (1 / (pieceSpecs.number + 1.5)))}px`, margin: `${Math.floor((width * .70 * (1 / (pieceSpecs.number + 1.5)) / (pieceSpecs.number + 1.)))}px`, borderRadius: `${pieceSpecs.shape === 'circle' ? '50%' : 0}`, transform: `rotate3d(${pog.x},${pog.y},${pog.z},${pog.tilt}deg)`}}><div style={{padding: 'none', margin: 'none', width: '60%', display: 'flex', justifyContent:'center', alignItems: 'center'}}><GiFoxHead size='100%' backgroundColor={colorPalette.border} fill={colorPalette === 'Zebra' ? pog.id % 2 === 0 ? getColor('aux2', colorPalette) : getColor('aux1', colorPalette) : 'black'}/></div></div>
                            })}</div>
                        })}
                    </div>
                </div>
                <ControlBar id={props.id} toggleFullView={handleToggleFullView} shape={pieceSpecs.shape} shapes={['circle', 'square']} changeShape={pieceSpecs.setShape} changeProportionalVolume={pieceSpecs.setProportionalVolume} proportionalVolume={pieceSpecs.proportionalVolume} palette={colorPalette} setPalette={handleSetColorPalette} minNum={3} maxNum={9} number={pieceSpecs.number} setNumber={handleSetNumRows} isOrganizing={pieceSpecs.isOrganizing} isOrganized={pieceSpecs.isOrganized} setSpeed={pieceSpecs.setSpeed} setSound={pieceSpecs.setSound} soundValue='Ding' organizedFunction={twist} unorganizedFunction={() => align(0)} unorgButton='Twist' orgButton='Align'/>
            </div>
        </div>
    )
}

export default Pogs;