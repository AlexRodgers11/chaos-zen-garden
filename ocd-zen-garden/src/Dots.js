import React, { useState, useRef, useEffect } from 'react';
import useToggle from './hooks/useToggle';

function Dots() {
    const [isOrganized, setIsOrganized] = useToggle(true);
    const [nextIndex, setNextIndex] = useState(1);
    const [dots, setDots] = useState([{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}, {id: 11}, {id: 12}, {id: 13}, {id: 14}, {id: 15}, {id: 16}]);

    const displayDots = () => {
        let dotLines = []
        let newLine = []
        for(let k = 0; k < dots.length; k++){
            newLine.push(dots[k]);
            if(newLine.length === 4){
                dotLines.push(newLine);
                newLine = []
            }
        }
        console.log(dotLines);
        return dotLines;
    }
    
    
    
    
    // const displayDots = () => {
    //     let dotLines = []
    //     let newLine = []
    //     // let idx = 0;
    //     while (dotLines.length < (dots.length / 4)) {
    //         // for(let k = idx; k < dots.length; k++){
    //         for(let k = 0; k < dots.length; k++){
    //             if(newLine.length === 4){
    //                 dotLines.push(newLine);
    //                 newLine = []
    //             }
    //             newLine.push(dots[k]);
    //             // idx++;
    //         }
    //         console.log(dotLines.length)
    //     }
    //     console.log(dotLines);
    //     return dotLines;
    // }


    return (
        <div>
            <p>Dots Testttt</p>
            <div style={{width: '30%'}}>
                {displayDots().map(dotLine => {
                    return <p>
                        {dotLine.map(dot => {
                            return <span>Dot: {dot.id}</span>
                        })}
                    </p>
                })}
            </div>
        </div>
    )
}

export default Dots;