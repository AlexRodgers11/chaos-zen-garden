import React, { useEffect, useRef, useState} from 'react';
import useToggle from './hooks/useToggle';
import { getColor, getSound, scaler, soundPlay } from './utils';
import ControlBar from './ControlBar';


function Rainbow(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [colorPalette, setColorPalette] = useState(props.palette);
    const [nextIdx, setNextIdx] = useState();
    const [numArcs, setNumArcs] = useState(12);
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('Sparkle'));
    const [proportionalVolume, setProportionalVolume] = useState('proportional');

    // const soundPlay = (soundObj, multiplier) => {
    //     const sound = new Howl({
    //         src: soundObj.src,
    //         sprite: soundObj.sprite,
    //         volume: props.volume * .01 * multiplier
    //     });
    //     sound.play(soundObj.spriteName);
    // }
    
    const createStartingArcsArray = num => {
        let startingArcArray = [];
        for(let i = 0; i < num; i++) {
            let random = .5 + Math.random() * 9.5
            startingArcArray.push({
                id: i + 1,
                color: getColor(i + 1, colorPalette),
                offset: random * (i % 2 === 0 ? 1 : -1),
                volumeMultiplier: scaler(.5, 10, .002, .01, random)
            })
        }
        return startingArcArray;
    }

    const [arcs, setArcs] = useState(createStartingArcsArray(numArcs));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current && nextIdx > 0) {
            setTimeout(() => {
                align(nextIdx)
            }, speed)
        } else {
            firstUpdate.current = false;
        }
    }, [nextIdx]);

    const colorsFirstUpdate = useRef(true)
    useEffect(() => {
        if(!firstUpdate.current) {
            let newArcs = arcs.map(arc => {
                return {...arc, color: getColor(arc.id, props.palette), color2: getColor(arc.id + 1, colorPalette)}
            });
            setArcs(newArcs);
            setColorPalette(props.palette);
            colorsDoNotUpdate.current = true;
        } else {
            colorsFirstUpdate.current = false;
        }
    }, [props.palette]);

    const colorsDoNotUpdate = useRef(true)
    useEffect(() => {
        if(!colorsDoNotUpdate.current) {
            let newArcs = arcs.map(arc => {
                return {...arc, color: getColor(arc.id, colorPalette), color2: getColor(arc.id + 1, colorPalette)}
            });
            setArcs(newArcs);
        } else {
            colorsDoNotUpdate.current = false;
        }
        
    }, [colorPalette]);

    const align = idx => {
        if(idx === arcs.length - 1) {
            toggleIsOrganizing();
            props.setNumOrganizing(1);
        }
        let newArcs = arcs.map(arc => {
            if(arcs[idx].id === arc.id) {
                return {...arc, offset: 0}
            } else {
                return arc;
            }
        });
        soundPlay(sound, arcs[idx].volumeMultiplier, props.volume, proportionalVolume);
        setArcs(newArcs);
        setNextIdx(idx - 1);
        if(idx - 1 === 0) {
            props.setNumOrganizing(-1);
            setTimeout(() => {
                toggleIsOrganized();
                toggleIsOrganizing();
            }, speed);
        }
    }

    const shift = () => {
        let newArcs = arcs.map(arc => {
            let random = .5 + Math.random() * 9.5
            return {
                ...arc, 
                offset: random * (arc.id % 2 === 0 ? -1 : 1),
                volumeMultiplier: scaler(.5, 10, .002, .01, random)
            }
        })
        setArcs(newArcs);
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

    const handleChangeProportionalVolume = selection => {
        setProportionalVolume(selection);
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

    const handleSetNumArcs = num => {
        setNumArcs(Number(num));
        setArcs(createStartingArcsArray(Number(num)))
    }

    const displayArcs = (num, width) => {
        if(num < arcs.length) {
            return (
                <div style={{
                    display: 'flex', 
                    position: 'relative',
                    left: `${num !== 0 ? arcs[num].offset : 0}%`,
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    width: `${width}px`, 
                    height: `${width}px`, 
                    border: `${(props.width * .7) / (4 * numArcs)}px solid ${arcs[num].color}`, 
                    borderRadius: '50%'}}
                >
                    {displayArcs(num + 1, width - (2 * (props.width * .7) / (4 * numArcs)))}
                </div>
            )
        }
    }

    return (
        <div style={{margin: props.fullWindow ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${props.width}px`, height: `${props.width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div className="putinhere" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                        <div className="wrapper" style={{display: 'flex', justifyContent: 'center', width: `100%`, height: `${props.width * .35}px`, overflow: 'hidden' }}>
                            {displayArcs(0, props.width * .7)}
                        </div>
                </div>
                <ControlBar width={props.width} loggedIn={props.loggedIn} setNumOrganizing={props.setNumOrganizing} toggleHighlightUserIcon={props.toggleHighlightUserIcon} toggleWindow={handleToggleWindow} fullWindow={props.fullWindow} disableFullWindow={props.disableFullWindow} setModalContent={props.setModalContent} changeProportionalVolume={handleChangeProportionalVolume} proportionalVolume={proportionalVolume} volume={props.volume} changeVolume={handleChangeVolume} palette={colorPalette} setPalette={handleSetColorPalette} setNumber={handleSetNumArcs} minNum={7} maxNum={25} number={numArcs} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='Sparkle' organizedFunction={shift} unorganizedFunction={() => align(arcs.length - 1)} unorgButton='Shift' orgButton='Align' />

            </div>
        </div>
    )
}

export default Rainbow;