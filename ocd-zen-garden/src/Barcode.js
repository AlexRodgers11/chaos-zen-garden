import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useGardenSpecs from './hooks/useGardenSpecs';
import usePieceSpecs from './hooks/usePieceSpecs';
import { organizingCounterActions } from './store/organizing-counter';
import { sizeActions } from './store/size';
import { getColor, scaler, soundPlay } from './utils';
import ControlBar from './ControlBar/ControlBar';
import { v4 as uuidv4 } from 'uuid';

function Barcode(props) {
    const palette = useSelector((state) => state.palette.palette);
    const [colorPalette, setColorPalette] = useState(palette);
    const [width, volume, fullView, dispatch] = useGardenSpecs();
    const pieceSpecs = usePieceSpecs(0, props.number, props.proportionalVolume, props.shape, props.sound, props.speed, props.text);


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
            pieceSpecs.toggleIsOrganizing();
            dispatch(organizingCounterActions.incrementOrganizingCounter())
        }
        let newStripes = stripes.map(stripe => {
            if(stripe.id === stripes[idx].id) {
                return {...stripe, height: `${(1 / pieceSpecs.number) * .4}`}
            } else {
                return stripe;
            }
        });
        soundPlay(pieceSpecs.soundObj, stripes[idx].volumeMultiplier, volume, pieceSpecs.proportionalVolume);
        setStripes(newStripes);
        pieceSpecs.setNextIndex(idx + 1);
        if(idx + 1 === stripes.length) {
            pieceSpecs.toggleIsOrganizing();
            pieceSpecs.toggleIsOrganized();
            dispatch(organizingCounterActions.decrementOrganizingCounter());
        }
    }

    const unbalanceStripes = () => {
        let newStripes = createStartingStripeArray(pieceSpecs.number);
        setStripes(newStripes);
        pieceSpecs.toggleIsOrganized();
    }

    let firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current) {
            if(pieceSpecs.nextIndex < stripes.length) {
                setTimeout(() => {
                    balanceStripes(pieceSpecs.nextIndex);
                }, pieceSpecs.speed);
            }
        } else {
            firstUpdate.current = false;
        }
    }, [pieceSpecs.nextIndex]);

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

    const handleSetNumStripes = num => {
        pieceSpecs.setNumber(Number(num));
        setStripes(createStartingStripeArray(Number(num)))
    }

    const handleSetColorPalette = palette => {
        colorsDoNotUpdate.current = false;
        setColorPalette(palette);
    }

    const handleToggleFullView = () => {
        dispatch(sizeActions.setFullView(
            [
                props.id, {
                    type: 'barcode',
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

    const [stripes, setStripes] = useState(createStartingStripeArray(pieceSpecs.number))
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
                <ControlBar id={props.id} toggleFullView={handleToggleFullView} palette={colorPalette} changeProportionalVolume={pieceSpecs.setProportionalVolume} proportionalVolume={pieceSpecs.proportionalVolume} setPalette={handleSetColorPalette} setNumber={handleSetNumStripes} minNum={5} maxNum={25} number={pieceSpecs.number} isOrganizing={pieceSpecs.isOrganizing} isOrganized={pieceSpecs.isOrganized} setSpeed={pieceSpecs.setSpeed} setSound={pieceSpecs.setSound} soundValue='Blip' organizedFunction={unbalanceStripes} unorganizedFunction={() => balanceStripes(0)} unorgButton='Unbalance' orgButton='Balance' />
            </div>
        </div>
    )
}

export default Barcode;