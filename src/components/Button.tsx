import React, { useState } from 'react';
import icon from '../assets/images/805c7efc-71a0-444a-98c5-3a3bf3843041.png';
import './button.css';
import Popup from './Popup';
import Page from './Page';
import ChatList from './ChatList';
import ChatApp from './ChatApp';
import '../i18n';
import { useTranslation } from 'react-i18next';
import { useChatContext } from '../contexts/chatContext';

const Button = ({ data }) => {
    const { view, setUserDetails } = useChatContext();
    const { t } = useTranslation();
    const [ showModal, setShowModal ] = useState(false);
    const closeModal = () => setShowModal(false);
    
    const handleClick = () => {
        setShowModal(prev => !prev);
        setUserDetails(data); 
    };

    const getViewComponent = () => {
        switch (view) {
            case 'page':
                return <Page/>;
            case 'chat':
                return <ChatApp />;
            case 'chat-list':
                return <ChatList/>;
            default:
                return null;
        }
    };


    return (
        <div>
            <button
                className="task-button"
                onClick={handleClick}
            >
                <img src={icon} className="task-button-img" alt="icon" />
                {t('tasks')}
            </button>
            {showModal && (
                <Popup closeModal={closeModal} content={getViewComponent()} />
            )}
        </div>
    );
};

export default Button;
