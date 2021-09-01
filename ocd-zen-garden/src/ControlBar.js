import React, { useState, useRef, useEffect } from 'react';
import useToggle from './hooks/useToggle';
import { palettes, sounds, getColor } from './utils';
import { FaExpandAlt, FaVolumeMute, FaVolumeUp } from 'react-icons/fa/';
import { GrContract } from 'react-icons/gr/';
import { GiConsoleController, GiHamburgerMenu, GiRabbit, GiTortoise } from 'react-icons/gi/';
import { IoIosColorPalette, IoSpeedometerSharp } from 'react-icons/io/';
import { GoBell } from 'react-icons/go/';
import { SiAddthis } from 'react-icons/si';
import { ImSortNumbericDesc, ImShrink2 } from 'react-icons/im';
import { BsFileText } from 'react-icons/bs';

import './ControlBar.css';


function ControlBar(props) {
    const [speed, setSpeed] = useState(1000);
    const [text, setText] = useState(props.textValue || null);
    const [sound, setSound] = useState(props.soundValue || null);
    const [number, setNumber] = useState(props.number);
    const [palette, setPalette] = useState(props.palette);
    const [hidden, toggleHidden] = useToggle(true);
    const [showPopup, setShowPopup] = useState(
        {
            palette: false,
            speed: false,
            sound: false,
            number: false,
            text: false
        }
    )

    const colorFirstUpdate = useRef(true);
    useEffect(() => {
        if(!colorFirstUpdate.current) {
            setPalette(props.palette);
        } else {
            colorFirstUpdate.current = false;
        }
    }, [props.palette]);
     
    // const handleSpeedChange = evt => {
    //     setSpeed(evt.target.value);
    //     props.setSpeed(evt.target.value);
    // }
    const handleSpeedChange = speed => {
        console.log('handleSpeedChange ran')
        handleTogglePopup('speed');
        setSpeed(speed);
        props.setSpeed(speed);
    }

    const handleChangeText = evt => {
        setText(evt.target.value);
        props.changeText(evt.target.value);
    }

    const handleSoundChange = sound => {
        handleTogglePopup('sound')
        setSound(sound);
        props.setSound(sound);
    }
    
    const handleNumberChange = number => {
        handleTogglePopup('number');
        setNumber(number);
        props.setNumber(number);
    }

    const handlePaletteChange = palette => {
        handleTogglePopup('palette');
        setPalette(palette);
        props.setPalette(palette);
    }

    const displayNumberOptions = (min = 3, max = 10) => {
        let numArr = [];
        for(let i = min; i <= max; i++) {
            numArr.push(i);
        }
        return numArr;
    }

    // const handleCloseDropdown = evt => {
    //     setShowDropdown({[evt.target.id]: false});
    // }

    // const handleShowDropdown = evt => {
    //     // console.log(evt)
    //     setShowDropdown({[evt.target.parentElement.id]: true});
    //     // setShowDropdown({[evt.target.id]: true});
    // }

    const handleTogglePopup = group => {
        setShowPopup({...showPopup, [group]: !showPopup[group]});
    }

    return (
        <div className="ControlBar">
        <div style={{marginBottom: '0.5em'}}>
            <span>
                <button style={{backgroundColor: '#303030', padding: '.35em .55em', color: getColor('aux1', palette), fontWeight: '800'}} disabled={props.isOrganizing} onClick={props.isOrganized ? props.organizedFunction : props.unorganizedFunction}>{props.isOrganized ? props.unorgButton : props.orgButton}</button>
            </span>
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
                <button style={{color: getColor('aux1', palette), backgroundColor: '#303030', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '2px'}} onClick={toggleHidden}>
                    <GiHamburgerMenu size='1.5em'/>
                </button>
                <div style={{display: !hidden ? 'inline-block' : 'none'}}>
                    <button style={{color: getColor('aux1', palette), backgroundColor: '#303030', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '2px'}} ><SiAddthis size='1.5em' /></button>
                    <div style={{position: 'relative', zIndex: 7}} onMouseLeave={showPopup.palette ? () => handleTogglePopup('palette') : null} className={`ControlBar_popup ${showPopup.palette ? 'ControlBar_popup-active' : ''}`}>
                        <button style={{position: 'relative', zIndex: 8, color: getColor('aux1', palette), backgroundColor: '#303030', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '.15em'}} id="speed" onClick={() => handleTogglePopup('palette')}><IoIosColorPalette size='1.5em' /></button>
                        {/* <div onMouseLeave={() => handleToggleDropdown('palette')} className='dropdown-content'> */}
                        {/* <div className={`ControlBar_dropdown-content ${props.fullWindow ? 'ControlBar_dropup-content' : ''}`}> */}
                        <div className='ControlBar_popup-content'>
                            <div style={{boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)'}}>
                                {palettes.map(palette => {
                                    return <p onClick={() => handlePaletteChange(palette)}>{palette}</p>
                                })}
                            </div>
                            <div style={{height: '1.8em', opacity: .5, backgroundColor: 'black'}}></div>    
                        </div>
                    </div>
                    
                    {/* <select id="palette" value={props.palette} onChange={handlePaletteChange}>
                        {palettes.map(palette => {
                            return <option value={palette}>{palette}</option>
                        })}
                    </select> */}
                    <div style={{position: 'relative', zIndex: 6}} onMouseLeave={showPopup.speed ? () => handleTogglePopup('speed') : null} className={`ControlBar_popup ${showPopup.speed ? 'ControlBar_popup-active' : ''}`}>
                        <button style={{position: 'relative', zIndex: 7, color: getColor('aux1', palette), backgroundColor: '#303030', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '.15em'}} id="speed" onClick={() => handleTogglePopup('speed')}><GiTortoise size='1.5em' /><GiRabbit size='1.5em' /></button>
                        {/* <div onMouseLeave={() => handleToggleDropdown('speed')} className='dropdown-content'> */}
                        <div className='ControlBar_popup-content'>
                            <div style={{boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)'}}>
                                <p onClick={() => handleSpeedChange(4000)}>.25x</p>
                                <p onClick={() => handleSpeedChange(2000)}>.5x</p>
                                <p onClick={() => handleSpeedChange(1000)}>1x</p>
                                <p onClick={() => handleSpeedChange(800)}>1.25x</p>
                                <p onClick={() => handleSpeedChange(500)}>2x</p>
                                <p onClick={() => handleSpeedChange(200)}>5x</p>
                            </div>
                            <div style={{height: '1.8em', opacity: 0.5, backgroundColor: 'black'}}></div>
                        </div>
                    </div>
                    
                    <div style={{position: 'relative', zIndex: 4}} onMouseLeave={showPopup.sound ? () => handleTogglePopup('sound') : null} className={`ControlBar_popup ${showPopup.sound ? 'ControlBar_popup-active' : ''}`}>
                        <button style={{position: 'relative', zIndex: 5, color: getColor('aux1', palette), backgroundColor: '#303030', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '.15em'}} id="sound" onClick={() => handleTogglePopup('sound')}><GoBell size='1.5em' /></button>
                        <div className='ControlBar_popup-content'>
                            {/* <div style={{paddingBottom: '1.5em'}}>
                            {sounds.map(sound => {
                                return <p onClick={() => handleSoundChange(sound)} >{sound}</p>
                            })}
                            </div> */}
                            <div style={{boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)'}}>
                                {sounds.map(sound => {
                                    return <p onClick={() => handleSoundChange(sound)} >{sound}</p>
                                })}
                            </div>
                            <div style={{height: '1.8em', opacity: 0.5, backgroundColor: 'black'}}></div>
                        </div>
                    </div>
                    
                    {/* <select id="sound" value={sound} onChange={handleSoundChange}>
                        {sounds.map(sound => {
                            return <option value={sound}>{sound}</option>
                        })}
                    </select> */}

                    {props.number ? 
                        <div style={{position: 'relative', zIndex: 3}} onMouseLeave={showPopup.number ? () => handleTogglePopup('number') : null} className={`ControlBar_popup ${showPopup.number ? 'ControlBar_popup-active' : ''}`}>
                            <button style={{position: 'relative', zIndex: 4, color: getColor('aux1', palette), backgroundColor: '#303030', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '.15em'}} id="number" onClick={() => handleTogglePopup('number')}><ImSortNumbericDesc size='1.5em' /></button>
                            <div className='ControlBar_popup-content'>
                            {/* <div className='ControlBar_dropdown-content'> */}
                                <div style={{boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)'}}>
                                    {displayNumberOptions(props.minNum, props.maxNum).map(num => {
                                        return <p onClick={() => handleNumberChange(num)}>{num}</p>
                                        // return <p style={{backgroundColor: '#f9f9f9'}} onClick={() => handleNumberChange(num)}>{num}</p>
                                    })}
                                </div>
                                <div style={{height: '1.8em', opacity: 0.5, backgroundColor: 'black', padding: 0}}></div>
                            </div>
                        </div>
        
                        : null
                    }

                    {props.text ? 
                        <div style={{position: 'relative', zIndex: 1}} onMouseLeave={showPopup.text ? () => handleTogglePopup('text') : null} className={`ControlBar_popup ${showPopup.text ? 'ControlBar_popup-active' : ''}`}>
                            <button style={{position: 'relative', zIndex: 2, color: getColor('aux1', palette), backgroundColor: '#303030', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '.15em'}} id="text" onClick={() => handleTogglePopup('text')}><BsFileText size='1.5em' /></button>
                            <div className='ControlBar_popup-content'>
                            {/* <div className='ControlBar_dropdown-content'> */}
                                <div style={{boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)'}}>
                                    <textarea maxLength="25" rows={3} cols={20} onChange={handleChangeText} value={text}/>
                                    {/* <p>Test</p> */}
                                </div>
                                <div style={{height: '1.8em', opacity: 0.5, backgroundColor: 'black', padding: 0}}></div>
                            </div>
                        </div>
        
                        : null
                    }


                    
                    
                    {/* {props.number ? <select value={props.number} onChange={handleNumberChange}>
                        {displayNumberOptions(props.minNum, props.maxNum).map(num => {
                            return <option value={num}>{num}</option>
                        })}
                    </select> : null} */}
                    
                </div>
                
            </div>
            <div>

                {!props.disableFullWindow ? 
                    <span>
                        <button style={{color: getColor('aux1', palette), backgroundColor: '#303030', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px'}} onClick={props.toggleWindow}>{props.fullWindow ? <ImShrink2 size='1.5em' /> : <FaExpandAlt size='1.5em' />}</button>
                    </span>
                    :
                    null
                }
            </div>
        </div>
        </div>
    )
}

export default ControlBar;