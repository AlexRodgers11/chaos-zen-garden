import React, {useEffect, useRef, useState} from 'react';
import useToggle from './hooks/useToggle';
import { getColor, getSound } from './utils';
import ControlBar from './ControlBar';
import { Howl } from 'howler';

function Antlers(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [numRows, setNumRows] = useState(5);
    const [nextIndex, setNextIndex] = useState(0);
    const [colorPalette, setColorPalette] = useState(props.palette);
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('ding'));
    
    const createStartingHornsArray = () => {
        let horns = [];
        let width = props.width * .33 / 15
        for(let i = 1; i <= numRows * 10 + 1; i++) {
            horns.push({
                id: i, 
                color: getColor(i, colorPalette),
                width: width,
                side: Math.random() > .5 ? 'top' : 'bottom'
            })
        }
        return horns
    }

    const [horns, setHorns] = useState(createStartingHornsArray());

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            if(nextIndex.id < horns.length){
                setTimeout(() => {
                    align(nextIndex.id);
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
            let newHorns = horns.map(horn => {
                return {...horn, color: getColor(horn.id, props.palette)}
            });
            setColorPalette(props.palette);
            setHorns(newHorns);
        } else {
            colorsFirstUpdate.current = false;
        }
        
    }, [props.palette]);

    const soundPlay = soundObj => {
        const sound = new Howl({
            src: soundObj.src,
            sprite: soundObj.sprite
        });
        sound.play(soundObj.spriteName);
    }

    const align = (idx) => {
        if(idx === 0) toggleIsOrganizing();
        let newHorns = horns.map(horn => {
            if(horn.id === horns[idx].id) {
                return {...horn, side: 'top'}
            } else {
                return horn;
            }
        });
        soundPlay(sound);
        setHorns(newHorns);
        setNextIndex({id: idx + 1})        
    }

    const twist = () => {
        let newHorns = horns.map(horn => {
            return {
                ...horn,
                side: Math.random() > .5 ? 'top' : 'bottom'
            }
        })
        setHorns(newHorns);
        toggleIsOrganized();
    }

    const handleSetSpeed = time => {
        setSpeed(time);
    }

    const handleSetSound = sound => {
        setSound(getSound(sound));
    }

    const displayHorns = () => {
        let hornLines = []
        let newLine = []
        for(let k = 0; k < numRows * 10; k++){
            newLine.push(horns[k]);
            if(newLine.length === 10){
                hornLines.push(newLine);
                newLine = []
            }
        }
        return hornLines;
    }

    return (
        <div style={{width: '100%', border: '1px solid black'}}>
            <p>Antlers Test</p>
            <div>
                {displayHorns().map((hornLine, lineIdx) => {
                    return (
                        <div className="outer" style={{padding: '0'}}>
                            <div style={{margin: '0', height: '31px'}}>
                                {hornLine.map(horn => {
                                    return (
                                        <><div style={{display:'inline-block', backgroundColor: `${horn.side === 'top' ? horn.color : 'transparent'}`, borderRight: `${horn.side === 'top' ? '1px solid black' : '1px solid transparent'}`,  borderLeft: `${horn.side === 'top' ? '1px solid black' : '1px solid transparent'}`,  borderTop: `${horn.side === 'top' ? '1px solid black' : '1px solid transparent'}`, width: '10px', height: '30px', marginBottom: '0'}}></div><div style={{display:'inline-block', width: '10px', height: '30px', marginBottom: '0'}}></div></>
                                    )
                                })}
                            </div>
                            <hr style={{margin: '0 auto', backgroundColor: 'black', height: '2px', border: 'none', width: '75%'}}/>
                            <div style={{margin: '0', height: '31px'}}>
                                {hornLine.map(horn => {
                                    return (
                                        <><div style={{display:'inline-block', backgroundColor: `${horn.side === 'bottom' ? horn.color : 'transparent'}`, borderRight: `${horn.side === 'bottom' ? '1px solid black' : '1px solid transparent'}`,  borderLeft: `${horn.side === 'bottom' ? '1px solid black' : '1px solid transparent'}`,  borderBottom: `${horn.side === 'bottom' ? '1px solid black' : '1px solid transparent'}`, width: '10px', height: '30px', marginBottom: '0'}}></div><div style={{display:'inline-block', width: '10px', height: '30px', marginBottom: '0'}}></div></>

                                    )
                                })}
                            </div>
                            <br />

                            
                        </div>
                    )
                })}

                <ControlBar isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='ding' organizedFunction={twist} unorganizedFunction={() => align(0)} unorgButton='Twist' orgButton='Align'/>
            </div>
        </div>
    )
}

export default Antlers;