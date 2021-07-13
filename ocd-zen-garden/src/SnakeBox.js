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
        }, `${props.delay}s`)//delay doesn't work yet
    }, [props.isOrganized])

    const createDelay = (time) => {
        setTimeout(() => {
            return 'red'
        }, time * 1000);
    }

    return (
        // <div style={{boxSizing: 'border-box', transition: `color ${props.delay}`, 'color': isOrganized ? 'blue' : 'green', width: '250px', padding: 0, margin: '0 auto'}}>Test Snake Box</div>
        <div style={{boxSizing: 'border-box', border: '1.5px solid black', transition: `color ${props.delay}`, width: '50px', height: '50px', padding: 0, margin: props.isOrganized ? '0 auto' : `0 ${props.margin}`}}></div>
        // <div style={{transition: `color ${props.delay}s`, 'color': isOrganized ? 'blue' : createDelay(props.delay)}}>Test Snake Box</div>
        // <div style={{'color': props.isOrganized ? 'blue' : createDelay(props.delay)}}>Test Snake Box</div>
        // <div style={{transitionDelay: `color ${props.delay}`, 'color': isOrganized ? 'blue' : 'green'}}>Test Snake Box</div>
    )
}

export default SnakeBox;