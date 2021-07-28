import React, { useState} from 'react';
import useToggle from './hooks/useToggle';
import useCurrentWidth from './hooks/useCurrentWidth';
import { getColor, palettes } from './utils';
import Snake from './Snake';
import Dots from './Dots';
import BullsEye from './BullsEye';
import Message from './Message';
import Dominoes from './Dominoes';
import './Garden.css';

function Garden(){
    let width = useCurrentWidth();
    const [colorPalette, setColorPalette] = useState(palettes[0]);

    const handleChangePalette = evt => {
        setColorPalette(evt.target.value);
    }

    return(
        <div style={{backgroundColor: getColor('base', colorPalette)}} className="Garden">
            <Snake width={width} className="Snake" />
            <Dots width={width} className="Dots" palette={colorPalette}/>
            <BullsEye width={width} id={1} numRings={10} className="BullsEye" orgIndex={11}/>
            <Message width={width} className="Message" />
            <Dominoes width={width} className="Dominoes" />
            <select onChange={handleChangePalette} value={colorPalette}>
                {palettes.map(palette => {
                    return <option value={palette}>{palette}</option>
                })}
            </select>
        </div>
    )
}

export default Garden;

