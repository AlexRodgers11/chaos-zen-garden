import React, {useEffect, useRef, useState} from 'react';
import { useSelector } from 'react-redux';
import useGardenSpecs from './hooks/useGardenSpecs';
import usePieceSpecs from './hooks/usePieceSpecs';
import { sizeActions } from './store/size';
import { organizingCounterActions } from './store/organizing-counter';
import { v4 as uuidv4 } from 'uuid';
import { getColor, scaler, soundPlay } from './utils';
import ControlBar from './ControlBar';

function Cards(props) {
    const palette = useSelector((state) => state.palette.palette);
    const [colorPalette, setColorPalette] = useState(palette);
    const [width, volume, fullView, dispatch] = useGardenSpecs();
    const pieceSpecs = usePieceSpecs(0, props.number, props.proportionalVolume, props.shape, props.sound, props.speed, props.text);

    const createStartingCardsArray = num => {
        let cards = [];
        for(let i = 1; i < num * 2 + 1; i++) {
            let random = (5 + Math.random() * 15) * (i <= num ? 1 : -1) 
            cards.push({
                id: i, 
                color: getColor(i, colorPalette),
                offset: random,
                volumeMultiplier: scaler(5, 20, .0035, .01, Math.abs(random)),
                key: uuidv4()
            })
        }
        return cards
        
    }

    const [cards, setCards] = useState(createStartingCardsArray(pieceSpecs.number));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            if(pieceSpecs.nextIndex < cards.length){
                setTimeout(() => {
                    organize(pieceSpecs.nextIndex);
                }, pieceSpecs.speed);
            } else {
                pieceSpecs.toggleIsOrganizing();
                pieceSpecs.toggleIsOrganized();
                dispatch(organizingCounterActions.decrementOrganizingCounter());
            }
        } else {firstUpdate.current = false}
    }, [pieceSpecs.nextIndex])
    
    const colorsFirstUpdate = useRef(true)
    useEffect(() => {
        if(!colorsFirstUpdate.current) {
            let newCards = cards.map(card => {
                return {...card, color: getColor(card.id, palette)}
            });
            setColorPalette(palette);
            setCards(newCards);
            colorsDoNotUpdate.current = true;
        } else {
            colorsFirstUpdate.current = false;
        }
        
    }, [palette]);

    const colorsDoNotUpdate = useRef(true)
    useEffect(() => {
        if(!colorsDoNotUpdate.current) {
            let newCards = cards.map(card => {
                return {...card, color: getColor(card.id, colorPalette)}
            });
            setCards(newCards);
        } else {
            colorsDoNotUpdate.current = false;
        }
        
    }, [colorPalette]);

    const organize = (idx) => {
        if(idx === 0) {
            pieceSpecs.toggleIsOrganizing();
            dispatch(organizingCounterActions.incrementOrganizingCounter()) 
        }
        let newCards = cards.map(card => {
            if(card.id === cards[idx].id) {
                return {...card, offset: 0}
            } else {
                return card;
            }
        });
        soundPlay(pieceSpecs.soundObj, cards[idx].volumeMultiplier, volume, pieceSpecs.proportionalVolume);
        setCards(newCards);
        pieceSpecs.setNextIndex(idx + 1)        
    }

    const scatter = () => {
        let newCards = cards.map(card => {
            let random = (5 + Math.random() * 15) * (card.id <= pieceSpecs.number ? 1 : -1)
            return {
                ...card, 
                offset: random,
                volumeMultiplier: scaler(5, 20, .0035, .01, Math.abs(random))
            }
        })
        setCards(newCards);
        pieceSpecs.toggleIsOrganized();
    }

    const handleSetNumCards = num => {
        pieceSpecs.setNumber(Number(num));
        setCards(createStartingCardsArray(Number(num)))
    }

    const handleSetColorPalette = palette => {
        colorsDoNotUpdate.current = false;
        setColorPalette(palette);
    } 

    const displayCards = () => {
        let cardLines = []
        let newLine = []
        for(let k = 0; k < cards.length; k++){
            newLine.push(cards[k]);
            if(newLine.length === pieceSpecs.number){
                cardLines.push(newLine);
                newLine = []
            }
        }
        return cardLines;
    }

    const handleToggleFullView = () => {
        dispatch(sizeActions.setFullView(
            [
                props.id, {
                    type: 'cards',
                    palette: palette,
                    speed: pieceSpecs.speed,
                    sound: pieceSpecs.soundName,
                    proportionalVolume:pieceSpecs. proportionalVolume,
                    number: pieceSpecs.number,
                    shape: pieceSpecs.shape ,
                    text: pieceSpecs.text
                }
            ]
        ));
    }

    return (
        <div style={{margin: fullView ? '0 auto' : 0, display: 'flex', justifyContent: 'center', organizeItems: 'center', width: `${width}px`, height: `${width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div style={{position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                        {displayCards().map(cardLine => {
                            let lineKey = uuidv4()
                            return <div key={lineKey} style={{position: 'relative', margin: '7% 0', paddingLeft: `${((cards.length / 2) - 1) * (.8 * width * .70 * (1 / (pieceSpecs.number + 2)))}px`}}>{cardLine.map(card => {
                                return <div key={card.key} style={{position: 'relative', zIndex: card.id,  right: `${card.id - (cards.length / 2) <= 0 ? (card.id - 1) * (.8 * width * .70 * (1 / (pieceSpecs.number + 2))) : (card.id - (cards.length / 2) - 1) * (.8 * width * .70 * (1 / (pieceSpecs.number + 2)))}px`, display: 'inline-block', backgroundColor:`${card.color}`, border: `1px solid ${getColor('border', colorPalette)}`, width: `${width * .70 * (1 / (pieceSpecs.number + 2))}px`, height: `${1.5 * width * .70 * (1 / (pieceSpecs.number + 2))}px`, top: card.offset}}></div>
                            })}</div>
                        })}
                </div>
                <ControlBar id={props.id} toggleFullView={handleToggleFullView} changeProportionalVolume={pieceSpecs.setProportionalVolume} proportionalVolume={pieceSpecs.proportionalVolume} palette={colorPalette} setPalette={handleSetColorPalette} minNum={3} maxNum={30} number={pieceSpecs.number} setNumber={handleSetNumCards} isOrganizing={pieceSpecs.isOrganizing} isOrganized={pieceSpecs.isOrganized} setSpeed={pieceSpecs.setSpeed} setSound={pieceSpecs.setSound} soundValue='Ding' organizedFunction={scatter} unorganizedFunction={() => organize(0)} unorgButton='Scatter' orgButton='Organize'/>
            </div>
        </div>
    )
}

export default Cards;