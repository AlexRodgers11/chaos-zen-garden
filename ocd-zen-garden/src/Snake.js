import React, { useToggle } from './hooks/useToggle';

function Snake() {
    const [isOrganized, seIsOrganized] = useToggle(true);
    return (
        <div>
            <p>Snake Test</p>
        </div>
    )
}

export default Snake;