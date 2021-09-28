import React, { useState, useRef, useEffect } from 'react';
import useToggle from './hooks/useToggle';
import { getColor, getSound } from './utils';
import ControlBar from './ControlBar';
import { Howl } from 'howler';
import { v4 as uuidv4 } from 'uuid';
import { SiSketch } from 'react-icons/si';
// import Whoosh from './assets/whoosh.wav';

function Dots(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [nextIndex, setNextIndex] = useState({id: 0, dir: 'vertical'});
    const [numRows, setNumRows] = useState(7);
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('Swish'));
    const [colorPalette, setColorPalette] = useState(props.palette);
    const [colorUpdating] = useToggle(false);
    const [shape, setShape] = useState('circle');

    const soundPlay = soundObj => {
        const sound = new Howl({
            src: soundObj.src,
            sprite: soundObj.sprite,
            volume: props.volume * .01
        });
        sound.play(soundObj.spriteName);
    }

    const createStartingDotArray = num => {
        let startingDotArray = [];
        for(let i = 0; i < num**2; i++) {
            startingDotArray.push({
                id: i + 1, 
                // marginLeft: `${Math.random() * .05}`,
                // marginTop: `${Math.random() * .05}`,
                marginLeft: `${Math.random() * .065}`,
                marginTop: `${Math.random() * .065}`,
                color: (getColor(i + 1, colorPalette))
            })
        }
        return startingDotArray;
    }
    

    const [dots, setDots] = useState(createStartingDotArray(numRows));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            if(nextIndex.id < dots.length || nextIndex.dir === 'vertical'){
                setTimeout(() => {
                    organizeDots(nextIndex.id, nextIndex.dir);
                }, speed * .75);
            }
        } else {firstUpdate.current = false}
    }, [nextIndex])
    
    const colorsPropFirstUpdate = useRef(true)
    useEffect(() => {
        if(!colorsPropFirstUpdate.current) {
            let newDots = dots.map(dot => {
                return {...dot, color: getColor(dot.id, props.palette)}
            });
            setColorPalette(props.palette);
            setDots(newDots);
            colorsDoNotUpdate.current = true;
        } else {
            colorsPropFirstUpdate.current = false;
        }
        
    }, [props.palette]);

    const colorsDoNotUpdate = useRef(true)
    useEffect(() => {
        if(!colorsDoNotUpdate.current) {
            console.log('palette rerun')
            let newDots = dots.map(dot => {
                return {...dot, color: getColor(dot.id, colorPalette)}
            });
            setDots(newDots);
        } else {
            colorsDoNotUpdate.current = false;
        }
        
    }, [colorPalette]);
    

    const handleSetNumRows = num => {
        setNumRows(Number(num));
        setDots(createStartingDotArray(Number(num)))
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

    const handleChangeShape = shape => {
        setShape(shape);
    }

    const displayDots = () => {
        let dotLines = []
        let newLine = []
        for(let k = 0; k < numRows**2; k++){
            newLine.push(dots[k]);
            if(newLine.length === numRows){
                dotLines.push(newLine);
                newLine = []
            }
        }
        return dotLines;
    }

    const organizeDots = (idx, dir) => {
        if(idx === 0 && dir === 'horizontal') {
            toggleIsOrganizing();
        }
        let newDots;
        let newDir = dir === 'horizontal' ? 'vertical' : 'horizontal';
        let newIdx = dir === 'horizontal' ? idx : idx + 1
        if(dir === 'horizontal') {
            newDots = dots.map(dot => {
                if(dot.id === dots[idx].id){
                    return {...dot, marginLeft: `${.0325}`}
                } else {
                    return dot
                }
            });
        } else {
            newDots = dots.map(dot => {
                if(dot.id === dots[idx].id){
                    return {...dot, marginTop: `${.0325}`}
                } else {
                    return dot
                }
            });
        };
        soundPlay(sound);
        setDots(newDots);
        setNextIndex({id: newIdx, dir: newDir});
        if(idx + 1 === dots.length && dir === 'horizontal') setTimeout(() => {
            toggleIsOrganized();
            toggleIsOrganizing();
        }, 1000)
    }

    const scatterDots = () => {
        let newDots = dots.map(dot => {
            // return {...dot, marginLeft: `${Math.random() * .05}`, marginTop: `${Math.random() * .05}`}
            return {...dot, marginLeft: `${Math.random() * .065}`, marginTop: `${Math.random() * .065}`}
        });
        setDots(newDots);
        toggleIsOrganized();
    }

    const handleToggleWindow = () => {
        if(props.fullWindow) {
            props.toggleWindow(null)
        } else {
            props.toggleWindow('dots');
        }
    }

    return (
        // <div className="outer" style={{margin: props.fullWindow ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${props.width}px`, height: `${props.width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
        <div className="piece" style={{margin: props.fullWindow ? '0 auto' : 0, width: `${props.width}px`, height: `${props.width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div className="outer" style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div className="piece-container" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%'}}>
                    <div className="inner">
                    {displayDots().map(dotLine => {
                        let dotLineKey =uuidv4();
                        return <p key={dotLineKey} style={{marginBlockEnd: 0, marginBlockStart: 0, padding: 0, marginBottom: 0, marginTop: 0}}>
                            {dotLine.map(dot => {
                                let dotKey = uuidv4();
                                // return <span key={dotKey} style={{display: 'inline-block', textAlign: 'left', padding: '0px', width: `${props.width* .10}px`, height: `${props.width* .10}px`, marginBottom: '0'}}><span style={{display: 'block', border: `1px solid ${getColor('border', colorPalette)}`, borderRadius: '50%', width: `${props.width * .05}px`, height: `${props.width * .05}px`, marginLeft: `${dot.marginLeft * props.width - .5}px`, marginTop: `${dot.marginTop * props.width - .5}px`, backgroundColor: `${dot.color}`}}></span></span>
                                return <span key={dotKey} style={{display: 'inline-block', textAlign: 'left', padding: '0px', width: `${props.width* .10}px`, height: `${props.width* .10}px`, marginBottom: '0'}}><span style={{display: 'block', border: `1px solid ${getColor('border', colorPalette)}`, borderRadius: `${shape === 'circle' ? '50%' : 0}`, width: `${props.width * .035}px`, height: `${props.width * .035}px`, marginLeft: `${dot.marginLeft * props.width - .5}px`, marginTop: `${dot.marginTop * props.width - .5}px`, backgroundColor: `${dot.color}`}}></span></span>
                            })}
                        </p>
                    })}
                    </div>
                </div>
                <ControlBar toggleWindow={handleToggleWindow} fullWindow={props.fullWindow} disableFullWindow={props.disableFullWindow} shape={shape} shapes={['circle', 'square']} changeShape={handleChangeShape} setModalContent={props.setModalContent} volume={props.volume} changeVolume={handleChangeVolume} palette={colorPalette} setPalette={handleSetColorPalette} minNum={4} maxNum={7} number={numRows} setNumber={handleSetNumRows} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='Swish' organizedFunction={scatterDots} unorganizedFunction={() => organizeDots(0, 'horizontal')} unorgButton='Scatter' orgButton='Organize' />
            </div>
            
        </div>
    )
}

export default Dots;