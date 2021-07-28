import React, { useState, useRef, useEffect } from 'react';
import useToggle from './hooks/useToggle';
import { getColor } from './utils';
import ControlBar from './ControlBar';

function Dots(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [nextIndex, setNextIndex] = useState({id: 0, dir: 'vertical'});
    const [numRows, setNumRows] = useState(5);
    const [speed, setSpeed] = useState(1000);
    const [colorPalette, setColorPalette] = useState(props.palette);
    const [colorUpdating] = useToggle(false);

    const createStartingDotArray = () => {
        let startingDotArray = [];
        for(let i = 0; i < numRows**2; i++) {
            startingDotArray.push({
                id: i + 1, 
                marginLeft: `${props.width * .33 * Math.random() * .05}`,
                marginTop: `${props.width * .33 * Math.random() * .05}`,
                color: (getColor(i + 1, colorPalette))
            })
        }
        return startingDotArray;
    }
    

    const [dots, setDots] = useState(createStartingDotArray());

    

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
    
    const colorsFirstUpdate = useRef(true)
    useEffect(() => {
        if(!colorsFirstUpdate.current) {
            let newDots = dots.map(dot => {
                return {...dot, color: getColor(dot.id, props.palette)}
            });
            setColorPalette(props.palette);
            setDots(newDots);
        } else {
            colorsFirstUpdate.current = false;
        }
        
    }, [props.palette]);

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
        let newDots;
        let newDir = dir === 'horizontal' ? 'vertical' : 'horizontal';
        let newIdx = dir === 'horizontal' ? idx : idx + 1
        if(dir === 'horizontal') {
            newDots = dots.map(dot => {
                if(dot.id === dots[idx].id){
                    return {...dot, marginLeft: `${props.width * .33 * .025 - .5}`}
                } else {
                    return dot
                }
            });
        } else {
            newDots = dots.map(dot => {
                if(dot.id === dots[idx].id){
                    return {...dot, marginTop: `${props.width * .33 * .025 - .5}`}
                } else {
                    return dot
                }
            });
        }
        setDots(newDots);
        setNextIndex({id: newIdx, dir: newDir});
        if(idx + 1 === dots.length && dir === 'horizontal') setTimeout(() => toggleIsOrganized(), 1000)
    }

    const scatterDots = () => {
        let newDots = dots.map(dot => {
            return {...dot, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`}
        });
        setDots(newDots);
        toggleIsOrganized()
    }

    return (
        <div style={{width: '100%', border: '1px solid black'}}>
            <p>Dots Test</p>
            <div style={{margin: '0 auto'}}>
                {displayDots().map(dotLine => {
                    return <p style={{marginBlockEnd: 0, marginBlockStart: 0, padding: 0, marginBottom: 0, marginTop: 0}}>
                        {dotLine.map(dot => {
                            return <span style={{display: 'inline-block', textAlign: 'left', padding: '0px', width: `${props.width * .33 * .10}px`, height: `${props.width * .33 * .10}px`, marginBottom: '0'}}><span style={{display: 'block', border: '1px solid black', borderRadius: '50%', width: `${props.width * .33 * .05}px`, height: `${props.width * .33 * .05}px`, marginLeft: `${dot.marginLeft}px`, marginTop: `${dot.marginTop}px`, backgroundColor: `${dot.color}`}}></span></span>
                        })}
                    </p>
                })}
                {/* <button onClick={isOrganized ? scatterDots : () => organizeDots(0, 'horizontal')}>{isOrganized ? 'Scatter' : 'Organize'}</button> */}
                <ControlBar isOrganized={isOrganized} setSpeed={handleSetSpeed} organizedFunction={scatterDots} unorganizedFunction={() => organizeDots(0, 'horizontal')} unorgButton='Scatter' orgButton='Organize' />
            </div>
        </div>
    )
}

export default Dots;