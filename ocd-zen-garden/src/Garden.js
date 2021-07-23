import React, { useState } from 'react';
import useCurrentWidth from './hooks/useCurrentWidth';
import Snake from './Snake';
import Dots from './Dots';
import BullsEye from './BullsEye';
import Message from './Message';
import Dominoes from './Dominoes';
import './Garden.css';

const colors = {
    salmon: '#ff0048',
    lime: '#44ff00',
    blue: '#3e0eff',
    orange: '#ffa30e',
    pink:  '#ff00fb',
    yellow: '#ffff00'
}

function Garden(){
    let width = useCurrentWidth();
    return(
        <div className="Garden">
            <Snake width={width} colors={colors} className="Snake" />
            <Dots width={width} className="Dots" />
            <BullsEye width={width} id={1} numRings={10} className="BullsEye" />
            <Message width={width} className="Message" />
            <Dominoes width={width} className="Dominoes" />
            
            {/* <div className="Temp">Temp fake garden piece with width: {width}</div> */}
        </div>
    )
}

export default Garden;

