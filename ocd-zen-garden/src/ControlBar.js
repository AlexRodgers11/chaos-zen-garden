import React, { useState } from 'react';

function ControlBar(props) {
    const [speed, setSpeed] = useState(1000);
    const handleChange = evt => {
        setSpeed(evt.target.value);
        props.setSpeed(evt.target.value);
    }

    return (
        <div>
            <span>
                <button>Add</button>
                <button>Change Colors</button>
                {/* <button>Change Speed</button> */}
                <select value={speed} onChange={handleChange}>
                    <option value={4000}>.25x</option>
                    <option value={2000}>.5x</option>
                    <option value={1000}>1x</option>
                    <option value={800}>1.25x</option>
                    <option value={500}>2x</option>
                    <option value={200}>5x</option>
                </select>
            </span>
            <span>
                <button onClick={props.isOrganized ? props.organizedFunction : props.unorganizedFunction}>{props.isOrganized ? props.unorgButton : props.orgButton}</button>
            </span>
        </div>
    )
}

export default ControlBar;