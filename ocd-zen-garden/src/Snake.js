import React, { useState, useRef, useEffect } from 'react';
import useToggle from './hooks/useToggle';
import { getColor, getSound } from './utils';
import ControlBar from './ControlBar';
// import { Howl, Howler } from 'howler';
import { Howl } from 'howler';
// import Test from './assets/test2.mp3';
// import Blip from './assets/blip.wav';
import { v4 as uuidv4 } from 'uuid';

// const audioClips = [
//     {sound: Test, label: 'test'}
// ]

function Snake(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [nextIndex, setNextIndex] = useState(0);
    const [colorPalette, setColorPalette] = useState(props.palette);
    // const [boxes, setBoxes] = useState([{id: 1, marginLeft: `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`, color: getColor(1, 'baseColors')}, {id: 2, marginLeft: `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`, color: getColor(2, 'baseColors')}, {id: 3, marginLeft: `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`, color: getColor(3, 'baseColors')}, {id: 4, marginLeft: `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`, color: getColor(4, 'baseColors')}, {id: 5, marginLeft: `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`, color: getColor(5, 'baseColors')}, {id: 6, marginLeft: `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`, color: getColor(6, 'baseColors')}, {id: 7, marginLeft: `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`, color: getColor(7, 'baseColors')}]);
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('blip'));

    // const soundPlay = src => {
    //     const sound = new Howl({src});
    //     sound.play();
    // }
    
    const createStartingBoxArray = num => {
        let boxes = [];
        for(let i = 1; i <= num; i++) {
            boxes.push({
                id: i,
                // marginLeft: `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`,
                marginLeft: `${.33 * .415 + Math.random() * .33 * .085}`,
                color: getColor(i, colorPalette)
            })
        }
        return boxes;
    }

    const [boxes, setBoxes] = useState(createStartingBoxArray(7));

    const soundPlay = soundObj => {
        const sound = new Howl({
            src: soundObj.src,
            sprite: soundObj.sprite
        });
        sound.play(soundObj.spriteName);
    }

    const firstUpdate = useRef(true);
    useEffect(()=>{
        if(!firstUpdate.current) {
            if(nextIndex < boxes.length){
                setTimeout(()=>{
                    organizeBoxes(nextIndex);
                }, speed);
            }
        } else {
            firstUpdate.current = false;
        }     
    }, [nextIndex]);

    const colorFirstUpdate = useRef(true);
    useEffect(() => {
        if(!colorFirstUpdate.current) {
            let newBoxes = boxes.map(box => {
                return {...box, color: getColor(box.id, props.palette)}
            });
            setColorPalette(props.palette);
            setBoxes(newBoxes);
        } else {
            colorFirstUpdate.current = false;
        }
    }, [props.palette]);


    const organizeBoxes = (idx) => {
        if(idx === 0) {
            toggleIsOrganizing();
        }
        let newBoxes;
        if(idx + 1 === boxes.length){
            newBoxes = boxes.map(box => {
                return {...box, marginLeft: `${.33 * .4575}`} 
            });
        } else {
            newBoxes = boxes.map(box => {
                if(box.id <= boxes[idx].id){
                    return {...box, marginLeft: `${boxes[idx+1].marginLeft}`}
                } else {
                    return box
                }
            });
        }
        soundPlay(sound);
        setBoxes(newBoxes);
        setNextIndex(idx + 1);
        console.log('setNextIndex just ran')
        if(idx + 1 === boxes.length) setTimeout(() => {
            toggleIsOrganized();
            toggleIsOrganizing();
        }, speed)
    }

    const scatterBoxes = () => {
        let newBoxes = boxes.map(box => {
            let randomNum = `${.33 * .415 + Math.random() * .33 * .085}`;
            return {...box, marginLeft: randomNum};
        })
        setBoxes(newBoxes);
        toggleIsOrganized();
    }

    const handleSetSpeed = time => {
        setSpeed(time);
    }

    const handleSetSound = sound => {
        setSound(getSound(sound));
    }

    return (
        <div style={{width: '100%', border: '1px solid black'}}>
            <p>Snake Test</p>
            {boxes.map(box => {
                let boxKey = uuidv4();
                return (
                    // <div key={boxKey} style={{boxSizing: 'border-box', border: '1.5px solid black', width: `${props.width * .33 * .085}px`, height: `${props.width * .33 * .085}px`, padding: 0, marginTop: '0', marginBottom: '0', marginLeft: `${box.marginLeft}`, backgroundColor: `${box.color}` }}></div>
                    <div key={boxKey} style={{boxSizing: 'border-box', border: '1.5px solid black', width: `${props.width * .33 * .085}px`, height: `${props.width * .33 * .085}px`, padding: 0, marginTop: '0', marginBottom: '0', marginLeft: `${box.marginLeft * props.width}px`, backgroundColor: `${box.color}` }}></div>
                )
            })}
            {/* <button onClick={isOrganized ? scatterBoxes : () => organizeBoxes(0)}>{isOrganized ? 'Scatter' : 'Organize'}</button> */}
            <ControlBar isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='blip' organizedFunction={scatterBoxes} unorganizedFunction={() => organizeBoxes(0)} unorgButton='Scatter' orgButton='Organize' />
        </div>
    )
}

export default Snake;