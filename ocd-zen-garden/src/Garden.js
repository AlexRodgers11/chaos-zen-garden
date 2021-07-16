import React, { useState } from 'react';
import Snake from './Snake';
import Dots from './Dots';

function Garden(){
    return(
        <div className="Garden">
            <Snake />
            <Dots />
        </div>
    )
}

export default Garden;

