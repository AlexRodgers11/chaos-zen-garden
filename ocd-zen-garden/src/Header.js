import React, { useState } from 'react';
import { getColor } from './utils';
import { palettes } from './utils';
import { v4 as uuidv4 } from 'uuid';
import { GiHamburgerMenu } from 'react-icons/gi/';
import { FaUserCircle } from 'react-icons/fa/';
import { IoIosColorPalette } from 'react-icons/io/';
import './Header.css';

function Header(props){
    const [colorPalette, setColorPalette] = useState(palettes[0]);
    const [showDropdown, setShowDropdown] = useState({
        main: false,
        palette: false
    })
    const handleChangePalette = palette => {
        handleToggleDropdown('palette');
        setColorPalette(palette);
        props.changePalette(palette);
    }

    const handleToggleDropdown = group => {
        setShowDropdown({...showDropdown, [group]: !showDropdown[group]});
    }

    return(
        <div className="Header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'fixed', width: '100%', height:'45px', backgroundColor: '#303030', fontFamily: 'Arial Narrow, sans-serif', fontWeight: '600', fontSize: '1.85em', borderBottom: '1.7px solid #000', zIndex: 2}}>
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
            {/* <select style={{marginRight: '1.5em'}} onChange={handleChangePalette} value={colorPalette}>
                {palettes.map(palette => {
                    let paletteKey = uuidv4();
                    return <option key={paletteKey} value={palette}>{palette}</option>
                })}
            </select> */}

            {/* <div onMouseLeave={showDropdown.sound ? () => handleToggleDropdown('sound') : null} class={`dropdown ${showDropdown.sound ? 'dropdown-active' : ''}`}>
                <button style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '2px'}} id="sound" onClick={() => handleToggleDropdown('sound')}><GoBell size='1.5em' /></button>
                <div className='dropdown-content'>
                    {sounds.map(sound => {
                        return <p onClick={() => handleSoundChange(sound)} >{sound}</p>
                    })}
                </div>
            </div> */}

            {/* <div onMouseLeave={showDropdown.palette ? () => handleToggleDropdown('main') : null} className={`dropdown ${showDropdown.main ? 'dropdown-active' : ''}`} style={{display: 'flex', alignItems: 'center', marginRight: '.5rem'}}> */}
            <div style={{display: 'flex', alignItems: 'center', marginRight: '1rem'}}>
                <div onMouseLeave={showDropdown.palette ? () => handleToggleDropdown('palette') : null} className={`Header_dropdown ${showDropdown.palette ? 'Header_dropdown-active' : ''}`} >
                    <div style={{display: 'flex', alignItems: 'center', marginRight: '.5rem'}}>
                        <IoIosColorPalette id="palette" onClick={() => handleToggleDropdown('palette')} size="2rem" color={getColor('aux1', colorPalette)}/>
                    </div>

                    <div className='Header_dropdown-content'>
                        {palettes.map(palette => {
                            let paletteKey = uuidv4();
                            return <p onClick={() => {handleChangePalette(palette)}} key={paletteKey} >{palette}</p>
                        })}
                    </div>
                </div>
                <div onMouseLeave={showDropdown.main ? () => handleToggleDropdown('main') : null} className={`Header_dropdown ${showDropdown.main ? 'Header_dropdown-active' : ''}`} >
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <FaUserCircle id="main" onClick={() => handleToggleDropdown('main')} size="1.5rem" color={getColor('aux2', colorPalette)}/>
                    </div>

                    <div className='Header_dropdown-content'>
                        <p>Create Account</p>
                        <p>Log In</p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;

