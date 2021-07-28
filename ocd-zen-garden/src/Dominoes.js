import React, { useEffect, useRef, useState} from 'react';
import Dots from './Dots';
import useToggle from './hooks/useToggle';
import { getColor } from './utils';
import ControlBar from './ControlBar';

function Dominoes(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [colorPalette, setColorPalette] = useState(props.palette);
    const [nextIdx, setNextIdx] = useState();
    const [numLines, setNumLines] = useState(10);
    const [speed, setSpeed] = useState(1000);

    const generateTilt = () => {
        let x = Math.floor(Math.random() * 2) === 0 ? -1 : 1;
        let tilt = x * Math.random() * 4;
        return `${tilt}deg`;
    }

    const createStartingLinesArray = () => {
        let startingLineArray = [];
        for(let i = 0; i < numLines; i++) {
            startingLineArray.push({
                id: i + 1,
                tilt: generateTilt(),
                color: getColor(i + 1, colorPalette)
            })
        }
        return startingLineArray;
    }

    const [lines, setLines] = useState(createStartingLinesArray());
    // const [lines, setLines] = useState([{id: 1, tilt: generateTilt(), color: getColor(1)}, {id: 2, tilt: generateTilt(), color: getColor(2)}, {id: 3, tilt: generateTilt(), color: getColor(3)}, {id: 4, tilt: generateTilt(), color: getColor(4)}, {id: 5, tilt: generateTilt(), color: getColor(5)}, {id: 6, tilt: generateTilt(), color: getColor(6)}, {id: 7, tilt: generateTilt(), color: getColor(7)}, {id: 8, tilt: generateTilt(), color: getColor(8)}, {id: 9, tilt: generateTilt(), color: getColor(9)}, {id: 10, tilt: generateTilt(), color: getColor(10)}, {id: 11, tilt: generateTilt(), color: getColor(11)}, {id: 12, tilt: generateTilt(), color: getColor(12)}, {id: 13, tilt: generateTilt(), color: getColor(13)}, {id: 14, tilt: generateTilt(), color: getColor(14)}, {id: 15, tilt: generateTilt(), color: getColor(15)}]);

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(!firstUpdate.current && nextIdx < lines.length) {
            setTimeout(() => {
                straightenLines(nextIdx)
            }, speed)
        } else {
            firstUpdate.current = false;
        }
    }, [nextIdx]);

    const colorsFirstUpdate = useRef(true)
    useEffect(() => {
        if(!firstUpdate.current) {
            let newLines = lines.map(line => {
                return {...line, color: getColor(line.id, props.palette)}
            });
            setLines(newLines);
            setColorPalette(props.palette);
        } else {
            firstUpdate.current = false;
        }
    }, [props.palette])

    const straightenLines = idx => {
        let newLines = lines.map(line => {
            if(lines[idx].id === line.id) {
                return {...line, tilt: '0deg'}
            } else {
                return line;
            }
        });
        setLines(newLines);
        setNextIdx(idx + 1);
        if(idx + 1 === lines.length) {
            setTimeout(() => {
                toggleIsOrganized()
            }, speed);
        }
    }

    const tiltLines = () => {
        let newLines = lines.map(line => {
            return {...line, tilt: generateTilt()}
        })
        setLines(newLines);
        toggleIsOrganized();
    }

    const handleSetSpeed = time => {
        setSpeed(time);
    }

    return (
        <div style={{border: '1px solid black'}}>
            Dominoes Test
            <div>
                {lines.map(line => {
                    return <span style={{display: 'inline-block', width: '3px', border: '.75px solid black', height: .33 * .55 * props.width, margin: .33 * .02 * props.width, transform: `rotate(${line.tilt})`, backgroundColor: `${line.color}` }}></span>
                })}
            </div>
            {/* <button onClick={isOrganized ? tiltLines : () => straightenLines(0)}>{isOrganized ? 'Tilt' : 'Straighten'}</button> */}
            <ControlBar isOrganized={isOrganized} setSpeed={handleSetSpeed} organizedFunction={tiltLines} unorganizedFunction={() => straightenLines(0)} unorgButton='Tilt' orgButton='Straighten' />
        </div>
    )
}

export default Dominoes