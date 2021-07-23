import React, { useState } from 'react';
import useToggle from './hooks/useToggle';



function BullsEye(props) {
    const getMargin = () => {
        return `${Math.random() * ((props.width * .33 * .55 / props.numRings)) /2}px`
    };    

    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [index, setIndex] = useState(props.numRings);
    const [marginLeft, setMarginLeft] = useState(props.id > 1 ? getMargin() : '0');
    const [marginTop, setMarginTop] = useState(props.id > 1 ? getMargin() : '0');


    const organizeRings = () => {
        toggleIsOrganized();
    }

    return (
        <div style={props.id === 1 ? {border: '1px solid black'} : null}>
            <div style={props.style ? props.style : {position: 'relative', marginLeft: '5px', border: '1px solid yellow', borderRadius: '50%', width: `${props.width * .33 * .55}px`, height: `${props.width * .33 * .55}px`}}>
            {/* <div style={props.style}> */}
                {
                    // props.id < props.numRings ? <BullsEye numRings={props.numRings} id={props.id + 1} width={props.width} style={{position: 'relative', marginLeft: '5px', marginTop: '5px', border: '1px solid yellow', width: `${props.width * .33 * .55 - ((props.width * .33 * .55 / props.numRings) * (props.id)) - 1}px`, height: `${props.width * .33 * .55 - ((props.width * .33 * .55 / props.numRings) * (props.id)) - 1}px`}} /> : <div style={{position: 'relative', marginLeft: '5px', marginTop: '5px', border: '1px solid red', width: `${props.width * .33 * .55 - ((props.width * .33 * .55 / props.numRings) * (props.id)) - 1}px`, height: `${props.width * .33 * .55 - ((props.width * .33 * .55 / props.numRings) * (props.id)) - 1}px`}}/>
                    // props.id < props.numRings ? <BullsEye numRings={props.numRings} id={props.id + 1} width={props.width} style={{position: 'relative', marginLeft: `${Math.sqrt((props.width * .33 * .55 / props.numRings)**2  + (props.width * .33 * .55 / props.numRings)**2)}px`, marginTop: `${Math.sqrt((props.width * .33 * .55 / props.numRings)**2  + (props.width * .33 * .55 / props.numRings)**2)}px`, border: '1px solid yellow', borderRadius: '0%', width: `${props.width * .33 * .55 - ((props.width * .33 * .55 / props.numRings) * (props.id)) - 1}px`, height: `${props.width * .33 * .55 - ((props.width * .33 * .55 / props.numRings) * (props.id)) - 1}px`}} /> : null
                    // props.id < props.numRings ? <BullsEye numRings={props.numRings} id={props.id + 1} width={props.width} style={{position: 'relative', marginLeft: `${((props.width * .33 * .55 / props.numRings)) /2 -1}px`, marginTop: `${((props.width * .33 * .55 / props.numRings)) / 2 -1}px`, border: '1px solid yellow', borderRadius: '50%', width: `${props.width * .33 * .55 - ((props.width * .33 * .55 / props.numRings) * (props.id)) - 1}px`, height: `${props.width * .33 * .55 - ((props.width * .33 * .55 / props.numRings) * (props.id)) - 1}px`}} /> : null
                    props.id < props.numRings ? <BullsEye numRings={props.numRings} id={props.id + 1} width={props.width} style={{position: 'relative', marginLeft: marginLeft, marginTop: marginTop, border: '1px solid yellow', borderRadius: '50%', width: `${props.width * .33 * .55 - ((props.width * .33 * .55 / props.numRings) * (props.id)) - 1}px`, height: `${props.width * .33 * .55 - ((props.width * .33 * .55 / props.numRings) * (props.id)) - 1}px`}} /> : null
                    //marginLeft: `${((props.width * .33 * .55 / props.numRings)) /2 -1}px`, (organized position)
                }
                
            </div>
            {props.id === 1 ? <button onClick={organizeRings} style={{marginTop: '50px'}}>{isOrganized ? 'Scatter' : 'Organize'}</button> : null}
        </div>
        
    )
}
















// function BullsEye(props) {
//     const [isOrganized, toggleIsOrganized] = useToggle(false);
//     const [rings, setRings] = useState([{id: 1, width: `${props.width * .33 * .60}px`, zIndex: '1', offset: 0}, {id: 2, width: '50px', zIndex: '2', offset: '24px'}, {id: 3, width: '25px', zIndex: '3', offset: '36.5px'}, {id: 4, width: '12.5px', zIndex: '4', offset: '42.75px'}, {id: 5, width: '6.25px', zIndex: '5', offset: '45.875px'}]);
//     const [nextIndex, setNextIndex] = useState(1);

//     return (
//         <div style={{border: '1px solid black'}}>
//             <div style={{position: 'relative', margin: `0 ${props.width * .33 / 2 - (props.width * .33 * .60 * .5)}px`}}>
//                 {rings.map(ring => {
//                     return <p style={{position: 'absolute', border: '1px solid black', width: `${ring.width}`, height: `${ring.width}`, zIndex: `${ring.zIndex}`, left: `${ring.offset}`, top: `${ring.offset}`}}></p>
//                 })}
//             </div>
//         </div>
//     )
// }

export default BullsEye;