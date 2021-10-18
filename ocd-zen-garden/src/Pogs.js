import React, {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { organizingCounterActions } from './store/organizing-counter';
import useToggle from './hooks/useToggle';
import { v4 as uuidv4 } from 'uuid';
import { getColor, getSound, scaler, soundPlay } from './utils';
import ControlBar from './ControlBar';
import { GiFoxHead } from 'react-icons/gi';

function Pogs(props) {
    const palette = useSelector((state) => state.palette.palette);
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [numRows, setNumRows] = useState(5);
    const [nextIndex, setNextIndex] = useState(0);
    const [colorPalette, setColorPalette] = useState(palette);
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('Robot'));
    const [proportionalVolume, setProportionalVolume] = useState('proportional');
    const [shape, setShape] = useState('circle');
    const dispatch = useDispatch();

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

    const [pogs, setPogs] = useState(createStartingPogsArray(numRows));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            if(nextIndex < pogs.length){
                setTimeout(() => {
                    align(nextIndex);
                }, speed);
            } else {
                toggleIsOrganizing();
                toggleIsOrganized();
                dispatch(organizingCounterActions.decrementOrganizingCounter());
            }
        } else {firstUpdate.current = false}
    }, [nextIndex])
    
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
            toggleIsOrganizing();
            dispatch(organizingCounterActions.incrementOrganizingCounter())
        }
        let newPogs = pogs.map(pog => {
            if(pog.id === pogs[idx].id) {
                return {...pog, x: 0, y: 0}
            } else {
                return pog;
            }
        });
        soundPlay(sound, pogs[idx].volumeMultplier1, props.volume, proportionalVolume);
        setPogs(newPogs);
        setTimeout(() => {
            let newPogs = pogs.map(pog => {
                if(pog.id === pogs[idx].id) {
                    return {...pog, z: 0, tilt: 0}
                } else {
                    return pog;
                }
            });
            soundPlay(sound, pogs[idx].volumeMultplier2, props.volume, proportionalVolume);
            setPogs(newPogs);
            setNextIndex(idx + 1);
        }, speed)
        
        
        
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
        setPogs(createStartingPogsArray(Number(num)))
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

    const handleChangeShape = shape => {
        setShape(shape);
    }

    const displayPogs = () => {
        let pogLines = []
        let newLine = []
        for(let k = 0; k < numRows**2; k++){
            newLine.push(pogs[k]);
            if(newLine.length === numRows){
                pogLines.push(newLine);
                newLine = []
            }
        }
        return pogLines;
    }

    return (
        <div style={{margin: props.fullWindow ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${props.width}px`, height: `${props.width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%'}}>
                    <div>
                        {displayPogs().map(pogLine => {
                            let lineKey = uuidv4()
                            return <div key={lineKey}>{pogLine.map(pog => {
                                return <div key={pog.key} style={{display: 'inline-flex', alignItems: 'center', justifyContent:'center', backgroundColor:`${pog.color}`, border: `1px solid ${getColor('border', colorPalette)}`, width: `${Math.floor(props.width * .70 * (1 / (numRows + 1.5)))}px`, height: `${Math.floor(props.width * .70 * (1 / (numRows + 1.5)))}px`, margin: `${Math.floor((props.width * .70 * (1 / (numRows + 1.5)) / (numRows + 1.)))}px`, borderRadius: `${shape === 'circle' ? '50%' : 0}`, transform: `rotate3d(${pog.x},${pog.y},${pog.z},${pog.tilt}deg)`}}><div style={{padding: 'none', margin: 'none', width: '60%', display: 'flex', justifyContent:'center', alignItems: 'center'}}><GiFoxHead size='100%' backgroundColor={colorPalette.border} fill={colorPalette === 'Zebra' ? pog.id % 2 === 0 ? getColor('aux2', colorPalette) : getColor('aux1', colorPalette) : 'black'}/></div></div>
                            })}</div>
                        })}
                    </div>
                </div>
                <ControlBar width={props.width} piece='pogs' loggedIn={props.loggedIn} toggleHighlightUserIcon={props.toggleHighlightUserIcon} setModalContent={props.setModalContent} shape={shape} shapes={['circle', 'square']} changeShape={handleChangeShape} changeProportionalVolume={handleChangeProportionalVolume} proportionalVolume={proportionalVolume} volume={props.volume} changeVolume={handleChangeVolume} palette={colorPalette} setPalette={handleSetColorPalette} minNum={3} maxNum={9} number={numRows} setNumber={handleSetNumRows} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='Ding' organizedFunction={twist} unorganizedFunction={() => align(0)} unorgButton='Twist' orgButton='Align'/>
            </div>
        </div>
    )
}

export default Pogs;