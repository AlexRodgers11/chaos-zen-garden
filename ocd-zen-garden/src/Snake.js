import React, { useState, useRef, useEffect } from 'react';
import useToggle from './hooks/useToggle';

function Snake(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [nextIndex, setNextIndex] = useState(1);
    // const [boxes, setBoxes] = useState([{id: 1, margin: `${325 + Math.floor(Math.random() * 50)}px`}, {id: 2, margin: `${325 + Math.floor(Math.random() * 50)}px`}, {id: 3, margin: `${325 + Math.floor(Math.random() * 50)}px`}, {id: 4, margin: `${325 + Math.floor(Math.random() * 50)}px`}, {id: 5, margin: `${325 + Math.floor(Math.random() * 50)}px`}]);
    const [boxes, setBoxes] = useState([{id: 1, margin: `${props.width * .33 * .5 + Math.floor(Math.random() * props.width * .33 * .085)}px`}, {id: 2, margin: `${props.width * .33 * .5 + Math.floor(Math.random() * props.width * .33 * .085)}px`}, {id: 3, margin: `${props.width * .33 * .5 + Math.floor(Math.random() * props.width * .33 * .085)}px`}, {id: 4, margin: `${props.width * .33 * .5 + Math.floor(Math.random() * props.width * .33 * .085)}px`}, {id: 5, margin: `${props.width * .33 * .5 + Math.floor(Math.random() * props.width * .33 * .085)}px`}]);

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
                return {...box, margin: `${props.width * .33 * .5}px`} 
            });
        } else {
            newBoxes = boxes.map(box => {
                if(box.id <= boxes[idx].id){
                    return {...box, margin: `${boxes[idx+1].margin}`}
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
            let randomNum = `${props.width * .33 * .5 + Math.floor(Math.random() * props.width * .33 * .085)}px`;
            return {...box, margin: randomNum};
        })
        setBoxes(newBoxes);
        toggleIsOrganized();
    }

    return (
        <div>
            <p>Snake Test</p>
            {boxes.map(box => (
                <div style={{boxSizing: 'border-box', border: '1.5px solid black', width: `${props.width * .33 * .085}px`, height: `${props.width * .33 * .085}px`, padding: 0, margin: `0 ${box.margin}`}}></div>
            ))}
            <button onClick={isOrganized ? scatterBoxes : () => organizeBoxes(0)}>{isOrganized ? 'Scatter' : 'Organize'}</button>
        </div>
    )
}

export default Snake;