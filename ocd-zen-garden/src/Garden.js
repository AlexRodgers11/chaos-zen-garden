import React, { useState } from 'react';
import useCurrentWidth from './hooks/useCurrentWidth';
import Snake from './Snake';
import Dots from './Dots';
import './Garden.css';

function Garden(){
    let width = useCurrentWidth();
    return(
        <div className="Garden">
            <Snake width={width} className="Snake"/>
            <Dots width={width} className="Dots"/>
            <div className="Temp">Temp fake garden piece with width: {width}</div>
        </div>
    )
}

export default Garden;

