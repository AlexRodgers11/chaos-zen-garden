import React, { useState, useRef, useEffect } from 'react';
import useToggle from './hooks/useToggle';

function Dots(props) {
    const [isOrganized, setIsOrganized] = useToggle(false);
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
    const organizeDots = () => {
        
    }

    const scatterDots = () => {

    }

    return (
        <div>
            <p>Dots Test</p>
            {/* <div style={{width: '45%', margin: '0 auto'}}> */}
            <div style={{margin: '0 auto'}}>
                {displayDots().map(dotLine => {
                    return <p style={{marginBlockEnd: 0, marginBlockStart: 0, padding: 0}}>
                        {dotLine.map(dot => {
                            return <span style={{display: 'inline-block', border: '1px solid black', borderRadius: '50%', width: `${props.width * .33 * .035}px`, height: `${props.width * .33 * .035}px`, margin: `${props.width * .33 * .035}px`, marginBottom: `${props.width * .33 * .03}px`}}></span>
                        })}
                    </p>
                })}
                <button onClick={isOrganized ? scatterDots : () => scatterDots(0)}>{isOrganized ? 'Scatter' : 'Organize'}</button>
            </div>
        </div>
    )
}

export default Dots;