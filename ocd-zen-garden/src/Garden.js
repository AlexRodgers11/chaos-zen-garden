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
import Squares from './Squares';
import Triangles from './Triangles';
import Antlers from './Antlers';
import './Garden.css';
import { v4 as uuidv4 } from 'uuid';

function Garden(){
    let width = useCurrentWidth();
    const [colorPalette, setColorPalette] = useState(palettes[0]);
    const [numRings, setNumRings] = useState(10)
    // const [fullWindowOpen, toggleFullWindowOpen] = useToggle(false);
    const [fullSelectedPiece, setFullSelectedPiece] = useState(null);

    const handleChangePalette = evt => {
        setColorPalette(evt.target.value);
    }

    const handleSetNumRings = num => {
        setNumRings(num)
    }

    const handleToggleWindow = fullWindowPiece => {
        setFullSelectedPiece(fullWindowPiece);
    }



    const displayFullSize = gardenPiece => {
        switch(gardenPiece) {
            case 'snake':
                return <Snake width={width} className="Snake" palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
            case 'dots':
                return <Dots />
            case 'bullseye':
                return <BullsEye />
            case 'message':
                return <Message />
            case 'dominoes':
                return <Dominoes />
            case 'barcode': 
                return <Barcode />
            case 'squares':
                return <Squares />
            case 'triangles':
                return <Triangles />
            case 'antlers':
                return <Antlers />
        }
    }

    if(!fullSelectedPiece) {
        return (
            <div className="Garden">
                <Snake width={width} className="Snake" palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
                <Dots width={width} className="Dots" palette={colorPalette}/>
                <BullsEye width={width} id={1} setNumRings={handleSetNumRings} numRings={numRings} sound={getSound('whoop')} className="BullsEye" orgIndex={numRings + 1} palette={colorPalette}/>
                <Message width={width} className="Message" palette={colorPalette}/>
                <Dominoes width={width} className="Dominoes" palette={colorPalette} />
                <Barcode width={width} className="Barcode" palette={colorPalette}/>
                <Squares width={width} className="Squares" palette={colorPalette} />
                <Triangles width ={width} className="Triangles" palette={colorPalette} />
                <Antlers width ={width} className="Antlers" palette={colorPalette}/>
                <select onChange={handleChangePalette} value={colorPalette}>
                    {palettes.map(palette => {
                        let paletteKey = uuidv4();
                        return <option key={paletteKey} value={palette}>{palette}</option>
                    })}
                </select>
            </div>
        )
    } else {
        return displayFullSize('snake');
    }
}

export default Garden;

