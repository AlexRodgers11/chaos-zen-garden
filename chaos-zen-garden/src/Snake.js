import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { sizeActions } from './store/size';
import { organizingCounterActions } from './store/organizing-counter';
import useGardenSpecs from './hooks/useGardenSpecs';
import usePieceSpecs from './hooks/usePieceSpecs';
import { getColor, scaler, soundPlay } from './utils';
import ControlBar from './ControlBar/ControlBar';
import { v4 as uuidv4 } from 'uuid';
import './color-themes.css';
import './Snake.css';

function Snake(props) {
    //pallette for entire garden, should override individual pieces when changed
    const palette = useSelector((state) => state.palette.palette);
    const [colorPalette, setColorPalette] = useState(palette);
    //use hook to get selectors for garden-wide variables all pieces "subscribe"(?) to
    const [width, volume, fullView, dispatch] = useGardenSpecs();
    //use hook to create pieces of state that will be individual to each piece and used by all
    const pieceSpecs = usePieceSpecs(0, props.number, props.proportionalVolume, props.shape, props.sound, props.speed, props.text);
    //set piece-specific palette

    //function to that will create an array of boxes with all properties they will use
    const createStartingBoxArray = num => {
        let boxes = [];
    
        for(let i = 1; i <= num; i++) {
            boxes.push({
                id: i,
                left: `${Math.random() * .40 + .05}` * (Math.random() > .5 ? 1 : -1),
                //very inefficient function that repeats selected color scheme throughout boxes; will be replaced with custom CSS properties imported from a master theme stylesheet using nth-of-type pseudo-selector
                color: getColor(i, colorPalette),
                key: uuidv4(),
            });
        }
        //set the volume (if proportional volume option is selected) for each box but last based on how far it is from the next box (can't do in initial loop because offset of subsequent box not yet determined)
        for(let j = 0; j < boxes.length - 1; j++) {
            boxes[j].volumeMultiplier = scaler(0, .9, .0035, .01, Math.abs(boxes[j + 1].left - boxes[j].left))

        }
        //set volume (if proportional volume option is selected) for final box based on distance to aligned position
        boxes[boxes.length - 1].volumeMultiplier = scaler(0, .9, .0035, .01, Math.abs(boxes[boxes.length - 1].left))
        return boxes;
    }

    //initialize(?) boxes state as an array created with above function using the number of boxes selected by the user (or default)
    const [boxes, setBoxes] = useState(createStartingBoxArray(pieceSpecs.number));

    //reference to keep the useEffect tracking nextIdx from running on first render
    const firstNextIndexUpdate = useRef(true);
    //useEffect triggered by changes in nextIndex. When organize button clicked first nextIndex is set, which triggers organization, which in turn updates nextIndex, which sets timeout for the next organization
    useEffect(()=>{
        if(!firstNextIndexUpdate.current) {
            if(pieceSpecs.nextIndex < boxes.length){
                setTimeout(()=>{
                    organizeBoxes(pieceSpecs.nextIndex);
                }, pieceSpecs.speed);
            }
        } else {
            firstNextIndexUpdate.current = false;
        }     
    }, [pieceSpecs.nextIndex]);

    //reference to keep useEffect tracking changes to garden-level palette from running on first render
    const colorFirstUpdate = useRef(true);
    //useEffect triggered by changes to garden-level palette
    useEffect(() => {
        if(!colorFirstUpdate.current) {
            let newBoxes = boxes.map(box => {
                return {...box, color: getColor(box.id, palette)}
            });
            setColorPalette(palette);
            setBoxes(newBoxes);
    //         //change value of reference used for a useEffect hook tracking changes to individual piece palette so changing the garden palette doesn't set off inifinite useEffect loop for piece palette
            colorsDoNotUpdate.current = true;
        } else {
            colorFirstUpdate.current = false;
        }
    }, [palette]);

    //reference to keep useEffect hook tracking changes to piece-specific palette from running on first render or if garden-level palette just updated
    const colorsDoNotUpdate = useRef(true)
    useEffect(() => {
        if(!colorsDoNotUpdate.current) {
            let newBoxes = boxes.map(box => {
                return {...box, color: getColor(box.id, colorPalette)}
            });
            setBoxes(newBoxes);
        } else {
            colorsDoNotUpdate.current = false;
        }
    }, [colorPalette]);

    //function that moves box and all boxes above it to the position of box below it (or to final "organized" position in case of final box)
    const organizeBoxes = (idx) => {
        //when first box moves and organization begins a garden-wide counter that keeps track of the number of pieces currently in process of being organized starts because site-wide palette can't be changed while anything is being organized and no piece can go into "full-view mode" while anything is being organized. Also toggle "isOrganizing" to be false so that certain controlbar functions like number of boxes are locked out until organization is complete
        if(idx === 0) {
            pieceSpecs.toggleIsOrganizing();
            dispatch(organizingCounterActions.incrementOrganizingCounter())
        }
        //create post-organization state for the boxes array
        let newBoxes;
        if(idx + 1 === boxes.length){
            newBoxes = boxes.map(box => {
                return {...box, left: 0} 
            });
        } else {
            newBoxes = boxes.map(box => {
                if(box.id <= boxes[idx].id){
                    return {...box, left: `${boxes[idx+1].left}`}
                } else {
                    return box
                }
            });
        }
        //play selected organization sound, imported from utils.js
        soundPlay(pieceSpecs.soundObj, boxes[idx].volumeMultiplier, volume, pieceSpecs.proportionalVolume);
        //set boxes state to be the updated array
        setBoxes(newBoxes);
        //if box being organized isn't the last one update nextIndex again to continue the useEffect loop, otherwise decrease the counter tracking number of pieces currently being organized and toggle isOrganizing and isOrganized on snake so that all control bar functionality opens back up and user can return boxes to dissarray
        if(idx < boxes.length - 1) {
            pieceSpecs.setNextIndex(idx + 1);
        } else {
            dispatch(organizingCounterActions.decrementOrganizingCounter());
            setTimeout(() => {
                pieceSpecs.toggleIsOrganized();
                pieceSpecs.toggleIsOrganizing();
            }, pieceSpecs.speed);
        }
    }

    //function that resets boxes to a new randomized unorganized state
    const scatterBoxes = () => {
        let newBoxes = boxes.map(box => {
            return {...box, left: `${Math.random() * .40 + .05}` * (Math.random() > .5 ? 1 : -1)};
        })
        for(let j = 0; j < boxes.length - 1; j++) {
            boxes[j].volumeMultiplier = scaler(0, .9, .35, 1, Math.abs(boxes[j + 1].left - boxes[j].left))

        }
        boxes[boxes.length - 1].volumeMultiplier = scaler(0, .9, .35, 1, Math.abs(boxes[boxes.length - 1].left))
        setBoxes(newBoxes);
        pieceSpecs.toggleIsOrganized();
    }

    //change the number of boxes used (from control bar)
    const handleSetNumBoxes = num => {
        pieceSpecs.setNumber(Number(num));
        setBoxes(createStartingBoxArray(Number(num)))
    }

    //open snake in full view (from control bar)
    const handleToggleFullView = () => {
        dispatch(sizeActions.setFullView(
            [
                props.id, {
                    type: 'snake',
                    palette: colorPalette,
                    speed: pieceSpecs.speed,
                    sound: pieceSpecs.soundName,
                    proportionalVolume: pieceSpecs.proportionalVolume,
                    number: pieceSpecs.number,
                    shape: pieceSpecs.shape ,
                    text: null
                }
            ]
        ));
    }

    return (
        // <div className='Snake piece-container' style={{margin: fullView ? '0 auto' : 0, width: `${width}px`, height: `${width}px`, border: '1px solid black'}}>
        //     <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', width: '100%'}}>
        //         <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
        //                 {boxes.map(box => {
        //                     return (
        //                         <div className='piece-unit' key={box.key} style={{position: 'relative', boxSizing: 'border-box', border: `1px solid}`, width: `${Math.floor(width * .75 / pieceSpecs.number)}px`, height: `${Math.floor(width * .75 / pieceSpecs.number)}px`, padding: 0, marginTop: '0', marginBottom: '0', left: `${box.left * width * .75 / pieceSpecs.number}px`, borderRadius: `${pieceSpecs.shape === 'circle' ? '50%' : 0}`}}></div>
        //                     )
        //                 })}
        //         </div>
        //         {/* will attempt to find a way around passing these functions to controlbar this way */}
        //         <ControlBar id={props.id} toggleFullView={handleToggleFullView} shape={pieceSpecs.shape} shapes={['circle', 'square']} changeShape={pieceSpecs.setShape} changeProportionalVolume={pieceSpecs.setProportionalVolume} proportionalVolume={pieceSpecs.proportionalVolume} palette={colorPalette} setPalette={setColorPalette} minNum={4} maxNum={30} number={pieceSpecs.number} setNumber={handleSetNumBoxes} isOrganizing={pieceSpecs.isOrganizing} isOrganized={pieceSpecs.isOrganized} setSpeed={pieceSpecs.setSpeed} setSound={pieceSpecs.setSound} soundValue='Slam' organizedFunction={scatterBoxes} unorganizedFunction={() => organizeBoxes(0)} unorgButton='Scatter' orgButton='Organize' />
        //     </div>
        // </div>
        <div style={{margin: fullView ? '0 auto' : 0, width: `${width}px`, height: `${width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', width: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                        {boxes.map(box => {
                            return (
                                <div key={box.key} style={{position: 'relative', boxSizing: 'border-box', border: `1px solid ${getColor('border', colorPalette)}`, width: `${Math.floor(width * .75 / pieceSpecs.number)}px`, height: `${Math.floor(width * .75 / pieceSpecs.number)}px`, padding: 0, marginTop: '0', marginBottom: '0', left: `${box.left * width * .75 / pieceSpecs.number}px`, backgroundColor: `${box.color}`, borderRadius: `${pieceSpecs.shape === 'circle' ? '50%' : 0}`}}></div>
                            )
                        })}
                </div>
                {/* will attempt to find a way around passing these functions to controlbar this way */}
                <ControlBar id={props.id} toggleFullView={handleToggleFullView} shape={pieceSpecs.shape} shapes={['circle', 'square']} changeShape={pieceSpecs.setShape} changeProportionalVolume={pieceSpecs.setProportionalVolume} proportionalVolume={pieceSpecs.proportionalVolume} palette={colorPalette} setPalette={setColorPalette} minNum={4} maxNum={30} number={pieceSpecs.number} setNumber={handleSetNumBoxes} isOrganizing={pieceSpecs.isOrganizing} isOrganized={pieceSpecs.isOrganized} setSpeed={pieceSpecs.setSpeed} setSound={pieceSpecs.setSound} soundValue='Slam' organizedFunction={scatterBoxes} unorganizedFunction={() => organizeBoxes(0)} unorgButton='Scatter' orgButton='Organize' />
            </div>
        </div>
    )
}

export default Snake;