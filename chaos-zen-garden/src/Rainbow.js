import React, { useEffect, useRef, useState} from 'react';
import { useSelector } from 'react-redux';
import useGardenSpecs from './hooks/useGardenSpecs';
import usePieceSpecs from './hooks/usePieceSpecs';
import { sizeActions } from './store/size';
import { organizingCounterActions } from './store/organizing-counter';
import { getColor, scaler, soundPlay } from './utils';
import ControlBar from './ControlBar/ControlBar';


function Rainbow(props) {
    const palette = useSelector((state) => state.palette.palette);
    const [colorPalette, setColorPalette] = useState(palette);
    const [width, volume, fullView, dispatch] = useGardenSpecs();
    const pieceSpecs = usePieceSpecs(0, props.number, props.proportionalVolume, props.shape, props.sound, props.speed, props.text);

    const createStartingArcsArray = num => {
        let startingArcArray = [];
        for(let i = 0; i < num; i++) {
            let random = .5 + Math.random() * 9.5
            startingArcArray.push({
                id: i + 1,
                color: getColor(i + 1, colorPalette),
                offset: random * (i % 2 === 0 ? 1 : -1),
                volumeMultiplier: scaler(.5, 10, .002, .01, random)
            })
        }
        return startingArcArray;
    }

    const [arcs, setArcs] = useState(createStartingArcsArray(pieceSpecs.number));

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current && pieceSpecs.nextIndex > 0) {
            setTimeout(() => {
                align(pieceSpecs.nextIndex)
            }, pieceSpecs.speed)
        } else {
            firstUpdate.current = false;
        }
    }, [pieceSpecs.nextIndex]);

    const colorsFirstUpdate = useRef(true)
    useEffect(() => {
        if(!firstUpdate.current) {
            let newArcs = arcs.map(arc => {
                return {...arc, color: getColor(arc.id, palette), color2: getColor(arc.id + 1, colorPalette)}
            });
            setArcs(newArcs);
            setColorPalette(palette);
            colorsDoNotUpdate.current = true;
        } else {
            colorsFirstUpdate.current = false;
        }
    }, [palette]);

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
            pieceSpecs.toggleIsOrganizing();
            dispatch(organizingCounterActions.incrementOrganizingCounter())
        }
        let newArcs = arcs.map(arc => {
            if(arcs[idx].id === arc.id) {
                return {...arc, offset: 0}
            } else {
                return arc;
            }
        });
        soundPlay(pieceSpecs.soundObj, arcs[idx].volumeMultiplier, volume, pieceSpecs.proportionalVolume);
        setArcs(newArcs);
        pieceSpecs.setNextIndex(idx - 1);
        if(idx - 1 === 0) {
            dispatch(organizingCounterActions.decrementOrganizingCounter());
            setTimeout(() => {
                pieceSpecs.toggleIsOrganized();
                pieceSpecs.toggleIsOrganizing();
            }, pieceSpecs.speed);
        }
    }

    const shift = () => {
        let newArcs = arcs.map(arc => {
            let random = .5 + Math.random() * 9.5
            return {
                ...arc, 
                offset: random * (arc.id % 2 === 0 ? -1 : 1),
                volumeMultiplier: scaler(.5, 10, .002, .01, random)
            }
        })
        setArcs(newArcs);
        pieceSpecs.toggleIsOrganized();
    }

    const handleSetColorPalette = palette => {
        colorsDoNotUpdate.current = false;
        setColorPalette(palette);
    }

    const handleSetNumArcs = num => {
        pieceSpecs.setNumber(Number(num));
        setArcs(createStartingArcsArray(Number(num)))
    }

    const displayArcs = (num, width) => {
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
                    border: `${(width * .7) / (4 * pieceSpecs.number)}px solid ${arcs[num].color}`, 
                    borderRadius: '50%'}}
                >
                    {displayArcs(num + 1, width - (2 * (width * .7) / (4 * pieceSpecs.number)))}
                </div>
            )
        }
    }

    const handleToggleFullView = () => {
        dispatch(sizeActions.setFullView(
            [
                props.id, {
                    type: 'rainbow',
                    palette: palette,
                    speed: pieceSpecs.speed,
                    sound: pieceSpecs.soundName,
                    proportionalVolume: pieceSpecs.proportionalVolume,
                    number: pieceSpecs.number,
                    shape: pieceSpecs.shape ,
                    text: pieceSpecs.text
                }
            ]
        ));
    }

    return (
        <div style={{margin: fullView ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${width}px`, height: `${width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div className="putinhere" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                        <div className="wrapper" style={{display: 'flex', justifyContent: 'center', width: `100%`, height: `${width * .35}px`, overflow: 'hidden' }}>
                            {displayArcs(0, width * .7)}
                        </div>
                </div>
                <ControlBar id={props.id} toggleFullView={handleToggleFullView} changeProportionalVolume={pieceSpecs.setProportionalVolume} proportionalVolume={pieceSpecs.proportionalVolume} palette={colorPalette} setPalette={handleSetColorPalette} setNumber={handleSetNumArcs} minNum={7} maxNum={25} number={pieceSpecs.number} isOrganizing={pieceSpecs.isOrganizing} isOrganized={pieceSpecs.isOrganized} setSpeed={pieceSpecs.setSpeed} setSound={pieceSpecs.setSound} soundValue='Sparkle' organizedFunction={shift} unorganizedFunction={() => align(arcs.length - 1)} unorgButton='Shift' orgButton='Align' />

            </div>
        </div>
    )
}

export default Rainbow;