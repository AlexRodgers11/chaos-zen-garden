import React, { useEffect, useRef, useState } from 'react';
import useToggle from './hooks/useToggle';
import { getColor, getSound } from './utils';
import ControlBar from './ControlBar';
import { Howl } from 'howler';


function Edges(props) {
    const [isOrganized, toggleIsOrganized] = useToggle(false);
    const [isOrganizing, toggleIsOrganizing] = useToggle(false);
    const [nextIndex, setNextIndex] = useState(0);
    const [speed, setSpeed] = useState(1000);
    const [sound, setSound] = useState(getSound('Ding'));
    const [colorPalette, setColorPalette] = useState(props.palette);
    const [numEdges, setNumEdges] = useState(17);
    const [userJustChangedNumber, toggleUserJustChangedNumber] = useToggle(props.id === 1 ? false : props.userJustChangedNumber)

    const createStartingEdgeArray = num => {
        let edges = [];
        for(let i = 1; i <= num; i++) {
            let edgeTable = {
                0: false,
                1: false,
                2: false,
                3: false
            }
            let randomNum = Math.floor(Math.random() * 4);
            edgeTable[randomNum] = true;
            
            edges.push({
                id: i,
                color: getColor(i, colorPalette),
                top: edgeTable[0] ? false: true,
                right: edgeTable[1] ? false : true,
                bottom: edgeTable[2] ? false : true,
                left: edgeTable[3] ? false : true,
            })
        }
        return edges;
    }

    const [edges, setEdges] = useState(createStartingEdgeArray(numEdges));

    const soundPlay = soundObj => {
        const sound = new Howl({
            src: soundObj.src,
            sprite: soundObj.sprite,
            volume: props.volume * .01
        });
        sound.play(soundObj.spriteName);
    }

    const firstUpdate = useRef(true);
    useEffect(()=>{
        if(!firstUpdate.current) {
            if(nextIndex < edges.length){
                setTimeout(()=>{
                    complete(nextIndex);
                }, speed);
            }
        } else {
            firstUpdate.current = false;
        }     
    }, [nextIndex]);

    const colorFirstUpdate = useRef(true);
    useEffect(() => {
        if(!colorFirstUpdate.current) {
            let newEdges = edges.map(edge => {
                return {...edge, color: getColor(edge.id, props.palette)}
            });
            setColorPalette(props.palette);
            setEdges(newEdges);
            colorsDoNotUpdate.current = true;
        } else {
            colorFirstUpdate.current = false;
        }
    }, [props.palette]);

    const colorsDoNotUpdate = useRef(true)
    useEffect(() => {
        if(!colorsDoNotUpdate.current) {
            let newEdges = edges.map(edge => {
                return {...edge, color: getColor(edge.id, colorPalette)}
            });
            setEdges(newEdges);
        } else {
            colorsDoNotUpdate.current = false;
        }
        
    }, [colorPalette]);


    const complete = (idx) => {
        if(idx === 0) {
            toggleIsOrganizing();
            props.increaseNumOrganizing();
        }
        let newEdges = edges.map(edge => {
            if(edge.id === edges[idx].id) {
                return {
                    ...edge,
                    top: true,
                    right: true,
                    bottom: true,
                    left: true,
                }
            } else {
                return edge;
            }
            
        });

        soundPlay(sound);
        setEdges(newEdges);
        setNextIndex(idx + 1);
        if(idx + 1 === edges.length) setTimeout(() => {
            toggleIsOrganized();
            toggleIsOrganizing();
            props.decreaseNumOrganizing();
        }, speed)
    }

    const remove = () => {
        let newEdges = createStartingEdgeArray(numEdges);
        setEdges(newEdges);
        toggleIsOrganized();
    }

    const handleSetSpeed = time => {
        setSpeed(time);
    }

    const handleSetSound = sound => {
        setSound(getSound(sound));
    }

    const handleSetColorPalette = palette => {
        colorsDoNotUpdate.current = false;
        setColorPalette(palette);
    }

    const handleChangeVolume = volume => {
        props.changeVolume(volume);
    }

    const handleSetNumEdges = num => {
        setNumEdges(Number(num));
        setEdges(createStartingEdgeArray(Number(num)))
    }


    const handleToggleWindow = () => {
        if(props.fullWindow) {
            props.toggleWindow(null)
        } else {
            props.toggleWindow('edges');
        }
    }

    const display = (id) => {
        if(id <= numEdges) {
            return (
                <div style={{
                    margin: '0 auto',
                    position: 'relative', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    borderTop: edges[id - 1].top ? `1px solid ${edges[id -1].color}` : 'none',
                    borderRight: edges[id - 1].right ? `1px solid ${edges[id -1].color}` : 'none',
                    borderBottom: edges[id - 1].bottom ? `1px solid ${edges[id -1].color}` : 'none',
                    borderLeft: edges[id - 1].left ? `1px solid ${edges[id -1].color}` : 'none',
                    height: `${id === 1 ? `${.6 * props.width}px` : `${(.6 - (id - 1) * (.6 / numEdges)) * props.width}px`}`, 
                    width: `${id === 1 ? `${.6 * props.width}px` : `${(.6 - (id - 1) * (.6 / numEdges)) * props.width}px`}`}}>
                        {display(id + 1)}
                    </div>
            )
        }
    }

    return (
        <div style={{margin: props.fullWindow ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${props.width}px`, height: `${props.width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%'}}>
                    <div>
                        {display(1)}
                    </div>
                </div>
            <ControlBar width={props.width} loggedIn={props.loggedIn} toggleHighlightUserIcon={props.toggleHighlightUserIcon} toggleWindow={handleToggleWindow} fullWindow={props.fullWindow} disableFullWindow={props.disableFullWindow} setModalContent={props.setModalContent} volume={props.volume} changeVolume={handleChangeVolume} palette={colorPalette} setPalette={handleSetColorPalette} setNumber={handleSetNumEdges} minNum={4} maxNum={40} number={numEdges} isOrganizing={isOrganizing} isOrganized={isOrganized} setSpeed={handleSetSpeed} setSound={handleSetSound} soundValue='Ding' organizedFunction={remove} unorganizedFunction={() => complete(0)} unorgButton='Remove' orgButton='Complete' />

            </div>
        </div>
    )
}

export default Edges;