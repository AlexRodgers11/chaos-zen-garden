import React, { useEffect, useRef, useState } from 'react';
import useToggle from './hooks/useToggle';
import { getColor } from './utils';
import ControlBar from './ControlBar';
import { Howl } from 'howler';
import Whoop from './assets/whoop.wav';

function BullsEye(props) {
    const getMargin = () => {
        return `${Math.abs(Math.random() * (((props.width * .33 * .55 -2)/ props.numRings)))}px`
    };    

    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    // const [orgIndex, setOrgIndex] = useState(props.numRings + 1);
    const [orgIndex, setOrgIndex] = useState(props.numRings + 1);

    const [marginLeft, setMarginLeft] = useState(props.id > 1 ? getMargin() : '0');
    const [marginTop, setMarginTop] = useState(props.id > 1 ? getMargin() : '0');
    const [speed, setSpeed] = useState(1000);
    const [colorPalette, setColorPalette] = useState(props.palette);

    const soundPlay = src => {
        const sound = new Howl({
            src: src,
            sprite: {
                whoop: [0, 400]
            }
        });
        sound.play('whoop');
    }

    let firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current && !isOrganized) {
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

    useEffect(() => {
        if(props.orgIndex === props.id && !isOrganized) {
            if(orgIndex !== props.numRings) {
                soundPlay(Whoop);
            }
            setMarginLeft(`${((props.width * .33 * .55 / props.numRings)) /2 -1}px`);
            setMarginTop(`${((props.width * .33 * .55 / props.numRings)) /2 -1}px`);
        } else if (props.isOrganized){
            setMarginLeft(getMargin());
            setMarginTop(getMargin());
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
    }, [props.palette])

    const organizeRings = () => {
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

    return (
        <div style={props.id === 1 ? {border: '1px solid black'} : null}>
            {props.id === 1 ? <p>BullsEye Test</p> : null}
            <div style={props.id > 1 ? {position: 'relative', backgroundColor: getColor(props.id, props.palette), marginLeft: marginLeft, marginTop: marginTop, border: '1px solid black', borderRadius: '50%', width: `${props.width * .33 * .55 - ((props.width * .33 * .55 / props.numRings) * (props.id - 1)) - 1}px`, height: `${props.width * .33 * .55 - ((props.width * .33 * .55 / props.numRings) * (props.id - 1)) - 1}px`} : {position: 'relative', margin: '0 auto', backgroundColor: getColor(props.id, props.palette), border: '1px solid black', borderRadius: '50%', width: `${props.width * .33 * .55}px`, height: `${props.width * .33 * .55}px`}}>
                {
                    props.id < props.numRings ? <BullsEye palette={colorPalette} orgIndex={props.id === 1 ? orgIndex : props.orgIndex} isOrganized={props.id === 1 ? isOrganized : props.isOrganized} numRings={props.numRings} id={props.id + 1} width={props.width} style={{position: 'relative', marginLeft: marginLeft, marginTop: marginTop, border: '1px solid black', borderRadius: '50%', width: `${props.width * .33 * .55 - ((props.width * .33 * .55 / props.numRings) * (props.id)) - 1}px`, height: `${props.width * .33 * .55 - ((props.width * .33 * .55 / props.numRings) * (props.id)) - 1}px`}} /> : null
                }
                
            </div>
            {/* {props.id === 1 ? <button onClick={isOrganized ? scatterRings : organizeRings} >{isOrganized ? 'Scatter' : 'Organize'}</button> : null} */}
            {props.id === 1 ? <ControlBar isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} organizedFunction={scatterRings} unorganizedFunction={organizeRings} unorgButton='Scatter' orgButton='Organize' /> : null}
        </div>
        
    )
}

export default BullsEye;