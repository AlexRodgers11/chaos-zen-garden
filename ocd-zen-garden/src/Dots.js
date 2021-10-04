import React, { useState, useRef, useEffect } from 'react';
import useToggle from './hooks/useToggle';
import { getColor, getSound, scaler, soundPlay } from './utils';
import ControlBar from './ControlBar';
import { v4 as uuidv4 } from 'uuid';

function Dots(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [nextIndex, setNextIndex] = useState({id: 0, dir: 'vertical'});
    const [numRows, setNumRows] = useState(7);
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('Swish'));
    const [colorPalette, setColorPalette] = useState(props.palette);
    const [shape, setShape] = useState('circle');

    // const soundPlay = (soundObj, multiplier) => {
    //     const sound = new Howl({
    //         src: soundObj.src,
    //         sprite: soundObj.sprite,
    //         volume: props.volume * .01 * multiplier
    //     });
    //     sound.play(soundObj.spriteName);
    // }

    const createStartingDotArray = num => {
        let startingDotArray = [];
        for(let i = 0; i < num**2; i++) {
            let leftOffset  = (Math.random() * 60 + 5) * (Math.random() > .5 ? -1 : 1);
            let topOffset = (Math.random() * 60 + 5) * (Math.random() > .5 ? -1 : 1);
            startingDotArray.push({
                id: i + 1, 
                marginLeft: leftOffset,
                marginTop: topOffset,
                color: (getColor(i + 1, colorPalette)),
                key: uuidv4(),
                leftVolumeMultiplier: scaler(5, 65, .0015, .01, Math.abs(leftOffset)),
                topVolumeMultiplier: scaler(5, 65, .0015, .01, Math.abs(topOffset))
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
            soundPlay(sound, dots[idx].leftVolumeMultiplier, props.volume);
        } else {
            newDots = dots.map(dot => {
                if(dot.id === dots[idx].id){
                    return {...dot, marginTop: `${.0325}`}
                } else {
                    return dot
                }
            });
            soundPlay(sound, dots[idx].topVolumeMultiplier,props.volume);
        };
        
        setDots(newDots);
        setNextIndex({id: newIdx, dir: newDir});
        if(idx + 1 === dots.length && dir === 'horizontal') setTimeout(() => {
            toggleIsOrganized();
            toggleIsOrganizing();
        }, 1000)
    }

    const scatterDots = () => {
        let newDots = dots.map(dot => {
            let leftOffset = (Math.random() * 60 + 5) * (Math.random() > .5 ? 1 : -1);
            let topOffset = (Math.random() * 60 + 5) * (Math.random() > .5 ? 1 : -1);
            return {
                ...dot, 
                marginLeft: leftOffset, 
                marginTop: topOffset,
                leftVolumeMultiplier: scaler(5, 65, .0015, .01, Math.abs(leftOffset)),
                topVolumeMultiplier: scaler(5, 65, .0015, .01, Math.abs(topOffset))
            }
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

    //box itself
    //box that contains the pieces and the controlbar
    //box that contains just the pieces

    return (
        <div className="piece" style={{margin: props.fullWindow ? '0 auto' : 0, width: `${props.width}px`, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${props.width}px`, height: `${props.width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div className="outer" style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                <div style={{width: `${.75 * props.width}px`, height: `${.75 * props.width}px`}}>
                        <div className="piece-container" style={{width: '100%', height: '100%'}}>
                            {displayDots().map(dotLine => {
                                let dotLineKey =uuidv4();
                                return <p key={dotLineKey} style={{display: 'flex', marginBlockEnd: 0, marginBlockStart: 0, padding: 0, marginBottom: 0, marginTop: 0, width: '100%', height: `${100 / (numRows)}%`}}>
                                    {dotLine.map(dot => {
                                        return (<p key={dot.key} style={{display: 'inline-flex', justifyContent: 'center', alignItems: 'center', marginBlockEnd: 0, marginBlockStart: 0, padding: '0px', width: `${100 / (numRows)}%`, height: '100%', marginBottom: '0'}}>
                                                    <span style={{display: 'inline-block', border: `1px solid ${getColor('border', colorPalette)}`, borderRadius: `${shape === 'circle' ? '50%' : 0}`, width: `${Math.floor(((100 / numRows) / 100) * .3 * props.width * .75)}px`, height: `${Math.floor(((100 / numRows) / 100 ) * .3 * props.width * .75)}px`, marginLeft: `${dot.marginLeft}%`, marginTop: `${dot.marginTop}%`, backgroundColor: `${dot.color}`}}></span>
                                                </p>)
                                    })}
                                </p>
                            })}
                        </div>
                    </div>
                </div>
                <ControlBar toggleWindow={handleToggleWindow} fullWindow={props.fullWindow} disableFullWindow={props.disableFullWindow} shape={shape} shapes={['circle', 'square']} changeShape={handleChangeShape} setModalContent={props.setModalContent} volume={props.volume} changeVolume={handleChangeVolume} palette={colorPalette} setPalette={handleSetColorPalette} minNum={4} maxNum={25} number={numRows} setNumber={handleSetNumRows} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='Swish' organizedFunction={scatterDots} unorganizedFunction={() => organizeDots(0, 'horizontal')} unorgButton='Scatter' orgButton='Organize' />
            </div>
            
        </div>
    )
}

export default Dots;