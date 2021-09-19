import React, {useEffect, useRef, useState} from 'react';
import useToggle from './hooks/useToggle';
import { getColor, getSound } from './utils';
import ControlBar from './ControlBar';
import { Howl } from 'howler';

function Tallies(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [numRows, setNumRows] = useState(3);
    const [nextIndex, setNextIndex] = useState({idx: 0, mark: 2});
    const [colorPalette, setColorPalette] = useState(props.palette);
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('Click'));

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
                }
            })
        }
        return tallies
        
    }

    const [tallies, setTallies] = useState(createStartingTalliesArray(numRows));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            // console.log(nextIndex)
            // console.log(`nextIdx is ${nextIndex.idx} at ${nextIndex.mark}`)
            if(nextIndex.idx < tallies.length){
                setTimeout(() => {
                    complete(nextIndex.idx, nextIndex.mark);
                }, speed);
            } else {
                console.log('done')
                toggleIsOrganizing();
                toggleIsOrganized();
                console.log('done2')
            }
        } else {firstUpdate.current = false}
    }, [nextIndex])
    
    const colorsFirstUpdate = useRef(true)
    useEffect(() => {
        if(!colorsFirstUpdate.current) {
            let newTallies = tallies.map(tally => {
                return {...tally, color: getColor(tally.id, props.palette)}
            });
            setColorPalette(props.palette);
            setTallies(newTallies);
            colorsDoNotUpdate.current = true;
        } else {
            colorsFirstUpdate.current = false;
        }
        
    }, [props.palette]);

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

    const soundPlay = soundObj => {
        const sound = new Howl({
            src: soundObj.src,
            sprite: soundObj.sprite,
            volume: props.volume * .01
        });
        sound.play(soundObj.spriteName);
    }

    const complete = (idx, mark) => {
        let currentIdx = idx
        let currentMark = mark;
        if(idx === 0) {
            console.log('toggled again for some reason')
            toggleIsOrganizing();
        }
        while(tallies[currentIdx].marks[currentMark]) {
            if(currentMark < 5) {
                currentMark++
            } else {
                currentIdx++;
                currentMark = 2;
            }
        }
        console.log(`currentIdx: ${currentIdx}; currentMark: ${currentMark}`)
        let newTallies = tallies.map(tally => {
            if(tally.id === tallies[idx].id) {
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
            while(tallies[nextIdx].marks[nextMark] && nextIdx < tallies.length) {
                console.log(tallies[nextIdx].marks[nextMark]);
                console.log(nextIdx)
                if(nextMark < 5) {
                    nextMark++
                } else {
                    nextIdx++;
                    nextMark = 2;
                    // console.log('else reached')
                }
            }
        }

        



        soundPlay(sound);
        setTallies(newTallies);
        console.log(`setting nextIndex.idx to ${nextIdx}`)
        console.log(`setting nextIndex.mark to ${nextMark}`)
        setNextIndex({idx: nextIdx, mark: nextMark});
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
        setTallies(createStartingTalliesArray(Number(num)))
    }

    const handleSetColorPalette = palette => {
        colorsDoNotUpdate.current = false;
        setColorPalette(palette);
    }

    const handleChangeVolume = volume => {
        props.changeVolume(volume);
    }

    const displayTallies = () => {
        let tallyLines = []
        let newLine = []
        for(let k = 0; k < numRows**2; k++){
            newLine.push(tallies[k]);
            if(newLine.length === numRows){
                tallyLines.push(newLine);
                newLine = []
            }
        }
        return tallyLines;
    }

    const handleToggleWindow = () => {
        if(props.fullWindow) {
            props.toggleWindow(null)
        } else {
            props.toggleWindow('tallies');
        }
    }

    return (
        <div style={{margin: props.fullWindow ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${props.width}px`, height: `${props.width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%'}}>
                    <div>
                        {displayTallies().map(tallyLine => {
                            return <div>{tallyLine.map(tally => {
                                return <div style={{display: 'inline-flex', justifyContent: 'center', alignItems: 'center', backgroundColor:`${tally.color}`, border: `1px solid ${getColor('border', colorPalette)}`, width: `${props.width * .70 * (1 / (numRows + 2))}px`, height: `${props.width * .70 * (1 / (numRows + 2))}px`, margin: `${(props.width * .70 * (1 / (numRows + 2)) / (numRows + 2))}px`}}>
                                    {/* {tally.marks.map(mark => {
                                        return <span mark>t</span>
                                    })} */}
                                    <span>I</span>
                                    <span style={{display: tally.marks[2] ? 'inline-block' : 'none'}}>I</span>
                                    <span style={{display: tally.marks[3] ? 'inline-block' : 'none'}}>I</span>
                                    <span style={{display: tally.marks[4] ? 'inline-block' : 'none'}}>I</span>
                                    <span style={{display: tally.marks[5] ? 'inline-block' : 'none'}}>I</span>
                                </div>
                            })}</div>
                        })}
                    </div>
                </div>
                <ControlBar toggleWindow={handleToggleWindow} fullWindow={props.fullWindow} disableFullWindow={props.disableFullWindow} volume={props.volume} changeVolume={handleChangeVolume} palette={colorPalette} setPalette={handleSetColorPalette} minNum={3} maxNum={9} number={numRows} setNumber={handleSetNumRows} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='Click' organizedFunction={erase} unorganizedFunction={() => complete(0, 2)} unorgButton='Erase' orgButton='Complete'/>
            </div>
        </div>
    )
}

export default Tallies;