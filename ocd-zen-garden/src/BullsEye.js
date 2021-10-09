import React, { useEffect, useRef, useState } from 'react';
import useToggle from './hooks/useToggle';
import { getColor, getSound, scaler, soundPlay } from './utils';
import ControlBar from './ControlBar';

function BullsEye(props) {
    // const getMargin = () => {
    //     return Math.random()
    // };    

    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [orgIndex, setOrgIndex] = useState(props.numRings + 1);
    const [marginLeft, setMarginLeft] = useState(props.id > 1 ? Math.random(): '0');
    const [marginTop, setMarginTop] = useState(props.id > 1 ? Math.random(): '0');
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound(props.sound));
    const [proportionalVolume, setProportionalVolume] = useState(props.id === 1 ? 'proportional' : props.proportionalVolume);
    const [colorPalette, setColorPalette] = useState(props.palette);
    const [numRings, setNumRings] = useState(props.numRings);
    const [userJustChangedNumber, toggleUserJustChangedNumber] = useToggle(props.id === 1 ? false : props.userJustChangedNumber);
    const [shape, setShape] = useState('circle');

    // const soundPlay = soundObj => {
    //     const sound = new Howl({
    //         src: soundObj.src,
    //         sprite: soundObj.sprite,
    //         volume: props.volume * .01
    //     });
    //     sound.play(soundObj.spriteName);
    // }

    let firstUpdate = useRef(true);
    useEffect(() => {
        if((!firstUpdate.current && !isOrganized) && !userJustChangedNumber) {
            if(props.id === 1) {
                setTimeout(() => {
                    if(orgIndex > 2) {
                        setOrgIndex(orgIndex - 1);
                    }
                    else if(orgIndex === 2) {
                        toggleIsOrganized();
                        toggleIsOrganizing();
                    }
                }, speed)
            }
        } else {
            firstUpdate.current = false;
        }
    }, [orgIndex]);


    let numRingsFirstUpdate = useRef(true);
    useEffect(() => {
        if(!numRingsFirstUpdate.current) {
            setNumRings(props.numRings);
            if(isOrganized) {
                setMarginLeft(1 / 2);
                setMarginTop(1 / 2);
            } else {
                setMarginLeft(Math.random());
                setMarginTop(Math.random());
            }
        } else {
            numRingsFirstUpdate.current = false;
        }
    }, [props.numRings]);

    useEffect(() => {
        if((props.orgIndex === props.id && !isOrganized)) {
            if(orgIndex !== props.numRings) {
                soundPlay(sound, scaler(0, 2, .0015, .01, marginTop + marginLeft), props.volume, (props.id > 1 ? props.proportionalVolume : proportionalVolume));
            }
            setMarginLeft(1 / 2);
            setMarginTop(1 / 2);
        } else if (props.isOrganized){
            setMarginLeft(Math.random());
            setMarginTop(Math.random());
        }
    }, [props.orgIndex]);

    let colorFirstUpdate = useRef(true);
    useEffect(() => {
        if(!colorFirstUpdate.current) {
            setColorPalette(props.palette);
        } else {
            if(props.id !== 1) {
                setColorPalette(props.palette);
            } else {
                colorFirstUpdate.current = false;
            }
        }
    }, [props.palette]);

    let soundFirstUpdate = useRef(true);
    useEffect(() => {
        if(!soundFirstUpdate.current) {
            setSound(props.sound);
        } else {
            if(props.id !== 1) {
                setSound(props.sound);
            } else {
                soundFirstUpdate.current = false;
            }
        }
    }, [props.sound])
    
    const organizeRings = () => {
        if(userJustChangedNumber) toggleUserJustChangedNumber();
        if(orgIndex === props.numRings + 1) {
            toggleIsOrganizing();
            
        }
        setOrgIndex(orgIndex - 1);
    }

    const scatterRings = () => {
        setOrgIndex(props.numRings + 1);
        setTimeout(() => {
            toggleIsOrganized();
        }, 0)
    }

    const handleSetSpeed = time => {
        setSpeed(time);
    }

    const handleSetSound = sound => {
        setSound(getSound(sound));
    }

    const handleSetColorPalette = palette => {
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
            props.toggleWindow('bullseye');
        }
    }

    const handleSetNumRings = num => {
        let number = Number(num)
        props.setNumRings(number);
        if(props.id === 1) setOrgIndex(number + 1)
        if(!userJustChangedNumber) toggleUserJustChangedNumber();
        if(isOrganized) toggleIsOrganized();
    }

    return (
        <div style={props.id === 1 ? {margin: props.fullWindow ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${props.width}px`, height: `${props.width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)} : null}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', width: '100%'}}>
                <div style={props.id === 1 ? {display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%'} : null}>
                    <div style={props.id > 1 ? {position: 'relative', backgroundColor: getColor(props.id, colorPalette), left: `${(marginLeft * props.width * .6 / props.numRings) - 1}px`, top: `${(marginTop * props.width * .6 / props.numRings) - 1}px`, border: `1px solid ${getColor('border', colorPalette)}`, borderRadius: `${props.shape === 'circle' ? '50%' : 0}`, width: `${props.width * .6 - ((props.width * .6 / props.numRings) * (props.id - 1)) - 1}px`, height: `${props.width * .6 - ((props.width * .6 / props.numRings) * (props.id - 1)) - 1}px`} : {position: 'relative', margin: '0 auto', backgroundColor: getColor(props.id, colorPalette), border: `1px solid ${getColor('border', colorPalette)}`, borderRadius: `${props.shape === 'circle' ? '50%' : 0}`, width: `${props.width * .60}px`, height: `${props.width * .60}px`}}>
                        {                                                                                                         
                            props.id < props.numRings ? <BullsEye shape={props.shape} userJustChangedNumber={props.id === 1 ? userJustChangedNumber : props.userJustChangedNumber} volume={props.volume} proportionalVolume={props.id === 1 ? proportionalVolume : props.proportionalVolume} palette={colorPalette} sound={sound} orgIndex={props.id === 1 ? orgIndex : props.orgIndex} isOrganized={props.id === 1 ? isOrganized : props.isOrganized} numRings={props.numRings} id={props.id + 1} width={props.width}  /> : null
                        }
                        
                    </div>
                </div>
            {props.id === 1 ? <ControlBar width={props.width} loggedIn={props.loggedIn} toggleWindow={handleToggleWindow} fullWindow={props.fullWindow} disableFullWindow={props.disableFullWindow} setModalContent={props.setModalContent} volume={props.volume} changeVolume={handleChangeVolume} changeProportionalVolume={handleChangeProportionalVolume} proportionalVolume={proportionalVolume} shape={shape} shapes={['circle', 'square']} changeShape={props.setShape} palette={colorPalette} setPalette={handleSetColorPalette} setNumber={handleSetNumRings} minNum={4} maxNum={40} number={props.numRings} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='Whoop' organizedFunction={scatterRings} unorganizedFunction={organizeRings} unorgButton='Scatter' orgButton='Organize' /> : null}
            </div>
        </div>
        
    )
}

export default BullsEye;