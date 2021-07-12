import React, { useEffect } from 'react';
import useToggle from './hooks/useToggle';

function SnakeBox(props) {
    //gets delay prop from parent
    //set it's own state to change at end of delay, if prop changing is true
    //use transition in this child component to animate each transtion after the state changes

    const [isOrganized, toggleIsOrganized] = useToggle(true);

    useEffect(() => {
        console.log(props.delay);
        setTimeout(() => {
            toggleIsOrganized()
        }, props.delay)//delay doesn't work yet
    }, [props.isOrganized])


    return (
        // <div style={{transition: `color ${props.delay}`, 'color': isOrganized ? 'blue' : 'green'}}>Test Snake Box</div>
        <div style={{transition: `color ${props.delay}`, 'color': isOrganized ? 'blue' : 'green'}}>Test Snake Box</div>
        // <div style={{transitionDelay: `color ${props.delay}`, 'color': isOrganized ? 'blue' : 'green'}}>Test Snake Box</div>
    )
}

export default SnakeBox;