import React, { useState } from 'react';
import useToggle from './hooks/useToggle';
import { palettes, sounds } from './utils';
import { FaExpandAlt, FaVolumeMute, FaVolumeUp } from 'react-icons/fa/';
import { GrContract } from 'react-icons/gr/';
import { GiConsoleController, GiHamburgerMenu, GiRabbit, GiTortoise } from 'react-icons/gi/';
import { IoIosColorPalette, IoSpeedometerSharp } from 'react-icons/io/';
import { GoBell } from 'react-icons/go/';
import { SiAddthis } from 'react-icons/si';
import { ImSortNumbericDesc } from 'react-icons/im';
import './ControlBar.css';


function ControlBar(props) {
    const [speed, setSpeed] = useState(1000);
    const [text, setText] = useState(props.textValue || null);
    const [sound, setSound] = useState(props.soundValue || null);
    const [number, setNumber] = useState(props.number);
    const [palette, setPalette] = useState(props.palette || 'baseColors');
    const [hidden, toggleHidden] = useToggle(true);
    const [showDropdown, setShowDropdown] = useState(
        {
            palette: false,
            speed: false,
            sound: false,
            number: false
        }
    )
     
    // const handleSpeedChange = evt => {
    //     setSpeed(evt.target.value);
    //     props.setSpeed(evt.target.value);
    // }
    const handleSpeedChange = speed => {
        handleToggleDropdown('speed');
        setSpeed(speed);
        props.setSpeed(speed);
    }

    const handleChangeText = evt => {
        setText(evt.target.value);
        props.changeText(evt.target.value);
    }

    const handleSoundChange = evt => {
        setSound(evt.target.value);
        props.setSound(evt.target.value);
    }
    
    const handleNumberChange = evt => {
        setNumber(evt.target.value);
        props.setNumber(evt.target.value);
    }

    const handlePaletteChange = evt => {
        setPalette(evt.target.value);
        props.setPalette(evt.target.value);
    }

    const displayNumberOptions = (min = 3, max = 10) => {
        let numArr = [];
        for(let i = min; i <= max; i++) {
            numArr.push(i);
        }
        return numArr;
    }

    const handleCloseDropdown = evt => {
        setShowDropdown({[evt.target.id]: false});
    }

    // const handleShowDropdown = evt => {
    //     // console.log(evt)
    //     setShowDropdown({[evt.target.parentElement.id]: true});
    //     // setShowDropdown({[evt.target.id]: true});
    // }

    const handleToggleDropdown = group => {
        setShowDropdown({[group]: !showDropdown[group]});
    }

    return (
        <>
        <div style={{marginBottom: '0.5em'}}>
            <span>
                <button style={{padding: '.35em .55em'}} disabled={props.isOrganizing} onClick={props.isOrganized ? props.organizedFunction : props.unorganizedFunction}>{props.isOrganized ? props.unorgButton : props.orgButton}</button>
            </span>
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div >
                <button style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '2px'}} onClick={toggleHidden}>
                    <GiHamburgerMenu size='1.5em'/>
                </button>
                <div style={{display: !hidden ? 'inline-block' : 'none'}}>
                    <button><SiAddthis size='1.5em' /></button>
                    <button><IoIosColorPalette size='1.5em' /></button>
                    <select id="palette" value={props.palette} onChange={handlePaletteChange}>
                        {palettes.map(palette => {
                            return <option value={palette}>{palette}</option>
                        })}
                    </select>
                    {/* <button><GiTortoise size='1.5em' /><GiRabbit size='1.5em' /></button>
                    <select id="speed" value={speed} onChange={handleSpeedChange}>
                        <option value={4000}>.25x</option>
                        <option value={2000}>.5x</option>
                        <option value={1000}>1x</option>
                        <option value={800}>1.25x</option>
                        <option value={500}>2x</option>
                        <option value={200}>5x</option>
                    </select> */}
                    <div class={`dropdown ${showDropdown.speed ? 'dropdown-active' : ''}`}>
                        <button id="speed" onClick={() => handleToggleDropdown('speed')}><GiTortoise size='1.5em' /><GiRabbit size='1.5em' /></button>
                        {/* <button id="speed" onClick={() => handleShowDropdown('speed')}><GiTortoise size='1.5em' /></button> */}
                        {/* <button id="speed" onClick={handleShowDropdown}>X</button> */}
                        {/* <div display={showDropdown.speed ? 'block' : 'none'} class="dropdown-content"> */}
                        {/* <div hidden={showDropdown.speed ? false : true} className={`dropdown-content ${showDropdown.speed ? 'dropdown-active' : null}`}> */}
                        <div className='dropdown-content'>
                            {/* <select id="speed" value={speed} onChange={handleSpeedChange}> */}
                            <p onClick={() => handleSpeedChange(4000)}>.25x</p>
                            <p onClick={() => handleSpeedChange(2000)}>.5x</p>
                            <p onClick={() => handleSpeedChange(1000)}>1x</p>
                            <p onClick={() => handleSpeedChange(800)}>1.25x</p>
                            <p onClick={() => handleSpeedChange(500)}>2x</p>
                            <p onClick={() => handleSpeedChange(200)}>5x</p>
                            {/* </select> */}
                        </div>
                    </div>
                    
                    
                    <button><GoBell size='1.5em' /></button>
                    <select id="sound" value={sound} onChange={handleSoundChange}>
                        {sounds.map(sound => {
                            return <option value={sound}>{sound}</option>
                        })}
                    </select>
                    <button><ImSortNumbericDesc size='1.5em' /></button>
                    {props.number ? <select value={props.number} onChange={handleNumberChange}>
                        {displayNumberOptions(props.minNum, props.maxNum).map(num => {
                            return <option value={num}>{num}</option>
                        })}
                    </select> : null}
                    
                </div>
                
            </div>
            <div>

                {!props.disableFullWindow ? 
                    <span>
                        <button style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px'}} onClick={props.toggleWindow}>{props.fullWindow ? <GrContract size='1.5em' /> : <FaExpandAlt size='1.5em' />}</button>
                    </span>
                    :
                    null
                }
            </div>
        </div>
        </>
    )
}

export default ControlBar;