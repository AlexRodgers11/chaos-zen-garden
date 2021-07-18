import React, { useState, useRef, useEffect } from 'react';
import useToggle from './hooks/useToggle';

function BullsEye(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [rings, setRings] = useState([{id: 1, width: `${props.width * .33 * .60}px`, zIndex: '1', offset: 0}, {id: 2, width: '50px', zIndex: '2', offset: '24px'}, {id: 3, width: '25px', zIndex: '3', offset: '36.5px'}, {id: 4, width: '12.5px', zIndex: '4', offset: '42.75px'}, {id: 5, width: '6.25px', zIndex: '5', offset: '45.875px'}]);
    const [nextIndex, setNextIndex] = useState(1);

    return (
        <div style={{border: '1px solid black'}}>
            <div style={{position: 'relative', margin: `0 ${props.width * .33 / 2 - (props.width * .33 * .60 * .5)}px`}}>
                {rings.map(ring => {
                    return <p style={{position: 'absolute', border: '1px solid black', width: `${ring.width}`, height: `${ring.width}`, zIndex: `${ring.zIndex}`, left: `${ring.offset}`, top: `${ring.offset}`}}></p>
                })}
            </div>
        </div>
    )
}

export default BullsEye;