import React, { useEffect, useRef, useState } from 'react';
import useToggle from './hooks/useToggle';

function BullsEye(props) {
    const getMargin = () => {
        return `${Math.abs(Math.random() * (((props.width * .33 * .55 -2)/ props.numRings)))}px`
    };    

    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [started, setStarted] = useState(false);
    const [orgIndex, setOrgIndex] = useState(props.numRings + 1)
    const [color, setColor] = useState('blue')
    const [marginLeft, setMarginLeft] = useState(props.id > 1 ? getMargin() : '0');
    const [marginTop, setMarginTop] = useState(props.id > 1 ? getMargin() : '0');

    let firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current && !isOrganized) {
            if(props.id === 1) {
                setTimeout(() => {
                    if(orgIndex > 2) {
                        setOrgIndex(orgIndex - 1);
                    }
                    else if(orgIndex === 2) {
                        console.log('toggle about to run')
                        toggleIsOrganized();
                        setColor('red')
                    }
                }, 1000)
            }
        } else {
            firstUpdate.current = false;
        }
    }, [orgIndex]);

    useEffect(() => {
        if(props.orgIndex === props.id && !isOrganized) {
            console.log(`${props.id} setColor running`);
            setMarginLeft(`${((props.width * .33 * .55 / props.numRings)) /2 -1}px`);
            setMarginTop(`${((props.width * .33 * .55 / props.numRings)) /2 -1}px`);
        } else if (props.isOrganized){
            console.log(`${props.id} scatter should run here`)
            setMarginLeft(getMargin());
            setMarginTop(getMargin());
        }
    }, [props.orgIndex])

    const organizeRings = () => {
        setOrgIndex(orgIndex - 1);
    }

    const scatterRings = () => {
        setOrgIndex(props.numRings);
        setTimeout(() => {
            toggleIsOrganized();
        }, 0)
    }

    return (
        <div style={props.id === 1 ? {border: '1px solid black'} : null}>
            <div style={props.id > 1 ? {position: 'relative', marginLeft: marginLeft, marginTop: marginTop, border: `1px solid ${color}`, borderRadius: '50%', width: `${props.width * .33 * .55 - ((props.width * .33 * .55 / props.numRings) * (props.id - 1)) - 1}px`, height: `${props.width * .33 * .55 - ((props.width * .33 * .55 / props.numRings) * (props.id - 1)) - 1}px`} : {position: 'relative', marginLeft: '5px', border: `1px solid ${color}`, borderRadius: '50%', width: `${props.width * .33 * .55}px`, height: `${props.width * .33 * .55}px`}}>
                {
                    props.id < props.numRings ? <BullsEye orgIndex={props.id === 1 ? orgIndex : props.orgIndex} isOrganized={props.id === 1 ? isOrganized : props.isOrganized} started={started ? started : props.started} numRings={props.numRings} id={props.id + 1} width={props.width} style={{position: 'relative', marginLeft: marginLeft, marginTop: marginTop, border: `1px solid ${color}`, borderRadius: '50%', width: `${props.width * .33 * .55 - ((props.width * .33 * .55 / props.numRings) * (props.id)) - 1}px`, height: `${props.width * .33 * .55 - ((props.width * .33 * .55 / props.numRings) * (props.id)) - 1}px`}} /> : null
                }
                
            </div>
            {props.id === 1 ? <button onClick={isOrganized ? scatterRings : organizeRings} style={{marginTop: '50px'}}>{isOrganized ? 'Scatter' : 'Organize'}</button> : null}
        </div>
        
    )
}

export default BullsEye;