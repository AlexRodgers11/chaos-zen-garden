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
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('Slam'));
    const [numBoxes, setNumBoxes] = useState(7)
    const [numSnakes, setNumSnakes] = useState(1);
    const [shape, setShape] = useState('square');

    const createStartingBoxArray = num => {
        let boxes = [];
        for(let i = 1; i <= num; i++) {
            boxes.push({
                id: i,
                left: `${Math.random() * .45 * 100}`,
                color: getColor(i, colorPalette)
            })
        }
        return boxes;
    }

    const [boxes, setBoxes] = useState(createStartingBoxArray(numBoxes));

    const soundPlay = soundObj => {
        const sound = new Howl({
            src: soundObj.src,
            sprite: soundObj.sprite,
            volume: props.volume * .01
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
            colorsDoNotUpdate.current = true;
        } else {
            colorFirstUpdate.current = false;
        }
    }, [props.palette]);

    const colorsDoNotUpdate = useRef(true)
    useEffect(() => {
        if(!colorsDoNotUpdate.current) {
            let newBoxes = boxes.map(box => {
                return {...box, color: getColor(box.id, colorPalette)}
            });
            setBoxes(newBoxes);
        } else {
            colorsDoNotUpdate.current = false;
        }
        
    }, [colorPalette]);


    const organizeBoxes = (idx) => {
        if(idx === 0) {
            toggleIsOrganizing();
        }
        let newBoxes;
        if(idx + 1 === boxes.length){
            newBoxes = boxes.map(box => {
                return {...box, left: '25'} 
            });
        } else {
            newBoxes = boxes.map(box => {
                if(box.id <= boxes[idx].id){
                    return {...box, left: `${boxes[idx+1].left}`}
                } else {
                    return box
                }
            });
        }
        soundPlay(sound);
        setBoxes(newBoxes);
        setNextIndex(idx + 1);
        if(idx + 1 === boxes.length) setTimeout(() => {
            toggleIsOrganized();
            toggleIsOrganizing();
        }, speed)
    }

    const scatterBoxes = () => {
        let newBoxes = boxes.map(box => {
            let randomNum = `${Math.random() * .45 * 100}`;
            return {...box, left: randomNum};
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

    const handleSetColorPalette = palette => {
        colorsDoNotUpdate.current = false;
        setColorPalette(palette);
    }

    const handleChangeVolume = volume => {
        props.changeVolume(volume);
    }

    const handleSetNumBoxes = num => {
        setNumBoxes(Number(num));
        setBoxes(createStartingBoxArray(Number(num)))
    }

    const handleChangeShape = shape => {
        setShape(shape);
    }

    const handleToggleWindow = () => {
        if(props.fullWindow) {
            props.toggleWindow(null)
        } else {
            props.toggleWindow('snake');
        }
    }

    return (
        <div style={{margin: props.fullWindow ? '0 auto' : 0, width: `${props.width}px`, height: `${props.width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', width: '100%'}}>
                {/* <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%'}}> */}
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%'}}>
                    <div id="test" style={{margin: '0 auto', height:`${props.width * .75}`, width:`${(props.width * 2 * .75 / numBoxes) + 2}px`}}>
                        {boxes.map(box => {
                            let boxKey = uuidv4();
                            return (
                                <div key={boxKey} style={{position: 'relative', boxSizing: 'border-box', border: `1px solid ${getColor('border', colorPalette)}`, width: `${props.width * .75 / numBoxes}px`, height: `${props.width * .75 / numBoxes}px`, padding: 0, marginTop: '0', marginBottom: '0', left:`${box.left}%`, backgroundColor: `${box.color}`, borderRadius: `${shape === 'circle' ? '50%' : 0}`}}></div>
                            )
                        })}
                    </div>
                </div>
                <ControlBar toggleWindow={handleToggleWindow} fullWindow={props.fullWindow} disableFullWindow={props.disableFullWindow} setModalContent={props.setModalContent} shape={shape} shapes={['circle', 'square']} changeShape={handleChangeShape} volume={props.volume} changeVolume={handleChangeVolume} palette={colorPalette} setPalette={handleSetColorPalette} minNum={4} maxNum={30} number={numBoxes} setNumber={handleSetNumBoxes} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='Slam' organizedFunction={scatterBoxes} unorganizedFunction={() => organizeBoxes(0)} unorgButton='Scatter' orgButton='Organize' />
            </div>
        </div>
    )
}

export default Snake;