import { useEffect, useRef, useState } from 'react';
import useToggle from './useToggle';
import useSound from './useSound';

const usePieceSpecs = (nextIdx, num, propVol, shp, sound, spd, txt) => {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [nextIndex, setNextIndex] = useState(nextIdx);
    const [number, setNumber] = useState(num);
    const [proportionalVolume, setProportionalVolume] = useState(propVol);
    const [shape, setShape] = useState(shp);
    const [soundName, soundObj, setSound] = useSound(sound);
    const [speed, setSpeed] = useState(spd);   
    const [text, setText] = useState(txt);

    const pieceSpecs = {
        isOrganized, toggleIsOrganized, 
        isOrganizing, toggleIsOrganizing, 
        nextIndex, setNextIndex, 
        number, setNumber,
        speed, setSpeed, 
        soundName, soundObj, setSound,
        proportionalVolume, setProportionalVolume,
        shape, setShape,
        text, setText,
    };

    return pieceSpecs;
}

export default usePieceSpecs;