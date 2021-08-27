import React, { useState } from 'react';
import useToggle from './hooks/useToggle';
import { palettes, sounds } from './utils';
import { FaExpandAlt, FaVolumeMute, FaVolumeUp } from 'react-icons/fa/';
import { GrContract } from 'react-icons/gr/';
import { GiHamburgerMenu, GiRabbit, GiTortoise } from 'react-icons/gi/';
import { IoIosColorPalette, IoSpeedometerSharp } from 'react-icons/io/';
import { GoBell } from 'react-icons/go/';
import { SiAddthis } from 'react-icons/si';
import { ImSortNumbericDesc } from 'react-icons/im';


function ControlBar(props) {
    const [speed, setSpeed] = useState(1000);
    const [text, setText] = useState(props.textValue || null);
    const [sound, setSound] = useState(props.soundValue || null);
    const [number, setNumber] = useState(props.number);
    const [palette, setPalette] = useState(props.palette || 'baseColors');
    const [hidden, toggleHidden] = useToggle(true);
     
    const handleSpeedChange = evt => {
        setSpeed(evt.target.value);
        props.setSpeed(evt.target.value);
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

    return (
        <>
        <div style={{marginBottom: '0.5em'}}>
            <span>
                <button style={{padding: '.35em .55em'}} disabled={props.isOrganizing} onClick={props.isOrganized ? props.organizedFunction : props.unorganizedFunction}>{props.isOrganized ? props.unorgButton : props.orgButton}</button>
            </span>
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div >
                {/* <button style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '2px'}} onClick={toggleHidden}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-align-justify"><line x1="21" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="3" y2="18"/></svg>
                </button> */}
                <button style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '2px'}} onClick={toggleHidden}>
                    <GiHamburgerMenu size='1.5em'/>
                </button>
                <div style={{display: !hidden ? 'inline-block' : 'none'}}>
                    {props.text ? <p><label htmlFor="textInput">{props.text}</label><input type="text" disabled={props.isOrganizing} onChange={handleChangeText} value={text}/></p> : null}
                {/* <div> */}
                    <button><SiAddthis size='1.5em' /></button>
                    <button><IoIosColorPalette size='1.5em' /></button>
                    <select id="palette" value={props.palette} onChange={handlePaletteChange}>
                        {palettes.map(palette => {
                            return <option value={palette}>{palette}</option>
                        })}
                    </select>
                    {/* <label forName="speed">Speed</label> */}
                    <button><GiTortoise size='1.5em' /><GiRabbit size='1.5em' /></button>
                    <select id="speed" value={speed} onChange={handleSpeedChange}>
                        <option value={4000}>.25x</option>
                        <option value={2000}>.5x</option>
                        <option value={1000}>1x</option>
                        <option value={800}>1.25x</option>
                        <option value={500}>2x</option>
                        <option value={200}>5x</option>
                    </select>
                    {/* <label forName="sound">Sound</label> */}
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
                {/* </div> */}
                    {/* <span>
                        <button disabled={props.isOrganizing} onClick={props.isOrganized ? props.organizedFunction : props.unorganizedFunction}>{props.isOrganized ? props.unorgButton : props.orgButton}</button>
                    </span>
                    {!props.disableFullWindow ? 
                        <span>
                            <button onClick={props.toggleWindow}>{props.fullWindow ? 'Back to Garden' : 'Full Window'}</button>
                        </span>
                        :
                        null
                    } */}
                    
                </div>
                
            </div>
            <div>
                {/* <span>
                    <button disabled={props.isOrganizing} onClick={props.isOrganized ? props.organizedFunction : props.unorganizedFunction}>{props.isOrganized ? props.unorgButton : props.orgButton}</button>
                </span> */}
                {!props.disableFullWindow ? 
                    <span>
                        {/* <button onClick={props.toggleWindow}>{props.fullWindow ? 'Back to Garden' : 'Full Window'}</button> */}
                        {/* <button style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px'}} onClick={props.toggleWindow}>{props.fullWindow ? <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minimize-2"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-maximize-2"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>}</button> */}
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