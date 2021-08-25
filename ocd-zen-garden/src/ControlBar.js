import React, { useState } from 'react';
import useToggle from './hooks/useToggle';
import { palettes, sounds } from './utils';

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
        <div>
            <span>
                <button disabled={props.isOrganizing} onClick={props.isOrganized ? props.organizedFunction : props.unorganizedFunction}>{props.isOrganized ? props.unorgButton : props.orgButton}</button>
            </span>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
                <button onClick={toggleHidden}>{'->'}</button>
                <div style={{display: !hidden ? 'inline-block' : 'none'}}>
                    {props.text ? <p><label htmlFor="textInput">{props.text}</label><input type="text" disabled={props.isOrganizing} onChange={handleChangeText} value={text}/></p> : null}
                    <span>
                        <button>Add</button>
                        <select id="palette" value={props.palette} onChange={handlePaletteChange}>
                            {palettes.map(palette => {
                                return <option value={palette}>{palette}</option>
                            })}
                        </select>
                        {/* <label forName="speed">Speed</label> */}
                        <select id="speed" value={speed} onChange={handleSpeedChange}>
                            <option value={4000}>.25x</option>
                            <option value={2000}>.5x</option>
                            <option value={1000}>1x</option>
                            <option value={800}>1.25x</option>
                            <option value={500}>2x</option>
                            <option value={200}>5x</option>
                        </select>
                        {/* <label forName="sound">Sound</label> */}
                        <select id="sound" value={sound} onChange={handleSoundChange}>
                            {sounds.map(sound => {
                                return <option value={sound}>{sound}</option>
                            })}
                        </select>
                        {props.number ? <select value={props.number} onChange={handleNumberChange}>
                            {displayNumberOptions(props.minNum, props.maxNum).map(num => {
                                return <option value={num}>{num}</option>
                            })}
                        </select> : null}
                    </span>
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
                        <button onClick={props.toggleWindow}>{props.fullWindow ? 'Back to Garden' : 'Full Window'}</button>
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