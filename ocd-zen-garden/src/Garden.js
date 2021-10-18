import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useToggle from './hooks/useToggle';
import Header from './Header';
import Modal from './Modal';
import useCurrentWidth from './hooks/useCurrentWidth';
import useCurrentHeight from './hooks/useCurrentHeight';
import { palettes } from './utils';
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
import Eyes from './Eyes';
import Opaque from './Opaque';
import Diamonds from './Diamonds';
import Rainbow from './Rainbow';
import './Garden.css';
import Asterisk from './Asterisk';


function Garden(props) {
    // let width = useCurrentWidth();
    // const palette = useSelector((state) => state.palette.palette);
    const height = useCurrentHeight();
    const width = useSelector((state) => state.width.appWidth);
    const fullView = useSelector((state) => state.fullView.fullView);
    const organizingCounter = useSelector((state) => state.organizingCounter.organizingCounter);
    const [colorPalette, setColorPalette] = useState(palettes[0]);
    const [volume, setVolume] = useState(65);
    const [numRings, setNumRings] = useState(10)
    const [bullsEyeShape, setBullsEyeShape] = useState('circle')
    const [hideModal, toggleHideModal] = useToggle(false);
    const [modalContent, setModalContent] = useState('epilepsy-warning');
    const [highlightUserIcon, toggleHighlightUserIcon] = useToggle(false);
    const [organizationCount, setOrganizationCount] = useState(0);
    // const [resetTimer, toggleResetTimer] = useToggle(true);

    // const firstButtonCountUpdate = useRef(true);
    // useEffect(() => {
    //     console.log('we may have a problem here')
    //     if(resetTimer) {
    //         console.log('or maybe not')
    //         toggleResetTimer();
    //         setTimeout(() => {
    //             toggleResetTimer();
    //             setOrganizationCount(0);
    //         }, 1800000)
    //     }
    // }, [resetTimer], firstButtonCountUpdate);

    // useEffect(() => {
    //     if (organizationCount > 30){
    //         alert('user may actually have OCD');
    //     }
    // }, [organizationCount])


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

    const handleToggleHighlightUserIcon = () => {
        toggleHighlightUserIcon();
    }

    const handleToggleLoggedIn = () => {
        if(!hideModal) {
            toggleHideModal()
        }
        props.toggleLoggedIn();
    }

    const handleSetModalContent = content => {
        setModalContent(content);
        toggleHideModal();
    }

    const displayFullSize = gardenPiece => {
        let gardenPieceWidth = width > height ? height - 47 : width - 2;

        switch(gardenPiece) {
            case 'snake':
                return <Snake width={gardenPieceWidth} className="Snake" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume} />
            case 'dots':
                return <Dots width={gardenPieceWidth} className="Dots" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume} />
            case 'bullseye':
                return <BullsEye width={gardenPieceWidth} id={1} setNumRings={handleSetNumRings} numRings={numRings} setShape={handleSetShape} shape={bullsEyeShape} sound="Whoop" className="BullsEye" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} orgIndex={numRings + 1} volume={volume} changeVolume={handleChangeVolume} />
            case 'message':
                return <Message width={gardenPieceWidth} className="Message" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume}/>
            case 'dominoes':
                return <Dominoes width={gardenPieceWidth} className="Dominoes" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume} />
            case 'barcode': 
                return <Barcode width={gardenPieceWidth} className="Barcode" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume}/>
            case 'squares':
                return <Squares width={gardenPieceWidth} className="Squares" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume} />
            case 'triangles':
                return <Triangles width={gardenPieceWidth} className="Triangles" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume} />
            case 'antlers':
                return <Antlers width={gardenPieceWidth} className="Antlers" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume}/>
            case 'pogs':
                return <Pogs width={gardenPieceWidth} className="Coins" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume}/>
            case 'message2':
                return <Message2 width={gardenPieceWidth} className="Message2" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume}/>
            case 'smudges':
                return <Smudges width={gardenPieceWidth} className="Smudges" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume}/>
            case 'holes':
                return <Holes width={gardenPieceWidth} className="Holes" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume}/>
            case 'edges':
                return <Edges width={gardenPieceWidth} className="Edges" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume}/>
            case 'crosshair':
                return <Crosshair width={gardenPieceWidth} className="Crosshair" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume}/>
            case 'tallies':
                return <Tallies width={gardenPieceWidth} className="Tallies" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume}/>
            case 'cards':
                return <Cards width={gardenPieceWidth} className="Cards" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume}/>
            case 'desk':
                return <Desk width={gardenPieceWidth} className="Desk" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume}/>
            case 'meters':
                return <Meters width={gardenPieceWidth} className="Meters" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume}/>
            case 'eyes':
                return <Eyes width={gardenPieceWidth} className="Eyes" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume}/>
            case 'opaque':
                return <Opaque width={gardenPieceWidth} className="Opaque" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume}/>
            case 'diamonds':
                return <Diamonds width={gardenPieceWidth} className="Diamonds" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume}/>
            case 'rainbow':
                return <Rainbow width={gardenPieceWidth} className="Rainbow" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume}/>
            case 'asterisk':
                return <Asterisk width={gardenPieceWidth} className="Asterisk" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume}/>
        }
    }


    if(!fullView) {
        let gardenPieceWidth;
        if(width >= 1000) {
            gardenPieceWidth = width / 3;
        } else if (width < 1000 && width > 600) {
            gardenPieceWidth = width / 2;
        } else {
            gardenPieceWidth = width;
        }

        return (
            <>
            <Header changePalette={handleChangePalette} setModalContent={handleSetModalContent} disableDropdowns={!hideModal} loggedIn={props.loggedIn} toggleLoggedIn={props.toggleLoggedIn} highlightUserIcon={highlightUserIcon} />
            <div className="Garden">
                <Snake width={gardenPieceWidth} className="Snake" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume} setModalContent={handleSetModalContent} />
                <Dots width={gardenPieceWidth} className="Dots" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume} setModalContent={handleSetModalContent} />
                <BullsEye width={gardenPieceWidth} id={1} setNumRings={handleSetNumRings} toggleHighlightUserIcon={handleToggleHighlightUserIcon} numRings={numRings} setShape={handleSetShape} shape={bullsEyeShape} sound="Whoop" className="BullsEye" loggedIn={props.loggedIn} orgIndex={numRings + 1} volume={volume} changeVolume={handleChangeVolume} setModalContent={handleSetModalContent} />
                <Message width={gardenPieceWidth} className="Message" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume} setModalContent={handleSetModalContent} />
                <Dominoes width={gardenPieceWidth} className="Dominoes" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume}  setModalContent={handleSetModalContent} />
                <Barcode width={gardenPieceWidth} className="Barcode" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume} setModalContent={handleSetModalContent} />
                <Squares width={gardenPieceWidth} className="Squares" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume}  setModalContent={handleSetModalContent} />
                <Triangles width={gardenPieceWidth} className="Triangles" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume}  setModalContent={handleSetModalContent} />
                <Antlers width={gardenPieceWidth} className="Antlers" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume} setModalContent={handleSetModalContent} />
                <Pogs width={gardenPieceWidth} className="Coins" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume} setModalContent={handleSetModalContent} />
                <Message2 width={gardenPieceWidth} className="Message2" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume} setModalContent={handleSetModalContent} />
                <Smudges width={gardenPieceWidth} className="Smudges" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume} setModalContent={handleSetModalContent} />
                <Holes width={gardenPieceWidth} className="Holes" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume} setModalContent={handleSetModalContent} />
                <Edges width={gardenPieceWidth} className="Edges" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume} setModalContent={handleSetModalContent} />
                <Crosshair width={gardenPieceWidth} className="Crosshair" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume} setModalContent={handleSetModalContent} />
                <Tallies width={gardenPieceWidth} className="Tallies" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume} setModalContent={handleSetModalContent} />
                <Cards width={gardenPieceWidth} className="Cards" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume} setModalContent={handleSetModalContent} />
                <Desk width={gardenPieceWidth} className="Desk" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume} setModalContent={handleSetModalContent} />
                <Meters width={gardenPieceWidth} className="Meters" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume} setModalContent={handleSetModalContent} />
                <Eyes width={gardenPieceWidth} className="Eyes" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume} setModalContent={handleSetModalContent} />
                <Opaque width={gardenPieceWidth} className="Opaque" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume} setModalContent={handleSetModalContent} />
                <Diamonds width={gardenPieceWidth} className="Diamonds" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume} setModalContent={handleSetModalContent} />
                <Rainbow width={gardenPieceWidth} className="Rainbow" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume} setModalContent={handleSetModalContent} />
                <Asterisk width={gardenPieceWidth} className="Asterisk" loggedIn={props.loggedIn} toggleHighlightUserIcon={handleToggleHighlightUserIcon} volume={volume} changeVolume={handleChangeVolume} setModalContent={handleSetModalContent} />
                {!hideModal ? 
                    <Modal content={modalContent} height={height} toggleHideModal={toggleHideModal} hidden={hideModal} loggedIn={props.loggedIn} toggleLoggedIn={handleToggleLoggedIn}>
                    </Modal> 
                    : null
                }
            </div>
            </>
        )
    } else {
        return (
            <div style={{width: '100vw', height: `${height}px`}}>
                <div style={{position: 'fixed', zIndex: '3'}}>
                <Header loggedIn={props.loggedIn} toggleLoggedIn={props.toggleLoggedIn} highlightUserIcon={highlightUserIcon} changePalette={handleChangePalette} setModalContent={handleSetModalContent} />
                </div>
            

            <div className="pieceContainer" style={{display: 'grid', height: `${height - 45}px`, width: '100%', gridTemplateRows: `${width <= height - 45 ? `auto ${width}px auto` : '1fr'}`, gridTemplateColumns: `${width > height - 45 ? `auto ${height - 45}px auto` : '1fr'}`}}>
                <div style={{backgroundColor: 'black', height: '100%', width:'auto'}}></div>
                <div style={{backgroundColor: 'black', height: '100%', width:'auto'}}>
                    {displayFullSize(fullView)}
                </div>
                <div style={{backgroundColor: 'black', height: '100%', width:'auto'}}></div>
            </div>
            
            </div>
        )
        
    }
}

export default Garden;

