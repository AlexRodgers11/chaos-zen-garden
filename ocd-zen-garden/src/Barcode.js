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
    const [sound, setSound] = useState(getSound('blip'));
    const [speed, setSpeed] = useState(1000);

    const createStartingStripeArray = num => {
        let totalHeight = .33 * .4 * props.width * (1 / num)
        let stripeArr = [];
        for(let i = 1; i < num + 1; i++) {
            let randomNum;
            if(totalHeight > (i + 1) * ((1 / num)  * .33 * .4 * props.width)) {
                randomNum = Math.random() * 1 / (num ** 1.05) * .33 * .4 * props.width * -1
            } else if(totalHeight > (i - 1) * ((1 / num)  * .33 * .4 * props.width)) {
                randomNum = Math.random() * 1 / (num ** 1.05) * .33 * .4 * props.width;
            } else {
                let posNeg = Math.random() > .4 ? -1 : 1;
                randomNum = posNeg * Math.random() * 1 / (num ** 1.05) * .33 * .4 * props.width;
            }
            totalHeight += .33 * .4 * props.width * (1 / num) + randomNum;
            stripeArr.push({
                id: i,
                color: (getColor(i, props.palette)),
                // height: `${.33 * .5 * props.width * (1 / num) + (posNeg * Math.random() * 1 / (num ** 1.5) * .33 * .6 * props.width)}px`
                height: `${.33 * .4 * props.width * (1 / num) + randomNum}px`,
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
                return {...stripe, height: `${(1 / numStripes)  * .33 * .4 * props.width}px`}
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
        // let newStripes = stripes.map(stripe => {
        //     return {...stripe, height: `${(1 / numStripes)  * .33 * .4 * props.width}px`}
        // })
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
        } else {
            colorFirstUpdate.current = false;
        }
    }, [props.palette]);
    
    const handleSetSound = sound => {
        setSound(getSound(sound))
    }

    const handleSetSpeed = speed => {
        setSpeed(speed);
    }

    const [stripes, setStripes] = useState(createStartingStripeArray(numStripes))
    return (
        <div style={{border: '1px solid black', width: '100%'}}>
            <p>Barcode Test</p>
            <div style={{position: 'relative', width: `${.33 * props.width}px`, height: `${.7 * .33 * props.width}px`}}>
                {stripes.map(stripe => {
                    return <div key={stripe.stripeKey} style={{margin: '0 auto', width: `${.33 * .4 * props.width}px`, height: stripe.height, backgroundColor: stripe.color, border: '1px solid black'}}></div>
                })}
                <ControlBar isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='blip' organizedFunction={unbalanceStripes} unorganizedFunction={() => balanceStripes(0)} unorgButton='Unbalance' orgButton='Balance' />
            </div>
        </div>
    )
}

export default Barcode;