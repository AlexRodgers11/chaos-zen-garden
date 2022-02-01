import React, {useEffect, useRef, useState} from 'react';
import { useSelector } from 'react-redux';
import useGardenSpecs from './hooks/useGardenSpecs';
import usePieceSpecs from './hooks/usePieceSpecs';
import { sizeActions } from './store/size';
import { organizingCounterActions } from './store/organizing-counter';
import { v4 as uuidv4 } from 'uuid';
import { getColor, soundPlay } from './utils';
import ControlBar from './ControlBar/ControlBar';
import { Howl } from 'howler';

function Tallies(props) {
    const palette = useSelector((state) => state.palette.palette);
    const [colorPalette, setColorPalette] = useState(palette);
    const [width, volume, fullView, dispatch] = useGardenSpecs();
    const pieceSpecs = usePieceSpecs(0, props.number, props.proportionalVolume, props.shape, props.sound, props.speed, props.text);

    const createStartingTalliesArray = num => {
        let tallies = [];
        for(let i = 1; i < num ** 2 + 1; i++) {
            let randomNum = 1 + Math.floor(Math.random() * 5);
            tallies.push({
                id: i, 
                color: getColor(i, colorPalette),
                number: randomNum,
                marks: {
                    1: true,
                    2: randomNum > 1,
                    3: randomNum > 2,
                    4: randomNum > 3,
                    5: randomNum > 4,
                },
                key: uuidv4()
            })
        }
        return tallies
        
    }

    const [tallies, setTallies] = useState(createStartingTalliesArray(pieceSpecs.number));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            if(pieceSpecs.nextIndex.idx < tallies.length){
                setTimeout(() => {
                    complete(pieceSpecs.nextIndex.idx, pieceSpecs.nextIndex.mark);
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
            let newTallies = tallies.map(tally => {
                return {...tally, color: getColor(tally.id, palette)}
            });
            setColorPalette(palette);
            setTallies(newTallies);
            colorsDoNotUpdate.current = true;
        } else {
            colorsFirstUpdate.current = false;
        }
        
    }, [palette]);

    const colorsDoNotUpdate = useRef(true)
    useEffect(() => {
        if(!colorsDoNotUpdate.current) {
            let newTallies = tallies.map(tally => {
                return {...tally, color: getColor(tally.id, colorPalette)}
            });
            setTallies(newTallies);
        } else {
            colorsDoNotUpdate.current = false;
        }
        
    }, [colorPalette]);

    const complete = (idx, mark) => {
        let currentIdx = idx
        let currentMark = mark;
        if(idx === 0 && mark === 2) {
            pieceSpecs.toggleIsOrganizing();
            dispatch(organizingCounterActions.incrementOrganizingCounter())
        }
        while(tallies[currentIdx].marks[currentMark]) {
            if(currentMark < 5) {
                currentMark++
            } else {
                currentIdx++;
                currentMark = 2;
            }
        }

        let newTallies = tallies.map(tally => {
            if(tally.id === tallies[currentIdx].id) {
                return {...tally, marks: {...tallies[currentIdx].marks, [currentMark]: true}}
            } else {
                return tally;
            }
        });

        let nextMark;
        let nextIdx;
        if(currentMark < 5) {
            nextMark = currentMark + 1;
            nextIdx = idx;
        } else {
            nextMark = 2;
            nextIdx = idx + 1;
        }
        if(nextIdx < tallies.length) {
            while(nextIdx < tallies.length && tallies[nextIdx].marks[nextMark]) {
                if(nextMark < 5) {
                    nextMark++
                } else {
                    nextIdx++;
                    nextMark = 2;
                }
            }
        }

        soundPlay(pieceSpecs.soundObj, .01, volume, pieceSpecs.proportionalVolume);
        setTallies(newTallies);
        pieceSpecs.setNextIndex({idx: nextIdx, mark: nextMark});
    }

    const erase = () => {
        let newTallies = tallies.map(tally => {
            let randomNum = 1 + Math.floor(Math.random() * 5)
            return {
                ...tally, 
                number: randomNum,
                marks: {
                    1: true,
                    2: randomNum > 1,
                    3: randomNum > 2,
                    4: randomNum > 3,
                    5: randomNum > 4, 
                }
            }
        })
        setTallies(newTallies);
        pieceSpecs.toggleIsOrganized();
    }

    const handleSetNumRows = num => {
        pieceSpecs.setNumber(Number(num));
        setTallies(createStartingTalliesArray(Number(num)))
    }

    const handleSetColorPalette = palette => {
        colorsDoNotUpdate.current = false;
        setColorPalette(palette);
    }

    const displayTallies = () => {
        let tallyLines = []
        let newLine = []
        for(let k = 0; k < pieceSpecs.number**2; k++){
            newLine.push(tallies[k]);
            if(newLine.length === pieceSpecs.number){
                tallyLines.push(newLine);
                newLine = []
            }
        }
        return tallyLines;
    }

    const handleToggleFullView = () => {
        dispatch(sizeActions.setFullView(
            [
                props.id, {
                    type: 'tallies',
                    palette: palette,
                    speed: pieceSpecs.speed,
                    sound: pieceSpecs.sound,
                    proportionalVolume: pieceSpecs.proportionalVolume,
                    number: pieceSpecs.number,
                    shape: pieceSpecs.shape ,
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
                        {displayTallies().map(tallyLine => {
                            let lineKey = uuidv4()
                            return <div key={lineKey}>{tallyLine.map(tally => {
                                return <div key={tally.key} style={{position: 'relative', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: `${width * .70 * (1 / (pieceSpecs.number + 2))}px`, height: `${width * .70 * (1 / (pieceSpecs.number + 2))}px`, margin: `${(width * .70 * (1 / (pieceSpecs.number + 2)) / (pieceSpecs.number + 2))}px`}}>
                                    <span style={{height: '100%', width: '12.5%', marginRight: '12.5%', backgroundColor: `${tally.color}`, border: `1px solid ${getColor('border', colorPalette)}`}}></span>
                                    <span style={{display: tally.marks[2] ? 'inline-block' : 'none', height: '100%', width: '12.5%', marginRight: '12.5%', backgroundColor: `${tally.color}`, border: `1px solid ${getColor('border', colorPalette)}`}}></span>
                                    <span style={{display: tally.marks[3] ? 'inline-block' : 'none', height: '100%', width: '12.5%', marginRight: '12.5%', backgroundColor: `${tally.color}`, border: `1px solid ${getColor('border', colorPalette)}`}}></span>
                                    <span style={{display: tally.marks[4] ? 'inline-block' : 'none', height: '100%', width: '12.5%', marginRight: '12.5%', backgroundColor: `${tally.color}`, border: `1px solid ${getColor('border', colorPalette)}`}}></span>
                                    <span style={{position: 'absolute', zIndex: '2', transform: 'rotate(-45deg)', display: tally.marks[5] ? 'inline-block' : 'none', height: '135%', width: '12.5%', marginRight: '12.5%', backgroundColor: `${tally.color}`, border: `1px solid ${getColor('border', colorPalette)}`}}></span>
                                </div>
                            })}</div>
                        })}
                    </div>
                </div>
                <ControlBar id={props.id} toggleFullView={handleToggleFullView} palette={colorPalette} setPalette={handleSetColorPalette} minNum={3} maxNum={9} number={pieceSpecs.number} setNumber={handleSetNumRows} isOrganizing={pieceSpecs.isOrganizing} isOrganized={pieceSpecs.isOrganized} setSpeed={pieceSpecs.setSpeed} setSound={pieceSpecs.setSound} soundValue='Click' organizedFunction={erase} unorganizedFunction={() => complete(0, 2)} unorgButton='Erase' orgButton='Complete'/>
            </div>
        </div>
    )
}

export default Tallies;