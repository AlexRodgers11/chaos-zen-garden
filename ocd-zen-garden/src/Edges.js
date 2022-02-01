import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useGardenSpecs from './hooks/useGardenSpecs';
import usePieceSpecs from './hooks/usePieceSpecs';
import { sizeActions } from './store/size';
import { organizingCounterActions } from './store/organizing-counter';
import useToggle from './hooks/useToggle';
import { getColor, soundPlay } from './utils';
import ControlBar from './ControlBar/ControlBar';
import { Howl } from 'howler';


function Edges(props) {
    const palette = useSelector((state) => state.palette.palette);
    const [colorPalette, setColorPalette] = useState(palette);
    const [width, volume, fullView, dispatch] = useGardenSpecs();
    const pieceSpecs = usePieceSpecs({id: 0, dir: 'vertical'}, props.number, props.proportionalVolume, props.shape, props.sound, props.speed, props.text);

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

    const [edges, setEdges] = useState(createStartingEdgeArray(pieceSpecs.number));

    const firstUpdate = useRef(true);
    useEffect(()=>{
        if(!firstUpdate.current) {
            if(pieceSpecs.nextIndex < edges.length){
                setTimeout(()=>{
                    complete(pieceSpecs.nextIndex);
                }, pieceSpecs.speed);
            }
        } else {
            firstUpdate.current = false;
        }     
    }, [pieceSpecs.nextIndex]);

    const colorFirstUpdate = useRef(true);
    useEffect(() => {
        if(!colorFirstUpdate.current) {
            let newEdges = edges.map(edge => {
                return {...edge, color: getColor(edge.id, palette)}
            });
            setColorPalette(palette);
            setEdges(newEdges);
            colorsDoNotUpdate.current = true;
        } else {
            colorFirstUpdate.current = false;
        }
    }, [palette]);

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
            pieceSpecs.toggleIsOrganizing();
            dispatch(organizingCounterActions.incrementOrganizingCounter())
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

        soundPlay(pieceSpecs.soundObj, .01, volume, pieceSpecs.proportionalVolume);
        setEdges(newEdges);
        pieceSpecs.setNextIndex(idx + 1);
        if(idx + 1 === edges.length) {
            dispatch(organizingCounterActions.decrementOrganizingCounter());
            setTimeout(() => {
                pieceSpecs.toggleIsOrganized();
                pieceSpecs.toggleIsOrganizing();
            }, pieceSpecs.speed);
        } 
    }

    const remove = () => {
        let newEdges = createStartingEdgeArray(pieceSpecs.number);
        setEdges(newEdges);
        pieceSpecs.toggleIsOrganized();
    }

    const handleSetColorPalette = palette => {
        colorsDoNotUpdate.current = false;
        setColorPalette(palette);
    }

    const handleSetNumEdges = num => {
        pieceSpecs.setNumber(Number(num));
        setEdges(createStartingEdgeArray(Number(num)))
    }

    const display = (id) => {
        if(id <= pieceSpecs.number) {
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
                    height: `${id === 1 ? `${.6 * width}px` : `${(.6 - (id - 1) * (.6 / pieceSpecs.number)) * width}px`}`, 
                    width: `${id === 1 ? `${.6 * width}px` : `${(.6 - (id - 1) * (.6 / pieceSpecs.number)) * width}px`}`}}>
                        {display(id + 1)}
                    </div>
            )
        }
    }

    const handleToggleFullView = () => {
        dispatch(sizeActions.setFullView(
            [
                props.id, {
                    type: 'edges',
                    palette: palette,
                    speed: pieceSpecs.speed,
                    sound: pieceSpecs.soundName,
                    proportionalVolume: pieceSpecs.proportionalVolume,
                    number: pieceSpecs.number,
                    shape: pieceSpecs.shape,
                    text: pieceSpecs.text
                }
            ]
        ));
    }

    return (
        <div style={{margin: fullView ? '0 auto' : 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${width}px`, height: `${width}px`, border: '1px solid black', backgroundColor: getColor('base', colorPalette)}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%'}}>
                    <div>
                        {display(1)}
                    </div>
                </div>
            <ControlBar id={props.id} toggleFullView={handleToggleFullView} palette={colorPalette} setPalette={handleSetColorPalette} setNumber={handleSetNumEdges} minNum={4} maxNum={40} number={pieceSpecs.number} isOrganizing={pieceSpecs.isOrganizing} isOrganized={pieceSpecs.isOrganized} setSpeed={pieceSpecs.setSpeed} setSound={pieceSpecs.setSound} soundValue='Ding' organizedFunction={remove} unorganizedFunction={() => complete(0)} unorgButton='Remove' orgButton='Complete' />

            </div>
        </div>
    )
}

export default Edges;