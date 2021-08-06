import React, {useEffect, useRef, useState} from 'react';
import useToggle from './hooks/useToggle';
import { getColor, getSound } from './utils';
import ControlBar from './ControlBar';
import { Howl } from 'howler';

function Squares(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [nextIndex, setNextIndex] = useState({id: 0, dir: 'topLeft'});
    const [colorPalette, setColorPalette] = useState(props.palette);
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('ding'));

    const createStartingSquaresArray = num => {
        let squares = [];
        for(let i = 1; i < num; i++) {
            squares.push({
                id: i, 
                color: getColor(i, colorPalette),
                topLeft: Math.random() * 15,
                topRight: Math.random() * 15,
                bottomLeft: Math.random() * 15,
                bottomRight: Math.random() * 15,
            })
        }
        return squares
    }

    const getNextDir = dir => {
        switch(dir) {
            case 'topLeft':
                return 'topRight'
            case 'topRight':
                return 'bottomLeft'
            case 'bottomLeft':
                return 'bottomRight'
            case 'bottomRight':
                return 'topLeft'
        }
    }

    const [squares, setSquares] = useState(createStartingSquaresArray(7));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            if(nextIndex.id < squares.length || nextIndex.dir !== 'topLeft'){
                setTimeout(() => {
                    sharpen(nextIndex.id, nextIndex.dir);
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
            let newSquares = squares.map(square => {
                return {...square, color: getColor(square.id, props.palette)}
            });
            setColorPalette(props.palette);
            setSquares(newSquares);
        } else {
            colorsFirstUpdate.current = false;
        }
        
    }, [props.palette]);

    const soundPlay = soundObj => {
        const sound = new Howl({
            src: soundObj.src,
            sprite: soundObj.sprite
        });
        sound.play(soundObj.spriteName);
    }

    const sharpen = (idx, dir) => {
        if(idx === 0 && dir === 'topLeft') toggleIsOrganizing();
        let newSquares = squares.map(square => {
            if(square.id === squares[idx].id) {
                return {...square, [dir]: 0}
            } else {
                return square;
            }
        });
        soundPlay(sound);
        setSquares(newSquares);
        setNextIndex({id: dir === 'bottomRight' ? idx + 1 : idx, dir: getNextDir(dir)})        
    }

    const dull = () => {
        let newSquares = squares.map(square => {
            return {...square, topLeft: Math.random() * 15, topRight: Math.random() * 15, bottomLeft: Math.random() * 15, bottomRight: Math.random() * 15}
        })
        setSquares(newSquares);
        toggleIsOrganized();
    }

    const handleSetSpeed = time => {
        setSpeed(time);
    }

    const handleSetSound = sound => {
        setSound(getSound(sound));
    }

    return (
        <div>
            <p>Squares Test</p>
            <div>
                {squares.map(square => {
                    return <div style={{display: 'inline-block', backgroundColor:`${square.color}`, border: '1px solid black', borderRadius: `${square.topLeft}% ${square.topRight}% ${square.bottomRight}% ${square.bottomLeft}%`, width: `${props.width * .33 * (1 / 9)}px`, height: `${props.width * .33 * (1 / 9)}px`, margin: `${props.width * .33 * (1 / 81)}px`}}></div>
                })}
                <ControlBar isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='ding' organizedFunction={dull} unorganizedFunction={() => sharpen(0, 'topLeft')} unorgButton='Dull' orgButton='Sharpen'/>
            </div>
        </div>
    )
}

export default Squares;