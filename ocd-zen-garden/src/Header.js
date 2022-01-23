import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { paletteActions } from './store/palette';
import { getColor } from './utils';
import { palettes } from './utils';
import { v4 as uuidv4 } from 'uuid';
import { GiHamburgerMenu } from 'react-icons/gi/';
import { FaUserCircle, FaLongArrowAltUp } from 'react-icons/fa/';
import { IoIosColorPalette } from 'react-icons/io/';
import './Header.css';
import { authenticationActions } from './store/authentication';
import { modalContentActions } from './store/modal-content';

function Header(){
    const dispatch = useDispatch();
    const palette = useSelector((state) => state.palette.palette);
    const loggedIn = useSelector((state) => state.authentication.loggedIn);
    const modalContent = useSelector((state) => state.modalContent.modalContent);
    const organizingCounter = useSelector((state) => state.organizingCounter.organizingCounter);
    const highlightUserIcon = useSelector((state) => state.highlightUserIcon.highlightUserIcon);
    const [showDropdown, setShowDropdown] = useState({
        main: false,
        palette: false
    })
    const handleChangePalette = palette => {
        handleToggleDropdown('palette');
        dispatch(paletteActions.setPalette(palette));
    }

    const handleToggleDropdown = group => {
        if(!modalContent || showDropdown[group]) {
            setShowDropdown({...showDropdown, [group]: !showDropdown[group]});
        }
    }

    const handleSetModalContent = evt => {
        if(!loggedIn) {
            dispatch(modalContentActions.setModalContent(evt.target.id))
        } else {
            dispatch(authenticationActions.toggleLogInStatus());
        }
    }

    return(
        <div className="Header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'fixed', width: '100%', height:'45px', backgroundColor: '#303030', fontFamily: 'Arial Narrow, sans-serif', fontWeight: '600', fontSize: '1.85em', zIndex: 300}}>
            <div>
                <span style={{marginLeft: '.5em', color: getColor(1, palette), textShadow:`-1.425px -1.425px 0 #000,1.425px -1.425px 0 #000,-1.425px 1.425px 0 #000,1.425px 1.425px 0 #000`}}>C</span>
                <span style={{color: getColor(2, palette), textShadow:`-1.425px -1.425px 0 #000,1.425px -1.425px 0 #000,-1.425px 1.425px 0 #000,1.425px 1.425px 0 #000`}}>H</span>
                <span style={{color: getColor(3, palette), textShadow:`-1.425px -1.425px 0 #000,1.425px -1.425px 0 #000,-1.425px 1.425px 0 #000,1.425px 1.425px 0 #000`}}>A</span>
                <span style={{color: getColor(4, palette), textShadow:`-1.425px -1.425px 0 #000,1.425px -1.425px 0 #000,-1.425px 1.425px 0 #000,1.425px 1.425px 0 #000`}}>O</span>
                <span style={{marginRight: '.25em', color: getColor(5, palette), textShadow:`-1.425px -1.425px 0 #000,1.425px -1.425px 0 #000,-1.425px 1.425px 0 #000,1.425px 1.425px 0 #000`}}>S</span>
                <span style={{color: getColor(6, palette), textShadow:`-1.425px -1.425px 0 #000,1.425px -1.425px 0 #000,-1.425px 1.425px 0 #000,1.425px 1.425px 0 #000`}}>Z</span>
                <span style={{color: getColor(7, palette), textShadow:`-1.425px -1.425px 0 #000,1.425px -1.425px 0 #000,-1.425px 1.425px 0 #000,1.425px 1.425px 0 #000`}}>E</span>
                <span style={{marginRight: '.25em', color: getColor(8, palette), textShadow:`-1.425px -1.425px 0 #000,1.425px -1.425px 0 #000,-1.425px 1.425px 0 #000,1.425px 1.425px 0 #000`}}>N</span>
                <span style={{color: getColor(9, palette), textShadow:`-1.425px -1.425px 0 #000,1.425px -1.425px 0 #000,-1.425px 1.425px 0 #000,1.425px 1.425px 0 #000`}}>G</span>
                <span style={{color: getColor(10, palette), textShadow:`-1.425px -1.425px 0 #000,1.425px -1.425px 0 #000,-1.425px 1.425px 0 #000,1.425px 1.425px 0 #000`}}>A</span>
                <span style={{color: getColor(11, palette), textShadow:`-1.425px -1.425px 0 #000,1.425px -1.425px 0 #000,-1.425px 1.425px 0 #000,1.425px 1.425px 0 #000`}}>R</span>
                <span style={{color: getColor(12, palette), textShadow:`-1.425px -1.425px 0 #000,1.425px -1.425px 0 #000,-1.425px 1.425px 0 #000,1.425px 1.425px 0 #000`}}>D</span>
                <span style={{color: getColor(12, palette), textShadow:`-1.425px -1.425px 0 #000,1.425px -1.425px 0 #000,-1.425px 1.425px 0 #000,1.425px 1.425px 0 #000`}}>E</span>
                <span style={{color: getColor(12, palette), textShadow:`-1.425px -1.425px 0 #000,1.425px -1.425px 0 #000,-1.425px 1.425px 0 #000,1.425px 1.425px 0 #000`}}>N</span>
            </div>

            <div style={{display: 'flex', alignItems: 'center', marginRight: '1rem'}}>
                <div onMouseLeave={showDropdown.palette ? () => handleToggleDropdown('palette') : null} className={`Header_dropdown ${showDropdown.palette ? 'Header_dropdown-active' : ''}`} >
                    <div style={{display: 'flex', alignItems: 'center', marginRight: '.5rem', cursor: `${organizingCounter === 0 ? 'pointer' : 'wait'}`}}>
                        <IoIosColorPalette id="palette" className="Header_dropbtn" onClick={organizingCounter === 0 ? () => handleToggleDropdown('palette') : null} size="2rem" color={getColor('aux1', palette)}/>
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
                        <div style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}} className="tooltip">
                            {highlightUserIcon ? <span className='tooltiptext'><FaLongArrowAltUp size="1.5rem" /></span> : null}<FaUserCircle id="main" className="Header_dropbtn" onClick={() => handleToggleDropdown('main')} size="1.5rem" color={!highlightUserIcon ? getColor('aux2', palette) : 'white'}/>
                        </div>
                    </div>

                    <div className='Header_dropdown-content'>
                        {!loggedIn ? <p id="new-user" onClick={handleSetModalContent}>Create Account</p> : null}
                        <p id="login" onClick={handleSetModalContent}>{loggedIn ? 'Log Out' : 'Log In'}</p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;

