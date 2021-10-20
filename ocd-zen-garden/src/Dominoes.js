import React, { useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { organizingCounterActions } from './store/organizing-counter';
import useToggle from './hooks/useToggle';
import { getColor, getSound, scaler, soundPlay } from './utils';
import ControlBar from './ControlBar';
import { v4 as uuidv4 } from 'uuid';

function Dominoes(props) {
    const width = useSelector((state) => state.size.pieceWidth);
    const palette = useSelector((state) => state.palette.palette);
    const volume = useSelector((state) => state.volume.volume);
    const fullView = useSelector((state) => state.size.fullView);
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [colorPalette, setColorPalette] = useState(palette);
    const [nextIdx, setNextIdx] = useState();
    const [numLines, setNumLines] = useState(10);
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('Click'));
    const [proportionalVolume, setProportionalVolume] = useState('proportional');
    const dispatch = useDispatch();

    // const soundPlay = (soundObj, multiplier) => {
    //     const sound = new Howl({
    //         src: soundObj.src,
    //         sprite: soundObj.sprite,
    //         volume: props.volume * .01 * multiplier
    //     });
    //     sound.play(soundObj.spriteName);
    // }

    const createStartingLinesArray = num => {
        let startingLineArray = [];
        for(let i = 0; i < num; i++) {
            let random = (Math.random() * 2 + .25) * (Math.random() > .5 ? 1 : -1);
            startingLineArray.push({
                id: i + 1,
                tilt: random,
                color: getColor(i + 1, colorPalette),
                volumeMultiplier: scaler(.25, 2.25, .002, .01, Math.abs(random)),
                key: uuidv4()
            })
        }
        return startingLineArray;
    }

    const [lines, setLines] = useState(createStartingLinesArray(numLines));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current && nextIdx < lines.length) {
            setTimeout(() => {
                straightenLines(nextIdx)
            }, speed)
        } else {
            firstUpdate.current = false;
        }
    }, [nextIdx]);

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

    const straightenLines = idx => {
        if(idx === 0) {
            toggleIsOrganizing();
            dispatch(organizingCounterActions.incrementOrganizingCounter())
        }
        let newLines = lines.map(line => {
            if(lines[idx].id === line.id) {
                return {...line, tilt: 0}
            } else {
                return line;
            }
        });
        soundPlay(sound, lines[idx].volumeMultiplier, volume, proportionalVolume);
        setLines(newLines);
        if(idx < lines.length - 1) {
            setNextIdx(idx + 1);
        } else {
            dispatch(organizingCounterActions.decrementOrganizingCounter());
            setTimeout(() => {
                toggleIsOrganized();
                toggleIsOrganizing();
            }, speed);
        }
    }

    const tiltLines = () => {
        let newLines = lines.map(line => {
            let random = (Math.random() * 2 + .25) * (Math.random() > .5 ? 1 : -1);
            return {
                ...line, 
                tilt: random,
                volumeMultiplier: scaler(.25, 2.25, .002, .01, Math.abs(random))
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
        setLines(createStartingLinesArray(Number(num)))
    }

    return (
        <div style={{margin: fullView ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${width}px`, height: `${width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%'}}>
                    <div>
                        {lines.map(line => {
                            return <span key={line.key} style={{display: 'inline-block', width: `${Math.floor(width * .65 / ((numLines * 3) + 1.5))}px`, border: `.75px solid ${getColor('border', colorPalette)}`, height: .55 * width, margin: `${width * .65 * 1.35 / ((numLines * 3) + 1.5)}px`, transform: `rotate(${line.tilt}deg)`, backgroundColor: `${line.color}` }}></span>
                        })}
                    </div>
                </div>
                <ControlBar piece='dominoes' changeProportionalVolume={handleChangeProportionalVolume} proportionalVolume={proportionalVolume} palette={colorPalette} setPalette={handleSetColorPalette} setNumber={handleSetNumLines} minNum={5} maxNum={35} number={numLines} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='Click' organizedFunction={tiltLines} unorganizedFunction={() => straightenLines(0)} unorgButton='Tilt' orgButton='Straighten' />

            </div>
        </div>
    )
}

export default Dominoes