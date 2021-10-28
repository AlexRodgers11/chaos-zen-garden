import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useGardenSpecs from './hooks/useGardenSpecs';
import usePieceSpecs from './hooks/usePieceSpecs';
import { organizingCounterActions } from './store/organizing-counter';
import { sizeActions } from './store/size';
import { getColor, scaler, soundPlay } from './utils';
import ControlBar from './ControlBar';

function Crosshair(props) {
    const palette = useSelector((state) => state.palette.palette);
    const [colorPalette, setColorPalette] = useState(palette);
    const [width, volume, fullView, dispatch] = useGardenSpecs();
    const pieceSpecs = usePieceSpecs(0, props.number, props.proportionalVolume, props.shape, props.sound, props.speed, props.text);

    const createStartingRingArray = num => {
        let rings = [];
        for(let i = 1; i <= num; i++) {
            let random = 15 + Math.random() * 345;
            rings.push({
                id: i,
                color: getColor(i, colorPalette),
                rotation: random,
                volumeMultiplier: scaler(15, 360, .0025, .01, random)
            })
        }
        return rings;
    }

    const [rings, setRings] = useState(createStartingRingArray(pieceSpecs.number));

    const firstUpdate = useRef(true);
    useEffect(()=>{
        if(!firstUpdate.current) {
            if(pieceSpecs.nextIndex < rings.length){
                setTimeout(()=>{
                    align(pieceSpecs.nextIndex);
                }, pieceSpecs.speed);
            }
        } else {
            firstUpdate.current = false;
        }     
    }, [pieceSpecs.nextIndex]);

    const colorFirstUpdate = useRef(true);
    useEffect(() => {
        if(!colorFirstUpdate.current) {
            let newRings = rings.map(ring => {
                return {...ring, color: getColor(ring.id, palette)}
            });
            setColorPalette(palette);
            setRings(newRings);
            colorsDoNotUpdate.current = true;
        } else {
            colorFirstUpdate.current = false;
        }
    }, [palette]);

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
            pieceSpecs.toggleIsOrganizing();
            dispatch(organizingCounterActions.incrementOrganizingCounter())
        }
        let newRings = rings.map(ring => {
            if(ring.id === rings[idx].id) {

                ring.rotation = 0
            }
            return ring;
            
        });

        soundPlay(pieceSpecs.soundObj, rings[idx].volumeMultiplier, volume, pieceSpecs.proportionalVolume);
        setRings(newRings);
        pieceSpecs.setNextIndex(idx + 1);
        if(idx + 1 === rings.length) {
            // props.setNumOrganizing(-1);
            dispatch(organizingCounterActions.decrementOrganizingCounter());
            setTimeout(() => {
                pieceSpecs.toggleIsOrganized();
                pieceSpecs.toggleIsOrganizing();
            }, pieceSpecs.speed)
        } 
    }

    const spin = () => {
        let newRings = rings.map(ring => {
            let random = 15 + Math.random() * 345;
            return {
                ...ring, 
                rotation: random,
                volumeMultiplier: scaler(15, 360, .0025, .01, random)
            }
        })
        setRings(newRings);
        pieceSpecs.toggleIsOrganized();
    }

    const handleSetColorPalette = palette => {
        colorsDoNotUpdate.current = false;
        setColorPalette(palette);
    }

    const handleSetNumRings = num => {
        pieceSpecs.setNumber(Number(num));
        setRings(createStartingRingArray(Number(num)))
    }

    const display = (id) => {
        let ringSize = `${id === 1 ? `${.6 * width}` : `${(.6 - (id - 1) * (.6 / pieceSpecs.number)) * width}`}`;
        if(id <= pieceSpecs.number) {
            let lineColor = getColor(1, colorPalette);
            return (
                <div style={{
                    margin: '0 auto',
                    zIndex: `${id}`,
                    position: 'relative', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    backgroundColor: `${getColor('base', colorPalette)}`,
                    border: `2px solid ${rings[id - 1].color}`,
                    borderRadius: pieceSpecs.shape === 'circle' ? '50%' : '0',
                    transform: `rotate(${rings[id - 1].rotation}deg)`,
                    height: `${ringSize}px`, 
                    width: `${ringSize}px`}}>
                        <div style={{position: 'absolute', zIndex: `${id}`, height: `${ringSize}px`, width: `${ringSize}px`}}>
                            <div style={{position: 'absolute', width: '100%', height: '50%', zIndex: `${id}`}}>
                                <div style={{position: 'relative', display: 'inline-block', width: `${ringSize * .5 - 1}px`, zIndex: `${id}`, height: `${ringSize * .5 - 1}px`, borderBottom: `1px solid ${lineColor}`, borderRight: `1px solid ${lineColor}`}}></div>
                                <div style={{position: 'relative', display: 'inline-block', width: `${ringSize * .5 - 1}px`, zIndex: `${id}`, height: `${ringSize * .5 - 1}px`, borderBottom: `1px solid ${lineColor}`, borderLeft: `1px solid ${lineColor}`}}></div>
                            </div>
                            <div style={{position: 'absolute', width: '100%', height: '50%', top: `${ringSize * .5}px`, zIndex: `${id}`}}>
                                <div style={{position: 'relative', display: 'inline-block', width: `${ringSize * .5 - 1}px`, zIndex: `${id}`, height: `${ringSize * .5 - 1}px`, borderTop: `1px solid ${lineColor}`, borderRight: `1px solid ${lineColor}`}}></div>
                                <div style={{position: 'relative', display: 'inline-block', width: `${ringSize * .5 - 1}px`, zIndex: `${id}`, height: `${ringSize * .5 - 1}px`, borderTop: `1px solid ${lineColor}`, borderLeft: `1px solid ${lineColor}`}}></div>
                            </div>
                        </div>

                        {display(id + 1)}
                    </div>
            )
        } 
    }
    
    const handleToggleFullView = () => {
        dispatch(sizeActions.setFullView(
            [
                props.id, {
                    type: 'crosshair',
                    palette: palette,
                    speed: pieceSpecs.speed,
                    sound: pieceSpecs.soundName,
                    proportionalVolume: pieceSpecs.proportionalVolume,
                    number: pieceSpecs.number,
                    shape: pieceSpecs.shape,
                    text: pieceSpecs.text
                }
            ]
        ));
    }

    return (
        <div style={{margin: fullView ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${width}px`, height: `${width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%'}}>
                    <div>
                        {display(1)}
                    </div>
                </div>
            <ControlBar toggleFullView={handleToggleFullView} shape={pieceSpecs.shape} shapes={['circle', 'square']} changeShape={pieceSpecs.setShape} changeProportionalVolume={pieceSpecs.setProportionalVolume} proportionalVolume={pieceSpecs.proportionalVolume} palette={colorPalette} setPalette={handleSetColorPalette} setNumber={handleSetNumRings} minNum={4} maxNum={20} number={pieceSpecs.number} isOrganizing={pieceSpecs.isOrganizing} isOrganized={pieceSpecs.isOrganized} setSpeed={pieceSpecs.setSpeed} setSound={pieceSpecs.setSound} soundValue='Ding' organizedFunction={spin} unorganizedFunction={() => align(0)} unorgButton='Spin' orgButton='Align' />

            </div>
        </div>
        
    )
}

export default Crosshair;