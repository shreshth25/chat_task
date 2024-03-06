import React, { useEffect, useState, useRef } from 'react';
import './chat.css';
import { useChatContext } from '../contexts/chatContext';
import { getMessage, get_abbreviation } from '../helpers/helper';


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


    useEffect(()=>{
        const newWs = new WebSocket('ws://localhost:8000/chat/ws');
        setWs(newWs);
        newWs.onopen = ()=>{
            console.log('Connected');
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
            const new_messages = [ ...messages, [ firstMessage ] ];
            setMessages(new_messages);
            const messagesToBeSend = new_messages;
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

    const handleSendClick = () => {
        if (selectedUser !== null && inputText.trim() !== '') {
            const new_messages = [ ...messages, [ inputText ] ];
            setInputText('');
            setCanSend(false);
            setMessages(new_messages);
            const messagesToBeSend = new_messages;
            const dataToBeSend = getMessage(inputText, messagesToBeSend, taskDescriptionTxt, tipDescriptionTxt);
            ws.send(JSON.stringify(dataToBeSend));

            ws.onmessage = (e)=>{
                const responseData = JSON.parse(e.data);
                setMessages(responseData['chat_history']);
                setTaskDescriptionTxt(responseData['task_description_txt']);
                setTipDescriptionTxt(responseData['tip_description_txt']);
            };
            setCanSend(true);
        }
    };

    return (
        <div className="main-container">
            <div className="frame">
                <div className="frame-1">
                    <div className="ri-sparkling-fill" />
                    <div className="label">
                        <span className="task-assignment">New Task Assignment</span>
                    </div>
                    <div className="ep-info-filled" />
                </div>
                <div className="icons" onClick={() => setView('chat-list')} />
            </div>
            <div className="chat-input">
                <div className="frame-2">
                    <span className="assigning-task-for">Assigning task for:</span>
                    <div className="frame-3">
                        <div className="avatar">
                            <div className="avatars-img">
                                <span className="rb">{get_abbreviation(selectedUser.first_name, selectedUser.last_name)}</span>
                            </div>
                        </div>
                        <div className="frame-4">
                            <span className="robert-bagares">{selectedUser.first_name}</span>
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
                        Clear
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
                                <div className="message-bubble-d">
                                    <button className="button-frame">
                                        <p className="sed-ut-perspiciatis">{chat[0]}</p>
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
                                <div className="message-bubble-d1">
                                    <button className="button-frame">
                                        <p className="sed-ut-perspiciatis">{chat[1]}</p>
                                    </button>
                                    <div className="frame-e1">
                                        <div className="frame-f2">
                                            <div className="frame-10">
                                                <div className="vector2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}

                        </div>
                    ); 
                })}
            </div>
            <div className="user">
                {tipDescriptionTxt!='...' && <div className="input-group">
                    <span className="assigning-task-for">Task you want to assign: </span>
                    <div className="chat-input-5">
                        <span className="task-title-text">
                            {firstMessage}
                        </span>
                        <button className="frame-start" onClick={handleClearSelection}>
                            <span className="clear">
                                Start New Task
                            </span>
                            <div className="icons-a" />
                        </button>
                    </div>
                </div>}
                <div className="input-group">
                    <div className="chat-input-4">
                        <span className="task-title">
                            <input
                                style={{ border: 'None', width: '100%' }}
                                placeholder="What task do you want to accomplish?"
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
                            <span className={canSend ? 'can-send' : 'send'}>Send</span>
                            <div className={canSend ? 'icons-5-send' : 'icons-5'} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatApp;


