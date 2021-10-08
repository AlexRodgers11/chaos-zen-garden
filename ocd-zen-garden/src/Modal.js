import React from 'react';
import './Modal.css';

// function Modal(props, {children}) {
function Modal(props) {
    const handleToggleHideModal = () => {
        props.toggleHideModal()
    }

    return (
        <div class="Modal" style={{
            position: 'fixed',
            top: '45px',
            textAlign: 'center',
            width: '100%',
            height: `${props.height - 45}px`,
            display: `${props.hidden ? 'none' : 'flex'}`,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '999'
        }}>
            {/* <div style={{position: 'fixed', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, .90)', zIndex: '10000'}} onClick={handleToggleHideModal}></div> */}
            <div className="Modal-Backdrop" style={{position: 'fixed', top: '45px', display: props.hidden ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: `${props.height - 45}px`, backgroundColor: 'rgba(0, 0, 0, .90)', zIndex: '10000'}} onClick={handleToggleHideModal}></div>
            <div className="Modal-Container" style={{
                position: 'fixed',
                // width: '70%',
                // height: '50%',
                border: '1px solid black',
                backgroundColor: '#303030',
                zIndex: '10001',
            }}>
                {/* <div className="Close" style={{display: 'flex', width: '100%', height: '15%', justifyContent: 'end'}}> */}
                {/* <div className="Close" style={{display: 'flex', alignItems: 'center', width: '100%', height: '3em', justifyContent: 'end'}}> */}
                <div className="Close" style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'end'}}>
                    {/* <button style={{cursor: 'pointer', height: '75%', padding: '.25em', margin: '.5em'}} onClick={handleToggleHideModal}>Close</button>                     */}
                    <button style={{cursor: 'pointer', height: '2.5em', padding: '.25em', margin: '.5em'}} onClick={handleToggleHideModal}>Close</button>                    
                </div>
                <div className="Modal-Content" style={{backgroundColor: '#d9d9d9'}}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Modal;