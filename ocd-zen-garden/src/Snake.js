import React, { useState, useRef, useEffect } from 'react';
import useToggle from './hooks/useToggle';

function Snake(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [nextIndex, setNextIndex] = useState(1);
    // const [boxes, setBoxes] = useState([{id: 1, margin: `${325 + Math.floor(Math.random() * 50)}px`}, {id: 2, margin: `${325 + Math.floor(Math.random() * 50)}px`}, {id: 3, margin: `${325 + Math.floor(Math.random() * 50)}px`}, {id: 4, margin: `${325 + Math.floor(Math.random() * 50)}px`}, {id: 5, margin: `${325 + Math.floor(Math.random() * 50)}px`}]);
    const [boxes, setBoxes] = useState([{id: 1, marginLeft: `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`}, {id: 2, marginLeft: `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`}, {id: 3, marginLeft: `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`}, {id: 4, marginLeft: `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`}, {id: 5, marginLeft: `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`}]);
    //.4575 - .085/2
    const firstUpdate = useRef(true);
    useEffect(()=>{
        if(!firstUpdate.current) {
            if(nextIndex < boxes.length){
                setTimeout(()=>{
                    organizeBoxes(nextIndex);
                }, 1000);
            }
        } else {firstUpdate.current = false}     
    }, [nextIndex, boxes])

    const organizeBoxes = (idx) => {
        let newBoxes;
        if(idx + 1 === boxes.length){
            newBoxes = boxes.map(box => {
                // return {...box, margin: '350px'} 
                return {...box, marginLeft: `${props.width * .33 * .4575}px`} 
                //organized middle is props.width * .33 * 5, which means the margin 
            });
        } else {
            newBoxes = boxes.map(box => {
                if(box.id <= boxes[idx].id){
                    return {...box, marginLeft: `${boxes[idx+1].marginLeft}`}
                } else {
                    return box
                }
            });
        }
        setBoxes(newBoxes);
        setNextIndex(idx + 1);
        if(idx + 1 === boxes.length) setTimeout(() => toggleIsOrganized(), 1000)
    }

    const scatterBoxes = () => {
        let newBoxes = boxes.map(box => {
            // let randomNum = `${325 + Math.floor(Math.random() * 50)}px`;
            let randomNum = `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`;
            return {...box, marginLeft: randomNum};
        })
        setBoxes(newBoxes);
        toggleIsOrganized();
    }

    return (
        <div style={{width: '100%', border: '1px solid black'}}>
            <p>Snake Test</p>
            {boxes.map(box => (
                <div style={{boxSizing: 'border-box', border: '1.5px solid black', width: `${props.width * .33 * .085}px`, height: `${props.width * .33 * .085}px`, padding: 0, marginTop: '0', marginBottom: '0', marginLeft: `${box.marginLeft}`}}></div>
            ))}
            <button onClick={isOrganized ? scatterBoxes : () => organizeBoxes(0)}>{isOrganized ? 'Scatter' : 'Organize'}</button>
        </div>
    )
}

export default Snake;