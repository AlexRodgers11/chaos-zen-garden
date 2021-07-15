import React, { useState, useRef, useEffect } from 'react';
import useToggle from './hooks/useToggle';

function Snake(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [nextIndex, setNextIndex] = useState(1);
    const [boxes, setBoxes] = useState([{id: 1, margin: `${325 + Math.floor(Math.random() * 50)}px`}, {id: 2, margin: `${325 + Math.floor(Math.random() * 50)}px`}, {id: 3, margin: `${325 + Math.floor(Math.random() * 50)}px`}, {id: 4, margin: `${325 + Math.floor(Math.random() * 50)}px`}, {id: 5, margin: `${325 + Math.floor(Math.random() * 50)}px`}]);

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
        let newBoxes = boxes.map(box => {
            if(box.id === boxes[idx].id){
                return {...box, margin: '350px'}
            } else {
                return box
            }
        });
        setBoxes(newBoxes);
        setNextIndex(idx + 1);
        if(idx + 1 === boxes.length) setTimeout(() => toggleIsOrganized(), 1000)
    }


    // const organizeBoxes = (idx) => {
    //     let newBoxes = boxes.map(box => {
    //         if(box.id === boxes[idx].id){
    //             return {...box, margin: '350px'}
    //         } else {
    //             return box
    //         }
    //     });
    //     setBoxes(newBoxes);
    //     setNextIndex(idx + 1);
    //     toggleIsOrganized()
    // }

    // const organizeBoxes = () => {
    //     for(let k = 0; k < boxes.length; k++){
    //         let newBoxes = boxes.map(box => {
    //             if(box.id === boxes[k].id){
    //                 return {...box, margin: '350px'}
    //             } else {
    //                 return box
    //             }
    //         })
    //         setTimeout(() => setBoxes(() => newBoxes), 1000);
    //     };
    //     toggleIsOrganized()
    // }

    const scatterBoxes = () => {
        let newBoxes = boxes.map(box => {
            let randomNum = `${325 + Math.floor(Math.random() * 50)}px`;
            return {...box, margin: randomNum};
        })
        setBoxes(newBoxes);
        toggleIsOrganized();
    }

    return (
        <div style={{width: '750px'}}>
            <p>Snake Test</p>
            {boxes.map(box => (
                <div style={{boxSizing: 'border-box', border: '1.5px solid black', width: '50px', height: '50px', padding: 0, margin: `0 ${box.margin}`}}></div>
            ))}
            <button onClick={isOrganized ? scatterBoxes : () => organizeBoxes(0)}>{isOrganized ? 'Scatter' : 'Organize'}</button>
        </div>
    )
}

export default Snake;