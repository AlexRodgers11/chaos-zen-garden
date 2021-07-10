import React from 'react';
import useToggle from './hooks/useToggle';

//clicking scatter button has to give each one a random offset
////push objects into boxArr that have randomly assigned offsets and 
//clicking organize has to, one at at time, correct the offset


function Snake(props) {
    const [isOrganized, setIsOrganized] = useToggle(true);
    const numBoxes = props.num || 10;
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
                // <p style={{border: '1px solid black', width: '10px', display: 'block', height: '20px', color: 'blue'}}>7</p>
                <p style={{transition: `${idx.delay}`, color: isOrganized ? 'blue' : 'green', border: '1px solid black', height:'50px', width: '50px', margin: '0 auto'}}>XXX</p>
                // <p id={idx} style={{color:'blue'}}>7</p>
            ))}
            <button onClick={setIsOrganized}>{isOrganized ? 'Scatter' : 'Organize'}</button>
        </div>
    )
}

export default Snake;