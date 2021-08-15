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
    
    const createStartingHornsArray = num => {
        let horns = [];
        for(let i = 1; i <= num ** 2 * 2 + 1; i++) {
            horns.push({
                id: i, 
                color: getColor(i, colorPalette),
                side: Math.random() > .5 ? 'top' : 'bottom'
            })
        }
        return horns
    }

    const [horns, setHorns] = useState(createStartingHornsArray(numRows));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            if(nextIndex < horns.length){
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
            let newHorns = horns.map(horn => {
                return {...horn, color: getColor(horn.id, props.palette)}
            });
            setColorPalette(props.palette);
            setHorns(newHorns);
            colorsDoNotUpdate.current = true;
        } else {
            colorsFirstUpdate.current = false;
        }
        
    }, [props.palette]);

    const colorsDoNotUpdate = useRef(true)
    useEffect(() => {
        if(!colorsDoNotUpdate.current) {
            let newHorns = horns.map(horn => {
                return {...horn, color: getColor(horn.id, colorPalette)}
            });
            setHorns(newHorns);
        } else {
            colorsDoNotUpdate.current = false;
        }
        
    }, [colorPalette]);

    const soundPlay = soundObj => {
        const sound = new Howl({
            src: soundObj.src,
            sprite: soundObj.sprite
        });
        sound.play(soundObj.spriteName);
    }

    const align = (idx) => {
        let currentIdx = idx;
        if(idx === 0) {
            toggleIsOrganizing();
            if(horns[0].side !== 'bottom') {
                while(horns[currentIdx].side !== 'bottom') {
                    currentIdx++
                }
            }
        } 

        let newHorns = horns.map(horn => {
            if(horn.id === horns[currentIdx].id) {
                return {...horn, side: 'top'}
            } else {
                return horn;
            }
        });
        let nextBottomIndex;
        for(let i = currentIdx + 1; i < horns.length; i++) {
            if (horns[i].side === 'bottom') {
                nextBottomIndex = i;
                break;
            }
        }
        soundPlay(sound)
        setHorns(newHorns);
        setNextIndex(nextBottomIndex);      
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

    const handleSetNumRows = num => {
        setNumRows(Number(num));
        setHorns(createStartingHornsArray(Number(num)))
    }

    const handleSetColorPalette = palette => {
        colorsDoNotUpdate.current = false;
        setColorPalette(palette);
    }

    const displayHorns = () => {
        let hornLines = []
        let newLine = []
        for(let k = 0; k < numRows ** 2 * 2; k++){
            newLine.push(horns[k]);
            if(newLine.length === numRows * 2){
                hornLines.push(newLine);
                newLine = []
            }
        }
        return hornLines;
    }

    return (
        <div style={{width: '100%', border: '1px solid black'}}>
            <div>
                {displayHorns().map((hornLine, lineIdx) => {
                    return (
                        <div className="outer" style={{padding: '0', height: '70px'}}>
                            <div style={{margin: '0', height: '30px'}}>
                                {hornLine.map(horn => {
                                    return (
                                        // <><div style={{boxSizing:'border-box', display:'inline-block', backgroundColor: `${horn.side === 'top' ? horn.color : 'transparent'}`, borderRight: `${horn.side === 'top' ? '1px solid black' : '1px solid transparent'}`,  borderLeft: `${horn.side === 'top' ? '1px solid black' : '1px solid transparent'}`,  borderTop: `${horn.side === 'top' ? '1px solid black' : '1px solid transparent'}`, width: '10px', height: '30px', marginBottom: '0'}}></div><div style={{display:'inline-block', width: '10px', height: '30px', marginBottom: '0'}}></div></>
                                        <><div style={{boxSizing:'border-box', display:'inline-block', backgroundColor: `${horn.side === 'top' ? horn.color : 'transparent'}`, borderRight: `${horn.side === 'top' ? '1px solid black' : '1px solid transparent'}`,  borderLeft: `${horn.side === 'top' ? '1px solid black' : '1px solid transparent'}`,  borderTop: `${horn.side === 'top' ? '1px solid black' : '1px solid transparent'}`, width: `${props.width * .33 * .6 / (numRows * 4)}px`, height: '30px', marginBottom: '0'}}></div><div style={{display:'inline-block', width: `${props.width * .33 * .6 / (numRows * 4)}px`, height: '30px', marginBottom: '0'}}></div></>
                                    )
                                })}
                            </div>
                            <hr style={{margin: `0 ${.2 * props.width * .33 - 0 * (props.width * .33 * .6 / (numRows * 4))}px`, backgroundColor: 'black', height: '2px', border: 'none', width: `${props.width * .33 * .6 - ((props.width * .33 * .6 / (numRows * 4)))}px`}}/>
                            <div style={{margin: '0', height: '30px'}}>
                                {hornLine.map(horn => {
                                    return (
                                        // <><div style={{boxSizing:'border-box', display:'inline-block', backgroundColor: `${horn.side === 'bottom' ? horn.color : 'transparent'}`, borderRight: `${horn.side === 'bottom' ? '1px solid black' : '1px solid transparent'}`,  borderLeft: `${horn.side === 'bottom' ? '1px solid black' : '1px solid transparent'}`,  borderBottom: `${horn.side === 'bottom' ? '1px solid black' : '1px solid transparent'}`, width: '10px', height: '30px', marginBottom: '0'}}></div><div style={{display:'inline-block', width: '10px', height: '30px', marginBottom: '0'}}></div></>
                                        <><div style={{boxSizing:'border-box', display:'inline-block', backgroundColor: `${horn.side === 'bottom' ? horn.color : 'transparent'}`, borderRight: `${horn.side === 'bottom' ? '1px solid black' : '1px solid transparent'}`,  borderLeft: `${horn.side === 'bottom' ? '1px solid black' : '1px solid transparent'}`,  borderBottom: `${horn.side === 'bottom' ? '1px solid black' : '1px solid transparent'}`, width: `${props.width * .33 * .6 / (numRows * 4)}px`, height: '30px', marginBottom: '0'}}></div><div style={{display:'inline-block', width: `${props.width * .33 * .6 / (numRows * 4)}px`, height: '30px', marginBottom: '0'}}></div></>

                                    )
                                })}
                            </div>
                            <br />

                            
                        </div>
                    )
                })}

                <ControlBar palette={colorPalette} setPalette={handleSetColorPalette} minNum={4} maxNum={8} number={numRows} setNumber={handleSetNumRows} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='ding' organizedFunction={twist} unorganizedFunction={() => align(0)} unorgButton='Twist' orgButton='Align'/>
            </div>
        </div>
    )
}

export default Antlers;