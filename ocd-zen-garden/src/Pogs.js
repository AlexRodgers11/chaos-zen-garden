import React, {useEffect, useRef, useState} from 'react';
import useToggle from './hooks/useToggle';
import { getColor, getSound } from './utils';
import ControlBar from './ControlBar';
import { Howl } from 'howler';
import { BsStarFill } from 'react-icons/bs';
import { GiFoxHead, GiFoxTail } from 'react-icons/gi';

function Pogs(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [numRows, setNumRows] = useState(5);
    const [nextIndex, setNextIndex] = useState(0);
    const [colorPalette, setColorPalette] = useState(props.palette);
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('Robot'));
    const [shape, setShape] = useState('circle');

    const createStartingPogsArray = num => {
        let pogs = [];
        for(let i = 1; i < num ** 2 + 1; i++) {
            let posNeg = Math.random() > .5 ? 1 : -1;
            pogs.push({
                id: i, 
                color: getColor(i, colorPalette),
                tilt: 30 + Math.random() * 45,
                x: .7 + Math.random() * .3 * posNeg,
                y: .7 + Math.random() * .3 * posNeg,
                z: posNeg
            })
        }
        return pogs
        
    }

    // const getNextDir = dir => {
    //     switch(dir) {
    //         case 'topLeft':
    //             return 'topRight'
    //         case 'topRight':
    //             return 'bottomLeft'
    //         case 'bottomLeft':
    //             return 'bottomRight'
    //         case 'bottomRight':
    //             return 'topLeft'
    //     }
    // }

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
            }
        } else {firstUpdate.current = false}
    }, [nextIndex])
    
    const colorsFirstUpdate = useRef(true)
    useEffect(() => {
        if(!colorsFirstUpdate.current) {
            let newPogs = pogs.map(pog => {
                return {...pog, color: getColor(pog.id, props.palette)}
            });
            setColorPalette(props.palette);
            setPogs(newPogs);
            colorsDoNotUpdate.current = true;
        } else {
            colorsFirstUpdate.current = false;
        }
        
    }, [props.palette]);

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

    const soundPlay = soundObj => {
        const sound = new Howl({
            src: soundObj.src,
            sprite: soundObj.sprite,
            volume: props.volume * .01
        });
        sound.play(soundObj.spriteName);
    }

    const align = idx => {
        if(idx === 0) {
            toggleIsOrganizing();
        }
        let newPogs = pogs.map(pog => {
            if(pog.id === pogs[idx].id) {
                return {...pog, x: 0, y: 0}
            } else {
                return pog;
            }
        });
        soundPlay(sound);
        setPogs(newPogs);
        setTimeout(() => {
            let newPogs = pogs.map(pog => {
                if(pog.id === pogs[idx].id) {
                    return {...pog, z: 0, tilt: 0}
                } else {
                    return pog;
                }
            });
            soundPlay(sound);
            setPogs(newPogs);
            setNextIndex(idx + 1);
        }, speed)
        
        
        
    }

    const twist = () => {
        let newPogs = createStartingPogsArray(numRows);
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

    const handleToggleWindow = () => {
        if(props.fullWindow) {
            props.toggleWindow(null)
        } else {
            props.toggleWindow('pogs');
        }
    }

    return (
        <div style={{margin: props.fullWindow ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${props.width}px`, height: `${props.width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%'}}>
                    <div>
                        {displayPogs().map(pogLine => {
                            return <div>{pogLine.map(pog => {
                                return <div style={{display: 'inline-flex', alignItems: 'center', justifyContent:'center', backgroundColor:`${pog.color}`, border: `1px solid ${getColor('border', colorPalette)}`, width: `${props.width * .70 * (1 / (numRows + 2))}px`, height: `${props.width * .70 * (1 / (numRows + 2))}px`, margin: `${(props.width * .70 * (1 / (numRows + 2)) / (numRows + 2))}px`, borderRadius: `${shape === 'circle' ? '50%' : 0}`, transform: `rotate3d(${pog.x},${pog.y},${pog.z},${pog.tilt}deg)`}}><div style={{padding: 'none', margin: 'none', width: '60%', display: 'flex', justifyContent:'center', alignItems: 'center'}}><GiFoxHead size='100%' backgroundColor={colorPalette.border} fill={colorPalette === 'Zebra' ? pog.id % 2 === 0 ? getColor('aux2', colorPalette) : getColor('aux1', colorPalette) : 'black'}/></div></div>
                            })}</div>
                        })}
                    </div>
                </div>
                <ControlBar toggleWindow={handleToggleWindow} fullWindow={props.fullWindow} disableFullWindow={props.disableFullWindow} setModalContent={props.setModalContent} shape={shape} shapes={['circle', 'square']} changeShape={handleChangeShape} volume={props.volume} changeVolume={handleChangeVolume} palette={colorPalette} setPalette={handleSetColorPalette} minNum={3} maxNum={9} number={numRows} setNumber={handleSetNumRows} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='Ding' organizedFunction={twist} unorganizedFunction={() => align(0)} unorgButton='Twist' orgButton='Align'/>
            </div>
        </div>
    )
}

export default Pogs;