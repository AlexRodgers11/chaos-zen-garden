import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { organizingCounterActions } from './store/organizing-counter';
import useToggle from './hooks/useToggle';
import { getColor, getSound, scaler, soundPlay } from './utils';
import ControlBar from './ControlBar';

function Crosshair(props) {
    const palette = useSelector((state) => state.palette.palette);
    const volume = useSelector((state) => state.volume.volume);
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [nextIndex, setNextIndex] = useState(0);
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('Robot'));
    const [proportionalVolume, setProportionalVolume] = useState('proportional');
    const [colorPalette, setColorPalette] = useState(palette);
    const [numRings, setNumRings] = useState(6);
    const [userJustChangedNumber, toggleUserJustChangedNumber] = useToggle(props.id === 1 ? false : props.userJustChangedNumber)
    const [shape, setShape] = useState('circle');
    const dispatch = useDispatch();

    const createStartingRingArray = num => {
        let rings = [];
        for(let i = 1; i <= num; i++) {
            let random = 15 + Math.random() * 345;
            rings.push({
                // missingEdges: randomEdges[Math.ceil(Math.random() * 4)]
                id: i,
                color: getColor(i, colorPalette),
                rotation: random,
                volumeMultiplier: scaler(15, 360, .0025, .01, random)
            })
        }
        return rings;
    }

    const [rings, setRings] = useState(createStartingRingArray(numRings));

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
            toggleIsOrganizing();
            // props.setNumOrganizing(1);
            dispatch(organizingCounterActions.incrementOrganizingCounter())
        }
        let newRings = rings.map(ring => {
            if(ring.id === rings[idx].id) {
                // ring.rotation = ring.rotation > 180 ? 360 : 0
                ring.rotation = 0
            }
            return ring;
            
        });

        soundPlay(sound, rings[idx].volumeMultiplier, volume, proportionalVolume);
        setRings(newRings);
        setNextIndex(idx + 1);
        if(idx + 1 === rings.length) {
            // props.setNumOrganizing(-1);
            dispatch(organizingCounterActions.decrementOrganizingCounter());
            setTimeout(() => {
                toggleIsOrganized();
                toggleIsOrganizing();
            }, speed)
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

    const handleChangeProportionalVolume = selection => {
        setProportionalVolume(selection);
    }

    const handleSetNumRings = num => {
        setNumRings(Number(num));
        setRings(createStartingRingArray(Number(num)))
    }
    
    const handleChangeShape = shape => {
        setShape(shape);
    }

    const display = (id) => {
        let ringSize = `${id === 1 ? `${.6 * props.width}` : `${(.6 - (id - 1) * (.6 / numRings)) * props.width}`}`;
        if(id <= numRings) {
            let lineColor = getColor(1, colorPalette);
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
                    borderRadius: shape === 'circle' ? '50%' : '0',
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

    return (
        <div style={{margin: props.fullWindow ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${props.width}px`, height: `${props.width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%'}}>
                    <div>
                        {display(1)}
                    </div>
                </div>
            <ControlBar width={props.width} piece='crosshair' toggleHighlightUserIcon={props.toggleHighlightUserIcon} setModalContent={props.setModalContent} shape={shape} shapes={['circle', 'square']} changeShape={handleChangeShape} changeProportionalVolume={handleChangeProportionalVolume} proportionalVolume={proportionalVolume} palette={colorPalette} setPalette={handleSetColorPalette} setNumber={handleSetNumRings} minNum={4} maxNum={20} number={numRings} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='Ding' organizedFunction={spin} unorganizedFunction={() => align(0)} unorgButton='Spin' orgButton='Align' />

            </div>
        </div>
        
    )
}

export default Crosshair;