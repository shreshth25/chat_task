import React, { useEffect, useState, useRef } from 'react';
import '../assets/css/chat.css';
import { useChatContext } from '../contexts/chat';
import { getMessage, getAbbreviation } from '../helpers/helper';
import '../i18n';
import { useTranslation } from 'react-i18next';

const ChatApp = () => {

    const { user, setView, firstMessage } = useChatContext();
    const [ selectedUser, setSelectedUser ] = useState(user);
    const [ inputText, setInputText ] = useState('');
    const [ messages, setMessages ] = useState([]);
    const [ taskDescriptionTxt, setTaskDescriptionTxt ] = useState('...');
    const [ tipDescriptionTxt, setTipDescriptionTxt ] = useState('...');
    const [ canSend, setCanSend ] = useState(false);
    const [ ws, setWs ] = useState(null);
    const lastMessageRef = useRef<HTMLDivElement | null>(null);
    const [ currentTime ] = useState(new Date());
    const { t } = useTranslation();


    useEffect(()=>{
        const newWs = new WebSocket('ws://localhost:8000/chat/ws');
        setWs(newWs);
        newWs.onopen = ()=>{
            handleFirstMessage(newWs);
        };

        return () => {
            if (newWs) {
                newWs.close();
            }
        }; 
    }, []);


    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' , block: 'end' });
        }
    }, [ messages ]);
        
    const handleClearSelection = () => {
        setSelectedUser(null);
        setView('page');
    };

    const handleFirstMessage = (ws)=>{
        if (firstMessage) {
            const newMessages = [ ...messages, [ firstMessage ] ];
            setMessages(newMessages);
            const messagesToBeSend = newMessages;
            const dataToBeSend = getMessage(inputText, messagesToBeSend, taskDescriptionTxt, tipDescriptionTxt);
            ws.send(JSON.stringify(dataToBeSend));

            ws.onmessage = (e)=>{
                const responseData = JSON.parse(e.data);
                setMessages(responseData['chat_history']);
                setTaskDescriptionTxt(responseData['task_description_txt']);
                setTipDescriptionTxt(responseData['tip_description_txt']);
            };
        }
        else
        {
            setView('page');
        }
        
    };


    const handleCopyMessage = (message: string) => {
        navigator.clipboard.writeText(message);
    };

    const handleSendClick = () => {
        if (selectedUser !== null && inputText.trim() !== '') {
            const newMessages = [ ...messages, [ inputText ] ];
            setInputText('');
            setMessages(newMessages);
            const messagesToBeSend = newMessages;
            const dataToBeSend = getMessage(inputText, messagesToBeSend, taskDescriptionTxt, tipDescriptionTxt);
            ws.send(JSON.stringify(dataToBeSend));

            ws.onmessage = (e)=>{
                const responseData = JSON.parse(e.data);
                setMessages(responseData['chat_history']);
                setTaskDescriptionTxt(responseData['task_description_txt']);
                setTipDescriptionTxt(responseData['tip_description_txt']);
            };
        }
    };

    const handleYes = () => {
        const newMessages = [ ...messages, [ 'Yes' ] ];
        setInputText('');
        setMessages(newMessages);
        const messagesToBeSend = newMessages;
        const dataToBeSend = getMessage('Yes', messagesToBeSend, taskDescriptionTxt, tipDescriptionTxt);
        ws.send(JSON.stringify(dataToBeSend));

        ws.onmessage = (e)=>{
            const responseData = JSON.parse(e.data);
            setMessages(responseData['chat_history']);
            setTaskDescriptionTxt(responseData['task_description_txt']);
            setTipDescriptionTxt(responseData['tip_description_txt']);
        };
    };

    return (
        <div className="main-container">
            <div className="frame">
                <div className="frame-1">
                    <div className="ri-sparkling-fill" />
                    <div className="label">
                        <span className="task-assignment">{t('new task assignment')}</span>
                    </div>
                    <div className="ep-info-filled" />
                </div>
                <div className="icons" onClick={() => setView('chat-list')} />
            </div>
            <div className="chat-input">
                <div className="frame-2">
                    <span className="assigning-task-for">{t('assigning task for')}:</span>
                    <div className="frame-3">
                        <div className="avatar">
                            <div className="avatars-img">
                                <span className="rb">{getAbbreviation(selectedUser.firstName, selectedUser.lastName)}</span>
                            </div>
                        </div>
                        <div className="frame-4">
                            <span className="robert-bagares">{selectedUser.firstName}</span>
                            <div className="frame-5">
                                <div className="frame-6">
                                    <div className="motivator-icon" />
                                    <div className="motivator-icon-7" />
                                    <div className="motivator-icon-8" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="frame-9" onClick={handleClearSelection}>
                    <span className="clear">
                        {t('clear')}
                    </span>
                    <div className="icons-a" />
                </button>
            </div>
            <div className="message-thread-new">
                <div className="label-b">
                    <span className="task-assign">{currentTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
                </div>
                {messages.map((chat, index) => {
                    return (
                        <div key={index} className='message-thread-new-inner'>
                            {chat[0]!='' && <div className="message-row-d" >
                                <div className="message-bubble-d1">
                                    <button className="button-frame">
                                        <span className="sed-ut-perspiciatis">
                                            {chat[0]}
                                        </span>
                                    </button>
                                    <div className="frame-e1">
                                        <div className="frame-f2">
                                            <div className="frame-10">
                                                <div className="vector2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            }

                            {chat[1]!='' &&  <div className="message-row-c" ref={index === messages.length - 1 ? lastMessageRef : null}>
                                <div className='message-bubble-d'>
                                    <button className='button-frame'>
                                        <span className='sed-ut-perspiciatis'>
                                            {chat[1]}
                                        </span>
                                    </button>
                                    <div className='frame-e'>
                                        <div className='frame-f'>
                                            <div className='frame-10'>
                                                <div className='vector' />
                                            </div>
                                        </div>
                                        {index === messages.length - 1 && tipDescriptionTxt !== '...' && <div className='bubble-function'>
                                            <button className='frame-button' onClick={() => handleCopyMessage(chat[1])}>
                                                <div className='copy'>📄</div>
                                            </button>
                                        </div>}
                                    </div>
                                </div>
                            </div>}

                        </div>
                    ); 
                })}
            </div>
            <div className="user">
                {tipDescriptionTxt!='...' && <div className='task-assign-lookup'>
                    <div className='label-12'>
                        <span className='task-assign-text'>{t('task you want to assign')}:</span>
                    </div>
                    <div className='text-block'>
                        <span className='lorem-ipsum-text'>
                            {firstMessage}
                        </span>
                        <button className='frame-button-13' onClick={handleClearSelection}>
                            <span className='start-new-task'>{t('start new task')}</span>
                            <div className='icons-14' />
                        </button>
                    </div>
                </div>}

                { tipDescriptionTxt=='...'&& <button
                    className='yes-button'
                    onClick={handleYes}
                >
                    <span className='send'>{t('yes')}</span>
                </button> 
                }
                <div className="input-group">
                    <div className="chat-input-4">
                        <span className="task-title">
                            <input
                                style={{ border: 'None', width: '100%' }}
                                placeholder={t('what task do you want to accomplish?')}
                                value={inputText}
                                onChange={(e) => {
                                    setInputText(e.target.value);
                                    setCanSend(selectedUser !== null && e.target.value.trim() !== '');
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSendClick();
                                    }
                                }}
                            />
                        </span>
                        <button
                            className={canSend ? 'task-button-send' : 'task-button'}
                            onClick={handleSendClick}
                            disabled={!canSend}
                        >
                            <span className={canSend ? 'can-send' : 'send'}>{t('send')}</span>
                            <div className={canSend ? 'icons-5-send' : 'icons-5'} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatApp;


