import React, { useState, useRef, useEffect } from 'react';
import useToggle from './hooks/useToggle';
import { getColor, getSound } from './utils';
import ControlBar from './ControlBar';
import { Howl } from 'howler';
import { v4 as uuidv4 } from 'uuid';
// import Whoosh from './assets/whoosh.wav';

function Dots(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [nextIndex, setNextIndex] = useState({id: 0, dir: 'vertical'});
    const [numRows, setNumRows] = useState(5);
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('whoosh'));
    const [colorPalette, setColorPalette] = useState(props.palette);
    const [colorUpdating] = useToggle(false);

    // const soundPlay = src => {
    //     const sound = new Howl({
    //         src: src,
    //         sprite: {
    //             whoosh: [3500, 450]
    //         }
    //     });
    //     sound.play('whoosh');
    // }

    const soundPlay = soundObj => {
        const sound = new Howl({
            src: soundObj.src,
            sprite: soundObj.sprite
        });
        sound.play(soundObj.spriteName);
    }

    // const createStartingDotArray = () => {
    //     let startingDotArray = [];
    //     for(let i = 0; i < numRows**2; i++) {
    //         startingDotArray.push({
    //             id: i + 1, 
    //             // marginLeft: `${props.width * .33 * Math.random() * .05}`,
    //             // marginTop: `${props.width * .33 * Math.random() * .05}`,
    //             marginLeft: `${.33 * Math.random() * .05}`,
    //             marginTop: `${.33 * Math.random() * .05}`,
    //             color: (getColor(i + 1, colorPalette))
    //         })
    //     }
    //     return startingDotArray;
    // }

    const createStartingDotArray = num => {
        let startingDotArray = [];
        for(let i = 0; i < num**2; i++) {
            startingDotArray.push({
                id: i + 1, 
                // marginLeft: `${props.width * .33 * Math.random() * .05}`,
                // marginTop: `${props.width * .33 * Math.random() * .05}`,
                marginLeft: `${.33 * Math.random() * .05}`,
                marginTop: `${.33 * Math.random() * .05}`,
                color: (getColor(i + 1, colorPalette))
            })
        }
        return startingDotArray;
    }
    

    const [dots, setDots] = useState(createStartingDotArray(numRows));

    

    // const [dots, setDots] = useState([
    //     {id: 1, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`, color: getColor(1)}, 
    //     {id: 2, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`, color: getColor(2)}, 
    //     {id: 3, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`, color: getColor(3)}, 
    //     {id: 4, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`, color: getColor(4)}, 
    //     {id: 5, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`, color: getColor(5)}, 
    //     {id: 6, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`, color: getColor(6)}, 
    //     {id: 7, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`, color: getColor(7)}, 
    //     {id: 8, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`, color: getColor(8)}, 
    //     {id: 9, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`, color: getColor(9)}, 
    //     {id: 10, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`, color: getColor(10)}, 
    //     {id: 11, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`, color: getColor(11)}, 
    //     {id: 12, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`, color: getColor(12)}, 
    //     {id: 13, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`, color: getColor(13)}, 
    //     {id: 14, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`, color: getColor(14)}, 
    //     {id: 15, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`, color: getColor(15)}, 
    //     {id: 16, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`, color: getColor(16)}, 
    //     {id: 17, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`, color: getColor(17)}, 
    //     {id: 18, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`, color: getColor(18)}, 
    //     {id: 19, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`, color: getColor(19)}, 
    //     {id: 20, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`, color: getColor(20)}, 
    //     {id: 21, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`, color: getColor(21)}, 
    //     {id: 22, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`, color: getColor(22)}, 
    //     {id: 23, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`, color: getColor(23)}, 
    //     {id: 24, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`, color: getColor(14)}, 
    //     {id: 25, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`, color: getColor(25)}]);


    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            if(nextIndex.id < dots.length || nextIndex.dir === 'vertical'){
                setTimeout(() => {
                    organizeDots(nextIndex.id, nextIndex.dir);
                }, speed * .3);
            }
        } else {firstUpdate.current = false}
    // }, [dots])
    }, [nextIndex])
    
    const colorsPropFirstUpdate = useRef(true)
    useEffect(() => {
        if(!colorsPropFirstUpdate.current) {
            let newDots = dots.map(dot => {
                return {...dot, color: getColor(dot.id, props.palette)}
            });
            setColorPalette(props.palette);
            setDots(newDots);
            colorsDoNotUpdate.current = true;
        } else {
            colorsPropFirstUpdate.current = false;
        }
        
    }, [props.palette]);

    const colorsDoNotUpdate = useRef(true)
    useEffect(() => {
        if(!colorsDoNotUpdate.current) {
            console.log('palette rerun')
            let newDots = dots.map(dot => {
                return {...dot, color: getColor(dot.id, colorPalette)}
            });
            setDots(newDots);
        } else {
            colorsDoNotUpdate.current = false;
        }
        
    }, [colorPalette]);
    
    // const numberFirstUpdate = useRef(true);
    // useEffect(() => {
    //     if(!numberFirstUpdate.current) {

    //     } else {
    //         numberFirstUpdate.current = false;
    //     }
    // })

    const handleSetNumRows = num => {
        setNumRows(Number(num));
        setDots(createStartingDotArray(Number(num)))
    }

    // const displayDots = () => {
    //     let dotLines = []
    //     let newLine = []
    //     for(let k = 0; k < dots.length; k++){
    //         newLine.push(dots[k]);
    //         if(newLine.length === 5){
    //             dotLines.push(newLine);
    //             newLine = []
    //         }
    //     }
    //     return dotLines;
    // }

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

    const displayDots = () => {
        let dotLines = []
        let newLine = []
        for(let k = 0; k < numRows**2; k++){
            newLine.push(dots[k]);
            if(newLine.length === numRows){
                dotLines.push(newLine);
                newLine = []
            }
        }
        return dotLines;
    }

    const organizeDots = (idx, dir) => {
        if(idx === 0 && dir === 'horizontal') {
            toggleIsOrganizing();
        }
        let newDots;
        let newDir = dir === 'horizontal' ? 'vertical' : 'horizontal';
        let newIdx = dir === 'horizontal' ? idx : idx + 1
        if(dir === 'horizontal') {
            newDots = dots.map(dot => {
                if(dot.id === dots[idx].id){
                    // return {...dot, marginLeft: `${props.width * .33 * .025 - .5}`}
                    return {...dot, marginLeft: `${.33 * .025}`}
                } else {
                    return dot
                }
            });
        } else {
            newDots = dots.map(dot => {
                if(dot.id === dots[idx].id){
                    // return {...dot, marginTop: `${props.width * .33 * .025 - .5}`}
                    return {...dot, marginTop: `${.33 * .025}`}
                } else {
                    return dot
                }
            });
        };
        soundPlay(sound);
        setDots(newDots);
        setNextIndex({id: newIdx, dir: newDir});
        if(idx + 1 === dots.length && dir === 'horizontal') setTimeout(() => {
            toggleIsOrganized();
            toggleIsOrganizing();
        }, 1000)
    }

    const scatterDots = () => {
        let newDots = dots.map(dot => {
            // return {...dot, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`}
            return {...dot, marginLeft: `${.33 * Math.random() * .05}`, marginTop: `${.33 * Math.random() * .05}`}
        });
        setDots(newDots);
        toggleIsOrganized();
    }

    const handleToggleWindow = () => {
        if(props.fullWindow) {
            props.toggleWindow(null)
        } else {
            props.toggleWindow('dots');
        }
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${props.width / 3}px`, height: `${props.width / 3}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            {/* <div style={{margin: '0 auto'}}> */}
            <div>
                {displayDots().map(dotLine => {
                    let dotLineKey =uuidv4();
                    return <p key={dotLineKey} style={{marginBlockEnd: 0, marginBlockStart: 0, padding: 0, marginBottom: 0, marginTop: 0}}>
                        {dotLine.map(dot => {
                            let dotKey = uuidv4();
                            // return <span key={dotKey} style={{display: 'inline-block', textAlign: 'left', padding: '0px', width: `${props.width * .33 * .10}px`, height: `${props.width * .33 * .10}px`, marginBottom: '0'}}><span style={{display: 'block', border: '1px solid black', borderRadius: '50%', width: `${props.width * .33 * .05}px`, height: `${props.width * .33 * .05}px`, marginLeft: `${dot.marginLeft}px`, marginTop: `${dot.marginTop}px`, backgroundColor: `${dot.color}`}}></span></span>
                            return <span key={dotKey} style={{display: 'inline-block', textAlign: 'left', padding: '0px', width: `${props.width * .33 * .10}px`, height: `${props.width * .33 * .10}px`, marginBottom: '0'}}><span style={{display: 'block', border: `1px solid ${getColor('border', colorPalette)}`, borderRadius: '50%', width: `${props.width * .33 * .05}px`, height: `${props.width * .33 * .05}px`, marginLeft: `${dot.marginLeft * props.width - .5}px`, marginTop: `${dot.marginTop * props.width - .5}px`, backgroundColor: `${dot.color}`}}></span></span>
                        })}
                    </p>
                })}
                {/* <button onClick={isOrganized ? scatterDots : () => organizeDots(0, 'horizontal')}>{isOrganized ? 'Scatter' : 'Organize'}</button> */}
                <ControlBar toggleWindow={handleToggleWindow} fullWindow={props.fullWindow} palette={colorPalette} setPalette={handleSetColorPalette} minNum={4} maxNum={8} number={numRows} setNumber={handleSetNumRows} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='whoosh' organizedFunction={scatterDots} unorganizedFunction={() => organizeDots(0, 'horizontal')} unorgButton='Scatter' orgButton='Organize' />
            </div>
        </div>
    )
}

export default Dots;