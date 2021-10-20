import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import Modal from './Modal';
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
    const height = useSelector((state) => state.size.height);
    const width = useSelector((state) => state.size.appWidth);
    const fullView = useSelector((state) => state.size.fullView);
    const modalContent = useSelector((state) => state.modalContent.modalContent);
    const [numRings, setNumRings] = useState(10)
    const [bullsEyeShape, setBullsEyeShape] = useState('circle')
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
    
    const handleSetNumRings = num => {
        setNumRings(Number(num))
    }
    
    const handleSetShape = shape => {
        setBullsEyeShape(shape)
    }

    const displayFullSize = gardenPiece => {
        // let gardenPieceWidth = width > height ? height - 47 : width - 2;
        switch(gardenPiece) {
            case 'snake':
                return <Snake className="Snake" />
            case 'dots':
                return <Dots className="Dots" />
            case 'bullseye':
                return <BullsEye id={1} setNumRings={handleSetNumRings} numRings={numRings} setShape={handleSetShape} shape={bullsEyeShape} sound="Whoop" className="BullsEye" orgIndex={numRings + 1} />
            case 'message':
                return <Message className="Message"/>
            case 'dominoes':
                return <Dominoes className="Dominoes" />
            case 'barcode': 
                return <Barcode className="Barcode"/>
            case 'squares':
                return <Squares className="Squares" />
            case 'triangles':
                return <Triangles className="Triangles" />
            case 'antlers':
                return <Antlers className="Antlers"/>
            case 'pogs':
                return <Pogs className="Coins"/>
            case 'message2':
                return <Message2 className="Message2"/>
            case 'smudges':
                return <Smudges className="Smudges"/>
            case 'holes':
                return <Holes className="Holes"/>
            case 'edges':
                return <Edges className="Edges"/>
            case 'crosshair':
                return <Crosshair className="Crosshair"/>
            case 'tallies':
                return <Tallies className="Tallies"/>
            case 'cards':
                return <Cards className="Cards"/>
            case 'desk':
                return <Desk className="Desk"/>
            case 'meters':
                return <Meters className="Meters"/>
            case 'eyes':
                return <Eyes className="Eyes"/>
            case 'opaque':
                return <Opaque className="Opaque"/>
            case 'diamonds':
                return <Diamonds className="Diamonds"/>
            case 'rainbow':
                return <Rainbow className="Rainbow"/>
            case 'asterisk':
                return <Asterisk className="Asterisk"/>
        }
    }


    if(!fullView) {
        return (
            <>
            <Header />
            <div className="Garden">
                <Snake className="Snake" />
                <Dots className="Dots" />
                <BullsEye id={1} setNumRings={handleSetNumRings} numRings={numRings} setShape={handleSetShape} shape={bullsEyeShape} sound="Whoop" className="BullsEye" orgIndex={numRings + 1} />
                <Message className="Message" />
                <Dominoes className="Dominoes"  />
                <Barcode className="Barcode" />
                <Squares className="Squares"  />
                <Triangles className="Triangles"  />
                <Antlers className="Antlers" />
                <Pogs className="Coins" />
                <Message2 className="Message2" />
                <Smudges className="Smudges" />
                <Holes className="Holes" />
                <Edges className="Edges" />
                <Crosshair className="Crosshair" />
                <Tallies className="Tallies" />
                <Cards className="Cards" />
                <Desk className="Desk" />
                <Meters className="Meters" />
                <Eyes className="Eyes" />
                <Opaque className="Opaque" />
                <Diamonds className="Diamonds" />
                <Rainbow className="Rainbow" />
                <Asterisk className="Asterisk" />
                {modalContent ? 
                    <Modal height={height}>
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
                <Header toggleLoggedIn={props.toggleLoggedIn} changePalette={handleChangePalette} />
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

