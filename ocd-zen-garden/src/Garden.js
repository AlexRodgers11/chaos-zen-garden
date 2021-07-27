import React from 'react';
import useToggle from './hooks/useToggle';
import useCurrentWidth from './hooks/useCurrentWidth';
import { getColor } from './utils';
import Snake from './Snake';
import Dots from './Dots';
import BullsEye from './BullsEye';
import Message from './Message';
import Dominoes from './Dominoes';
import './Garden.css';

function Garden(){
    let width = useCurrentWidth();
    return(
        <div style={{backgroundColor: getColor('base', 'baseColors')}} className="Garden">
            <Snake width={width} className="Snake" />
            <Dots width={width} className="Dots" />
            <BullsEye width={width} id={1} numRings={10} className="BullsEye" orgIndex={11}/>
            <Message width={width} className="Message" />
            <Dominoes width={width} className="Dominoes" />
        </div>
    )
}

export default Garden;

