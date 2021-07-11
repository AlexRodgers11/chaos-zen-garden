import React from 'react';
import useToggle from './hooks/useToggle';
import SnakeBox from './SnakeBox';

//clicking scatter button has to give each one a random offset
////push objects into boxArr that have randomly assigned offsets and 
//clicking organize has to, one at at time, correct the offset


function Snake(props) {
    const [isOrganized, setIsOrganized] = useToggle(true);
    const numBoxes = props.num || 20;
    const boxArr = [];
    for(let k = 1; k <= numBoxes; k++){
        let randomNum = Math.ceil(Math.random() * 50)
        boxArr.push({
            offset: `${randomNum}px`,
            delay: `${k * 3}s`
        });
    }

    console.log(boxArr.length);
    return (
        <div>
            <p>Snake Test</p>
            {boxArr.map(idx => (
                <SnakeBox />
            ))}
            <button onClick={setIsOrganized}>{isOrganized ? 'Scatter' : 'Organize'}</button>
        </div>
    )
}

export default Snake;