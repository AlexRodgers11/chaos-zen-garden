import { useState } from 'react';
import { getSound } from '../utils';

const useSound = sound => {
    const [soundName, setSound] = useState(sound);
    const soundObj = getSound(soundName)
    // const updateSound = sound => {
    //     setSound(sound);
        
    // }
    return [soundName, soundObj, setSound];
}

export default useSound;
