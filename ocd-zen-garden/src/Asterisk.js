import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { organizingCounterActions } from './store/organizing-counter';
import useToggle from './hooks/useToggle';
import { v4 as uuidv4 } from 'uuid';
import { getColor, getSound, scaler, soundPlay } from './utils';
import ControlBar from './ControlBar';
import { sizeActions } from './store/size';



function Asterisk(props) {
    const width = useSelector((state) => state.size.pieceWidth);
    const palette = useSelector((state) => state.palette.palette);
    const volume = useSelector((state) => state.volume.volume);
    const fullView = useSelector((state) => state.size.fullView);
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [nextIndex, setNextIndex] = useState(0);
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('Click'));
    const [proportionalVolume, setProportionalVolume] = useState('proportional');
    const [colorPalette, setColorPalette] = useState(palette);
    const [numLines, setNumLines] = useState(15);
    const dispatch = useDispatch();

    const createStartingLineArray = num => {
        let lines = [];
        for(let i = 1; i <= num; i++) {
            let random = Math.random() * (360 / (numLines * 2)) / 1.5;
            lines.push({
                id: i,
                color: getColor(i, colorPalette),
                offset: random * (Math.random() > .5 ? 1 : -1),
                volumeMultiplier: scaler(0, (360 / (numLines * 2)) / 1.5, .0015, .01, random),
                key: uuidv4()
            })
        }
        return lines;
    }

    const [lines, setLines] = useState(createStartingLineArray(numLines));

    const firstUpdate = useRef(true);
    useEffect(()=>{
        if(!firstUpdate.current) {
            if(nextIndex < lines.length){
                setTimeout(()=>{
                    console.log('timeout complete')
                    align(nextIndex);
                }, speed);
            }
        } else {
            firstUpdate.current = false;
        }     
    }, [nextIndex]);

    const colorFirstUpdate = useRef(true);
    useEffect(() => {
        if(!colorFirstUpdate.current) {
            let newLines = lines.map(line => {
                return {...line, color: getColor(line.id, palette)}
            });
            setColorPalette(palette);
            setLines(newLines);
            colorsDoNotUpdate.current = true;
        } else {
            colorFirstUpdate.current = false;
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


    const align = (idx) => {
        if(idx === 0) {
            toggleIsOrganizing();
            dispatch(organizingCounterActions.incrementOrganizingCounter())
        }
        let newLines = lines.map(line => {
            if(line.id === lines[idx].id) {
                line.offset = 0
            }
            return line;
            
        });

        soundPlay(sound, lines[idx].volumeMultiplier, volume, proportionalVolume);
        console.log('aligned');
        setLines(newLines);
        if(idx + 1 === lines.length) {
            dispatch(organizingCounterActions.decrementOrganizingCounter());
            console.log(`reduced numOrganizing at idx: ${idx}`)
            setTimeout(() => {
                toggleIsOrganized();
                toggleIsOrganizing();
            }, speed)
        } else {
            setNextIndex(idx + 1);
        }
    }

    const shift = () => {
        let newLines = lines.map(line => {
            let random = Math.random() * (360 / (numLines * 2)) / 1.5;
            return {
                ...line, 
                offset: random * (Math.random() > .5 ? 1 : -1),
                volumeMultiplier: scaler(0, (360 / (numLines * 2)) / 1.5, .0015, .01, random),
            }
        })
        setLines(newLines);
        toggleIsOrganized();
    }

    const handleSetSpeed = time => {
        setSpeed(time);
    }

    const handleSetSound = sound => {
        setSound(getSound(sound));
    }

    const handleSetColorPalette = palette => {
        colorsDoNotUpdate.current = false;
        setColorPalette(palette);
    }

    const handleChangeProportionalVolume = selection => {
        setProportionalVolume(selection);
    }

    const handleSetNumLines = num => {
        setNumLines(Number(num));
        setLines(createStartingLineArray(Number(num)))
    }

    const handleToggleFullView = () => {
        dispatch(sizeActions.setFullView(
            [
                props.id, {
                    type: 'asterisk',
                    palette: palette,
                    speed: speed,
                    sound: sound,
                    proportionalVolume: proportionalVolume,
                    number: numLines,
                    shape: null ,
                    text: null
                }
            ]
        ));
    }

    return (
        <div style={{margin: fullView ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${width}px`, height: `${width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                        {lines.map(line => {
                            return (
                                <div key={line.key} style={{zIndex: `${line.id === 1 ? 1 : 0}`,position: 'absolute', width: `${Math.floor((.65 * width) / (3 * numLines))}px`, height: `${Math.floor(.65 * width)}px`, backgroundColor: line.color, border: `1px solid ${getColor('border', colorPalette)}`, transform: `rotate(${(360 / (numLines * 2)) * (line.id - 1) + line.offset}deg)`}}></div>
                            )
                        })}
                    </div>
                </div>
            <ControlBar id={props.id} toggleFullView={handleToggleFullView} changeProportionalVolume={handleChangeProportionalVolume} proportionalVolume={proportionalVolume} palette={colorPalette} setPalette={handleSetColorPalette} setNumber={handleSetNumLines} minNum={4} maxNum={50} number={numLines} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='Ding' organizedFunction={shift} unorganizedFunction={() => align(0)} unorgButton='Shift' orgButton='Align' />

            </div>
        </div>
        
    )
}

export default Asterisk;