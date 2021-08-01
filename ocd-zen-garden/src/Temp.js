import React, { useState, useRef, useEffect } from 'react';
import useToggle from './hooks/useToggle';
import { getColor } from './utils';
import { Howl, Howler } from 'howler';
import Test from './assets/test2.mp3'

const audioClips = [
    {sound: Test, label: 'test'}
]

function Snake(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [nextIndex, setNextIndex] = useState(1);

    const [boxes, setBoxes] = useState([{id: 1, marginLeft: `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`, color: getColor(1)}, {id: 2, marginLeft: `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`, color: getColor(2)}, {id: 3, marginLeft: `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`, color: getColor(3)}, {id: 4, marginLeft: `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`, color: getColor(4)}, {id: 5, marginLeft: `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`, color: getColor(5)}, {id: 6, marginLeft: `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`, color: getColor(6)}, {id: 7, marginLeft: `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`, color: getColor(7)}]);
    const firstUpdate = useRef(true);
    
    const SoundPlay = src => {
        const sound = new Howl({src});
        sound.play();
    }

    useEffect(()=>{
        if(!firstUpdate.current) {
            if(nextIndex < boxes.length){
                setTimeout(()=>{
                    organizeBoxes(nextIndex);
                }, 1000);
            }
        } else {firstUpdate.current = false}     
    }, [nextIndex, boxes])

    const organizeBoxes = (idx) => {
        let newBoxes;
        if(idx + 1 === boxes.length){
            newBoxes = boxes.map(box => {
                return {...box, marginLeft: `${props.width * .33 * .4575}px`} 
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
        // SoundPlay(Test)
        setBoxes(newBoxes);
        setNextIndex(idx + 1);
        if(idx + 1 === boxes.length) {
            let testSound = new Howl({
                src: ['./assets/test2.mp3'],
                volume: 0.5
            });
            
            setTimeout(() => toggleIsOrganized(), 1000);
        }
    }

    const scatterBoxes = () => {
        let newBoxes = boxes.map(box => {
            let randomNum = `${props.width * .33 * .415 + Math.floor(Math.random() * props.width * .33 * .085)}px`;
            return {...box, marginLeft: randomNum};
        })
        setBoxes(newBoxes);
        toggleIsOrganized();
    }
    
    const soundTest = () => {
        // const testSound = new Howl({
        //     src: ['.test.wav'],
        //     html5: true
        // })

        // testSound.play();
        SoundPlay(Test)
    }

    return (
        <div style={{width: '100%', border: '1px solid black'}}>
            <p>Snake Test</p>
            {boxes.map(box => (
                <div style={{boxSizing: 'border-box', border: '1.5px solid black', width: `${props.width * .33 * .085}px`, height: `${props.width * .33 * .085}px`, padding: 0, marginTop: '0', marginBottom: '0', marginLeft: `${box.marginLeft}`, backgroundColor: `${box.color}` }}></div>
            ))}
            {/* <button onClick={isOrganized ? scatterBoxes : () => organizeBoxes(0)}>{isOrganized ? 'Scatter' : 'Organize'}</button> */}
            <button onClick={soundTest}>{isOrganized ? 'Scatter' : 'Organize'}</button>
        </div>
    )
}

export default Snake;