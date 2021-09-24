import React, { useState} from 'react';
import useToggle from './hooks/useToggle';
import Header from './Header';
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
import Pogs from './Pogs';
import Message2 from './Message2';
import Smudges from './Smudges';
import Holes from './Holes';
import Edges from './Edges';
import Crosshair from './Crosshair';
import Tallies from './Tallies';
import Cards from './Cards';
import Desk from './Desk';
import Meters from './Meters'
import './Garden.css';
import { v4 as uuidv4 } from 'uuid';
import { GiJamesBondAperture } from 'react-icons/gi';

function Garden(){
    let width = useCurrentWidth();
    const [colorPalette, setColorPalette] = useState(palettes[0]);
    const [volume, setVolume] = useState(65);
    const [numRings, setNumRings] = useState(10)
    const [bullsEyeShape, setBullsEyeShape] = useState('circle')
    const [fullSelectedPiece, setFullSelectedPiece] = useState(null);

    const handleChangePalette = palette => {
        setColorPalette(palette);
    }

    const handleChangeVolume = volume => {
        setVolume(volume);
    }

    const handleSetNumRings = num => {
        setNumRings(Number(num))
    }
    
    const handleSetShape = shape => {
        setBullsEyeShape(shape)
    }

    const handleToggleWindow = fullWindowPiece => {
        setFullSelectedPiece(fullWindowPiece);
    }



    const displayFullSize = gardenPiece => {
        // let gardenPieceWidth = width * .5
        let gardenPieceWidth;
        let disableFullWindow = false;
        if(width >= 1700) {
            gardenPieceWidth = width * .475;
        } else if(width >= 1200) {
            gardenPieceWidth = width * .5;
        } else if(width >= 900) {
            gardenPieceWidth = width * .75;
        } else if (width < 900 && width > 600) {
            gardenPieceWidth = width
        } 
        switch(gardenPiece) {
            case 'snake':
                return <><Header changePalette={handleChangePalette}/><Snake width={gardenPieceWidth} className="Snake" volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow} /></>
            case 'dots':
                return <><Header changePalette={handleChangePalette}/><Dots width={gardenPieceWidth} className="Dots" volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow} /></>
            case 'bullseye':
                return <><Header changePalette={handleChangePalette}/><BullsEye width={gardenPieceWidth} id={1} setNumRings={handleSetNumRings} numRings={numRings} setShape={handleSetShape} shape={bullsEyeShape} sound="Whoop" className="BullsEye" orgIndex={numRings + 1} volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow} /></>
            case 'message':
                return <><Header changePalette={handleChangePalette}/><Message width={gardenPieceWidth} className="Message" volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/></>
            case 'dominoes':
                return <><Header changePalette={handleChangePalette}/><Dominoes width={gardenPieceWidth} className="Dominoes" volume={volume} changeVolume={handleChangeVolume} palette={colorPalette}  fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/></>
            case 'barcode': 
                return <><Header changePalette={handleChangePalette}/><Barcode width={gardenPieceWidth} className="Barcode" volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/></>
            case 'squares':
                return <><Header changePalette={handleChangePalette}/><Squares width={gardenPieceWidth} className="Squares" volume={volume} changeVolume={handleChangeVolume} palette={colorPalette}  fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/></>
            case 'triangles':
                return <><Header changePalette={handleChangePalette}/><Triangles width={gardenPieceWidth} className="Triangles" volume={volume} changeVolume={handleChangeVolume} palette={colorPalette}  fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/></>
            case 'antlers':
                return <><Header changePalette={handleChangePalette}/><Antlers width={gardenPieceWidth} className="Antlers" volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/></>
            case 'pogs':
                return <><Header changePalette={handleChangePalette}/><Pogs width={gardenPieceWidth} className="Coins" volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/></>
            case 'message2':
                return <><Header changePalette={handleChangePalette}/><Message2 width={gardenPieceWidth} className="Message2" volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/></>
            case 'smudges':
                return <><Header changePalette={handleChangePalette}/><Smudges width={gardenPieceWidth} className="Smudges" volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/></>
            case 'holes':
                return <><Header changePalette={handleChangePalette}/><Holes width={gardenPieceWidth} className="Holes" volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/></>
            case 'edges':
                return <><Header changePalette={handleChangePalette}/><Edges width={gardenPieceWidth} className="Edges" volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/></>
            case 'crosshair':
                return <><Header changePalette={handleChangePalette}/><Crosshair width={gardenPieceWidth} className="Crosshair" volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/></>
            case 'tallies':
                return <><Header changePalette={handleChangePalette}/><Tallies width={gardenPieceWidth} className="Crosshair" volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/></>
            case 'cards':
                return <><Header changePalette={handleChangePalette}/><Cards width={gardenPieceWidth} className="Cards" volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/></>
            case 'desk':
                return <><Header changePalette={handleChangePalette}/><Desk width={gardenPieceWidth} className="Desk" volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/></>
            case 'meters':
                return <><Header changePalette={handleChangePalette}/><Meters width={gardenPieceWidth} className="Meters" volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/></>
        }
    }

    if(!fullSelectedPiece) {
        let gardenPieceWidth;
        let disableFullWindow = false;
        if(width >= 1000) {
            gardenPieceWidth = width / 3;
        } else if (width < 1000 && width > 600) {
            gardenPieceWidth = width / 2;
        } else {
            gardenPieceWidth = width;
            disableFullWindow = true;
        }

        return (
            <>
            <Header changePalette={handleChangePalette}/>
            <div className="Garden">
                <Snake width={gardenPieceWidth} className="Snake" disableFullWindow={disableFullWindow} volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
                <Dots width={gardenPieceWidth} className="Dots" disableFullWindow={disableFullWindow} volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
                <BullsEye width={gardenPieceWidth} id={1} setNumRings={handleSetNumRings} numRings={numRings} setShape={handleSetShape} shape={bullsEyeShape} sound="Whoop" className="BullsEye" disableFullWindow={disableFullWindow} orgIndex={numRings + 1} volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
                <Message width={gardenPieceWidth} className="Message" disableFullWindow={disableFullWindow} volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
                <Dominoes width={gardenPieceWidth} className="Dominoes" disableFullWindow={disableFullWindow} volume={volume} changeVolume={handleChangeVolume} palette={colorPalette}  fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
                <Barcode width={gardenPieceWidth} className="Barcode" disableFullWindow={disableFullWindow} volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
                <Squares width={gardenPieceWidth} className="Squares" disableFullWindow={disableFullWindow} volume={volume} changeVolume={handleChangeVolume} palette={colorPalette}  fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
                <Triangles width={gardenPieceWidth} className="Triangles" disableFullWindow={disableFullWindow} volume={volume} changeVolume={handleChangeVolume} palette={colorPalette}  fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
                <Antlers width={gardenPieceWidth} className="Antlers" disableFullWindow={disableFullWindow} volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
                <Pogs width={gardenPieceWidth} className="Coins" disableFullWindow={disableFullWindow} volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
                <Message2 width={gardenPieceWidth} className="Message2" disableFullWindow={disableFullWindow} volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
                <Smudges width={gardenPieceWidth} className="Smudges" disableFullWindow={disableFullWindow} volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
                <Holes width={gardenPieceWidth} className="Holes" disableFullWindow={disableFullWindow} volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
                <Edges width={gardenPieceWidth} className="Edges" disableFullWindow={disableFullWindow} volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
                <Crosshair width={gardenPieceWidth} className="Crosshair" disableFullWindow={disableFullWindow} volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
                <Tallies width={gardenPieceWidth} className="Tallies" disableFullWindow={disableFullWindow} volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
                <Cards width={gardenPieceWidth} className="Cards" disableFullWindow={disableFullWindow} volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
                <Desk width={gardenPieceWidth} className="Desk" disableFullWindow={disableFullWindow} volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
                <Meters width={gardenPieceWidth} className="Meters" disableFullWindow={disableFullWindow} volume={volume} changeVolume={handleChangeVolume} palette={colorPalette} fullWindow={fullSelectedPiece} toggleWindow={handleToggleWindow}/>
            </div>
            </>
        )
    } else {
        return displayFullSize(fullSelectedPiece);
    }
}

export default Garden;

