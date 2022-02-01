import React, {useEffect, useRef, useState} from 'react';
import { useSelector } from 'react-redux';
import useGardenSpecs from './hooks/useGardenSpecs';
import usePieceSpecs from './hooks/usePieceSpecs';
import { sizeActions } from './store/size';
import { organizingCounterActions } from './store/organizing-counter';
import { getColor, scaler,soundPlay } from './utils';
import ControlBar from './ControlBar/ControlBar';
import { FaRegKeyboard } from 'react-icons/fa';
import { CgMouse } from 'react-icons/cg'
import { TiPencil } from 'react-icons/ti'
import { RiBallPenFill } from 'react-icons/ri';
import { CgNotes } from 'react-icons/cg';
import { GoCalendar } from 'react-icons/go';

function Desk(props) {
    const palette = useSelector((state) => state.palette.palette);
    const [colorPalette, setColorPalette] = useState(palette);
    const [width, volume, fullView, dispatch] = useGardenSpecs();
    const pieceSpecs = usePieceSpecs(0, props.number, props.proportionalVolume, props.shape, props.sound, props.speed, props.text);

    const createStartingItemsArray = num => {
        let items = [];
        for(let i = 1; i < num + 1; i++) {
            let random = 2.5 + Math.random() * 17.5;
            items.push({
                id: i, 
                color: getColor(i, colorPalette),
                tilt: random * (Math.random() > .5 ? 1 : -1),
                volumeMultiplier: scaler(2.5, 20, .002, .01, random)
            })
        }
        return items;
        
    }

    const [items, setItems] = useState(createStartingItemsArray(8));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            if(pieceSpecs.nextIndex < items.length){
                setTimeout(() => {
                    align(pieceSpecs.nextIndex);
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
            let newItems = items.map(item => {
                return {...item, color: getColor(item.id, palette)}
            });
            setColorPalette(palette);
            setItems(newItems);
            colorsDoNotUpdate.current = true;
        } else {
            colorsFirstUpdate.current = false;
        }
        
    }, [palette]);

    const colorsDoNotUpdate = useRef(true)
    useEffect(() => {
        if(!colorsDoNotUpdate.current) {
            let newItems = items.map(item => {
                return {...item, color: getColor(item.id, colorPalette)}
            });
            setItems(newItems);
        } else {
            colorsDoNotUpdate.current = false;
        }
        
    }, [colorPalette]);

    const align = (idx) => {
        if(idx === 0) {
            pieceSpecs.toggleIsOrganizing();
            dispatch(organizingCounterActions.incrementOrganizingCounter())
        }
        let newItems = items.map(item => {
            if(item.id === items[idx].id) {
                return {...item, tilt: 0}
            } else {
                return item;
            }
        });
        soundPlay(pieceSpecs.soundObj, items[idx].volumeMultiplier, volume, pieceSpecs.proportionalVolume);
        setItems(newItems);
        pieceSpecs.setNextIndex(idx + 1);
    }

    const shift = () => {
        let newItems = items.map(item => {
            let random = 2.5 + Math.random() * 17.5;
            return {
                ...item, 
                tilt: random * (Math.random() > .5 ? 1 : -1),
                volumeMultiplier: scaler(2.5, 20, .002, .01, random)
            }
        })
        setItems(newItems);
        pieceSpecs.toggleIsOrganized();
    }

    const handleSetColorPalette = palette => {
        colorsDoNotUpdate.current = false;
        setColorPalette(palette);
    }

    const handleToggleFullView = () => {
        dispatch(sizeActions.setFullView(
            [
                props.id, {
                    type: 'desk',
                    palette: palette,
                    speed: pieceSpecs.speed,
                    sound: pieceSpecs.soundName,
                    proportionalVolume: pieceSpecs.proportionalVolume,
                    number: pieceSpecs.number,
                    shape: pieceSpecs.shape ,
                    text: pieceSpecs.text
                }
            ]
        ));
    }

    return (
        <div style={{margin: fullView ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${width}px`, height: `${width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                    <div style={{width: '70%', height: '70%', border: '3px solid black', backgroundColor: '#303030'}}>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between',width: '100%', height: '40%'}}>
                            <div style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: "35%", height: '85%', color: items[0].color, transform: `rotate(${items[0].tilt}deg)`}}><CgNotes size="100%" /></div>
                            <div style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: "40%", height: '100%', color: items[1].color, transform: `rotate(${items[1].tilt}deg)`}}><GoCalendar size="100%" /></div>
                        </div>
                        <div style={{width: '100%', height: '10%', transform: `rotate(${items[2].tilt}deg)`}}>
                            <div style={{position: 'relative', zIndex: '2', width: '60%', height: '50%', border: '2px solid black', margin: '0 auto', backgroundColor: items[2].color, boxShadow: '0em .65em 1em 0em rgba(250,250,250,0.9)'}}></div>
                            <div style={{display: 'inline-block', width: '17%', height: '25%', border: '1px solid black', backgroundColor: items[2].color, transform: 'rotate(-39deg)'}}></div>
                            <div style={{display: 'inline-block', width: '17%', height: '25%', border: '1px solid black', backgroundColor: items[2].color, transform: 'rotate(39deg)'}}></div>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between',width: '100%', height: '50%'}}>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '30%', height: '100%'}}>
                                <div style={{position: 'relative', left: '10%', display: 'inline-flex', alignItems: 'center', justifyContent: 'start', width: "70%", height: '80%', transform: 'rotate(-45deg)', color: items[3].color, transform: `rotate(${-45 + items[3].tilt}deg)`}}><TiPencil size="100%" /></div>
                                <div style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: "70%", height: '80%', transform: 'rotate(-45deg)', color: items[4].color, transform: `rotate(${-45 + items[4].tilt}deg)`}}><RiBallPenFill size="100%" /></div>
                            </div>
                            <div style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: "40%", height: '70%', color: items[5].color, transform: `rotate(${items[5].tilt}deg)`}}><FaRegKeyboard size="100%" /></div>
                            <div style={{width: "30%", height: '40%'}}>
                                <div style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '70%', height: '100%', border: '1px solid black', backgroundColor: items[6].color, color: items[7].color, transform: `rotate(${items[6].tilt}deg)`}}>
                                    <div style={{width: '70%', height: '70%', transform: `rotate(${items[7].tilt}deg)`}}><CgMouse size="100%" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ControlBar id={props.id} toggleFullView={handleToggleFullView} changeProportionalVolume={pieceSpecs.setProportionalVolume} proportionalVolume={pieceSpecs.proportionalVolume} palette={colorPalette} setPalette={handleSetColorPalette} isOrganizing={pieceSpecs.isOrganizing} isOrganized={pieceSpecs.isOrganized} setSpeed={pieceSpecs.setSpeed} setSound={pieceSpecs.setSound} soundValue='Ding' organizedFunction={shift} unorganizedFunction={() => align(0)} unorgButton='Shift' orgButton='Align'/>
            </div>
        </div>
    )
}

export default Desk;