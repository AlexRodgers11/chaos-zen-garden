import React, { useEffect, useRef, useState } from 'react';
import useToggle from './hooks/useToggle';
import { v4 as uuidv4 } from 'uuid';
import { getColor, getSound } from './utils';
import ControlBar from './ControlBar';
import { Howl } from 'howler';


function Asterisk(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [nextIndex, setNextIndex] = useState(0);
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('Click'));
    const [colorPalette, setColorPalette] = useState(props.palette);
    const [numLines, setNumLines] = useState(15);
    const [userJustChangedNumber, toggleUserJustChangedNumber] = useToggle(props.id === 1 ? false : props.userJustChangedNumber)
    const [shape, setShape] = useState('circle');

    const createStartingLineArray = num => {
        let lines = [];
        for(let i = 1; i <= num; i++) {
            lines.push({
                id: i,
                color: getColor(i, colorPalette),
                offset: Math.random() * (360 / (numLines * 2)) / 1.5 * (Math.random() > .5 ? 1 : -1),
                key: uuidv4()
            })
        }
        return lines;
    }

    const [lines, setLines] = useState(createStartingLineArray(numLines));

    const soundPlay = soundObj => {
        const sound = new Howl({
            src: soundObj.src,
            sprite: soundObj.sprite,
            volume: props.volume * .01
        });
        sound.play(soundObj.spriteName);
    }

    const firstUpdate = useRef(true);
    useEffect(()=>{
        if(!firstUpdate.current) {
            if(nextIndex < lines.length){
                setTimeout(()=>{
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
                return {...line, color: getColor(line.id, props.palette)}
            });
            setColorPalette(props.palette);
            setLines(newLines);
            colorsDoNotUpdate.current = true;
        } else {
            colorFirstUpdate.current = false;
        }
    }, [props.palette]);

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
        }
        let newLines = lines.map(line => {
            if(line.id === lines[idx].id) {
                line.offset = 0
            }
            return line;
            
        });

        soundPlay(sound);
        setLines(newLines);
        setNextIndex(idx + 1);
        if(idx + 1 === lines.length) setTimeout(() => {
            toggleIsOrganized();
            toggleIsOrganizing();
        }, speed)
    }

    const shift = () => {
        let newLines = lines.map(line => {
            return {...line, offset: Math.random() * (360 / (numLines * 2)) / 1.5 * (Math.random() > .5 ? 1 : -1)}
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

    const handleSetNumLines = num => {
        setNumLines(Number(num));
        setLines(createStartingLineArray(Number(num)))
    }
    
    const handleChangeShape = shape => {
        setShape(shape);
    }

    const handleToggleWindow = () => {
        if(props.fullWindow) {
            props.toggleWindow(null)
        } else {
            props.toggleWindow('asterisk');
        }
    }


    return (
        <div style={{margin: props.fullWindow ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${props.width}px`, height: `${props.width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                        {lines.map(line => {
                            return (
                                <div key={line.key} style={{zIndex: `${line.id === 1 ? 1 : 0}`,position: 'absolute', width: `${(.65 * props.width) / (3 * numLines)}px`, height: `${.65 * props.width}px`, backgroundColor: line.color, border: `1px solid ${getColor('border', colorPalette)}`, transform: `rotate(${(360 / (numLines * 2)) * (line.id - 1) + line.offset}deg)`}}></div>
                            )
                        })}
                    </div>
                </div>
            <ControlBar toggleWindow={handleToggleWindow} fullWindow={props.fullWindow} disableFullWindow={props.disableFullWindow} setModalContent={props.setModalContent} volume={props.volume} changeVolume={handleChangeVolume} palette={colorPalette} setPalette={handleSetColorPalette} setNumber={handleSetNumLines} minNum={4} maxNum={50} number={numLines} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='Ding' organizedFunction={shift} unorganizedFunction={() => align(0)} unorgButton='Shift' orgButton='Align' />

            </div>
        </div>
        
    )
}

export default Asterisk;