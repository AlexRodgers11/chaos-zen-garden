import React, {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { organizingCounterActions } from './store/organizing-counter';
import useToggle from './hooks/useToggle';
import { v4 as uuidv4 } from 'uuid';
import { getColor, getSound } from './utils';
import ControlBar from './ControlBar';
import { Howl } from 'howler';

function Antlers(props) {
    const palette = useSelector((state) => state.palette.palette);
    const volume = useSelector((state) => state.volume.volume);
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [numRows, setNumRows] = useState(5);
    const [nextIndex, setNextIndex] = useState(0);
    const [colorPalette, setColorPalette] = useState(palette);
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('Click'));
    const dispatch = useDispatch();
    
    const createStartingHornsArray = num => {
        let horns = [];
        for(let i = 1; i <= num ** 2 * 2; i++) {
            horns.push({
                id: i, 
                color: getColor(i, colorPalette),
                side: Math.random() > .5 ? 'top' : 'bottom',
                key: uuidv4()
            })
        }
        return horns
    }

    const [horns, setHorns] = useState(createStartingHornsArray(numRows));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            setTimeout(() => {
                align(nextIndex);
            }, speed)
        } else {firstUpdate.current = false}
    }, [nextIndex])
    
    const colorsFirstUpdate = useRef(true)
    useEffect(() => {
        if(!colorsFirstUpdate.current) {
            let newHorns = horns.map(horn => {
                return {...horn, color: getColor(horn.id, palette)}
            });
            setColorPalette(palette);
            setHorns(newHorns);
            colorsDoNotUpdate.current = true;
        } else {
            colorsFirstUpdate.current = false;
        }
        
    }, [palette]);

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
            sprite: soundObj.sprite,
            volume: volume * .01
        });
        sound.play(soundObj.spriteName);
    }

    const align = (idx) => {
        let currentIdx = idx;
        if(idx === 0) {
            toggleIsOrganizing();
            dispatch(organizingCounterActions.incrementOrganizingCounter())
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
        let nextBottomIndex = horns.length;
        for(let i = currentIdx + 1; i < horns.length; i++) {
            if (horns[i].side === 'bottom') {
                nextBottomIndex = i;
                break;
            }
        }
        soundPlay(sound);
        setHorns(newHorns);
        if(nextBottomIndex === horns.length){
            dispatch(organizingCounterActions.decrementOrganizingCounter());
            toggleIsOrganizing();
            toggleIsOrganized();
        } else {
            setNextIndex(nextBottomIndex);  
        }            
    }

    const flip = () => {
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
        <div style={{margin: props.fullWindow ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${props.width}px`, height: `${props.width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%'}}>
                    <div>
                        {displayHorns().map((hornLine, lineIdx) => {
                            let lineKey = uuidv4()
                            return (
                                <div key={lineKey} className="outer" style={{padding: '0', height: `${(Math.floor(props.width * .65 / numRows))}px`}}>
                                    <div style={{margin: '0', height: `${(Math.floor(props.width* .65 / numRows) / 2) - 1}px`}}>
                                        {hornLine.map(horn => {
                                            return (
                                                <><div key={horn.key} style={{boxSizing:'border-box', display:'inline-block', backgroundColor: `${horn.side === 'top' ? horn.color : 'transparent'}`, borderRight: `${horn.side === 'top' ? `1px solid ${getColor('border', colorPalette)}` : '1px solid transparent'}`,  borderLeft: `${horn.side === 'top' ? `1px solid ${getColor('border', colorPalette)}` : '1px solid transparent'}`,  borderTop: `${horn.side === 'top' ? `1px solid ${getColor('border', colorPalette)}` : '1px solid transparent'}`, width: `${props.width * .6 / (numRows * 4)}px`, height: `${(Math.floor(props.width * .65 / numRows) / 2) - 1}px`, marginBottom: '0'}}></div><div style={{display:'inline-block', width: `${props.width * .6 / (numRows * 4)}px`, height: `${(Math.floor(props.width * .65 / numRows) / 2) - 1}px`, marginBottom: '0'}}></div></>
                                            )
                                        })}
                                    </div>
                                    <div style={{margin: `0 ${.2 * props.width - 0 * (props.width * .6 / (numRows * 4))}px`, backgroundColor: 'black', height: 0, border: `1px solid ${getColor('border', colorPalette)}`, width: `${props.width * .6 - ((props.width * .6 / (numRows * 4)))}px`}}></div>
                                    <div style={{margin: '0', height: `${(Math.floor(props.width * .65 / numRows) / 2) - 1}px`}}>
                                        {hornLine.map(horn => {
                                            return (
                                                <><div key={horn.key} style={{boxSizing:'border-box', display:'inline-block', backgroundColor: `${horn.side === 'bottom' ? horn.color : 'transparent'}`, borderRight: `${horn.side === 'bottom' ? `1px solid ${getColor('border', colorPalette)}` : '1px solid transparent'}`,  borderLeft: `${horn.side === 'bottom' ? `1px solid ${getColor('border', colorPalette)}` : '1px solid transparent'}`,  borderBottom: `${horn.side === 'bottom' ? `1px solid ${getColor('border', colorPalette)}` : '1px solid transparent'}`, width: `${props.width * .6 / (numRows * 4)}px`, height: `${(Math.floor(props.width * .65 / numRows) / 2) - 1}px`, marginBottom: '0'}}></div><div style={{display:'inline-block', width: `${props.width * .6 / (numRows * 4)}px`, height: `${(Math.floor(props.width * .65 / numRows) / 2) - 1}px`, marginBottom: '0'}}></div></>

                                            )
                                        })}
                                    </div>
                                    <br />

                                    
                                </div>
                            )
                        })}
                    </div>
                </div>
                <ControlBar width={props.width} piece='antlers' toggleHighlightUserIcon={props.toggleHighlightUserIcon} palette={colorPalette} setPalette={handleSetColorPalette} minNum={4} maxNum={8} number={numRows} setNumber={handleSetNumRows} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='Click' organizedFunction={flip} unorganizedFunction={() => align(0)} unorgButton='Flip' orgButton='Align'/>
            </div>
        </div>
    )
}

export default Antlers;