import React from 'react';
import useToggle from './hooks/useToggle';

// function Modal(props, {children}) {
function Modal(props) {
    const handleToggleHideModal = () => {
        props.toggleHideModal()
    }

    return (
        <div style={{
            position: 'fixed',
            textAlign: 'center',
            width: '100%',
            height: '100vh',
            display: `${props.hidden ? 'none' : 'flex'}`,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, .90)',
            zIndex: 1000
        }} onClick={handleToggleHideModal}>
            <div style={{
                width: '40%',
                height: '80%',
                border: '1px solid black',
                backgroundColor: 'yellow'
            }}>
                <div style={{display: 'flex', width: '100%', height: '5%', justifyContent: 'end'}}>
                    <button style={{cursor: 'pointer'}} onClick={handleToggleHideModal}>Close</button>                    
                </div>
                <div style={{width: '50%', height: '50%', backgroundColor: 'blue'}}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Modal;