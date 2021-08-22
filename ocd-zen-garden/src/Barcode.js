import React, { useState, useRef, useEffect } from 'react';
import { getColor, getSound } from './utils';
import ControlBar from './ControlBar';
import useToggle from './hooks/useToggle';
import { v4 as uuidv4 } from 'uuid';
import { Howl } from 'howler';

function Barcode(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [colorPalette, setColorPalette] = useState(props.palette);
    const [numStripes, setNumStripes] = useState(props.numStripes || 15);
    const [nextIdx, setNextIdx] = useState(0);
    const [sound, setSound] = useState(getSound('Blip'));
    const [speed, setSpeed] = useState(1000);

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
            stripeArr.push({
                id: i,
                color: (getColor(i, props.palette)),
                height: `${.4 * (1 / num) + randomNum}`,
                stripeKey: uuidv4()
            })
        }
        return stripeArr
    }

    const soundPlay = soundObj => {
        const sound = new Howl({
            src: soundObj.src,
            sprite: soundObj.sprite
        });
        sound.play(soundObj.spriteName);
    }

    const balanceStripes = idx => {
        if(idx === 0) toggleIsOrganizing();
        let newStripes = stripes.map(stripe => {
            if(stripe.id === stripes[idx].id) {
                return {...stripe, height: `${(1 / numStripes) * .4}`}
            } else {
                return stripe;
            }
        });
        soundPlay(sound);
        setStripes(newStripes);
        setNextIdx(idx + 1);
        if(idx + 1 === stripes.length) {
            toggleIsOrganizing();
            toggleIsOrganized();
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
                return {...stripe, color: getColor(stripe.id, props.palette)}
            });
            setStripes(newStripes);
            setColorPalette(props.palette);
            colorsDoNotUpdate.current = true;
        } else {
            colorFirstUpdate.current = false;
        }
    }, [props.palette]);

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

    const handleToggleWindow = () => {
        if(props.fullWindow) {
            props.toggleWindow(null)
        } else {
            props.toggleWindow('barcode');
        }
    }

    const [stripes, setStripes] = useState(createStartingStripeArray(numStripes))
    return (
        <div style={{margin: props.fullWindow ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${props.width}px`, height: `${props.width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{position: 'relative', width: `${props.width}px`, height: `${.7 * props.width}px`}}>
                {stripes.map(stripe => {
                    return <div key={stripe.stripeKey} style={{margin: '0 auto', width: `${.4 * props.width}px`, height: `${stripe.height * props.width}px`, backgroundColor: stripe.color, border: `1px solid ${getColor('border', colorPalette)}`}}></div>
                })}
                <ControlBar toggleWindow={handleToggleWindow} fullWindow={props.fullWindow} palette={colorPalette} setPalette={handleSetColorPalette} setNumber={handleSetNumStripes} minNum={5} maxNum={25} number={numStripes} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='Blip' organizedFunction={unbalanceStripes} unorganizedFunction={() => balanceStripes(0)} unorgButton='Unbalance' orgButton='Balance' />
            </div>
        </div>
    )
}

export default Barcode;