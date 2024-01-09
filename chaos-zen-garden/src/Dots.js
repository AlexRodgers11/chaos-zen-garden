import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import useGardenSpecs from './hooks/useGardenSpecs';
// import usePieceSpecs from './hooks/usePieceSpecs';
import usePieceSpecs from './hooks/usePieceSpecs';
import { sizeActions } from './store/size';
import { organizingCounterActions } from './store/organizing-counter';
import { getColor, scaler, soundPlay } from './utils';
import ControlBar from './ControlBar/ControlBar';
import { v4 as uuidv4 } from 'uuid';
import './color-themes.css';
import './Dots.css';

function Dots(props) {
    const palette = useSelector((state) => state.palette.palette);
    const [colorPalette, setColorPalette] = useState(palette);
    const [width, volume, fullView, dispatch] = useGardenSpecs();
    const pieceSpecs = usePieceSpecs({id: 0, dir: 'vertical'}, props.number, props.proportionalVolume, props.shape, props.sound, props.speed, props.text);


    const createStartingDotArray = num => {
        let startingDotArray = [];
        for(let i = 0; i < num**2; i++) {
            let leftOffset  = (Math.random() * 60 + 5) * (Math.random() > .5 ? -1 : 1);
            let topOffset = (Math.random() * 60 + 5) * (Math.random() > .5 ? -1 : 1);
            startingDotArray.push({
                id: i + 1, 
                marginLeft: leftOffset,
                marginTop: topOffset,
                color: (getColor(i + 1, colorPalette)),
                key: uuidv4(),
                leftVolumeMultiplier: scaler(5, 65, .0015, .01, Math.abs(leftOffset)),
                topVolumeMultiplier: scaler(5, 65, .0015, .01, Math.abs(topOffset))
            })
        }
        return startingDotArray;
    }
    

    const [dots, setDots] = useState(createStartingDotArray(pieceSpecs.number));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            if(pieceSpecs.nextIndex.id < dots.length || pieceSpecs.nextIndex.dir === 'vertical'){
                setTimeout(() => {
                    organizeDots(pieceSpecs.nextIndex.id, pieceSpecs.nextIndex.dir);
                }, pieceSpecs.speed * .75);
            }
        } else {firstUpdate.current = false}
    }, [pieceSpecs.nextIndex])
    
    const colorsPropFirstUpdate = useRef(true)
    useEffect(() => {
        if(!colorsPropFirstUpdate.current) {
            let newDots = dots.map(dot => {
                return {...dot, color: getColor(dot.id, palette)}
            });
            setColorPalette(palette);
            setDots(newDots);
            colorsDoNotUpdate.current = true;
        } else {
            colorsPropFirstUpdate.current = false;
        }
        
    }, [palette]);

    const colorsDoNotUpdate = useRef(true)
    useEffect(() => {
        if(!colorsDoNotUpdate.current) {
            let newDots = dots.map(dot => {
                return {...dot, color: getColor(dot.id, colorPalette)}
            });
            setDots(newDots);
        } else {
            colorsDoNotUpdate.current = false;
        }
        
    }, [colorPalette]);
    

    const handleSetNumRows = num => {
        pieceSpecs.setNumber(Number(num));
        setDots(createStartingDotArray(Number(num)))
    }

    const handleSetColorPalette = palette => {
        colorsDoNotUpdate.current = false;
        setColorPalette(palette);
    }

    const displayDots = () => {
        let dotLines = []
        let newLine = []
        for(let k = 0; k < pieceSpecs.number**2; k++){
            newLine.push(dots[k]);
            if(newLine.length === pieceSpecs.number){
                dotLines.push(newLine);
                newLine = []
            }
        }
        return dotLines;
    }

    const organizeDots = (idx, dir) => {
        if(idx === 0 && dir === 'horizontal') {
            pieceSpecs.toggleIsOrganizing();
            dispatch(organizingCounterActions.incrementOrganizingCounter())
        }
        let newDots;
        let newDir = dir === 'horizontal' ? 'vertical' : 'horizontal';
        let newIdx = dir === 'horizontal' ? idx : idx + 1
        if(dir === 'horizontal') {
            newDots = dots.map(dot => {
                if(dot.id === dots[idx].id){
                    return {...dot, marginLeft: `${.0325}`}
                } else {
                    return dot
                }
            });
            soundPlay(pieceSpecs.soundObj, dots[idx].leftVolumeMultiplier, volume, pieceSpecs.proportionalVolume);
        } else {
            newDots = dots.map(dot => {
                if(dot.id === dots[idx].id){
                    return {...dot, marginTop: `${.0325}`}
                } else {
                    return dot
                }
            });
            soundPlay(pieceSpecs.soundObj, dots[idx].topVolumeMultiplier,volume, pieceSpecs.proportionalVolume);
        };
        
        setDots(newDots);
        pieceSpecs.setNextIndex({id: newIdx, dir: newDir});
        if(idx + 1 === dots.length && dir === 'horizontal') {
            dispatch(organizingCounterActions.decrementOrganizingCounter());
            setTimeout(() => {
                pieceSpecs.toggleIsOrganized();
                pieceSpecs.toggleIsOrganizing();
            }, 1000);
        } 
    }

    const scatterDots = () => {
        let newDots = dots.map(dot => {
            let leftOffset = (Math.random() * 60 + 5) * (Math.random() > .5 ? 1 : -1);
            let topOffset = (Math.random() * 60 + 5) * (Math.random() > .5 ? 1 : -1);
            return {
                ...dot, 
                marginLeft: leftOffset, 
                marginTop: topOffset,
                leftVolumeMultiplier: scaler(5, 65, .0015, .01, Math.abs(leftOffset)),
                topVolumeMultiplier: scaler(5, 65, .0015, .01, Math.abs(topOffset))
            }
        });
        setDots(newDots);
        pieceSpecs.toggleIsOrganized();
    }

    const handleToggleFullView = useCallback(() => {
        dispatch(sizeActions.setFullView(
            [
                props.id, {
                    type: 'dots',
                    palette: pieceSpecs.palette,
                    speed: pieceSpecs.speed,
                    sound: pieceSpecs.soundName,
                    proportionalVolume: pieceSpecs.proportionalVolume,
                    number: pieceSpecs.number,
                    shape: pieceSpecs.shape,
                    text: pieceSpecs.text
                }
            ]
        ));
    }, []);

    return (
        <div className="Dots piece-container" style={{margin: fullView ? '0 auto' : 0, width: `${width}px`, display: 'flex', justifyContent: 'center', alignItems: 'center', height: `${width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div className="outer" style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                    <div style={{width: `${.75 * width}px`, height: `${.75 * width}px`}}>
                        <div style={{width: '100%', height: '100%'}}>
                            {displayDots().map(dotLine => {
                                let dotLineKey =uuidv4();
                                return <p key={dotLineKey} style={{display: 'flex', marginBlockEnd: 0, marginBlockStart: 0, padding: 0, marginBottom: 0, marginTop: 0, width: '100%', height: `${100 / (pieceSpecs.number)}%`}}>
                                    {dotLine.map(dot => {
                                        return (<p className="piece-unit" key={dot.key} style={{display: 'inline-flex', justifyContent: 'center', alignItems: 'center', marginBlockEnd: 0, marginBlockStart: 0, padding: '0px', width: `${100 / (pieceSpecs.number)}%`, height: '100%', marginBottom: '0'}}>
                                                    {/* <span style={{display: 'inline-block', border: '1px solid', borderRadius: `${pieceSpecs.shape === 'circle' ? '50%' : 0}`, width: `${Math.floor(((100 / pieceSpecs.number) / 100) * .3 * width * .75)}px`, height: `${Math.floor(((100 / pieceSpecs.number) / 100 ) * .3 * width * .75)}px`, marginLeft: `${dot.marginLeft}%`, marginTop: `${dot.marginTop}%`}}></span> */}
                                                    <span style={{display: 'inline-block', border: `1px solid ${getColor('border', colorPalette)}`, borderRadius: `${pieceSpecs.shape === 'circle' ? '50%' : 0}`, width: `${Math.floor(((100 / pieceSpecs.number) / 100) * .3 * width * .75)}px`, height: `${Math.floor(((100 / pieceSpecs.number) / 100 ) * .3 * width * .75)}px`, marginLeft: `${dot.marginLeft}%`, marginTop: `${dot.marginTop}%`, backgroundColor: `${dot.color}`}}></span>
                                                </p>)
                                    })}
                                </p>
                            })}
                        </div>
                    </div>
                </div>
                <ControlBar id={props.id} toggleFullView={handleToggleFullView} shape={pieceSpecs.shape} shapes={['circle', 'square']} changeShape={pieceSpecs.setShape} changeProportionalVolume={pieceSpecs.setProportionalVolume} proportionalVolume={pieceSpecs.proportionalVolume} palette={colorPalette} setPalette={handleSetColorPalette} minNum={4} maxNum={25} number={pieceSpecs.number} setNumber={handleSetNumRows} isOrganizing={pieceSpecs.isOrganizing} isOrganized={pieceSpecs.isOrganized} setSpeed={pieceSpecs.setSpeed} setSound={pieceSpecs.setSound} soundValue='Swish' organizedFunction={scatterDots} unorganizedFunction={() => organizeDots(0, 'horizontal')} unorgButton='Scatter' orgButton='Organize' />
            </div>
            
        </div>
    )
}

export default Dots;