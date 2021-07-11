import React from 'react';
import useToggle from './hooks/useToggle';

function SnakeBox() {
    const [isOrganized, toggleIsOrganized] = useToggle(true);
    return (
        <div style={{'color': isOrganized ? 'blue' : 'green'}}>Test Snake Box</div>
    )
}

export default SnakeBox;