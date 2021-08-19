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
                return <Snake width={width} className="Snake" palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow} />
            case 'dots':
                return <Dots width={width} className="Dots" palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow} />
            case 'bullseye':
                return <BullsEye width={width} id={1} setNumRings={handleSetNumRings} numRings={numRings} sound={getSound('whoop')} className="BullsEye" orgIndex={numRings + 1} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow} />
            case 'message':
                return <Message width={width} className="Message" palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
            case 'dominoes':
                return <Dominoes width={width} className="Dominoes" palette={colorPalette}  fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
            case 'barcode': 
                return <Barcode width={width} className="Barcode" palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
            case 'squares':
                return <Squares width={width} className="Squares" palette={colorPalette}  fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
            case 'triangles':
                return <Triangles width={width} className="Triangles" palette={colorPalette}  fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
            case 'antlers':
                return <Antlers width={width} className="Antlers" palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
        }
    }

    if(!fullSelectedPiece) {
        return (
            <div className="Garden">
                <Snake width={width} className="Snake" palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
                <Dots width={width} className="Dots" palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
                <BullsEye width={width} id={1} setNumRings={handleSetNumRings} numRings={numRings} sound={getSound('whoop')} className="BullsEye" orgIndex={numRings + 1} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
                <Message width={width} className="Message" palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
                <Dominoes width={width} className="Dominoes" palette={colorPalette}  fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
                <Barcode width={width} className="Barcode" palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
                <Squares width={width} className="Squares" palette={colorPalette}  fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
                <Triangles width={width} className="Triangles" palette={colorPalette}  fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
                <Antlers width={width} className="Antlers" palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
                <select onChange={handleChangePalette} value={colorPalette}>
                    {palettes.map(palette => {
                        let paletteKey = uuidv4();
                        return <option key={paletteKey} value={palette}>{palette}</option>
                    })}
                </select>
            </div>
        )
    } else {
        return displayFullSize(fullSelectedPiece);
    }
}

export default Garden;

