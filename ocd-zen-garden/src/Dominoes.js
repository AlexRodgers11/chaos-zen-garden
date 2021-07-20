import React, { useEffect, useRef, useState} from 'react';
import useToggle from './hooks/useToggle';

function Dominoes(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [nextIdx, setNextIdx] = useState();

    const generateTilt = () => {
        let x = Math.floor(Math.random() * 2) === 0 ? -1 : 1;
        let tilt = x * Math.random() * 4;
        return `${tilt}deg`;
    }

    const [lines, setLines] = useState([{id: 1, tilt: generateTilt()}, {id: 2, tilt: generateTilt()}, {id: 3, tilt: generateTilt()}, {id: 4, tilt: generateTilt()}, {id: 5, tilt: generateTilt()}, {id: 6, tilt: generateTilt()}, {id: 7, tilt: generateTilt()}, {id: 8, tilt: generateTilt()}, {id: 9, tilt: generateTilt()}, {id: 10, tilt: generateTilt()}, {id: 11, tilt: generateTilt()}, {id: 12, tilt: generateTilt()}, {id: 13, tilt: generateTilt()}, {id: 14, tilt: generateTilt()}, {id: 15, tilt: generateTilt()}]);

    const firstUpdate = useRef(false);
    useEffect(() => {
        if(firstUpdate.current && nextIdx < lines.length) {
            setTimeout(() => {
                straightenLines(nextIdx)
            }, 1000)
        } else {
            firstUpdate.current = true;
        }
    });

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
            }, 1000);
        }
    }

    const tiltLines = () => {
        let newLines = lines.map(line => {
            return {...line, tilt: generateTilt()}
        })
        setLines(newLines);
        toggleIsOrganized();
    }

    return (
        <div style={{border: '1px solid black'}}>
            Dominoes Test
            <div>
                {lines.map(line => {
                    return <span style={{display: 'inline-block', width: '3px', backgroundColor: 'black', height: .33 * .55 * props.width, margin: .33 * .02 * props.width, transform: `rotate(${line.tilt})` }}></span>
                })}
            </div>
            <button onClick={isOrganized ? tiltLines : () => straightenLines(0)}>{isOrganized ? 'Tilt' : 'Straighten'}</button>
        </div>
    )
}

export default Dominoes