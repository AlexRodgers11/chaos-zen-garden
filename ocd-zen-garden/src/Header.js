import React, { useState } from 'react';
import { getColor } from './utils';
import { palettes } from './utils';
import { v4 as uuidv4 } from 'uuid';

function Header(props){
    const [colorPalette, setColorPalette] = useState(palettes[0]);
    const handleChangePalette = evt => {
        setColorPalette(evt.target.value);
        props.changePalette(evt.target.value);
    }

    return(
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'fixed', width: '100%', height:'45px', backgroundColor: '#303030', fontFamily: 'Arial Narrow, sans-serif', fontWeight: '600', fontSize: '1.85em', borderBottom: '1.7px solid #000', zIndex: 2}}>
            <div>
                <span style={{marginLeft: '.5em', color: getColor(1, colorPalette), textShadow:`-1.425px -1.425px 0 #000,1.425px -1.425px 0 #000,-1.425px 1.425px 0 #000,1.425px 1.425px 0 #000`}}>O</span>
                <span style={{color: getColor(2, colorPalette), textShadow:`-1.425px -1.425px 0 #000,1.425px -1.425px 0 #000,-1.425px 1.425px 0 #000,1.425px 1.425px 0 #000`}}>C</span>
                <span style={{marginRight: '.25em', color: getColor(3, colorPalette), textShadow:`-1.425px -1.425px 0 #000,1.425px -1.425px 0 #000,-1.425px 1.425px 0 #000,1.425px 1.425px 0 #000`}}>D</span>
                <span style={{color: getColor(4, colorPalette), textShadow:`-1.425px -1.425px 0 #000,1.425px -1.425px 0 #000,-1.425px 1.425px 0 #000,1.425px 1.425px 0 #000`}}>Z</span>
                <span style={{color: getColor(5, colorPalette), textShadow:`-1.425px -1.425px 0 #000,1.425px -1.425px 0 #000,-1.425px 1.425px 0 #000,1.425px 1.425px 0 #000`}}>E</span>
                <span style={{marginRight: '.25em', color: getColor(6, colorPalette), textShadow:`-1.425px -1.425px 0 #000,1.425px -1.425px 0 #000,-1.425px 1.425px 0 #000,1.425px 1.425px 0 #000`}}>N</span>
                <span style={{color: getColor(7, colorPalette), textShadow:`-1.425px -1.425px 0 #000,1.425px -1.425px 0 #000,-1.425px 1.425px 0 #000,1.425px 1.425px 0 #000`}}>G</span>
                <span style={{color: getColor(8, colorPalette), textShadow:`-1.425px -1.425px 0 #000,1.425px -1.425px 0 #000,-1.425px 1.425px 0 #000,1.425px 1.425px 0 #000`}}>A</span>
                <span style={{color: getColor(9, colorPalette), textShadow:`-1.425px -1.425px 0 #000,1.425px -1.425px 0 #000,-1.425px 1.425px 0 #000,1.425px 1.425px 0 #000`}}>R</span>
                <span style={{color: getColor(10, colorPalette), textShadow:`-1.425px -1.425px 0 #000,1.425px -1.425px 0 #000,-1.425px 1.425px 0 #000,1.425px 1.425px 0 #000`}}>D</span>
                <span style={{color: getColor(11, colorPalette), textShadow:`-1.425px -1.425px 0 #000,1.425px -1.425px 0 #000,-1.425px 1.425px 0 #000,1.425px 1.425px 0 #000`}}>E</span>
                <span style={{color: getColor(12, colorPalette), textShadow:`-1.425px -1.425px 0 #000,1.425px -1.425px 0 #000,-1.425px 1.425px 0 #000,1.425px 1.425px 0 #000`}}>N</span>
            </div>
            <select style={{marginRight: '1.5em'}} onChange={handleChangePalette} value={colorPalette}>
                {palettes.map(palette => {
                    let paletteKey = uuidv4();
                    return <option key={paletteKey} value={palette}>{palette}</option>
                })}
            </select>
        </div>
    )
}

export default Header;

