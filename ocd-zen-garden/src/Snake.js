import React from 'react';
import useToggle from './hooks/useToggle';

function Snake() {
    const [isOrganized, setIsOrganized] = useToggle(true);
    return (
        <div>
            <p>Snake Test</p>
        </div>
    )
}

export default Snake;