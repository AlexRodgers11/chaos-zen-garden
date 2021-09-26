import React, { useEffect, useRef, useState} from 'react';
import useToggle from './hooks/useToggle';
import { getColor, getSound } from './utils';
import ControlBar from './ControlBar';
import { Howl } from 'howler';
import { v4 as uuidv4 } from 'uuid';

function Rainbow(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [colorPalette, setColorPalette] = useState(props.palette);
    const [nextIdx, setNextIdx] = useState();
    const [numLines, setNumLines] = useState(10);
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('Whoop'));

    const soundPlay = soundObj => {
        const sound = new Howl({
            src: soundObj.src,
            sprite: soundObj.sprite,
            volume: props.volume * .01
        });
        sound.play(soundObj.spriteName);
    }
    
    const createStartingLinesArray = num => {
        let startingLineArray = [];
        for(let i = 0; i < num; i++) {
            startingLineArray.push({
                id: i + 1,
                topPercent: Math.random() * 100,
                color: getColor(i + 1, colorPalette),
                color2: getColor(i + 2, colorPalette),
            })
        }
        return startingLineArray;
    }

    const [lines, setLines] = useState(createStartingLinesArray(numLines));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current && nextIdx < lines.length) {
            setTimeout(() => {
                unbalance(nextIdx)
            }, speed)
        } else {
            firstUpdate.current = false;
        }
    }, [nextIdx]);

    const colorsFirstUpdate = useRef(true)
    useEffect(() => {
        if(!firstUpdate.current) {
            let newLines = lines.map(line => {
                return {...line, color: getColor(line.id, props.palette), color2: getColor(line.id + 1, colorPalette)}
            });
            setLines(newLines);
            setColorPalette(props.palette);
            colorsDoNotUpdate.current = true;
        } else {
            colorsFirstUpdate.current = false;
        }
    }, [props.palette]);

    const colorsDoNotUpdate = useRef(true)
    useEffect(() => {
        if(!colorsDoNotUpdate.current) {
            let newLines = lines.map(line => {
                return {...line, color: getColor(line.id, colorPalette), color2: getColor(line.id + 1, colorPalette)}
            });
            setLines(newLines);
        } else {
            colorsDoNotUpdate.current = false;
        }
        
    }, [colorPalette]);

    const unbalance = idx => {
        if(idx === 0) {
            toggleIsOrganizing();
        }
        let newLines = lines.map(line => {
            if(lines[idx].id === line.id) {
                return {...line, topPercent: 30}
            } else {
                return line;
            }
        });
        soundPlay(sound);
        setLines(newLines);
        setNextIdx(idx + 1);
        if(idx + 1 === lines.length) {
            setTimeout(() => {
                toggleIsOrganized();
                toggleIsOrganizing();
            }, speed);
        }
    }

    const balance = () => {
        let newLines = lines.map(line => {
            return {...line, topPercent: Math.random() * 100}
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

    const handleChangeVolume = volume => {
        props.changeVolume(volume);
    }

    const handleToggleWindow = () => {
        if(props.fullWindow) {
            props.toggleWindow(null)
        } else {
            props.toggleWindow('rainbow');
        }
    }

    const handleSetNumLines = num => {
        setNumLines(Number(num));
        setLines(createStartingLinesArray(Number(num)))
    }

    return (
        <div style={{margin: props.fullWindow ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${props.width}px`, height: `${props.width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div className="putinhere" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                    {/* <div> */}
                        {/* {lines.map(line => {
                            let lineKey = uuidv4();
                            return <div key={lineKey} style={{display: 'inline-block', width: `${props.width * .65 / ((numLines * 3) + 1.5)}px`, border: `.75px solid ${getColor('border', colorPalette)}`, height: .55 * props.width, margin: `${props.width * .65 * 1.35 / ((numLines * 3) + 1.5)}px`, backgroundColor: `${line.color}`}}><div style={{width: '100%', height: `${line.topPercent}%`, backgroundColor: '#303030', borderBottom: `1px solid ${getColor('border', colorPalette)}`}}></div></div>
                        })} */}
                   {/* <div style={{width: '600px', height: '300px', borderTop: '30px solid black', borderLeft: '30px solid black', borderRight: '30px solid black', borderRadius: '450px 450px 0 0'}}></div> */}
                        {/* <div style={{width: props.width * .8, height: props.width * .4, borderTop: `${props.width * .01}px solid black`, borderLeft: `${props.width * .01}px solid black`, borderRight: `${props.width * .01}px solid black`, borderRadius: `${props.width * (.6 - .02)}px ${props.width * (.6 - .02)}px 0 0`}}>
                            <div style={{position: 'relative', top: `${props.width * .02}px`, width: props.width * (.8 - .02), height: props.width * (.4 - .02), borderTop: `${props.width * .01}px solid blue`, borderLeft: `${props.width * .01}px solid blue`, borderRight: `${props.width * .01}px solid blue`, borderRadius: `${props.width * (.6 - .02)}px ${props.width * (.6 - .02)}px 0 0`}}></div>
                        </div> */}
                        <div className="wrapper" style={{display: 'flex', justifyContent: 'center', width: `100%`, height: `${props.width * .3}px`, overflow: 'hidden' }}>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: `${props.width * .6}px`, height: `${props.width * .6 }px`, border: `${props.width * .025}px solid red`, borderRadius: '50%'}}>
                                <div style={{position: 'relative', right: '75px',width: `${props.width * (.6 - .05)}px`, height: `${props.width * (.6 - .05)}px`, border: `${props.width * .025}px solid orange`, borderRadius: '50%'}}>
                                    <div style={{position: 'relative', left: '5px', width: `${props.width * (.6 - .1)}px`, height: `${props.width * (.6 - .1)}px`, border: `${props.width * .025}px solid yellow`, borderRadius: '50%'}}>
                                        <div style={{position: 'relative', right: '10px',width: `${props.width * (.6 - .15)}px`, height: `${props.width * (.6 - .15)}px`, border: `${props.width * .025}px solid green`, borderRadius: '50%'}}>
                                        <div style={{position: 'relative', left: '40px',width: `${props.width * (.6 - .2)}px`, height: `${props.width * (.6 - .2)}px`, border: `${props.width * .025}px solid blue`, borderRadius: '50%'}}>
                                        <div style={{position: 'relative', left: '25px', width: `${props.width * (.6 - .25)}px`, height: `${props.width * (.6 - .25)}px`, border: `${props.width * .025}px solid purple`, borderRadius: '50%'}}></div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    {/* </div> */}
                </div>
                <ControlBar toggleWindow={handleToggleWindow} fullWindow={props.fullWindow} disableFullWindow={props.disableFullWindow} volume={props.volume} changeVolume={handleChangeVolume} palette={colorPalette} setPalette={handleSetColorPalette} setNumber={handleSetNumLines} minNum={7} maxNum={15} number={numLines} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='Whoop' organizedFunction={balance} unorganizedFunction={() => unbalance(0)} unorgButton='Unbalance' orgButton='Balance' />

            </div>
        </div>
    )
}

export default Rainbow;