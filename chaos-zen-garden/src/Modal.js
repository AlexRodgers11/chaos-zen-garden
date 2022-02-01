import React from 'react';
import './Modal.css';
import { useSelector, useDispatch } from 'react-redux';
import NewUserForm from './NewUserForm';
import LoginForm from './LoginForm';
import ColorForm from './ColorForm';
import { authenticationActions } from './store/authentication';
import { modalContentActions } from './store/modal-content';

function Modal(props) {
    const loggedIn = useSelector((state) => state.authentication.loggedIn);
    const modalContent = useSelector((state) => state.modalContent.modalContent);
    const dispatch = useDispatch();

    const handleToggleLogInStatus = () => {
        dispatch(authenticationActions.toggleLogInStatus());
        dispatch(modalContentActions.setModalContent(null));
    }

    const handleHideModal = () => {
        dispatch(modalContentActions.setModalContent(null));
    }

    const displayModalContent = () => {
        switch(modalContent) {
            case 'epilepsy-warning':
                return (<div>
                    <p>WARNING: PHOTOSENSITIVITY/EPILEPSY SEIZURES</p>
                    <p>If you, or anyone in your family has an epileptic condition or has had seizures of any kind, consult your physician before using this website. IMMEDIATELY DISCONTINUE use and consult your physician before resuming use of this website.</p>
                </div>)
            case 'monochrome': 
                return (<ColorForm monochrome={true} colorCount={1}/>);
            case 'custom-palette':
                return (<ColorForm monochrome={false} colorCount={7}/>);
            case 'new-user':
                return (<NewUserForm loggedIn={loggedIn} toggleLoggedIn={handleToggleLogInStatus} />);
            case 'login':
                return (<LoginForm loggedIn={loggedIn} toggleLoggedIn={handleToggleLogInStatus}  />);
            default:
                return null;
        }
    }

    return (
        <div class="Modal" style={{
            position: 'fixed',
            top: '45px',
            textAlign: 'center',
            width: '100%',
            height: `${props.height - 45}px`,
            display: `${!modalContent ? 'none' : 'flex'}`,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '999'
        }}>
            <div className="Modal-Backdrop" style={{position: 'fixed', top: '45px', display: !modalContent ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: `${props.height - 45}px`, backgroundColor: 'rgba(0, 0, 0, .90)', zIndex: '10000'}} onClick={handleHideModal}></div>
            <div className="Modal-Container" style={{
                position: 'fixed',
                border: '1px solid black',
                backgroundColor: '#303030',
                zIndex: '10001',
            }}>
                <div className="Close" style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'end'}}>
                    <button style={{cursor: 'pointer', height: '2.5em', padding: '.25em', margin: '.5em'}} onClick={handleHideModal}>Close</button>                    
                </div>
                <div className="Modal-Content" style={{backgroundColor: '#d9d9d9'}}>
                    {displayModalContent()}
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Modal;