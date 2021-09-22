import React, {useEffect, useRef, useState} from 'react';
import useToggle from './hooks/useToggle';
import { getColor, getSound } from './utils';
import ControlBar from './ControlBar';
import { Howl } from 'howler';
import { FaRegKeyboard } from 'react-icons/fa';
import { CgMouse } from 'react-icons/cg'
import { TiPencil } from 'react-icons/ti'
import { RiBallPenFill } from 'react-icons/ri';
import { CgNotes } from 'react-icons/cg';
import { GoCalendar } from 'react-icons/go';

function Desk(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [nextIndex, setNextIndex] = useState(0);
    const [colorPalette, setColorPalette] = useState(props.palette);
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('Ding'));

    const createStartingItemsArray = num => {
        let items = [];
        for(let i = 1; i < num + 1; i++) {
            let multiplier = Math.random() > .5 ? -1 : 1;
            items.push({
                id: i, 
                color: getColor(i, colorPalette),
                tilt: multiplier * 2.5 + multiplier * Math.random() * 17.5
            })
        }
        return items;
        
    }

    const [items, setItems] = useState(createStartingItemsArray(7));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            if(nextIndex < items.length){
                setTimeout(() => {
                    align(nextIndex);
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
            let newItems = items.map(item => {
                return {...item, color: getColor(item.id, props.palette)}
            });
            setColorPalette(props.palette);
            setItems(newItems);
            colorsDoNotUpdate.current = true;
        } else {
            colorsFirstUpdate.current = false;
        }
        
    }, [props.palette]);

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

    const soundPlay = soundObj => {
        const sound = new Howl({
            src: soundObj.src,
            sprite: soundObj.sprite,
            volume: props.volume * .01
        });
        sound.play(soundObj.spriteName);
    }

    const align = (idx) => {
        if(idx === 0) toggleIsOrganizing();
        let newItems = items.map(item => {
            if(item.id === items[idx].id) {
                return {...item, tilt: 0}
            } else {
                return item;
            }
        });
        soundPlay(sound);
        setItems(newItems);
        setNextIndex(idx + 1);
    }

    const shift = () => {
        let newItems = items.map(item => {
            let multiplier = Math.random() > .5 ? -1 : 1;
            return {...item, tilt: multiplier * 2.5 + multiplier * Math.random() * 17.5}
        })
        setItems(newItems);
        toggleIsOrganized();
    }

    const handleSetSpeed = time => {
        setSpeed(time);
    }

    const handleSetSound = sound => {
        setSound(getSound(sound));
    }

    const handleSetColorPalette = palette => {
        colorsDoNotUpdate.current = false;
        setColorPalette(palette);
    }

    const handleChangeVolume = volume => {
        props.changeVolume(volume);
    }

    const handleToggleWindow = () => {
        if(props.fullWindow) {
            props.toggleWindow(null)
        } else {
            props.toggleWindow('desk');
        }
    }

    return (
        <div style={{margin: props.fullWindow ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${props.width}px`, height: `${props.width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
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
                                <div style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '70%', height: '100%', border: '1px solid black', backgroundColor: '#444444', color: items[6].color, transform: `rotate(${items[6].tilt}deg)`}}>
                                    <CgMouse size="70%" /></div>
                                </div>
                        </div>
                    </div>
                </div>
                <ControlBar toggleWindow={handleToggleWindow} fullWindow={props.fullWindow} disableFullWindow={props.disableFullWindow} volume={props.volume} changeVolume={handleChangeVolume} palette={colorPalette} setPalette={handleSetColorPalette} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='Ding' organizedFunction={shift} unorganizedFunction={() => align(0, 'topLeft')} unorgButton='Dull' orgButton='Sharpen'/>
            </div>
        </div>
    )
}

export default Desk;