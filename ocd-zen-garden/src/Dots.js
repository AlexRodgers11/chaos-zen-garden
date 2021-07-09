import React from 'react';
import useToggle from './hooks/useToggle';

function Dots() {
    const [isOrganized, setIsOrganized] = useToggle(true);
    return (
        <div>
            <p>Dots Test</p>
        </div>
    )
}

export default Dots;