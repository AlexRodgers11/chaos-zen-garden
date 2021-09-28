import React, { useEffect, useRef, useState} from 'react';
import useToggle from './hooks/useToggle';
import { getColor, getSound } from './utils';
import ControlBar from './ControlBar';
import { Howl } from 'howler';
import { v4 as uuidv4 } from 'uuid';
import { BsArchive } from 'react-icons/bs';

function Rainbow(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [colorPalette, setColorPalette] = useState(props.palette);
    const [nextIdx, setNextIdx] = useState();
    const [numArcs, setNumArcs] = useState(12);
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('Sparkle'));

    const soundPlay = soundObj => {
        const sound = new Howl({
            src: soundObj.src,
            sprite: soundObj.sprite,
            volume: props.volume * .01
        });
        sound.play(soundObj.spriteName);
    }
    
    const createStartingArcsArray = num => {
        let startingArcArray = [];
        for(let i = 0; i < num; i++) {
            startingArcArray.push({
                id: i + 1,
                color: getColor(i + 1, colorPalette),
                offset: Math.random() * 10 * (i % 2 === 0 ? 1 : -1)
            })
        }
        return startingArcArray;
    }

    const [arcs, setArcs] = useState(createStartingArcsArray(numArcs));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current && nextIdx > 0) {
            setTimeout(() => {
                align(nextIdx)
            }, speed)
        } else {
            firstUpdate.current = false;
        }
    }, [nextIdx]);

    const colorsFirstUpdate = useRef(true)
    useEffect(() => {
        if(!firstUpdate.current) {
            let newArcs = arcs.map(arc => {
                return {...arc, color: getColor(arc.id, props.palette), color2: getColor(arc.id + 1, colorPalette)}
            });
            setArcs(newArcs);
            setColorPalette(props.palette);
            colorsDoNotUpdate.current = true;
        } else {
            colorsFirstUpdate.current = false;
        }
    }, [props.palette]);

    const colorsDoNotUpdate = useRef(true)
    useEffect(() => {
        if(!colorsDoNotUpdate.current) {
            let newArcs = arcs.map(arc => {
                return {...arc, color: getColor(arc.id, colorPalette), color2: getColor(arc.id + 1, colorPalette)}
            });
            setArcs(newArcs);
        } else {
            colorsDoNotUpdate.current = false;
        }
        
    }, [colorPalette]);

    const align = idx => {
        if(idx === arcs.length - 1) {
            toggleIsOrganizing();
        }
        let newArcs = arcs.map(arc => {
            if(arcs[idx].id === arc.id) {
                return {...arc, offset: 0}
            } else {
                return arc;
            }
        });
        soundPlay(sound);
        setArcs(newArcs);
        setNextIdx(idx - 1);
        if(idx - 1 === 0) {
            setTimeout(() => {
                toggleIsOrganized();
                toggleIsOrganizing();
            }, speed);
        }
    }

    const shift = () => {
        let newArcs = arcs.map(arc => {
            return {...arc, offset: Math.random() * 10 * ((arc.id - 2) % 2 === 0 ? 1 : -1)}
        })
        setArcs(newArcs);
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

    const handleToggleWindow = () => {
        if(props.fullWindow) {
            props.toggleWindow(null)
        } else {
            props.toggleWindow('rainbow');
        }
    }

    const handleSetNumArcs = num => {
        setNumArcs(Number(num));
        setArcs(createStartingArcsArray(Number(num)))
    }

    const displayArcs = (num, width) => {
        // console.log(`num: ${num}, width: ${width}, borderWidth: ${(props.width * .6) / (4 * numArcs)}`);
        if(num < arcs.length) {
            return (
                <div style={{
                    display: 'flex', 
                    position: 'relative',
                    left: `${num !== 0 ? arcs[num].offset : 0}%`,
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    width: `${width}px`, 
                    height: `${width}px`, 
                    border: `${(props.width * .7) / (4 * numArcs)}px solid ${arcs[num].color}`, 
                    borderRadius: '50%'}}
                >
                    {displayArcs(num + 1, width - (2 * (props.width * .7) / (4 * numArcs)))}
                </div>
            )
        }
    }
    // const displayArcs = (num, widthMultiplier) => {
    //     console.log(`num: ${num}, widthMultiplier: ${widthMultiplier}, borderWidth: ${(props.width * .6) / (4 * numArcs)}`);
    //     // if(num === arcs.length) {
    //     //     return (
    //     //         <div style={{
    //     //             display: 'flex', 
    //     //             alignItems: 'center', 
    //     //             justifyContent: 'center', 
    //     //             width: `${props.width * widthMultiplier}px`, 
    //     //             height: `${props.width * widthMultiplier}px`, 
    //     //             border: `${(props.width * .6) / (4 * numArcs)}px solid black`, 
    //     //             // border: `${((props.width * .6) / 3) / numArcs}px solid ${arcs[num].color}`, 
    //     //             borderRadius: '50%'}}
    //     //         >
    //     //             {/* {displayArcs(num + 1, widthMultiplier - (2 * ((props.width * .6) / 3) / numArcs))} */}
    //     //             {displayArcs(num + 1, widthMultiplier - (props.width * .6) / (4 * numArcs))}
    //     //         </div>
    //     //     )
    //     // } else if(num < arcs.length) {
    //     if(num < arcs.length) {
    //         return (
    //             <div style={{
    //                 display: 'flex', 
    //                 alignItems: 'center', 
    //                 justifyContent: 'center', 
    //                 width: `${props.width * widthMultiplier}px`, 
    //                 height: `${props.width * widthMultiplier}px`, 
    //                 border: `${(props.width * .6) / (4 * numArcs)}px solid ${arcs[num].color}`, 
    //                 // border: `${((props.width * .6) / 3) / numArcs}px solid ${arcs[num].color}`, 
    //                 borderRadius: '50%'}}
    //             >
    //                 {/* {displayArcs(num + 1, widthMultiplier - (2 * ((props.width * .6) / 3) / numArcs))} */}
    //                 {displayArcs(num + 1, widthMultiplier - (props.width * .6) / (4 * numArcs))}
    //             </div>
    //         )
    //     }
    // }




    // const displayArcs = (num, widthMultiplier) => {
        
    //     if(num < arcs.length) {
    //         return (
    //             <div style={{
    //                 display: 'flex', 
    //                 alignItems: 'center', 
    //                 justifyContent: 'center', 
    //                 width: `${props.width * widthMultiplier}px`, 
    //                 height: `${props.width * widthMultiplier }px`, 
    //                 border: `${props.width * .025}px solid ${arcs[num].color}`, 
    //                 // border: `${((props.width * .6) / 3) / numArcs}px solid ${arcs[num].color}`, 
    //                 borderRadius: '50%'}}
    //             >
    //                 {/* {displayArcs(num + 1, widthMultiplier - (2 * ((props.width * .6) / 3) / numArcs))} */}
    //                 {displayArcs(num + 1, widthMultiplier - .05)}
    //             </div>
    //         )
    //     }
    // }

    return (
        <div style={{margin: props.fullWindow ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${props.width}px`, height: `${props.width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div className="putinhere" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                    {/* <div> */}
                        {/* {arcs.map(arc => {
                            let arcKey = uuidv4();
                            return <div key={arcKey} style={{display: 'inarc-block', width: `${props.width * .65 / ((numArcs * 3) + 1.5)}px`, border: `.75px solid ${getColor('border', colorPalette)}`, height: .55 * props.width, margin: `${props.width * .65 * 1.35 / ((numArcs * 3) + 1.5)}px`, backgroundColor: `${arc.color}`}}><div style={{width: '100%', height: `${arc.topPercent}%`, backgroundColor: '#303030', borderBottom: `1px solid ${getColor('border', colorPalette)}`}}></div></div>
                        })} */}
                   {/* <div style={{width: '600px', height: '300px', borderTop: '30px solid black', borderLeft: '30px solid black', borderRight: '30px solid black', borderRadius: '450px 450px 0 0'}}></div> */}
                        {/* <div style={{width: props.width * .8, height: props.width * .4, borderTop: `${props.width * .01}px solid black`, borderLeft: `${props.width * .01}px solid black`, borderRight: `${props.width * .01}px solid black`, borderRadius: `${props.width * (.6 - .02)}px ${props.width * (.6 - .02)}px 0 0`}}>
                            <div style={{position: 'relative', top: `${props.width * .02}px`, width: props.width * (.8 - .02), height: props.width * (.4 - .02), borderTop: `${props.width * .01}px solid blue`, borderLeft: `${props.width * .01}px solid blue`, borderRight: `${props.width * .01}px solid blue`, borderRadius: `${props.width * (.6 - .02)}px ${props.width * (.6 - .02)}px 0 0`}}></div>
                        </div> */}
                        <div className="wrapper" style={{display: 'flex', justifyContent: 'center', width: `100%`, height: `${props.width * .35}px`, overflow: 'hidden' }}>
                        {/* <div className="wrapper" style={{position: 'relative', display: 'flex', justifyContent: 'center', width: `100%`, height: `${props.width * .3}px`, overflow: 'hidden' }}> */}
                            {/* <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: `${props.width * .6}px`, height: `${props.width * .6 }px`, border: `${props.width * .025}px solid red`, borderRadius: '50%'}}>
                                <div style={{position: 'relative', right: '75px',width: `${props.width * (.6 - .05)}px`, height: `${props.width * (.6 - .05)}px`, border: `${props.width * .025}px solid orange`, borderRadius: '50%'}}>
                                    <div style={{position: 'relative', left: '5px', width: `${props.width * (.6 - .1)}px`, height: `${props.width * (.6 - .1)}px`, border: `${props.width * .025}px solid yellow`, borderRadius: '50%'}}>
                                        <div style={{position: 'relative', right: '10px',width: `${props.width * (.6 - .15)}px`, height: `${props.width * (.6 - .15)}px`, border: `${props.width * .025}px solid green`, borderRadius: '50%'}}>
                                        <div style={{position: 'relative', left: '40px',width: `${props.width * (.6 - .2)}px`, height: `${props.width * (.6 - .2)}px`, border: `${props.width * .025}px solid blue`, borderRadius: '50%'}}>
                                        <div style={{position: 'relative', left: '25px', width: `${props.width * (.6 - .25)}px`, height: `${props.width * (.6 - .25)}px`, border: `${props.width * .025}px solid purple`, borderRadius: '50%'}}></div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {displayArcs(0, props.width * .7)}
                        </div>
                    
                    {/* </div> */}
                </div>
                <ControlBar toggleWindow={handleToggleWindow} fullWindow={props.fullWindow} disableFullWindow={props.disableFullWindow} setModalContent={props.setModalContent} volume={props.volume} changeVolume={handleChangeVolume} palette={colorPalette} setPalette={handleSetColorPalette} setNumber={handleSetNumArcs} minNum={7} maxNum={25} number={numArcs} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='Sparkle' organizedFunction={shift} unorganizedFunction={() => align(arcs.length - 1)} unorgButton='Shift' orgButton='Align' />

            </div>
        </div>
    )
}

export default Rainbow;