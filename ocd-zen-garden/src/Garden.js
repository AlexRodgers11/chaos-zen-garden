import React, { useState} from 'react';
import useToggle from './hooks/useToggle';
import useCurrentWidth from './hooks/useCurrentWidth';
import { getColor, palettes, getSound } from './utils';
import Snake from './Snake';
import Dots from './Dots';
import BullsEye from './BullsEye';
import Message from './Message';
import Dominoes from './Dominoes';
import Barcode from './Barcode';
import './Garden.css';
import { v4 as uuidv4 } from 'uuid';

function Garden(){
    let width = useCurrentWidth();
    const [colorPalette, setColorPalette] = useState(palettes[0]);

    const handleChangePalette = evt => {
        setColorPalette(evt.target.value);
    }

    return(
        <div style={{backgroundColor: getColor('base', colorPalette)}} className="Garden">
            <Snake width={width} className="Snake" palette={colorPalette} />
            <Dots width={width} className="Dots" palette={colorPalette}/>
            <BullsEye width={width} id={1} numRings={10} sound={getSound('whoop')} className="BullsEye" orgIndex={11} palette={colorPalette}/>
            <Message width={width} className="Message" palette={colorPalette}/>
            <Dominoes width={width} className="Dominoes" palette={colorPalette} />
            <Barcode width={width} className="Barcode" palette={colorPalette}/>
            <select onChange={handleChangePalette} value={colorPalette}>
                {palettes.map(palette => {
                    let paletteKey = uuidv4();
                    return <option key={paletteKey} value={palette}>{palette}</option>
                })}
            </select>
        </div>
    )
}

export default Garden;

