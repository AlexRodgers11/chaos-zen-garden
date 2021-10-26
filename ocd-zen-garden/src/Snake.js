import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sizeActions } from './store/size';
import { organizingCounterActions } from './store/organizing-counter';
// import useToggle from './hooks/useToggle';
import useGardenSpecs from './hooks/useGardenSpecs';
import usePieceSpecs from './hooks/usePieceSpecs';
import { getColor, getSound, scaler, soundPlay } from './utils';
import ControlBar from './ControlBar';
import { v4 as uuidv4 } from 'uuid';


function Snake(props) {
    // const start = Date.now();
    const palette = useSelector((state) => state.palette.palette);
    // const width = useSelector((state) => state.size.pieceWidth);
    // const volume = useSelector((state) => state.volume.volume);
    // const fullView = useSelector((state) => state.size.fullView);
    const [width, volume, fullView, dispatch] = useGardenSpecs();
    const [
        isOrganized, toggleIsOrganized, 
        isOrganizing, toggleIsOrganizing, 
        nextIndex, setNextIndex, 
        numBoxes, setNumBoxes,
        speed, setSpeed, 
        soundName, soundObj, setSound,
        proportionalVolume, setProportionalVolume,
        shape, setShape,
        text, setText,
    ] = usePieceSpecs(0, 7, 'proportional', 'square', 'Slam', 1000, null);
    // console.log(soundName)
    // console.log(soundObj)
    // (nextIdx, num, propVol, shp, sound, spd, txt)
    // const [isOrganized, toggleIsOrganized] = useToggle(false);
    // const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    // const [nextIndex, setNextIndex] = useState(0);
    const [colorPalette, setColorPalette] = useState(palette);
    // const [speed, setSpeed] = useState(1000);
    // const [sound, setSound] = useState(getSound('Slam'));
    // const [proportionalVolume, setProportionalVolume] = useState('proportional');
    // const [numBoxes, setNumBoxes] = useState(7);
    // const [shape, setShape] = useState('square');
    // const dispatch = useDispatch();

    const createStartingBoxArray = num => {
        let boxes = [];
        for(let i = 1; i <= num; i++) {
            let random = Math.random() * .45 * 100
            boxes.push({
                id: i,
                left: `${Math.random() * .40 + .05}` * (Math.random() > .5 ? 1 : -1),
                color: getColor(i, colorPalette),
                key: uuidv4(),
            });
        }
        //look at squishing volume progressively less as the sitewide volume goes down
        for(let j = 0; j < boxes.length - 1; j++) {
            boxes[j].volumeMultiplier = scaler(0, .9, .0035, .01, Math.abs(boxes[j + 1].left - boxes[j].left))

        }
        boxes[boxes.length - 1].volumeMultiplier = scaler(0, .9, .0035, .01, Math.abs(boxes[boxes.length - 1].left))

        return boxes;
    }

    const [boxes, setBoxes] = useState(createStartingBoxArray(numBoxes));

    const firstUpdate = useRef(true);
    useEffect(()=>{
        if(!firstUpdate.current) {
            if(nextIndex < boxes.length){
                setTimeout(()=>{
                    organizeBoxes(nextIndex);
                }, speed);
            }
        } else {
            firstUpdate.current = false;
        }     
    }, [nextIndex]);

    const colorFirstUpdate = useRef(true);
    useEffect(() => {
        if(!colorFirstUpdate.current) {
            let newBoxes = boxes.map(box => {
                return {...box, color: getColor(box.id, palette)}
            });
            setColorPalette(palette);
            setBoxes(newBoxes);
            colorsDoNotUpdate.current = true;
        } else {
            colorFirstUpdate.current = false;
        }
    }, [palette]);

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


    const organizeBoxes = (idx) => {
        if(idx === 0) {
            toggleIsOrganizing();
            dispatch(organizingCounterActions.incrementOrganizingCounter())
        }
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

        soundPlay(soundObj, boxes[idx].volumeMultiplier, volume, proportionalVolume);

        
        setBoxes(newBoxes);
        if(idx < boxes.length - 1) {
            setNextIndex(idx + 1);
        } else {
            dispatch(organizingCounterActions.decrementOrganizingCounter());
            setTimeout(() => {
                toggleIsOrganized();
                toggleIsOrganizing();
            }, speed);
        }
    }

    const scatterBoxes = () => {
        let newBoxes = boxes.map(box => {
            return {...box, left: `${Math.random() * .40 + .05}` * (Math.random() > .5 ? 1 : -1)};
        })
        for(let j = 0; j < boxes.length - 1; j++) {
            boxes[j].volumeMultiplier = scaler(0, .9, .35, 1, Math.abs(boxes[j + 1].left - boxes[j].left))

        }
        boxes[boxes.length - 1].volumeMultiplier = scaler(0, .9, .35, 1, Math.abs(boxes[boxes.length - 1].left))
        setBoxes(newBoxes);
        toggleIsOrganized();
    }

    // const handleSetSpeed = time => {
    //     setSpeed(time);
    // }

    // const handleSetSound = sound => {
    //     setSound(sound);
    // }

    const handleSetColorPalette = palette => {
        colorsDoNotUpdate.current = false;
        setColorPalette(palette);
    }

    const handleChangeProportionalVolume = selection => {
        setProportionalVolume(selection);
    }

    const handleSetNumBoxes = num => {
        setNumBoxes(Number(num));
        setBoxes(createStartingBoxArray(Number(num)))
    }

    // const handleChangeShape = shape => {
    //     setShape(shape);
    // }

    const handleToggleFullView = () => {
        dispatch(sizeActions.setFullView(
            [
                props.id, {
                    type: 'snake',
                    palette: palette,
                    speed: speed,
                    sound: soundName,
                    proportionalVolume: proportionalVolume,
                    number: numBoxes,
                    shape: shape ,
                    text: null
                }
            ]
        ));
    }
    // const end = Date.now();
    // console.log(end- start);
    return (
        <div style={{margin: fullView ? '0 auto' : 0, width: `${width}px`, height: `${width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', width: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                        {boxes.map(box => {
                            return (
                                <div key={box.key} style={{position: 'relative', boxSizing: 'border-box', border: `1px solid ${getColor('border', colorPalette)}`, width: `${Math.floor(width * .75 / numBoxes)}px`, height: `${Math.floor(width * .75 / numBoxes)}px`, padding: 0, marginTop: '0', marginBottom: '0', left: `${box.left * width * .75 / numBoxes}px`, backgroundColor: `${box.color}`, borderRadius: `${shape === 'circle' ? '50%' : 0}`}}></div>
                            )
                        })}
                </div>
                <ControlBar id={props.id} toggleFullView={handleToggleFullView} shape={shape} shapes={['circle', 'square']} changeShape={setShape} changeProportionalVolume={handleChangeProportionalVolume} proportionalVolume={proportionalVolume} palette={colorPalette} setPalette={handleSetColorPalette} minNum={4} maxNum={30} number={numBoxes} setNumber={handleSetNumBoxes} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={setSpeed} setSound={setSound} soundValue='Slam' organizedFunction={scatterBoxes} unorganizedFunction={() => organizeBoxes(0)} unorgButton='Scatter' orgButton='Organize' />
            </div>
        </div>
    )
}

export default Snake;