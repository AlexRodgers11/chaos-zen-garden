import React, { useState, useRef, useEffect } from 'react';
import useToggle from './hooks/useToggle';
import { getColor } from './utils';
import ControlBar from './ControlBar';

function Snake(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [nextIndex, setNextIndex] = useState(0);
    const [boxes, setBoxes] = useState([{id: 1, marginLeft: `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`, color: getColor(1, 'baseColors')}, {id: 2, marginLeft: `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`, color: getColor(2, 'baseColors')}, {id: 3, marginLeft: `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`, color: getColor(3, 'baseColors')}, {id: 4, marginLeft: `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`, color: getColor(4, 'baseColors')}, {id: 5, marginLeft: `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`, color: getColor(5, 'baseColors')}, {id: 6, marginLeft: `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`, color: getColor(6, 'baseColors')}, {id: 7, marginLeft: `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`, color: getColor(7, 'baseColors')}]);
    const [speed, setSpeed] = useState(1000);

    const firstUpdate = useRef(true);
    useEffect(()=>{
        if(!firstUpdate.current) {
            if(nextIndex < boxes.length){
                setTimeout(()=>{
                    organizeBoxes(nextIndex);
                }, speed);
            }
        } else {
            firstUpdate.current = false;
            console.log('firstUpdate changed')
        }     
    }, [nextIndex])


    const organizeBoxes = (idx) => {
        let newBoxes;
        if(idx + 1 === boxes.length){
            newBoxes = boxes.map(box => {
                return {...box, marginLeft: `${props.width * .33 * .4575}px`} 
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
        console.log('setNextIndex just ran')
        if(idx + 1 === boxes.length) setTimeout(() => toggleIsOrganized(), speed)
    }

    const scatterBoxes = () => {
        let newBoxes = boxes.map(box => {
            let randomNum = `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`;
            return {...box, marginLeft: randomNum};
        })
        setBoxes(newBoxes);
        toggleIsOrganized();
    }

    const handleSetSpeed = time => {
        setSpeed(time);
    }

    return (
        <div style={{width: '100%', border: '1px solid black'}}>
            <p>Snake Test</p>
            {boxes.map(box => (
                <div style={{boxSizing: 'border-box', border: '1.5px solid black', width: `${props.width * .33 * .085}px`, height: `${props.width * .33 * .085}px`, padding: 0, marginTop: '0', marginBottom: '0', marginLeft: `${box.marginLeft}`, backgroundColor: `${box.color}` }}></div>
            ))}
            {/* <button onClick={isOrganized ? scatterBoxes : () => organizeBoxes(0)}>{isOrganized ? 'Scatter' : 'Organize'}</button> */}
            <ControlBar isOrganized={isOrganized} setSpeed={handleSetSpeed} organizedFunction={scatterBoxes} unorganizedFunction={() => organizeBoxes(0)} unorgButton='Scatter' orgButton='Organize' />
        </div>
    )
}

export default Snake;