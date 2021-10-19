import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { organizingCounterActions } from './store/organizing-counter';
import { getColor, getSound, scaler, soundPlay } from './utils';
import ControlBar from './ControlBar';
import useToggle from './hooks/useToggle';
import { v4 as uuidv4 } from 'uuid';

function Barcode(props) {
    const palette = useSelector((state) => state.palette.palette);
    const volume = useSelector((state) => state.volume.volume);
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [colorPalette, setColorPalette] = useState(palette);
    const [numStripes, setNumStripes] = useState(props.numStripes || 15);
    const [nextIdx, setNextIdx] = useState(0);
    const [sound, setSound] = useState(getSound('Blip'));
    const [proportionalVolume, setProportionalVolume] = useState('proportional');
    const [speed, setSpeed] = useState(1000);
    const dispatch = useDispatch();

    const createStartingStripeArray = num => {
        let totalHeight = .4 * (1 / num)
        let stripeArr = [];
        for(let i = 1; i < num + 1; i++) {
            let randomNum;
            if(totalHeight > (i + 1) * ((1 / num) * .4)) {
                randomNum = Math.random() * 1 / (num ** 1.05) * .4 * -1
            } else if(totalHeight > (i - 1) * ((1 / num) * .4)) {
                randomNum = Math.random() * 1 / (num ** 1.05) * .4;
            } else {
                let posNeg = Math.random() > .4 ? -1 : 1;
                randomNum = posNeg * Math.random() * 1 / (num ** 1.05) * .4;
            }
            totalHeight += .4 * (1 / num) + randomNum;
            let height = .4 * (1 / num) + randomNum;
            stripeArr.push({
                id: i,
                color: (getColor(i, colorPalette)),
                height: height,
                volumeMultiplier: scaler(0, 1 / (num ** 1.05) * .4, .002, .01, Math.abs(randomNum)),
                key: uuidv4()
            })
        }
        return stripeArr
    }

    // const soundPlay = (soundObj, multiplier) => {
    //     const sound = new Howl({
    //         src: soundObj.src,
    //         sprite: soundObj.sprite,
    //         volume: props.volume * .01 * multiplier
    //     });
    //     sound.play(soundObj.spriteName);
    // }

    const balanceStripes = idx => {
        if(idx === 0) {
            toggleIsOrganizing();
            dispatch(organizingCounterActions.incrementOrganizingCounter())
        }
        let newStripes = stripes.map(stripe => {
            if(stripe.id === stripes[idx].id) {
                return {...stripe, height: `${(1 / numStripes) * .4}`}
            } else {
                return stripe;
            }
        });
        soundPlay(sound, stripes[idx].volumeMultiplier, volume, proportionalVolume);
        setStripes(newStripes);
        setNextIdx(idx + 1);
        if(idx + 1 === stripes.length) {
            toggleIsOrganizing();
            toggleIsOrganized();
            dispatch(organizingCounterActions.decrementOrganizingCounter());
        }
    }

    const unbalanceStripes = () => {
        let newStripes = createStartingStripeArray(numStripes);
        setStripes(newStripes);
        toggleIsOrganized();
    }

    let firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            if(nextIdx < stripes.length) {
                setTimeout(() => {
                    balanceStripes(nextIdx);
                }, speed);
            }
        } else {
            firstUpdate.current = false;
        }
    }, [nextIdx]);

    let colorFirstUpdate = useRef(true);
    useEffect(() => {
        if(!colorFirstUpdate.current) {
            let newStripes = stripes.map(stripe => {
                return {...stripe, color: getColor(stripe.id, palette)}
            });
            setStripes(newStripes);
            setColorPalette(palette);
            colorsDoNotUpdate.current = true;
        } else {
            colorFirstUpdate.current = false;
        }
    }, [palette]);

    const colorsDoNotUpdate = useRef(true)
    useEffect(() => {
        if(!colorsDoNotUpdate.current) {
            let newStripes = stripes.map(stripe => {
                return {...stripe, color: getColor(stripe.id, colorPalette)}
            });
            setStripes(newStripes);
        } else {
            colorsDoNotUpdate.current = false;
        }
        
    }, [colorPalette]);
    
    const handleSetSound = sound => {
        setSound(getSound(sound))
    }

    const handleSetSpeed = speed => {
        setSpeed(speed);
    }

    const handleSetNumStripes = num => {
        setNumStripes(Number(num));
        setStripes(createStartingStripeArray(Number(num)))
    }

    const handleSetColorPalette = palette => {
        colorsDoNotUpdate.current = false;
        setColorPalette(palette);
    }

    const handleChangeProportionalVolume = selection => {
        setProportionalVolume(selection);
    }

    const [stripes, setStripes] = useState(createStartingStripeArray(numStripes))
    return (
        <div style={{margin: props.fullWindow ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${props.width}px`, height: `${props.width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%'}}>
                    <div>
                        {stripes.map(stripe => {
                            return <div key={stripe.key} style={{margin: '0 auto', width: `${.4 * props.width}px`, height: `${Math.floor(stripe.height * props.width)}px`, backgroundColor: stripe.color, border: `1px solid ${getColor('border', colorPalette)}`}}></div>
                        })}
                    </div>
                </div>
                <ControlBar width={props.width} piece='barcode' palette={colorPalette} changeProportionalVolume={handleChangeProportionalVolume} proportionalVolume={proportionalVolume} setPalette={handleSetColorPalette} setNumber={handleSetNumStripes} minNum={5} maxNum={25} number={numStripes} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='Blip' organizedFunction={unbalanceStripes} unorganizedFunction={() => balanceStripes(0)} unorgButton='Unbalance' orgButton='Balance' />
            </div>
        </div>
    )
}

export default Barcode;