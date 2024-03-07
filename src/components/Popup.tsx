import React from 'react';
import '../assets/css/popup.css';
const Popup = ({ closeModal, content }) => {
    return (
        <div>
            <div className="modal-wrapper" onClick={ closeModal }></div>
            <div className="modal-container">{ content }</div>
        </div>
    );
};

export default Popup;
