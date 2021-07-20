import React, { useState } from 'react';
import useCurrentWidth from './hooks/useCurrentWidth';
import Snake from './Snake';
import Dots from './Dots';
import BullsEye from './BullsEye';
import Message from './Message';
import Dominoes from './Dominoes';
import './Garden.css';

function Garden(){
    let width = useCurrentWidth();
    return(
        <div className="Garden">
            <Snake width={width} className="Snake" />
            <Dots width={width} className="Dots" />
            <BullsEye width={width} className="BullsEye" />
            <Message width={width} className="Message" />
            <Dominoes width={width} className="Dominoes" />
            
            {/* <div className="Temp">Temp fake garden piece with width: {width}</div> */}
        </div>
    )
}

export default Garden;

