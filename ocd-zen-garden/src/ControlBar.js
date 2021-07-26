import React from 'react';

function ControlBar(props) {
    return (
        <div>
            <span>
                <button>Add</button>
                <button>Change Colors</button>
                <button>Change Speed</button>
            </span>
            <span>
                <button onClick={props.isOrganized ? props.organizedFunction : props.unorganizedFunction}>{props.isOrganized ? props.unorgButton : props.orgButton}</button>
            </span>
        </div>
    )
}

export default ControlBar;