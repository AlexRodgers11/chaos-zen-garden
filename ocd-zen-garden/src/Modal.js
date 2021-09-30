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
            zIndex: '999'
        }}>
            <div style={{width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, .90)', zIndex: '10000'}} onClick={handleToggleHideModal}></div>
            <div style={{
                position: 'fixed',
                width: '40%',
                height: '80%',
                border: '1px solid black',
                backgroundColor: 'yellow',
                zIndex: '10001'
            }}>
                <div style={{display: 'flex', width: '100%', height: '5%', justifyContent: 'end'}}>
                    <button style={{cursor: 'pointer'}} onClick={handleToggleHideModal}>Close</button>                    
                </div>
                <div style={{width: '100%', height: '95%', backgroundColor: 'pink'}}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Modal;