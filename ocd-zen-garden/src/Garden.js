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
    const volume = useSelector((state) => state.volume.volume);
    const [colorPalette, setColorPalette] = useState(palettes[0]);
    // const [volume, setVolume] = useState(65);
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
    
    const handleSetNumRings = num => {
        setNumRings(Number(num))
    }
    
    const handleSetShape = shape => {
        setBullsEyeShape(shape)
    }

    const handleToggleHighlightUserIcon = () => {
        toggleHighlightUserIcon();
    }

    const handleSetModalContent = content => {
        setModalContent(content);
        toggleHideModal();
    }

    const displayFullSize = gardenPiece => {
        let gardenPieceWidth = width > height ? height - 47 : width - 2;

        switch(gardenPiece) {
            case 'snake':
                return <Snake width={gardenPieceWidth} className="Snake" toggleHighlightUserIcon={handleToggleHighlightUserIcon} />
            case 'dots':
                return <Dots width={gardenPieceWidth} className="Dots" toggleHighlightUserIcon={handleToggleHighlightUserIcon} />
            case 'bullseye':
                return <BullsEye width={gardenPieceWidth} id={1} setNumRings={handleSetNumRings} numRings={numRings} setShape={handleSetShape} shape={bullsEyeShape} sound="Whoop" className="BullsEye" toggleHighlightUserIcon={handleToggleHighlightUserIcon} orgIndex={numRings + 1} />
            case 'message':
                return <Message width={gardenPieceWidth} className="Message" toggleHighlightUserIcon={handleToggleHighlightUserIcon}/>
            case 'dominoes':
                return <Dominoes width={gardenPieceWidth} className="Dominoes" toggleHighlightUserIcon={handleToggleHighlightUserIcon} />
            case 'barcode': 
                return <Barcode width={gardenPieceWidth} className="Barcode" toggleHighlightUserIcon={handleToggleHighlightUserIcon}/>
            case 'squares':
                return <Squares width={gardenPieceWidth} className="Squares" toggleHighlightUserIcon={handleToggleHighlightUserIcon} />
            case 'triangles':
                return <Triangles width={gardenPieceWidth} className="Triangles" toggleHighlightUserIcon={handleToggleHighlightUserIcon} />
            case 'antlers':
                return <Antlers width={gardenPieceWidth} className="Antlers" toggleHighlightUserIcon={handleToggleHighlightUserIcon}/>
            case 'pogs':
                return <Pogs width={gardenPieceWidth} className="Coins" toggleHighlightUserIcon={handleToggleHighlightUserIcon}/>
            case 'message2':
                return <Message2 width={gardenPieceWidth} className="Message2" toggleHighlightUserIcon={handleToggleHighlightUserIcon}/>
            case 'smudges':
                return <Smudges width={gardenPieceWidth} className="Smudges" toggleHighlightUserIcon={handleToggleHighlightUserIcon}/>
            case 'holes':
                return <Holes width={gardenPieceWidth} className="Holes" toggleHighlightUserIcon={handleToggleHighlightUserIcon}/>
            case 'edges':
                return <Edges width={gardenPieceWidth} className="Edges" toggleHighlightUserIcon={handleToggleHighlightUserIcon}/>
            case 'crosshair':
                return <Crosshair width={gardenPieceWidth} className="Crosshair" toggleHighlightUserIcon={handleToggleHighlightUserIcon}/>
            case 'tallies':
                return <Tallies width={gardenPieceWidth} className="Tallies" toggleHighlightUserIcon={handleToggleHighlightUserIcon}/>
            case 'cards':
                return <Cards width={gardenPieceWidth} className="Cards" toggleHighlightUserIcon={handleToggleHighlightUserIcon}/>
            case 'desk':
                return <Desk width={gardenPieceWidth} className="Desk" toggleHighlightUserIcon={handleToggleHighlightUserIcon}/>
            case 'meters':
                return <Meters width={gardenPieceWidth} className="Meters" toggleHighlightUserIcon={handleToggleHighlightUserIcon}/>
            case 'eyes':
                return <Eyes width={gardenPieceWidth} className="Eyes" toggleHighlightUserIcon={handleToggleHighlightUserIcon}/>
            case 'opaque':
                return <Opaque width={gardenPieceWidth} className="Opaque" toggleHighlightUserIcon={handleToggleHighlightUserIcon}/>
            case 'diamonds':
                return <Diamonds width={gardenPieceWidth} className="Diamonds" toggleHighlightUserIcon={handleToggleHighlightUserIcon}/>
            case 'rainbow':
                return <Rainbow width={gardenPieceWidth} className="Rainbow" toggleHighlightUserIcon={handleToggleHighlightUserIcon}/>
            case 'asterisk':
                return <Asterisk width={gardenPieceWidth} className="Asterisk" toggleHighlightUserIcon={handleToggleHighlightUserIcon}/>
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
            <Header changePalette={handleChangePalette} setModalContent={handleSetModalContent} disableDropdowns={!hideModal} toggleLoggedIn={props.toggleLoggedIn} highlightUserIcon={highlightUserIcon} />
            <div className="Garden">
                <Snake width={gardenPieceWidth} className="Snake" toggleHighlightUserIcon={handleToggleHighlightUserIcon} setModalContent={handleSetModalContent} />
                <Dots width={gardenPieceWidth} className="Dots" toggleHighlightUserIcon={handleToggleHighlightUserIcon} setModalContent={handleSetModalContent} />
                <BullsEye width={gardenPieceWidth} id={1} setNumRings={handleSetNumRings} toggleHighlightUserIcon={handleToggleHighlightUserIcon} numRings={numRings} setShape={handleSetShape} shape={bullsEyeShape} sound="Whoop" className="BullsEye" orgIndex={numRings + 1} setModalContent={handleSetModalContent} />
                <Message width={gardenPieceWidth} className="Message" toggleHighlightUserIcon={handleToggleHighlightUserIcon} setModalContent={handleSetModalContent} />
                <Dominoes width={gardenPieceWidth} className="Dominoes" toggleHighlightUserIcon={handleToggleHighlightUserIcon}  setModalContent={handleSetModalContent} />
                <Barcode width={gardenPieceWidth} className="Barcode" toggleHighlightUserIcon={handleToggleHighlightUserIcon} setModalContent={handleSetModalContent} />
                <Squares width={gardenPieceWidth} className="Squares" toggleHighlightUserIcon={handleToggleHighlightUserIcon}  setModalContent={handleSetModalContent} />
                <Triangles width={gardenPieceWidth} className="Triangles" toggleHighlightUserIcon={handleToggleHighlightUserIcon}  setModalContent={handleSetModalContent} />
                <Antlers width={gardenPieceWidth} className="Antlers" toggleHighlightUserIcon={handleToggleHighlightUserIcon} setModalContent={handleSetModalContent} />
                <Pogs width={gardenPieceWidth} className="Coins" toggleHighlightUserIcon={handleToggleHighlightUserIcon} setModalContent={handleSetModalContent} />
                <Message2 width={gardenPieceWidth} className="Message2" toggleHighlightUserIcon={handleToggleHighlightUserIcon} setModalContent={handleSetModalContent} />
                <Smudges width={gardenPieceWidth} className="Smudges" toggleHighlightUserIcon={handleToggleHighlightUserIcon} setModalContent={handleSetModalContent} />
                <Holes width={gardenPieceWidth} className="Holes" toggleHighlightUserIcon={handleToggleHighlightUserIcon} setModalContent={handleSetModalContent} />
                <Edges width={gardenPieceWidth} className="Edges" toggleHighlightUserIcon={handleToggleHighlightUserIcon} setModalContent={handleSetModalContent} />
                <Crosshair width={gardenPieceWidth} className="Crosshair" toggleHighlightUserIcon={handleToggleHighlightUserIcon} setModalContent={handleSetModalContent} />
                <Tallies width={gardenPieceWidth} className="Tallies" toggleHighlightUserIcon={handleToggleHighlightUserIcon} setModalContent={handleSetModalContent} />
                <Cards width={gardenPieceWidth} className="Cards" toggleHighlightUserIcon={handleToggleHighlightUserIcon} setModalContent={handleSetModalContent} />
                <Desk width={gardenPieceWidth} className="Desk" toggleHighlightUserIcon={handleToggleHighlightUserIcon} setModalContent={handleSetModalContent} />
                <Meters width={gardenPieceWidth} className="Meters" toggleHighlightUserIcon={handleToggleHighlightUserIcon} setModalContent={handleSetModalContent} />
                <Eyes width={gardenPieceWidth} className="Eyes" toggleHighlightUserIcon={handleToggleHighlightUserIcon} setModalContent={handleSetModalContent} />
                <Opaque width={gardenPieceWidth} className="Opaque" toggleHighlightUserIcon={handleToggleHighlightUserIcon} setModalContent={handleSetModalContent} />
                <Diamonds width={gardenPieceWidth} className="Diamonds" toggleHighlightUserIcon={handleToggleHighlightUserIcon} setModalContent={handleSetModalContent} />
                <Rainbow width={gardenPieceWidth} className="Rainbow" toggleHighlightUserIcon={handleToggleHighlightUserIcon} setModalContent={handleSetModalContent} />
                <Asterisk width={gardenPieceWidth} className="Asterisk" toggleHighlightUserIcon={handleToggleHighlightUserIcon} setModalContent={handleSetModalContent} />
                {!hideModal ? 
                    <Modal content={modalContent} height={height} toggleHideModal={toggleHideModal} hidden={hideModal}>
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
                <Header toggleLoggedIn={props.toggleLoggedIn} highlightUserIcon={highlightUserIcon} changePalette={handleChangePalette} setModalContent={handleSetModalContent} />
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

