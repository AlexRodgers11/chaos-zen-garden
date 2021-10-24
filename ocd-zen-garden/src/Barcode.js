import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { organizingCounterActions } from './store/organizing-counter';
import { sizeActions } from './store/size';
import { getColor, getSound, scaler, soundPlay } from './utils';
import ControlBar from './ControlBar';
import useToggle from './hooks/useToggle';
import { v4 as uuidv4 } from 'uuid';

function Barcode(props) {
    const width = useSelector((state) => state.size.pieceWidth);
    const palette = useSelector((state) => state.palette.palette);
    const volume = useSelector((state) => state.volume.volume);
    const fullView = useSelector((state) => state.size.fullView);
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [colorPalette, setColorPalette] = useState(palette);
    const [numStripes, setNumStripes] = useState(15);
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

    const handleToggleFullView = () => {
        dispatch(sizeActions.setFullView(
            [
                props.id, {
                    type: 'barcode',
                    palette: palette,
                    speed: speed,
                    sound: sound,
                    proportionalVolume: proportionalVolume,
                    number: numStripes,
                    shape: null ,
                    text: null
                }
            ]
        ));
    }

    const [stripes, setStripes] = useState(createStartingStripeArray(numStripes))
    return (
        <div style={{margin: fullView ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${width}px`, height: `${width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%'}}>
                    <div>
                        {stripes.map(stripe => {
                            return <div key={stripe.key} style={{margin: '0 auto', width: `${.4 * width}px`, height: `${Math.floor(stripe.height * width)}px`, backgroundColor: stripe.color, border: `1px solid ${getColor('border', colorPalette)}`}}></div>
                        })}
                    </div>
                </div>
                <ControlBar id={props.id} toggleFullView={handleToggleFullView} palette={colorPalette} changeProportionalVolume={handleChangeProportionalVolume} proportionalVolume={proportionalVolume} setPalette={handleSetColorPalette} setNumber={handleSetNumStripes} minNum={5} maxNum={25} number={numStripes} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='Blip' organizedFunction={unbalanceStripes} unorganizedFunction={() => balanceStripes(0)} unorgButton='Unbalance' orgButton='Balance' />
            </div>
        </div>
    )
}

export default Barcode;