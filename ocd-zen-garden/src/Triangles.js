import React, {useEffect, useRef, useState} from 'react';
import { useSelector } from 'react-redux';
import useToggle from './hooks/useToggle';
import { v4 as uuidv4 } from 'uuid';
import { getColor, getSound, scaler, soundPlay } from './utils';
import ControlBar from './ControlBar';
import { Howl } from 'howler';

function Triangles(props) {
    const palette = useSelector((state) => state.palette.palette);
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [numRows, setNumRows] = useState(7);
    const [nextIndex, setNextIndex] = useState(0);
    const [colorPalette, setColorPalette] = useState(palette);
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('Chirp'));
    const [proportionalVolume, setProportionalVolume] = useState('proportional');


    const createStartingTrianglesArray = num => {
        let triangles = [];
        for(let i = 1; i < num ** 2 + 1; i++) {
            let random = .05 + Math.random() * .45
            let remainder = 1 - random;
            let side = Math.random() > .5 ? 'right' : 'left'
            triangles.push({
                id: i, 
                color: getColor(i, colorPalette),
                left: side === 'left' ? random : remainder,
                right: side === 'right' ? random : remainder,
                volumeMultiplier: scaler(.5, .95, .002, .01, remainder),
                key: uuidv4()
            })
        }
        return triangles
    }

    const [triangles, setTriangles] = useState(createStartingTrianglesArray(numRows));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            if(nextIndex < triangles.length){
                setTimeout(() => {
                    center(nextIndex);
                }, speed);
            } else {
                toggleIsOrganizing();
                toggleIsOrganized();
                props.setNumOrganizing(-1);
            }
        } else {firstUpdate.current = false}
    }, [nextIndex])
    
    const colorsFirstUpdate = useRef(true)
    useEffect(() => {
        if(!colorsFirstUpdate.current) {
            let newTriangles = triangles.map(triangle => {
                return {...triangle, color: getColor(triangle.id, palette)}
            });
            setColorPalette(palette);
            setTriangles(newTriangles);
            colorsDoNotUpdate.current = true;
        } else {
            colorsFirstUpdate.current = false;
        }
        
    }, [palette]);

    const colorsDoNotUpdate = useRef(true)
    useEffect(() => {
        if(!colorsDoNotUpdate.current) {
            let newTriangles = triangles.map(triangle => {
                return {...triangle, color: getColor(triangle.id, colorPalette)}
            });
            setTriangles(newTriangles);
        } else {
            colorsDoNotUpdate.current = false;
        }
        
    }, [colorPalette]);

    // const soundPlay = soundObj => {
    //     const sound = new Howl({
    //         src: soundObj.src,
    //         sprite: soundObj.sprite,
    //         volume: props.volume * .01
    //     });
    //     sound.play(soundObj.spriteName);
    // }

    const center = (idx) => {
        if(idx === 0) {
            toggleIsOrganizing();
            props.setNumOrganizing(1);
        }
        let newTriangles = triangles.map(triangle => {
            if(triangle.id === triangles[idx].id) {
                return {...triangle, left: .5, right: .5}
            } else {
                return triangle;
            }
        });
        soundPlay(sound, triangles[idx].volumeMultiplier, props.volume, proportionalVolume);
        setTriangles(newTriangles);
        setNextIndex(idx + 1)        
    }

    const uncenter = () => {
        let newTriangles = triangles.map(triangle => {
            let random = .05 + Math.random() * .45
            let remainder = 1 - random;
            let side = Math.random() > .5 ? 'right' : 'left';
            return {
                ...triangle,
                left: side === 'left' ? random : remainder,
                right: side === 'right' ? random : remainder,
                volumeMultiplier: scaler(.5, .95, .002, .01, remainder),
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

    const handleSetNumRows = num => {
        setNumRows(Number(num));
        setTriangles(createStartingTrianglesArray(Number(num)))
    }

    const handleSetColorPalette = palette => {
        colorsDoNotUpdate.current = false;
        setColorPalette(palette);
    }

    const handleChangeVolume = volume => {
        props.changeVolume(volume);
    }

    const handleChangeProportionalVolume = selection => {
        setProportionalVolume(selection);
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
        <div style={{margin: props.fullWindow ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${props.width}px`, height: `${props.width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%'}}>
                    <div>
                        {displayTriangles().map(triangleLine => {
                            let lineKey = uuidv4()
                            return <div key={lineKey} style={{height: `${props.width / (numRows * 1.4)}px`, width: `${props.width}px`}}>{triangleLine.map(triangle => {
                                let bottom = props.width / (numRows * 1.80)
                                return <div key={triangle.key} style={{display: 'inline-block', borderBottom: `${bottom + 1.5}px solid ${getColor('border', colorPalette)}`, borderLeft: `${triangle.left * bottom + 1.5}px solid transparent`, borderRight: `${triangle.right * bottom + 1.5}px solid transparent`, height: '0', width: '0', margin: `${props.width * (1 / 81)}px`}}><div style={{position: 'relative', display: 'inline-block', borderBottom: `${bottom}px solid ${triangle.color}`, borderLeft: `${triangle.left * bottom}px solid transparent`, borderRight: `${triangle.right * bottom}px solid transparent`, height: '0', width: '0', right:`${triangle.left * bottom}px`, top:'.75px'}}></div></div>
                            })}</div>
                        })}
                    </div>
                </div>
                <ControlBar width={props.width} piece='triangles' loggedIn={props.loggedIn} setNumOrganizing={props.setNumOrganizing} toggleHighlightUserIcon={props.toggleHighlightUserIcon} disableFullWindow={props.disableFullWindow}  setModalContent={props.setModalContent} volume={props.volume} changeVolume={handleChangeVolume} changeProportionalVolume={handleChangeProportionalVolume} proportionalVolume={proportionalVolume} palette={colorPalette} setPalette={handleSetColorPalette} minNum={3} maxNum={12} number={numRows} setNumber={handleSetNumRows} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='Chirp' organizedFunction={uncenter} unorganizedFunction={() => center(0)} unorgButton='Uncenter' orgButton='Center'/>
            </div>
        </div>
    )
}

export default Triangles;