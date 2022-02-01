import { useffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSound from './useSound';
import useToggle from './useToggle';

// type, palette, speed, sound, proportionalVolume, number, shape, text
// const useGardenPiece = (nextIdx, spd, sound, propVol, num, numFunc, displayStateFunc, shp, txt) => {
const useGardenPiece = (nextIdx, spd, sound, propVol, num, shp, txt) => {
    const palette = useSelector((state) => state.palette.palette);
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [nextIndex, setNextIndex] = useState(nextIdx);
    const [number, setNumber] = useState(num);
    const [colorPalette, setColorPalette] = useState(palette);
    const [speed, setSpeed] = useState(spd);
    const [soundName, soundObj, setSound] = useSound(sound);
    const [proportionalVolume, setProportionalVolume] = useState(propVol);
    const [shape, setShape] = useState(shp);
    const [text, setText] = useState(txt);

    const handleSetSpeed = time => {
        setSpeed(time);
    }

    const handleSetSound = soundName => {
        console.log(soundName)
        setSound(soundName);
    }

    // const handleSetNumber = num => {
    //     setNumber(Number(num));
    //     setHorns(createStartingHornsArray(Number(num)))
    // }

    // const handleSetNumber = (num) => {
    //     numFunc(Number(num));
    //     displayStateFunc(numFunc(Number(num)))
    // }
    
    // const handleSetColorPalette = palette => {
    //     colorsDoNotUpdate.current = false;
    //     setColorPalette(palette);
    // }


    return [
        isOrganized, toggleIsOrganized, 
        isOrganizing, toggleIsOrganizing, 
        nextIndex, setNextIndex, 
        number, setNumber,
        // colorPalette,setColorPalette, 
        speed, setSpeed, 
        soundName, soundObj, setSound,
        proportionalVolume, setProportionalVolume,
        shape, setShape,
        text, setText,
        // handleSetColorPalette,
        // handleSetNumber,
        handleSetSound,
        handleSetSpeed,
    ];
    //could create a function that takes props and returns a ControlBar instance with those props
}

export default useGardenPiece;