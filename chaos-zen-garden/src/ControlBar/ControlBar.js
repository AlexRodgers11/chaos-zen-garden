import React, { memo, useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { volumeActions } from '../store/volume';
import { highlightUserIconActions } from '../store/highlight-user-icon';
import { modalContentActions } from '../store/modal-content';
import useToggle from '../hooks/useToggle';
import { palettes, sounds, getColor } from '../utils';
import { v4 as uuidv4 } from 'uuid';
import { FaExpandAlt, FaShapes } from 'react-icons/fa/';
import { GiHamburgerMenu, GiRabbit, GiTortoise } from 'react-icons/gi/';
import { IoIosColorPalette, IoSpeedometerSharp, } from 'react-icons/io/';
import { GoBell } from 'react-icons/go/';
import { SiAddthis } from 'react-icons/si';
import { ImSortNumbericDesc, ImShrink2, ImVolumeHigh, ImVolumeLow, ImVolumeMedium, ImVolumeMute } from 'react-icons/im';
import { BsFileText, BsLockFill } from 'react-icons/bs';
import { RiSoundModuleLine } from 'react-icons/ri';
import './ControlBar.css';
import { sizeActions } from '../store/size';


function ControlBar(props) {
    const volume = useSelector((state) => state.volume.volume);
    const pieceWidth = useSelector((state) => state.size.pieceWidth);
    const appWidth = useSelector((state) => state.size.appWidth);
    const loggedIn = useSelector((state) => state.authentication.loggedIn);
    const fullView = useSelector((state) => state.size.fullView);
    const [speed, setSpeed] = useState(1000);
    const [text, setText] = useState(props.textValue || null);
    const [sound, setSound] = useState(props.soundValue || null);
    const [number, setNumber] = useState(props.number);
    const [palette, setPalette] = useState(props.palette);
    const [proportionalVolume, setProportionalVolume] = useState(props.proportionalVolume || null);
    const [hidden, toggleHidden] = useToggle(true);
    const [shape, setShape] = useState(props.shape);
    const [showPopup, setShowPopup] = useState(
        {
            palette: false,
            speed: false,
            sound: false,
            number: false,
            text: false,
            volume: false,
            shape: false,
            proportionalVolume: false
        }
    )

    const dispatch = useDispatch();

    const colorFirstUpdate = useRef(true);
    useEffect(() => {
        if(!colorFirstUpdate.current) {
            setPalette(props.palette);
        } else {
            colorFirstUpdate.current = false;
        }
    }, [props.palette]);
     

    const handleSpeedChange = speed => {
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

    const handleToggleFullWindow = () => {
        // dispatch(sizeActions.setFullView(props.piece));
        // dispatch(sizeActions.setFullView(props.id));
        props.toggleFullView();
    }

    const handleVolumeChange = evt => {
        dispatch(volumeActions.setVolume(evt.target.value));
    }
    
    const handleProportionalVolumeChange = selection => {
        handleTogglePopup('proportionalVolume');
        props.changeProportionalVolume(selection)
        setProportionalVolume(selection)
    }
    
    const handleShapeChange = shape => {
        handleTogglePopup('shape');
        props.changeShape(shape);
        setShape(shape);
    }

    const handleToggleHighlightUserIcon = () => {
        dispatch(highlightUserIconActions.toggleHighlightUserIcon());
    }

    const displayNumberOptions = (min = 3, max = 10) => {
        let numArr = [];
        for(let i = min; i <= max; i++) {
            numArr.push(i);
        }
        return numArr;
    }

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
                    {/* <div className="ControlBar_tooltip"><span className={`ControlBar_tooltiptext ${!loggedIn ? 'ControlBar_showTooltipText' : ''}`}>Log in to add to custom garden</span><button disabled={!loggedIn} onMouseOver={!loggedIn ? handleToggleHighlightUserIcon : null} onMouseOut={!loggedIn ? handleToggleHighlightUserIcon : null} style={{color: getColor('aux1', palette), backgroundColor: '#303030', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '2px'}} ><SiAddthis size='1.5em' /></button></div> */}
                    <div style={{position: 'relative', zIndex: 114}} onMouseLeave={showPopup.palette ? () => handleTogglePopup('palette') : null} className={`ControlBar_popup ${showPopup.palette ? 'ControlBar_popup-active' : ''}`}>
                        <button disabled={props.isOrganizing} style={{position: 'relative', zIndex: 115, color: getColor('aux1', palette), backgroundColor: '#303030', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '.15em'}} id="speed" onClick={() => handleTogglePopup('palette')}><IoIosColorPalette size='1.5em' /></button>
                        <div className='ControlBar_popup-content'>
                            <div style={{boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)'}}>
                                {palettes.map(paletteOption => {
                                    let key = uuidv4();
                                    return <p style={{backgroundColor: palette === paletteOption ? '#bfbfbf' : '#f9f9f9'}} key={key} onClick={() => handlePaletteChange(paletteOption)}>{paletteOption}</p>
                                })}
                                <p style={{alignItems: 'center'}} onClick={() => {dispatch(modalContentActions.setModalContent('monochrome'))}}>Monochrome</p>
                                {/* <p><p style={{display: 'flex', alignItems: 'center'}} onClick={loggedIn ? () => {dispatch(modalContentActions.setModalContent('custom-palette'))} : null} >Custom{!loggedIn ? <BsLockFill /> : null}</p></p> */}
                            </div>
                            <div style={{height: '1.8em', opacity: .5, backgroundColor: 'black'}}></div>    
                        </div>
                    </div>
                    
                    <div style={{position: 'relative', zIndex: 112}} onMouseLeave={showPopup.speed ? () => handleTogglePopup('speed') : null} className={`ControlBar_popup ${showPopup.speed ? 'ControlBar_popup-active' : ''}`}>
                        <button style={{position: 'relative', zIndex: 113, color: getColor('aux1', palette), backgroundColor: '#303030', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '.15em'}} id="speed" onClick={() => handleTogglePopup('speed')}><GiTortoise size='1.5em' /><GiRabbit size='1.5em' /></button>
                        <div className='ControlBar_popup-content'>
                            <div style={{boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)'}}>
                                <p style={{backgroundColor: speed === 1000 ? '#bfbfbf' : '#f9f9f9', display: 'block'}} onClick={() => handleSpeedChange(1000)}>Normal</p>
                                <p style={{backgroundColor: speed === 500 ? '#bfbfbf' : '#f9f9f9'}} onClick={() => handleSpeedChange(500)}>Double</p>
                                <p style={{backgroundColor: speed === 333 ? '#bfbfbf' : '#f9f9f9'}} onClick={() => handleSpeedChange(333)}>Triple</p>
                                <p style={{backgroundColor: speed === 200 ? '#bfbfbf' : '#f9f9f9'}} onClick={() => handleSpeedChange(200)}>5x</p>
                                <p style={{backgroundColor: speed === 100 ? '#bfbfbf' : '#f9f9f9'}} onClick={() => handleSpeedChange(100)}>10x</p>
                                <p style={{backgroundColor: speed === 50 ? '#bfbfbf' : '#f9f9f9'}} onClick={() => handleSpeedChange(50)}>20x</p>
                            </div>
                            <div style={{height: '1.8em', opacity: 0.5, backgroundColor: 'black'}}></div>
                        </div>
                    </div>
                    
                    <div style={{position: 'relative', zIndex: 110}} onMouseLeave={showPopup.sound ? () => handleTogglePopup('sound') : null} className={`ControlBar_popup ${showPopup.sound ? 'ControlBar_popup-active' : ''}`}>
                        <button style={{position: 'relative', zIndex: 111, color: getColor('aux1', palette), backgroundColor: '#303030', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '.15em'}} id="sound" onClick={() => handleTogglePopup('sound')}><GoBell size='1.5em' /></button>
                        <div className='ControlBar_popup-content'>
                            <div style={{boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)'}}>
                                {sounds.map(soundOption => {
                                    let key = uuidv4();
                                    return <p key={key} style={{backgroundColor: sound === soundOption ? '#bfbfbf' : '#f9f9f9'}} onClick={() => handleSoundChange(soundOption)} >{soundOption}</p>
                                })}
                            </div>
                            <div style={{height: '1.8em', opacity: 0.5, backgroundColor: 'black'}}></div>
                        </div>
                    </div>

                    {props.proportionalVolume ? <div style={{position: 'relative', zIndex: 108}} onMouseLeave={showPopup.proportionalVolume ? () => handleTogglePopup('proportionalVolume') : null} className={`ControlBar_popup ${showPopup.proportionalVolume ? 'ControlBar_popup-active' : ''}`}>
                        <button style={{position: 'relative', zIndex: 109, color: getColor('aux1', palette), backgroundColor: '#303030', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '.15em'}} id="proportionalVolume" onClick={() => handleTogglePopup('proportionalVolume')}><RiSoundModuleLine size='1.5em' /></button>
                        <div className='ControlBar_popup-content'>
                            <div >
                                <p style={{backgroundColor: proportionalVolume === 'even' ? '#bfbfbf' : '#f9f9f9'}} onClick={() => handleProportionalVolumeChange('even')}>Even Volume</p>
                                <p style={{backgroundColor: proportionalVolume === 'proportional' ? '#bfbfbf' : '#f9f9f9'}} onClick={() => handleProportionalVolumeChange('proportional')}>Proportional Volume</p>
                            </div>
                            <div style={{boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)'}}>
                            </div>
                            <div style={{height: '1.8em', opacity: 0.5, backgroundColor: 'black'}}></div>
                        </div>
                    </div> : null}
                    
                    <div style={{position: 'relative', zIndex: 106}} onMouseLeave={showPopup.volume ? () => handleTogglePopup('volume') : null} className={`ControlBar_popup ${showPopup.volume ? 'ControlBar_popup-active' : ''}`}>
                        <div style={{display: 'inline-flex', transform: 'rotate(270deg)'}}>
                        <button style={{position: 'relative', transform: 'rotate(90deg)', zIndex: 107, color: getColor('aux1', palette), backgroundColor: '#303030', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '.15em'}} id="volume" onClick={() => handleTogglePopup('volume')}>
                            {volume > 70 ? <ImVolumeHigh size='1.5em' /> : volume > 30 ? <ImVolumeMedium size='1.5em' /> : volume > 0 ? <ImVolumeLow size='1.5em' /> : <ImVolumeMute size='1.5em' />}
                        </button>
                        <div className='ControlBar_popup-content'>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <input onChange={handleVolumeChange} style={{position: 'relative', left: '2.25em', height: '2em', top: '.175em'}} type="range" min={0} max={100} value={volume}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {props.number ? 
                        <div style={{position: 'relative', zIndex: 104}} onMouseLeave={showPopup.number ? () => handleTogglePopup('number') : null} className={`ControlBar_popup ${showPopup.number ? 'ControlBar_popup-active' : ''}`}>
                            <button disabled={props.isOrganizing} style={{position: 'relative', zIndex: 105, color: getColor('aux1', palette), backgroundColor: '#303030', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '.15em'}} id="number" onClick={() => handleTogglePopup('number')}><ImSortNumbericDesc size='1.5em' /></button>
                            <div className='ControlBar_popup-content'>
                                <div style={{boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)', overflowY: `${props.maxNum - props.minNum > 8 ? 'scroll' : null}`, overscrollBehavior: 'none', height: `${props.maxNum - props.minNum >= 8 ? `${pieceWidth * .5}px` : null}`}}>
                                    {displayNumberOptions(props.minNum, props.maxNum).map(numOption => {
                                        let key= uuidv4();
                                        return <p key={key} style={{backgroundColor: number === numOption ? '#bfbfbf' : '#f9f9f9'}} onClick={() => handleNumberChange(numOption)}>{numOption}</p>
                                    })}
                                </div>
                                <div style={{height: '1.8em', opacity: 0.5, backgroundColor: 'black', padding: 0}}></div>
                            </div>
                        </div>
        
                        : null
                    }

                    {props.text ? 
                        <div style={{position: 'relative', zIndex: 102}} onMouseLeave={showPopup.text ? () => handleTogglePopup('text') : null} className={`ControlBar_popup ${showPopup.text ? 'ControlBar_popup-active' : ''}`}>
                            <button disabled={props.isOrganizing} style={{position: 'relative', zIndex: 103, color: getColor('aux1', palette), backgroundColor: '#303030', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '.15em'}} id="text" onClick={() => handleTogglePopup('text')}><BsFileText size='1.5em' /></button>
                            <div className='ControlBar_popup-content'>
                                <div style={{boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)'}}>
                                    <textarea maxLength="25" rows={3} cols={20} onChange={handleChangeText} value={text}/>
                                </div>
                                <div style={{height: '1.8em', opacity: 0.5, backgroundColor: 'black', padding: 0}}></div>
                            </div>
                        </div>
        
                        : null
                    }
                    
                    {props.shape ? 
                        <div style={{position: 'relative', zIndex: 100}} onMouseLeave={showPopup.shape ? () => handleTogglePopup('shape') : null} className={`ControlBar_popup ${showPopup.shape ? 'ControlBar_popup-active' : ''}`}>
                            <button disabled={props.isOrganizing} style={{position: 'relative', zIndex: 101, color: getColor('aux1', palette), backgroundColor: '#303030', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '.15em'}} id="shape" onClick={() => handleTogglePopup('shape')}><FaShapes size='1.5em' /></button>
                            <div className='ControlBar_popup-content'>
                                <div style={{boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)'}}>
                                    {props.shapes.map(shapeOption => {
                                        let key=uuidv4();
                                        return <p key={key} style={{backgroundColor: shape === shapeOption ? '#bfbfbf' : '#f9f9f9'}} onClick={() => handleShapeChange(shapeOption)}>{shapeOption}</p>
                                    })}
                                </div>
                                <div style={{height: '1.8em', opacity: 0.5, backgroundColor: 'black', padding: 0}}></div>
                            </div>
                        </div>
        
                        : null
                    }
                </div>
                
            </div>
            <div>

                {appWidth > 600 ? 
                    <span>
                        <button style={{color: getColor('aux1', palette), backgroundColor: '#303030', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px'}} onClick={handleToggleFullWindow}>{fullView ? <ImShrink2 size='1.5em' /> : <FaExpandAlt size='1.5em' />}</button>
                    </span>
                    :
                    null
                }
            </div>
        </div>
        </div>
    )
}

export default memo(ControlBar);