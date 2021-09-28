import React, {useEffect, useRef, useState} from 'react';
import useToggle from './hooks/useToggle';
import { getColor, getSound } from './utils';
import ControlBar from './ControlBar';
import { Howl } from 'howler';

function Cards(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [numCards, setNumRows] = useState(5);
    const [nextIndex, setNextIndex] = useState(0);
    const [colorPalette, setColorPalette] = useState(props.palette);
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('Whoosh'));

    const createStartingCardsArray = num => {
        let cards = [];
        for(let i = 1; i < num * 2 + 1; i++) {
            let multiplier = i < num / 2 ? -1 : 1
            cards.push({
                id: i, 
                color: getColor(i, colorPalette),
                offset: Math.random() * 20 * (i <= num ? 1 : -1)
            })
        }
        return cards
        
    }


    const [cards, setCards] = useState(createStartingCardsArray(numCards));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            if(nextIndex < cards.length){
                setTimeout(() => {
                    organize(nextIndex);
                }, speed);
            } else {
                toggleIsOrganizing();
                toggleIsOrganized();
            }
        } else {firstUpdate.current = false}
    }, [nextIndex])
    
    const colorsFirstUpdate = useRef(true)
    useEffect(() => {
        if(!colorsFirstUpdate.current) {
            let newCards = cards.map(card => {
                return {...card, color: getColor(card.id, props.palette)}
            });
            setColorPalette(props.palette);
            setCards(newCards);
            colorsDoNotUpdate.current = true;
        } else {
            colorsFirstUpdate.current = false;
        }
        
    }, [props.palette]);

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

    const soundPlay = soundObj => {
        const sound = new Howl({
            src: soundObj.src,
            sprite: soundObj.sprite,
            volume: props.volume * .01
        });
        sound.play(soundObj.spriteName);
    }

    const organize = (idx) => {
        if(idx === 0) toggleIsOrganizing();
        let newCards = cards.map(card => {
            if(card.id === cards[idx].id) {
                return {...card, offset: 0}
            } else {
                return card;
            }
        });
        soundPlay(sound);
        setCards(newCards);
        setNextIndex(idx + 1)        
    }

    const scatter = () => {
        let newCards = cards.map(card => {
            return {
                ...card, 
                offset: Math.random() * 20 * (card.id <= numCards ? 1 : -1)
            }
        })
        setCards(newCards);
        toggleIsOrganized();
    }

    const handleSetSpeed = time => {
        setSpeed(time);
    }

    const handleSetSound = sound => {
        setSound(getSound(sound));
    }
    const handleSetNumRows = num => {
        setNumRows(Number(num));
        setCards(createStartingCardsArray(Number(num)))
    }

    const handleSetColorPalette = palette => {
        colorsDoNotUpdate.current = false;
        setColorPalette(palette);
    }

    const handleChangeVolume = volume => {
        props.changeVolume(volume);
    }

    const displayCards = () => {
        let cardLines = []
        let newLine = []
        for(let k = 0; k < cards.length; k++){
            newLine.push(cards[k]);
            if(newLine.length === numCards){
                cardLines.push(newLine);
                newLine = []
            }
        }
        return cardLines;
    }

    const handleToggleWindow = () => {
        if(props.fullWindow) {
            props.toggleWindow(null)
        } else {
            props.toggleWindow('cards');
        }
    }

    return (
        <div style={{margin: props.fullWindow ? '0 auto' : 0, display: 'flex', justifyContent: 'center', organizeItems: 'center', width: `${props.width}px`, height: `${props.width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div style={{position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                        {/* {displayCards().map(cardLine => {
                            // return <div style={{margin: '7% 0'}}>{cardLine.map(card => {
                            return <div style={{position: 'relative', margin: '7% 0', paddingLeft: `${((cards.length / 2) - 1) * 10}px`}}>{cardLine.map(card => {
                                // return <div style={{position: 'relative', zIndex: card.id, right: '10px', display: 'inline-block', backgroundColor:`${card.color}`, border: `1px solid ${getColor('border', colorPalette)}`, width: `${props.width * .70 * (1 / (numCards + 2))}px`, height: `${1.5 * props.width * .70 * (1 / (numCards + 2))}px`, top: card.offset}}></div>
                                return <div style={{position: 'relative', zIndex: card.id, right: `${card.id - (cards.length / 2) <= 0 ? (card.id - 1) * 10 : (card.id - (cards.length / 2) - 1) * 10}px`, display: 'inline-block', backgroundColor:`${card.color}`, border: `1px solid ${getColor('border', colorPalette)}`, width: `${props.width * .70 * (1 / (numCards + 2))}px`, height: `${1.5 * props.width * .70 * (1 / (numCards + 2))}px`, top: card.offset}}></div>
                                // return <div style={{position: 'relative', width: `${props.width * .70 * (1 / (numCards + 2)) * numCards - ((numCards - 1) * 10)}px`}}><div style={{position: 'relative', zIndex: card.id, right: `${card.id - (cards.length / 2) <= 0 ? (card.id - 1) * 10 : (card.id - (cards.length / 2) - 1) * 10}px`, display: 'inline-block', backgroundColor:`${card.color}`, border: `1px solid ${getColor('border', colorPalette)}`, width: `${props.width * .70 * (1 / (numCards + 2))}px`, height: `${1.5 * props.width * .70 * (1 / (numCards + 2))}px`, top: card.offset}}></div></div>
                            })}</div>
                        })} */}
                        {displayCards().map(cardLine => {
                            return <div style={{position: 'relative', margin: '7% 0', paddingLeft: `${((cards.length / 2) - 1) * (.8 * props.width * .70 * (1 / (numCards + 2)))}px`}}>{cardLine.map(card => {
                            // return <div style={{position: 'relative', margin: '7% 0'}}>{cardLine.map(card => {
                            // return <div style={{position: 'relative', margin: '7% 0', width: `${(numCards + 1) * props.width * .70 * (1 / (numCards + 2))}px`}}>{cardLine.map(card => {
                                // return <div style={{position: 'relative', zIndex: card.id, right: `${card.id - (cards.length / 2) <= 0 ? (card.id - 1) * 10 : (card.id - (cards.length / 2) - 1) * 10}px`, display: 'inline-block', backgroundColor:`${card.color}`, border: `1px solid ${getColor('border', colorPalette)}`, width: `${props.width * .70 * (1 / (numCards + 2))}px`, height: `${1.5 * props.width * .70 * (1 / (numCards + 2))}px`, top: card.offset}}></div>
                                return <div style={{position: 'relative', zIndex: card.id,  right: `${card.id - (cards.length / 2) <= 0 ? (card.id - 1) * (.8 * props.width * .70 * (1 / (numCards + 2))) : (card.id - (cards.length / 2) - 1) * (.8 * props.width * .70 * (1 / (numCards + 2)))}px`, display: 'inline-block', backgroundColor:`${card.color}`, border: `1px solid ${getColor('border', colorPalette)}`, width: `${props.width * .70 * (1 / (numCards + 2))}px`, height: `${1.5 * props.width * .70 * (1 / (numCards + 2))}px`, top: card.offset}}></div>
                                // return <div style={{position: 'relative', textAlign: 'left', zIndex: card.id,  display: 'inline-block', backgroundColor:`${card.color}`, border: `1px solid ${getColor('border', colorPalette)}`, width: `${props.width * .70 * (1 / (numCards + 2))}px`, height: `${1.5 * props.width * .70 * (1 / (numCards + 2))}px`, top: card.offset}}></div>
                            })}</div>
                        })}
                </div>
                <ControlBar toggleWindow={handleToggleWindow} fullWindow={props.fullWindow} disableFullWindow={props.disableFullWindow} setModalContent={props.setModalContent} volume={props.volume} changeVolume={handleChangeVolume} palette={colorPalette} setPalette={handleSetColorPalette} minNum={3} maxNum={30} number={numCards} setNumber={handleSetNumRows} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='Ding' organizedFunction={scatter} unorganizedFunction={() => organize(0)} unorgButton='Scatter' orgButton='Organize'/>
            </div>
        </div>
    )
}

export default Cards;