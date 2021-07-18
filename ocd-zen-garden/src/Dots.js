import React, { useState, useRef, useEffect } from 'react';
import useToggle from './hooks/useToggle';

function Dots(props) {
    const [isOrganized, setIsOrganized] = useToggle(false);
    const [nextIndex, setNextIndex] = useState(1);
    const [dots, setDots] = useState([
        {id: 1, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`}, 
        {id: 2, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`}, 
        {id: 3, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`}, 
        {id: 4, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`}, 
        {id: 5, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`}, 
        {id: 6, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`}, 
        {id: 7, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`}, 
        {id: 8, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`}, 
        {id: 9, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`}, 
        {id: 10, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`}, 
        {id: 11, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`}, 
        {id: 12, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`}, 
        {id: 13, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`}, 
        {id: 14, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`}, 
        {id: 15, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`}, 
        {id: 16, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`}, 
        {id: 17, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`}, 
        {id: 18, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`}, 
        {id: 19, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`}, 
        {id: 20, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`}, 
        {id: 21, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`}, 
        {id: 22, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`}, 
        {id: 23, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`}, 
        {id: 24, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`}, 
        {id: 25, marginLeft: `${props.width * .33 * Math.random() * .05}`, marginTop: `${props.width * .33 * Math.random() * .05}`}]);

    const displayDots = () => {
        let dotLines = []
        let newLine = []
        for(let k = 0; k < dots.length; k++){
            newLine.push(dots[k]);
            if(newLine.length === 5){
                dotLines.push(newLine);
                newLine = []
            }
        }
        console.log(dotLines);
        return dotLines;
    }
    const organizeDots = () => {
        //marginLeft: `${props.width * .33 * .025 - .5}px`, marginTop: `${props.width * .33 * .025 - .5}px`
    }

    const scatterDots = () => {
        return dots.map(dot => {

        })
    }

    return (
        <div style={{width: '100%', border: '1px solid black'}}>
            <p>Dots Test</p>
            {/* <div style={{width: '45%', margin: '0 auto'}}> */}
            <div style={{margin: '0 auto'}}>
                {displayDots().map(dotLine => {
                    return <p style={{marginBlockEnd: 0, marginBlockStart: 0, padding: 0, marginBottom: 0, marginTop: 0}}>
                        {dotLine.map(dot => {
                            // return <span style={{display: 'inline-block', border: '1px solid black', borderRadius: '50%', width: `${props.width * .33 * .035}px`, height: `${props.width * .33 * .035}px`, margin: `${props.width * .33 * .035}px`, marginBottom: `${props.width * .33 * .035}px`}}></span>
                            // return <span style={{display: 'inline-block', border: '.5px solid black', width: `${props.width * .33 * .035}px`, height: `${props.width * .33 * .035}px`, marginBottom: '0'}}><span style={{display: 'inline-block', border: '1px solid black', borderRadius: '50%', width: `${props.width * .33 * .035}px`, height: `${props.width * .33 * .035}px`, margin: `${props.width * .33 * .035}px`, marginBottom: `${props.width * .33 * .035}px`}}></span></span>
                            // return <span style={{display: 'inline-block', border: '1px solid black', width: `${props.width * .33 * .035 + 2}px`, height: `${props.width * .33 * .035 + 2}px`, marginBottom: '0'}}><span style={{display: 'inline-block', border: '1px solid black', borderRadius: '50%', width: `${props.width * .33 * .035}px`, height: `${props.width * .33 * .035}px`}}></span></span>
                            return <span style={{display: 'inline-block', textAlign: 'left', padding: '0px', border: '1px solid black', width: `${props.width * .33 * .10}px`, height: `${props.width * .33 * .10}px`, marginBottom: '0'}}><span style={{display: 'block', border: '1px solid black', borderRadius: '50%', width: `${props.width * .33 * .05}px`, height: `${props.width * .33 * .05}px`, marginLeft: `${dot.marginLeft}px`, marginTop: `${dot.marginTop}px`}}></span></span>
                        })}
                    </p>
                })}
                <button onClick={isOrganized ? scatterDots : () => scatterDots(0)}>{isOrganized ? 'Scatter' : 'Organize'}</button>
            </div>
        </div>
    )
}

export default Dots;