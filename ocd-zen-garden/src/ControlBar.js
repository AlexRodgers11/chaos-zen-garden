import React, { useState } from 'react';

function ControlBar(props) {
    const [speed, setSpeed] = useState(1000);
    const [text, setText] = useState(props.textValue || null);
    const [sound, setSound] = useState(props.soundValue || null);
    
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

    return (
        <div>
            {props.text ? <p><label htmlFor="textInput">{props.text}</label><input type="text" disabled={props.isOrganizing} onChange={handleChangeText} value={text}/></p> : null}
            <span>
                <button>Add</button>
                <button>Change Colors</button>
                {/* <button>Change Speed</button> */}
                <select value={speed} onChange={handleSpeedChange}>
                    <option value={4000}>.25x</option>
                    <option value={2000}>.5x</option>
                    <option value={1000}>1x</option>
                    <option value={800}>1.25x</option>
                    <option value={500}>2x</option>
                    <option value={200}>5x</option>
                </select>
                <select value={sound} onChange={handleSoundChange}>
                    <option value='blip'>Blip</option>
                    <option value='ding'>Ding</option>
                    <option value='whoop'>Whoop</option>
                    <option value='whoosh'>Whoosh</option>
                    <option value='click'>Click</option>
                </select>
            </span>
            <span>
                <button disabled={props.isOrganizing} onClick={props.isOrganized ? props.organizedFunction : props.unorganizedFunction}>{props.isOrganized ? props.unorgButton : props.orgButton}</button>
            </span>
        </div>
    )
}

export default ControlBar;