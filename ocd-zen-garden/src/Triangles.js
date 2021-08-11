import React, {useEffect, useRef, useState} from 'react';
import useToggle from './hooks/useToggle';
import { getColor, getSound } from './utils';
import ControlBar from './ControlBar';
import { Howl } from 'howler';

function Triangles(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [numRows, setNumRows] = useState(7);
    const [nextIndex, setNextIndex] = useState(0);
    const [colorPalette, setColorPalette] = useState(props.palette);
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('ding'));

    const createStartingTrianglesArray = () => {
        let triangles = [];
        let bottom = props.width * .33 / (numRows * 1.80)
        for(let i = 1; i < numRows ** 2 + 1; i++) {
            let random = Math.random() * .45 * bottom * .5 + (.55 * bottom *.5);
            let remainder = bottom - random;
            let side = Math.random() > .5 ? 'right' : 'left'
            triangles.push({
                id: i, 
                color: getColor(i, colorPalette),
                bottom: bottom,
                left: side === 'left' ? random : remainder,
                right: side === 'right' ? random : remainder
            })
        }
        return triangles
    }

    const [triangles, setTriangles] = useState(createStartingTrianglesArray());

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            if(nextIndex.id < triangles.length){
                setTimeout(() => {
                    center(nextIndex.id);
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
            let newTriangles = triangles.map(triangle => {
                return {...triangle, color: getColor(triangle.id, props.palette)}
            });
            setColorPalette(props.palette);
            setTriangles(newTriangles);
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

    const center = (idx) => {
        if(idx === 0) toggleIsOrganizing();
        let newTriangles = triangles.map(triangle => {
            if(triangle.id === triangles[idx].id) {
                return {...triangle, left: triangle.bottom / 2, right: triangle.bottom / 2}
            } else {
                return triangle;
            }
        });
        soundPlay(sound);
        setTriangles(newTriangles);
        setNextIndex({id: idx + 1})        
    }

    const uncenter = () => {
        let newTriangles = triangles.map(triangle => {
            let random = Math.random() * .45 * triangle.bottom * .5 + (.55 * triangle.bottom *.5);
            let remainder = triangle.bottom - random;
            let side = Math.random() > .5 ? 'right' : 'left';
            return {
                ...triangle,
                left: side === 'left' ? random : remainder,
                right: side === 'right' ? random : remainder
            }
        })
        setTriangles(newTriangles);
        toggleIsOrganized();
    }

    const handleSetSpeed = time => {
        setSpeed(time);
    }

    const handleSetSound = sound => {
        setSound(getSound(sound));
    }

    const displayTriangles = () => {
        let triangleLines = []
        let newLine = []
        for(let k = 0; k < numRows**2; k++){
            newLine.push(triangles[k]);
            if(newLine.length === numRows){
                triangleLines.push(newLine);
                newLine = []
            }
        }
        return triangleLines;
    }

    return (
        <div>
            <p>Triangle Test</p>
            <div>
                {displayTriangles().map(triangleLine => {
                    return <div>{triangleLine.map(triangle => {
                        return <div style={{display: 'inline-block', borderBottom: `${triangle.bottom}px solid ${triangle.color}`, borderLeft: `${triangle.left}px solid transparent`, borderRight: `${triangle.right}px solid transparent`, height: '0', width: '0', margin: `${props.width * .33 * (1 / 81)}px`}}></div>
                    })}</div>
                })}
                <ControlBar isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='ding' organizedFunction={uncenter} unorganizedFunction={() => center(0)} unorgButton='Uncenter' orgButton='Center'/>
            </div>
        </div>
    )
}

export default Triangles;