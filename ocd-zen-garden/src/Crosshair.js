import React, { useEffect, useRef, useState } from 'react';
import useToggle from './hooks/useToggle';
import { getColor, getSound } from './utils';
import ControlBar from './ControlBar';
import { Howl } from 'howler';


function Crosshair(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [nextIndex, setNextIndex] = useState(0);
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('Robot'));
    const [colorPalette, setColorPalette] = useState(props.palette);
    const [numRings, setNumRings] = useState(6);
    const [userJustChangedNumber, toggleUserJustChangedNumber] = useToggle(props.id === 1 ? false : props.userJustChangedNumber)

    const createStartingRingArray = num => {
        let rings = [];
        for(let i = 1; i <= num; i++) {
            rings.push({
                // missingEdges: randomEdges[Math.ceil(Math.random() * 4)]
                id: i,
                color: getColor(i, colorPalette),
                rotation: Math.random() * 360
            })
        }
        return rings;
    }

    const [rings, setRings] = useState(createStartingRingArray(numRings));

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
            if(nextIndex < rings.length){
                setTimeout(()=>{
                    align(nextIndex);
                }, speed);
            }
        } else {
            firstUpdate.current = false;
        }     
    }, [nextIndex]);

    const colorFirstUpdate = useRef(true);
    useEffect(() => {
        if(!colorFirstUpdate.current) {
            let newRings = rings.map(ring => {
                return {...ring, color: getColor(ring.id, props.palette)}
            });
            setColorPalette(props.palette);
            setRings(newRings);
            colorsDoNotUpdate.current = true;
        } else {
            colorFirstUpdate.current = false;
        }
    }, [props.palette]);

    const colorsDoNotUpdate = useRef(true)
    useEffect(() => {
        if(!colorsDoNotUpdate.current) {
            let newRings = rings.map(ring => {
                return {...ring, color: getColor(ring.id, colorPalette)}
            });
            setRings(newRings);
        } else {
            colorsDoNotUpdate.current = false;
        }
        
    }, [colorPalette]);


    const align = (idx) => {
        if(idx === 0) {
            toggleIsOrganizing();
        }
        let newRings = rings.map(ring => {
            if(ring.id === rings[idx].id) {
                // ring.rotation = ring.rotation > 180 ? 360 : 0
                ring.rotation = 0
            }
            return ring;
            
        });

        soundPlay(sound);
        setRings(newRings);
        setNextIndex(idx + 1);
        if(idx + 1 === rings.length) setTimeout(() => {
            toggleIsOrganized();
            toggleIsOrganizing();
        }, speed)
    }

    const spin = () => {
        let newRings = rings.map(ring => {
            return {...ring, rotation: Math.random() * 360}
        })
        setRings(newRings);
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

    const handleSetNumRings = num => {
        setNumRings(Number(num));
        setRings(createStartingRingArray(Number(num)))
    }


    const handleToggleWindow = () => {
        if(props.fullWindow) {
            props.toggleWindow(null)
        } else {
            props.toggleWindow('crosshair');
        }
    }

    const display = (id) => {
        let ringSize = `${id === 1 ? `${.6 * props.width}` : `${(.6 - (id - 1) * (.6 / numRings)) * props.width}`}`;
        if(id <= numRings) {
            return (
                // <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', border: `1px solid ${getColor(id, colorPalette)}`, height: `${id === 1 ? '70%' : `${70 - (70 / numEdges)}`}`, width: `${width}px`}}>{display(id + 1, width / 2)}</div>
                <div style={{
                    margin: '0 auto',
                    zIndex: `${id}`,
                    position: 'relative', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    backgroundColor: `${getColor('base', colorPalette)}`,
                    border: `2px solid ${rings[id - 1].color}`,
                    borderRadius: '50%',
                    transform: `rotate(${rings[id - 1].rotation}deg)`,
                    height: `${ringSize}px`, 
                    width: `${ringSize}px`}}>
                        {/* <div style={{position: 'absolute', zIndex: `${id}`, height: `${ringSize}px`, width: `${ringSize}px`}}>
                            <div style={{position: 'absolute', width: '100%', height: '50%', zIndex: `${id}`}}>
                                <div style={{position: 'relative', display: 'inline-block', width: `${ringSize * .5 - 1}px`, zIndex: `${id}`, height: `${ringSize * .5 - 1}px`, borderBottom: '1px solid black', borderRight: '1px solid black'}}></div>
                                <div style={{position: 'relative', display: 'inline-block', width: `${ringSize * .5 - 1}px`, zIndex: `${id}`, height: `${ringSize * .5 - 1}px`, borderBottom: '1px solid black', borderLeft: '1px solid black'}}></div>
                            </div>
                            <div style={{position: 'absolute', width: '100%', height: '50%', top: `${ringSize * .5}px`, zIndex: `${id}`}}>
                                <div style={{position: 'relative', display: 'inline-block', width: `${ringSize * .5 - 1}px`, zIndex: `${id}`, height: `${ringSize * .5 - 1}px`, borderTop: '1px solid black', borderRight: '1px solid black'}}></div>
                                <div style={{position: 'relative', display: 'inline-block', width: `${ringSize * .5 - 1}px`, zIndex: `${id}`, height: `${ringSize * .5 - 1}px`, borderTop: '1px solid black', borderLeft: '1px solid black'}}></div>
                            </div>
                        </div> */}
                        <div className="line-container" style={{position: 'absolute', zIndex: `${id}`, height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <hr style={{position: 'absolute', height: '100%', borderColor: 'black'}}/>
                            <hr style={{position: 'absolute', height: '100%', borderColor: 'black', transform: 'rotate(90deg)'}}/>
                        </div>
                        {/* <div style={{position: 'absolute', zIndex: `${id}`, height: `${ringSize}px`, width: `${ringSize}px`, border: '1px solid black'}}>
                            <div style={{position: 'absolute', width: '100%', height: '50%', zIndex: `${id}`}}>
                                <div style={{position: 'relative', display: 'inline-block', width: `${ringSize * .5 - 2}px`, zIndex: `${id}`, height: `${ringSize * .5 - 2}px`, borderBottom: '1px solid blue', borderRight: '1px solid blue'}}></div>
                                <div style={{position: 'relative', display: 'inline-block', width: `${ringSize * .5 - 2}px`, zIndex: `${id}`, height: `${ringSize * .5 - 2}px`, borderBottom: '1px solid green', borderLeft: '1px solid green'}}></div>
                            </div>
                            <div style={{position: 'absolute', width: '100%', height: '50%', top: `${ringSize * .5}px`, zIndex: `${id}`}}>
                                <div style={{position: 'relative', display: 'inline-block', width: `${ringSize * .5 - 2}px`, zIndex: `${id}`, height: `${ringSize * .5 - 2}px`, borderTop: '1px solid orange', borderRight: '1px solid orange'}}></div>
                                <div style={{position: 'relative', display: 'inline-block', width: `${ringSize * .5 - 2}px`, zIndex: `${id}`, height: `${ringSize * .5 - 2}px`, borderTop: '1px solid purple', borderLeft: '1px solid purple'}}></div>
                            </div>
                        </div> */}
                        {display(id + 1)}
                    </div>
            )
        }
        // return <div style={{
        //     position: 'relative',
        //     margin: '0 auto',
        //     width: '300px',
        //     height: '300px',
        //     border: '1px solid black',
        //     borderRadius: '50%',
        //     zIndex: '1',
        //     backgroundColor: 'green'
        // }}>
        //     <div style={{
                // position: 'absolute',
                // margin: 'none',
                // width: '300px',
                // height: '150px',
                // zIndex: '1'
        //     }}>
        //         <div style={{
        //             position: 'relative',
        //             width: '149px',
        //             height: '149px',
        //             borderBottom: '1px solid red',
        //             borderRight: '1px solid red',
        //             display: 'inline-block',
        //             zIndex: '1'
        //         }}></div>
        //         <div style={{
        //             position: 'relative',
        //             width: '148px',
        //             height: '148px',
        //             borderLeft: '1px solid red',
        //             borderBottom: '1px solid red',
        //             display: 'inline-block',
        //             zIndex: '1'
        //         }}></div>
        //     </div>
        //     <div style={{
        //         position: 'absolute',
        //         top: '50%',
        //         width: '300px',
        //         height: '150px',
        //         zIndex: '1'
        //     }}>
        //         <div style={{
        //             position: 'relative',
        //             width: '148px',
        //             height: '148px',
        //             borderTop: '1px solid red',
        //             borderRight: '1px solid red',
        //             display: 'inline-block',
        //             zIndex: '1'
        //         }}></div>
        //         <div style={{
        //             position: 'relative',
        //             width: '148px',
        //             height: '148px',
        //             borderLeft: '1px solid red',
        //             borderTop: '1px solid red',
        //             display: 'inline-block',
        //             zIndex: '1',
        //             marginBottom: '0',
        //         }}></div>
        //     </div>
        //     <div style={{
        //             top: '25px',
        //             position: 'relative',
        //             width: '250px',
        //             height: '250px',
        //             zIndex: '2',
        //             backgroundColor: 'blue',
        //             border: '1px solid blue',
        //             opacity: '1',
        //             margin: '0 auto',
        //             borderRadius: '50%',
        //         }}></div>
        // </div>
    }

    return (
        <div style={{margin: props.fullWindow ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${props.width}px`, height: `${props.width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%'}}>
                    <div>
                        {display(1)}
                    </div>
                </div>
            <ControlBar toggleWindow={handleToggleWindow} fullWindow={props.fullWindow} disableFullWindow={props.disableFullWindow} volume={props.volume} changeVolume={handleChangeVolume} palette={colorPalette} setPalette={handleSetColorPalette} setNumber={handleSetNumRings} minNum={4} maxNum={20} number={numRings} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='Ding' organizedFunction={spin} unorganizedFunction={() => align(0)} unorgButton='Spin' orgButton='Align' />

            </div>
        </div>
        
    )
}

export default Crosshair;