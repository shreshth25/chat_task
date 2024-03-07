import React, { useEffect, useState } from 'react';
import '../assets/css/page.css';
import { useChatContext } from '../contexts/chat';
import { getUsers } from '../services/user';
import { getAbbreviation } from '../helpers/helper';
import { User } from '../interfaces/user';



const Page = () => {
    const [ inputValue, setInputValue ] = useState('');
    const [ selectedUser, setSelectedUser ] = useState(null);
    const [ inputText, setInputText ] = useState('');
    const [ canSend, setCanSend ] = useState(false);
    const [ users, setUsers ] = useState<User[] | null>(null);
    const { setUser, setView, setFirstMessage, userDetails } = useChatContext();
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers(userDetails);
                setUsers(response);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        if (value === '') {
            setCanSend(false);
        } else {
            setCanSend(selectedUser !== null && inputText.trim() !== '');
        }
    };

    const handleUserList = (option) => {
        setSelectedUser(option);
        setCanSend(inputText.trim() !== '');
    };

    const handleClearSelection = () => {
        setSelectedUser(null);
        setInputValue('');
        setCanSend(false);
    };

    const handleSendClick = () => {
        if (selectedUser !== null && inputText.trim() !== '') {
            setFirstMessage(inputText);
            setUser(selectedUser);
            setView('chat');
        }
    };

    const filteredList = users ? users.filter((user) =>
        user.firstName.toLowerCase().includes(inputValue.toLowerCase()),
    ) : [];


    return (
        <div className="main-container">
            <div className="frame">
                <div className="frame-1">
                    <div className="sparkling-fill" />
                    <div className="label">
                        <span className="task-assignment">New Task Assignment</span>
                    </div>
                    <div className="ep-info-filled" />
                </div>
                <div className="icons" onClick={()=>setView('chat-list')}/>
            </div>
            {selectedUser ? (
                <div className="chat-input">
                    <div className="frame-2">
                        <span className="assigning-task-for">Assigning task for:</span>
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
                    <button className="frame-9">
                        <span className="clear" onClick={handleClearSelection}>
              Clear
                        </span>
                        <div className="icons-a" />
                    </button>
                </div>
            ) : (
                <div className="search">
                    <div className="search-input">
                        <div className="icons-2">
                            <div className="search-line" />
                        </div>
                        <div className="search-member">
                            <input
                                className="search-member-input"
                                type="text"
                                placeholder="Search member to assign task"
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="list">
                        {inputValue &&
              filteredList.map((option) => (
                  <div
                      className="users-list"
                      key={option.email}
                      onClick={() => handleUserList(option)}
                  >
                      <div className="frame-2">
                          <div className="frame-3">
                              <div className="avatar">
                                  <div className="avatars-img">
                                      <span className="rb">{getAbbreviation(option.firstName, option.lastName)}</span>
                                  </div>
                              </div>
                              <div className="frame-4">
                                  <span className="robert-bagares">{option.firstName}</span>
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
                  </div>
              ))}
                    </div>
                </div>
            )}

            <div className="message-thread">
                <div className="label-3">
                    <span className="task-description">
            ✏️ Start by explaining the task you want to assign
                    </span>
                </div>
            </div>
            <div className="user">
                <div className="input-group">
                    <div className="chat-input-4">
                        <span className="task-title">
                            <input
                                style={{ border: 'None', width: '100%' }}
                                placeholder="What task do you want to accomplish?"
                                value={inputText}
                                onChange={(e)=>{
                                    setInputText(e.target.value);
                                    setCanSend(selectedUser !== null && e.target.value.trim() !== ''); 
                                }
                                }
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSendClick();
                                    }
                                }}
                            />
                        </span>
                        <button
                            className={canSend ? 'task-button-send': 'task-button'}
                            onClick={handleSendClick}
                            disabled={!canSend}
                        >
                            <span  className={canSend ? 'can-send': 'send'}>Send</span>
                            <div className={canSend ? 'icons-5-send': 'icons-5'} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
