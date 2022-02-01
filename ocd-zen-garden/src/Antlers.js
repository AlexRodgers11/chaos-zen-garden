import React, {useEffect, useRef, useState} from 'react';
import { useSelector } from 'react-redux';
import { organizingCounterActions } from './store/organizing-counter';
import useGardenSpecs from './hooks/useGardenSpecs';
import usePieceSpecs from './hooks/usePieceSpecs';
import { v4 as uuidv4 } from 'uuid';
import { getColor, soundPlay } from './utils';
import ControlBar from './ControlBar/ControlBar';
import { sizeActions } from './store/size';

function Antlers(props) {
    const palette = useSelector((state) => state.palette.palette);
    const [colorPalette, setColorPalette] = useState(palette);
    const [width, volume, fullView, dispatch] = useGardenSpecs();
    const pieceSpecs = usePieceSpecs(0, props.number, props.proportionalVolume, props.shape, props.sound, props.speed, props.text);
    
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

    const [horns, setHorns] = useState(createStartingHornsArray(pieceSpecs.number));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            setTimeout(() => {
                align(pieceSpecs.nextIndex);
            }, pieceSpecs.speed)
        } else {firstUpdate.current = false}
    }, [pieceSpecs.nextIndex])
    
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

    const align = (idx) => {
        let currentIdx = idx;
        if(idx === 0) {
            pieceSpecs.toggleIsOrganizing();
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
        soundPlay(pieceSpecs.soundObj, .01, volume, pieceSpecs.proportionalVolume);
        setHorns(newHorns);
        if(nextBottomIndex === horns.length){
            dispatch(organizingCounterActions.decrementOrganizingCounter());
            pieceSpecs.toggleIsOrganizing();
            pieceSpecs.toggleIsOrganized();
        } else {
            pieceSpecs.setNextIndex(nextBottomIndex);  
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
        pieceSpecs.toggleIsOrganized();
    }
    
    const handleSetColorPalette = palette => {
        colorsDoNotUpdate.current = false;
        setColorPalette(palette);
    }

    const displayHorns = () => {
        let hornLines = []
        let newLine = []
        for(let k = 0; k < pieceSpecs.number ** 2 * 2; k++){
            newLine.push(horns[k]);
            if(newLine.length === pieceSpecs.number * 2){
                hornLines.push(newLine);
                newLine = []
            }
        }
        return hornLines;
    }

    const handleSetNumRows = num => {
        pieceSpecs.setNumber(Number(num));
        setHorns(createStartingHornsArray(Number(num)))
    }


    const handleToggleFullView = () => {
        console.log('test')
        dispatch(sizeActions.setFullView(
            [
                props.id, {
                    type: 'antlers',
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
                        {displayHorns().map((hornLine, lineIdx) => {
                            let lineKey = uuidv4()
                            return (
                                <div key={lineKey} className="outer" style={{padding: '0', height: `${(Math.floor(width * .65 / pieceSpecs.number))}px`}}>
                                    <div style={{margin: '0', height: `${(Math.floor(width* .65 / pieceSpecs.number) / 2) - 1}px`}}>
                                        {hornLine.map(horn => {
                                            return (
                                                <><div key={horn.key} style={{boxSizing:'border-box', display:'inline-block', backgroundColor: `${horn.side === 'top' ? horn.color : 'transparent'}`, borderRight: `${horn.side === 'top' ? `1px solid ${getColor('border', colorPalette)}` : '1px solid transparent'}`,  borderLeft: `${horn.side === 'top' ? `1px solid ${getColor('border', colorPalette)}` : '1px solid transparent'}`,  borderTop: `${horn.side === 'top' ? `1px solid ${getColor('border', colorPalette)}` : '1px solid transparent'}`, width: `${width * .6 / (pieceSpecs.number * 4)}px`, height: `${(Math.floor(width * .65 / pieceSpecs.number) / 2) - 1}px`, marginBottom: '0'}}></div><div style={{display:'inline-block', width: `${width * .6 / (pieceSpecs.number * 4)}px`, height: `${(Math.floor(width * .65 / pieceSpecs.number) / 2) - 1}px`, marginBottom: '0'}}></div></>
                                            )
                                        })}
                                    </div>
                                    <div style={{margin: `0 ${.2 * width - 0 * (width * .6 / (pieceSpecs.number * 4))}px`, backgroundColor: 'black', height: 0, border: `1px solid ${getColor('border', colorPalette)}`, width: `${width * .6 - ((width * .6 / (pieceSpecs.number * 4)))}px`}}></div>
                                    <div style={{margin: '0', height: `${(Math.floor(width * .65 / pieceSpecs.number) / 2) - 1}px`}}>
                                        {hornLine.map(horn => {
                                            return (
                                                <><div key={horn.key} style={{boxSizing:'border-box', display:'inline-block', backgroundColor: `${horn.side === 'bottom' ? horn.color : 'transparent'}`, borderRight: `${horn.side === 'bottom' ? `1px solid ${getColor('border', colorPalette)}` : '1px solid transparent'}`,  borderLeft: `${horn.side === 'bottom' ? `1px solid ${getColor('border', colorPalette)}` : '1px solid transparent'}`,  borderBottom: `${horn.side === 'bottom' ? `1px solid ${getColor('border', colorPalette)}` : '1px solid transparent'}`, width: `${width * .6 / (pieceSpecs.number * 4)}px`, height: `${(Math.floor(width * .65 / pieceSpecs.number) / 2) - 1}px`, marginBottom: '0'}}></div><div style={{display:'inline-block', width: `${width * .6 / (pieceSpecs.number * 4)}px`, height: `${(Math.floor(width * .65 / pieceSpecs.number) / 2) - 1}px`, marginBottom: '0'}}></div></>

                                            )
                                        })}
                                    </div>
                                    <br />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <ControlBar id={props.id} toggleFullView={handleToggleFullView} palette={colorPalette} setPalette={handleSetColorPalette} minNum={4} maxNum={8} number={pieceSpecs.number} setNumber={handleSetNumRows} isOrganizing={pieceSpecs.isOrganizing} isOrganized={pieceSpecs.isOrganized} setSpeed={pieceSpecs.setSpeed} setSound={pieceSpecs.setSound} soundValue='Click' organizedFunction={flip} unorganizedFunction={() => align(0)} unorgButton='Flip' orgButton='Align'/>
            </div>
        </div>
    )
}

export default Antlers;