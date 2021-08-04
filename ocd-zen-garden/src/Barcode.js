import React, { useState } from 'react';
import { getColor } from './utils';
import ControlBar from './ControlBar';

function Barcode(props) {
    // const createStartingStripeArray = num => {
    //     let totalHeight = 0;
    //     let stripeArr = [];
    //     for(let i = 0; i < num; i++) {
    //         totalHeight += .33 * .5 * props.width * (1 / num)
    //         let randomNum;
            
    //         if(totalHeight > (i + 2) * ((1 / num)  * .33 * .5 * props.width)) {
    //             randomNum = Math.random() * 1 / (num ** 1.25) * .33 * .5 * props.width * -1
    //         } else if(totalHeight > (i - 2) * ((1 / num)  * .33 * .5 * props.width)) {
    //             randomNum = Math.random() * 1 / (num ** 1.25) * .33 * .5 * props.width;
    //         } else {
    //             let posNeg = Math.random() > .5 ? -1 : 1;
    //             randomNum = posNeg * Math.random() * 1 / (num ** 1.25) * .33 * .5 * props.width;
    //         }
    //         stripeArr.push({
    //             id: i + 1,
    //             color: (getColor(i + 1, props.palette)),
    //             // height: `${.33 * .5 * props.width * (1 / num) + (posNeg * Math.random() * 1 / (num ** 1.5) * .33 * .6 * props.width)}px`
    //             height: `${.33 * .5 * props.width * (1 / num) + randomNum}px`
    //         })
    //     }
    //     return stripeArr
    // }

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
                height: `${.33 * .4 * props.width * (1 / num) + randomNum}px`
            })
        }
        return stripeArr
    }

    const [stripes, setStripes] = useState(createStartingStripeArray(20))
    return (
        <div style={{border: '1px solid black'}}>
            <p>Barcode Test</p>
            <div style={{position: 'relative', margin: '0 auto', width: `${.33 * props.width}px`, height: `${.7 * .33 * props.width}px`}}>
                {stripes.map(stripe => {
                    return <div style={{width: `${.33 * .4 * props.width}px`, height: stripe.height, backgroundColor: stripe.color, border: '1px solid black'}}></div>
                })}
                <ControlBar />
            </div>
        </div>
    )
}

export default Barcode;